# Výstup

Česky, tykání. Tři části v tomto pořadí.

## 1. Přehled dne

Jedna až dvě věty: kolik je už zalogováno a na čem, kolik navrhuješ
dopsat, jaký by byl součet a jaké je rozpětí stop (z `casova_osa.py`).
Příklad: „Dnes máš zalogováno 2 h 05 min (GPB-39 1 h, FPR-95 45 min,
FPR-97 20 min). Navrhuju dopsat 3 h 15 min, celkem 5 h 20 min. Stopy jdou
od 7:46 do 14:30, oběd odečten.“

## 2. Návrh

| Tiket | Čas | Popis worklogu | Podle čeho |
| --- | --- | --- | --- |
| [TF-849](https://techfides.atlassian.net/browse/TF-849) řízení PM | 1 h 45 min | Sitdown v2; 1:1 se Š. Koskovou | kalendář 13:00–13:50 + Plaud, kalendář 15:30–16:14 (Plaud) |
| [FPR-95](https://techfides.atlassian.net/browse/FPR-95) Simplematics W41 (tvůj zápis) | 45 min | | |

- První sloupec vždy odkaz na tiket a krátký štítek (kontrola jedním
  klikem).
- „Podle čeho“ je zdroj a lokální čas každé stopy; bez něj návrh nejde
  ověřit.
- Řádky s vlastním zápisem Martina jsou v tabulce s poznámkou
  „(tvůj zápis)“ a bez návrhu.
- Řádek „bez tiketu“ pro stopy, které nemají kam; patří k němu otázka.
- Jeden řádek je jeden worklog, nejvýš 4 h. Tiket s víc worklogy má víc
  řádků („TF-849 (1/2)“, „TF-849 (2/2)“), každý s vlastním popisem.

Pod tabulkou **Potřebuju od tebe**: očíslované otázky, každá s výchozí
volbou („Výchozí: vynechat.“). Bez otázek sekci vynech. Poslední věta:
„Až odpovíš, zapíšu to.“

## 3. Po zápisu

Věta „Zalogováno. Dnes máš dohromady X h Y min.“ a tabulka
`Tiket (odkaz) | Dnes` včetně řádků „(tvůj zápis)“ a řádku **Celkem**.
Součet je z odpovědí nástroje při zápisu a z readbacku před návrhem.
Odkaz v tabulce vede přímo na zapsaný worklog,
`https://techfides.atlassian.net/browse/KLÍČ?focusedWorklogId=ID` (ID
z odpovědi nástroje). Pod tabulkou, co podle odpovědí nebylo zapsáno,
a u kterých tiketů `started_pro_zapis.py` posunul začátek.

## Komentář worklogu

Jedna řádka, činnosti oddělené středníkem, od konkrétního k obecnému,
jména zkráceně (Š. Kosková), bez klíčů tiketů, bez zmínky o AI nebo
o dodatečném zápisu. Popisuje práci, ne stopy.

Dobře: `Sitdown v2; 1:1 se Š. Koskovou; plánování kapacit; výpadky sítě`
Dobře: `Odeslání faktury 09/26 klientovi`
Špatně: `Podle kalendáře a Slacku: meeting 13:00, zpráva 16:28 (TF-849)`
Špatně: `Různé`

## Parametry zápisu

`addWorklogToJiraIssue`: `cloudId "techfides.atlassian.net"`,
`issueIdOrKey`, `started` z výstupu `started_pro_zapis.py` (tvar
`RRRR-MM-DDTHH:MM:00.000+0200`, offset pro letní a zimní čas určí skript),
`timeSpent`
ve tvaru Jira (`1h 45m`, `45m`, nejvýš `4h`), `commentBody`,
`contentFormat "markdown"`.
