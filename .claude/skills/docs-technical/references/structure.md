# Established ANA technical menu

Use this catalogue when creating a technical section or filling missing
coverage. An existing coherent filesystem remains authoritative. Preserve its
paths and stable identifiers unless a controlled migration is approved.

The default depth is section → group → page. Backends, frontends, and mobile
applications add one application folder because a flat list becomes
unnavigable. Folder and file prefixes are the sole navigation order; titles are
number-free and page frontmatter has no order field.

## Section and groups

```text
technical/
|-- index.md
|-- 001-highlevel/
|-- 002-technicky-prehled/
|-- 003-navody/
|-- 004-backends/
|-- 005-frontends/
|-- 006-mobilni-aplikace/
|-- 007-infrastruktura/
|-- 008-monitoring-alerting/
|-- 009-integrace-tretich-stran/
|-- 010-audit/
`-- 011-testy/
```

Create a group only when it has useful evidenced content. Do not renumber later
groups to close an intentional gap. Preserve a pre-existing `012-design/`
group, but do not create one automatically: new design placement belongs to
`docs-design` and any menu change requires an approved structural migration.

## `001-highlevel/` — Highlevel architektura

| File                            | Purpose                                                        |
| ------------------------------- | -------------------------------------------------------------- |
| `001-highlevel-architektura.md` | Short static map of system boundaries, applications, and links |
| `002-highlevel-runtime.md`      | One canonical cross-application runtime sequence, when known   |

The architecture page is the reader's map, not a detail dump. Omit the runtime
page when no representative end-to-end flow is supported by evidence.

## `002-technicky-prehled/` — Technický přehled

| File                            | Purpose                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| `001-technologicky-stack.md`    | Runtimes, frameworks, stores, messaging, and versions      |
| `002-highlevel-sluzby.md`       | Application inventory, responsibilities, owners, links     |
| `003-highlevel-treti-strany.md` | Material external dependencies and purpose                 |
| `004-technologicka-vize.md`     | Agreed target direction, constraints, and unresolved calls |
| `005-highlevel-aa.md`           | System-level authentication and authorization boundaries   |
| `006-async-komunikace.md`       | Events, queues, delivery, retry, and idempotency           |
| `007-domenovy-datovy-model.md`  | Technical projection of the canonical domain model         |

Keep compatibility with an existing synonymous filename such as
`003-treti-strany.md`, `004-technicka-vize-nfr.md`, or
`005-autentizace-autorizace.md`; naming cleanup alone does not justify a move.
The domain projection must use the same entities and relationships as the
functional projection, adding only technical attributes and ownership detail.

## `003-navody/` — Návody

| File                         | Purpose                                      |
| ---------------------------- | -------------------------------------------- |
| `001-lokalni-prostredi.md`   | Local prerequisites, setup, start, verify    |
| `002-testovaci-prostredi.md` | Test environment, data, dependencies, verify |
| `003-troubleshooting.md`     | Symptom → diagnosis → recovery               |
| `004-onboarding.md`          | First-day path and repository orientation    |

Record concrete invocations and expected results only when verified. Never put
secrets or production credentials in these pages.

## Application groups

Applications use stable reader-facing codes in folder names and titles:

```text
004-backends/001-S1-<slug>/
005-frontends/001-FE1-<slug>/
006-mobilni-aplikace/001-MA1-<slug>/
```

The numeric prefix controls position. The code (`S1`, `FE1`, `MA1`) remains
stable when an application is renamed. Do not recycle a retired code. Every
application folder has `index.md` and begins with `001-architektura.md`.

### Backends

Use the following catalogue, splitting detail only when it is useful:

| File                           | Topic                                       |
| ------------------------------ | ------------------------------------------- |
| `001-architektura.md`          | Responsibility, components, flows, data     |
| `002-lokalni-prostredi.md`     | Local start and verification                |
| `003-migrace-seedovani.md`     | Schema migration and seed lifecycle         |
| `004-testy.md`                 | Implemented suites, execution, CI, coverage |
| `005-aa.md`                    | Authentication/authorization enforcement    |
| `006-dulezite-knihovny.md`     | Material libraries and constraints          |
| `007-crony.md`                 | Scheduled jobs, ownership, retry, overlap   |
| `008-ochrana-dat.md`           | Sensitive data, retention, deletion         |
| `009-vykon-cache-skalovani.md` | Performance, caching, capacity, scaling     |
| `010-feature-toggles.md`       | Flags, defaults, rollout, retirement        |

A large exposed API may add `008-vystavena-api.md` or another free prefix while
preserving existing files. Use [`api.md`](api.md). Cross-backend conventions may
use `999-sdilene-postupy.md`, which stays last.

### Frontends

| File                           | Topic                                          |
| ------------------------------ | ---------------------------------------------- |
| `001-architektura.md`          | Application boundary, routing, modules, data   |
| `002-lokalni-prostredi.md`     | Local start and verification                   |
| `003-common-komponenty.md`     | Shared components                              |
| `004-komplexni-komponenty.md`  | Complex domain components                      |
| `005-api-klient.md`            | Client generation or request-layer conventions |
| `006-lokalizace.md`            | Locale sources, fallback, formatting           |
| `007-testy.md`                 | Implemented unit/component/end-to-end suites   |
| `008-dulezite-knihovny.md`     | Material libraries and constraints             |
| `009-state-management.md`      | State ownership, persistence, invalidation     |
| `010-pristupnost.md`           | Implemented accessibility conventions/tests    |
| `011-vykon-cache-skalovani.md` | Runtime performance, cache, delivery scaling   |
| `012-feature-toggles.md`       | Flags, defaults, rollout, retirement           |

### Mobile applications

Use the frontend catalogue and insert `010-knihovny-os.md` for platform-specific
dependencies; accessibility, performance/cache, and feature toggles then use
prefixes `011`, `012`, and `013`. Omit platform comparison when the application
supports only one operating system.

Existing portals may consolidate adjacent topics into fewer pages. Preserve
that choice when ownership and navigation remain clear; the catalogue defines
coverage, not a page-count target.

## `007-infrastruktura/` — Infrastruktura

Typical pages cover hosting/topology, environments and instances, CI/CD and
secret handling, infrastructure as code, DNS/certificates, infrastructure cost,
and deployment/rollback. Keep an existing combined layout. Include cost only
when the source provides infrastructure consumption or provider pricing; it is
not commercial offer pricing.

## `008-monitoring-alerting/` — Monitoring a Alerting

Cover logs/traces, metrics/SLOs, health checks, and alerting/incident routing.
Name real signals, thresholds, owners, and destinations when known. Separate an
implemented alert from a proposed one.

## `009-integrace-tretich-stran/` — Integrace třetích stran

Create one page per cross-application external integration. A dependency used
by only one application normally stays in that application's architecture or
library/API page. Cover ownership, contracts, authentication, limits, failure
behavior, observability, test substitute, and change/version risk.

## `010-audit/` — Audit

The established group covers technical debt, a flat
`002-decision-log/` of stable-ID ADR files, license/dependency review, security
or privacy findings, vulnerabilities/incidents, and library updates when those
topics have evidence. Keep superseded ADRs and link their successors; never
reuse an ADR identifier.

## `011-testy/` — Testy (přehled)

This group is the implementation-level test map. Its `index.md` may carry body
content: test levels, real frameworks, CI gates, and links to each backend,
frontend, and mobile test page. It does not own requirement/scenario-derived
test design; link that material to the declared `tests/` section.

## Omission and extension rules

- Omit a page when no evidence or meaningful planned decision exists. Record a
  material missing control or required decision as an open point instead of
  fabricating content.
- A discovery or implementation-ready portal may have fewer operational pages;
  lifecycle changes certainty and expected depth, not the menu semantics.
- Prefer adding an evidenced page inside an existing group to inventing a new
  group. Any structural addition, move, or renumbering is previewed through the
  migration workflow.
- Use ASCII slugs and Czech reader-facing titles. Titles contain no structural
  number; application titles retain their stable code, for example
  `"[S1] Platební brána"`.
