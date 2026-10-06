# Coverage and drift model

Create a matrix with one row per declared responsibility or canonical page:

| Item | Contract owner | Documentation | Evidence inspected | State | Action |
| ---- | -------------- | ------------- | ------------------ | ----- | ------ |

States:

- `covered` — supported and internally consistent;
- `missing` — declared responsibility has no adequate documentation;
- `stale` — evidence shows the page no longer represents the relevant state;
- `contradictory` — sources or pages disagree materially;
- `outside-scope` — real evidence but not part of the requested/declared scope.

Prioritize contradictions affecting user behavior, data, security, integration,
or acceptance before cosmetic gaps. A backfill creates missing current coverage;
an extension integrates new target/implemented behavior. Neither silently
changes the README contract.
