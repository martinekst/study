# Wireframe layout

Derive hierarchy from the user goal and confirmed content. A low-fidelity frame
still needs deliberate geometry; “rough” does not mean overlapping or lopsided.

## Frame inventory

Record before drawing:

| Decision        | Required value                                                       |
| --------------- | -------------------------------------------------------------------- |
| Owner           | canonical scenario/process/UI page and any supporting owner          |
| Screen/state    | one stable screen name and one named state                           |
| Viewport        | width, height, device class, and theme when relevant                 |
| Primary task    | what the user is trying to complete                                  |
| Visible regions | shell/navigation, header, content groups, feedback, actions          |
| Evidence        | source for every visible field, label, action, state, and permission |

One SVG normally represents one screen/state. When state changes materially
alter hierarchy or controls, use separate named frames; otherwise keep one frame
and document the other states beside it.

## Layout order

1. Establish shell and navigation only when the owner or supplied reference
   shows them.
2. Place title, context, identity, or progress information required to orient
   the user.
3. Group fields and information in task order. Preserve the supported order;
   if the order appears wrong, report it instead of silently redesigning.
4. Place primary, secondary, and destructive actions according to their
   documented hierarchy and permissions.
5. Reserve space for relevant loading, empty, error, success, disabled, and
   permission states. Do not add a state merely to make the frame look complete.
6. Describe responsive changes when the requested screen must work at more than
   one breakpoint; do not scale a desktop frame down mechanically.

## Geometry contract

- Define one content column per container. Use the spacing/design tokens when
  available; otherwise choose one inset and apply it symmetrically.
- Buttons in one row or stack share height and, when they form one action group,
  width and corner radius. For `n` equal buttons in a row:
  `button_width = (content_width - (n - 1) * gap) / n`.
- A stacked action group fills the content column unless the design evidence
  explicitly defines a narrower alignment.
- Keep at least one normal layout gap between stacked blocks and a larger group
  gap between unrelated regions. Grow the container or wrap text instead of
  allowing partial overlap.
- Content stays inside its innermost visual owner—cell, row, card, panel, then
  shell—not merely inside the root `viewBox`.
- Cards sharing a row may use equal height; intentional empty space in the
  shorter card is not a defect. Full-bleed headers/dividers and deliberately
  straddling badges should carry a short SVG comment explaining the exception.
- Long horizontal or vertical separators are axis-aligned. A small unintended
  endpoint offset is a geometry defect.

## Labels and fidelity

Use labels verbatim from the canonical owner or screenshot. Preserve diacritics
and keep technical identifiers in their source language. If a required label is
unknown, put a clearly marked placeholder in the draft and record the gap on the
host page; never convert a guessed label into apparent product truth.

Keep the visual neutral unless an existing design system, implementation, or
supplied reference establishes tokens. Use shape, text, and position—not color
alone—to distinguish roles and states.
