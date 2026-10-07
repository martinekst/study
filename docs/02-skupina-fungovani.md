# Fungování skupiny DBG / TF / TIO / RTSG mezi sebou (stav 10/2026)

Účel: kontext pro AI a lidi, kteří staví zjednodušený manažerský model skupiny. Popisuje, kdo komu co
fakturuje, jak se dnes počítá výsledek skupiny, jak fungují korekce a kde jsou díry. Každé tvrzení má zdroj
(Confluence prostor „TF - Administrativa“, klíč TFA, nebo konkrétní Google Sheet). Co ve zdrojích není, je
označeno **NEZNÁMÉ**. Částky jsou v Kč bez DPH, pokud není uvedeno jinak; rozpočet pracuje v tis. Kč.

Zkratky: IC = intercompany (vnitroskupinová fakturace). ERP = interní ERP TechFides (Company profit,
Company calculation, Bank transactions, korekce). Premier = účetní software. CP = company profit v ERP.

---

## 1. Firmy a jejich role

| Firma | Role ve skupině | Externí výnosy | Hlavní náklady | Zdroj |
|---|---|---|---|---|
| **DBG** (Digital Boost Group s.r.o.) | Holding/servisní firma: nájemce kanceláří BC Titanium, zaměstnavatel administrativy a části boardu. Pronajímá kanceláře a HW, fakturuje administrativní paušál ostatním. | **0** (jen IC) | nájem + energie Titanium, mzdy administrativy a úklidu, účetní Fullcom, podíl boardu | [Přehled korekcí], [Přefakturace - DBG], rozpočet list DBG |
| **TF** (TechFides Solutions s.r.o.) | Hlavní dodavatel vývoje klientům. Nositel ~90 % externích výnosů skupiny. | fakturace klientům (interní tým + externisté + outsource) | mzdy/fakturace realizace, nájem DBG, TIO fee, infra, HR | [Kategorizace TF], rozpočet list TF |
| **TIO** (Tech It Out s.r.o.) | Sales pro TF (AM, BDR). Vlastní výnosy jen z provizí za zprostředkování a z TIO outsource projektů. | fee za zprostředkování (~15 % GMV), TIO outsource | mzdy sales, nájem DBG, paušál DBG, podíl boardu | [Kategorizace TIO], [Přefakturace TIO/TF], rozpočet list TIO |
| **RTSG** (RTSG s.r.o.) | Náborová agentura v útlumu. **Od 03/2025 nefakturuje žádným klientům.** Náklady jí hradí TF (RTSG fakturuje TF podle potřeby). | **0** | nájem DBG, paušál DBG, účetní, LinkedIn/Pipedrive/GSuite | [Přefakturace RTSG/TF], [Kategorizace RTSG] |

Dohoda k TIO ([Výjimky a pravidla 2026]): u TIO se nevyhodnocuje profit ani vazba nákladů na příjem,
hlídá se jen struktura nákladů a příjmů.

Trend 2026 (rozpočet, list TF_počet_lidí): tým TF klesá z 42 lidí (33 na realizaci) v 1/2026 na 23,5
(16,5 na realizaci) v 12/2026. Plán příjmů TF klesá ze 6,8 mil. Kč (1/2026) na 1,7 mil. Kč (12/2026).
Skupina je podle plánu od 08/2026 ve ztrátě.

---

## 2. Kde co žije (systémy a evidence)

- **ERP** – každá firma má svůj Company profit / Company calculation. Náklady se kategorizují z bank
  transaction listu do cost kategorií (viz kap. 9). Co není platba (odvody, přefakturace před úhradou,
  rozpočítání boardu), se doplňuje **korekcemi** (Note & correction), případně **splitem** platby.
  Kategorie `*_TRANSFERS` a `*_RE_INV` / `*_INV` se **nepočítají do kalkulace**. [Kategorizace TF], [Cost correction TIO]
- **Premier (účetnictví)** – zdroj účetní uzávěrky; „Výsledovka po měsících“ se kopíruje do souboru uzávěrky. [Účetní uzávěrka]
- **Manažerská uzávěrka skupiny 2026** (Sheet `1yjhAPwbObXIhdz9YGGoKsU5n5XY8VVYh9GTt2ElYslw`) – oficiální
  měsíční výsledky skupiny, list „Výsledky skupiny 2026“. Uzavřeno do **08/2026** (09/2026 otevřeno). [Manažerská uzávěrka]
- **Rozpočet „2026-09 Rozpočet skupiny TF, TIO, DBG, RTSG“** (Sheet `1fSoVKop9Xv8CbhjWfc434etn2_ngBXC-kv4AXOYP7xI`) –
  31 listů; list na firmu + „Skupina“; drivery TF (TF_plán_sazeb_příjmů, TF_počet_lidí), TIO (TIO_Přinesené
  obraty Predikce, TIO_REAL), board (Board náklady 2026, Rozpad nákladu boardu), Číselníky, Slovníček.
  Napojený na import nákladů do ERP, **needitovat**. Revize každých 14 dní od 07/2026. [Revize rozpočtů]
