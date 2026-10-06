# Scan checklist — functional section

What to look for, per page, across the available evidence. This is the Step 1 detection
guide — its goal is to leave the planning table with concrete source
citations for every page that will be generated, and a confident
`skip — no evidence` for the rest.

The checklist is organised by **page**, with evidence-specific signals
called out where they differ. The universal columns (Czech name,
proposal number, target folder) come from `proposed-structure.md`.

## Sources to walk

Use the source references supplied for the current run. Their authority is
resolved through `docs-base`; it is not stored as portal state in README.

| Evidence available         | Primary scan target                                                                        | Useful cross-check                                                |
| -------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Implementation             | Controllers, services, schemas, routes, configuration, UI components and repository README | Existing technical pages, tests and runtime configuration         |
| Specification or discovery | Agreed specification sections, decision records and interview notes                        | Wireframes, design and prototype assets                           |
| Existing documentation     | Current functional pages, IDs, paths and inbound links                                     | The newer implementation or specification supplied for comparison |
| Design or prototype        | Screens, navigation, labels and visible states                                             | The behavioral source; a mockup alone does not prove behavior     |

## Per-page detection

All pages below live in `001-zakladni-prehled/` unless they are
scenario detail pages (2.2.N — under the `002-scenarios/` group: flat
files when small, or inside podskupiny `002-scenarios/<NNN-slug>/` when
sub-grouped — see `scenario-grouping.md`).

### 2.1.1 Shrnutí

Aim to fill the **fixed structure** in `templates/overview.md`: TIP
block (3 quick links), Přehled (2 paragraphs + Přidaná hodnota
subsection), Hlavní fakta table (5–8 rows), Hlavní funkce systému
(3–7 bullets), Typický scénář použití (1 paragraph blockquote).

- **Implementation evidence:** README, top-level `package.json`/`Cargo.toml`/etc., entry-point controllers and application module structure.
- **Specification or discovery evidence:** executive summary and vision; pull "Přidaná hodnota pro uživatele" from its canonical business page when that section exists rather than paraphrasing it.
- **Existing documentation:** use the current overview as the structural anchor. Preserve supported facts and add or correct only what the requested evidence and scope justify.

### 2.1.2 Struktura produktu

Modules / bounded contexts / top-level features of the application.

- **Implementation evidence:** top-level folder structure, monorepo packages, module declarations and route groupings.
- **Specification or discovery evidence:** agreed scope, modules and feature areas.
- **Existing documentation comparison:** retain established labels and report modules that the newer authoritative evidence adds, removes or contradicts.

### 2.1.3 Glosář

Domain vocabulary the rest of the docs assume.

- **Implementation evidence:** domain entities (`domain/*`), DDD aggregates, enum types with business meaning and persistent entities.
- **Specification or discovery evidence:** glossary sections and definitions in interview notes when a domain term is introduced.
- Cross-check: technical section's data model and architecture pages.

A term belongs in the glossary when it is referenced from at least two other functional pages — otherwise inline the definition where it appears.

### 2.1.4 Aktéři a persóny (merged)

Two-in-one page with `## Aktéři` (required) and `## Persóny`
(optional, only when evidence exists).

**Pro `## Aktéři` (role / permission table)**:

- **Implementation evidence:** `auth/roles.ts` or equivalent, permission decorators (`@Roles(...)`), guards and role-based middleware.
- **Specification or discovery evidence:** roles, actors or user kinds, plus interview anchors that identify who uses or decides.
- Cross-check: technical `3.x` `roles-matrix.md` if it exists.

**Pro `## Persóny` (user archetypes — goals, pains, behaviour)**:

- **Implementation evidence:** personas are rarely derivable directly; omit the section rather than inferring them.
- **Specification or discovery evidence:** persona research and customer-interview findings.
- Omit the `## Persóny` section entirely when no evidence exists. This is common before customer research and when implementation is the only source.

The merge into one file replaces the earlier two-page split
(`004-actors.md` + `005-personas.md`) — see
`proposed-structure.md` for the rationale.

### 2.1.5 Obrazovky

UI screens the user interacts with.

- **Implementation evidence:** route files, component declarations, screen-level React/Vue/Angular components and screen titles.
- **Specification or discovery evidence:** wireframes, design files, prototype routes and agreed UI sections.
- **Existing documentation comparison:** preserve screen names with valid inbound links and report additions, removals or behavioral conflicts.
- Skip rule: page is `skip — no evidence` when the system has no UI (pure backend / API-only).

### 2.1.6 Business pravidla

