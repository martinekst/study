# VZOR – Jak na Doménové modely

## 1. Účel doménového modelu

Doménový model:

- popisuje **business pohled na data systému** (nikoliv databázovou implementaci),
- je součástí funkční specifikace v sekci Doménový model,
- tvoří základ pro: návrh databáze (ERD), návrh API kontraktů, validace a business logiku, odhad pracnosti.

Doménový model **není DB model** a nesmí být zatížen technickými detaily (indexy, FK jména, auditní triggery apod.).

## 2. Struktura doménového modelu (povinné části)

Každý doménový model se skládá ze dvou částí: diagram + tabulkový přehled.

### 2.1 Diagram

K modelování využíváme PlantUML – class diagram. Entita = class, číselník = enum. Vztahy jsou vyjádřeny asociacemi s kardinalitami.

**Povinná pravidla:**

- Každá entita má jednoznačný název v jednotném čísle (např. `Person`, `Transfer`).
- Entita obsahuje pouze business atributy.
- Entita obsahuje datové typy u všech atributů.
- Kardinality jsou vždy explicitně uvedeny (`"0..*"`, `"1..*"`, …) – výjimkou je kardinalita `"1"`, ta je implicitní a nemusí se uvádět.
- Číselníky jsou modelovány jako `enum <<enum>>`.
- Hodnoty z číselníků se používají 1:1 v implementaci.
- Nepoužíváme: DB-specific datové typy (např. `varchar(255)`), názvy tabulek, ID generátory, indexy apod.

### 2.2 Tabulkový přehled entit a číselníků

Každý diagram musí mít tabulkovou část (viz `vzor-domenovy-model-tabulky.md`). Tabulková část je závazná – slouží jako zdroj pro backend, podklad pro validace, kontrolu konzistence s use casy.

## 3. Pravidla pojmenování

### 3.1 Entity

Jednotné číslo, angličtina, samopopisné názvy, PascalCase. Bez prefixů typu `Tbl`, `Ent`, `Dto`.
✅ `Person`   ❌ `Persons`, `tbl_person`, `PersonEntity`

### 3.2 Atributy

Angličtina, samopopisné názvy, camelCase. Bez zkratek (kromě ustálených, např. `refNo`).
Vynecháváme implicitní a standardní atributy (`id`/`uuid`, `createdAt`, `modifiedAt`, …), pokud by jejich vynechání zhoršilo čitelnost, uvedeme je.
Vazbu na jinou entitu popíšeme atributem odkazujícím se na danou entitu (`person` typu `Person`).
✅ `createdAt`   ❌ `create_date`, `crAt`, `datumVytvoreni`

### 3.3 Enum hodnoty

VELKÁ_PÍSMENA, angličtina, oddělené podtržítkem. Stabilní kód (nepřepisovatelný podle textace UI). Názvy hodnot se shodují 1:1 s implementací.
✅ `DRAFT`, `WAITING_FOR_CONFIRMATION`   ❌ `Created`, `NOVY`

## 4. Používané datové typy (doménová vrstva)

Používáme obecné, technologicky neutrální typy:

| Typ | Význam |
| --- | --- |
| string | Textový údaj (včetně JSON apod.) |
| number | Číselná hodnota |
| boolean | Pravdivostní true/false |
| date | Datum bez času |
| datetime | Datum a čas |
| uuid | Globální identifikátor |
| (konkrétní entita/číselník) | KeyValue |
| array of | Pole entit (vyjádření vazby M:N nebo kardinality > 1) |

### Zásady

- Nepoužíváme `int`, `varchar`, `decimal(10,2)` apod.
- Do poznámky je vždy potřeba uvést upřesňující detaily daného atributu, pokud má jejich implementace vliv na smysl/využití atributu (zejména JSON, číslo s přesností na desetinná místa apod.).
- Peníze = předdefinovaný objekt `Money` (`Money.amount`, `Money.currency` – detail řeší DB návrh).
- Procenta = `number` (poznámka v tabulce).
- Stav entity – používáme `status`, nikoliv `state`.
- Speciální datové typy podporované konkrétním DB systémem (`daterange`, `bytea`, …) je možné použít pouze po konzultaci s ANA leadem a Tech leadem.

## 5. Modelování vztahů

### 5.1 Kardinality

Každý vztah musí mít správnou kardinalitu a správný typ vazby (agregace, kompozice, asociace).

**Typy vazeb (PlantUML):**

