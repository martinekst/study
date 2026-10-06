# Review report contract

Use Markdown with YAML frontmatter. The report is both a readable assessment and the stateful input for `docs-apply-report`.

## Frontmatter

```yaml
---
title: Documentation review — <scope>
status: review
updated_at: <YYYY-MM-DD>
report_type: review
review_model: docs-review-v2
consumed_by: docs-apply-report
review_date: <YYYY-MM-DD>
review_scope: full | partial
scope_paths: [<reviewed paths>]
excluded_paths: [<known exclusions>]
evidence_refs: [<path, repository commit/tag, specification, or supplied source>]
contract:
  active_version: <vN>
  lifecycle_stage: discovery | implementation-ready | as-built
  deliverable_type: documentation | offer
  sections: [<declared sections>]
  functional_views: [<declared views, when functional is enabled>]
weights:
  evidence_correctness: <integer>
  declared_scope_coverage: <integer>
  traceability_consistency: <integer>
  reader_value_top_down: <integer>
  maintainability: <integer>
dimension_scores:
  evidence_correctness: <0-4>
  declared_scope_coverage: <0-4>
  traceability_consistency: <0-4>
  reader_value_top_down: <0-4>
  maintainability: <0-4>
raw_score: <0-100>
score_cap: <49 | 79 | null>
score_cap_reasons: [<F-NNN IDs, or empty>]
final_score: <0-100>
score_band: Ready | Ready with minor fixes | Revise before approval | Not ready
finding_counts:
  total: <integer>
  open: <integer>
  fixed: <integer>
  accepted_risk: <integer>
  rejected_invalid: <integer>
---
```

Map calculator output without reinterpretation: `rawScore` → `raw_score`, `appliedCap` → `score_cap`, `capReasons` → `score_cap_reasons`, `finalScore` → `final_score`, `band` → `score_band`, and the camel-case status counts to their snake-case fields above.

Use `status: review` while any finding remains `open`; use `published` when none is open. Report status is not approval of the documentation.

## Body order

1. **Decision summary** — final/raw score, band, cap and its finding IDs, the most important risks, and full/partial scope.
2. **Dimension assessment** — rating, resolved weight, evidence-based explanation, and affected finding IDs for each dimension.
3. **Findings** — `open`, `fixed`, `accepted-risk`, then `rejected-invalid`; severity descending inside each group.
4. **Coverage and evidence** — inspected and excluded paths, source references, and limitations.

## Finding block

```markdown
### F-001 — Short actionable title

- **Status:** open
- **Severity:** major
- **Dimensions:** evidence_correctness, traceability_consistency
- **Perspectives:** developer, QA
- **Location:** `docs/v2/...md` — `## Heading`
- **Target skill:** docs-functional

**Finding:** One-sentence problem statement.

**Evidence:** Exact document/source citation and what it demonstrates.

**Recommendation:** Concrete repair with an observable result.

<!-- F-001:end -->
```

Every entry needs a matching end marker. Preserve the whole block and ID across transitions. Append, as applicable:

```markdown
**Resolution:** <date>; <change summary>; rechecked against <evidence>.
**Rechecked:** true
```

```markdown
**Risk rationale:** <explicit user-approved rationale>
```

```markdown
**Invalid rationale:** <why evidence proves the finding invalid>
```

For `accepted-risk`, keep the finding in the dimension assessment. For `rejected-invalid`, remove it from dimension reasoning and caps while retaining its audit block.

## Severity

- `blocker`: misleading or contradictory content likely to cause a wrong decision, implementation, or test result.
- `major`: a material gap creates unsafe ambiguity or makes the declared purpose unusable.
- `minor`: a bounded improvement that does not prevent reliable use.

For a re-review, match issues by meaning, canonical owner, and location rather than title text alone. Never recycle a retired `F-NNN` ID.
