# Template: `002-scenarios/sc-NN-<slug>.md`

The most detailed template in the functional section. Every scenario
file follows it. Sections that genuinely do not apply (no feature
toggle, no metrics, no follow-up scenarios) are **removed**, not
left empty — empty sections are noise; missing evidence is a TODO.

The template shape is independent of lifecycle stage and source type; the
**citation form** of the `**Zdroj:**` lines depends on the authoritative
evidence inspected for the run (see
[`../evidence-rules.md`](../evidence-rules.md) “Functional citation
expectations”).

```markdown
---
title: <Czech scenario name — e.g. Přihlášení uživatele>
status: draft
updated_at: <currentDate>
module: <bucket from `scenario-grouping.md` — e.g. uzivatel / admin / system, or a module name, or an axis label>
---

<!--
confluence:
  space: <space>
  title: <Czech scenario name without numeric prefix>
  parent: Scénáře
-->

<!-- generated: <currentDate> | source: <inspected evidence reference> -->

## Info blok

| Pole              | Hodnota                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| SC-ID             | `SC-NN` <stable identifier, e.g. `SC-01`>                                                                                   |
| Realizační stav   | <`🟩 Nová funkcionalita` \| `🟥 Odstraněná funkcionalita` \| `🟧 Upravovaná funkcionalita` \| `🟦 Existující - beze změny`> |
| Cíl scénáře       | <Jedna věta popisující cíl scénáře z pohledu byznysu.>                                                                      |
| Aktéři / role     | <Comma-separated roles, e.g. `user`, `admin` — link to 2.1.4 Aktéři>                                                        |
| Vstupní podmínky  | <System / user state that must hold before the scenario starts.>                                                            |
| Výstupní podmínky | <System state after a successful run.>                                                                                      |
| NFRs (pokud jsou) | <Latency, availability, throughput — if defined.>                                                                           |

<!--
Do NOT add a `Modul` row to the Info table. Module belongs only to:
  - frontmatter (`module:`)
  - the table in `scenarios-list.md`
Rationale: the Info table describes the scenario's content, not its
classification — duplicating module info confused reviewers.
-->

**Zdroj:**

- Vstupní bod: `<path/to/controller-or-handler:LL>` (implementation
  evidence) / `<spec-doc>#<scenario-section>` (agreed specification or
  decision)
- Oprávnění: `<path/to/guard-or-role-check:LL>` → detail v
  [technical/011-roles-matrix.md](../../technical/011-roles-matrix.md)

## Wireframe

<!-- wireframe-anchor: sc-NN -->

> Wireframy jsou generované samostatným skillem `docs-wireframes`
> po potvrzení textového obsahu (a po obdržení screenshotu, pokud
> byl k dispozici). Tato kotva označuje, kam bude wireframe vložen.

## Hlavní flow

> **Sunny case** — happy-path průchod scénářem. Jeden lineární tok
> bez větvení. Všechny rainy paths (validační odmítnutí, business
> výjimky, uživatel zruší proces, …) patří do
> **Alternativní toky** níže — **NIKDY** nevkládat větvící `if`
> kroky přímo sem.

1. <Krok 1 — co uživatel dělá, jak systém odpovídá.>
2. <Krok 2 …>
3. <Krok N — koncový stav.>

**Zdroj:**

- Orchestrace: `<path/to/service:LL>` (implementation evidence) /
  `<spec-doc>#flow` (agreed specification or decision)
- Volané komponenty: `<path/to/collaborator:LL>` / `<spec-doc>#components`

<!-- diagram-anchor: flow-sc-NN -->

> Sequence diagram pro hlavní flow doplní `docs-diagrams` na tuto
> kotvu. Sequence diagram je v každém scénáři **povinný** — popisuje,
> kdo s kým komunikuje a v jakém pořadí.

## Alternativní toky

