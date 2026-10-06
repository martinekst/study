---
name: docs-technical
description: Create or update the technical section inside an analytical portal, preserving the established ANA architecture, application, infrastructure, operations, audit, and implementation-test menu with lifecycle-appropriate evidence and depth.
metadata:
  author: "Dávid Šilon"
---

# ANA technical documentation

Describe how the system is built, integrated, secured, deployed, observed, and
operated. Keep implementation detail here; link to business intent, observable
behavior, change design, and test design instead of duplicating them.

## Resolve scope first

1. Read `docs/README.md` and resolve it through
   [`docs-base`](../docs-base/SKILL.md), including direct invocations.
2. Continue only when `documentation.sections` contains `technical`, unless the
   user requests a bounded technical artifact that does not change the portal
   structure.
3. Inspect the active version's technical tree, indexes, stable application
   codes, and inbound links. The filesystem is the exact menu.
4. Treat evidence locations, requested scope, and the current operation as run
   context. Do not persist them in the README contract.

An existing coherent technical tree takes precedence over the catalogue. For a
new tree or missing coverage, preserve the established ANA model in
[`structure.md`](references/structure.md). Folder and file prefixes determine
navigation order; page frontmatter does not duplicate it.

## Load only the resources needed

- Before planning new or missing pages, read
  [`structure.md`](references/structure.md) and
  [`evidence-and-scan.md`](references/evidence-and-scan.md).
- For system-level or application architecture, read
  [`architecture.md`](references/architecture.md).
- For backend, frontend, or mobile application groups, read
  [`per-application.md`](references/per-application.md).
- For a dedicated API page, read [`api.md`](references/api.md).
- For an ordinary page, use [`page-pattern.md`](references/page-pattern.md).
- Load only the template for the artifact being created:
  [`index-section.md`](references/templates/index-section.md) for the technical
  section index, [`index-group.md`](references/templates/index-group.md) for a
  group marker, [`index-application.md`](references/templates/index-application.md)
  for an application index, [`adr.md`](references/templates/adr.md) for a
  decision, or
  [`tests-overview.md`](references/templates/tests-overview.md) for
  `011-testy/index.md`.
- Apply [`review-criteria.md`](references/review-criteria.md) to the completed
  scope before handoff.

## Workflow

1. Build a coverage plan from the existing tree and inspected evidence. Mark
   each candidate as update, create, preserve, or omit with a reason.
2. Preserve assigned application codes such as `S1`, `FE1`, and `MA1`. New
   codes and structural insertions are durable navigation decisions; preview
   their paths and link impact before writing.
3. If the work adds, removes, moves, or renumbers established groups, route it
   through the controlled migration workflow. Ordinary content updates do not
   require page-by-page confirmation.
4. Write top-down: system map and canonical runtime flow, system overview,
   guides, per-application detail, infrastructure, observability, integrations,
   audit/decisions, then the implementation-test overview.
5. Generate or refresh indexes after final target paths are known. Include only
   links that resolve; use a plain-text open point when a target is planned but
   absent.
6. Keep overview pages concise and extract independently useful detail to a
   sibling page. Add a diagram anchor only when a diagram materially improves
   understanding.
7. Report changed pages, preserved gaps, evidence conflicts, and any proposed
   structural migration.

## Lifecycle effect

| Stage                  | Technical content must make clear                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `discovery`            | Feasible options, constraints, assumptions, and decisions still needed; no proposal is presented as implemented.        |
| `implementation-ready` | Agreed target architecture, interfaces, data, security, operations, and acceptance-relevant constraints are buildable.  |
| `as-built`             | Claims match inspected code/configuration; deployed/current behavior is separated from future or unverified intentions. |

## Boundaries

- This skill owns the technical section of an ANA portal. A standalone
  service-local technical portal uses its separate toolchain.
- `011-testy/` is the implementation map for test tooling, suites, CI, and
  per-application test pages. The declared `tests/` section owns business UAT,
  requirement/scenario traceability, QA cases, mocks, and release evidence.
- Functional pages own actors, permissions as observable behavior, scenarios,
  processes, and screens. Technical pages own enforcement mechanisms,
  interfaces, schemas, internal components, and operational consequences.
- Do not create empty catalogue pages, invent environment values, or claim a
  control, test, deployment, or decision without evidence.
