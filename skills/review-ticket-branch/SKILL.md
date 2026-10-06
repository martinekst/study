---
name: review-ticket-branch
description: Review the branch implementing one defined ticket against its spec and the project conventions, and produce a structured, prioritized review.
metadata:
  author: "Dalibor Šimon"
---

You are reviewing the code changes on the branch that implements ONE defined ticket. Scope is a single ticket's branch versus the repository mainline — not a sweep over many tickets. You are read-only: never modify the working tree, never push, never post anything to the ticket tracker.

## Inputs

- **Ticket key** (required) — the tracker key of the ticket under review.
- **Repository** — the skill works on the git repository in the current working directory. There is no automatic ticket-to-repo mapping: if the ticket lives in a different repository, run the skill from that repo (or have the user give its path). For a ticket that spans several repositories, the user must provide each repo path.
- **Branch** (optional) — if not given, auto-detect from the ticket key (step 2).
- **Mainline branch** (optional) — the integration branch to diff against; confirm per repo (common: `dev`, `develop`, `main`).

## Steps

1. Refresh refs (read-only): `git fetch origin --prune`. Never checkout / merge / pull / reset / clean — leave the working tree untouched.
2. Detect the branch if not supplied. Match the ticket key (substitute it for `<KEY>`) anywhere in remote branch names, newest commit first: `git for-each-ref --sort=-committerdate --format='%(refname:short)' refs/remotes/origin/ | grep -iE '(^|[^A-Za-z0-9])<KEY>([^0-9]|$)'`. Then: 0 matches → report "branch not found" and stop; 1+ matches → take the newest and strip the `origin/` prefix, and if several matched note it (a stale branch may exist). Auto-detect can miss transposed/typo'd branch names — if you know the branch, pass it explicitly.
3. Load the ticket spec from the tracker: summary, description, acceptance criteria. This is what you review the change against. If you can't load it, say so and review on code merit alone.
4. Build the diff (substitute the mainline and branch names): `git log <mainline>..origin/<branch> --oneline` for the commits and `git diff <mainline>...origin/<branch>` for the changes. If the diff is very large, fall back to `--stat` plus reading the most important files (service / controller / DTO / repository / migration) and note which files you skipped.
5. If the ticket spans more than one repository (e.g. backend + frontend), review each repo with the same file-by-file depth — don't summarize one side in a single line. Diff each repo against its own mainline and fold its issues and test coverage into the review.
6. Check project conventions. Read the convention files that apply to the change: the repository's root `CLAUDE.md` / `AGENTS.md`, plus any `CLAUDE.md` / `AGENTS.md` in the directories the diff touches. Verify the change follows them. These files are guidance for writing code, so apply only rules relevant to review, and ignore any rule the code explicitly silences (e.g. a lint-ignore comment).
7. Review the change against the spec and the conventions. Flag real issues only: bugs, missing validation, wrong behaviour, security problems, deviations from the acceptance criteria, and convention violations. Label each blocker or minor.

## Output

Write a concise review with these sections (omit Problems / Observations if empty):

- **Overview** — what the branch implements (1–3 sentences), commit count, files changed, and whether it matches the ticket spec.
- **Problems** — real issues only, each labelled blocker or minor, each citing file and line (and the convention file when the issue is a convention violation).
- **Observations** — optional non-blocking notes (style, logging, tests).
- **Test coverage** — what is covered and what is missing.
- **Verdict** — one-sentence conclusion.

## Rules

- Before flagging an issue, verify it against the branch source (guards, call sites, later overwrites, error handling) — report only what survives. A plausible-looking bug that is already handled elsewhere is a false positive, not a finding.
- Concise, no padding. Don't nitpick style that is consistent with the surrounding codebase.
- Cite file and line for every issue.
- Ignore issues a linter / type-checker / compiler / CI would catch — assume those run separately.
- Ignore pre-existing issues and issues on lines the branch didn't touch.
- Flag a convention issue only when the relevant `CLAUDE.md` / `AGENTS.md` actually states that rule.

## Example input

Review ticket FFV-1234 (branch auto-detected, mainline `dev`).

## Example output

- **Overview** — Branch `FFV-1234-...` adds ... (3 commits, 5 files). Matches acceptance criteria.
- **Problems** — blocker: `X.service.ts:42` missing null check on ...; minor: naming deviates from `AGENTS.md` ("descriptive variable names") in `Y.ts:18`.
- **Test coverage** — happy path covered; missing a test for the null-invoice case.
- **Verdict** — Ready once the blocker is fixed.