- **Přefakturační tabulky** (jeden soubor na vztah, od 2026 s roky 2026–2027):
  DBG vs. TF/RTSG/TIO `1lfRgYis-y13skzWMNykm6eqliJoZ0oORA-zLJGoYhqU`; TF vs. TIO `1f7HJYbRYldAprdmzRUo0uvx2QaZ7UH8xC1NQWCkiu1Y`;
  TF vs. RTSG HR `17eXP6fzEGO7SmHAZ2mJipPOOpInxDiVFrz17e3I9igo`; centrální **Přehled přefakturací 2026-2027**
  `134OZIH-cpKFIaDseifWI2yOfY94mxRW6pK2qULM1yCk` (matice měsíc × tok, napojená do uzávěrky). [Přefakturace - DBG], [Přefakturace TIO/TF]
- **Cost kategorie TF/RTSG/TIO/DBG 2026** `1qCu6WDIhmpql8qf5jVK4TDBQDGjO1qvpqpabbnnjkRg` – číselník kategorií,
  procenta rozpadu boardu („Náklady DBG BOARD 2026“), měsíční rozpad boardu v Kč.
- **2026 Výpočet odměn pro členy vedení boardu** `1lKaFBcTQpDIRetXETHrQZdApb3BVBJ4eVnC4l3qn7NQ` – parametry a výpočet nároku boardu (soubor CEO).
- **Metabase** – dashboardy nákladů po firmách a oddělení, uzávěrky, přefakturace HW. [Účetní uzávěrka]

---

## 3. Matice vnitroskupinových toků (2026)

Měsíční částky bez DPH. „Kde u plátce“ = cost kategorie v ERP plátce; „do kalkulace?“ říká, zda se náklad
počítá do company profitu plátce.

| # | Od → Komu | Co | Částka / klíč 2026 | Periodicita | Kde u plátce (ERP) | Do kalkulace plátce? | Zdroj |
|---|---|---|---|---|---|---|---|
| 1 | DBG → TF | **Nájem kanceláří** | 185 520 Kč + 16 040 EUR (v uzávěrce 573 207 Kč/měs) | měsíčně, na aktuální měsíc, splatnost 14 dní | TF_OFFICE / OFFICE | ano | [Přefakturace - DBG]; uzávěrka list Přefakturace |
| 2 | DBG → TIO | Nájem kanceláří | 215 300 Kč | měsíčně, splatnost 60 dní | TIO_OFFICE / OFFICE (do úhrady korekce −215 300) | ano | [Přefakturace - DBG], [Cost correction TIO] |
| 3 | DBG → RTSG | Nájem kanceláří | 75 200 Kč | měsíčně, splatnost 60 dní | RTSG_OFFICE / OFFICE (korekce −75 200) | ano | [Přefakturace - DBG], [Cost Correction RTSG] |
| 4 | DBG → TF | **Administrativní paušál** (mzdy administrativy + PM/board + 30 % přirážka) | 206 504 Kč | měsíčně | 80 000 → TF_ADM / ADM; 126 504 → TF_INV / RE_INV_DBG (split) | **jen 80 tis.** | [Výjimky a pravidla 2026], [Přehled korekcí], [Přefakturace - DBG] |
| 5 | DBG → TIO | Administrativní paušál | 31 604 Kč | měsíčně | TIO_ADM / ADM (korekce do úhrady) | ano | [Cost correction TIO], [Přefakturace - DBG] |
| 6 | DBG → TIO | Úklid | 2 500 Kč (fakturováno spolu s paušálem = 34 104) | měsíčně | TIO_OFFICE / OFFICE | ano | [Cost correction TIO] |
| 7 | DBG → RTSG | Administrativní paušál vč. úklidu | 7 500 Kč (5 000 adm + 2 500 úklid) | měsíčně | RTSG_ADM / ADM + split OFFICE | ano | [Cost Correction RTSG], [Přehled korekcí] |
| 8 | DBG → TF/TIO/RTSG | **Pronájem HW a vybavení** (pořizovací cena / životnost + 35 %) | TF ~12–38 tis., TIO ~2–9 tis., RTSG ~0,5–2 tis. (od 04/2026) | měsíčně, za předchozí měsíc | *_OFFICE/OTHER / EQUIPMENT | ano | [Přefakturace - DBG], uzávěrka list Přefakturace |
| 9 | DBG → TF/TIO/RTSG | **Vyúčtování energií a služeb Titanium** | 1× ročně (do 31.5.), klíč DBG 10 % / TF 50 % / TIO 30 % / RTSG 10 % | ročně | NEZNÁMÉ (kategorie) | NEZNÁMÉ | [Přefakturace - DBG] |
| 10 | TIO → TF | **TIO fee za sales** | rozpočet 2026: **10 % z manažerského obratu TF**; Confluence: „13 % z obratu a zisk outsource projektů“; hlavička tabulky: „10%/12%“. Skutečnost 1–8/2026: 338–865 tis./měs. Výše se při revizích upravuje „pro dosažení ziskovosti TIO“. | měsíčně, za předchozí měsíc, splatnost 60 dní | TF_SALES / SALES (korekce do úhrady) | ano | [Přefakturace TIO/TF], [Revize rozpočtů], TF vs. TIO list Přehled, rozpočet list TIO ř. 32–34 |
| 11 | TF → TIO | Přefakturace nákladů TIO hrazených v TF (internet 2 500, infra ~4,7 tis., telefony/other ~0,9 tis., HR, odměny lidí TIO vyplacené v TF) + TF projekty pro TIO (outsource kapacity, 2026 = 0) | ~8–10 tis./měs; mimořádně 149 719 (05/2026) | měsíčně, 1 faktura | TIO_OFFICE/OTHER/HR/REAL podle druhu (korekce) | ano | [Přefakturace TIO/TF], [Cost correction TIO] |
| 12 | RTSG → TF | **„Všechny náklady RTSG“** – RTSG nemá klienty, fakturuje TF podle potřeby likvidity a tak, aby na konci roku vykázala zisk | 45 674 až 230 000 Kč/měs (1–8/2026), plán H2 100 tis./měs | měsíčně/ad hoc | TF_INV / RE_INV_RTSG | **ne** | [Přefakturace RTSG/TF], [Přehled korekcí], uzávěrka list Přefakturace |
| 13 | TF → RTSG | Přefakturace nákladů RTSG HR v TF (internet 1 700, infra, LinkedIn, odměny) | **od 03/2025 se nefakturuje, jen eviduje** | – | – | – | [Přefakturace RTSG/TF], [Cost Correction RTSG] |
| 14 | TIO ↔ RTSG | Společné náklady, interní HR | **od 1.1.2026 nic** | – | – | – | [Přefakturace RTSG/TIO neaktuální] |
| 15 | všechny | **Náklady boardu** – vyplácí se tam, kde člen čerpá; rozpočítávají se korekcemi do firem a oddělení podle % (kap. 6) | viz kap. 6 | měsíčně korekcemi | *_<ODDĚLENÍ>_DBG; rozdíl → MONEY_TRANSFERS | ano | [Korekce nákladů na board] |
| 16 | DBG (přes TF) | Odměny zaměstnanců DBG (administrativa) vyplacené v TF | NEZNÁMÁ výše; rozpočet TF RE_INV_DBG 132–292 tis./měs (1–8/2026) | měsíčně | TF_INV / RE_INV_DBG | **ne** (nepřefakturuje se, „nechceme brát prostředky z DBG“) | [Výjimky a pravidla 2026], [Kategorizace TF] |
| 17 | TIO → TF (korekce) | DPP CSO vyplacená v TIO – nepřefakturuje se, do TF company calculation se přidá korekcí, aby byl board kompletní | NEZNÁMÁ výše | měsíčně | TF korekce | ano | [Přefakturace TIO/TF] |

