# Review model `docs-review-v2`

The score is an advisory summary of the recorded review scope. Findings and evidence remain authoritative.

## Dimensions and rating anchors

Rate every dimension with one integer from `0` to `4`.

| Rating | Meaning                                                                  |
| -----: | ------------------------------------------------------------------------ |
|      4 | Complete and reliable for the declared scope; no material issue remains. |
|      3 | Usable with minor gaps that do not create dangerous ambiguity.           |
|      2 | Material gaps or ambiguity require revision before relying on it.        |
|      1 | Seriously incomplete, inconsistent, or unreliable.                       |
|      0 | Absent where required, contradicted by evidence, or unusable.            |

| Dimension key              | Assess                                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `evidence_correctness`     | Accuracy, source support, current/proposed separation, and stage-appropriate evidence.                           |
| `declared_scope_coverage`  | Coverage of the README-declared sections/views and their applicable criteria.                                    |
| `traceability_consistency` | Consistency and usable links among requirements, processes, scenarios, UI, technical detail, tests, and sources. |
| `reader_value_top_down`    | Outcome-first orientation, progressive detail, audience fit, and decision usefulness.                            |
| `maintainability`          | Clear canonical ownership, low duplication, understandable structure, and actionable maintenance cues.           |

Rate quality directly from evidence. Finding counts can inform a rating but do not mechanically determine it.

## Weights

| Lifecycle stage        | Evidence / correctness | Declared-scope coverage | Traceability / consistency | Reader value / top-down | Maintainability |
| ---------------------- | ---------------------: | ----------------------: | -------------------------: | ----------------------: | --------------: |
| `discovery`            |                     25 |                      25 |                         20 |                      20 |              10 |
| `implementation-ready` |                     30 |                      25 |                         25 |                      10 |              10 |
| `as-built`             |                     35 |                      20 |                         20 |                      15 |              10 |

For `deliverable_type: offer`, subtract five points from `traceability_consistency` and add five to `reader_value_top_down`. No README value may override these weights.

Calculate the raw score as:

`round(sum(dimension rating / 4 × resolved dimension weight))`

## Finding states and caps

| Status             | Required evidence                                                   | Scoring behavior                                                                                                                   |
| ------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `open`             | Current finding evidence and recommendation                         | An open blocker caps the final score at 49; otherwise an open major caps it at 79. Open minors do not cap.                         |
| `fixed`            | Applied-change summary and `rechecked: true` against cited evidence | No cap. Recalculate affected dimension ratings after recheck.                                                                      |
| `accepted-risk`    | Explicit non-empty rationale                                        | Remains score-relevant and visible. Do not raise the dimension rating merely because it was accepted; its severity cap is removed. |
| `rejected-invalid` | Explicit non-empty rationale showing why the finding was invalid    | Retained for audit but excluded from scoring and caps.                                                                             |

The only valid severities are `blocker`, `major`, and `minor`. A blocker cap takes precedence over a major cap.

### Contract-sensitive severity anchors

Use consequence, not keyword matching, but keep these defaults consistent:

| Condition                                                                                    | Default | Escalate to blocker when                                                                                                               |
| -------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| A declared section or functional view is missing from a full review scope                    | `major` | the portal presents itself as complete and the omission is likely to cause a materially wrong decision, implementation, or test result |
| An offer contains an unsupported benefit, reference, price, timing, or certainty claim       | `major` | the claim is central to the commercial decision or materially misleading                                                               |
| `as-built` content is stale or contradicted by inspected implementation/configuration        | `major` | following it is likely to cause unsafe operation or a materially wrong implementation/decision                                         |
| An `implementation-ready` requirement cannot be tested or has a blocking decision unresolved | `major` | the core outcome cannot be implemented or accepted reliably                                                                            |

A bounded broken link, wording issue, or isolated optional gap is normally `minor`.
Document the actual consequence when overriding a default.

## Bands

| Final score | Band                     |
| ----------: | ------------------------ |
|      90–100 | `Ready`                  |
|       80–89 | `Ready with minor fixes` |
|       60–79 | `Revise before approval` |
|        0–59 | `Not ready`              |

The final score is `min(raw score, applicable cap)`. Report both numbers and the IDs that caused a cap.

## Calculator input

Pass JSON to `scripts/score-review.mjs` through `--input <path>` or standard input:

```json
{
  "lifecycleStage": "as-built",
  "deliverableType": "documentation",
  "dimensions": {
    "evidence_correctness": 3,
    "declared_scope_coverage": 4,
    "traceability_consistency": 3,
    "reader_value_top_down": 4,
    "maintainability": 3
  },
  "findings": [
    {
      "id": "F-001",
      "severity": "major",
      "status": "open",
      "targetSkill": "docs-functional"
    }
  ]
}
```

The calculator rejects unknown values, duplicate IDs, non-integer ratings, accepted risks without rationale, rejected findings without rationale, and fixed findings without `rechecked: true`.
