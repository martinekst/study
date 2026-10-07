#!/usr/bin/env python3
"""Spočítá hodnotu `started` pro zápis worklogů těsně před zápisem.

Interní kontrola označí worklog jako pozdní, když jeho začátek (`started`)
leží víc než 24 hodin před okamžikem zápisu. Skript proto začátek, který
je starší než limit, posune na limit (zaokrouhlený nahoru na čtvrthodinu,
s rezervou 15 min na schválení a zápis). Worklog ale musí zůstat ve dni,
kdy práce proběhla: když by posun přešel přes půlnoc, worklog včas zapsat
nejde a skript ho označí POZDNÍ.

Offset (+0200 v létě, +0100 v zimě) skript určí sám podle Europe/Prague.

Použití:
  python3 started_pro_zapis.py 2026-10-07 GPB-39=08:30 TF-848=08:45 [--ted 2026-10-08T20:30]
--ted nahradí aktuální čas (pro kontrolu); bez něj se bere skutečný čas.
Výstup: řádek na tiket se stavem včas / posunuto / POZDNÍ / BUDOUCNOST.
Návratový kód 2, když je některý worklog POZDNÍ nebo v budoucnosti.
"""
import argparse
import sys
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

UTC = ZoneInfo("UTC")
PRAHA = ZoneInfo("Europe/Prague")
LIMIT = timedelta(hours=24)
REZERVA = timedelta(minutes=15)
KROK = 15  # minut
POSLEDNI_ZACATEK = (23, 45)  # nejpozdější začátek, který ještě patří do dne


def nahoru_na_ctvrt(dt):
    zbytek = (dt.minute % KROK) * 60 + dt.second + dt.microsecond / 1e6
    if zbytek == 0:
        return dt
    return (dt + timedelta(seconds=KROK * 60 - zbytek)).replace(second=0, microsecond=0)


def jira_cas(dt):
    return dt.strftime("%Y-%m-%dT%H:%M:00.000%z")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("den", help="RRRR-MM-DD, den, kdy práce proběhla")
    ap.add_argument("worklogy", nargs="+", metavar="TIKET=HH:MM")
    ap.add_argument("--ted", help="aktuální čas ISO 8601 (bez pásma = Europe/Prague)")
    args = ap.parse_args()

    if args.ted:
        ted = datetime.fromisoformat(args.ted)
        ted = ted.replace(tzinfo=PRAHA) if ted.tzinfo is None else ted.astimezone(PRAHA)
    else:
        ted = datetime.now(PRAHA)
    den = datetime.fromisoformat(args.den).date()
    # Počítá se v UTC: aritmetika a porovnání ve stejném pásmu jdou podle
    # místního času a při změně letního času by se spletly o hodinu.
    nejdrive = nahoru_na_ctvrt((ted.astimezone(UTC) - LIMIT + REZERVA).astimezone(PRAHA))
    konec_dne = datetime(den.year, den.month, den.day, *POSLEDNI_ZACATEK, tzinfo=PRAHA)

    print(f"Teď {ted:%Y-%m-%d %H:%M}, nejdřívější začátek včas {nejdrive:%Y-%m-%d %H:%M}")
    chyba = False
    for polozka in args.worklogy:
        tiket, cas = polozka.split("=", 1)
        h, m = map(int, cas.split(":"))
        start = datetime(den.year, den.month, den.day, h, m, tzinfo=PRAHA)
        if start.astimezone(UTC) > ted.astimezone(UTC):
            stav, chyba = "BUDOUCNOST – začátek je po aktuálním čase, nezapisovat", True
        elif start.astimezone(UTC) >= nejdrive.astimezone(UTC):
            stav = "včas"
        elif nejdrive.astimezone(UTC) <= konec_dne.astimezone(UTC):
            stav = f"posunuto z {cas} kvůli limitu 24 h"
            start = nejdrive
        else:
            stav, chyba = "POZDNÍ – den už nejde zapsat včas, zapsat jen s Martinovým souhlasem", True
        print(f"{tiket}\t{jira_cas(start)}\t{stav}")
    sys.exit(2 if chyba else 0)


if __name__ == "__main__":
    main()