| Typ | Význam | Použití |
| --- | --- | --- |
| `--` | asociace | běžná vazba |
| `o--` | agregace | slabá vazba |
| `*--` | kompozice | silná vlastnická vazba |
| `-->` | využití | využití číselníku |
| `<\\|--` | generalizace/specializace | dědičnost |
| `<\\|..` | realizace | realizace rozhraní |

Příklady:

- `Person *-- "1..*" PersonProduct` – Person vlastní své případy (PersonProduct bez Person nemůže existovat).
- `Person o-- "1..*" Address` – K Person se mohou vázat adresy (fungují samostatně i bez Person).
- `ArbitrationCase --> ArbitrationCaseStatus` – využití číselníku stavů.
- `Employee <|-- Operator` – Operátor specializuje zaměstnance (dědí z něj).

### 5.2 M:N vztahy

**Diagram:** může zobrazovat M:N přímo vazbou; pokud má vazba vlastní atributy, je potřeba vazební entita.
**Tabulka:** je potřeba uvést v obou dotčených entitách (typ `array of XYZ`) + popsat v poznámce.

## 6. Číselníky (enum vs entita)

**Používáme enum**, pokud: seznam hodnot je omezený, je řízen vývojovým týmem, nemění se dynamicky administrátorem.
**Používáme entitu**, pokud: hodnoty spravuje uživatel (např. přes FE), obsahují další atributy, jsou lokalizované.

## 7. Auditní atributy

Pokud to dává smysl, hlavní entita může obsahovat i: `createdAt: datetime`, `lastModifiedAt: datetime`, `createdBy: string`, `lastModifiedBy: string`.
Mazání: preferujeme soft-delete přes `status`; nemodelovat `deletedAt`, pokud není business význam.

## 8. Vazba doménového modelu na use case

Každý use case musí být mapovatelný na vytvoření/změnu konkrétní entity a/nebo změnu jejího stavu.
Pokud use case pracuje s daty, která nejsou v doménovém modelu → **model je neúplný!**

## 9. Převod doménového modelu na ERD (DB model)

Doménový model = business vrstva. ERD = implementační vrstva.

### 9.1 Základní převodní pravidla

1. **Entita → Tabulka** – každá entita = jedna tabulka; název tabulky snake_case (např. `person`, `person_products`).
2. **Atribut → Sloupec** – mapování typů:

| Doména | DB (příklad PostgreSQL) |
| --- | --- |
| string | char, varchar, text, JSON/JSONB, … |
| number | integer, numeric, decimal, real, … |
| boolean | boolean |
| date | date |
| datetime | timestamp |
| uuid | UUID |

3. **Enum → DB řešení** – možnosti: DB enum typ, nebo reference na tabulku. Rozhodnutí je architektonické, nikoliv analytické.
4. **1:N vztah** – doména: `Person "1" *-- "1..*" PersonProduct`; DB: `person_products.person_id` (FK → `persons.id`).
5. **M:N vztah** – doména: `ArbitrationCase o-- "1..*" PersonProduct`; DB: vazební tabulka `arbitration_case_person_product` (`arbitration_case_id`, `person_product_id`).
6. **Kompozice** (`*--`) znamená: FK je povinný, případné cascade delete (dle architektury).

## 11. Nejčastější chyby

- ❌ Míchání DB detailů do doménového modelu
- ❌ Chybějící kardinality
- ❌ Enum jako string bez číselníku
- ❌ Duplicitní entity místo vztahu
- ❌ Názvy v češtině
- ❌ Nepárování modelu s use casy
- ❌ Použití jiných než základních doménových datových typů

## 12. Doporučené workflow tvorby doménového modelu

1. Sepsat use casy.
2. Identifikovat entity.
3. Navrhnout vztahy.
4. Definovat číselníky.
5. Vytvořit tabulkovou část.
6. Vytvořit PlantUML diagram.
7. Zkontrolovat: konzistenci s use casy, kardinality, duplicity.

## 13. Vzorová tabulka – KeyValue

| Název | Datový typ | Povinné | Poznámka |
| --- | --- | --- | --- |
| key | string | ✅ | Klíč hodnoty |
| value | string | ✅ | Hodnota |

## 14. Vzorový diagram

Viz `vzor-domain-model-plantuml.txt` v tomto adresáři – kompletní PlantUML kód vzorového doménového modelu (Person, Address, PersonProduct, Transfer, BonusPrice, PersonDocument, ArbitrationCase a související číselníky).
