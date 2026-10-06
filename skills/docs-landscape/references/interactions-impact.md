# Interactions, completeness, and impact

## Interaction evidence

Record direction from the initiator/producer to the receiver/consumer. For each
edge capture purpose, protocol/mechanism, operation/event/data, authentication or
trust boundary, failure behavior, evidence, and confidence.

Strong evidence includes matching provider and consumer code/configuration,
runtime traces, or a tested contract. One-sided client code or a dependency
declaration supports a candidate edge, not confirmed runtime interaction. When
the two sides disagree, retain both observations and flag the contract gap.

Business flows compose verified edges into a reader outcome. Select flows that
cross meaningful repository/system boundaries; keep single-system behavior in
that system's own documentation. Identify roles, trigger, ordered hand-offs,
final result, and major failure/recovery path without inventing missing steps.

## Completeness questions

Check only responsibilities implied by observed architecture or stated operating
requirements. Examples include missing deployment ownership, unresolved secrets,
unmonitored critical edges, absent recovery, inconsistent schemas, unclear data
retention, or an undocumented external dependency. A generic “production-ready”
checklist must not create requirements that the portfolio never declared.

Classify each gap by consequence and evidence confidence. Ownership remains
unknown unless an authoritative signal exists.

## Change impact

Given a concrete proposed change, place systems into:

- `affected`: direct contract/data/runtime/configuration evidence shows work or
  behavior changes;
- `possibly affected`: a plausible edge exists but evidence is incomplete;
- `not affected in inspected scope`: relevant surfaces were checked and no
  dependency was found;
- `not assessed`: access or scope prevented a conclusion.

For each classification cite the change surface and traversal path through the
interaction graph. “Not affected” is bounded to inspected evidence; it is not a
universal guarantee. End with validation actions for possible/not-assessed items
and route per-system documentation work to its owning skill.
