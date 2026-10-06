---
name: docs-pricing
description: Build traceable effort and price estimates from documented scope, assumptions, rates, risks, and alternatives, with executive integration for offer portals.
metadata:
  author: "Dávid Šilon"
---

# Pricing and effort estimation

Load `docs-base` when a portal contract exists; otherwise work from the explicit
scope supplied for this estimate. Pricing is task-triggered and is not a README
section switch.

1. Establish the scope baseline and unresolved questions.
2. Decompose deliverables into estimateable work with evidence anchors.
3. State assumptions, exclusions, dependencies, contingency, rate, tax basis,
   and rounding.
4. Calculate totals deterministically and keep estimate and price distinct.
5. Compare variants on the same basis.

Read [references/estimation.md](references/estimation.md). For an offer, also
read [references/offer.md](references/offer.md): expose the decision, scope,
price, timing, assumptions, and next step without overwhelming the executive
reader with the worksheet. Never invent numbers to make an offer look complete.

Load [references/discovery-and-breakdown.md](references/discovery-and-breakdown.md)
when scope is incomplete, [references/research.md](references/research.md) for
buy/build or unknown implementation questions, and
[references/calculation-contract.md](references/calculation-contract.md) before
creating or checking a calculation artifact. Use
[references/templates.md](references/templates.md) for new Markdown outputs.
Apply [references/review-criteria.md](references/review-criteria.md) before
handoff.