Shrnutí měsíčních IC toků (uzávěrka, list Přefakturace, 1–8/2026): celkem **1,57–2,05 mil. Kč/měs**;
z toho DBG fakturuje ~1,11–1,16 mil. (nájmy 863,7 tis. + paušály 245,6 tis. + HW), TIO → TF 338–865 tis.,
RTSG → TF 46–230 tis., TF → TIO ~8 tis.

### 3.1 Marže DBG na IC tocích (podle rozpočtu, list DBG)

| Tok | Marže DBG | Poznámka |
|---|---|---|
| Nájem (TF, TIO, RTSG) | **45 %** nad nákladem Titanium | rozpočet: „Pronájem OFFICE (45 % zisk)“, „převod zisku nájem 45 %“ 167 + 67 + 23 tis./měs |
| Paušál TF | 126 504 z 206 504 je „převod zisku“ (TF uznává jako náklad jen 80 tis.) | rozpočet: „Paušál TF (80 tis. přímý náklad, zbytek zisk cca 38,65 %)“ |
| Paušál TIO, RTSG | 0 % | rozpočet: „ZISK 0 %“ |
| HW a vybavení | 35 % | [Přefakturace - DBG] |

Důsledek pro manažerský pohled: reálný náklad skupiny na kanceláře je to, co DBG platí Titaniu
(rozpočet DBG_OFFICE ≈ 590–660 tis./měs vč. záloh energií a úklidu), ne 863,7 tis., které DBG fakturuje.

---

## 4. Jak se dnes počítá výsledek skupiny

### 4.1 Oficiální: Manažerská uzávěrka (list „Výsledky skupiny 2026“)

- **Obrat skupiny** = TF příjem očištěný + TIO příjem očištěný (DBG a RTSG mají očištěný příjem 0, žijí jen z IC). [Účetní uzávěrka]
- **Zisk skupiny** = Σ účetních výsledků („hrubá marže“) TF + TIO + DBG + RTSG z Premieru **− nevybrané odměny boardu** daného měsíce.
  Ověřeno na 1/2026: 1 253 487 + 515 356 + 216 442 − 81 182 − 407 411 = 1 496 692 Kč.
  IC fakturace se v tomto součtu vyruší samy (výnos DBG = náklad TF/TIO/RTSG), s výjimkou časového nesouladu.
- Uzávěrka toleruje rozdíl ERP vs. účetnictví do 5 %, ERP má vycházet hůř. Rozdíly se evidují jako „dohledané“ a „nedohledané“. [Manažerská uzávěrka]
- Za 01–05/2026 „mohou být uzávěrky nepřesné“ (neevidované rozdíly v přefakturacích a boardu). [Manažerská uzávěrka]

