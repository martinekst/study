---
name: tf-google-doc
description: Použij, když má vzniknout Google dokument v grafické úpravě TechFides (hlavičkový papír v2) a uložit se na Google Drive – výstup pro board, zpráva, zápis, nabídka, report, „dokument ve firemní šabloně“ nebo „na hlavičkovém papíře“. Nese specifikaci vzhledu, kostru DOCX s hlavičkou a patičkou a generátor Markdown → DOCX; popisuje nativní plnění přes Google Docs konektor i náhradní cestu jen s Google Drive.
metadata:
  author: "Martin Studnička"
---

# TechFides dokument na Google Drive

Vzhled je převzatý z Google dokumentu **TechFides Hlavičkový papír v2**
(ID `1lU7_173Th3RkMI0MKQII_ZqPyRb0qa0xmUB84jOvgXU`, vlastník Václav Mičulka).
Přesný popis všech hodnot (písma, velikosti, barvy, tabulky, seznamy, hlavička, patička) je ve
`STYLE.md`. Kostra jeho DOCX exportu (styly, hlavička s logem, patička) je v `template/`.

Cesty níže předpokládají instalaci do `.claude/skills/tf-google-doc/`; při jiném cíli je uprav.

Vždy nejdřív načti skill `anthropic-skills:google-workspace` a jeho referenci pro Google Docs (soubor docs.md ve složce references)
(pravidla pro Google soubory a pravidla psaní: shrnutí začíná závěrem, žádné ručně psané odrážky
a čísla, žádné emoji, nadpisy o obsahu). Dokument piš česky, pokud uživatel nechce jinak.

## Dostupné konektory rozhodují o postupu

| Konektor v chatu | Postup |
|---|---|
| Google Drive **i Google Docs** | **A – nativní plnění** (doporučeno): kopie hlavičkového papíru + `update_doc`. Žádný přenos binárních dat. |
| jen Google Drive | **B – DOCX k ručnímu nahrání**: `build_docx.py` → soubor uživateli → uživatel ho přetáhne do Drive, Drive ho převede na Google Doc. |

**Nepokoušej se nahrát DOCX přes Drive `create_file` s `base64Content`.** Base64 musí projít
parametrem nástroje, tj. model ho musí opsat znak po znaku. Ověřeno 30. 9. 2026: při 28 000
i 13 000 znacích vznikla chyba opisu a Drive soubor odmítl („not a valid base64 string“).
Spolehlivé je to jen do zhruba 3 000 znaků, což s logem nelze splnit. Hlavička s logem se navíc
nedá vytvořit z HTML ani Markdownu přes `textContent`, Google ji při importu ignoruje.

## Postup A – Google Docs konektor (doporučeno)

1. `copy_file` na hlavičkový papír (ID výše) s `title` nového dokumentu a případně `parentId`
   cílové složky. Kopie nese hlavičku s logem, patičku, styly Title/Subtitle/Nadpis 1–6,
   výchozí Open Sans i formát seznamů, bez přenosu jediného bajtu.
2. `read_doc` kopie → `revisionId`, `tabId` a pozice. Tělo obsahuje vzorový text stylového
   průvodce; smaž ho jedním `deleteContentRange` od indexu 1 po `endIndex − 1` posledního prvku
   (rozsah musí pokrýt celé tabulky). Zůstane jeden prázdný odstavec se stylem Title.
3. Vlož obsah v jedné dávce `update_doc` s `writeControl.requiredRevisionId`:
   - jeden `insertText` na index 1 s celým textem (odstavce oddělené `\n`, položky seznamu
     s vodicími tabulátory podle úrovně vnoření),
   - `updateParagraphStyle` s `namedStyleType` (TITLE, SUBTITLE, HEADING_1…, NORMAL_TEXT) na
     rozsahy spočítané z délek v UTF‑16 (čeština = 1 jednotka na znak); Normal text nastav
     výslovně, první odstavec jinak zdědí Title,
   - `updateTextStyle` pro tučné, kurzívu a odkazy (`link.url`, barva `#365f91`, podtržení),
   - `createParagraphBullets` na rozsah každého seznamu (`BULLET_DISC_CIRCLE_SQUARE`,
     `NUMBERED_DECIMAL_ALPHA_ROMAN`); vnoření určují vodicí tabulátory,
   - tabulky vkládej od konce dokumentu k začátku, aby se dřívější indexy neposunuly; požadavky
     vygeneruje `docs_index.py new-table --at I --data rows.json --revision REV --bold-header`
     ze skillu google-workspace, poté doplň `updateTableCellStyle` (hlavička `#365f91`, tělo
     `#f3f3f3`, okraje buněk 0,06 in, svislé zarovnání MIDDLE, bílé ohraničení 1 pt),
     `updateTextStyle` bílé tučné písmo v hlavičce a `pinTableHeaderRows` 1.
   Hodnoty ber ze `STYLE.md`. Hlavičku, patičku ani definice stylů neměň.
