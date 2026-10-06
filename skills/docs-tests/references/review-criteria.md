# Test review criteria

- The test menu preserves existing ANA paths and separates Business UAT,
  technical QA, and mocks/fixtures; structural changes are approved migrations.
- Strategy prioritizes material risks and release decisions.
- Every critical declared behavior/change has traceable verification.
- Preconditions, data, environment, and expected result are reproducible.
- Positive, negative, permission, failure, and boundary paths are considered
  where applicable.
- Each QA case has a stable unique ID, canonical source link, and direct links to
  the exact reusable mock/fixture it needs.
- Alternative-flow coverage is reciprocal when the source format supports it;
  no link points only to a broad page when a stable case anchor exists.
- Business UAT is customer-readable and outcome-focused; technical QA retains
  concrete system observations.
- Planned, automated, executed, and passed states are not conflated.
- Implementation-ready requirements are testable; as-built results have actual
  evidence references.
- Coverage summaries have a defined denominator and distinguish gaps,
  not-applicable items, blocked cases, and unknown evidence.
- Indexes link only to existing pages, payload examples contain no secrets or
  unnecessary personal data, and no test implementation code is fabricated.
