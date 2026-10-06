---
name: tf-skills-install
description: Use when the user wants to install, update, or list TechFides AI skills from the company skills library, or to find out whether any are out of date — "install the TechFides skills", "update my skills", "do I need to update my skills", "get the newest skills from the library", "what skills do we have". Fetches and installs skills from the library via the tf-skills CLI.
metadata:
  author: "Tomáš Pokorný"
---

# Install TechFides skills

The TechFides skills library is fetched by `tf-skills`, a small CLI published as
`@techfides/tf-skills-manager` on npm. It talks to the library's GitHub repository
directly over the API — there is no clone, no `git pull`, and nothing to keep a
local checkout of. Every skill on the library's `main` branch is live and safe to
use; being merged is what says so, and there is no status field to check.

Run it with `npx`, which always resolves the latest published version:

```bash
npx @techfides/tf-skills-manager@latest list
```

`npx` needs no prior install and leaves nothing behind between runs.

## Install

```bash
npx @techfides/tf-skills-manager@latest                            # interactive: pick skills to install
npx @techfides/tf-skills-manager@latest install Dev/sonar-fix-pr   # install one skill by name
npx @techfides/tf-skills-manager@latest --all                       # install every skill
```

The `install` keyword is required whenever a skill name is passed — a bare
`npx @techfides/tf-skills-manager@latest <name>` is not recognized as
`install <name>`; without any arguments at all, and only then, the bare
invocation defaults to `install`'s interactive picker.

`install`, `update` and `check` first ask which skills directory to use: this project's
`./.claude/skills`, which is the default, or the machine-wide `~/.claude/skills`.
Without a terminal to ask on they take the project directory silently, so a
scripted or agent-driven run never blocks. For an agent that stores skills
somewhere else entirely, pass `--target` and no question is asked:

```bash
npx @techfides/tf-skills-manager@latest --target ~/.config/other-agent/skills
```

There is no separate clone step: `install` copies each skill's files straight into
`--target`, recording what it wrote so later runs can tell current from drifted.

## Update

Refresh everything already installed under a target:

```bash
npx @techfides/tf-skills-manager@latest update
```

Or refresh only specific skills by name:

```bash
npx @techfides/tf-skills-manager@latest update Dev/sonar-fix-pr
```

`update` with no names asks which of the behind-the-library skills to take, with
everything that is merely behind already selected — so an interactive run confirms
with Enter. Without a terminal it refreshes all of them without asking.

## Check without changing anything

To answer "do I need to update?" without updating:

```bash
npx @techfides/tf-skills-manager@latest check
npx @techfides/tf-skills-manager@latest check --json
```

`check` fetches no skill content and writes nothing — not the skills, not the
install record. It reports which installed skills are behind the library, which
have local edits, and which are current, and it exits `0` either way: skills being
behind is the answer, not a failure. `--json` carries `behind`, a count, so there
is no list to measure.

## List what's available

```bash
npx @techfides/tf-skills-manager@latest list
```

## Running without a TTY (as an agent, in a script)

`install`, `update`, and `list` never block on a prompt when they have everything
they need up front:

- `install` needs at least one skill name, `--bundle <name>`, or `--all` — without
  one of those and without a TTY it refuses and names the flag to pass instead.
- `update` with no names and no `--all` refreshes everything already installed
  without asking — the pick-which-ones question only appears when there is a
  terminal to ask on.
- `check` asks which directory when it has a terminal, and takes the project
  directory without asking when it does not. It never writes anything either way.
- `list` and `status` never prompt at all. Pass `--json` to `list`, `status` or
  `check` to get machine-readable output instead of the human-readable table.

## Report back

Tell the user which skills were installed or updated, and where. If a command
refused because a directory already existed and was not something the CLI
installed (`"..." already exists and is not managed by tf-skills`), or because a
locally-installed skill had edits that would be lost (`"..." has local changes
that would be lost`), report the exact path or skill name so the user can decide
whether `--force` is appropriate, or whether the `tf-skills-add` skill's
`contribute` flow is what they actually want.

## Rules

- Never edit skills once installed as part of installing or updating them. Changes
  to a skill go through a pull request; use the `tf-skills-add` skill for that.
- Never bypass the CLI by copying or editing files under the target directory by
  hand; it is what keeps `--force` refusals and `update`/`status` drift-detection
  meaningful.
- If a command reports local changes that would be lost, stop and tell the user.
  Do not silently overwrite content in a shared library on their behalf.