4. Ověř (oddíl „Kontrola výsledku“) a odpověz odkazem na dokument.

Až bude konektor k dispozici, napiš a otestuj generátor build_docs_requests.py ve složce scripts
(Markdown → požadavky `update_doc`); do té doby požadavky sestav podle receptu výše.

## Postup B – DOCX k ručnímu nahrání (jen Google Drive)

1. Napiš obsah do Markdownu ve scratchpadu (podmnožina viz níže, vzor `examples/board-report.md`).
2. Sestav a zvaliduj:
   ```bash
   python3 .claude/skills/tf-google-doc/scripts/build_docx.py obsah.md -o "Nazev dokumentu.docx"
   ```
   Pokud je k dispozici skill `docx` (Anthropic), spusť na výsledek jeho validátor OOXML (validate.py ve složce scripts/office).
3. Pošli soubor uživateli (nástroj pro odeslání souboru, jako přílohu) s pokynem: nahrát do
   Google Drive a otevřít v Google Docs (nebo mít v Drive zapnutý převod nahrávaných souborů).
   Google při převodu zachová hlavičku s logem, patičku, styly nadpisů, seznamy i stínování tabulek.
4. Jakmile uživatel potvrdí nahrání nebo pošle odkaz, proveď kontrolu níže.

## Kontrola výsledku
`download_file_content` s `exportMimeType: application/pdf` (výsledek se uloží do souboru) →
`python3 .claude/skills/tf-google-doc/scripts/render_pdf.py soubor.json adresar` → prohlédni PNG.
Kontroluj: logo vpravo v hlavičce, patička s linkou, kontakty a číslem stránky, modré nadpisy
v Open Sans, tabulky s modrou hlavičkou a šedým tělem, seznamy s kolečky, žádný nadpis osamocený
na konci stránky, žádná prázdná stránka. LibreOffice v cloudovém kontejneru nemusí fungovat,
PDF export z Drive je rozhodující.

## Úpravy po vytvoření
Malé změny v existujícím dokumentu jen přes Google Docs konektor (`update_doc`). Bez něj se řiď
pravidlem google-workspace skillu: zeptej se, nevytvářej tiše druhý soubor. Starý soubor nikdy
netrashuj bez pokynu.

## Podporovaný Markdown (`build_docx.py`)
| Zápis | Výsledek |
|---|---|
| `---` blok na začátku s `title:` a `subtitle:` | styl Title (36 pt, na střed) a Subtitle |
| `#`, `##`, `###`, `####` | Nadpis 1–4 ze šablony (číslování do textu nadpisu nepiš) |
| prázdný řádek | nový odstavec (Normální text, do bloku) |
| `- položka` / `* položka`, odsazení 2 nebo 4 mezery | nečíslovaný seznam ● ○ ■, vnořený podle odsazení |
| `1. položka` | číslovaný seznam 1. a. i. (každý blok začíná od 1) |
| `\| a \| b \|` + volitelný řádek `\|:--\|:-:\|--:\|` | tabulka ve firemním formátu, první řádek je hlavička |
| `> text` | odsazená poznámka kurzívou |
| `**tučně**`, `*kurzíva*`, `` `kód` ``, `[text](url)` | inline formátování a odkazy |
| `\pagebreak` na samostatném řádku | zalomení stránky |

Nepodporováno: obrázky v těle, poznámky pod čarou, sloupce, vnořené inline formátování.

## Soubory
- `STYLE.md` – kompletní specifikace vzhledu (zdroj pravdy pro oba postupy).
- `template/` – kostra DOCX: `styles.xml`, `header1.xml` + `media/logo.png`, `footer1.xml`,
  `settings.xml`, `fontTable.xml` (bez vložených fontů, XML zkráceno o rsid/paraId).
- `scripts/build_docx.py` – Markdown → DOCX, jen standardní knihovna Pythonu 3.
- `scripts/render_pdf.py` – PDF nebo JSON export → PNG stránek (vyžaduje `pip install pymupdf`).
- `examples/board-report.md` – ukázkový podklad pro board (ilustrační čísla).
