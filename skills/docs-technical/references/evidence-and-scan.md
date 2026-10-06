# Technical evidence and scan

Read this before planning new or missing technical coverage. Scope the scan to
the requested artifact and sources that are available for the current run; do
not turn discovered paths into persistent README settings.

## Evidence precedence

| Lifecycle              | Preferred evidence                                                            | Required distinction                         |
| ---------------------- | ----------------------------------------------------------------------------- | -------------------------------------------- |
| `discovery`            | interviews, constraints, research, existing diagrams, proposals               | known fact vs option vs open decision        |
| `implementation-ready` | approved specification, ADR, interface/schema contract, acceptance constraint | agreed target vs unapproved alternative      |
| `as-built`             | code, configuration, schema, infrastructure definition, deployed observation  | inspected current state vs planned intention |

An existing page is a useful secondary source, not proof that implementation or
an agreement still matches it. When sources conflict, cite both, state the
reader impact, and leave an actionable finding rather than choosing silently.

## Scan by menu area

| Area                        | Useful signals                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| System boundary             | repository/app manifests, deployment topology, compose/orchestration files, existing context diagrams       |
| Technology overview         | dependency manifests and lockfiles, runtime files, build configuration, database/message broker definitions |
| Applications                | service/app roots, deployable manifests, package boundaries, owned schemas, route/event registrations       |
| Interfaces and integrations | OpenAPI/AsyncAPI/GraphQL schemas, controllers, clients, webhooks, event producers/consumers, partner specs  |
| Data                        | migrations, ORM/schema files, retention jobs, object storage, backup/restore definitions                    |
| Authentication/security     | identity configuration, middleware/policies, secret references, encryption controls, audit events           |
| Delivery/infrastructure     | pipeline definitions, infrastructure as code, environment overlays, DNS/certificate configuration           |
| Operations                  | logs, trace setup, metrics, dashboards, health probes, alert rules, runbooks, SLO/error-budget material     |
| Decisions/audit             | ADRs, technical-debt lists, dependency/license reports, vulnerability reports, incident records             |
| Implementation tests        | test configuration, suites, fixtures, coverage reports, pipeline gates, contract/performance harnesses      |

For each deployable application, record a working inventory before creating
folders: type (backend/frontend/mobile), current stable code if any,
reader-facing name, source boundary, exposed/consumed interfaces, owned data,
runtime/deployment unit, and evidence references. Preserve codes found in the
existing documentation even if source directory names changed.

## Claim-level evidence

- Configuration: cite the defining file/key and distinguish a default from an
  environment override. Do not print secret values.
- Interface: cite the contract or implementation that establishes method/topic,
  path/name, schema, authentication, errors, and version.
- Operational procedure: record prerequisites, the exact verified action,
  expected observation, failure/rollback behavior, and where it was verified.
- Metric or SLO: name the real signal, unit, aggregation/window, threshold,
  owner, and alert destination when known.
- ADR: separate the historical context and considered alternatives from the
  accepted choice. A proposal is not an accepted decision.
- Test: the existence of test source proves implementation, not execution or a
  passing result. A result needs run/report evidence.

Prefer stable file, schema, decision, and artifact references. Exact source line
numbers may be included when useful, but treat them as verification detail that
can age rather than as the only evidence.

## Planning result

Before writing, produce a compact inventory:

| Candidate path | Action                      | Reason/evidence       | Lifecycle label              | Link impact                |
| -------------- | --------------------------- | --------------------- | ---------------------------- | -------------------------- |
| `<path>`       | update/create/preserve/omit | `<references or gap>` | current/target/proposal/open | `<none or affected pages>` |

Omission is correct for a catalogue page with no useful evidence. If the absent
topic represents a material risk or a required implementation-ready decision,
record the gap on the nearest useful owner page.
