# Change-request traceability

Traceability is reciprocal and reader-visible:

- every change group links to each affected canonical page;
- every affected canonical page links back to the group;
- a task links to the exact scenario, screen, interface, rule, test, or design
  detail it implements;
- the group summary links to its tasks and design pages.

Prefer a group-level link when the whole group affects a page. Use a task-level
link only when it materially narrows responsibility. Design pages are reached
through their group or relevant task unless a direct link is genuinely clearer.

Use relative links within the portal and calculate them from the actual source
file. Keep the human-readable label stable even when a filename has a numeric
prefix. If the portal already maintains machine-readable affected-page metadata,
update it in the same pass; otherwise do not invent a second relationship store.

## Link repair sequence

1. Resolve every target against the active version filesystem.
2. Add the forward link from the change group or task.
3. Add or merge the reciprocal link in the canonical page's existing related-
   work section; do not duplicate the relationship in prose.
4. Validate anchors and both directions.
5. Report unresolved or ambiguous ownership instead of guessing a target.

When a change is relocated or archived, repair both directions together. A link
to an external work tracker may supplement but never replace the portal link
that explains the behavior being changed.
