---
name: docs-wireframes
description: Create or update low-fidelity wireframes from documented scenarios, processes, UI states, or supplied screenshots while preserving traceability and SVG safety.
metadata:
  author: "Dávid Šilon"
---

# Documentation wireframes

Load `docs-base` first. A wireframe visualizes already supported behavior; it
does not invent fields, actions, validation, or states.

1. Identify the owning scenario, process step, or UI screen, the user goal, the
   exact named state, target viewport, and whether the request is to create,
   update, or only inspect an existing wireframe.
2. Resolve evidence for that screen. A supplied screenshot describes what is
   visible in that capture; an owning UI/scenario page describes supported
   behavior; inspected code or an agreed specification may resolve component
   and state detail. Surface conflicts instead of choosing silently.
3. Load [references/layout.md](references/layout.md), then only the source and
   element guidance the selected screen actually needs.
4. Produce safe, portable SVG according to
   [references/svg.md](references/svg.md). Store it in the portal's established
   public wireframe location and keep its filename stable.
5. Render the SVG and apply [references/validation.md](references/validation.md).
   An inspection request reports findings without rewriting files; a creation
   or update request fixes in-scope geometry before handoff.
6. Link the wireframe from its canonical owner, run
   [references/consistency.md](references/consistency.md), and apply
   [references/review-criteria.md](references/review-criteria.md).

## Load production guidance only when needed

- Deriving fields, actions, and hierarchy from a scenario, process, UI page,
  specification, or implementation:
  [references/documented-source.md](references/documented-source.md).
- Adapting a supplied screenshot:
  [references/screenshot-source.md](references/screenshot-source.md).
- Reusing or deriving repeated SVG primitives:
  [references/fragments.md](references/fragments.md).
- Rendering avatars or role glyphs:
  [references/avatars.md](references/avatars.md).

Use the owner that actually exists. A scenario-view page may own the journey
while a UI-view page owns the screen fields and validation; in that case the
wireframe links to both and does not duplicate either page's prose. A process
page provides ordering and handoffs, not an invented screen catalogue.

When `ui` is enabled, screen pages own fields and validation. In scenario or
process views, wireframes remain supporting visuals and link to the canonical
screen when one exists.
