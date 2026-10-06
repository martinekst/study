---
name: test-cases-md
description: 'Použij, když uživatel chce napsat testovací případy (TC) do MD souborů na libovolném projektu, i neznámém - "napiš TC", "vytvoř test casy", "TC na tuhle featuru", "pokryj to testama", "scénáře k ticketu", "potřebuju otestovat X", "manuální testy do MD". Triggeruj i bez slova TC, když má z podkladu (ticket, specka, kód, PR) vzniknout sada testovacích scénářů. Nepoužívej pro testový návrh v ANA dokumentaci (docs-tests). Má-li repo vlastní skill na psaní TC, použij ten.'
metadata:
  author: "Zuzana Soldánová"
---

# TC do MD (obecně)

Z podkladu (ticket, specka, **kód a PR**) vzniknou **MD soubory TC** v repu projektu.

Tři vrstvy, v tomhle pořadí přednosti:

1. **Konvence projektu** (jeho standard psaní TC, šablona, existující TC) - určují **formát**:
   umístění, frontmatter, číselníky, název, jazyk.
2. **Firemní standard TechFides** v `TechFides/tf-qa-examples` - formát, když projekt vlastní nemá.
3. **Zlatá pravidla a postup níž** - určují **kvalitu** a platí vždycky, i nad rámec projektu.

## Zlatá pravidla

1. **Česky a vykáním**, jako bys to říkal zákazníkovi: „Klikněte na…", „Vyplňte…".
   Píše-li projekt TC anglicky, drž jeho jazyk.
2. **Názvy polí, tlačítek a labelů v uvozovkách**, ať je poznat, co je prvek na obrazovce.
3. **Každý TC je nezávislý** a jde vykonat samostatně, bez znalosti jiného TC.
4. **Jeden krok = jedna proveditelná akce.** Dvě slovesa spojená „a" jsou dva kroky.
5. **Víc ověření v kroku = odrážky**, každá jedna kontrolovatelná kontrola. Nikdy je
   neslepuj do souvislé věty.
6. **Do sloupce „Data" patří jen hodnoty k doplnění**, klidně obecně („vložte validní e-mail").
   Ne instrukce, ne vysvětlování.
7. **Každý TC má odhad průchodu** (`5m`, `10m`, `15m`, `20m`) **a prioritu**, i když je
   standard projektu vede jako nepovinné.
8. **Exploratory TC nemá kroky**, ale seznam oblastí ke kontrole.
9. **Obecná data u manuálních TC**, ať každý průchod běží na jiných. Konkrétní hodnotu piš
   jen tam, kde na ní scénář stojí (hranice, konkrétní role). **U TC k automatizaci naopak
   konkrétní, deterministická data**, jinak není na co asertovat.
10. **Validace, které nejsou popsané v TC, musí být popsané jinde a v kroku na ně odkaz**
    (pole `spec`). „Ověřte validace" bez odkazu je nedokončený krok.
11. **Nevymýšlej chování systému.** Co z podkladu neplyne, dostane `> ⚠️ TODO: ověřit (QA)`.

## Postup

1. **Konvence projektu.** `git fetch origin`, zjisti default branch
   (`gh repo view --json defaultBranchRef -q .defaultBranchRef.name`) a čti z
   `origin/<default>`, ne z lokální branche. Repo bez remote čti z pracovního stromu. Hledej:
   - `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md` - kam patří TC a jaká pravidla platí,
   - standard psaní TC:
     `git grep -il -e "testovací případ" -e "test case" -e "psani-testovacich" origin/<default>`,
   - šablonu a existující TC: soubory s `id: TC-` ve frontmatteru
     (`git grep -l "^id: TC-" origin/<default>`), složky `*testovaci-pripady*`, `test-cases`,
   - prerekvizity (`id: PRE-`), číselník oblastí (index sekce TC, glosář).

   Pak se rozhodni:

   | Našel jsi                    | Formát bereš z                                                            |
   | ---------------------------- | ------------------------------------------------------------------------- |
   | standard psaní TC v repu     | ze standardu + **dva existující TC ze stejné složky** jako vzor těla      |
   | TC bez standardu             | z existujících TC (jejich frontmatter, sekce, jazyk); rozpory vypiš       |
   | nic                          | z firemního standardu (níž); cílovou složku a oblasti **navrhni ke schválení** |

   Legacy TC, které odporují standardu projektu, neopisuj - řídí standard.