**Cross-scenario** rules that govern multiple flows. Rules
specific to a single scenario stay inside the scenario's "Popis
business logiky" section — they belong with the scenario, not on a
shared page.

- **Implementation evidence:** policy classes, validator chains, domain services with business invariants and configuration constants used as business thresholds.
- **Specification or discovery evidence:** agreed business-rule sections, regulatory references and interview notes capturing constraints.
- A rule belongs here (not in a single scenario) when at least two scenarios depend on it.
- Skip rule: page is `skip — no evidence` when every constraint lives inside a single scenario.

Notifications and reports that are **shared** across multiple
scenarios (e.g. a generic "audit log entry" notification that every
write scenario emits) earn a row in `2.1.6 Business pravidla`.
Notifications / reports specific to one scenario live inside that
scenario's **Popis business logiky** section as side-effect bullets
(see `templates/scenario.md`), not here.

### 2.1.7 Seznam scénářů

The master scenario table. Generated **last** in
`001-zakladni-prehled/` because it cites every page above. Anchors
the use-case diagram(s) — one per group per
`scenario-grouping.md`, plus optionally one global anchor.

- **Implementation evidence:** controllers, resolvers and handlers become candidate scenarios. Filter by user-facing relevance; skip internal jobs unless their outcome is visible — see "Systémové scénáře" in `scenario-grouping.md`.
- **Specification or discovery evidence:** agreed scenarios, use cases, user stories and interview-captured workflows.
- Always emit per-group anchors (`use-case-uzivatel`, `use-case-admin`, `use-case-system` for Option A — or module / axis names for B / C); optionally `use-case-all` for small systems with ≤ 3 groups.

### 2.2.N — per-scenario pages (under the `002-scenarios/` group)

For each scenario:

- Stable SC-ID — pick from existing convention when continuing prior work, otherwise assign sequentially.
- `module:` value — `uzivatel` / `admin` / `system` (Option A), a module name (Option B), or an axis label (Option C). Confirmed with the user in Step 1.
- Entry point — cite controller/handler `path:LL` when implementation is authoritative, or the exact specification/decision section when agreed intent is authoritative.
- Coverage check: every scenario in 2.1.7 has its detail page under `002-scenarios/` (walk podskupina sub-folders recursively when sub-grouped), every detail page is listed in 2.1.7.
- **Notifications and reports** the scenario emits: documented inside the scenario's **Popis business logiky** section as side-effect bullets, not on a separate page. Shared notifications / reports (used by many scenarios) earn a row in `2.1.6 Business pravidla`.
- **Scenario links, both directions**: which scenarios trigger this one (**Spouštěcí scénáře**) and which follow it (**Navazující scénáře**) — both inside the scenario's **Návaznosti scénářů** section. If neither exists, the section is omitted (no empty heading).
- **State before / after**: what holds before the scenario and what changed or was achieved after it — business vocabulary for the **Stav před a po scénáři** section. Attribute-level mappings belong to the active change-request design when one owns the implementation package, otherwise to the technical data model; they are not copied into 2.x.

## What NOT to capture here

- **Implementation choices** beyond what is needed to cite — frameworks, libraries, internal class hierarchies. Those belong to 3.x.
- **API request / response schemas** in full — only the link + the field names mentioned in the scenario flow. Full schemas live in 3.x.
- **Wireframes / diagrams inline** — anchors only; the actual content is attached by `docs-diagrams` and `docs-wireframes` in later phases of the same run.
- **Standalone notification / report pages** — those used to be 2.9 and 2.10 in the earlier proposal. Now folded into the emitting scenario (or into 2.1.6 if cross-scenario shared).

If the scan turns up signal that belongs in 3.x (e.g. an
architecture decision implicit in code structure), surface it in the
Step 1 plan as a flag — the user can route it to `docs-technical`
when appropriate.

## Evidence and operation shortcuts

- When implementation and technical documentation both exist, use the
  technical section as a fast lookup for roles, error codes, feature toggles
  and metrics, then confirm behavior-critical claims in implementation or
  configuration.
- When a specification and design/prototype both exist, use the design for
  layout and visible labels. Behavior still comes from the agreed behavioral
  source unless the design decision explicitly supersedes it.
- For a comparison or backfill request, run `docs-delta` first. Keep supported
  pages, fill missing coverage from the supplied evidence and record stale or
  contradictory claims instead of silently rewriting them.
- For a targeted addition, scan only the requested module or feature after
  inventorying the existing overview, IDs, group labels and inbound links.
- Before choosing new group/folder slugs, inspect inbound links from the active
  technical section. Preserve an established slug unless the user approves a
  structural migration that updates every affected link.
