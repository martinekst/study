#!/usr/bin/env python3
"""Sestaví časovou osu dne z digitálních stop a odhadne čas na tiket.

Vstup: JSON pole stop. Každá stopa je objekt:
  zdroj      kalendar | plaud | slack | gmail | drive | git | relace | jira
  start      čas ISO 8601 (s offsetem, se Z, nebo bez pásma)
  konec      čas ISO 8601 (volitelné)
  trvani_min délka v minutách (volitelné, místo konce)
  popis      text pro sloupec „Podle čeho“
  tiket      klíč tiketu, nebo null, když ho model zatím nepřiřadil

Čas bez pásma se vykládá podle zdroje: plaud, gmail, drive a relace
posílají UTC, slack a kalendář čas v Europe/Prague. Výstup je JSON na
stdout: normalizovaná osa, bloky na tiket s odhadem, rozdělení času tiketu
do worklogů po nejvýš 4 h (`worklogy`) a kontrola dne.
S --markdown vypíše místo JSON tabulku pro návrh, řádek na worklog.

Použití:
  python3 casova_osa.py stopy.json [--obed 12:00-13:00] [--markdown]
"""
import argparse
import json
import math
import sys
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

PRAHA = ZoneInfo("Europe/Prague")
UTC_ZDROJE = {"plaud", "gmail", "drive", "relace"}
SCHUZKOVE_ZDROJE = {"kalendar", "plaud", "kalendar+plaud"}
KROK = 15          # minut, granularita worklogu
BOD = 15           # minut, kolik „váží“ stopa bez délky (zpráva, commit)
MEZERA_BLOKU = 30  # minut, větší mezera začíná nový blok
MAX_WORKLOG = 240  # minut, nejdelší jeden worklog (interní pravidlo)


def parsuj_cas(hodnota, zdroj):
    text = hodnota.strip().replace("Z", "+00:00")
    dt = datetime.fromisoformat(text)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc if zdroj in UTC_ZDROJE else PRAHA)
    return dt.astimezone(PRAHA)


def nacti_stopy(cesta):
    with open(cesta, encoding="utf-8") as f:
        syrove = json.load(f)
    stopy = []
    for s in syrove:
        zdroj = s["zdroj"]
        start = parsuj_cas(s["start"], zdroj)
        if s.get("konec"):
            konec = parsuj_cas(s["konec"], zdroj)
        elif s.get("trvani_min"):
            konec = start + timedelta(minutes=float(s["trvani_min"]))
        else:
            konec = start
        stopy.append({
            "zdroj": zdroj, "start": start, "konec": konec,
            "popis": s.get("popis", ""), "tiket": s.get("tiket"),
        })
    stopy.sort(key=lambda s: s["start"])
    return stopy


def prekryv(a, b):
    zac = max(a["start"], b["start"])
    kon = min(a["konec"], b["konec"])
    return max(timedelta(0), kon - zac)


def sluc_schuzky(stopy):
    """Nahrávka Plaudu, která se kryje s událostí kalendáře, je tatáž schůzka.
    Dvě události kalendáře se stejným časem jsou jedna (rezervace místnosti)."""
    kalendar = [s for s in stopy if s["zdroj"] == "kalendar"]
    ostatni = [s for s in stopy if s["zdroj"] != "kalendar"]
    slouceny = []
    for s in kalendar:
        dvojnik = next((k for k in slouceny
                        if k["start"] == s["start"] and k["konec"] == s["konec"]), None)
        if dvojnik:
            dvojnik["popis"] += f" / {s['popis']}"
            dvojnik["tiket"] = dvojnik["tiket"] or s["tiket"]
        else:
            slouceny.append(dict(s))
    vysledek = slouceny
    for s in ostatni:
        if s["zdroj"] != "plaud":
            vysledek.append(s)
            continue
        delka = s["konec"] - s["start"]
        kandidat = None
        for k in slouceny:
            kratsi = min(delka, k["konec"] - k["start"])
            if kratsi > timedelta(0) and prekryv(s, k) >= kratsi / 2:
                kandidat = k
                break
        if kandidat:
            kandidat["start"] = min(kandidat["start"], s["start"])
            kandidat["konec"] = max(kandidat["konec"], s["konec"])
            kandidat["zdroj"] = "kalendar+plaud"
            kandidat["popis"] += f" / Plaud: {s['popis']}"
            kandidat["tiket"] = kandidat["tiket"] or s["tiket"]
        else:
            vysledek.append(s)
    vysledek.sort(key=lambda s: s["start"])
    return vysledek


def je_schuzka(s):
    return s["zdroj"] in SCHUZKOVE_ZDROJE and (s["konec"] - s["start"]) >= timedelta(minutes=10)