2. **Firemní standard** (jen když projekt vlastní nemá) čti živě:
   ```bash
   gh api repos/TechFides/tf-qa-examples/contents/docs/qa-specifikace/04-standardy-konvence-a-procesy/psani-testovacich-pripadu.md -H "Accept: application/vnd.github.raw"
   gh api repos/TechFides/tf-qa-examples/contents/docs/qa-specifikace/07-testovaci-pripady/00-sablona-tc.md -H "Accept: application/vnd.github.raw"
   ```
   Když `gh` nejde, použij výtah v [vychozi-format-zaloha.md](vychozi-format-zaloha.md) a řekni to.
   Projektové číselníky (`area`, `feature`, mapování na `[Oblast]`) standard nedefinuje -
   odvoď je ze struktury aplikace a nech schválit spolu s TC.

3. **Podklad.** Projdi všechny čtyři vrstvy (sekce Podklad). Nemáš-li žádný zdroj,
   zeptej se - chování systému nevymýšlej.

4. **Duplicity a okolí.** Projdi existující TC v cílové složce a `git grep -il "<téma>"`.
   Na hotové TC nesahej; tenké nebo věcně špatné vypiš k opravě, **nezakládej druhou verzi**.

5. **Prerekvizity.** Použij existující `PRE-xxx`. Chybí-li stav, který TC potřebuje,
   **navrhni novou prerekvizitu** a nech ji schválit s TC. Opakuje-li se stejný předpoklad
   ve třech a víc TC, patří do PRE, ne do těla.

6. **Náhled ke schválení - povinný gate.** Před zápisem jakéhokoli souboru vypiš:
   - odkud bereš formát (standard projektu / existující TC / firemní standard) a cílovou složku,
   - seznam TC, jeden řádek na TC: `title | type | priority | suites | soubor | doklad`,
     kde **doklad** je konkrétní soubor v kódu nebo PR, ze kterého scénář plyne
     (nebo `spec` / `⚠️ jen ticket`),
   - navržené prerekvizity a nové hodnoty číselníků,
   - **rozpory ticket / specka / kód** (viz Pravidla dokládání).

   Teprve po „ok" piš soubory. Spěch ani nedostupnost uživatele gate neruší: když nemůžeš
   dostat „ok", skonči náhledem a soubory nezakládej.

7. **Založ soubory.** `id` přiděl skriptem, ne od oka:
   ```bash
   python3 <adresář tohoto skillu>/next_id.py --prefix TC-<AREA>   # nebo PRE, --count N
   ```
   Prefix podle formátu projektu (firemní standard: `TC-<AREA>`). Skript projde celé repo
   v pracovním stromu i na `origin/<default>` a vrátí další volné číslo. Pak dopiš
   frontmatter podle zvoleného formátu, `> **Účel:**`, prerekvizity a kroky.

8. **Ověř.** Má-li repo validaci nebo formátování (`package.json`: `docs:validate`,
   `check:*`, `lint`, `format`), pusť je - všechno musí projít. Bez nich aspoň zkontroluj,
   že frontmatter je validní YAML a tabulka kroků má stejný počet sloupců v každém řádku.

9. **Git.** Vlastní branch (podle konvence repa, jinak `<TICKET>-tc-<téma>`), nikdy
   do default branche, nikdy nepřepisuj cizí rozdělanou práci. Commit, push a PR jen na pokyn.

## Podklad: záměr, specka, kód, testy

Ticket říká, co se mělo stát; **kód říká, co se stalo** - očekávané výsledky ber odtud.

| Vrstva                    | Odpověď                        | Kde hledat                                                          |
| ------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| **Ticket**                | záměr, akceptační kritéria     | Jira přes Atlassian MCP (instanci a server ověř živě), GitHub issue |
| **Funkční specka**        | jak to má fungovat             | docs v repu, Confluence                                             |
| **Kód a PR**              | co je reálně naimplementované  | `gh search prs --owner <org> "<KLÍČ>"`, `git log --all --grep "<KLÍČ>"` |
| **Existující aut. testy** | co už je pokryté               | `*.spec.*`, `*.test.*`, `e2e/`, `*.feature`                         |

- Z PR: `gh pr diff <č.> --name-only` na rozsah dopadu, diff na validace, stavy,
  hraniční hodnoty a texty hlášek.
- **Přesné texty tlačítek a hlášek** ber z i18n souborů (`cs.json`, `messages/*`, `locales/*`),
  ne z hlavy ani ze starého TC.
- **Průvodci a vícekrokové dialogy:** přečti komponentu, která průvodce skládá, a vypiš si
  posloupnost kroků i podmínky, kdy se krok vykreslí. Povinný mezikrok patří do kroků.
- Cizí repa neklonuj bez dotazu, čti přes `gh`. Lokální klony bývají zastaralé.

