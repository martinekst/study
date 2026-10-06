# Business visual production patterns

Load this reference for management-facing maps, comparisons, paired processes,
and timelines. These visuals may use the project's presentation palette, but
their data and spatial positions remain evidence-backed.

## Stakeholder and risk matrices

Before drawing, create a source table with one row per plotted point and explicit
axis values. State the axis direction and scale. If the source supplies only
qualitative values, use named bands such as low/medium/high; do not manufacture
decimal coordinates.

For stakeholders, typical axes are influence and interest. For risks, typical
axes are probability and impact. Keep quadrant names in one neutral label style;
use fills, point shapes, and a legend for meaning. Ensure point labels do not
overlap and preserve a table beside the image for accessible lookup.

## KPI comparison

Use a table when there are few values or mixed units. Use a bar/column visual only
when comparing consistent units is materially faster to understand.

- Reconcile every category, baseline, target, and unit with the source table.
- Do not put percentages, currency, duration, and counts on one unlabeled axis.
- Label missing baselines and targets as unknown; do not plot them as zero.
- State whether a target is agreed, proposed, or illustrative.

## Matched current/target process pair

Current and target flows are one comparison deliverable. Use the same canvas,
direction, lanes, step granularity, and stable labels. Mark evidenced pain points
in the current view and the corresponding changed/removed steps in the target
view. Do not imply benefit where the target process merely changes ownership.

Every step comes from the process page; each human/system handoff is labelled.
Quantitative improvements remain in the caption or KPI table unless their
placement in the diagram is necessary.

## Roadmap or timeline

Use a roadmap only when dates, periods, dependencies, or ordered milestones are
supported. If estimates are ranges, show ranges and confidence instead of false
precision. If only order is known, use a milestone flow without a calendar axis.

For a standalone SVG timeline:

1. Derive the horizontal scale from the earliest and latest supported dates.
2. Give each phase one row with a label block, time bar, milestone markers, and
   dependency connectors only where evidenced.
3. Reserve one accent for the most important milestone; use neutral surfaces for
   structural rows.
4. Put the legend inside a padded region or next to the image, never flush with
   the frame.
5. Check label and connector collisions after rendering. Grow the canvas or wrap
   labels; never shrink important text until it becomes unreadable.

## Safe standalone SVG

- Store the SVG in the portal's established public diagram directory and link it
  from its canonical host page. Do not paste raw `<svg>` into Markdown unless the
  portal explicitly supports and sanitizes it.
- Use a complete `viewBox`, fixed internal coordinates, and responsive outer
  dimensions.
- Include no script, event handler, remote resource, executable URL, or unsafe
  foreign content.
- Make the file self-contained for light, dark, and print use. Either use filled
  shapes with sufficient text contrast or include an intentional background
  plate; never rely on dark strokes over a transparent page.
- Use one border/text style per semantic role. Keep all arrow labels consistent
  and remove unused CSS/classes after edits.
- Add a useful `<title>`/accessible label and a prose summary on the host page.

## Delivery check

Preview at the target page width and in print. Verify axis labels, units, legend,
point placement, date scale, milestone dependencies, pairing consistency, and
that the visual makes the same claim as the source table and surrounding prose.
