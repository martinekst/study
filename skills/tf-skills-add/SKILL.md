---
name: tf-skills-add
description: Use when the user wants to add a new skill to the TechFides skills library, or change an existing one — "add this skill to the library", "put this in tf-skills", "update the sonar skill". Creates the skill directory, commits on a branch, and opens a pull request that makes the skill usable once merged.
metadata:
  author: "Tomáš Pokorný"
---

# Add a skill to the TechFides library

Skills live in the `TechFides/tf-skills-manager` repository. A skill is one directory
containing `SKILL.md` plus any supporting files. Anyone can add one or change an
existing one; it goes in as a pull request, and merging that PR to `main` is what
makes the skill usable.

Both steps below go through `tf-skills`, the CLI published as
`@techfides/tf-skills-manager` on npm and run with `npx`. It talks to GitHub's API
directly — there is no clone, no branch to check out by hand, and no `git push`.

## 1. Gather what you need

- Skill name, lowercase and hyphenated. This becomes the directory name.
- Target section: `QA`, `PM`, `Dev`, `Analysis`, or `Shared`.
- A one-sentence description stating **when an agent should use the skill**.
- The author's full name — whoever the skill is *from*, which is not always the
  person asking you. Ask if it is not clear; `new` otherwise falls back to the
  machine's git `user.name`, which may be somebody else entirely.
- The instructions themselves.
- Any supporting files, with their relative paths.

Take these from what the user already gave you; only ask about what is genuinely
missing.

## 2. Scaffold the skill locally

For a brand-new skill:

```bash
npx @techfides/tf-skills-manager@latest new <skill-name> --section <section> --author "<Full Name>"
```

This writes `<skill-name>/SKILL.md` under the local skills target (default
`./.claude/skills`, under the current folder; pass `--target` for anywhere else)
with `name`, `description` and `metadata.author` frontmatter and a placeholder
body, and records it locally as not yet part of the library. `new` needs no GitHub
token — it never talks to the network.

Pass `--author` whenever you know whose skill it is. Without it, `new` uses the
machine's git `user.name`, so a skill written on someone else's behalf would be
attributed to the wrong person. The author shows up in `tf-skills list` and in the
install picker, so getting it wrong is visible to everyone.

Then edit that `SKILL.md` in place: fill in the real description and write the
instructions themselves, for an agent, explicit and unambiguous. Add any
supporting files at natural relative paths inside the same skill directory —
locally this is a **flat** layout, with no section segment:

```
my-skill/SKILL.md
my-skill/resources/checklist.md
my-skill/scripts/run.py
```

The section (`--section <section>` above) is recorded only as local metadata;
`contribute` (step 3) prepends it to build the `<section>/<skill-name>/...`
path each file lands at in the pull request. Do not create a section
subdirectory locally — a file written under one (e.g.
`Dev/my-skill/resources/checklist.md`) is outside `my-skill/` entirely and
`contribute` never sees it, so it would silently be missing from the PR.

`name` must equal the directory name. Include only `name` and `description` —
never `role`, `version`, `author`, or `status`. The section is metadata
recorded locally and prepended at PR time, not a directory you create — git
records the author and history, and being merged to `main` is the status.

For a change to a skill that is already installed, edit its `SKILL.md` (or
supporting files) directly under the target directory — there is no separate
scaffolding step for an edit. A file you delete locally is deleted in the pull
request too, and a renamed file appears as the new path plus the removal of the
old one.

## 3. Contribute it as a pull request

```bash
npx @techfides/tf-skills-manager@latest contribute <skill-name>
```

This validates the skill against the same contract the library validator (`pnpm validate`) checks
in CI, then creates the commit and pull request directly through GitHub's API: no
local git branch, no `git push`. If a PR for this skill is already open, it
reports that PR's URL instead of opening a duplicate one.

A validation failure is reported before anything is written — fix every issue
named and re-run `contribute`. It reports only failures that block CI; it never
reports warnings. CI itself warns, without blocking, when a skill references a
supporting file that does not exist, so write every file you reference inside
the skill directory before contributing.

If `contribute` fails for a reason other than validation (for example, no GitHub
token available), it names the fix — typically `gh auth login`, or setting
`GITHUB_TOKEN`. Report that to the user rather than trying to work around it.

## 4. Report back

Tell the user:

- The PR URL `contribute` printed.
- That the skill becomes installable for everyone once the PR is merged.
- That nobody is assigned to review it, so merging is theirs to do — and that a
  second opinion is worth asking for when the skill is outside their own area.

## Rules

- Always a pull request, never a direct push to `main`. That is what gives the
  change a diff, somewhere to comment, and a CI run before anyone installs it.
- Changing an existing skill needs a PR for the same reason.
- Retiring a skill is a PR that deletes its directory. Git keeps the history.
- Write for an agent: explicit and unambiguous. Agents follow instructions
  literally, and vague wording produces inconsistent behaviour.
- No secrets in a skill: no passwords, tokens, internal URLs, or personal data.
