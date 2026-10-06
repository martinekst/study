# Change-request evidence comparison

Use this only when the declared portal contains change requests and the requested
scope includes their implementation state or traceability.

1. Inventory groups, tasks, acceptance statements, current visible state,
   canonical-page links, and design-detail links.
2. For each acceptance statement, record `supported`, `partly supported`,
   `contradicted`, or `not established`, with evidence and revision.
3. Propose task state from its complete acceptance set, then group state from
   end-to-end acceptance, rollout/migration, and required tasks.
4. Check every affected-page relationship in both directions.
5. Preview all proposed state and link changes. Apply them only through an
   explicitly approved report finding or requested update.

Use the state semantics owned by
`../../docs-change-requests/references/state.md`. Do not treat a code symbol as
proof of an end-to-end outcome, a merged branch as deployed behavior, or one
passing test as proof of all group acceptance.

When implementation differs from the change design, keep three facts separate:
what the package requested, what evidence shows was implemented, and whether the
divergence was approved. Never rewrite the historical target merely to make it
match code. If shipped design is absent from canonical `as-built` technical or
functional pages, report that canonical documentation gap instead of copying the
change design into them without verification.
