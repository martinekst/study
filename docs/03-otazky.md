# Otázky k modelu Q1 2027 (fáze 1)

Práh pro otázku (zadání, bod 6): dopad na výsledek skupiny za Q1 2027 nad **2 % nákladů skupiny za Q1**.
Základ: plán Q4 2026, náklady skupiny 13 252 tis. Kč → práh ≈ **265 tis. Kč za kvartál**.
Co je pod prahem nebo jen přesouvá peníze uvnitř skupiny, je v části B jako předpoklad.

Seřazeno podle dopadu. U každé otázky je výchozí předpoklad, pokud neodpovíš.

## A. Otázky

### Q1. Existuje plán 2027? (povinná)
Rozpočet končí 12/2026, sloupce 2027 v přefakturacích jsou prázdné, TIO predikce je jen 2026.
- a) **Neexistuje** → model pojede z run-rate plánu 10–12/2026 (lidé, sazby, fakturovatelnost, TIO Q4). *(výchozí)*
- b) Existuje částečně (lidé / sazby / pipeline), pošlu.
- c) Existuje kompletní, pošlu odkaz.
Dopad: celý výnos TF, 6–7 mil. Kč/Q.

### Q2. Základna pro run-rate
- a) **Plán 10–12/2026 z rozpočtu** (TF příjem 2,4 → 1,7 mil. Kč/měs; skupina ve ztrátě 0,7–1,5 mil./měs). *(výchozí, doporučeno)*
- b) Skutečnost 7–8/2026 z uzávěrky (obrat 5,2 a 3,9 mil. Kč/měs).
- c) Průměr obojího.
Dopad: rozdíl mezi a) a b) ≈ 8 mil. Kč výnosů za Q1.

### Q3. Které parametry TF převzít z plánu 10–12/2026 beze změny? (více možností)
- Počty lidí na realizaci 16,5 (Dev 0+1+6, TL 2+2, QA 2, AN 2, PM 1,5).
- Sazby (Dev 8 000 / 8 500 / 9 000, TL 11 000, QA 9 000, AN 7 950, PM 6 900 Kč/MD).
- Fakturovatelnost (Dev 80 %, TL 60 %, QA 75 %, AN 75 %, PM 83 %).
- Nic z toho, dodám jiné hodnoty.
*(výchozí: všechny tři)*. Dopad: každý parametr samostatně > 600 tis. Kč/Q.

### Q4. Výsledek před, nebo po odměnách boardu? (povinná)
- a) **Obojí**: „Výsledek před odměnami boardu“, pod ním blok odměn (fix + variabilní), finální „Výsledek po odměnách“ = metodika uzávěrky. *(výchozí, doporučeno)*
- b) Jen po odměnách (board jako běžný režijní náklad).
- c) Jen před odměnami (board mimo model).
Dopad: 5 × 209 200 × 3 ≈ 3,1 mil. Kč/Q.

### Q5. Jak modelovat odměny boardu v Q1 2027
- a) **Fix 5 × 123 200 = 616 tis./měs + variabilní část z výsledku modelu** podle pravidel 2026 (cíl obrat/profitabilita, plovoucí váhy), parametry 2026. *(výchozí, doporučeno)*
- b) Nárok při splnění cíle 5 × 209 200 = 1 046 tis./měs, bez vazby na výsledek.
- c) Run-rate nároku H2 2026 (~450 tis./měs).
- d) Jiné parametry 2027 (minimální mzda 2027, násobek, cíle, budget), pošlu.
Dopad: a) vs b) ≈ 1,3 mil. Kč/Q.

### Q6. Na co odsouhlasit model (kritérium 2 %)
- a) **Metodika Manažerské uzávěrky** (Σ výsledků firem − nevybrané odměny boardu), aplikovaná na plán **11/2026** z rozpočtu. *(výchozí, doporučeno)*
- b) Metodika uzávěrky, **Q4 2026 celkem**.
- c) Řádek Profit „Pohled BEZ přefakturace“ listu Skupina, 11/2026 (−676 tis.).
- d) Řádek Profit „Pohled BEZ přefakturace“, Q4 2026 celkem (−2 973 tis.).
Poznámka: 12/2026 obsahuje roční dorovnání boardu 1 435 tis., proto ne 12/2026. Pohled BEZ v rozpočtu není čistá konsolidace (docs/02, kap. 4.2).

