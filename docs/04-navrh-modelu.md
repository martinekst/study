# Návrh modelu Q1 2027: co bude jak nastavené a kde se simuluje

Stav: návrh před fází 2. Nic v Google Drive zatím nevzniklo. Cíl modelu podle tvé odpovědi: **simulace**, ve
které jdou měnit náklady a příjmy, je vidět dopad rozhodnutí a je srozumitelné, co se změnilo a proč.

---

## 1. Struktura Google Sheetu „2027-Q1 Model skupiny“

| List | K čemu | Kdo do něj sahá |
|---|---|---|
| **Předpoklady** | Jediné místo pro vstupy. Každý parametr má řádek: *Parametr · Jednotka · Základ · Simulace · Δ · Zdroj · Kam se propisuje*. Sloupec **Základ** je zamčený (hodnoty z fáze 1). Sloupec **Simulace** je tvůj, na začátku = Základ. | ty (jen sloupec Simulace) |
| **Model A** | „Firma po firmě“. 4 bloky (TF, TIO, DBG, RTSG) + Skupina = součet. IC očištěné uvnitř firem: nájem je nákladem DBG (Titanium), ne TF; TIO fee ani paušály se neobjeví. Měsíce 1–3/2027 + Q1. Počítá se pro Základ i Simulaci, zobrazuje se podle přepínače. | nikdo (vzorce) |
| **Model B** | „Konsolidační“. Stejné bloky, ale IC řádky viditelné (DBG výnos z nájmu, TF náklad nájmu, TIO fee, RTSG → TF) a sloupec **Eliminace**. Skupina = Σ firem − Eliminace. Musí dát stejnou skupinu jako A. | nikdo (vzorce) |
| **Porovnání** | Základ vs. Simulace vedle sebe pro skupinu i firmy (Q1 a měsíce), Δ v Kč a %. **Most změny**: rozklad Δ výsledku skupiny na bloky (výnosy TF, výnosy TIO, variabilní, lidé, fixní, board). **Změny**: automatický seznam parametrů, kde Simulace ≠ Základ, s Δ. Pole „Co simuluji“ pro tvou poznámku. | ty (jen poznámka) |
| **Kontrola** | Kritéria přijetí: Σ IC = 0; A = B; shoda s plánem 11/2026 podle metodiky uzávěrky do 2 % (sloupec s vstupy 11/2026 a bridge); každá kategorie z Číselníků zařazena právě jednou. | nikdo |
| **Zdroje** | Odkud je každý Základ (odkaz na docs/02, list rozpočtu, stránku Confluence). | nikdo |

Postup simulace: změníš hodnoty ve sloupci **Simulace** → Porovnání ukáže Δ po firmách a blocích, Změny vypíšou,
co jsi změnil, most ukáže, kudy se změna propsala do výsledku. Základ zůstává netknutý, takže se dá kdykoli vrátit.
Více scénářů najednou tahle verze neumí (jen Základ + 1 Simulace); další scénář = kopie sloupce Simulace (fáze 3).

---

## 2. Řádky P&L (stejné pro každou firmu i skupinu)

```
Externí výnosy              (TF: interní tým, externisté inhouse, outsource; TIO: fee za zprostředkování, TIO outsource; DBG, RTSG = 0)
− Variabilní náklady        (externisté, outsource dodavatelé, variabilní odměny AM)
= Contribution margin
− Polo-fixní lidé           (interní tým TF po rolích, HR, sales fix, BDR, administrativa DBG, úklid)
− Fixní režie               (nájem+energie Titanium, účetní, licence a infra, právník, O2/internet, HR_INT/EXT, ostatní)  ← řádky se smlouvou mají indexaci +7 %
= Výsledek před odměnami boardu
− Odměny boardu: fixní část
− Odměny boardu: variabilní část
= Výsledek po odměnách boardu          ← metodika uzávěrky
[jen Model B:] IC výnosy / IC náklady / Eliminace
```

---

## 3. Co bude v Základu (hodnoty a zdroje)

Zkratky zdrojů: **P** = plán 10–12/2026 z rozpočtu, **S** = skutečnost 7–8/2026 z uzávěrky/rozpočtu, **Ø** = průměr P a S
(tvá volba Q2), **+7 %** = indexace fixních smluv (tvá volba Q7). Částky v tis. Kč/měs, pokud není uvedeno jinak.

### 3.1 Kalendář
| Parametr | Základ | Zdroj |
|---|---|---|
| Pracovní dny 1/2/3 2027 | 20 / 20 / 21 | kalendář ČR (1.1. pátek; Velký pátek 26.3., Velikonoční pondělí 29.3.) |
| Koeficient absencí | 1,00 / 1,07 / 1,06 | Číselníky rozpočtu |
| Plán MD na člověka | 20,0 / 18,7 / 19,8 | výpočet |