**Pravidla dokládání:**

- **Necituj kód, který jsi nepřečetl.** Z názvu souboru ani z titulku PR se chování neodvozuje.
- **Text v i18n není doklad chování.** Tlačítko nebo hláška bez implementace = TC nepiš,
  vypiš ho v náhledu jako „nabízím k doplnění, `⚠️ jen i18n`".
- **Rozpor ticket / specka vs. kód:** popiš chování podle kódu a rozpor **vypiš uživateli
  v náhledu** - může to být bug. Nikdy ho nezameť tím, že si vybereš jednu verzi.
- Do frontmatteru vyplň `code:`, `spec:` a `tickets:`.
- Je-li scénář už pokrytý automatem na stejné úrovni (UI/E2E), nepiš duplicitní manuální TC;
  uveď ho v náhledu s cestou k testu (u existujícího TC `automation.state: automated`).
  Unit testy manuální TC nenahrazují, jen ti říkají, kde je logika.

## Návrh scénářů (co vlastně napsat)

**Cíl je málo TC, které se vyplatí udržovat** - ne vyčerpávající matice. Pokrývej v pořadí:

1. **Happy path** hlavní cesty.
2. **Edge case**: hraniční hodnoty a přepínače z kódu (`>= 500`, `floor(x / 12)`, `null` vs.
   prázdná hodnota). Hranici testuj **z obou stran** - těsně pod a na ní.
3. **Důležité průchody**: kde se něco nevratně přepisuje, archivuje nebo přepočítává, a kde
   už jednou byl bug.
4. **Autorizační pravidla**: kdo smí akci provést (role, čtyři oči, jednorázovost na uživatele).
5. **Dopady mimo obrazovku** (notifikace, audit, událost), jen jsou-li doložené.

Varianty lišící se jen daty = **jeden TC s maticí** mimo tabulku kroků, ne N TC.
Kolik TC: pokrytí podkladu, ne kvóta. Vychází-li jich přes deset, vyber nejrizikovější
a zbytek nabídni jako seznam k doplnění.

## Co skill hlídá navíc

- **`status: draft` (nebo ekvivalent projektu) u všeho, co vygeneruješ.** Dál posouvá člověk.
- **`owner`** = lokální část `git config user.email`, `updated_at` = dnešní datum.
- **`id` je trvalé.** Existujícím TC ID nikdy neměň a nepřečíslovávej.
- **Název nevymýšlej**, když z podkladu neplyne scénář - nech `> ⚠️ TODO: doplnit název (QA)`.
- **V názvu termíny, které uživatel vidí v UI**, ne backendové pojmy.
- **Pomlčky podle projektu;** nemá-li pravidlo, piš spojovník `-`, ne em-dash `—`.

## Kroky - nejčastější chyby

| Chyba                                             | Správně                                               |
| ------------------------------------------------- | ----------------------------------------------------- |
| „Vyplňte kód a klikněte na Uplatnit"              | Dva kroky, jeden krok = jedna akce                    |
| Víc výsledků slepených do odstavce                | `<ul><li>…</li></ul>`, každá kontrola vlastní odrážka |
| Očekávaný výsledek jako pokyn („Zkontrolujte, že") | Oznamovací způsob: „Zobrazí se hláška „…"."           |
| Tykání / infinitiv („Klikni", „Kliknout")         | Rozkazovací způsob s vykáním: „Klikněte"              |
| Endpoint v akci, holá URL, base URL prostředí     | Do „Data" jako `` `POST /v1/...` ``, jen relativní cesta |
| Prázdný krok `Konec \| – \| –`                    | Vypustit                                              |
| Dvě větve scénáře v jednom TC                     | Dva TC soubory, jeden TC = jedna tabulka kroků        |

## TC určené k automatizaci

Řekne-li uživatel, že TC půjdou automatizovat, nastav `automation.state: forAutomation`
a řiď se pravidly projektu pro E2E testy, jsou-li. Navíc:

- **Kotvi kroky na `data-testid`**, ne na text ani pozici v DOM. Chybějící test-id vypiš
  jako úkol na FE a v kroku ho označ jako zatím neexistující.
- **Prerekvizity jako API seed**, ne proklik UI. Co seed neumí, vypiš jako úkol.
- **Jeden TC = jedno chování**, deterministicky. Žádné „pokud se zobrazí, pak…".
- **Ke každému TC ověřitelný výstup**, ideálně i datový side-effect (odpověď API).
- Datové varianty jako jeden parametrizovaný TC (`Scenario Outline`), ne N TC.
