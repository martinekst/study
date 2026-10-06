# Diagram consistency check

- Every actor/node/state exists in the host text or cited evidence.
- Direction and ordering match the documented flow.
- Labels distinguish current, target, proposal, and unknown.
- Process diagrams link to bounded scenarios/screens instead of restating them.
- Technical diagrams use the same boundaries and names as technical pages.
- Error/alternative paths shown in one representation exist in the other.
- Links/anchors render and the diagram remains readable in light, dark, and
  print contexts when the portal supports them.

## Per-type checks

| Type                   | Confirm                                                                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sequence               | Every participant has an evidenced role; request/response direction, ordering, alternative branches, and error outcomes match the owning scenario or interface.                             |
| Decision/activity flow | Every decision is phrased as a question, every outgoing edge is labelled, and every terminal outcome exists in the process or scenario.                                                     |
| Context/C4             | System boundary, external parties, internal containers/components, protocols, and dependency direction match the technical owners. One level of abstraction does not masquerade as another. |
| Domain/class           | Names, relationships, relationship direction, and cardinalities match the canonical domain owner. Implementation-only attributes are not added to a functional projection.                  |
| ER                     | Entities, primary/foreign keys, optionality, and cardinalities match the inspected schema or agreed data design.                                                                            |
| State                  | Initial/final states, transitions, trigger labels, guards, and terminal failures match the canonical lifecycle.                                                                             |
| Business matrix/chart  | Every point or bar reconciles with the source table, units and scales are stated, and uncertain values are not plotted as facts.                                                            |
| Roadmap                | Every date, dependency, milestone, and confidence label is supported; ordering-only evidence is not converted to exact dates.                                                               |

## Coupled visuals

- Current and target process diagrams are a matched pair: same process scope,
  comparable lanes, dimensions, labels, and ordering. Highlight the evidenced
  delta; do not redesign the second diagram into an incomparable layout.
- When one domain model is shown in functional and technical pages, build both
  projections from one class-and-relationship inventory. The functional view
  may omit attributes; shared class names, relationships, and cardinalities
  remain identical.
- Repeated actors, systems, role colors, and boundary names stay consistent
  across the diagram set. Prefer semantic labels and shape/line distinctions to
  color alone.

## Render check

Preview the rendered output, not just the source. Check clipping, edge crossings,
label collisions, excessive canvas size, legend accuracy, keyboard/print context
where applicable, and that the text summary still communicates the conclusion
if rendering fails.

Report `diagram-text-contradiction` when the visual and text disagree; do not
choose a winner without evidence.
