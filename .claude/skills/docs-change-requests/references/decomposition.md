# Change decomposition

Decompose only the requested and evidenced scope. A `create` operation may start
from an agreed target; an extension compares the target or implementation with
the current canonical documentation; a backfill documents implemented behavior
that is already in declared scope. These are run operations, not portal states.

## Outcome groups

One group owns one user- or operator-observable outcome that can be understood,
accepted, and normally delivered independently. Start a separate group when the
outcome has its own acceptance boundary, rollout decision, or failure impact.
Merge items when one has no useful result without the other or they are variants
of the same outcome.

Do not create a group merely for a repository, component, team, or cosmetic edit.
Those are implementation slices or small page changes unless they produce a
separate observable result.

For each proposed group record:

- outcome and explicit exclusions;
- affected scenarios, processes, screens, rules, interfaces, and tests;
- current vs target behavior where applicable;
- dependencies and whether they block build, runtime, acceptance, or rollout;
- end-to-end acceptance and failure/recovery expectations;
- implementation evidence or target-source reference;
- required implementation slices and design-detail owners.

Dependencies must be directional and acyclic. “Prefer to ship together” is not
a dependency. If two groups require each other, re-slice the shared prerequisite
or combine the outcomes.

## Implementation slices

A task is a coherent unit with one primary responsibility and observable
completion. Typical slices are UI/client, service/business logic, data/migration,
integration, configuration, infrastructure/operations, tests, and documentation.
Use the categories as prompts, not a required checklist.

Split a slice only when its pieces can be implemented or verified separately.
Do not estimate task size by arbitrary day limits. Each acceptance statement
must be verifiable through a test, implementation/configuration artifact,
operational observation, or explicit approval evidence. Replace “works”,
“looks right”, and “performance is acceptable” with the specific behavior and
measure that would prove completion.

## Existing content

Append new groups without renaming existing paths by default. Renumbering or
moving groups is a structural content migration: preview every path and backlink,
obtain approval, migrate, then validate. Never create a change package for an
already-implemented behavior when a scoped backfill of canonical documentation
is sufficient.
