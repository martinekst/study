# Porovnání modelů A a B, Q1 2027 (výstup fáze 2)

Aktuální verze: Google Sheet **„2027-Q1 Model skupiny v0.2“**
https://docs.google.com/spreadsheets/d/1Nk2hnF5RxYCIUfMaps8aZ7JmMi2W0eAYb7l1J0cFo9Y

Předchozí verze (zmrazená, pro srovnání): **„2027-Q1 Model skupiny v0.1“**
https://docs.google.com/spreadsheets/d/1QJ_U_FDhai8_ZBAhcC6fA4hY51LkijAcaF4xAg8MLsU

Verzování: každá další úprava modelu vzniká jako kopie předchozí verze s novým číslem (v0.3, ...), původní soubor zůstává.
Seznam verzí a změn je v listu **Verze** uvnitř sheetu.

Stav 7.10.2026: v0.1 dvě iterace (sestavení, oprava popisků), v0.2 jedna iterace (zapracování zpětné vazby COO).
Všechna kritéria přijetí ze zadání (bod 5) jsou splněna, viz list **Kontrola**. Existující rozpočet 2026-09 zůstal netknutý.

## 0. Co se změnilo z v0.1 na v0.2 (zpětná vazba COO)

| Připomínka | Řešení ve v0.2 | Dopad na Q1 |
|---|---|---|
| TIO nemá externí výnosy, počítat s nulou | GMV zprostředkovaných projektů = 0 (páka v Simulaci, lze zapnout zpět) | výnosy skupiny −218, výsledek −218 |
| TeamLead a Head of Dev mají náklad, brát jako TechLead (800 Kč/h) | náklad TL počítán za všechny 4 TL (dřív jen 2) | náklad lidí TF +749, výsledek −749 |
| „Polo-fixní lidé“ nesrozumitelné | blok přejmenován na **Lidé (mzdy a fakturace)**; v Přehledu rozpad na interní tým TF, sales TIO, HR, administrativa | jen popis |
| Není vidět, co je ve fixní režii | Přehled ukazuje rozpad: Titanium, Fullcom, licence a infrastruktura, právník, HR, ostatní | jen popis |
| Ztráta se má psát s mínusem, ne v závorkách | formát čísel `-1 234` červeně ve všech listech | jen formát |
| Tabulka v chatu byla přehlednější než sheet | nový list **Přehled** = ta samá tabulka (Základ, Simulace, Δ, měsíce) jako první list | jen forma |
| Simulace v Předpokladech příliš podrobná | nový list **Simulace**: 18 pák ve žlutém sloupci, výsledek a graf vedle; Předpoklady zůstávají pro jemné úpravy (sloupec Ruční úprava) | jen forma |
| Barevně odlišit výnosy, náklady, přefakturaci | výnosy zeleně, náklady červeně, IC přefakturace modře (Model B), vstupy žlutě | jen forma |
| Graf na simulaci: externí výnosy a výsledek | sloupcový graf Základ vs. Simulace na listu Simulace | jen forma |
| Verzovat sheety | v0.1 zmrazena, v0.2 nová kopie, list Verze | proces |

Výsledek skupiny po odměnách boardu se tím posunul z −3 116 na **−4 083 tis. Kč za Q1** (−967: TL náklad −749, TIO GMV −218).

## 1. Výsledek Základ, Q1 2027 (tis. Kč bez DPH), v0.2

