# Repository and system scan

Start with cheap, authoritative signals, then deepen only where classification
or an interaction remains unclear:

1. repository metadata and purpose statement;
2. manifests, workspace files, deployment/configuration, and entry points;
3. public routes/events/commands, clients, schemas, migrations, and jobs;
4. tests, runbooks, ownership files, release history, and CI/CD;
5. service-specific documentation and inspected runtime evidence.

For each repository/system capture:

| Fact                 | Evidence standard                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| Purpose              | source statement or demonstrated public behavior; not name alone                                       |
| Type                 | observed role such as application, service, library, data job, infrastructure, documentation, or model |
| Product/domain       | supported relationship; keep unknown when grouping is only inferred                                    |
| Stack/runtime        | manifest/config/entrypoint evidence and relevant version                                               |
| Interfaces           | provided and consumed operations/events/data with locations                                            |
| Data responsibility  | stores/entities/sensitivity only when observed                                                         |
| Deployment/operation | targets, environments, schedules, monitoring where evidenced                                           |
| Ownership signal     | CODEOWNERS, metadata, maintainers, or explicit documentation; never guessed                            |
| Activity/lifecycle   | dated release/commit/deployment evidence and confidence, not repository age alone                      |
| Evidence             | path/URL, revision, and snapshot date                                                                  |

Use an open type vocabulary because a repository can hold several roles. For a
monorepo, describe independently deployable or reusable units when consumers
need that resolution; do not create a card for every folder.

Activity indicators are not equivalent to production status. Recent commits may
be maintenance only; an unchanged service may be stable and active. Label the
observed signal and confidence rather than declaring `active`, `deprecated`, or
`production` without supporting evidence.

At the end of the scan surface inaccessible repositories, ambiguous boundaries,
and inferred product groupings before using them in an impact conclusion.
