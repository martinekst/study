# Scenario grouping

How to decide the logical grouping for scenarios when the functional
section has more than a handful of entries. When grouping is needed,
scenarios live in **podskupiny** (sub-group folders) inside the single
`Scénáře` group — adding a 4th menu level under the project-wide
controlled structural-change rule. The grouping affects:

- the **folder structure** under `functional/002-scenarios/` — each group
  is its own L3 **podskupina** folder (e.g. `001-klient/`, `002-agent/`),
  each with a mandatory `index.md`; scenario files sit at L4,
- `module:` (or axis) frontmatter on each scenario file (stable slug
  identifier, matches the podskupina folder suffix),
- the use-case diagram anchors
  (`<!-- diagram-anchor: use-case-<group-name> -->`),
- `007-scenarios-list.md` in `001-zakladni-prehled/` — master
  cross-reference listing all scenarios across podskupiny (not primary
  navigation, which is now the menu itself).

**Splitting into podskupiny changes the reader-visible tree. Preview it and
obtain explicit approval through `docs-workflow` before creating folders.** Below the
threshold (see the decision flow), keep scenarios **flat** directly in
`002-scenarios/` (3 levels) — that is the default.

## Why grouping matters

When all scenarios appear as a single flat list under the "Scénáře" menu
item, the reader cannot navigate 15+ entries. With per-group **podskupiny**
the menu itself becomes the primary navigation — the single `Scénáře`
group expands into named, collapsible podskupiny (`Klient`,
`Agent`, …) and the use-case diagram can be split per podskupina
instead of one giant unreadable diagram.

The grouping is expressed in **both** the folder structure (one L3
podskupina folder per group) **and** the `module:` frontmatter on each
scenario file. The `module:` value equals the podskupina folder suffix
slug — they must match.

**VŽDY confirm the grouping with the user before any scenario file or
folder is created** — and because the podskupiny add a 4th menu level, the
decision to sub-group at all is itself user-confirmed through the controlled
structural-change flow. The
grouping determines the menu structure the customer sees; getting it wrong
is cheap to revert before generation, expensive after (every folder,
scenario file, and cross-link would need renaming).

## Three grouping options

The right grouping depends on scenario count, evidence-side
structure, and customer reading habits. Pick one of the three
options below in Step 1, present it to the user, and wait for
confirmation.

### Option A — Basic (audience-based)

Default for **small to medium** scenario counts (typically up to
~10–15 scenarios), single-module systems, and most
discovery and offer work. Three buckets by **who triggers the
scenario**:

- **Scénáře pro uživatele** — anything the end user initiates
  (login, search, place order, read report).
- **Scénáře pro admina** — anything the back-office / operator
  initiates (manage stations, approve content, change pricing).
- **Systémové scénáře** — anything the system itself triggers
  (token renewal, scheduled job, retry, event consumer).

The frontmatter value is the same as the bucket name in lower-case
ASCII slug:

```yaml
module: uzivatel # or admin, system
```

When to pick A:

- One coherent codebase / spec without an obvious module split.
- Mixed audience but no need to distinguish further than role
  family.
- Discovery and offer work that prioritise customer readability over
  internal taxonomy.

### Option B — By module (bounded context)

Default for **larger** scenario counts (typically 15+) where the
source surfaces a clean module split.

**Signals for module split**:

- **Implementation evidence:** distinct bounded-context folders
  (`src/auth/`, `src/billing/`, `src/notifications/`), packages, route
  prefixes, or schemas.
- **Specification/discovery evidence:** stable module or feature-area headings
  and interview language that consistently groups the same scenarios.
- **Existing documentation:** an established scenario catalogue already groups
  by module; preserve its labels unless an approved migration changes them.

**Module name conventions**:

- Lower-case ASCII, kebab-case if multi-word
  (`order-fulfillment`, not `OrderFulfillment` or
  `order_fulfillment`).
- When implementation evidence is authoritative, match its stable module
  identifier even if the Czech heading on `007-scenarios-list.md` uses a
  reader-facing label. The `module:` field is for grouping and
  traceability, not display or menu ordering.
