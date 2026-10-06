# Proposed functional menu structure

This is the established catalogue for the **scenario view**. It preserves the
current scenario content model while the actual existing filesystem remains the
exact menu. Skip pages without evidence and add evidence-backed pages that the
catalogue does not anticipate.

All example folders live below the functional section's scenario-view group. In
a scenario-only portal that group may remain at `functional/002-scenarios/`; in a
multi-view portal, [cross-view ownership and menu rules](cross-view/ownership-menu-linking.md)
place common content once and position the scenario group according to
`functional_views`.

The page model is lifecycle- and source-independent. What changes is evidence
precedence and acceptable uncertainty; use [`evidence-rules.md`](evidence-rules.md)
and the resolved `docs-base` context.

## Depth rule and filename prefix

The filesystem and filename prefixes own exact navigation. This catalogue uses:

- **Default three levels, sub-grouping where needed** — section → group →
  page. A scenario-only functional section uses exactly two groups (`Základní
přehled` and `Scénáře`). A multi-view section keeps the common overview once
  and adds one group for each configured view. Scenarios stay **flat** in
  `Scénáře` by default, grouped
  logically by `module:` (or by axis — user / admin / system) in
  frontmatter and on `2.1.7 Seznam scénářů`. When the flat scenario list
  grows unnavigable, `Scénáře` may split into **podskupiny** (a 4th level,
  one folder per audience / module / axis), with user confirmation — see
  [`scenario-grouping.md`](scenario-grouping.md).
- **Three-digit order prefix** on every folder and `.md` file
  (`001-zakladni-prehled/`, `002-scenarios/`, `002-scenarios/001-klient/`,
  `001-zakladni-prehled/001-overview.md`). Scenario files use the
  stable SC-ID prefix (`sc-NN-…`); see the scenarios group below.

## Numbering

The hierarchical numbering in the tables below is **structural only** — it
defines the menu hierarchy and ordering, and it lives **exclusively in the
folder / file order prefix**. Titles **NIKDY** include the order number: the
`title` field carries only the Czech label (e.g. `title: Aktéři a persóny`,
`title: Přihlášení uživatele`, `title: Základní přehled`). The section, every
group, and every page all carry a number-free title; the number is recovered
from the folder / file prefix, not from the title string.

The "Number" column in the tables below is the structural position only — it is
**NOT** copied into the title.

## Section index

- `functional/index.md` — `title: Funkční specifikace`. No numeric prefix;
  its position comes from the actual parent filesystem.

## Group: `001-zakladni-prehled/` (2.1 Základní přehled)

Holds every page that is **not** an individual scenario detail.
Generated first in the run because every later scenario references
back into it (actors, business rules, the scenario list).

Group index: `001-zakladni-prehled/index.md` —
`title: Základní přehled`. The `001-` folder prefix owns its order.

| Order | Number | File                       | Czech label (title) |
| ----- | ------ | -------------------------- | ------------------- |
| 1     | 2.1.1  | `001-overview.md`          | Shrnutí             |
| 2     | 2.1.2  | `002-product-structure.md` | Struktura produktu  |
| 3     | 2.1.3  | `003-glossary.md`          | Glosář              |
| 4     | 2.1.4  | `004-actors-personas.md`   | Aktéři a persóny    |
| 5     | 2.1.5  | `005-screens.md`           | Obrazovky           |
| 6     | 2.1.6  | `006-business-rules.md`    | Business pravidla   |
| 7     | 2.1.7  | `007-scenarios-list.md`    | Seznam scénářů      |

### Why this order

- Shrnutí first — the executive entry point.
- Struktura produktu and Glosář next — the vocabulary every later
  page assumes.
- Aktéři a persóny — roles + user archetypes, referenced by every
  scenario.
- Obrazovky — UI surface, referenced from scenario wireframe anchors.
- Business pravidla — cross-scenario rules that the scenarios then
  cite.
- Seznam scénářů **last in this group** — the master scenario
  table needs everything above it to be in place to cite roles,
  rules, and screens correctly.

### Aktéři a persóny (2.1.4)

Merged page with the **detailed role × permissions matrix** —
previously the matrix lived in the technical section
(`3.7.1 Matice rolí a oprávnění`), but the new technical
structure no longer has a roles-matrix page. The functional
section is now the single source of truth for "who is allowed to
do what".

The page has three top-level sections:

- `## Aktéři` — role list (table of role → identifier →
  purpose → cross-link to scenarios). Required.
- `## Matice rolí a oprávnění` — detailed entity × operation ×
  role permissions matrix. Required.
- `## Persóny` — user archetypes with goals, pains, behaviour
  patterns. Optional; the section is included only when evidence
  exists (personas are rare when only implementation evidence exists and common when
  customer-research or discovery evidence exists).

When personas evidence is absent, the section is omitted entirely
— do not leave an empty heading.

Use the dedicated template
[`templates/actors-personas.md`](templates/actors-personas.md)
for this page — **NOT** `templates/generic-page.md`. The
generic template lacks the matrix and the matrix conventions.

### Prototype link (005-screens.md)

When `docs-prototype` has generated a prototype for this project,
`005-screens.md` **must** include a link to it at the bottom of the page:

```markdown
## Prototyp

Klikatelný prototyp: [odkaz na prototyp](…)
```

The prototype is not a separate docs section — only this link appears in
the docs tree. The URL / path is provided by `docs-prototype` after its run.

### Skip rules

- `005-screens.md` is skipped when the system has no UI (pure
  backend / API-only).