**Referenční čísla 2026 (uzávěrka, Kč):**

| Měsíc | Obrat skupiny | Zisk skupiny | Nevybrané odměny boardu | TF HV | TIO HV | DBG HV | RTSG HV |
|---|---|---|---|---|---|---|---|
| 1 | 9 475 682 | 1 496 692 | 407 411 | 1 253 487 | 515 356 | 216 442 | −81 182 |
| 2 | 9 076 676 | 1 833 336 | 233 655 | 1 405 824 | 186 806 | 407 897 | 66 464 |
| 3 | 8 803 823 | 1 970 751 | 391 176 | 1 764 286 | 144 878 | 355 724 | 97 039 |
| 4 | 6 193 784 | −187 332 | 274 568 | −538 072 | 48 053 | 487 900 | 89 355 |
| 5 | 5 709 812 | 479 675 | 339 857 | 508 768 | −161 117 | 443 119 | 28 762 |
| 6 | 6 358 306 | 776 893 | 137 126 | 446 397 | 44 491 | 344 719 | 78 412 |
| 7 | 5 229 235 | 549 353 | −113 860 | −192 581 | 130 909 | 469 094 | 28 071 |
| 8 | 3 901 308 | −243 028 | −139 527 | −718 412 | −116 147 | 473 633 | −21 629 |
| 9 | neuzavřeno | | | −930 792 (předběžně) | −262 564 | 684 203 | −83 945 |

### 4.2 Rozpočet: list „Skupina“

Má dva bloky: **„Pohled S přefakturací“** (prostý součet firem vč. IC) a **„Pohled BEZ přefakturace“**.
Pohled BEZ ale **není čistá konsolidace**, firmy jsou v něm očištěny různě:

- TIO a RTSG: z nákladů odečteny platby DBG a TF (nájem, paušál, přefakturace), z příjmů odečten TIO fee / fakturace na TF. Zbývá jen externí.
- TF: z příjmů odečtena jen přefakturace na TIO (~8 tis.), z nákladů jen TF_RE_INV. **Nájem DBG (~586 tis.), paušál 80 tis. a TIO fee (338–865 tis.) v nákladech TF zůstávají.**
- DBG: příjmy BEZ = 0, náklady BEZ = plné (Titanium, mzdy…), ale **profit BEZ = „Profit revenue streamů“** = marže DBG na IC (TF 127 + nájem 388 = 515 tis./měs). Profit tedy není příjmy − náklady.
- Skupina BEZ: profit = Σ profitů firem; příjmy a náklady = Σ příjmů a nákladů firem. Proto 1/2026: příjmy 9 475 − náklady 9 263 = 212, ale profit 1 576.
- Pod tím je řádek **„Pohled bez přefakturace – kontrolní mechanismus“**: náklady = náklady S přefakturací − řádek „Přefakturace“ (všechny IC toky); 1/2026 profit 1 772 = 9 475 − 7 703. To je nejblíž čisté konsolidaci před odměnami boardu a rozdíly.
- Postup revize říká: k nákladům bez přefakturace přičíst nevybrané odměny boardu a dohledané rozdíly, profit má pak sedět s uzávěrkou. [Revize rozpočtů]

**Referenční čísla rozpočtu (tis. Kč, list Skupina, pohled BEZ přefakturace, plán):**

| | 10/2026 | 11/2026 | 12/2026 | Q4 2026 | Y2026 |
|---|---|---|---|---|---|
| Příjmy | 2 363 | 2 241 | 1 808 | 6 412 | 65 179 |
| Náklady | 4 391 | 4 180 | 4 681 | 13 252 | 76 450 |
| Profit | −766 | −676 | −1 531 | −2 973 | 4 665 |
| Přefakturace (IC celkem) | 1 950 | 1 950 | 1 950 | 5 850 | 22 802 |
| Nevybrané odměny boardu | 419 | 394 | 1 435 | | |

Poznámka: 12/2026 obsahuje roční dorovnání odměn boardu (1 435 tis.), pro odsouhlasení je vhodnější 11/2026 nebo Q4 celkem.

**Doporučení pro model:** odsouhlasovat na metodiku uzávěrky (Σ výsledků firem − nevybrané odměny boardu),
protože tam se IC vyruší přesně. Pohled BEZ z rozpočtu brát jen orientačně. Je to otázka Q8 v docs/03.

---

## 5. Co jsou „externí“ výnosy skupiny (Slovníček rozpočtu)

| Pojem | Definice | 2026 (tis. Kč/měs, 1/2026 → 12/2026 plán) |
|---|---|---|
| Obrat TF (manažerský) | příjmy TF přímo od klientů za vlastní projekty (bez outsource a bez příjmů od TIO) | 7 115 → ~1 657 |
| Obrat TF interního týmu | manažerský obrat − výkony externistů | 6 691 → 1 657 |
| Příjmy za externí lidi na inhouse projektech | externisté na TF projektech, přirážka ~30–50 % | 424 → 0 |
| Obrat TF Outsource | zakázky, které realizuje někdo jiný, TF má smlouvu; přirážka ~19–34 % | 1 421 → 100 |
| TIO Fee za zprostředkování | provize TIO ze zprostředkovaných projektů (~15 % GMV) | 202 → 51 |
| Obrat TIO Outsource | zakázky přes TIO (Mepatek…), kalkulovaná marže 25 % | 736 → 0 |
| TIO Fee TF | IC, 10 % z manažerského obratu TF | 712 → 264 |
| Očištěný obrat skupiny | příjmy zvenku, bez IC | 9 475 → 1 808 |