| | TF | TIO | DBG | RTSG | **Skupina** |
|---|---|---|---|---|---|
| Externí výnosy | 7 023 | 0 | 0 | 0 | **7 023** |
| z toho interní tým TF | 6 459 | | | | 6 459 |
| z toho externisté (outsource, inhouse) | 564 | | | | 564 |
| Variabilní náklady (externisté, dodavatelé) | 451 | 0 | 0 | 0 | 451 |
| Lidé (mzdy a fakturace) | 4 858 | 447 | 279 | 0 | 5 584 |
| z toho interní tým TF (Dev, TL, QA, analytici, PM) | 4 858 | | | | 4 858 |
| z toho sales TIO (AM, BDR) | | 405 | | | 405 |
| z toho HR | | 42 | | | 42 |
| z toho administrativa a úklid (DBG) | | | 279 | | 279 |
| Fixní režie | 969 | 203 | 1 916 | 34 | 3 121 |
| z toho nájem, energie a služby Titanium | | | 1 878 | | 1 878 |
| z toho účetní Fullcom | 122 | 26 | 32 | 18 | 197 |
| z toho licence a infrastruktura | 363 | 48 | | 16 | 427 |
| z toho právník | 104 | | | | 104 |
| z toho HR interní a externí | 141 | 60 | | | 201 |
| z toho ostatní (O2, internet, sales náklady, ostatní realizace) | 239 | 69 | 6 | | 314 |
| **Výsledek před odměnami boardu** | 746 | −650 | −2 195 | −34 | **−2 133** |
| Odměny boardu (5 × 130 tis. × 3) | 928 | 788 | 234 | 0 | 1 950 |
| **Výsledek po odměnách boardu** | −182 | −1 438 | −2 429 | −34 | **−4 083** |

Po měsících (skupina, po odměnách): leden −1 347, únor −1 383, březen −1 353. Rozdíl mezi měsíci dělá jen počet MD.

Čtení: skupina prodělává zhruba 1,35 mil. Kč měsíčně. Interní tým TF (16,5 FTE) si na sebe těsně vydělá: za Q1 fakturuje 6,46 mil.,
stojí 4,86 mil., po režii TF zbývá +0,75 mil. před boardem. Ztrátu tvoří kanceláře a administrativa (DBG −2,2 mil., z toho Titanium 1,88 mil.),
odměny boardu (1,95 mil.) a sales bez vlastních výnosů (TIO −0,65 mil.).

**Lidé (mzdy a fakturace)** = lidé, jejichž čas prodáváme. Výnos = počet × MD × fakturovatelnost × sazba/MD;
náklad = počet × Kč/h (z listů TF_RR_*) × 8 h × MD. Proto na ně působí všechny tři páky, které jsi jmenoval:
fakturovatelnost (kolik % času prodáme), sazba (za kolik) a MD (kolik dní v měsíci). Sales TIO, HR a administrativa DBG
jsou v bloku také (jsou to mzdy), ale výnos nenesou.

## 2. Model A vs. Model B

| | Model A „firma po firmě“ | Model B „konsolidační“ |
|---|---|---|
| Co ukazuje | Každou firmu jen s externími výnosy a náklady, které reálně vznikají. Nájem je nákladem DBG vůči Titaniu, TIO fee ani paušály neexistují. | Firmy tak, jak si fakturují (IC ceny 2026): DBG má výnos z nájmů a paušálů, TF náklad nájmu, paušálu a TIO fee, RTSG fakturuje TF své náklady. Sloupec Eliminace IC vynuluje. |
| Výsledek skupiny Q1 | −4 083 | −4 083 (shodně, kontrola 2) |
| Výsledek firem Q1 | TF −182, TIO −1 438, DBG −2 429, RTSG −34 | TF −5 043, TIO 0, DBG +960, RTSG 0 |
| Měsíční detail | ano (1–3/2027 + Q1) | ne, jen Q1 |
| Páky | list Simulace + Předpoklady | navíc IC ceny a režim TIO fee (Předpoklady, sekce IC) |
| Hodí se na | rozhodování o skupině: lidé, sazby, fakturovatelnost, nájem, board | pochopení, kolik která firma „převádí“ ostatním; nastavení TIO fee a fakturace RTSG |

**Doporučení:** řídit se Modelem A (a jeho výtahem v listech Přehled a Simulace). Model B nech jako doplněk:
(1) ukáže, že TIO fee potřebné k nule TIO vychází ve v0.2 na **739 tis. Kč/měs** (2 217 za Q1), protože TIO bez GMV nese nájem 215,
paušál 34, mzdy 149 a podíl boardu 263 tis./měs; (2) ukáže, že DBG při IC cenách 2026 vydělá +320 tis./měs, což je marže na nájmu
a paušálech, kterou Model A rozpouští do TF/TIO/RTSG.

