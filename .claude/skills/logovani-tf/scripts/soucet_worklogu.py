#!/usr/bin/env python3
"""Sečte worklogy jednoho člověka za jeden den z uložené odpovědi Jiry.

Vstup: jeden nebo více JSON souborů s výsledkem searchJiraIssuesUsingJql
nebo getJiraIssue (struktura issues.nodes[].fields.worklog). Výsledek bývá
větší než limit výstupu nástroje, proto se ukládá do souboru a čte odsud.

Pole worklog vrací nejvýš 20 záznamů na tiket. Když má tiket záznamů víc
a záznamy dne mezi nimi nejsou, skript to ohlásí a součet za tiket vezme
z --doplnit (hodnoty, které byly právě zapsané), aby denní součet neklamal.

Použití:
  python3 soucet_worklogu.py vysledek.json --ucet 5d93...ed69 --den 2026-10-06 \
      [--site techfides.atlassian.net] [--doplnit TF-849=3h --doplnit TF-848="2h 30m"] \
      [--vlastni FPR-95,GPB-39] [--json]
--vlastni označí tikety, kde zápis udělal uživatel sám, poznámkou „(tvůj zápis)“.
"""
import argparse
import json
import re
from datetime import datetime
from zoneinfo import ZoneInfo

PRAHA = ZoneInfo("Europe/Prague")


def parsuj_jira_trvani(text):
    sekundy = 0
    for cislo, jednotka in re.findall(r"(\d+(?:[.,]\d+)?)\s*([dhm])", text.lower()):
        n = float(cislo.replace(",", "."))
        sekundy += n * {"d": 8 * 3600, "h": 3600, "m": 60}[jednotka]
    if sekundy == 0:
        raise ValueError(f"neznámý formát trvání: {text}")
    return int(sekundy)


def formatuj(sekundy):
    h, zb = divmod(int(sekundy), 60)
    h, m = divmod(h, 60)
    casti = []
    if h:
        casti.append(f"{h} h")
    if m:
        casti.append(f"{m} min")
    return " ".join(casti) or "0 min"


def nacti_tikety(cesty):
    tikety = {}
    for cesta in cesty:
        with open(cesta, encoding="utf-8") as f:
            data = json.load(f)
        for issue in data.get("issues", {}).get("nodes", []):
            klic = issue["key"]
            pole = issue.get("fields", {})
            wl = pole.get("worklog") or {}
            tikety[klic] = {
                "summary": pole.get("summary", ""),
                "total": wl.get("total", len(wl.get("worklogs", []))),
                "worklogs": wl.get("worklogs", []),
            }
    return tikety


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("soubory", nargs="+")
    ap.add_argument("--ucet", required=True, help="accountId uživatele")
    ap.add_argument("--den", required=True, help="RRRR-MM-DD")
    ap.add_argument("--site", default="techfides.atlassian.net")
    ap.add_argument("--doplnit", action="append", default=[], metavar="KLÍČ=TRVÁNÍ")
    ap.add_argument("--vlastni", default="", help="klíče oddělené čárkou")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    doplnit = {}
    for polozka in args.doplnit:
        klic, trvani = polozka.split("=", 1)
        doplnit[klic.strip()] = parsuj_jira_trvani(trvani)
    vlastni = {k.strip() for k in args.vlastni.split(",") if k.strip()}

    radky = []
    varovani = []
    for klic, t in nacti_tikety(args.soubory).items():
        sekundy = 0
        nalezeno = 0
        for w in t["worklogs"]:
            if w.get("author", {}).get("accountId") != args.ucet:
                continue
            zacatek = datetime.fromisoformat(w["started"].replace("Z", "+00:00")).astimezone(PRAHA)
            if zacatek.strftime("%Y-%m-%d") == args.den:
                sekundy += w["timeSpentSeconds"]
                nalezeno += 1
        oriznuto = t["total"] > len(t["worklogs"])
        zdroj = "readback"
        if oriznuto and nalezeno == 0 and klic in doplnit:
            sekundy = doplnit[klic]
            zdroj = "ze zápisu, ne z readbacku"
            varovani.append(f"{klic}: Jira vrátila {len(t['worklogs'])} z {t['total']} worklogů, "
                            f"záznam dne mezi nimi není; součet vzat ze zápisu")
        elif oriznuto:
            varovani.append(f"{klic}: Jira vrátila {len(t['worklogs'])} z {t['total']} worklogů, "
                            f"součet dne může být neúplný")
        if sekundy:
            radky.append({"tiket": klic, "summary": t["summary"], "sekundy": sekundy,
                          "zdroj": zdroj, "vlastni": klic in vlastni})
    for klic, sek in doplnit.items():
        if klic not in {r["tiket"] for r in radky}:
            radky.append({"tiket": klic, "summary": "", "sekundy": sek,
                          "zdroj": "ze zápisu, tiket v readbacku chybí", "vlastni": False})
            varovani.append(f"{klic}: tiket v readbacku chybí, součet vzat ze zápisu")

    radky.sort(key=lambda r: -r["sekundy"])
    celkem = sum(r["sekundy"] for r in radky)

    if args.json:
        print(json.dumps({"den": args.den, "radky": radky, "celkem_sekundy": celkem,
                          "celkem": formatuj(celkem), "varovani": varovani}, ensure_ascii=False, indent=2))
        return
    print("| Tiket | Dnes |")
    print("| --- | --- |")
    for r in radky:
        stitek = r["summary"][:40]
        znacky = []
        if r["vlastni"]:
            znacky.append("tvůj zápis")
        if r["zdroj"] != "readback":
            znacky.append(r["zdroj"])
        popisek = f" ({', '.join(znacky)})" if znacky else ""
        print(f"| [{r['tiket']}](https://{args.site}/browse/{r['tiket']}) {stitek}{popisek} | {formatuj(r['sekundy'])} |")
    print(f"| **Celkem** | **{formatuj(celkem)}** |")
    for v in varovani:
        print(f"\nPozor: {v}")


if __name__ == "__main__":
    main()
