# From wireframe to design specification

Load this reference when a stable wireframe, screenshot, or accepted visual is
the layout input for an actual screen spec. The visual establishes arrangement;
the functional owner establishes behavior.

## Closed inventory

Inventory the visual region by region—shell/navigation, header, content,
feedback/overlay, actions, footer. For every element record:

- verbatim visible label and purpose;
- functional owner and supported state;
- visual primitive or repeated composition;
- hierarchy, alignment, and relationship to its container;
- whether it is current, agreed target, proposal, or unknown.

Nothing enters the screen spec without appearing in the inventory or being an
explicit, evidence-backed addition. If the visual and functional owner differ,
record the contradiction before selecting a component.

## Map to the actual component system

Load [component-system.md](component-system.md). Use exact component/import or
design-system names verified in the project. When no single component matches,
describe a composition of existing primitives. A one-off arrangement stays in
the screen spec; repeated arrangements belong in one shared composition page.

For each element capture only implementation-useful properties: variant, size,
semantic role, state props, token references, content constraints, icon/asset,
and responsive behavior. Avoid copying an entire library API.

## Reference shared decisions

- Use token names from the canonical token page, not raw values in each screen.
- Reference named patterns for loading, empty, validation, submit error, success,
  permission denial, and destructive confirmation.
- Apply project-wide density, hierarchy, motion, and action rules from principles;
  document only justified exceptions on the screen.

## Required states

Cover the states supported by the functional owner and needed by the selected
journey: default, focus, selected, disabled, loading, empty, validation error,
submit/system error, permission-limited, success, and modal/confirmation. Do not
invent states, error copy, retry behavior, or loading duration.

## Responsive behavior

For every region state what changes at evidenced breakpoints: order, columns,
navigation form, visibility, wrapping, sticky behavior, and action layout. Use
tokens or named breakpoints. Do not say “responsive” without describing the
transition, and do not hide functional content merely to fit a smaller screen.

## Accessibility realization

Record semantic structure, heading order, focus order, visible focus, accessible
names/descriptions, keyboard interaction, error announcement, contrast intent,
target size, reflow/zoom, reduced motion, and non-color state cues as applicable.
Separate what the component library supplies from project-specific work.

## Visual verification

Inspect at the target viewport and breakpoint extremes. Check content expansion,
long/localized labels, empty/loading/error/permission states, keyboard focus, and
contrast. A design file that was not rendered or visually inspected is not fully
verified; state that limitation.
