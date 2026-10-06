# Session learning workflow

## 1. Establish the evidence set

Use only feedback the user supplied or explicitly selected: the request, source
material, generated result, correction/approval, and relevant tool outcome. A
transcript, maintainer issue, or structured note may be used, but v2 has no
command-owned session-note store.

For each candidate capture the smallest excerpt that preserves meaning and the
artifact/rule it appears to concern. Do not infer a complaint from ordinary
editing or treat silence as approval.

## 2. Classify before proposing a skill change

Classify the cause as missing evidence, project-specific preference, execution
mistake, orchestration/routing issue, wrong rule owner, ambiguous instruction,
reusable skill defect, or deterministic-tool defect. Missing evidence and local
preference normally change the project output or run context, not a shared skill.

Group duplicates and surface contradictions. Keep opposing feedback separate
until the user decides whether it reflects different contexts or a true rule
conflict.

## 3. Locate the owner and blast radius

Find the single semantic owner, every reference to it, affected examples/tests,
and bundle dependency implications. A universal portal rule may belong in the
compact v2 `CLAUDE.md`; task routing belongs in `docs-workflow`; contract meaning
belongs in `docs-base`; artifact behavior belongs in its skill; deterministic
logic belongs in a script/test.

Read the original skill-creator instructions before editing any skill. Do not
create a new global rule merely to fix one example.

## 4. Decide and apply one entry at a time

Show evidence, diagnosis, proposed owner, exact behavioral change, affected
files, risks, and a minimal patch preview. Obtain explicit approval for each
material change. Apply only the approved scope and preserve unrelated edits.

If a supplied note has its own status fields, update them only after the patch
and validation succeed; preserve the original entry and rationale. Otherwise
return a decision log without inventing a persistent note format.

## 5. Validate behavior

Run structural/link validation on every affected skill. Add or update a
deterministic test only for deterministic behavior. Forward-test complex
instruction changes with a realistic request that does not reveal the expected
answer, then inspect the artifact and decisions rather than checking for exact
phrasing.

Finish with applied, rejected, deferred, and duplicate counts; changed owners;
validation results; remaining contradictions; and behavior intentionally left
unchanged.
