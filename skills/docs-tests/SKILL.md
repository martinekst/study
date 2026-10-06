---
name: docs-tests
description: Create or update the declared ANA test-design section, preserving its strategy, business UAT, scenario-linked technical QA, mocks/fixtures, traceability, and release-evidence model.
metadata:
  author: "Dávid Šilon"
---

# Test documentation

Turn declared behavior, risks, changes, interfaces, and operational constraints
into testable coverage. This skill produces test design and evidence mapping,
not test source code.

## Resolve scope first

1. Read `docs/README.md` and resolve it through
   [`docs-base`](../docs-base/SKILL.md), including direct invocations.
2. Write a portal section only when `documentation.sections` contains `tests`.
   A user may request a bounded test artifact without changing the section
   contract; keep it within an existing owner path or present it in chat.
3. Inspect the active version's functional, change-request, technical, and test
   trees. Reuse stable scenario/requirement/test IDs and existing link patterns.
4. Treat requested scope, source references, environment, and operation as run
   context rather than persistent README settings.

## Load only the resources needed

- For a new or incomplete section, read
  [`structure.md`](references/structure.md).
- For strategy, levels, environments, data, prioritization, and status, read
  [`strategy.md`](references/strategy.md).
- When deriving QA cases from a scenario, process, UI behavior, requirement, or
  change, read [`scenario-to-tests.md`](references/scenario-to-tests.md).
- Load only the matching artifact template:
  [`index.md`](references/templates/index.md) for the section index,
  [`qa-case.md`](references/templates/qa-case.md) for technical QA,
  [`business-uat.md`](references/templates/business-uat.md) for customer
  acceptance, or
  [`mocks-fixtures.md`](references/templates/mocks-fixtures.md) for reusable
  substitutes and datasets.
- Apply [`review-criteria.md`](references/review-criteria.md) to the completed
  scope before handoff.

## Workflow

1. Define the release decision and in-scope source IDs. Inventory risks,
   acceptance behavior, interfaces, permissions, data transitions, failure
   paths, and operational constraints.
2. Preserve the established menu and existing paths. A group addition, removal,
   move, or renumbering is a controlled structural migration.
3. Write or update the risk-based strategy. Select test levels, environments,
   data, substitutes, gates, and evidence appropriate to the system; never name
   a framework merely because it is common for the language.
4. Write customer-readable Business UAT for business acceptance and structured
   technical QA cases for reproducible verification. Keep them separate and
   trace both to canonical source IDs.
5. Add only the mocks and fixtures actually needed by cases. Give reusable
   items stable anchors and link cases directly to the exact item.
6. Add reciprocal coverage links to source artifacts when their format supports
   them. Never create a link to a target that does not yet exist.
7. Generate indexes and coverage summaries last, from the final files. Count
   not-applicable, planned, implemented, executed, passed, failed, and blocked
   states separately.
8. Report source items covered, cases added/changed, unresolved testability or
   evidence gaps, and any structural mismatch.

## Case contract

Every technical QA case has a stable ID and records: criterion, source link,
preconditions/data, exact mock/fixture links or none, executable steps or
verification method, expected observable result, intended level, automation
state, and execution/result state when evidenced. Prefer the structured ANA
case shape over Gherkin so technical observations remain explicit; preserve a
different syntax only when the user or existing portal requires it.

Every in-scope executable scenario needs at least one happy-path verification
or an explicit blocked/not-applicable reason. Cover each material alternative,
business error, validation boundary, permission boundary, interface failure,
and regression risk once; do not duplicate an error case already proved by its
full alternative-flow case.

## Lifecycle effect

| Stage                  | Test documentation must make clear                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `discovery`            | Risks, acceptance questions, feasible approach, missing testability, and decisions still needed.                    |
| `implementation-ready` | Agreed behavior has reproducible expected outcomes, data/environment needs, ownership, and traceable planned cases. |
| `as-built`             | Implemented automation and actual run evidence are distinct; planned or stale coverage is labelled.                 |

## Boundary with technical tests

`technical/011-testy/` maps implemented suites, tooling, CI gates, and
application-level test pages. The declared `tests/` section owns business UAT,
source-to-test traceability, technical QA design, mocks/fixtures, and release
evidence. Link the two; do not merge or duplicate them.
