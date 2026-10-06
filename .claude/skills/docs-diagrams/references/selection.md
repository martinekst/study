# Diagram selection

Choose from the question asked by the actual host page. Do not infer a diagram
catalogue from a lifecycle label, operation, folder number, or former entry
point.

| Host need / reader question                                | Smallest useful diagram                  | Load                                                                   |
| ---------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| Scenario: what happens across participants, in order?      | sequence                                 | [sequence-flow.md](sequence-flow.md)                                   |
| Scenario: where do business decisions and exceptions lead? | decision/activity flow                   | [sequence-flow.md](sequence-flow.md)                                   |
| Process: how does one outcome cross roles or systems?      | activity flow, optionally with swimlanes | [sequence-flow.md](sequence-flow.md)                                   |
| UI screen: what transition follows each user action?       | compact state/transition flow            | [sequence-flow.md](sequence-flow.md) or [data-state.md](data-state.md) |
| Overview: who or what is outside the system boundary?      | context diagram                          | [architecture.md](architecture.md)                                     |
| Architecture: what are the major runtime boundaries?       | container/component diagram              | [architecture.md](architecture.md)                                     |
| Architecture: what depends on what or where is it hosted?  | dependency or deployment diagram         | [architecture.md](architecture.md)                                     |
| Domain: how are business concepts related?                 | class/domain model                       | [data-state.md](data-state.md)                                         |
| Data: how are persisted records related?                   | ER diagram                               | [data-state.md](data-state.md)                                         |
| Lifecycle: how does one entity or aggregate change?        | state diagram                            | [data-state.md](data-state.md)                                         |
| Business: who needs which engagement?                      | stakeholder matrix                       | [business-visuals.md](business-visuals.md)                             |
| Business: which risks need attention?                      | risk matrix                              | [business-visuals.md](business-visuals.md)                             |
| Business: how do baseline and target measures compare?     | table first; bar/column chart if clearer | [business-visuals.md](business-visuals.md)                             |
| Business: how does a current process change in the target? | matched current/target process pair      | [business-visuals.md](business-visuals.md)                             |
| Plan: how does evidenced work change over time?            | roadmap/timeline                         | [business-visuals.md](business-visuals.md)                             |

Prefer prose or a table for a single fact or small mapping. One diagram should
answer one reader question.

## Selection tests

Use a sequence diagram when ordering across participants is the point. Use a
flowchart when decisions and outcomes are the point. Do not draw both unless the
page genuinely asks both questions; when it does, keep the interaction sequence
and business decision logic separate.

Use a domain/class model for concepts and their relationships. Use an ER diagram
for persisted structures, keys, and storage cardinalities. Do not expose database
detail as if it were the business model.

Use one architecture level per diagram unless a compact overview deliberately
shows a drill-down and labels each boundary. A diagram that mixes people,
systems, containers, components, classes, and deployment instances without
explicit nesting is not a C4 overview; it is an ambiguous graph.

Dates, percentages, effort, probability, impact, and placement on a matrix must
come from evidence. When the source gives only an ordering, use an ordered list
or milestone flow rather than manufacturing a calendar or numeric axis.

## Format decision

- Mermaid is the default for maintainable structural and behavioral diagrams.
- Standalone SVG is appropriate for paired business visuals, dense timelines,
  maps, or branded explanatory visuals whose spatial composition matters. Keep
  it self-contained and use safe SVG practices from `docs-wireframes`.
- PlantUML is a fallback for required notation that Mermaid cannot express and
  the target site already renders. Do not introduce a new renderer solely for
  visual preference.
