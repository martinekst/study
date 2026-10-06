---
name: docs-functional
description: Create or update ANA functional documentation when the active README contract enables the functional section, selecting scenario, process, and UI guidance from functional_views while keeping shared facts in one canonical place.
metadata:
  author: "Dávid Šilon"
---

# Functional documentation

Describe what people achieve with the system. Keep business behavior readable to stakeholders and link implementation detail to its owning documentation instead of reproducing it.

## Resolve the contract first

1. Read `docs/README.md` and resolve it through [`docs-base`](../docs-base/SKILL.md), even when this skill was invoked directly.
2. Continue only when `documentation.sections` contains `functional`.
3. Read the ordered `documentation.functional_views` list. The first item is the primary navigation view; later items are supporting views.
4. Use source references and requested scope from the current run context. They are evidence for this task, not persistent README settings.
5. Respect the page `status`: `published` permits content generation; `draft` and `review` permit setup or review only; `archived` is inactive.

The supported views are:

| View       | Question it answers                                      | Canonical content                                                                                    |
| ---------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `scenario` | How does one actor achieve one bounded goal?             | Preconditions, sunny path, alternatives, result, business errors and scenario-specific side effects. |
| `process`  | How does an outcome progress from trigger to completion? | End-to-end stages, roles, hand-offs, states, dependencies, exceptions and measurable result.         |
| `ui`       | What can a user see and do on a screen?                  | Screen layout, actions, fields, editability, validation, permissions and visible states.             |

Do not create a fourth “combined” view. Multiple enabled views are combined through links and canonical ownership.

## Load only relevant resources

Always read:

- [`evidence-rules.md`](resources/evidence-rules.md) before writing claims;
- [`proposed-structure.md`](resources/proposed-structure.md) before proposing new paths;
- [`ownership-menu-linking.md`](resources/cross-view/ownership-menu-linking.md) when more than one view is enabled.

Then read only the branch needed for the enabled view:

- `scenario`: [`scenario-grouping.md`](resources/scenario-grouping.md), [`scenario.md`](resources/templates/scenario.md), and [`scenarios-list.md`](resources/templates/scenarios-list.md);
- `process`: [`guide.md`](resources/views/process/guide.md) and [`template.md`](resources/views/process/template.md);
- `ui`: [`guide.md`](resources/views/ui/guide.md) and [`template.md`](resources/views/ui/template.md).

Use the common templates only when the corresponding page is needed: [`overview.md`](resources/templates/overview.md), [`actors-personas.md`](resources/templates/actors-personas.md), and the index templates under [`resources/templates`](resources/templates/).

## Workflow

1. Inspect the active version’s current filesystem, indexes and inbound links before proposing files. The filesystem is the exact menu.
2. Compare the actual structure with the contract. If a view must be added, removed, reordered or renumbered, stop content generation and route the change through the controlled contract migration workflow. Never move or delete content implicitly.
3. Build an evidence inventory using [`scan-checklist.md`](resources/scan-checklist.md). Every planned page needs concrete evidence or a clearly marked unresolved question.
4. Write top-down: outcome and scope first, then the reader’s path, then exceptions and detail.
5. Write shared overview, glossary, actors/personas and cross-cutting business rules once. Write each view’s artifacts in configured order.
6. Generate routing indexes last, after every target path is known.
7. Add reciprocal links required by the ownership guide. Do not add a link to a target that does not exist; leave an actionable TODO instead.
8. Check stable IDs, relative links, empty headings, duplicated facts, missing evidence and view-specific coverage before handing off.

Apply [`review-criteria.md`](resources/review-criteria.md) to the completed scope.

Ordinary content updates do not require page-by-page confirmation. Ask for approval only when the proposed action changes the documentation structure or contract.

## Lifecycle effect

| Stage                  | Functional documentation must make clear                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `discovery`            | What is known, what is proposed, which alternatives remain and which decision is needed. Do not present a proposal as implemented behavior.                   |
| `implementation-ready` | Agreed behavior, acceptance conditions, roles, errors and dependencies are testable. Unresolved decisions that block implementation remain explicit.          |
| `as-built`             | Descriptions match the inspected implementation and configuration. Future intent is visibly separated; exact verification scope belongs in the review report. |

## Boundaries

- Functional pages explain observable behavior; API contracts, schemas, infrastructure and internal algorithms belong to technical documentation.
- Notifications and reports specific to one scenario stay on that scenario. A rule shared by several artifacts has one common owner and is linked from each consumer.
- A broad actor story is not automatically a process. It qualifies as a process only when the end-to-end result spans multiple stages, responsibilities, screens, systems or bounded scenarios.
- Pure technical portals are outside this skill. An ANA portal may include a technical section, but this skill still owns only its functional projection.

Finish with a concise list of created or changed pages, unresolved evidence gaps, and any structural mismatch that needs migration.
