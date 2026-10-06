# Delta report contract

Use this format when findings will be applied later. A delta report is not scored;
review scoring belongs to `docs-review`.

```yaml
---
title: Documentation delta — <scope>
status: review
updated_at: <YYYY-MM-DD>
report_type: delta
consumed_by: docs-apply-report
comparison_date: <YYYY-MM-DD>
operation: backfill | extend-from-spec | extend-from-code
scope_paths: [<documentation paths>]
excluded_paths: [<known exclusions>]
evidence_refs: [<source and revision/tag where relevant>]
contract:
  active_version: <vN>
  lifecycle_stage: discovery | implementation-ready | as-built
  deliverable_type: documentation | offer
  sections: [<declared sections>]
  functional_views: [<declared views when applicable>]
finding_counts:
  total: <integer>
  open: <integer>
  fixed: <integer>
  accepted_risk: <integer>
  rejected_invalid: <integer>
---
```

Body order: decision summary; coverage matrix; findings grouped by status and
severity; inspected evidence and limitations.

```markdown
### D-001 — <Short actionable title>

- **Status:** open
- **Severity:** blocker | major | minor
- **Gap kind:** missing | stale | contradictory | broken-traceability | uncovered-evidence
- **Location:** `<documentation path>` — `<heading or responsibility>`
- **Target skill:** <one owning skill>

**Documented claim:** <exact claim, or declared responsibility that is absent>.

**Competing evidence:** <path/revision/location and what it demonstrates>.

**Limitations:** <uninspected or ambiguous evidence; `none known` only after checking>.

**Recommendation:** <observable repair without silently changing the contract>.

<!-- D-001:end -->
```

Use stable, never-recycled `D-NNN` IDs. Status values and resolution appendices
match the review report contract: `open`, `fixed`, `accepted-risk`, and
`rejected-invalid`. Preserve every block for audit. Set report `status: review`
while any finding is open and `published` when none is open; publication is not
documentation approval.
