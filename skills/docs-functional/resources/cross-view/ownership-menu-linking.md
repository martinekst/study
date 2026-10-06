# Cross-view ownership, menu and linking

Apply this resource whenever more than one functional view is enabled. Its purpose is to make the views complementary rather than three rewrites of the same behavior.

## Canonical owner

| Information                                                                                      | Owner                   | Other views carry                               |
| ------------------------------------------------------------------------------------------------ | ----------------------- | ----------------------------------------------- |
| Purpose, glossary, actors/personas, cross-cutting rule                                           | Common functional group | Short contextual link                           |
| End-to-end boundary, stages, hand-offs, overall states, process KPI/SLA                          | Process page            | Link plus the local interaction point           |
| One actor goal, sunny path, alternatives, business errors, scenario-specific notification/report | Scenario page           | Link plus a one-line role in the larger flow    |
| Screen fields, actions, editability, validation messages, layout, UI states and page permissions | UI page                 | Link plus the screen name used                  |
| API/schema/persistence/infrastructure/internal failure mechanics                                 | Technical owner         | Only the observable effect and an existing link |

When a fact applies to two or more artifacts and does not naturally belong to process, scenario or UI, move it to the common business-rules page and link it.

## Claim example

For claim payment:

- Process owns: “Claims hands an approved amount and authorization to Finance; completion changes the case to Paid.”
- Scenario owns: “A supervisor reviews the proposed amount and confirms payment approval.”
- UI owns: “The Approve payment button is enabled for supervisors only when status is Assessed and amount is valid.”
- Technical owner owns: event/API payload, queue, retry and database transition.

Copying the full approval steps onto all three functional pages is a defect. Each page should remain understandable after the duplicated prose is replaced with the correct link.

## Reciprocal links

For every relationship that exists:

- process → component scenario and interaction screen;
- scenario → containing process and screens used;
- UI screen → supported scenarios and processes;
- every target → back to its directly related parent/consumer when useful for navigation.

Use stable IDs in link text (`PROC-01`, `SC-04`) and stable relative paths. Add only links to existing targets. When a target is planned but absent, use an actionable missing-link TODO rather than a broken link.

Run a reciprocal-link check after indexes are generated. A one-way link is acceptable only when the reverse link would be noisy or misleading; record that choice in the work summary.

## Menu composition

The filesystem remains the exact menu. For a new section:

1. Common overview group first.
2. View groups follow in the order of `functional_views`.
3. The first view is the primary reader entry point and appears first in the functional index.
4. Each group index routes to its own artifacts; it does not mirror another group’s catalogue.
5. Never create a `hybrid`, `combined` or `all views` group.

Example for `[process, scenario, ui]`:

```text
001-zakladni-prehled/
002-processes/
003-scenarios/
004-ui/
```

An existing portal keeps its paths until an approved migration updates pages, indexes and inbound links. Change the README contract only after the migrated tree validates.

## Consistency checks

- Every enabled view has one group and index; disabled views have no newly generated group.
- Group order agrees with the contract or is reported as a structural mismatch.
- Every process phase that cites a scenario or screen resolves to it.
- Every scenario’s process/UI links are reciprocal where useful.
- UI validation is not copied into scenarios or processes.
- End-to-end hand-off detail is not copied into scenario or UI pages.
- Shared rules have one canonical owner.
- No page links to a non-existent target.