## 3. Kontrola shody s plánem 11/2026 (kritérium 2 %)

Kontrola počítá se vstupy plánu 11/2026 (sloupec **Kontrola 11/2026** v Předpokladech), ne se Základem, proto se změnami v0.2 nehnula.

| Položka | tis. Kč |
|---|---|
| Model se vstupy plánu 11/2026 (bez indexace, lidé a sazby 11/2026, TL náklad za 2 jako v rozpočtu, GMV 120, board 754) | −1 201 |
| + zbytek administrativního paušálu TF, který rozpočet TF nenese, ale DBG ho má ve výnosech | +126,5 |
| + rozdíl plánovaného výnosu TF (2 223) vs. driverový výpočet (2 289) | −66 |
| = srovnatelný výsledek | −1 140 |
| Cíl: Σ výsledků firem 11/2026 (S přefakturací) − nevybrané odměny boardu = −730 − 394 | −1 124 |
| Odchylka | −16 = **1,4 %** |

Zbytková odchylka 16 tis. jsou drobné asymetrie IC v rozpočtu (HW 10 vs. 19, zaokrouhlení). Rozdíl výnosu TF o 66 tis. vzniká tím,
že rozpočet 11/2026 nepočítá výnos přesně jako lidé × MD × fakturovatelnost × sazba; drivery dávají o 3 % víc.

## 4. Jak simulovat (v0.2)

Listy v pořadí: **Přehled → Simulace → Předpoklady → Model A → Model B → Porovnání → Kontrola → Zdroje → Verze**.

1. Otevři list **Simulace**. Do žlutého sloupce **D** napiš novou hodnotu páky (18 pák: počty lidí po rolích, posun fakturovatelnosti,
   změna sazeb, změna nákladu/h, výnos za externisty, GMV TIO, nájem Titanium, indexace, ostatní fixní režie ±%, počet členů boardu,
   fixní a variabilní odměna). Sloupec Δ ukáže, o kolik se páka liší od Základu.
2. Do **Simulace!B2** napiš jednou větou, co simuluješ (propíše se do Přehledu a Porovnání).
3. Čti vpravo na stejném listu: tabulku výsledku skupiny (výnosy, náklady, před/po boardu), výsledek po firmách a **graf**
   (externí výnosy a výsledek po odměnách boardu, Základ vedle Simulace).
4. List **Přehled** ukáže tu samou tabulku jako výše třikrát: Základ, Simulace a Δ, po firmách s rozpadem lidí a fixní režie, plus měsíce.
5. List **Porovnání** ukáže **most změny** (kudy se Δ propsala: výnosy TF, výnosy TIO, variabilní, lidé, fixní, board)
   a seznam **Změněné parametry**, který se vyplní sám.
6. Jemná úprava jedné položky (např. jen právník TF nebo jen sazba QA): list **Předpoklady**, sloupec **G „Ruční úprava“**.
   Vyplněná hodnota má přednost před pákami. Sloupec F (Simulace) je vzorec a je chráněný varováním.
7. Návrat na Základ: v Simulaci přepiš sloupec D na hodnoty sloupce C a vymaž sloupec G v Předpokladech.

Ověřeno testem ve v0.2: Dev senior 6 → 5 sníží výnos TF o 421 tis., náklad lidí o 271 tis., výsledek skupiny o **151 tis. Kč za Q1**;
Přehled i Porovnání ukázaly změnu jen v TF, most seděl na nulu, graf přepočetl sloupce Simulace.

Páky s největším dopadem (Q1): sazby a fakturovatelnost TF (1 p. b. fakturovatelnosti ≈ 80 tis., 1 % sazeb ≈ 65 tis.),
počet lidí (1 senior ≈ 150 tis. čistého), nájem Titanium (10 % ≈ 188 tis.), odměny boardu (1 člen ≈ 390 tis.), indexace smluv (7 % = 166 tis.).

