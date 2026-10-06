# Plán fáze 1 (zadání: zadani-model-Q1-2027.md)

Datum: 2026-10-06. Fáze 1 jen čte. Nic nezapisuje do Google Drive ani do rozpočtové tabulky.

## Kroky

1. **Rešerše CFO praxe** (web): skupinový manažerský P&L v malé servisní skupině, eliminace
   intercompany, fixní/variabilní, driver-based plán, rolling forecast. → `docs/01-cfo-praxe.md`, 1 strana, zdroje, 1 doporučení.
2. **Confluence TFA**: Manažerská uzávěrka skupiny, Výjimky a pravidla 2026, Kategorizace TF/TIO/DBG/RTSG 2026,
   Cost correction TIO 2026, Cost Correction RTSG 2026, Korekce nákladů na board, Odměny boardu DBG, Revize rozpočtů,
   Účetní uzávěrka skupiny. Plus podstránky a odkazované tabulky (Cost kategorie 2026, Přefakturace TF vs. TIO).
3. **Rozpočtová tabulka 2026-09** (jen čtení): listy Číselníky, Slovníček, Board náklady 2026, Rozpad nákladu boardu,
   firemní listy DBG/TIO/TF/RTSG (řádky s přefakturací), Skupina (referenční čísla, pohled BEZ přefakturace).
4. **Syntéza** → `docs/02-skupina-fungovani.md`: matice vztahů (kdo → komu, co, klíč/částka, periodicita, kde v ERP),
   jak se dnes eliminuje, korekce, výjimky 2026, seznam NEZNÁMÝCH. U každého tvrzení zdroj.
5. **Otázky** → `docs/03-otazky.md`, max 15, podle dopadu, s výchozím předpokladem. Povinně: odměny boardu před/po,
   existence plánu 2027. Položit interaktivně. **STOP.**

Commit po každém výstupu (01, 02, 03).

## Kontrola plánu proti kritériím přijetí (bod 5 zadání)

Kritéria se měří až na modelech ve fázi 2. Fáze 1 musí dodat podklady, aby se měřit dala:

| Kritérium | Co fáze 1 dodá | Krok |
|---|---|---|
| Σ intercompany = 0 | úplný seznam IC toků s oběma stranami (výnos u koho, náklad u koho) | 2, 3, 4 |
| každá kategorie Číselníků právě jednou | seznam kategorií 2026 po firmách jako příloha docs/02 | 3 |
| shoda s listem Skupina do 2 % | referenční čísla posledního plánovaného měsíce 2026 (příjmy, náklady, profit, BEZ přefakturace) zapsaná v docs/02 | 3 |
| drivery se propisují | identifikované drivery a kde dnes žijí (TF_plán_sazeb_příjmů, TF_počet_lidí, TIO predikce, Board náklady) | 3, 4 |
| model A = model B | jednoznačná definice každé eliminace (co se ruší proti čemu) | 4 |

## Rizika

- Confluence nemusí popisovat částky/klíče, jen postupy → označit NEZNÁMÉ, převést na otázku.
- Limit 15 otázek → seskupovat, drobnosti pod 2 % nákladů skupiny za Q1 řešit předpokladem v docs/03.
- Odkazované tabulky mimo rozpočet mohou být nedostupné → zapsat jako NEZNÁMÉ se jménem souboru.
