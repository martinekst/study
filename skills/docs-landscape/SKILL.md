---
name: docs-landscape
description: Produce a standalone, evidence-backed landscape of repositories, systems, ownership signals, dependencies, interactions, and change impact across a portfolio.
metadata:
  author: "Dávid Šilon"
---

# Repository and system landscape

This is a standalone capability. Do not require or modify the portal README
contract unless the user explicitly asks to link the resulting landscape.

1. Confirm repositories/systems and access boundaries.
2. Capture verifiable inventory facts and evidence references.
3. Model dependencies and business/technical interactions.
4. Separate observed relationships from inferred or unknown relationships.
5. Summarize impact and ownership gaps top-down.

Read [references/structure.md](references/structure.md) for outputs and
[references/scan.md](references/scan.md) before classifying repositories or
systems. Read [references/interactions-impact.md](references/interactions-impact.md)
for relationship and impact work, and
[references/inventory-schema.md](references/inventory-schema.md) only when a
machine-readable handoff has a named consumer. Use
[references/templates.md](references/templates.md) for new Markdown outputs.
Apply [references/review-criteria.md](references/review-criteria.md) before handoff.
Never treat a folder name or dependency declaration alone as proof of runtime
ownership or production interaction.
