# Safe SVG wireframes

SVG wireframes are published content. Treat copied markup as untrusted until it
has been sanitized and rendered.

## Root and structure

- Use a complete `viewBox="minX minY width height"`. Provide responsive outer
  dimensions (`width="100%"` or the portal convention) without losing the
  internal coordinate system.
- Add a concise `<title>` and, when useful, `<desc>` linked with appropriate
  accessibility attributes. Group meaningful regions with stable `id` or class
  names so later validation can understand ownership.
- Prefer `rect`, `circle`, `line`, `path`, `text`, `tspan`, `g`, `defs`, simple
  gradients, and clipping. Use portable system fonts and explicit fallbacks.
- Escape `&`, `<`, `>`, and quotes correctly. Keep text as text whenever
  possible so labels remain searchable and reviewable.

## Reject executable or remote content

Reject or rewrite:

- `<script>` and all event-handler attributes such as `onclick` or `onload`;
- `javascript:` or other executable URLs in any attribute;
- external `href`, `xlink:href`, CSS `@import`, web fonts, remote images, or
  stylesheets unless the portal has an explicit trusted allowlist;
- `<foreignObject>` containing HTML or executable content;
- data URLs capable of carrying script or active HTML;
- animation that changes a URL/reference or acts as navigation.

Replace HTML inside `foreignObject` with SVG text/shapes, inline simple icons as
safe paths, and replace interactive behavior with a static annotation. If the
artifact must be clickable, use a prototype rather than executable SVG.

## Portable rendering

- Do not rely on inherited page CSS variables unless the portal explicitly
  guarantees them for image files. Self-contained fixed colors or an intentional
  background plate are safer.
- Avoid filters and masks unsupported by the target renderer. Keep identifiers
  unique within the file and resolve all local fragment references.
- Wrap long labels with explicit `<tspan>` lines or widen the owning container.
  Preserve a readable font size; clipping or ellipsis requires the full value in
  `<title>` or adjacent prose.
- Ensure text/background contrast and focus/error meaning do not rely on hue
  alone. Check the supported light, dark, and print contexts.

## Validation

Use a repository-supplied SVG sanitizer or validator when available. Otherwise
inspect XML well-formedness and every forbidden construct above. Then render and
visually inspect; source-only checks cannot catch text overflow or layout
collisions. Keep file names stable and link the SVG from its canonical owner.
