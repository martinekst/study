# Source-to-test derivation

Use this guide when turning functional or change documentation into technical QA
cases. Read the canonical source and every linked rule/interface needed by the
case; do not derive detailed expectations from a title or summary alone.

## Extract from the source

| Input                        | Derivation target                                                        |
| ---------------------------- | ------------------------------------------------------------------------ |
| Stable ID and outcome        | QA page filename, case prefix, criterion, source link                    |
| Actors and permissions       | identity/role preconditions and allowed/denied cases                     |
| Preconditions/postconditions | starting data/state and observable final state                           |
| Primary flow                 | at least one happy-path case for an executable in-scope source           |
| Alternatives/exceptions      | one case per material distinct path                                      |
| Business errors              | response/outcome assertions; merge with the alternative that proves them |
| Fields and validation        | representative valid, invalid, empty, and boundary cases                 |
| UI states/actions            | visible state, editability, accessibility, and navigation observations   |
| Interfaces/data transitions  | request/event/schema, persistence, idempotency, concurrency observations |
| Changes/migrations           | regression, compatibility, migration, rollback, and flag variants        |
| Operational constraints      | timeout, retry, resilience, logging/metric, recovery observations        |

If a process spans several scenarios, test the process outcome and critical
hand-offs without copying every scenario-level case. If a UI view and scenario
describe the same validation, assign one canonical case and link both sources.

## Case families and IDs

Use stable suffixes when the existing portal does not already define another
scheme:

- `TC-<SOURCE>-HP-01` — primary successful path;
- `TC-<SOURCE>-ALT-01` — a distinct alternative flow;
- `TC-<SOURCE>-NEG-01` — a failure not already covered by an alternative;
- `TC-<SOURCE>-BND-01` — a validation or numeric/time boundary;
- `TC-<SOURCE>-ROLE-01` — an allowed or denied permission boundary;
- `TC-<SOURCE>-INT-01` — interface, event, timeout, retry, or idempotency;
- `TC-<SOURCE>-REG-01` — compatibility/regression/change risk.

Number within each family without reusing retired IDs. Put a stable anchor on
each case heading, such as `{#tc-sc-03-alt-01}`. When the source explicitly
tracks coverage, add a reciprocal link directly to that anchor rather than to
the top of the QA page.

## Avoid duplicate cases

An alternative that ends in a documented business error should normally be one
`ALT` case asserting both the complete route and the error; do not add a second
`NEG` case for the same behavior. Parameterize equivalent boundary values when
that remains readable. Split cases when they need different setup, owner,
level, expected evidence, or release decision.

## Missing or conflicting detail

- No alternative/error is not automatically a defect; record only evidenced or
  required paths.
- A branch embedded in the primary flow makes the sunny path ambiguous. Ask for
  or record a split into explicit alternatives before claiming full coverage.
- Missing validation or permission behavior is a testability gap when the field
  or restricted action is in scope.
- When source and interface/implementation disagree, state both expected
  possibilities and block the affected case until the owner resolves them.
- Never invent payloads, status codes, database writes, role behavior, limits,
  or automation state.

## Result

Use [`templates/qa-case.md`](templates/qa-case.md). Technical observations must
be specific enough for a tester or developer to reproduce: response, event,
data/state change, visible UI, log/metric, or absence of a forbidden effect.
Only attach a passed/failed state when a scoped run artifact is available.