### 3.2 TF výnosy (drivery, tvá volba Q3) – **páky pro simulaci**
| Role | Lidé | Fakturovatelnost | Sazba Kč/MD | Zdroj |
|---|---|---|---|---|
| Dev junior / medior / senior | 0 / 1 / 6 | 80 % | 8 000 / 8 500 / 9 000 | P 12/2026 |
| TL (TeamLead+Head 2, TechLead 2) | 4 | 60 % | 11 000 | P 12/2026 |
| QA | 2 | 75 % | 9 000 | P 12/2026 |
| Analytik | 2 | 75 % | 7 950 | P 12/2026 |
| PM | 1,5 | 83 % | 6 900 | P 12/2026 |
| Externisté outsource – výnos | 188 | přirážka 25 % → náklad 150 | Ø (P 153, S 222) |
| Externisté inhouse – výnos | 0 | | P (od 7/2026 nula, průměr by vrátil zaniklý příjem) |

Výnos = lidé × MD × fakturovatelnost × sazba. Orientačně Q1 2027: **TF interní tým ≈ 6,46 mil. Kč** (2,21 / 2,07 / 2,19 mil.), + outsource ≈ 0,56 mil.

### 3.3 TF náklady
| Řádek | Typ | Základ | Zdroj / poznámka |
|---|---|---|---|
| Interní tým (Dev+TL / QA / BA / PM) | P | 768 / 134 / 189 / 120 = **1 211** | P 12/2026 WAGES_*. **Pozor:** přepočet přes přímý náklad/h z listu sazeb (Dev 578, TL 800, QA 433, AN 693, PM 430 Kč/h × 8 h × MD) dává ~1 620. Základ bere rozpočet, parametr „náklad na hlavu“ je páka. |
| Outsource dodavatelé | V | 150 | výnos / 1,25 |
| HR_WAGES | P | 0 | P (interní HR skončilo 9/2026) |
| HR_INT / HR_EXT | F | 46 / 1 | Ø |
| Účetní Fullcom | F +7 % | 40 | Ø 38 × 1,07 |
| Infra a licence (INFRA) | F +7 % | 61 | Ø 57 × 1,07 |
| Realizace OTHERS (licence, certifikace, vybavení) | F +7 % | 113 | Ø 106 × 1,07 |
| Právník | F | 35 | Ø |
| O2 / internet / drobné office | F +7 % | 12 | Ø 11 × 1,07 (OFFICE bez nájmu) |
| Ostatní (OTHER) | F | 18 | Ø |
| Nájem DBG, paušál DBG, TIO fee, HW DBG, RE_INV | IC | jen Model B | eliminuje se |

### 3.4 TIO
| Řádek | Typ | Základ | Zdroj |
|---|---|---|---|
| GMV zprostředkování | driver | 485 | Ø (P 327, S 644) |
| Fee za zprostředkování | výnos | 15 % GMV ≈ 73 | Slovníček |
| TIO outsource výnos / náklad | V | 0 / 0 (marže 25 %) | P i S nula |
| AM mzdy (fix + variabilní) | P | 113 | Ø |
| BDR mzdy | P | 22 | Ø |
| HR (TIO_HR bez boardu) | F | 80 | Ø |
| Ostatní, infra, sales, účetní | F | 32 / 18 / 8 (účetní +7 %) | Ø |
| Internet, telefony (od TF) | F | 4 | P |
| **TIO fee → TF** | IC | **dorovnání na nulu**: fee = náklady TIO (vč. IC a podílu boardu) − externí výnosy TIO | tvá volba Q9; přepínač 10 % / 13 % / dorovnání |

### 3.5 DBG
| Řádek | Typ | Základ | Zdroj |
|---|---|---|---|
| Nájem + energie + služby Titanium | F +7 % | **626** | Ø 585 (P 592, S 578) × 1,07 |
| Úklid (OFFICE_WAGES) | P | 25 | Ø |
| Mzdy administrativy (ADM_WAGES) | P | 68 | Ø |
| Účetní | F +7 % | 11 | Ø 10 × 1,07 |
| Ostatní | F | 2 | Ø |
| IC výnosy (jen Model B): nájem TF / TIO / RTSG | IC +7 % | 613 / 230 / 80 | 573 207 / 215 300 / 75 200 × 1,07 |
| IC výnosy (jen Model B): paušály TF / TIO / RTSG | IC +7 % | 221 / 36,5 / 8 | 206 504 / 34 104 / 7 500 × 1,07 |
| IC výnosy (jen Model B): HW | IC | 15 / 2,4 / 0,6 | P |

### 3.6 RTSG
| Řádek | Typ | Základ | Zdroj |
|---|---|---|---|
| Účetní | F +7 % | 6 | Ø 5,5 × 1,07 |
| Licence (LinkedIn, GSuite, Pipedrive, mobily) | F +7 % | 5 | Ø |
| Mzdy | P | 0 | P |
| IC (jen Model B): nájem DBG 80, paušál 8; fakturace RTSG → TF = náklady RTSG (výsledek 0) | IC | | tvá volba Q10 |

