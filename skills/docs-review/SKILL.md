---
name: docs-review
description: Review an ANA documentation portal or a selected part of it against its README contract and evidence, then produce traceable findings and an advisory 0–100 quality score.
metadata:
  author: "Dávid Šilon"
---

# Documentation review

Review documentation without editing it. The report is an evidence-backed work queue for `docs-apply-report`; its numeric score summarizes quality but never replaces the findings.

## Required context

1. Use `docs-base` to validate `docs/README.md` and resolve the active version, lifecycle stage, deliverable type, enabled sections, and functional views.
2. Establish a **full** review of the active version or a clearly bounded **partial** review. Record exact included and excluded paths.
3. Record the evidence actually inspected. For code evidence include repository and commit/tag when available. README `updated_at` is page-edit metadata, never a verification date.
4. Read [the review model](resources/review-model.md), [perspectives](resources/perspectives.md), and [report contract](resources/report-contract.md). Also read each enabled artifact skill's review criteria when that skill provides them.

An archived README contract is inactive. It may be audited, but the report must say that no active-documentation conclusion is being made. Draft and review contracts may be reviewed even though they block content generation.

## Review

Apply all four qualitative perspectives: CEO, PM, developer, and QA. Perspectives help discover and explain issues; they do not carry score weights.

Assess only the declared scope and applicable contract behavior:

- `discovery`: decision clarity, alternatives, unknowns, and scope boundaries;
- `implementation-ready`: unambiguous, traceable, implementable, and testable requirements;
- `as-built`: agreement with inspected implementation evidence and explicit separation of current and proposed behavior;
- `offer`: decision-first structure, credible benefits, explained technical language, commercial completeness, and no unsupported claims;
- functional multi-view portals: one canonical owner for shared facts and reciprocal links among process, scenario, and UI pages.

Create one finding per independently actionable issue. Merge duplicate observations from multiple perspectives and record every contributing perspective.

Each finding must have:

- a stable, never-reused `F-NNN` ID;
- `status: open` when first created;
- `severity: blocker | major | minor`;
- one or more affected scoring dimensions;
- perspective(s), exact location, evidence, and concrete recommendation;
- a valid `target-skill` that owns the repair, or `docs-workflow` for a contract/structural migration.

Do not invent evidence. A missing item is evidence only when the README contract, an applicable artifact criterion, or an authoritative source requires it.

## Score and report

Rate each of the five dimensions from integer `0` to `4` using the anchors in the review model. Rate the reviewed scope as it exists after excluding `rejected-invalid` findings; do not average perspective opinions or derive the rating merely by counting findings.

Run the deterministic calculator with the contract, dimension ratings, and all findings. Copy its weights, raw score, cap, final score, band, counts, and cap reasons into the report. The calculator at [score-review.mjs](scripts/score-review.mjs) is authoritative for arithmetic.

Write the report using the report contract. Store it in the portal's established review area; for a new v2 portal use `docs/<active_version>/reviews/review-<YYYY-MM-DD>[-NN].md`. Refresh only the README body's latest full/partial review links and, because README was edited, its page-level `updated_at`; do not change the `documentation` object. Preserve prior findings when re-reviewing:

- match the same issue to its existing ID;
- retain its audit trail and current status;
- reopen it with a dated reason if evidence shows the issue has returned;
- allocate new IDs above the highest ID ever used in that report lineage.

A partial review score describes only its recorded scope and cannot support lifecycle promotion. A lifecycle promotion must refer to the latest full review and disclose any score below the recommended band or any open cap; the score itself never blocks a user-authorized change.

## Boundaries

- Do not edit reviewed artifact content during review; only the report and README's review links are writable outputs.
- Do not persist review scope, evidence paths, weights, scores, or dates in `docs/README.md`.
- Do not let an accepted risk improve a dimension rating. It removes its severity cap only after explicit rationale.
- Do not score a rejected-invalid finding. Keep it in the audit trail.
- Do not mark a finding fixed until the change has been rechecked against its evidence.
