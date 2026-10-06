---
name: docs-delta
description: Compare declared documentation with code, specifications, or existing content to identify coverage gaps, contradictions, and implementation drift during backfill or extension work.
metadata:
  author: "Dávid Šilon"
---

# Coverage and drift analysis

Load `docs-base` first. This skill supports temporary `backfill`,
`extend-from-spec`, and `extend-from-code` operations; it is not a persistent
portal mode.

1. Read the active contract and requested scope.
2. Build a coverage inventory of declared sections/views, actual pages, and
   supplied evidence.
3. Classify each item as covered, missing, stale, contradictory, or outside the
   declared scope.
4. Prioritize by user impact, implementation risk, and broken traceability.
5. Propose targeted owners and changes. Do not rewrite content during a
   diagnosis-only request.

Read [references/coverage.md](references/coverage.md) for the comparison model.
Read [references/scan.md](references/scan.md) for evidence probes and reverse
coverage, [references/prioritization.md](references/prioritization.md) for
severity, and [references/report-contract.md](references/report-contract.md)
when the output will be consumed by `docs-apply-report`.
Apply [references/review-criteria.md](references/review-criteria.md) before
publishing a comparison report.
When applying approved work, preserve canonical ownership and existing links;
contract changes use `docs-workflow` migration and update README last.

When declared change requests exist, use
[references/change-state-sync.md](references/change-state-sync.md) to compare
their acceptance evidence and propose state/link updates. A comparison run does
not silently update those pages.