### Q7. Fixní smlouvy beze změny v Q1 2027?
Nájem a energie Titanium (DBG_OFFICE ~614 tis./měs), účetní Fullcom, paušály DBG (206 504 / 31 604 / 7 500), licence, O2/internet.
- a) **Ano, vše beze změny.** *(výchozí)*
- b) Nájem se mění (uvedu výši a od kdy).
- c) Mění se více věcí (uvedu).
Dopad: nájem 1,8 mil. Kč/Q; změna o 15 % překročí práh.

### Q8. Pravidlo fixní / variabilní (docs/02, kap. 10)
- a) **Schvaluji návrh**: V = externisté, outsource dodavatelé, variabilní odměny AM, cloud účtovaný klientům; P (polo-fixní lidé) = interní tým, HR, sales fix, BDR, administrativa, úklid; F = smlouvy, licence, režie; board zvlášť. *(výchozí)*
- b) Interní tým brát jako fixní (bez samostatného bloku P).
- c) Upravím (napíšu).

### Q9. TIO fee v modelu (jen pohled na firmy, pro skupinu nulový dopad)
- a) **10 % z manažerského obratu TF** (rozpočet 2026). *(výchozí)*
- b) 13 % + zisk outsource projektů (Confluence).
- c) Nastavit tak, aby TIO vyšlo na nulu (jako při revizích).

### Q10. RTSG v Q1 2027 (pro skupinu < 50 tis. Kč/Q, otázka strukturální)
- a) **Pokračuje beze změny** (nájem DBG 75,2 tis., paušál 7,5 tis., účetní, licence; fakturuje TF podle potřeby). *(výchozí)*
- b) Ukončuje se / slučuje k datu (uvedu).

## B. Předpoklady (pod prahem nebo jen IC), platí, pokud neřekneš jinak

1. **RE_INV_DBG v TF** (132–292 tis./měs) = zbytek adm. paušálu 126 504 Kč (IC) + drobné odměny lidí DBG vyplacené v TF. Bereme jako IC, reálný náklad administrativy je v DBG (ADM_WAGES ~70 tis./měs). Bez dvojího započtení.
2. **Kurz EUR** pro nájem TF (16 040 EUR): 24,2 Kč/EUR (implicitně z uzávěrky). Jen IC.
3. **Energie**: roční vyúčtování Titanium nemodelujeme zvlášť, zálohy jsou v DBG_OFFICE.
4. **HW pronájem** DBG → firmy: IC; reálný náklad DBG = nákupy HW (cash), v Q1 2027 = 0.
5. **Dohledané/nedohledané rozdíly, nedaňové náklady, nevybrané odměny z minulých let**: nemodelujeme.
6. **Přefakturace TF → TIO** (~8 tis./měs) a **RTSG → TF**: IC, reálné náklady zůstávají tam, kde vznikají (TF, RTSG).
7. **Pracovní dny Q1 2027**: leden 20, únor 20, březen 21 (Velký pátek 26.3., Velikonoční pondělí 29.3.). Koeficient na dovolené/nemoci z Číselníků (1,00 / 1,07 / 1,06) → plán MD ≈ 20,0 / 18,7 / 19,8.
8. **TIO externí výnosy** Q1 2027 = run-rate Q4 2026: fee za zprostředkování ~50 tis./měs (15 % GMV), TIO outsource 0. Sales mzdy AM ~120 tis., BDR 25 tis./měs.
9. **Rozpad boardu**: procenta 9–12/2026 (DBG 12 % / TF 47,6 % / TIO 40,4 % / RTSG 0 %).
10. **Vyblokované kapacity**: TL 8 %, PM 20 %, AN 3 % (plán 12/2026).
11. **Jednotky**: tis. Kč bez DPH, měsíce 1–3/2027 + Q1.
12. **Google Sheet**: nový soubor „2027-Q1 Model skupiny“ ve tvém Drive, listy Předpoklady, Model A, Model B, Porovnání. Existující rozpočet se nemění.
13. **DBG a RTSG** mají externí výnosy 0 (jako v uzávěrce).

---

## C. Odpovědi (7.10.2026, interaktivně)

