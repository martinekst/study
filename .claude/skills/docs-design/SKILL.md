---
name: docs-design
description: Turn stable functional behavior and wireframes into an evidence-backed UI design specification with tokens, component rules, states, responsive behavior, and accessibility guidance.
metadata:
  author: "Dávid Šilon"
---

# UI design specification

Load `docs-base` first. Use this skill only when the request needs a design
specification beyond functional UI documentation or a wireframe.

1. Identify the actual implementation/review need and select the smallest
   deliverable using [references/scope.md](references/scope.md).
2. Start from confirmed functional behavior, wireframes or accepted visual
   references, and the component/theme system actually used by the project.
3. Use [references/design-spec.md](references/design-spec.md) to establish
   ownership and output structure. Preserve an existing design folder and its
   naming rather than regenerating it from a preferred layout.
4. Load only the production reference and template needed for each selected
   layer. Every value is sourced, inherited from an evidenced system, or visibly
   labelled as a proposal/unknown.
5. Cross-link canonical functional owners and reusable design decisions. Render
   or inspect representative screens at required breakpoints and states.
6. Apply [references/review-criteria.md](references/review-criteria.md) before
   handoff.

## Load production guidance only when needed

- Translating a stable wireframe or accepted visual into a screen spec:
  [references/from-wireframe.md](references/from-wireframe.md).
- Mapping elements to the project's component library or documenting repeated
  compositions: [references/component-system.md](references/component-system.md).
- Creating a project context/foundation page:
  [references/templates/context.md](references/templates/context.md).
- Creating or updating tokens:
  [references/templates/tokens.md](references/templates/tokens.md).
- Creating principles or project-wide interaction rules:
  [references/templates/principles.md](references/templates/principles.md).
- Creating a reusable loading/empty/error/success/confirmation recipe:
  [references/templates/pattern.md](references/templates/pattern.md).
- Specifying one actual screen/state:
  [references/templates/screen.md](references/templates/screen.md).
- Documenting a repeated domain composition:
  [references/templates/composition.md](references/templates/composition.md).

If `ui` is enabled, screen pages own behavior, fields, validation, permissions,
and transitions; design pages own visual choices, tokens, component variants,
responsive presentation, motion, and accessibility realization. If only
scenario/process views exist, link design decisions to the relevant interaction
instead of inventing a screen catalogue.

Keep current design, agreed target, proposal, and unknown distinct. Do not claim
that a design spec is implemented, or invent a library, component, asset, token,
or pixel value to make the deliverable appear complete.
