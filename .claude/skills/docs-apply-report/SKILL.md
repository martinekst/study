---
name: docs-apply-report
description: Process open findings from a documentation review or delta report, route approved repairs to their owning skills, preserve the audit trail, and recalculate review scores after verified changes.
metadata:
  author: "Dávid Šilon"
---

# Apply a documentation report

Treat a report as a stateful work queue. This skill coordinates decisions and updates the report; the artifact skill named by `target-skill` owns each documentation change.

## Prepare

1. Resolve the active README contract through `docs-base`.
2. Use the report named by the user, or the latest report linked from `docs/README.md`. Never guess between equally recent reports.
3. Read [report parsing](resources/parser.md). For a review report, read the authoritative [review report contract](../docs-review/resources/report-contract.md) and [review model](../docs-review/resources/review-model.md). For a delta report, read the authoritative [delta report contract](../docs-delta/references/report-contract.md). For dispatch behavior, read [dispatch](resources/dispatch.md).
4. Validate `report_type`, stable entry IDs, end markers, statuses, counts, and `consumed_by: docs-apply-report`. Stop on malformed or duplicate entries.
5. Show the selected scope and counts. Default to all `open` entries; honor a user filter by severity, dimension, target skill, or path.

## Process each finding

Present one open finding at a time with its evidence, recommendation, target skill, and score impact. Ask the user to apply it, edit the recommendation, leave it open, accept the risk, or reject it as invalid.

| Decision             | Result                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Apply / edited apply | Dispatch the approved repair. Only after the target skill confirms the change, recheck it against the cited evidence and set `fixed`. If application or recheck fails, keep `open`. |
| Leave open           | Make no content change and keep `open`. A deferral note may be appended but is not a new status.                                                                                    |
| Accept risk          | Require explicit rationale, append it verbatim, and set `accepted-risk`. Do not improve dimension ratings merely because the risk was accepted.                                     |
| Reject as invalid    | Require rationale grounded in evidence, append it verbatim, and set `rejected-invalid`. Remove it from score reasoning and caps.                                                    |

Never batch-accept findings or infer acceptance from silence. Preserve the stable ID and `target-skill` through every transition. A closed finding may be reopened with a dated reason if later evidence shows the issue has returned.

## Finish the run

1. Recount every status from the finding blocks; the body is authoritative.
2. For review reports, reassess only the dimensions affected by applied changes or invalidated findings. Fixed findings require an actual recheck. Run [score-review.mjs](../docs-review/scripts/score-review.mjs) again with all findings, then replace the stored weights, raw score, cap, final score, band, counts, and cap reasons.
3. Update the report date metadata. Set report `status: review` while any finding is open; otherwise set `published`. This status does not approve the documentation.
4. Refresh the README links to latest full and partial reviews when needed, but do not change its contract values or imply portal-wide verification.
5. Report the numbers fixed, accepted as risk, rejected as invalid, left open, and the previous/new final score.

Structural changes are never disguised as a page patch. Route section, functional-view, or active-version changes to `docs-workflow`, which follows the controlled contract migration and updates README last.
Read [structural changes](resources/structural-changes.md) for any move, split,
merge, renumber, archive, or contract migration. Read
[drift resolution](resources/drift-resolution.md) for a delta finding where the
documented target, implementation evidence, and approval history may differ.

## Boundaries

- Do not create new findings; use `docs-review` or `docs-delta`.
- Do not edit an artifact page directly when its owning skill can apply and self-check the repair.
- Do not mark a finding `fixed` before both application and evidence recheck succeed.
- Do not remove findings from the report or reuse their IDs.
- Do not write review dates, evidence scope, scores, or weights into README YAML.
