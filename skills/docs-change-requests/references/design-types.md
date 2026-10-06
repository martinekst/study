# Technical design inside a change package

Create a design page only when target-state mechanics are too detailed for the
group and have a clear consumer. The page temporarily owns the proposed design;
after implementation, canonical `as-built` technical documentation owns shipped
reality and the change package remains a historical rationale/traceability source.

Common design responsibilities include:

| Responsibility         | Content that warrants a separate page                             |
| ---------------------- | ----------------------------------------------------------------- |
| Interface/API          | operations, schemas, examples, validation, errors, compatibility  |
| Domain/data model      | concepts, relationships, invariants, storage mapping, migration   |
| Data mapping           | source-to-target fields, transforms, defaults, rejection behavior |
| State model            | states, transitions, guards, recovery, user-visible mapping       |
| Interaction sequence   | participants, calls/events, timing, retries, idempotency          |
| External integration   | direction, authentication, contracts, limits, failure handling    |
| Data lifecycle         | retention, archive, deletion/anonymization, legal constraints     |
| Operations/performance | load assumptions, targets, scaling, monitoring, rollback          |

This is an open list. Merge thin responsibilities, split only when ownership or
navigation improves, and do not create an empty catalogue. Functional pages own
actor goals and UI behavior; canonical technical pages own existing system
reality; tests own executable verification. Link instead of copying.

Each design page states purpose, scope, affected tasks, current constraints,
target design, alternatives/decisions, failure behavior, migration/rollback,
acceptance evidence, and related canonical pages. Examples must be realistic and
explicitly illustrative when not authoritative.