---

## 6. Náklady boardu (nejsložitější položka)

Board = 5 členů (CEO, CTO, COO, CSO, Petr K.). Odměny se vyplácejí tam, kde člen čerpá (mzda, DPP,
faktura, nefinanční čerpání) v DBG, TF, TIO i RTSG a kategorizují do `*_TRANSFERS / <jméno>` (mimo kalkulaci).

**Nárok (2026 Výpočet odměn, list „TADY Skutečnost 2026“):**
- Fixní část: 5,5 × minimální mzda (22 400 Kč) = **123 200 Kč/měs na člena**.
- Variabilní část: budget **86 000 Kč/měs na člena** při splnění cílů; cíle 2026: obrat 104 mil. Kč (bez GMV
  zprostředkování), profitabilita 10 %. Výše se řídí průběžným plněním obratu a profitability s plovoucími vahami
  (váha profitu 75 % při plnění 0 %, 50 % při 100 %, 25 % při 200 %). Roční korekce v prosinci.
- Fix + var při cíli = **209 200 Kč/měs na člena** (Číselníky rozpočtu: „Náklad na člena boardu 2026 měsíčně“).
- Nárok 2026 po měsících (Číselníky, celý board): 1 024 tis. (1/26) → 926 tis. (6/26) → 474 tis. (7/26) → 372 tis. (11/26) → 1 191 tis. (12/26). Součet 2026 ≈ **9,3 mil. Kč**.
  **Pozor na výklad:** pokles ve druhé půlce roku není důsledek horších výsledků, ale záměrné rozvržení (koeficienty
  měsíců v listu „TADY Skutečnost 2026“: 11 % v lednu … 3 % v prosinci, „nastaveno tak, abychom peníze nevraceli“).
  V prosinci se vše dopočítá a dorovná. Účel: board zásadně nepřečerpá odměny a nemusí vracet peníze, a šetří to
  cashflow. Z měsíčních hodnot proto nelze odvozovat obecnou výši odměn (upřesnění COO, 7.10.2026).

**Čerpání vs. nárok:** nárok − skutečně čerpáno = **nevybrané odměny boardu**, které uzávěrka odečítá od zisku
skupiny (kap. 4.1). Čerpání 1–8/2026 bylo 585–802 tis./měs. Evidence: „2026 Čerpání odměn boardu DBG“
(`1sCUpJSFEnu2uam28ULcd07LXJMGiUSSrJVvKFFjawJg`). [Odměny boardu DBG], [Korekce nákladů na board]

**Cyklická závislost:** nárok se počítá z výsledku skupiny, který nárok snižuje. Confluence to výslovně uvádí
(„cyklická závislost, která by de facto neměla výpočtem procházet“). [Odměny boardu DBG]

**Rozpočítání do firem a oddělení** (korekcemi do kategorií `*_<ODDĚLENÍ>_DBG`), list „Náklady DBG BOARD 2026“:

| | ADM | HR | OFFICE | OTHER | REAL | SALES | Σ (1–8/26) | Σ (9–12/26) |
|---|---|---|---|---|---|---|---|---|
| DBG | 4,0 % | 0 | 1,0 % | 10,0 → 7,0 % | 0 | 0 | 15,0 % | **12,0 %** |
| TF | 3,6 → 5,6 % | 5,0 % | 0,6 % | 2,0 % | 23,6 → 25,4 % | 10,0 → 9,0 % | 44,8 % | **47,6 %** |
| TIO | 3,4 → 4,0 % | 7,4 % | 3,0 % | 2,0 % | 22,4 → 24,0 % | 0 | 38,2 % | **40,4 %** |
| RTSG | 0,4 → 0 % | 0 | 0 | 0 | 1,6 → 0 % | 0 | 2,0 % | **0 %** |

Rozdíl mezi reálným čerpáním ve firmě a procentním podílem jde do korekce `MONEY_TRANSFERS` a do uzávěrky
jako dohledaný rozdíl. Od 1.1.2026 se podíl boardu na TIO **nepřefakturuje** (dříve 22,5 % board nákladů v TF). [Přefakturace TIO/TF]

---

## 7. Korekce a výjimky 2026, které mění, co je „náklad“

