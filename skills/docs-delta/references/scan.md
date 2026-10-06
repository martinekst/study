# Coverage and drift scan

## Build both inventories

Start with the documentation side: contract responsibilities, actual canonical
pages, claims, links, acceptance statements, and explicit exclusions. Then build
an evidence-side inventory only for the requested scope. Depending on lifecycle
and operation, evidence may include implementation/configuration, an approved
specification, interviews, designs, test results, or existing documentation.

Probe likely surfaces rather than relying on filenames alone:

- user behavior: routes, commands/actions, forms, validation, roles, states, and
  failure messages;
- interfaces: endpoints/events, schemas, examples, compatibility, authentication,
  retries, and idempotency;
- data: entities, fields, constraints, migrations, retention, and deletion;
- operations: configuration, deployment, health checks, monitoring, alerts,
  schedules, feature flags, and rollback;
- tests: assertions and fixtures that prove or contradict documented behavior;
- commercial/business claims: the cited source, baseline, target, calculation,
  period, and current validity.

Map evidence to a canonical owner only when the relationship is demonstrable. A
shared utility or infrastructure control may affect many pages; classify it as a
shared surface rather than arbitrarily assigning it to one scenario or service.

## Compare in both directions

For every documentation claim ask whether inspected evidence supports,
contradicts, narrows, or cannot establish it. For every material evidence surface
ask whether the declared portal scope has an adequate canonical explanation.

Absence from a search result is not proof of absence. Before reporting a missing
implementation, consider generated code, aliases, configuration, deployments,
external systems, and inaccessible repositories. Record the limitation.

Classify the result using `coverage.md`. Use `stale` only when evidence actually
contradicts or supersedes the page; use `missing` for an uncovered declared
responsibility; use `outside-scope` for real behavior the current request or
contract intentionally excludes.

## Non-functional claims

A measurable performance, availability, durability, capacity, security, or
recovery claim needs both a mechanism/test and, where ongoing assurance matters,
an observable metric or control. A mechanism alone does not prove its target.
Flag vague adjectives, unsupported thresholds, and missing monitoring separately.

## Finish

Deduplicate findings by canonical owner and root cause. Keep the exact documented
claim, competing evidence, inspected revision, limitations, and repair target.
Do not modify content during a diagnosis-only request.
