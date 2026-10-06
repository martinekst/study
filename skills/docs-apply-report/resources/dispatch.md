# Finding dispatch

Dispatch only after the user approves the individual finding. Send the owning skill enough context to reproduce the decision without inventing information:

```yaml
entry_id: F-001 | D-001
report_path: <path>
report_type: review | delta
operation: patch | drift-fix | migrate-contract
active_version: <vN>
file_target: <path and heading>
recommendation: <approved text>
evidence: <cited evidence>
```

The owning skill must return:

```yaml
applied: true | false
files_written: [<paths>]
summary: <one-line result>
evidence_rechecked: true | false
```

Keep the finding `open` unless both `applied` and `evidence_rechecked` are true.

## Routing

- Business content → `docs-business`
- Functional scenario/process/UI content → `docs-functional`
- ANA technical content → `docs-technical`
- Test strategy or traceability → `docs-tests`
- Change-request content → `docs-change-requests`
- Diagram, wireframe, design, or prototype asset → its matching artifact skill
- Pricing content → `docs-pricing`
- README contract, section/view topology, or active-version migration → `docs-workflow`

When one finding genuinely spans multiple owners, keep one primary `target-skill`. That skill coordinates required secondary updates and returns all changed paths. Do not dispatch competing edits in parallel.

## Drift fixes

For a delta finding, send the documented claim, competing evidence, lifecycle,
operation, and limitations. The resolution summary records the old claim, new
claim or retained target, and evidence reference. If authority or evidence is
ambiguous, leave the finding open.

## Structural findings

Use `operation: migrate-contract` for a change to sections, functional view order, or active version. `docs-workflow` must preview impact, obtain structural approval, migrate and validate content, then update README last. Never perform file moves under an ordinary `patch` operation.