- Stable across versions — renaming a module is expensive (every
  scenario's frontmatter changes), so commit to the name when
  first chosen.

### Option C — By axis (fallback)

Use when neither audience (A) nor module (B) gives balanced
groups. Common axes:

| Axis pair                | When it helps                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `read` vs `write`        | the surface is heavy on reads (search, list, filter) vs writes (create, update, delete) |
| `internal` vs `external` | the system has user-facing flows and partner-facing flows that look different           |
| `flow` vs `maintenance`  | the system has main customer journeys plus a long tail of housekeeping                  |
| `synchronous` vs `async` | the system mixes interactive UI with background processing scenarios                    |

The axis value stays in `module:` frontmatter
(`module: read`, `module: write`).

C is rarely picked from the start — usually it surfaces when A or
B produces unbalanced groups (one group with 25 scenarios, others
with 1 each). When that happens, propose switching to an axis
that re-balances.

## Decision flow

```
                  ┌─────────────────────────────────────┐
                  │ Are there ≥ 8 scenarios planned?    │
                  └──────────────┬──────────────────────┘
                                 │
                  no ┌───────────┴───────────┐ yes
                     ▼                       ▼
        ┌───────────────────┐   ┌──────────────────────────────┐
        │ No grouping yet.   │   │ Does the codebase / spec have │
        │ Single flat list,  │   │ a clear module / context     │
        │ `module: core`     │   │ split (Option B signals)?    │
        │ as default.        │   └──────────┬───────────────────┘
        │ Confirm with user. │              │
        └───────────────────┘     yes ┌────┴────┐ no
                                       ▼         ▼
                             ┌────────────┐  ┌──────────────────────┐
                             │ Option B —  │  │ Is audience the      │
                             │ by module. │  │ clearest split        │
                             │            │  │ (Option A signals)?  │
                             │            │  └──────────┬───────────┘
                             │            │             │
                             │            │     yes ┌──┴──┐ no
                             │            │          ▼     ▼
                             │            │  ┌──────────┐ ┌──────────┐
                             │            │  │ Option A │ │ Option C │
                             │            │  │ basic    │ │ axis     │
                             │            │  │ (user/   │ │ (read/   │
                             │            │  │ admin/   │ │ write,   │
                             │            │  │ system). │ │ internal/│
                             │            │  │          │ │ external,│
                             │            │  │ Confirm. │ │ …)       │
                             │            │  └──────────┘ │ Confirm. │
                             │            │               └──────────┘
                             │            ↓
                             │  Confirm chosen grouping with the user.
                             └────────────┘
```

The threshold of **8 scenarios** is heuristic — when in doubt,
ask the user. Below it, grouping adds overhead without payoff;
above it, the list becomes unreadable without grouping.

**Every path in the flow ends in "Confirm with the user"** —
grouping is never silent.

## Folder output

Once the grouping is confirmed, create one L3 **podskupina** folder per
group inside the single `002-scenarios/` group (the `Scénáře` group
folder name does not change). Podskupina prefix numbering starts at `001-`,
local to the `002-scenarios/` folder.

```
functional/
  001-zakladni-prehled/
    index.md              ← title: "Základní přehled"
    …
  002-scenarios/          ← L2 group "Scénáře"
    index.md              ← title: "Scénáře"
    001-klient/           ← L3 podskupina — Option A example: audience "Klient"
      index.md            ← title: "Klient"
      sc-01-prihlaseni.md ← L4 page, title "Přihlášení uživatele"
      sc-04-objednavka.md ← L4 page, title "Objednávka"
    002-agent/            ← L3 podskupina
      index.md            ← title: "Agent"
      sc-07-…md
    003-admin/            ← L3 podskupina
      index.md            ← title: "Administrátor"
      sc-10-…md
```

Depth: `functional/` → `002-scenarios/` → `001-klient/` → `sc-01.md` = 4
levels. Because this changes the visible tree, preview and approve the split
before migration. Below the threshold, scenarios stay flat at 3 levels
(`002-scenarios/sc-01-prihlaseni.md`).

**Folder naming rules:**

- Podskupina slug = the audience / module / axis name in kebab-case ASCII
  (`001-klient/`, `002-agent/`). No `scenare-` prefix — the folders already
  sit inside `002-scenarios/`, so the context is clear.
- `module:` frontmatter value on each scenario file = the podskupina slug
  without the numeric prefix (e.g. `module: klient`).

For Option B (module-based), the podskupina suffix is the module name:
`001-auth/`, `002-billing/`. For Option C (axis): `001-read/`, `002-write/`.

## What goes in `007-scenarios-list.md`

`007-scenarios-list.md` lives in `001-zakladni-prehled/` and serves
as a **master cross-reference** — a single flat or lightly grouped
table of all scenarios across every podskupina. Its purpose is search
and filtering (e.g. "show me all SC-IDs for `admin`"), not primary
navigation (which is now the menu).

The use-case diagram anchor lives in each podskupina's `index.md` (one
per podskupina), plus an optional global anchor at the top of
`007-scenarios-list.md` for an all-actors overview.

