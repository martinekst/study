# Wireframe validation workflow

Load this reference after creating or updating SVG, or when the user asks to
inspect existing wireframes. Automated geometry checks produce candidates;
rendered inspection decides whether the output is actually readable.

## Per-file checks

1. **Safety and XML:** apply [svg.md](svg.md), confirm well-formed XML, local
   references, and unique IDs.
2. **Root bounds:** every rendered shape, line, text block, image, and use instance
   remains within the root `viewBox` unless clipping is intentional.
3. **Innermost containment:** text/icons/badges remain inside the cell, row, card,
   panel, or shell that owns them with appropriate padding.
4. **Text collisions:** compare text bounding boxes with other text and shapes.
   Exempt a label from its own button/input by group ancestry, not by proximity.
5. **Layout contract:** uniform action-group sizing, content-column alignment,
   symmetric padding, equal-height row decisions, block gaps, and axis-aligned
   separators.
6. **Semantic elements:** avatar geometry, state styling, label language, and
   fragment provenance when used.
7. **Rendered preview:** inspect the actual SVG at target page size and at the
   smallest supported size. Source-only success is not a visual pass.

## Conservative text estimation

When a validator lacks a browser text engine, estimate width per character and
round up. A useful fallback multiplies font size by approximately:

| Character class                | Factor |
| ------------------------------ | ------ |
| narrow (`i`, `l`, punctuation) | 0.30   |
| lowercase default              | 0.52   |
| uppercase, digits, symbols     | 0.62   |
| wide (`m`, `w`, `M`, `W`)      | 0.85   |
| space                          | 0.28   |

Add about `0.10 * font_size` slack, a small increase for bold text, and vertical
headroom for diacritics. This heuristic can find likely collisions but cannot
replace rendering.

## Cross-wireframe checks

- identical navigation type has the same items, order, and chrome; active state
  varies only with the named screen;
- the same action uses the same visible label unless the owner documents a
  contextual difference;
- the same role, status, field state, and repeated fragment use the same token and
  geometry;
- frames sharing a viewport use the same shell dimensions and content grid;
- filenames, owner links, titles, and state names are unique and stable.

## Handling findings

Describe each finding with file, category, visible consequence, evidence, and a
concrete minimal fix. During an inspection/review request, do not mutate the SVG.
During an authorized create/update request, fix geometry and safety issues that
do not change product behavior, then re-run all affected checks. When a fix would
require an unsupported layout or behavior decision, leave an explicit gap for the
owner rather than guessing.

Never report “clean” if the SVG was not rendered, required source/fragments were
unavailable, or a safety check could not run. State the unverified portion.
