# Evidence rules (functional, evidence-aware)

These functional citation rules extend the universal evidence hierarchy in
[`docs-base`](../../docs-base/references/evidence.md). The base resource defines
which evidence is authoritative for each lifecycle stage; this resource defines
how roles, scenarios, rules, errors, screens and other functional claims are
supported.

Source type is resolved for the current run. It is not a persistent portal mode
and is never added to `docs/README.md`.

## The rule in one sentence

If a claim cannot be supported by the authoritative evidence inspected for the
current run, do not present it as fact. Mark the missing decision or source
explicitly instead.

## Functional citation expectations

| Claim type              | Implementation evidence                                                        | Specification or discovery evidence                                          |
| ----------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| A file or module exists | `path/to/file`                                                                 | `<document>#<section>`                                                       |
| A scenario entry point  | controller, resolver or handler `path/to/file:LL`                              | exact scenario/use-case section plus interview anchor when behavior-critical |
| A role or permission    | role definition or guard `path:LL`, plus an existing technical role matrix     | agreed roles section plus decision/interview anchor                          |
| A validation rule       | schema, validator or policy `path:LL`                                          | agreed validation or acceptance-criteria section                             |
| A business rule         | policy, guard or domain service `path:LL`                                      | agreed business-rule section plus decision anchor                            |
| A user-visible error    | error definition/handler `path:LL`, plus an existing technical error catalogue | agreed error behavior plus UI/design reference where relevant                |
| A notification          | sender call and template path                                                  | agreed notification behavior plus sample or design reference                 |
| A feature toggle        | SDK/configuration call `path:LL`                                               | approved rollout decision; otherwise unresolved                              |
| A metric or SLA         | metric emission/configuration `path:LL`                                        | agreed KPI/SLA definition                                                    |
| A UI element or layout  | component/route plus screenshot when available                                 | wireframe, design or prototype reference                                     |

Prefer `path:line` over a bare path for a specific implementation claim. For an
agreed target, an exact document section or decision ID provides equivalent
precision. Existing documentation is useful for stable IDs, links and
continuity, but it does not overrule authoritative evidence for the active
lifecycle stage.

## Source visibility on functional pages

Functional pages are designed for readers of behavior, so audit provenance is
kept without turning the body into an implementation log:

- Put internal `Zdroj:` notes and code symbols that add no reader value in an
  HTML comment, including the date the note was updated.
- Keep links to an owning technical, change-request, scenario, process or UI
  page visible. A hidden source note is not a substitute for navigation.
- Keep domain identifiers visible when they carry business meaning, for example
  a state code, regulated field or protocol value on which a rule depends.
- Record review-wide verification scope, date and code reference only in a
  review report. A page citation never implies that the full portal was checked.

Example:

```markdown
<!-- Zdroj: PaymentService.processPayment (checked 2026-09-02) -->

Technický detail: [Zpracování plateb](../../technical/payments.md)
```

## When to write content

Write a claim only when all of the following are true:

1. At least one concrete citation supports it.
2. A shortcut source, such as an existing technical page, has been checked
   against the authoritative source when behavior is material.
3. The citation belongs to the source references supplied for this run; it was
   not borrowed from a similar project.
4. The wording distinguishes implemented behavior, agreed target, proposal and
   unknown state according to the lifecycle stage.

## When to write `⚠️ TODO`

Use an actionable TODO when:

1. An expected aspect has no evidence. Optional persona, screen and shared-rule
   sections may be omitted entirely when they have no evidence rather than left
   as empty headings.
2. A specific constraint cannot be derived, such as a required string whose
   length or business format is unknown.
3. Sources disagree. Name both sources and the decision needed; do not select a
   side silently.
4. A required link owner does not exist. Record the intended owner/path without
   creating a broken Markdown link.
5. A wireframe placeholder has no screenshot or UI evidence.

Use the repository’s standard finding/TODO vocabulary when one exists. The TODO
must say what is missing and what evidence or decision will close it.

## API endpoint mentions

Functional pages normally explain observable behavior and do not reproduce HTTP
paths, schemas or response codes. Link the owner of that detail:

- the active change-request design when the requested work is an implementation
  package;
- otherwise the technical section when that section exists.

If a reader explicitly needs an endpoint reference on a functional page, make
every occurrence a link to its canonical owner rather than bare technical text:

```markdown
[GET /api/stations](../../technical/009-exposed-public-apis/001-stations.md#get-api-stations)
```

When the target is planned but absent, use backticked text plus an actionable
missing-owner TODO instead of a broken link. Endpoint occurrences in evidence
prove behavior; they are not automatically content to reproduce.

## Detail ownership split

Technical detail discovered during a functional scan is relocated or linked,
never copied into several views.

| Detail found                            | Functional page carries                                | Canonical owner                                                                |
| --------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Attribute-level API/UI/database mapping | business state before and after                        | active change-request mapping design, otherwise technical data model           |
| Technical state model                   | user-observable states and transitions                 | active change-request state design, otherwise technical state model            |
| HTTP codes and internal error causes    | business meaning and user-visible response             | active change-request error design, otherwise technical error catalogue        |
| External interface contract             | that the integration exists, why it matters and a link | active change-request integration design, otherwise technical integration page |

If the appropriate owner is outside the enabled sections, report the gap. Do not
create a second technical catalogue inside functional documentation.

## UI label versus actual operation

The label of a UI action and its actual operation may differ. Document the
observable effect that the lifecycle stage supports, then note the UI label.

Common examples:

- “Delete” toggles an `active` flag rather than removing a row.
- “Approve” changes a workflow state but does not publish the item.
- “Send” enqueues a job; delivery is asynchronous.

For `as-built`, inspect the handler/configuration and describe the implemented
effect. For `implementation-ready`, use the approved behavior and acceptance
criteria. In `discovery`, label the operation as a proposal until decided. The
trigger can say that a user selects a labeled action, while the sunny path and
business logic explain what actually changes.

When the difference is non-obvious, add a short reader-facing note and keep its
evidence in the internal source note.

## Functional cross-checks

- **Implementation versus technical documentation:** for `as-built`, inspected
  code/configuration wins. Keep the supported functional claim and report the
  stale technical page.
- **Approved specification versus interview:** for an agreed target, surface
  both positions and request a decision when they conflict.
- **Behavioral evidence versus screenshot:** behavior comes from the lifecycle-
  appropriate behavioral source; the screenshot controls visual layout. Report
  fields or actions that appear in only one source.
- **Existing documentation versus newer evidence:** preserve stable paths and
  IDs where possible, but do not preserve a contradicted behavior silently.

## Rules recap

- Never invent behavior, fields, validations, errors, roles, claims or benefits.
- Never cite a file or document section that was not inspected.
- Never copy a claim from a shortcut source without checking authoritative
  evidence when the claim is material.
- Never describe a UI label as if it proved the underlying operation.
- Never resolve a contradiction silently.
- Keep implementation detail with its technical/change-request owner and link
  it from the functional page when it helps the reader.
- Include a concrete example for every non-trivial concept when evidence allows
  it.
- Keep established domain and technical terms in their original language when
  translating them would reduce precision.