### Možnosti dalšího zjednodušení (k rozhodnutí)

| Varianta | Co by se změnilo | Pro | Proti |
|---|---|---|---|
| A. Nechat 18 pák (stav v0.2) | nic | každá páka má přímý význam, detail v Předpokladech | 18 řádků je stále dost |
| B. 8 pák | sloučit role do „interní tým TF, FTE“ (poměr rolí jako dnes), zrušit samostatné páky pro externisty a GMV | vejde se na obrazovku, rychlé „co kdyby“ | ztratí se rozdíl Dev vs. QA vs. PM |
| C. Scénáře vedle sebe | Simulace se třemi sloupci (Scénář 1–3) a přepínačem, který se počítá | porovnání variant na jednom místě | model se zesložití (3× vzorce), více údržby |
| D. Páky po firmách | blok pák pro TF, TIO, DBG zvlášť | čtení „firma po firmě“ | duplicity (board, indexace jsou skupinové) |

Doporučení: nechat A, případně po pár týdnech používání zúžit na B podle toho, které páky se reálně hýbou.

## 5. Co v Základu stojí za pozornost

- **Interní tým TF** = náklad/h z listů TF_RR_* × 8 h × MD; za všechny 4 TL se počítá 800 Kč/h (TeamLead a Head of Dev stejně jako TechLead),
  celkem 1 619 tis./měs za 16,5 lidí. Pokud má někdo z TL náklad jinde (např. v odměnách boardu), hrozí dvojí započtení; sníží se pákou „TL, počet“ nebo Ruční úpravou řádku „TL s nákladem“.
- **TIO bez výnosů**: GMV = 0 podle rozhodnutí COO. Rozpočet 2026 s GMV počítal (plán 10–12/2026 průměr 120, skutečnost 7–8 vyšší);
  páka „GMV zprostředkovaných projektů TIO“ to vrátí.
- **Průměr plánu a skutečnosti** zvedl oproti plánu Q4 některé režie TF (právník, ostatní).
- **HW pronájem**: v Modelu A nemá DBG žádný náklad HW (nákupy jsou cash, v Q1 nula), v Modelu B je IC výnos 54 tis./Q.
- **TIO fee 739 tis./měs** v Modelu B je číslo z dorovnání, ne obchodní dohoda. Přepínačem v Předpokladech (sekce IC) jde přepnout na % obratu TF.
- **Odměny boardu** jsou rozděleny do firem klíčem 47,6 / 40,4 / 12 / 0 % podle rozpočtu 2026; na výsledek skupiny klíč nemá vliv.

## 6. Co model neumí (viz docs/04 kap. 6)

Jeden simulační scénář současně; měsíce jen Q1 (sloupce lze přidat); bez cashflow, DPH a daně; bez napojení na ERP.
Náklady lidí jsou lineární v MD (dovolené snižují náklad i výnos stejně), což u zaměstnanců na HPP podhodnocuje náklad v měsících s málo MD.

## 7. Iterace

| Verze | # | Co | Výsledek |
|---|---|---|---|
| v0.1 | 1 | Založení souboru, 6 listů, 84 parametrů, vzorce, kontroly | kontroly 1–4 OK; 6 popisků začínajících „+“ a „=“ se vyhodnotilo jako vzorec (#ERROR!) |
| v0.1 | 2 | Oprava popisků (apostrof), test simulace, formátování, ochrana Základu | bez chyb; simulace i most fungují |
| v0.2 | 1 | Kopie v0.1; sloupec Ruční úprava; listy Přehled, Simulace, Verze; GMV 0; TL náklad za 4; přejmenování; formát mínus; barvy; graf | kontroly 1–5 OK, shoda 1,4 %; test páky Dev senior 6 → 5 prošel; dvě Δ % sloupce měly ještě závorky, opraveno v téže iteraci |
