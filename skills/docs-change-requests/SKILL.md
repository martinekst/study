---
name: docs-change-requests
description: Create or update declared change-request documentation with outcome-oriented change groups, implementation tasks, technical design links, states, dependencies, and test traceability.
metadata:
  author: "Dávid Šilon"
---

# Change-request documentation

Load `docs-base` first. Write this section when `change-requests` is declared or
when an approved extension explicitly uses it. An operation alone does not add
the section to README.

Use [references/structure.md](references/structure.md): one summary, one
deliverable change group per outcome, implementation tasks by responsibility,
and separate technical design pages only where detail is needed.

Load the detailed resource that matches the work:

- [references/decomposition.md](references/decomposition.md) before splitting
  scope into groups and tasks;
- [references/linking.md](references/linking.md) when creating or repairing
  traceability;
- [references/state.md](references/state.md) when setting implementation state;
- [references/design-types.md](references/design-types.md) before adding a
  technical design page;
- [references/templates.md](references/templates.md) for new pages.

Each change must state:

- intended outcome and boundaries;
- affected canonical business/functional/technical/test pages;
- dependencies and rollout/migration considerations;
- acceptance evidence and current implementation state.

State follows evidence, never optimism. Maintain reciprocal links instead of
copying full scenarios, APIs, or tests. Apply
[references/review-criteria.md](references/review-criteria.md) before handoff.