1. **Administrativní paušál TF** 206 504: v ERP TF jen 80 tis. (TF_ADM/ADM), zbytek RE_INV_DBG mimo kalkulaci; rozdíl se eviduje jako dohledaný. [Výjimky a pravidla 2026]
2. **Odměny zaměstnanců DBG vyplacené v TF** → RE_INV_DBG, nepřefakturují se. [Výjimky a pravidla 2026]
3. **Multisport** – v ERP celý náklad, účetní jen příspěvek (~1 500 Kč); záměrně, aby CP vycházel hůř. [Výjimky a pravidla 2026]
4. **Kurzové rozdíly** u EUR fakturace se neřeší. [Výjimky a pravidla 2026]
5. **Odvody z mezd** (SP, ZP, daně) se do CP doplňují korekcemi za střediska 1 administrativa, 3 HR, 7 board, 12 office; realizace má odvody v collaborator costs. [Cost correction mzdových nákladů]
6. **Neuhrazené IC faktury** (nájem, paušál, TIO fee, RTSG) jsou do úhrady v korekcích, po úhradě se korekce maže, úhrada jde do TRANSFERS. [Cost correction TIO], [Kategorizace TF]
7. **Nedaňové náklady** se v ERP neevidují (ERP proto vychází hůř než účetnictví). [Manažerská uzávěrka]
8. **Internal collaborator costs TF** se upravují změnou FTE, aby odpovídaly přesčasům a odměnám. [Manažerská uzávěrka]
9. **Zálohy energií DBG**: korekce = záloha − vyúčtovaná spotřeba − stržená záloha. [Cost Correction DBG]
10. **CSO DPP v TIO** → korekcí do TF company calculation (viz tok 17).
11. **TIO Realizace (SALES_WAGES, BDR_WAGES)** se nepočítá do kalkulace TIO (lidé logují do hubu/projektů). [Kategorizace TIO]

---

## 8. Drivery v současném rozpočtu (co se dá převzít do modelu)

**TF (list TF_plán_sazeb_příjmů, TF_počet_lidí, Číselníky):**
- Příjem = Σ rolí [počet lidí × plán MD v měsíci × fakturovatelnost × prodejní cena/MD]. Role: Dev junior/medior/senior, TL (TechLead+TeamLead+Head), QA, Analytik, PM.
- Plán MD/měsíc 2026 (Číselníky): 17,0–21,1 (průměr 18,9), koeficient na svátky/dovolené/nemoci.
- Prodejní ceny 1–9/2026: Dev 11 000, TL 12 600, QA 8 600, AN 12 000, PM 10 000 Kč/MD. **Od 10/2026: Dev 8 000/8 500/9 000, TL 11 000, QA 9 000, AN 7 950, PM 6 900.**
- Fakturovatelnost 2026: Dev 58–94 % (Q4 60–80 %), TL 51–92 %, QA 69–100 %, AN 25–100 %, PM 53–83 %. „09–12/26 je odhad.“
- Vyblokováno pro interní potřeby: TL 8 %, PM 20 %, AN 3–8 %.
- Náklady/h: přímý Dev 578, TL 800, QA 433, AN 693, PM 430 Kč; fixní náklad 480 Kč/h; minimální prodejní cena dle nákladů Dev 8 883–11 574 Kč/MD.
- Počet lidí 12/2026 plán: Dev 0+1+6, TL 2+2, QA 2, AN 2, PM 1,5 → 16,5 na realizaci; + administrativa 2, board 5, HR 0 → 23,5.
- Externisté: EXT_INHOUSE (přirážka 30 %), EXT_OUTSOURCE (přirážka 25 %) – variabilní vůči příjmům za externisty.

**TIO (TIO_Přinesené obraty Predikce, TIO_REAL):**
- Predikce obratů po klientech a AM, revidovaná každých 14 dní s Petrem K.; obsahuje TF, TF EXT, TF OUT, TIO ZPR (GMV), TIO OUT, TIO ZPR FEE. **Jen 2026.**
- Zprostředkování fee ≈ 15 % GMV; TIO outsource marže 25 %.
- Sales mzdy: AM (fix 50 tis. + variabilní), BDR; Q4 2026 plán SALES_WAGES ~114–123 tis./měs, BDR 25 tis./měs.

**DBG:** paušály a nájmy = pevné částky (kap. 3); DBG_OFFICE náklad Titanium ~614 tis./měs (Q4 plán); ADM_WAGES ~70 tis./měs; účetní ~6–16 tis./měs.

**RTSG:** žádný driver; náklady Q4 2026 plán ~68–103 tis./měs, z toho nájem DBG 75,2 tis. (IC).

**Board:** % rozpadu (kap. 6) + nárok dle výpočtu odměn.

---

## 9. Cost kategorie 2026 (pro kontrolu „každá kategorie právě jednou“)

Hlavní kategorie (Číselníky rozpočtu): `TF_ADM, TF_HR, TF_OFFICE, TF_OTHER, TF_SALES, TF_REAL, DBG_ADM, DBG_HR,
DBG_OFFICE, DBG_OTHER, DBG_REAL, DBG_SALES, TIO_ADM, TIO_HR, TIO_OFFICE, TIO_OTHER, TIO_SALES, TIO_REAL, RTSG_ADM,
RTSG_HR, RTSG_OFFICE, RTSG_OTHER, RTSG_REAL, RTSG_SALES`. Plus mimo kalkulaci `*_INV / *_RE_INV` a `*_TRANSFERS`.

Podkategorie, které v modelu potřebujeme zařadit (F = fixní, V = variabilní, P = polo-fixní lidé, IC = eliminovat, B = board):

