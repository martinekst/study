# Porovnání modelů A a B, Q1 2027 (výstup fáze 2)

Model: Google Sheet **„2027-Q1 Model skupiny“**
https://docs.google.com/spreadsheets/d/1QJ_U_FDhai8_ZBAhcC6fA4hY51LkijAcaF4xAg8MLsU
Stav 7.10.2026: 2 iterace (sestavení a kontrola; oprava popisků, které Sheets vyhodnotil jako vzorce).
Všechna kritéria přijetí ze zadání (bod 5) jsou splněna, viz list **Kontrola**. Existující rozpočet 2026-09 zůstal netknutý.

## 1. Výsledek Základ, Q1 2027 (tis. Kč bez DPH)

| | TF | TIO | DBG | RTSG | **Skupina** |
|---|---|---|---|---|---|
| Externí výnosy | 7 023 | 218 | 0 | 0 | **7 242** |
| Variabilní náklady | 451 | 0 | 0 | 0 | 451 |
| Polo-fixní lidé | 4 109 | 447 | 279 | 0 | 4 835 |
| Fixní režie | 969 | 203 | 1 916 | 34 | 3 121 |
| z toho indexace smluv 7 % | 34 | 2 | 125 | 2 | 166 |
| **Výsledek před odměnami boardu** | 1 495 | −432 | −2 195 | −34 | **−1 166** |
| Odměny boardu (5 × 130 tis. × 3) | 928 | 788 | 234 | 0 | 1 950 |
| **Výsledek po odměnách boardu** | 566 | −1 219 | −2 429 | −34 | **−3 116** |

Po měsících (skupina, po odměnách): leden −1 018, únor −1 071, březen −1 027. Rozdíl mezi měsíci dělá jen počet MD.

Čtení: skupina prodělává zhruba 1 mil. Kč měsíčně. Interní tým TF si na sebe vydělá (výsledek TF před boardem +1,5 mil. za Q1),
ztrátu tvoří kanceláře a administrativa (DBG 2,2 mil. za Q1, z toho Titanium 1,88 mil.), odměny boardu (1,95 mil.) a sales (TIO −0,4 mil.).

## 2. Model A vs. Model B

| | Model A „firma po firmě“ | Model B „konsolidační“ |
|---|---|---|
| Co ukazuje | Každou firmu jen s externími výnosy a náklady, které reálně vznikají. Nájem je nákladem DBG vůči Titaniu, TIO fee ani paušály neexistují. | Firmy tak, jak si fakturují (IC ceny 2026): DBG má výnos z nájmů a paušálů, TF náklad nájmu, paušálu a TIO fee, RTSG fakturuje TF své náklady. Sloupec Eliminace IC vynuluje. |
| Výsledek skupiny Q1 | −3 116 | −3 116 (shodně, kontrola 2) |
| Výsledek firem Q1 | TF +566, TIO −1 219, DBG −2 429, RTSG −34 | TF −4 076, TIO 0, DBG +960, RTSG 0 |
| Měsíční detail | ano (1–3/2027 + Q1) | ne, jen Q1 |
| Páky | všechny vstupy Předpokladů | navíc IC ceny a režim TIO fee |
| Hodí se na | rozhodování o skupině: lidé, sazby, fakturovatelnost, nájem, board | pochopení, kolik která firma „převádí“ ostatním; nastavení TIO fee a fakturace RTSG |

**Doporučení:** řídit se Modelem A. Je čitelnější, má měsíce a odpovídá tomu, co jsi řekl: přefakturace v modelu neřešit.
Model B nech jako doplněk pro dva účely: (1) ukáže, že TIO fee potřebné k nule TIO vychází na **666 tis. Kč/měs**
(1 999 za Q1), tedy výš než skutečnost 338–865 tis. v roce 2026, protože TIO nese nájem 215, paušál 34 a podíl boardu 263 tis./měs;
(2) ukáže, že DBG při IC cenách 2026 vydělá +320 tis./měs, což je přesně marže na nájmu a paušálech, kterou Model A rozpouští do TF/TIO/RTSG.

## 3. Kontrola shody s plánem 11/2026 (kritérium 2 %)