### 3.7 Board – **páky pro simulaci** (tvá volba Q5, upřesněno 7.10.)
| Parametr | Základ | Poznámka |
|---|---|---|
| Počet členů | **5** | editovatelné (současnost) |
| Fixní část na člena / měs | **120 000 Kč** | editovatelné |
| Variabilní část na člena / měs | **10 000 Kč** | editovatelné, první odhad; pevná částka, **ne** vzorec z obratu a ziskovosti |
| Odměny boardu celkem / měs | 5 × (120 + 10) = **650 tis. Kč** | = počet členů × (fix + variabilní) |
| Rozpad do firem (jen pro pohled na firmy v Modelu B) | DBG 12 % / TF 47,6 % / TIO 40,4 % / RTSG 0 % | Náklady DBG BOARD 2026, 9–12/2026 |

Pravidla 2026 (fix 5,5 × min. mzda, variabilní podle plnění obratu a profitability s plovoucími vahami) se
**do modelu nepřenášejí**. Měsíční nároky 2026 v Číselníkách jsou záměrně rozvržené tak, aby board měl ve druhé
půlce roku menší nárok a v prosinci se vše dopočítalo a dorovnalo (ochrana proti přečerpání a cashflow).
Odvozovat z nich obecnou výši odměn by bylo špatně. Model odměn se pro 2027 má změnit; proto jsou obě složky
jen čísla k simulaci.

### 3.8 Ostatní parametry
| Parametr | Základ |
|---|---|
| Indexace fixních smluv | **7 %** (jedna buňka; řádky s indexací jsou v modelu barevně označené a mají sloupec „před indexací“) |
| Kurz EUR (nájem TF) | 24,2 |
| Přepínač scénáře pro listy Model A / B | Simulace |

---

## 4. Co z toho orientačně vyjde (jen pro představu, ne výsledek fáze 2)

Externí výnosy skupiny Q1 ≈ 7,2 mil. Kč (TF 7,0 + TIO 0,2). Náklady skupiny Q1 ≈ 10,0 mil. Kč (lidé TF 3,6; fixní TF 1,0;
outsource 0,45; TIO 0,8; DBG 2,2; RTSG 0,03; board 1,95). **Výsledek po odměnách boardu ≈ −2,8 mil. Kč za Q1**
(≈ −0,9 mil./měs). To odpovídá plánu Q4 2026 (−0,7 až −1,5 mil./měs). Práh 2 % nákladů ≈ 200 tis. Kč/Q.

---

## 5. Kontrola (kritéria přijetí)

1. Σ IC výnosů − Σ IC nákladů = 0 (Model B, sloupec Eliminace).
2. Skupina v Modelu A = skupina v Modelu B (na korunu).
3. Sloupec „11/2026 kontrola“: do stejné struktury dosazené vstupy plánu 11/2026 (bez indexace, lidé a sazby 11/2026,
   board = hodnota nároku 11/2026 z Číselníků rozpočtu, 372 tis., aby se porovnávalo stejné se stejným; pro Q1 2027 platí kap. 3.7). Výsledek se porovná se zisk skupiny 11/2026 podle metodiky uzávěrky
   (Σ výsledků firem z rozpočtu, pohled S přefakturací: DBG 409 − TIO 304 − TF 838 + RTSG 3 = −730; − nevybrané odměny 394 = **−1 124 tis. Kč**;
   dále se zohlední zbytek paušálu TF 126,5 tis., který rozpočet TF nenese, ale účetnictví ano). Bridge bude v listu Kontrola. Tolerance 2 %.
4. Každá podkategorie z docs/02 kap. 9 má přiřazený typ (V/P/F/B/IC) a firmu – zaškrtávací tabulka.
5. Změna jednoho parametru v Simulaci se propíše do Porovnání bez ručního zásahu.

---

## 6. Co fáze 2 nebude (abys věděl dopředu)

- Víc než jeden simulační scénář současně.
- Měsíce mimo Q1 2027 (struktura to umožní přidat: další sloupce).
- Cashflow, DPH, daň z příjmu, rozvahu.
- Automatické načítání skutečnosti z ERP/Metabase (Základ je statický snímek z fáze 1).
- Grafy. Nejdřív čísla; graf dopadu lze přidat ve 3. iteraci, pokud bude chtít.

## 7. Rozhodnutí, která potřebuji před startem

1. Souhlasíš se strukturou listů a mechanikou Základ / Simulace / Porovnání (kap. 1)?
2. Interní tým TF: Základ z rozpočtu (1 211 tis./měs), nebo z přímého nákladu na hodinu (~1 620)? Rozdíl 1,2 mil. Kč/Q, nad prahem.
3. Pravidlo „plán místo průměru u zaniklých položek“ (HR TF, externisté inhouse) je v pořádku?
4. Indexace 7 % i na IC ceny DBG (nájmy a paušály dceřinkám)? Pro skupinu nula, mění jen pohled na firmy.