<Rainy cases — všechny ne-happy-path průběhy, které lze nadefinovat
už při dizajne business logiky (uživatel zadá neplatná data, uživatel
zruší proces, systém najde duplicitu, business pravidlo zamítne akci,
…). **NIKDY** nezahrnovat technické výpadky (síť, DB nedostupná,
3rd-party 500) — ty patří do **Popis business logiky → Chování při
systémové chybě**.

Každý tok jako vlastní pod-sekce. Pokud žádný alternativní tok
neexistuje (čistě lineární scénář), **celou sekci vymazat** —
neponechávat prázdný nadpis ani placeholder.>

### Alt-1: <stručný název / spouštěcí podmínka>

| Pole                    | Hodnota                                                                                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spouštěcí podmínka      | <kdy se tento tok aktivuje místo hlavního, např. „Uživatel zadá e-mail, který neexistuje v DB" nebo „Uživatel klikne _Zrušit_ v kroku 3">                                               |
| Odbočka z hlavního flow | <`Od začátku` \| `Z kroku N hlavního flow` — který krok hlavního flow rozhoduje, zda se větví sem>                                                                                      |
| Koncový stav            | <`success` (alternativní úspěšný výsledek) \| `business chyba <ERR_CODE>` (viz Chybové stavy) \| `návrat na krok N hlavního flow` \| `abort`>                                           |
| QA pokrytí              | <Přímý odkaz na kotvu konkrétního test case, např. [TC-SC-03-ALT-01](../../tests/003-qa-testovaci-scenare/sc-03.md#tc-sc-03-alt-01). Vynechat pouze tehdy, když test zatím neexistuje.> |

1. <Krok 1 alternativního toku>
2. <Krok 2 …>
3. <Krok N — koncový stav uvedený výše.>

**Zdroj:**

- Větvení / podmínka: `<path/to/branch-condition:LL>` / `<spec-doc>#alt-flow-N>`
- (Pokud končí business chybou) chybový kód: viz [Chybové stavy](#chybové-stavy) → `<ERR_CODE>`

### Alt-2: <…>

<Stejná struktura jako Alt-1. Číslujte sekvenčně Alt-1, Alt-2, …
v rámci scénáře; čísla nejsou globální napříč scénáři.>

> Pokud má scénář **3 a více** alternativních toků nebo se větvení
> opakovaně proplétá s hlavním flow, doplňte navíc kotvu
> `<!-- diagram-anchor: business-logic-sc-NN -->` níže
> v sekci **Popis business logiky** — flowchart pak vykreslí všechny
> větve v jednom obrázku, zatímco sequence diagram zůstane vyhrazen
> pouze hlavnímu flow.

## Chybové stavy

<Katalog **business chybových stavů**, které jsou definovatelné už
při dizajne business logiky — kódy, které systém záměrně vrací,
když nějaké business pravidlo brání pokračování (zamítnutá platba,
zablokovaný účet, duplicitní e-mail, neplatné IČO, překročený
limit, …).

**NIKDY** sem nevkládat technické chyby (timeout, 500 z 3rd-party,
chyba DB, deadlock) — ty patří do **Popis business logiky →
Chování při systémové chybě**. Rozdíl: business chyba má známý
kód a UX reakci už ve specifikaci; technická chyba je provozní
incident, který má jen generickou fallback reakci.

Pokud scénář žádné business chybové stavy nevyhazuje, **celou
sekci vymazat**.>

| Kód          | Popis                                | Kdy nastane                                                                         | UX / reakce uživateli                                    | Spouští alt. tok | Zdroj                                                  |
| ------------ | ------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------ |
| `<ERR_CODE>` | <jedna věta — co tento stav znamená> | <konkrétní business podmínka — odkaz na krok hlavního flow nebo Alt-N, kde nastane> | <co uvidí / dostane uživatel — modal, banner, e-mail, …> | `Alt-N` \| `—`   | `<path/to/error-definition:LL>` / `<spec-doc>#errors>` |

**Zdroj (celé sekce):**

- Katalog kódů: `<path/to/error-enum-or-catalog:LL>` /
  `<spec-doc>#error-codes`
- Centrální seznam napříč scénáři:
  [technical/007-integrations/004-error-codes.md](../../technical/007-integrations/004-error-codes.md)

> Stejný `<ERR_CODE>` může v různých scénářích nastat za různých
> business podmínek — to je v pořádku. Tato tabulka je **uživatelská
> (high-level) rovina** chybových stavů: co stav znamená a co uvidí
> uživatel. **Detailní technická logika** (HTTP kódy, přesné příčiny
> typu „400, protože chyběl atribut X") žije jinde a je odsud
> viditelně odkázaná: na stránce návrhu chyb aktivního změnového
> požadavku, pokud ten implementaci vlastní, jinak v centrálním
> technickém katalogu. Pokud vlastník neexistuje, uveďte TODO místo
> nefunkčního odkazu.

## Stav před a po scénáři

<Uživatelský pohled na vstup a výstup scénáře — NE datové atributy.
Popisuje, co platí PŘED spuštěním scénáře a co se ZMĚNILO / čeho
bylo dosaženo PO jeho úspěšném dokončení. Rozšiřuje řádky „Vstupní /
Výstupní podmínky" z Info bloku o čitelný detail.>

### Stav před scénářem

- <co platí před spuštěním — např. „Uživatel má aktivní účet a je
  odhlášený", „V systému existuje neuhrazená pohledávka">
- <jaké informace uživatel do scénáře přináší — business pojmy,
  žádné typy, validace ani DB sloupce>

### Stav po scénáři

- <co se změnilo — např. „Uživatel je přihlášený a vidí svůj
  přehled", „Pohledávka je označena jako uhrazená">
- <čeho bylo dosaženo z pohledu uživatele / businessu>

> **Detail na úrovni atributů** (mapování vstupních dat přes API a
> UI až na DB atributy, typy, validace) NEPATŘÍ sem — vlastní ho
> technický návrh: stránka mapování dat aktivního změnového požadavku,
> pokud ten implementaci vlastní, jinak technický datový model
> (viditelný odkaz níže v Odkazy).

## Návaznosti scénářů

<Obě směry návaznosti. Pokud scénář nemá ani spouštěcí, ani
navazující scénář, celou sekci vymazat.>

### Spouštěcí scénáře

<Které scénáře (nebo externí podněty) tento scénář spouštějí.
Pokud scénář spouští výhradně uživatel přímo, napište to jednou
větou.>

- [`SC-NN <název>`](./sc-NN-<slug>.md) — <za jaké podmínky tento
  scénář spouští>

### Navazující scénáře

<Sekce existuje **jen** tehdy, když tento scénář spouští jiný
**scénář** (např.: „Po úspěšném přihlášení se spustí scénář
`SC-02 Obnova session`."). Uveďte mechanismus spuštění (vyemitovaná
událost, přímé volání).>

- `<trigger>`: `<path/to/emitter:LL>` / `<spec#trigger>` →
  [`SC-NN <název>`](./sc-NN-<slug>.md)

> Vedlejší efekty, které **nejsou** samostatné scénáře (např.
> zápis do logu, emitovaná metrika, jednoduchá DB operace),
> patří do **Popis business logiky**, ne sem. Návaznosti mluví
> výhradně o scénářích.

## Popis business logiky

<High-level prose popis business logiky scénáře. Zahrnuje validace,
větvení, business výjimky, chování při systémové chybě, a vedlejší
efekty (notifikace, reporty, log zápisy) specifické pro tento
scénář.>

- **Validace**:
  - `<rule>` — `<path/to/validator:LL>` / `<spec#validation>`
- **Chování při systémové chybě**: <popis, zdroj — **technické**
  výpadky bez známého business kódu: timeout, 500 z 3rd-party,
  DB nedostupná, deadlock. Generická fallback reakce, retry,
  graceful degradation. Business chybové stavy s definovaným kódem
  patří do sekce [Chybové stavy](#chybové-stavy) výše>
- **Notifikace odesílané tímto scénářem** (pouze pokud existují;
  jinak bullet odebrat):
  - `<channel>` (email / push / SMS / in-app) — šablona
    `<template>` → příjemce `<role>`. Zdroj:
    `<path/to/sender:LL>` / `<spec#notification>`.
- **Reporty generované tímto scénářem** (pouze pokud existují;
  jinak bullet odebrat):
  - `<report-name>` — příjemce `<role>`, frekvence
    `<on-demand / daily / …>`. Zdroj: `<path/to/generator:LL>` /
    `<spec#report>`.
- **Napojení na externí systémy** (pouze pokud scénář využívá
  externí rozhraní; jinak bullet odebrat):
  - `<external-system>` — <jednou větou ŽE napojení existuje a PROČ
    (co scénáři poskytuje / kam předává výsledek)>. Technický detail
    rozhraní (endpointy, kontrakty, limity): stránka externích integrací
    aktivního změnového požadavku, pokud ten implementaci vlastní, jinak
    existující stránka v technické sekci.
    NIKDY zde nepopisovat kontrakt — jen zmínka + proč + odkaz.

> Notifikace a reporty **sdílené napříč více scénáři** (např.
> generický audit log entry, který vzniká po každém zápisu)
> nepatří sem — vstupují jako řádek do
> [001-zakladni-prehled/006-business-rules.md](../001-zakladni-prehled/006-business-rules.md).
> Zde uvádějte jen ty, které jsou specifické pro tento konkrétní
> scénář.

<!-- diagram-anchor: business-logic-sc-NN -->

> Flowchart / activity diagram je v této kotvě **volitelný** a
> doplňuje sequence diagram výše. Použijte ho jen když platí
> alespoň jedno z:
>
> a) Scénář obsahuje **složitější business logiku** s mnoha
> větvícími podmínkami (více `if` / `switch` v handleru,
> několik alternativních flow podle vstupu / role / stavu) —
> rozhodovací strom je čitelnější než inline popis v sequence
> diagramu.
> b) **Sequence diagram je příliš velký a složitý** (mnoho účastníků,
> desítky kroků) a flowchart by tento proces zabstraktnil do
> jednoduchého přehledu „odkud kam".
>
> Pokud ani jedno neplatí, kotvu vymažte — `docs-diagrams` flowchart
> negeneruje, pokud kotva neexistuje. Sequence diagram výše stačí
> pro běžný scénář.

## Feature toggle

<Pokud feature toggle ovlivňuje scénář. Jinak sekci vymazat. Pokud
v discovery nebo schváleném návrhu není rollout mechanismus rozhodnut,
uveďte rozhodovací TODO pouze tehdy, když je pro scénář relevantní.>

- `<toggle-name>` — zdroj: `<path/to/toggle-usage:LL>` /
  `<spec#toggle>`,
  detail v [technical/017-feature-toggles.md](../../technical/017-feature-toggles.md).
- Chování při `ON`: <popis>
- Chování při `OFF`: <popis>

## Metriky

<Pokud scénář emituje metriky nebo má dohodnuté KPI. Jinak sekci
vymazat. Chybějící metrika je TODO jen tehdy, když je měření součástí
deklarovaného cíle nebo akceptačních podmínek.>

- `<metric-name>` — zdroj: `<path/to/metric-emission:LL>` /
  `<spec#kpi>`,
  popis a dashboard v
  [technical/015-monitoring-logging.md](../../technical/015-monitoring-logging.md).

## Odkazy

- Předchozí scénář: [scenarios/sc-NN-<slug>.md](./sc-NN-<slug>.md)
- Následující scénář: [scenarios/sc-NN-<slug>.md](./sc-NN-<slug>.md)
- Seznam všech scénářů:
  [001-zakladni-prehled/007-scenarios-list.md](../001-zakladni-prehled/007-scenarios-list.md)
- Aktéři a persóny:
  [001-zakladni-prehled/004-actors-personas.md](../001-zakladni-prehled/004-actors-personas.md)
- Nadřazený proces (jen když je pohled `process` zapnutý a cíl existuje):
  [PROC-NN <název>](../<process-group>/proc-NN-<slug>.md)
- Použité obrazovky (jen když je pohled `ui` zapnutý a cíle existují):
  [UI-NN <název obrazovky>](../<ui-group>/ui-NN-<slug>.md)
- Technický detail v aktivním změnovém požadavku (jen když tento
  balíček implementaci vlastní; doplněno recipročním odkazem):
  [ZR-NNN <název>](../../zmenove-pozadavky/NNN-<slug>/)
- Technický detail (jen když technická sekce a konkrétní cílová stránka
  existují): [technical/…](../../technical/)
```

## Notes — content rules per section

- **Readability & sources** — follow
  [`evidence-rules.md`](../evidence-rules.md) and the universal
  [`docs-base` evidence hierarchy](../../../docs-base/references/evidence.md).
  In this scenario template specifically: comment out every `**Zdroj:**`
  block and every code symbol with a timestamp
  (`<!-- Zdroj: Service.method (comment <currentDate>) -->`), keep domain
  identifiers (state codes, table / column names, protocol fields) VISIBLE
  with a type label, and put the concrete endpoint on the sequence-diagram
  arrow (not in a trailing prose block). Pull technical-doc links out of
  the commented `Zdroj:` as a visible `Technicky:` pointer. Hlavní flow
  stays a short high-level overview; parameter detail lives in the diagram
  and in the linked canonical mapping owner: the active change-request
  design or the technical data model.
- **Info blok**: required on every scenario. SC-ID is stable;
  changing it later breaks every cross-link to the scenario.
- **Realizační stav**: pure Markdown, one of exactly four values —
  `🟩 Nová funkcionalita`, `🟥 Odstraněná funkcionalita`,
  `🟧 Upravovaná funkcionalita`, `🟦 Existující - beze změny`.
  It replaced the old page-level `NEW` / `CHANGED` / `DEPRECATED`
  badges; NIKDY emit those, and NIKDY use HTML for the state. A scenario
  marked `🟦 Existující - beze změny`
  carries **no** "Současné a cílové chování" subsection.
- **Inline change markers must appear at BOTH levels.** When a
  scenario is `🟧 Upravovaná funkcionalita`, marking the change only
  in the summary AS-IS / TO-BE table is **not enough** — this has been
  missed repeatedly. VŽDY also place the marker on the smallest
  concrete changed fragment in the body: the affected step of Hlavní
  flow, the affected Alt-N flow, the affected business rule, or the
  affected result. Shape (pure Markdown; see the temporary-operation rules in
  [`docs-base`](../../../docs-base/references/operations.md)):

  ```markdown
  🟩 [{ADD zr-002}](existing-change-request-url) doplněné chování
  🟥 [{DEL zr-003}](existing-change-request-url) ~~rušené chování~~
  ```

  Before finishing a modified scenario, re-read it and confirm every
  change listed in the table is also traceable in the body.

- **QA pokrytí** (per alternative flow): VŽDY link **directly to the
  stable anchor** of the concrete test case (e.g. `TC-SC-03-ALT-01`),
  never a generic link to the test page. Omit the row only while no
  test exists; when `docs-tests` later creates one, the reciprocal
  link MUST be added back here.
- **Wireframe**: anchor only — never inline SVG. `docs-wireframes`
  attaches the wireframe later. If the run does not include wireframe
  generation, leave the anchor — a later run picks it up.
- **Hlavní flow**: numbered steps in present-tense, in the user's
  voice. Each step is one sentence. **Sunny case only** — single
  linear path, no `if` / branching. Every rainy path belongs to
  **Alternativní toky**, every business-error case belongs to
  **Chybové stavy**. If a Hlavní flow step contains a branching
  decision, the reviewer flags it — extract the branch into an
  Alt-N flow.
- **Alternativní toky**: optional. Zero or more numbered sub-sections
  `### Alt-1`, `### Alt-2`, … Each describes one rainy-path flow
  (invalid input rejected, user cancels mid-flow, system finds
  duplicate, business rule blocks). Each Alt-N has its own Info
  table (spouštěcí podmínka, odbočka, koncový stav) + numbered
  steps. **NEVER** include technical failures (network, DB,
  3rd-party 500) — those stay in "Popis business logiky → Chování
  při systémové chybě". If no alternative flow exists, remove the
  whole section. When ≥ 3 alt flows exist, keep the
  `business-logic-sc-NN` flowchart anchor so `docs-diagrams` can
  render all branches in one picture.
- **Chybové stavy**: optional. One table per scenario listing the
  **business** error codes the scenario can return — codes known at
  design time, with a defined UX reaction. **NEVER** list technical
  errors here (timeout / 500 / DB down). The "Spouští alt. tok"
  column cross-links a code to the Alt-N flow that emits it, so
  the reader can trace a flow to its error and back. The central
  cross-scenario catalog still lives in
  `technical/007-integrations/004-error-codes.md` — this section
  describes only the **per-scenario** projection. Remove the
  section when the scenario throws no business errors.
- **Stav před a po scénáři**: user-perspective I/O — what holds
  before the scenario and what changed / was achieved after it.
  Business vocabulary only: NIKDY types, validations, DB columns,
  or API attribute names here. Attribute-level mapping (input data → API →
  UI → DB) is owned by the active change-request mapping design when that
  package owns the implementation, otherwise by the technical data model —
  visible link, never restated.
- **Návaznosti scénářů**: both directions. **Spouštěcí scénáře** —
  which scenarios (or a direct user action) start this one;
  **Navazující scénáře** — only real follow-up scenarios (side
  effects that are not scenarios — log writes, metrics, simple DB
  updates — belong to **Popis business logiky**). Remove sub-parts
  (or the whole section) with no content — no empty headings.
- **Popis business logiky**: prose-then-bullets pattern. The prose
  gives the high-level rule; the bullets cite each validator,
  system-error fallback, scenario-specific notification, and
  scenario-specific report. **Business error codes no longer live
  here** — they moved to the dedicated "Chybové stavy" table above.
  The bullets that remain are how the reader navigates to 3.x for
  detail.
- **Feature toggle**: optional. Remove the section if no toggle
  applies. In discovery, do not invent a toggle; record a decision only when
  rollout control is part of the requested scope.
- **Metriky**: optional. Remove the section if the scenario does not
  emit metrics and no KPI is agreed. Use `⚠️ TODO: decision needed — KPI
měření tohoto scénáře` only when measurement is required by scope.
- **Odkazy**: at minimum, link to `scenarios-list.md`. Other links
  appear when the scenario has neighbours, API references, a containing
  process, used screens, or upstream/downstream scenarios. Process and UI
  links are required only when those views are enabled and the targets exist.

## Anchors emitted by this template

- `<!-- wireframe-anchor: sc-NN -->` — for the screen visual.
  Required when the scenario has any UI surface; remove only for
  pure backend scenarios.
- `<!-- diagram-anchor: flow-sc-NN -->` — for the **sequence
  diagram** of the main flow. **Required on every scenario** —
  the sequence diagram is the spine of the scenario page; it
  shows who talks to whom and in what order.
- `<!-- diagram-anchor: business-logic-sc-NN -->` — for a
  **flowchart / activity diagram**. **Optional** — include when
  (a) the business logic has many branching conditions that would
  clutter the sequence diagram, (b) the sequence diagram becomes
  too large and the flowchart abstracts it into a simpler "from
  where to where" overview, or (c) the scenario has **≥ 3
  Alternativní toky** — the flowchart is the natural place to draw
  the sunny flow + every rainy branch + the Chybové stavy endpoints
  in one picture (use the established diagram convention: greenish
  decisions, yellowish activities, red error endpoints). If none
  applies, remove the anchor — `docs-diagrams` does not generate
  a flowchart when the anchor is absent.

`docs-diagrams` and `docs-wireframes` read these anchors in later
phases of the same run. Anchors for scenarios that get skipped do
not appear; the anchors report (in run context) tracks the
inserted anchors so later phases know what to attach.