| Firma | Podkategorie ($ = do kalkulace) | Návrh typu |
|---|---|---|
| TF_ADM | ADM (paušál DBG 80 tis.) | IC |
| | ACCOUNTING | F |
| | ADM_DBG | B |
| | ADM_OTHER (úrok KTK) | F |
| TF_HR | HR_EXT, HR_INT | F |
| | HR_WAGES | P |
| | HR_DBG | B |
| TF_OFFICE | OFFICE (nájem DBG v EUR + O2 + internet) | IC (nájem) + F (O2, internet) |
| | OFFICE_DBG | B |
| TF_OTHER | INFRA, LEGAL, OTHER | F |
| | OTHER_EQUIPMENT (pronájem HW od DBG) | IC |
| | OTHER_DBG | B |
| TF_SALES | SALES (TIO fee) | IC |
| | SALES_AKVIZICE | F |
| | SALES_DBG | B |
| TF_REAL | WAGES_DEV/QA/BA/PM (ne $ – jde přes collaborator costs do projektů) | P |
| | OTHERS (licence, odměny, vybavení realizace) | F |
| | EXT_INHOUSE, EXT_OUTSOURCE | V |
| | REAL_DBG | B |
| TF_INV | RE_INV_DBG, RE_INV_TIO, RE_INV_RTSG | IC |
| TIO_ADM | ADM (paušál DBG), ACCOUNTING, ADM_DBG | IC / F / B |
| TIO_HR | HR_EXT, HR_INT (F), HR_WAGES (P), HR_DBG (B) | |
| TIO_OFFICE | OFFICE (nájem DBG, úklid, internet TF) IC; EQUIPMENT IC; OFFICE_DBG B | |
| TIO_OTHER | OTHER_INFRA, OTHER (F; část IC z TF), OTHER_DBG (B) | |
| TIO_SALES | SALES (F), SALES_DBG (B) | |
| TIO_REAL | SALES_WAGES, BDR_WAGES (P), SALES_OTHER, BDR_OTHER (F), EXT_OUTSOURCE / SUPPLIERS_PAYMENTS (V), REAL_DBG (B) | |
| DBG_ADM | ADM (0), ACCOUNTING (F), ADM_WAGES (P), DBG (B) | |
| DBG_HR | HR_EXT, HR_INT, HR_WAGES, DBG | F / P / B |
| DBG_OFFICE | OFFICE (nájem + energie Titanium) F; OFFICE_WAGES (úklid) P; DBG (B) | |
| DBG_OTHER | TIO/TF/RTSG/DBG_EQUIPMENT (nákup HW, F), OTHER (F), DBG (B) | |
| DBG_REAL | ADM_WAGES (P), DBG (B) | |
| DBG_INV | RE_INV_TF/TIO/RTSG | IC |
| RTSG_ADM | ADM (paušál DBG) IC, ACCOUNTING F, DBG B | |
| RTSG_OFFICE | OFFICE (nájem DBG) IC, DBG B | |
| RTSG_OTHER | INFRA F, EQUIPMENT IC, DBG B | |
| RTSG_REAL | REAL_WAGES P, LINKEDIN/PIPEDRIVE/GSUITE/MOBILE_TARIFS/OTHER F, DBG B | |
| RTSG_INV | RE_INV_DBG/TF/TIO | IC |
| *_TRANSFERS | VAT/FEES, MONEY_TRANSFERS, jména členů boardu, INFRASTRUCTURE_EXTERNAL, *_TRANS | mimo model (B u jmen) |

---

## 10. Návrh pravidla fixní / variabilní (ke schválení, otázka Q9)

- **Variabilní** (mění se s objemem fakturace nebo počtem prodaných MD): externisté na inhouse projektech,
  outsource dodavatelé (TF i TIO SUPPLIERS_PAYMENTS), variabilní část odměn AM, infrastruktura účtovaná
  klientům (INFRASTRUCTURE_EXTERNAL), fee za zprostředkování na straně nákladů (pokud existuje).
- **Polo-fixní lidé** (samostatný blok, mění se skokově s počtem lidí): mzdy a fakturace interního týmu
  realizace (Dev/QA/BA/PM/TL), HR, sales fix, BDR, administrativa, úklid.
- **Fixní** (smlouvy, licence, režie): nájem a energie Titanium, účetní, právník, infra a licence, O2/internet,
  HR_INT/HR_EXT, SALES náklady, odpisy/pronájem HW.
- **Board**: samostatný blok pod „Výsledek před odměnami boardu“: fixní část (5 × 123 200) a variabilní část
  (dle výsledku), aby byla vidět cyklická závislost.
- **IC**: eliminuje se; v modelu A se u firem vůbec neobjeví (náklad je tam, kde reálně vzniká: Titanium v DBG),
  v modelu B zůstane viditelný a vyruší se ve sloupci Eliminace.

---

## 11. NEZNÁMÉ a rozpory