```markdown
<!-- generated: <currentDate> | source: <inspected evidence reference> -->

<!-- diagram-anchor: use-case-all -->

> Globální use-case přehled. U více než 3 skupin tento anchor
> odeberte — per-skupinové anchory v indexech skupin stačí.

## Všechny scénáře

| SC-ID | Scénář               | Podskupina    | Aktéři   | Spustí               |
| ----- | -------------------- | ------------- | -------- | -------------------- |
| SC-01 | Přihlášení uživatele | Klient        | `klient` | SC-02 Obnova session |
| SC-02 | Obnova session       | Klient        | `system` | —                    |
| SC-04 | Schválení obsahu     | Administrátor | `admin`  | —                    |
| SC-07 | Správa cen           | Administrátor | `admin`  | —                    |
```

The global `use-case-all` anchor is optional — drop it when the
system has more than ~3 podskupiny, since the merged diagram becomes
unreadable.

## Per-group perspective (no cross-group re-telling)

Independent of which grouping option is chosen (A audience, B module, C
axis), the same content rule applies once scenarios are split into
podskupiny: a scenario is written from **its own podskupina's
perspective only**.

- Describe the flow, business logic, and detail that belongs to THIS
  scenario's group. When the flow continues into — or was triggered
  from — another podskupina's territory (a different audience, module,
  or axis bucket), mention that hand-off **briefly** (one sentence /
  bullet — what happens, not how) and **link** to the scenario in the
  other podskupina for the detail.
- Never re-tell another group's flow, business rules, or technical
  detail here — that is a duplicate (see the anti-duplication rule in
  `docs-base` evidence rules). The other podskupina's
  scenario is the single source of truth for its own half.
- This applies regardless of the grouping axis: audience-based (Option
  A — a `klient` scenario briefly mentions and links to the `admin`
  scenario that approves it), module-based (Option B — an `auth`
  scenario links to `billing` for what happens after login triggers a
  trial), or custom axis (Option C — a `write` scenario links to the
  `read` scenario that later surfaces the result).
- The existing "Návaznosti scénářů" template section already
  carries this hand-off link when the trigger is a distinct scenario
  (see `templates/scenario.md`); this rule extends the same
  "link, don't re-tell" discipline to inline mentions inside "Hlavní
  flow" and "Popis business logiky" whenever they touch another
  group's territory.

## Anti-patterns

- **Sub-grouping below the threshold** — splitting a handful of scenarios
  into podskupiny adds a 4th menu level for no payoff. Keep scenarios flat
  in `002-scenarios/` until the flat list is genuinely unnavigable (see the
  decision flow), then confirm the split with the user.
- **A second nesting level inside a podskupina** — making
  `002-scenarios/001-klient/podskupina/`. There is no fixed cap, but a 5th
  level for scenarios is almost never warranted; do not add it without an
  explicit, user-confirmed structural need. Flat scenario files inside
  the podskupina folder is the norm.
- **Mixed grouping** — audience for half the scenarios, module
  for the other half. Pick one across the whole set; if a mixed
  grouping feels natural, the source is telling you to subdivide
  one of the audience podskupiny by module instead — talk to the user.
- **Renaming a podskupina mid-engagement** — every scenario's
  frontmatter changes, every cross-link to "Modul `X`" breaks.
  Lock the names early, after user confirmation.
- **Podskupina of one** — a "module" or "audience" with a single
  scenario. Either merge it into a neighbouring podskupina or accept
  the long tail and use Option A's "Systémové scénáře" as the
  catch-all.
- **Silent grouping** — picking a grouping in Step 1 and starting
  to generate without surfacing the choice. VŽDY confirm — both the
  decision to sub-group and the chosen axis.
