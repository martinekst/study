# Resolving a delta finding

Keep these facts separate:

1. what the documentation currently claims;
2. what the inspected evidence shows for the exact scope/revision;
3. what the contract lifecycle says should be authoritative;
4. whether a different target remains approved but unimplemented.

For `as-built`, verified implementation/configuration evidence normally updates
the current-state canonical page, while an unimplemented target remains clearly
labelled elsewhere. For `implementation-ready`, an implementation divergence
does not automatically rewrite the agreed target; it may be a code defect or an
approved design change requiring its own evidence. For `discovery`, preserve
alternatives and do not turn one prototype or experiment into a commitment.

## Resolution choices

- **Repair documentation:** evidence is authoritative for this lifecycle and
  scope; route the bounded edit to the canonical owner.
- **Retain documentation and record implementation defect:** the documented
  target is still authoritative; leave the finding open or accept/reject it only
  through the user's explicit decision and rationale.
- **Record approved divergence:** preserve the old target/change history, update
  the canonical current/target page as appropriate, and cite approval plus
  implementation evidence.
- **Insufficient evidence:** do not edit; add the missing inspection or decision
  needed and keep `open`.

The dispatch payload includes both claims, source locations/revisions, limitations,
and the chosen authority rationale. Recheck the exact conflicting statement and
reciprocal links after the repair. A small evidence check updates only affected
pages/findings and never implies portal-wide verification.
