# Test strategy and traceability

Start with the release or acceptance decision, material risks, and canonical
source IDs. Then choose the smallest combination of levels that can prove the
required outcomes and isolate failures.

## Coverage dimensions

- business acceptance and end-to-end process outcomes;
- scenario happy paths, alternatives, business rules, and error states;
- screen states, validation, permissions, accessibility, and responsive needs;
- interfaces, contracts, data transitions, concurrency, and idempotency;
- external failures, timeouts, retries, resilience, security, and privacy;
- change regression, migration, rollback, compatibility, and feature rollout;
- deployment, observability, recovery, and operational verification where
  release risk requires them.

## Selecting levels

| Level                  | Best suited to                                                   | Typical evidence                             |
| ---------------------- | ---------------------------------------------------------------- | -------------------------------------------- |
| Unit/component         | rules, validators, transformations, isolated UI/component states | test source plus run report                  |
| Integration            | database/adapters, policies, queues, service boundaries          | isolated environment run and observations    |
| Contract               | provider/consumer compatibility, schemas, message evolution      | contract artifact and verifier result        |
| End-to-end             | a small set of critical user/process outcomes                    | controlled full-path run                     |
| Performance/resilience | capacity, latency, failure/recovery behavior                     | workload/fault model and timestamped result  |
| Security/accessibility | specialized controls and user barriers                           | tool/manual protocol and scoped finding set  |
| Business UAT           | customer acceptance of business outcomes                         | signed/recorded outcome with source trace    |
| Exploratory/manual     | novel risk, usability, visual or hard-to-automate behavior       | charter, environment, observations, decision |

Do not force every behavior through every level. Use lower levels for broad,
fast deterministic coverage and reserve expensive end-to-end paths for
critical outcomes and boundary integration. Name tools only when the existing
stack, approved target, or inspected harness supports them.

## Environments and data

For each level, define environment boundary, deployable version, external
dependencies, identity/role, starting data, cleanup/reset, secrets handling,
and evidence retention. Use synthetic or safely controlled data. Never place
production credentials or unnecessary personal data in documentation,
fixtures, screenshots, or embedded payloads.

Mocks, stubs, simulators, and fixtures must match the behavior each case needs,
including error and timing behavior. State what the substitute cannot prove and
which smaller set of tests must use a real dependency.

## Traceability model

Use one source-to-coverage inventory as the strategy owner:

| Source link/ID | Risk or behavior | Planned level | Case/evidence link | State | Gap/owner |
| -------------- | ---------------- | ------------- | ------------------ | ----- | --------- |

Allowed state meanings:

- `planned`: designed but not known to be implemented;
- `implemented`: test source/harness exists, with no run claim;
- `executed-passed` or `executed-failed`: supported by a scoped run result;
- `blocked`: cannot run or complete, with a named reason/owner;
- `not-applicable`: reviewed and intentionally excluded, with rationale;
- `unknown`: evidence was unavailable or not inspected.

Do not turn `implemented` into `passed`, derive coverage percentage from an
unreviewed file count, or use a dashboard without recording its scope and time.

## Prioritization and exit decisions

Assign priority from impact, likelihood, detectability, change surface, and
recovery cost. Define which cases or evidence gate release and who can accept a
residual risk. A numeric target is useful only when its numerator, denominator,
scope, and decision consequence are explicit.

Lifecycle changes the claim:

- Discovery documents risks, feasibility, unknown testability, and decisions.
- Implementation-ready defines planned reproducible acceptance and blocking
  gaps; it does not claim implementation or execution.
- As-built reports the inspected implementation and actual result artifacts,
  while labelling planned and stale coverage separately.
