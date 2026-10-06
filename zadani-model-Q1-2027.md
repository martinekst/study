# Zadání: Zjednodušený manažerský model skupiny pro Q1 2027

## 1. Kontext

Skupina čtyř společností:
- **DBG** – vlastní/pronajímá kanceláře, poskytuje ostatním administrativu a management, fakturuje je dál.
- **TechFides (TF)** – hlavní dodavatel výstupů klientům, nositel většiny externích výnosů.
- **TIO** – sales pro TF, žije z provizí/přefakturace vůči TF.
- **RTSG** – náborová agentura, činnost minimální.

Zdroje (máš k nim přístup přes konektory):
- **Confluence**, prostor „TF - Administrativa“ (klíč TFA). Začni těmito stránkami a jejich podstránkami:
  Manažerská uzávěrka skupiny · Výjimky a pravidla 2026 · Kategorizace TF / TIO / DBG / RTSG 2026 ·
  Cost correction TIO 2026 · Cost Correction RTSG 2026 · Korekce nákladů na board · Odměny boardu DBG · Revize rozpočtů.
  Otevři i tabulky, na které tyto stránky odkazují (Cost kategorie 2026, Přefakturace TF vs. TIO).
- **Google Sheet** „2026-09 Rozpočet skupiny TF, TIO, DBG, RTSG“:
  https://docs.google.com/spreadsheets/d/1fSoVKop9Xv8CbhjWfc434etn2_ngBXC-kv4AXOYP7xI
  Soubor je **jen pro čtení, nic v něm neměň** (je napojený na importy do ERP).
  List „Skupina“ je referenční výsledek, používej **pohled BEZ přefakturace**.
  Listy TF_plán_sazeb_příjmů, TF_počet_lidí, TF_HR, TIO_HR, TIO_Přinesené obraty Predikce, Board náklady 2026,
  Rozpad nákladu boardu, Číselníky a Slovníček jsou zdroje driverů a definic.
- **Metabase** (konektor) pro skutečnost 2026, pokud ji budeš potřebovat k ověření run-rate.

## 2. Cíl

Jednoduchý, ale funkční model výsledku skupiny za **Q1 2027 (měsíce 1–3/2027)**, který navazuje
na současný rozpočet, ale **nekopíruje jeho rozvětvenou strukturu** (31 listů).

Princip = manažerské účetnictví:
- Zajímá nás reálný výsledek skupiny. Každý náklad a výnos skupiny je v modelu **právě jednou**.
- Vnitroskupinové fakturace (nájem, administrativa, management, provize TIO, přefakturace RTSG) se eliminují,
  ale musí být vidět, **kde náklad reálně vzniká** a jaký má dopad na výsledek skupiny.
- Je jedno, zda je nájem zaúčtován v DBG nebo v jednotlivých firmách. Nesmí být započten dvakrát.
- Náklady každé firmy dělíme na **fixní** a **variabilní**. Pravidlo dělení navrhni a nech mi ho schválit
  (osobní náklady v servisní firmě jsou polo-fixní, řekni, kam je dáváš a proč).

## 3. Výstupy (v tomto pořadí, každý commitni zvlášť)

1. `docs/01-cfo-praxe.md` – Jak se dělá skupinový manažerský P&L v malé servisní skupině:
   konsolidace s eliminací intercompany, dělení fixní/variabilní, driver-based plán
   (lidé × sazba × fakturovatelnost), rolling forecast. Max 1 strana, uveď zdroje.
   Zakonči **jedním doporučením pro nás** a proč.
2. `docs/02-skupina-fungovani.md` – Fungování společností mezi sebou podle Confluence:
   kdo komu co fakturuje, za co, jak často, v jaké výši nebo podle jakého klíče; jak se to dnes eliminuje
   v „pohledu BEZ přefakturace“; jaké korekce se dělají (board, TIO, RTSG); výjimky 2026.
   U každého vztahu odkaz na zdrojovou stránku. Co v Confluence není, označ **NEZNÁMÉ**. Nedomýšlej.
   Soubor má sloužit jako kontext pro další práci s AI, piš ho tak.
3. `docs/03-otazky.md` + stejné otázky mi polož **interaktivně** (klikací volby, ano/ne, kde to jen jde).
   Max 15 otázek, seřazené podle dopadu na výsledek. U každé napiš, co předpokládáš, pokud neodpovím.
   Vždy zařaď: (a) výsledek před, nebo po odměnách boardu DBG, (b) zda existuje plán 2027
   (počty lidí, sazby, fakturovatelnost), nebo se jede z run-rate konce 2026.
4. **Po mých odpovědích:** dva vyplněné modely A a B (viz bod 4) + `docs/04-porovnani-modelu.md`
   s doporučením, který model používat dál a proč.

## 4. Dva modely k otestování

Oba modely mají **stejné vstupy a stejné předpoklady**, liší se jen uspořádáním:

- **Model A „firma po firmě“** – 4 krátké P&L, jedna tabulka na firmu:
  externí výnosy · variabilní náklady · fixní náklady · výsledek. Intercompany je už očištěné
  na úrovni firmy (např. nájem je rovnou nákladem TF, ne výnosem DBG). Skupina = prostý součet.
- **Model B „konsolidační“** – stejné 4 firmy, ale intercompany řádky zůstávají viditelné
  (DBG má výnos z nájmu, TF náklad) a eliminují se v samostatném sloupci „Eliminace“.
  Skupina = součet firem − eliminace.

Společné pro oba:
- Měsíce 1–3/2027 + sloupec Q1. Jednotky **tis. Kč bez DPH**.
- Vstupy (předpoklady, drivery) odděleně od výpočtů. Každý předpoklad má poznámku, odkud je.
- Umístění: **nový Google Sheet** „2027-Q1 Model skupiny“, jeden list na model + list „Předpoklady“.

## 5. Kritéria přijetí (kontroluj po každé iteraci)

- Součet intercompany výnosů a nákladů za skupinu = 0.
- Každá nákladová kategorie z listu Číselníky je přiřazena právě jedné firmě a právě jednomu typu (fixní/variabilní).
- Když model naplníš daty posledního naplánovaného měsíce 2026, výsledek skupiny se shoduje s listem „Skupina“
  (pohled BEZ přefakturace) s odchylkou **do 2 %**. Odchylku vysvětli.
- Změna jednoho driveru (počet lidí, sazba, fakturovatelnost) se propíše do výsledku bez ručních zásahů.
- Model A i B dávají **stejný výsledek skupiny**.

## 6. Postup a pravidla

- Nejdřív napiš **plán** (max 1 strana) a zkontroluj ho proti kritériím v bodu 5. Pak realizuj.
- **Fáze 1 = výstupy 1–3. Po fázi 1 skonči a čekej na moje odpovědi.** Nehádej je.
- Výjimka: otázku, jejíž odpověď změní výsledek skupiny za Q1 o méně než **2 % nákladů skupiny za Q1**,
  nepokládej. Zvol rozumný předpoklad, zapiš ho do „Předpokladů“ a pokračuj.
- **Fáze 2 = výstup 4, max 3 iterace.** Iterace = sestav → zkontroluj proti bodu 5 → oprav.
  Po každé iteraci mi v jedné zprávě napiš, co se změnilo a co ještě nesedí.
- Pracuj na větvi `claude/...` v repu `martinekst/study`, commituj po každém výstupu.
- Existující Google Sheet needituj. Nové soubory v Google Drive zakládej jen ty, které zadání jmenuje.
- Piš česky, stručně. Čísla do tabulek, ne do vět.