1. **Plán 2027 neexistuje** v žádném z nalezených zdrojů: rozpočet končí 12/2026, sloupce 2027 v přefakturačních tabulkách jsou prázdné, TIO predikce je jen 2026.
2. **TIO fee**: 10 % (rozpočet 2026, Slovníček) vs. 13 % + zisk outsource (Confluence) vs. „10%/12%“ (hlavička tabulky). Pro skupinu nulový dopad (IC), pro pohled na firmy ano.
3. **Parametry odměn boardu 2027** (minimální mzda 2027, násobek 5,5, cíle obratu a profitability, variabilní budget) nejsou nikde.
4. **Nájem Titanium 2027** (indexace, výpovědi ploch při poklesu týmu) – NEZNÁMÉ; v rozpočtu DBG_OFFICE konstantní ~614 tis./měs.
5. **Energie**: roční vyúčtování (10/50/30/10) – NEZNÁMÁ výše a kategorie v ERP.
6. **Odměny zaměstnanců DBG vyplacené v TF** (RE_INV_DBG 132–292 tis./měs) – nejasné, zda to je navíc k ADM_WAGES v DBG (~70 tis.) nebo totéž placené jinudy. Riziko dvojího započtení v modelu.
7. **RTSG 2027**: pokračování útlumu, nebo ukončení/sloučení – NEZNÁMÉ. Nájem RTSG 75 200 za plochu, kterou podle poznámky z 2025 z 80 % užívá TIO.
8. **Kurz EUR** pro nájem TF (16 040 EUR) – v uzávěrce fixně 573 207 Kč/měs → implicitní kurz ~24,17.
9. Rozpočtový pohled BEZ přefakturace vs. uzávěrka: liší se o dohledané/nedohledané rozdíly a metodiku DBG (kap. 4.2).
10. **Uzávěrky 01–05/2026** mohou být nepřesné (Confluence).

---

## 12. Zdroje

Confluence (TFA):
- [Manažerská uzávěrka skupiny](https://techfides.atlassian.net/wiki/spaces/TFA/pages/5338857473)
- [Účetní uzávěrka skupiny](https://techfides.atlassian.net/wiki/spaces/TFA/pages/4959436817)
- [Výjimky a pravidla 2026](https://techfides.atlassian.net/wiki/spaces/TFA/pages/5315198986)
- [Přehled korekcí mezi DBG/TF/TIO/RTSG](https://techfides.atlassian.net/wiki/spaces/TFA/pages/4508614665)
- [Kategorizace TF (cost categories) a cost correction 2026](https://techfides.atlassian.net/wiki/spaces/TFA/pages/4694802438)
- [Kategorizace TIO 2026](https://techfides.atlassian.net/wiki/spaces/TFA/pages/4136697898)
- [Kategorizace DBG 2026](https://techfides.atlassian.net/wiki/spaces/TFA/pages/5178687491)
- [Kategorizace RTSG 2026](https://techfides.atlassian.net/wiki/spaces/TFA/pages/3561783309)
- [Cost correction TIO 2026](https://techfides.atlassian.net/wiki/spaces/TFA/pages/5564792836)
- [Cost Correction RTSG 2026](https://techfides.atlassian.net/wiki/spaces/TFA/pages/5565382657)
- [Cost Correction DBG 2026](https://techfides.atlassian.net/wiki/spaces/TFA/pages/5564334083)
- [Cost correction mzdových nákladů v company calculation](https://techfides.atlassian.net/wiki/spaces/TFA/pages/3707207681)
- [Korekce nákladů na board](https://techfides.atlassian.net/wiki/spaces/TFA/pages/4087349257)
- [Odměny boardu DBG](https://techfides.atlassian.net/wiki/spaces/TFA/pages/5113905168)
- [Přefakturace - DBG](https://techfides.atlassian.net/wiki/spaces/TFA/pages/5483790341)
- [Přefakturace TIO/TF](https://techfides.atlassian.net/wiki/spaces/TFA/pages/4083548167)
- [Přefakturace RTSG/TF](https://techfides.atlassian.net/wiki/spaces/TFA/pages/3692593186)
- [Přefakturace RTSG/TIO - neaktuální](https://techfides.atlassian.net/wiki/spaces/TFA/pages/4178542598)
- [Revize rozpočtů (rozpracováno)](https://techfides.atlassian.net/wiki/spaces/TFA/pages/5360615427)

Google Sheets (ID): rozpočet 2026-09 `1fSoVKop9Xv8CbhjWfc434etn2_ngBXC-kv4AXOYP7xI`; Manažerská uzávěrka skupiny 2026
`1yjhAPwbObXIhdz9YGGoKsU5n5XY8VVYh9GTt2ElYslw`; Přefakturace DBG vs. TF/RTSG/TIO 2026-2027 `1lfRgYis-y13skzWMNykm6eqliJoZ0oORA-zLJGoYhqU`;
Přefakturace TF vs. TIO 2026-2027 `1f7HJYbRYldAprdmzRUo0uvx2QaZ7UH8xC1NQWCkiu1Y`; Přehled přefakturací 2026-2027
`134OZIH-cpKFIaDseifWI2yOfY94mxRW6pK2qULM1yCk`; Cost kategorie 2026 `1qCu6WDIhmpql8qf5jVK4TDBQDGjO1qvpqpabbnnjkRg`;
2026 Výpočet odměn pro členy vedení boardu `1lKaFBcTQpDIRetXETHrQZdApb3BVBJ4eVnC4l3qn7NQ`.
