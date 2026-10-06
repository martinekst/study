---
name: docs-diagrams
description: Create or update evidence-backed diagrams for stable documentation, choosing the smallest useful diagram type and checking it against its host text.
metadata:
  author: "Dávid Šilon"
---

# Documentation diagrams

Load `docs-base` first. Generate a diagram only when it explains a relationship,
sequence, state change, hierarchy, or architecture more clearly than prose.

1. Identify the host page, its enabled functional view when relevant, and the
   precise reader question the visual must answer.
2. Inventory the claims that must appear: actors, nodes, boundaries, ordered
   interactions, branches, states, relationships, cardinalities, or dates. Cite
   the evidence that supports each material claim.
3. Choose the smallest useful type and load only its production reference using
   [references/selection.md](references/selection.md).
4. Use Mermaid when it expresses the model cleanly. Use standalone SVG for a
   visual whose spatial layout carries meaning, and PlantUML only for a concrete
   Mermaid limitation in an already supported rendering pipeline.
5. Keep labels identical to their canonical page. Link process, scenario, UI,
   and technical owners instead of copying their complete descriptions into the
   diagram.
6. Add a short caption and text summary beside the visual. Add a legend whenever
   shape, color, line style, or grouping is not self-evident.
7. Render or preview the result, then run
   [references/consistency.md](references/consistency.md). Surface a
   contradiction instead of silently changing either source.
8. Apply [references/review-criteria.md](references/review-criteria.md) before
   handoff.

## Load production guidance only when needed

- Sequence or branching flow: [references/sequence-flow.md](references/sequence-flow.md).
- C4-style context, container, component, dependency, or deployment view:
  [references/architecture.md](references/architecture.md).
- Domain/class, ER, or state model:
  [references/data-state.md](references/data-state.md).
- Stakeholder/risk map, KPI comparison, paired current/target process, or
  roadmap: [references/business-visuals.md](references/business-visuals.md).
- PlantUML fallback: [references/plantuml.md](references/plantuml.md), and only
  after selection establishes why Mermaid is insufficient.

An anchor is a placement hint, not proof that a diagram is useful or supported.
Remove an empty optional anchor only when the owning page permits it; otherwise
leave it unresolved and state what evidence is missing.

Do not add decorative diagrams or visual claims unsupported by evidence.
