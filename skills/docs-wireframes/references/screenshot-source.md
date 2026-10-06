# Layout from a supplied screenshot

Load this reference only for screens with a supplied screenshot or exported
design frame. A screenshot is evidence of one visible state at one viewport, not
proof of all product behavior.

## Inventory before drawing

Create a closed inventory of everything visible:

| Item        | Record                                                              |
| ----------- | ------------------------------------------------------------------- |
| Frame       | pixel dimensions, device/browser chrome, theme, crop                |
| Regions     | header, navigation, content, footer, overlays and rough proportions |
| Elements    | type, order, position, size, visible state, and owner region        |
| Text        | verbatim label/value, including diacritics and truncation           |
| Affordances | icons, badges, menus, selection/focus, scroll indicators            |
| Limits      | cropped/obscured/low-resolution areas and anything unreadable       |

Nothing appears in the wireframe unless it is in this inventory or separately
supported by the canonical owner and intentionally called out as an addition.

## Compose proportionally

1. Normalize screenshot coordinates to the selected SVG `viewBox` rather than
   eyeballing positions.
2. Establish region containers, then place reusable primitives, then labels and
   state annotations.
3. Preserve visible order, grouping, labels, and the captured state.
4. Normalize obvious accidental geometry only when doing so does not change the
   product claim: align action groups, preserve symmetric container padding, and
   prevent overlap. Record any meaningful departure from the screenshot.
5. Mark cut-off content with a boundary or adjacent note; do not fabricate the
   hidden region.

If the screenshot is too small to recover proportions or text reliably, produce
only the supported partial frame and ask for a better reference. Do not upscale
uncertainty into false precision.

## Multiple states

Use one canonical SVG when the states share layout and differ only by values or a
small feedback element; describe the other states beside the figure. Use separate
named SVGs when the owner needs materially different empty, loading, error,
permission, modal, or success layouts.

## Reconcile with the owner

Compare screenshot and canonical page after inventory. An element visible only
in the screenshot may be current implementation detail, an obsolete design, or
unsupported evidence; an element described only in text may be off-screen or a
target change. State the discrepancy and use lifecycle/evidence context to label
current, target, proposal, or unknown. Never silently promote the screenshot to
the complete product specification.

Do not copy the screenshot into the portal or a reusable fragment library unless
the user explicitly requests that asset; use it as read-only reference.