| # | Otázka | Odpověď | Důsledek pro model |
|---|---|---|---|
| Q1 | Plán 2027 | **Neexistuje** | run-rate z plánu 10–12/2026 |
| Q2 | Základna run-rate | **Průměr** plánu 10–12/2026 a skutečnosti 7–8/2026 | platí pro položky bez driveru (TIO, režie, HR, licence, sales mzdy); upřesněno níže |
| Q3 | Parametry TF | **Počty lidí, sazby i fakturovatelnost** z plánu 10–12/2026 | výnos TF = drivery, ne průměr |
| Q4 | Před / po odměnách boardu | **Obojí** | řádky „Výsledek před odměnami boardu“, blok odměn, „Výsledek po odměnách“ |
| Q2/Q3 kolize | Jak spojit průměr a drivery | **Drivery pro TF, průměr pro zbytek** | TF výnos z driverů Q4; průměr na položky bez driveru |
| Q5 | Odměny boardu | Fix ~120 tis./měs na člena + variabilní podle obratu a % ziskovosti; **model se příští rok změní, nech to jako proměnnou pro simulace**. Upřesnění 7.10.: měsíční nároky 2026 jsou záměrně rozvržené s dorovnáním v prosinci, neodvozovat z nich obecnou výši. | board = **počet členů (5) × (fix 120 tis. + variabilní 10 tis.) Kč/měs**, všechna tři čísla editovatelná; pravidla 2026 se nepřenášejí |
| Q6 | Cíl shody | **Metodika uzávěrky, 11/2026** | list Kontrola s bridge na plán 11/2026 |
| Q7 | Fixní smlouvy | **Nárůst o 7 %, jasně označit** | parametr „Indexace fixních smluv“ = 7 %, aplikuje se na označené řádky (nájem a energie Titanium, Fullcom, paušály DBG, licence, O2/internet); v modelu zvýrazněno |
| Q8 | Fixní / variabilní | **Schválen návrh** | V / P / F / Board / IC podle docs/02 kap. 10 |
| Q9 | TIO fee | **Dorovnat TIO na nulu** | fee TIO → TF = náklady TIO − externí výnosy TIO; v listu Předpoklady přepínatelné (10 % / 13 % / dorovnání) |
| Q10 | RTSG | **Pokračuje beze změny** | RTSG samostatný blok, náklady Q4 run-rate, fakturace na TF = náklady RTSG (výsledek 0) |
| Fáze 2 | Spustit hned? | **Ne.** Nejdřív přehled, co je jak nastavené a kde a jak se budou simulovat změny. Cíl: simulace dopadů rozhodnutí se srozumitelným „co se změnilo“. | → `docs/04-navrh-modelu.md` |

Upřesnění k Q2 („průměr pro zbytek“): tam, kde je plán Q4 nula kvůli známé změně (odchod interního HR TF od 9/2026,
externisté na inhouse projektech = 0), bere se plán, ne průměr. Průměr by jinak vrátil náklad, který už neexistuje.
Seznam takových položek je v docs/04, část 3.

## D. Doplnění před startem fáze 2 (7.10.2026)

| Otázka | Odpověď | Důsledek pro model |
|---|---|---|
| Struktura listů Základ / Simulace / Porovnání | **OK** | beze změny |
| Náklad interního týmu TF | **Přesnější odhad je v listech TF_RR_DEV / QA / BA / PM / OTHER** (mzdové řádky listu TF mohou obsahovat odstupné). | Náklad na hlavu = přímý náklad/h × 8 h × MD: Dev 578, TechLead 800, QA 433, BA 693, PM 588 Kč/h (listy TF_RR_*, odhad 2026). Při 20 MD ≈ 1 405 tis./měs za 16,5 lidí. Licence realizace z TF_RR_OTHER 56 tis./měs. |
| Zaniklé položky (interní HR TF, externisté inhouse) | **Plán Q4** (ne průměr) | HR_WAGES TF = 0, EXT_INHOUSE = 0 |
| Indexace 7 % na IC ceny DBG | **Neřešit.** Zdražení Titania o 7 % nese DBG, přefakturace se v modelu nemění. | IC ceny v Modelu B zůstávají na úrovni 2026 (nájmy 573,2 / 215,3 / 75,2; paušály 206,5 / 34,1 / 7,5 tis.). Indexace se týká jen externích smluv. Hlavní pohled je Model A (bez přefakturací); Model B je doplněk podle zadání. |
| Start fáze 2 | **Ano** | |