def interval_stopy(s):
    if s["konec"] > s["start"]:
        return (s["start"], s["konec"])
    return (s["start"], s["start"] + timedelta(minutes=BOD))


def sjednoceni(intervaly):
    intervaly = sorted(intervaly)
    vysledek = []
    for zac, kon in intervaly:
        if vysledek and zac <= vysledek[-1][1]:
            vysledek[-1] = (vysledek[-1][0], max(vysledek[-1][1], kon))
        else:
            vysledek.append((zac, kon))
    return vysledek


def odecti(intervaly, odecist):
    """Z množiny intervalů odečte jinou množinu intervalů."""
    vysledek = []
    for zac, kon in intervaly:
        kusy = [(zac, kon)]
        for ozac, okon in odecist:
            nove = []
            for z, k in kusy:
                if okon <= z or ozac >= k:
                    nove.append((z, k))
                else:
                    if z < ozac:
                        nove.append((z, ozac))
                    if okon < k:
                        nove.append((okon, k))
            kusy = nove
        vysledek.extend(kusy)
    return vysledek


def minuty(intervaly):
    return sum((k - z).total_seconds() for z, k in intervaly) / 60


def zaokrouhli_nahoru(m):
    return max(KROK, int(math.ceil(m / KROK) * KROK))


def dolu_na_ctvrt(dt):
    return dt.replace(minute=(dt.minute // KROK) * KROK, second=0, microsecond=0)


def jira_trvani(m):
    h, zb = divmod(int(m), 60)
    casti = []
    if h:
        casti.append(f"{h}h")
    if zb:
        casti.append(f"{zb}m")
    return " ".join(casti) or "0m"


def rozdel_na_worklogy(bloky):
    """Rozdělí čas tiketu na worklogy po nejvýš MAX_WORKLOG minutách.
    Celé bloky drží pohromadě, aby měl každý worklog vlastní popis činností;
    dělí se jen blok, který je sám delší než limit."""
    casti, aktualni, nulove = [], None, []
    for i, b in enumerate(bloky):
        if b["minut"] == 0:
            (aktualni["bloky"] if aktualni else nulove).append(i)
            continue
        zbyva, posun = b["minut"], 0
        while zbyva:
            if aktualni and posun == 0 and aktualni["minut"] + zbyva <= MAX_WORKLOG:
                aktualni["minut"] += zbyva
                aktualni["bloky"].append(i)
                break
            kus = min(zbyva, MAX_WORKLOG)
            zacatek = datetime.fromisoformat(b["zacatek"]) + timedelta(minutes=posun)
            aktualni = {"started": zacatek.isoformat(), "minut": kus, "bloky": [i]}
            casti.append(aktualni)
            zbyva -= kus
            posun += kus
    if casti and nulove:
        casti[0]["bloky"] = nulove + casti[0]["bloky"]
    for c in casti:
        c["timeSpent"] = jira_trvani(c["minut"])
    return casti


def bloky_na_tiket(stopy):
    podle_tiketu = {}
    for s in stopy:
        podle_tiketu.setdefault(s["tiket"] or "?", []).append(s)
    schuzky_vsech = {t: [interval_stopy(s) for s in ss if je_schuzka(s)]
                     for t, ss in podle_tiketu.items()}
    vysledek = []
    for tiket, ss in podle_tiketu.items():
        cizi_schuzky = [i for t, iv in schuzky_vsech.items() if t != tiket for i in iv]
        bloky, aktualni = [], [ss[0]]
        for s in ss[1:]:
            if s["start"] - aktualni[-1]["konec"] > timedelta(minutes=MEZERA_BLOKU):
                bloky.append(aktualni)
                aktualni = [s]
            else:
                aktualni.append(s)
        bloky.append(aktualni)
        celkem = 0
        popis_bloku = []
        for b in bloky:
            intervaly = sjednoceni([interval_stopy(s) for s in b])
            vlastni_schuzky = [interval_stopy(s) for s in b if je_schuzka(s)]
            ciste = odecti(intervaly, [i for i in cizi_schuzky if i not in vlastni_schuzky])
            poznamka = None
            if minuty(ciste) == 0:
                # Stopa leží celá uvnitř schůzky jiného tiketu: jeden blok patří
                # jednomu tiketu, tak ji nepočítej a nech model, ať se zeptá.
                m = 0
                poznamka = "celý blok uvnitř schůzky jiného tiketu, nepočítá se"
            else:
                m = zaokrouhli_nahoru(minuty(ciste))
            celkem += m
            popis_bloku.append({
                "zacatek": dolu_na_ctvrt(b[0]["start"]).isoformat(),
                "minut": m,
                "poznamka": poznamka,
                "stopy": [f"{s['zdroj']} {s['start']:%H:%M}"
                          + (f"–{s['konec']:%H:%M}" if s["konec"] > s["start"] else "")
                          + f" {s['popis']}" for s in b],
            })
        vysledek.append({
            "tiket": tiket,
            "minut": celkem,
            "timeSpent": jira_trvani(celkem),
            "started": popis_bloku[0]["zacatek"],
            "bloky": popis_bloku,
            "worklogy": rozdel_na_worklogy(popis_bloku),
        })
    vysledek.sort(key=lambda r: -r["minut"])
    return vysledek


def kontrola_dne(stopy, obed):
    prvni = min(s["start"] for s in stopy)
    posledni = max(interval_stopy(s)[1] for s in stopy)
    rozpeti = (posledni - prvni).total_seconds() / 60
    poznamky = []
    if obed:
        o_od, o_do = obed
        obed_zac = prvni.replace(hour=o_od[0], minute=o_od[1], second=0, microsecond=0)
        obed_kon = prvni.replace(hour=o_do[0], minute=o_do[1], second=0, microsecond=0)
        obsazeno = any(je_schuzka(s) and s["start"] < obed_kon and s["konec"] > obed_zac for s in stopy)
        if obsazeno:
            poznamky.append("oběd vyplnila schůzka, neodečítá se")
        else:
            rozpeti -= (obed_kon - obed_zac).total_seconds() / 60
            poznamky.append("odečten oběd")
    # Mezery mezi stopami delší než hodinu: jen informace pro uživatele,
    # který jediný ví, jestli v nich byla práce bez stopy.
    obsazeno = sjednoceni([interval_stopy(s) for s in stopy])
    mezery = []
    for (z1, k1), (z2, _) in zip(obsazeno, obsazeno[1:]):
        if z2 - k1 >= timedelta(minutes=60):
            mezery.append(f"{k1:%H:%M}–{z2:%H:%M}")
    return {
        "prvni_stopa": prvni.isoformat(), "posledni_stopa": posledni.isoformat(),
        "rozpeti_min": int(rozpeti), "mezery": mezery, "poznamky": poznamky,
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("stopy")
    ap.add_argument("--obed", default="12:00-13:00", help="okno oběda HH:MM-HH:MM, nebo 'ne'")
    ap.add_argument("--markdown", action="store_true")
    args = ap.parse_args()

    stopy = sluc_schuzky(nacti_stopy(args.stopy))
    if not stopy:
        sys.exit("žádné stopy")
    obed = None
    if args.obed != "ne":
        od, do = args.obed.split("-")
        obed = (tuple(map(int, od.split(":"))), tuple(map(int, do.split(":"))))
    tikety = bloky_na_tiket(stopy)
    den = kontrola_dne(stopy, obed)
    soucet = sum(t["minut"] for t in tikety if t["tiket"] != "?")
    den["navrzeno_min"] = soucet
    # Rozpětí slouží jen k odhalení dvojího započtení. Nízký součet není
    # chyba: hodiny jdou podle stop, ne podle délky dne.
    if soucet > den["rozpeti_min"]:
        den["poznamky"].append("součet přesahuje rozpětí stop, hledej dvojí započtení")

    if args.markdown:
        print("| Tiket | Čas | started | Podle čeho |")
        print("| --- | --- | --- | --- |")
        for t in tikety:
            nazev = t["tiket"] if t["tiket"] != "?" else "bez tiketu"
            casti = t["worklogy"] or [{"timeSpent": t["timeSpent"], "started": t["started"],
                                       "bloky": list(range(len(t["bloky"])))}]
            for n, c in enumerate(casti, 1):
                stopy_text = " // ".join(
                    "; ".join(b["stopy"]) + (f" ({b['poznamka']})" if b.get("poznamka") else "")
                    for b in (t["bloky"][i] for i in c["bloky"]))
                stitek = nazev + (f" ({n}/{len(casti)})" if len(casti) > 1 else "")
                print(f"| {stitek} | {c['timeSpent']} | {c['started'][11:16]} | {stopy_text} |")
        print()
        print(f"Rozpětí stop {den['prvni_stopa'][11:16]}–{den['posledni_stopa'][11:16]}, "
              f"{den['rozpeti_min']} min; navrženo {soucet} min. "
              + "; ".join(den["poznamky"]))
        if den["mezery"]:
            print("Mezery bez stop delší než hodinu: " + ", ".join(den["mezery"]))
    else:
        osa = [{"zdroj": s["zdroj"], "start": s["start"].isoformat(), "konec": s["konec"].isoformat(),
                "popis": s["popis"], "tiket": s["tiket"]} for s in stopy]
        print(json.dumps({"osa": osa, "tikety": tikety, "den": den}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