| Položka | tis. Kč |
|---|---|
| Model se vstupy plánu 11/2026 (bez indexace, lidé a sazby 11/2026, board 754 = rozpad ve firmách 360 + nevybrané 394) | −1 201 |
| + zbytek administrativního paušálu TF, který rozpočet TF nenese, ale DBG ho má ve výnosech | +126,5 |
| + rozdíl plánovaného výnosu TF (2 223) vs. driverový výpočet (2 289) | −66 |
| = srovnatelný výsledek | −1 140 |
| Cíl: Σ výsledků firem 11/2026 (S přefakturací) − nevybrané odměny boardu = −730 − 394 | −1 124 |
| Odchylka | −16 = **1,4 %** |

Zbytková odchylka 16 tis. jsou drobné asymetrie IC v rozpočtu (HW 10 vs. 19, zaokrouhlení). Rozdíl výnosu TF o 66 tis. vzniká tím,
že rozpočet 11/2026 nepočítá výnos přesně jako lidé × MD × fakturovatelnost × sazba; drivery dávají o 3 % víc.

## 4. Jak simulovat

1. V listu **Předpoklady** změň hodnoty ve žlutém sloupci **Simulace** (sloupec F). Základ (E) neměň, je chráněný varováním.
2. Do **Porovnání!B2** napiš, co simuluješ.
3. V **Porovnání** čti: tabulku Základ vs. Simulace po firmách, **most změny** (kudy se Δ propsala do výsledku skupiny)
   a seznam **Změněné parametry** (vyplní se sám).
4. **Model A** ukáže měsíční detail, **Model B** dopad na vzájemnou fakturaci.
5. Návrat: přepiš Simulaci zpět na hodnotu Základu (nebo smaž a zkopíruj E → F).

Ověřeno testem: Dev senior 6 → 5 sníží výnos TF o 421 tis., náklad lidí o 271 tis., výsledek skupiny o **151 tis. Kč za Q1**;
seznam změn ukázal jeden řádek, most seděl na nulu.

Páky s největším dopadem (Q1): sazby a fakturovatelnost TF (1 p. b. fakturovatelnosti ≈ 80 tis.), počet lidí (1 senior ≈ 150 tis. čistého),
nájem Titanium (10 % ≈ 188 tis.), odměny boardu (1 člen ≈ 390 tis.), indexace smluv (7 % = 166 tis.).

## 5. Co v Základu stojí za pozornost

- **Polo-fixní lidé TF** = přímý náklad/h z listů TF_RR_* × 8 h × MD (1 405 tis./měs za 16,5 lidí). TeamLead a Head of Dev (2 ze 4 TL)
  nemají v rozpočtu vlastní náklad, model je bere jako kryté boardem, výnos za ně počítá. Pokud mají náklad jinde, přidej ho.
- **Průměr plánu a skutečnosti** zvedl oproti plánu Q4 hlavně GMV TIO (485 vs. 327) a některé režie TF (právník, ostatní).
- **HW pronájem**: v Modelu A nemá DBG žádný náklad HW (nákupy jsou cash, v Q1 nula), v Modelu B je IC výnos 54 tis./Q.
- **TIO fee 666 tis./měs** je číslo z dorovnání, ne obchodní dohoda. Přepínačem v Předpokladech (řádek 60) jde přepnout na 10 % obratu TF.

## 6. Co model neumí (viz docs/04 kap. 6)

Jeden simulační scénář současně; měsíce jen Q1 (sloupce lze přidat); bez cashflow, DPH a daně; bez napojení na ERP; bez grafů.
Náklady lidí jsou lineární v MD (dovolené snižují náklad i výnos stejně), což u zaměstnanců na HPP podhodnocuje náklad v měsících s málo MD.

## 7. Iterace

| # | Co | Výsledek |
|---|---|---|
| 1 | Založení souboru, 6 listů, 84 parametrů, vzorce, kontroly | kontroly 1–4 OK; 6 popisků začínajících „+“ a „=“ se vyhodnotilo jako vzorec (#ERROR!) |
| 2 | Oprava popisků (apostrof), test simulace, formátování, ochrana Základu | bez chyb; simulace i most fungují |
| 3 | nevyužita | |
