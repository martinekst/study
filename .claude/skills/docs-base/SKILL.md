---
name: docs-base
description: Resolve and validate the v2 documentation contract in docs/README.md, then provide lifecycle, section, functional-view, evidence, and resource context to documentation skills.
metadata:
  author: "Dávid Šilon"
---

# Documentation contract resolver

Load this skill before any portal artifact skill and before review. It does not
write documentation pages by itself.

## Resolve context

1. First detect a pure tf-doc-vault `tech-docs` scaffold: documentation is
   rooted at `tech-docs/docs` and the repository scripts target that root. In
   that case ANA v2 is not applicable; route to the separate technical portal
   toolchain and do not create `docs/README.md`.
2. Otherwise locate `docs/README.md` at the ANA portal root.
3. Run `node scripts/validate-contract.mjs --file=<path>` from this skill.
   For setup or review of `draft`/`review`, add `--allow-inactive`. Add
   `--allow-archived` only for an explicit historical audit or migration.
4. Stop content generation on validation errors. Treat structural mismatch
   warnings as blocking during an ordinary run; resolve them or route them to a
   controlled migration. Warnings about a not-yet-built tree are allowed only
   during approved setup or migration.
5. Combine the validated contract with the current request:
   - `operation`: `create`, `update`, `backfill`, `extend-from-spec`,
     `extend-from-code`, `migrate-contract`, `review`, or `apply-report`;
   - requested scope;
   - source references supplied or discovered for this run.
6. Note whether `CLAUDE.md` is present at the portal root, beside `docs/`. It
   holds the portal-wide invariants this skill set assumes but never restates,
   so its absence changes nothing mechanically and everything editorially.
   Report it as missing rather than failing the run; `docs-workflow` setup
   owns the repair. If absent, point at
   [the canonical copy](references/CLAUDE.md) in this skill.
7. Surface the resolved context, including that presence check, before handing
   work to another skill.

The persistent contract has only `active_version`, `lifecycle_stage`,
`deliverable_type`, `sections`, and conditional `functional_views`. Read
[references/contract.md](references/contract.md) when interpreting or changing
those values.

## Apply lifecycle and evidence

- `discovery`: support decisions; explicit alternatives and unknowns are valid.
- `implementation-ready`: describe an agreed, testable target; unresolved
  implementation blockers are defects.
- `as-built`: describe implemented behavior; code/configuration wins for the
  inspected scope and planned behavior is labelled separately.

Evidence locations and verification scope are run context. Never add them to
the README contract. Read [references/evidence.md](references/evidence.md) when
sources disagree or evidence is incomplete.

## Route resources

- Sections select their owning artifact skill.
- Functional views select resources inside `docs-functional`; the first view is
  primary.
- `offer` additionally loads [references/offer.md](references/offer.md) for
  portal-wide audience and content expectations.
- The portal-root `CLAUDE.md` is [references/CLAUDE.md](references/CLAUDE.md):
  the one canonical copy, placed verbatim beside `docs/`, never edited per
  project. Placing it is `docs-workflow` setup's job (its step 6); never
  overwrite a root `CLAUDE.md` that already exists without the user's explicit
  approval, whatever it contains.
- Diagrams, wireframes, design, prototypes, pricing, and review are selected by
  the requested artifact or actual page need, not by new README fields.

If a directly invoked artifact skill has no resolved context, return here and
reconstruct it. Do not depend on chat memory or a former command.

## Contract migrations

Read [references/operations.md](references/operations.md) before any structural
contract change. The non-negotiable invariant is: preview and approve impact,
migrate content and links, validate, then update README last.
