---
name: docs-business
description: Create or update the declared business section of an analytical portal, including evidence-backed executive context, value, stakeholders, risks, roadmap, and offer framing when applicable.
metadata:
  author: "Dávid Šilon"
---

# Business documentation

Load `docs-base` first. Write only when `business` is declared or the user has
approved adding it through a contract migration.

## Work from the contract

- Lifecycle changes certainty and evidence, not the existence of a hardcoded
  business menu.
- `documentation` uses precise explanatory language.
- `offer` requires the shared offer contract and executive tone; read
  [references/offer.md](references/offer.md).

Inspect the existing business tree before proposing pages. Preserve its
lower-level structure when it already serves the declared purpose; otherwise
use [references/structure.md](references/structure.md) as the smallest default.

Load only the detail needed for the requested pages:

- [references/evidence-scan.md](references/evidence-scan.md) when source material
  must be classified into business responsibilities;
- [references/current-target-value.md](references/current-target-value.md) for
  current/target comparisons, benefits, KPI baselines, or ROI proposals;
- [references/stakeholders-risks-roadmap.md](references/stakeholders-risks-roadmap.md)
  for decision rights, dependencies, risk treatment, or sequencing;
- [references/templates.md](references/templates.md) when creating a new page.

## Produce content

Lead with the business decision and measurable outcome. Distinguish evidence,
customer input, calculation, assumption, and unresolved question. Never invent
benefits, KPI values, prices, references, stakeholders, or dates.

Create one canonical owner for current state, target state, value, stakeholders,
risks, and roadmap. Other sections link to these facts. Use
[references/page-pattern.md](references/page-pattern.md) for a generic page and
the template library for responsibility-specific pages. Omit unsupported blocks
instead of filling them with plausible content.

Before handoff, apply [references/review-criteria.md](references/review-criteria.md)
and report evidence gaps.