- `006-business-rules.md` is skipped when no cross-scenario rule
  exists (every constraint lives in a single scenario).
- All other pages are required.
- If the scan turns up a page that doesn't fit any of 2.1.1–2.1.7,
  propose it with the next free `00N-` prefix and numbering
  `2.1.N` agreed with the user.

## Group: `002-scenarios/` (2.2 Scénáře)

The per-scenario detail pages. Generated **after** every page in
`Základní přehled` is in place, because scenarios cite actors,
business rules, screens, and the scenarios list.

Group index: `002-scenarios/index.md` — `title: Scénáře`. The
`002-` folder prefix owns its order.

**Default (small counts): scenarios live flat** under
`002-scenarios/sc-NN-<slug>.md` (3 levels). Logical grouping is expressed
in `module:` frontmatter and on `2.1.7 Seznam scénářů`, not by folders.

| Number | File                            | Czech label (title) (example) |
| ------ | ------------------------------- | ----------------------------- |
| 2.2.1  | `002-scenarios/sc-01-<slug>.md` | Přihlášení uživatele          |
| 2.2.2  | `002-scenarios/sc-02-<slug>.md` | Registrace uživatele          |
| 2.2.3  | `002-scenarios/sc-03-<slug>.md` | Obnovení hesla                |
| …      | …                               | …                             |

**When the flat list grows unnavigable: split into podskupiny** (a 4th
level, one folder per audience / module / axis), with user confirmation per
[`scenario-grouping.md`](scenario-grouping.md). Each podskupina is a folder
with its own `index.md`; scenario titles gain a fourth numbering segment:

| Number  | File                                       | Czech label (title) (example) |
| ------- | ------------------------------------------ | ----------------------------- |
| 2.2.1   | `002-scenarios/001-klient/index.md`        | Klient                        |
| 2.2.1.1 | `002-scenarios/001-klient/sc-01-<slug>.md` | Přihlášení uživatele          |
| 2.2.2   | `002-scenarios/002-agent/index.md`         | Agent                         |
| 2.2.2.1 | `002-scenarios/002-agent/sc-07-<slug>.md`  | Přiřazení případu             |
| …       | …                                          | …                             |

### Filename and identifiers

- **Filename**: `sc-NN-<kebab-slug>.md` — `sc-NN` is the stable
  SC-ID and **acts as the order prefix**. Kebab-case ASCII (no diacritics), e.g.
  `sc-01-prihlaseni-uzivatele.md`. The SC-ID is zero-padded to two
  digits for sort stability.
- **Title**: `<Czech label>` only — **NIKDY** the order number. The
  `2.2.N` position lives solely in the file's order prefix (the `sc-NN`
  SC-ID), not in the title.
- **Scenario info block**: includes the stable identifier as a
  separate row (`SC-ID: SC-01`) so both the numeric (`2.2.1`) and
  the stable (`SC-01`) identifier are preserved.
- **Module / axis**: recorded in frontmatter as `module: <value>`
  — drives grouping on `2.1.7 Seznam scénářů` per
  [`scenario-grouping.md`](scenario-grouping.md). Not a folder.

## Notifications and reports — folded into scenarios

The earlier proposal had separate `Notifikace a komunikace` and
`Reporty a analytiky` top-level pages. They are now **part of the
specific scenario** that emits them:

- A scenario that sends an e-mail / push / SMS describes the
  notification in its own body, as side-effect bullets inside the
  **Popis business logiky** section (template `scenario.md`).
- A scenario that produces a report describes it the same way,
  again in the scenario body — input, output, frequency,
  recipient.

This keeps the doc structure flat: a reader looking at "scenario
SC-04 — vystavení faktury" sees the e-mail it triggers in the
same page, instead of cross-referencing a separate notifications
catalogue. When a notification or report is used by many
scenarios, it gets a one-line entry in `006-business-rules.md` (or
a dedicated page proposed in Step 1).

## Use-case diagram placement

The per-module / per-axis use-case diagram belongs on
`007-scenarios-list.md` (2.1.7), not inside the `002-scenarios/`
group. The `scenarios-list.md` page holds the master scenario
table and anchors the use-case diagram(s) via
`<!-- diagram-anchor: use-case-all -->` and optionally
`<!-- diagram-anchor: use-case-<module-or-axis> -->` per section.

## Skip rules (group level)

- When `scenario` is enabled, its scenario group is never empty: every
  catalogue entry has a detail page. A process-only or UI-only portal does not
  generate this group.
- `001-zakladni-prehled/` is never skipped — even a single-scenario
  run needs at least `001-overview.md`, `004-actors-personas.md`,
  and `007-scenarios-list.md`.

## Skip rules (page level)

See the per-group tables above.

## Label, numbering, and order rules

- Czech labels use professional Czech and the `czech-style` guidance.
- The `title` field in frontmatter carries **only** the Czech label —
  it **NIKDY** includes the order-number prefix. The number from the
  tables above lives exclusively in the folder/file prefix.
- Section-level, group-level, and page-level `index.md` / pages all
  carry a **number-free** `title` (e.g. `title: Aktéři a persóny`,
  `title: Základní přehled`, `title: Scénáře`).
- New (non-proposed) pages inside `Základní přehled` get the next
  free `00N-` prefix; the title stays number-free (just the Czech
  label) — the order is carried by the prefix, agreed with the user.
- A change to existing folders or grouping is previewed and approved through
  `docs-workflow`; files and links migrate before README is updated.
