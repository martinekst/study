---
name: sonar-fix-pr
description: List and fix all open SonarQube quality gate issues on a given pull request.
metadata:
  author: "Filip Koukal"
---

# SonarQube — Fix PR Issues

Fetch every open SonarQube issue on a pull request and fix them directly in the source code. Commit only the files you touched.

## Step 1: Resolve the PR ID

If the user did not provide a PR ID, ask for it before doing anything else.

## Step 2: Resolve the project key

Check in this order:

- sonar.projectKey in sonar-project.properties at the repo root
- The sonar CLI's stored default project (run sonar config get, or inspect ~/.config/sonarqube-cli/config.json)

If neither yields a key, ask the user: What is your SonarQube project key?

## Step 3: List all open issues

Run: sonar list issues -p <project-key> --pull-request <PR-ID> --format toon

Parse the output. Keep only issues where status is OPEN or REOPENED. Discard CLOSED and FIXED issues — they are already resolved.

Group the remaining issues by file so you read and write each file only once.

## Step 4: Fix each issue

Fix every issue directly — do not invoke /sonarqube:sonar-fix-issue. That saves time, tokens, and round trips.

Read each affected file once, apply all the fixes for that file in a single pass, then write it back.

Common fix patterns:

- S2325 / CA1822 — Add static to the method or property declaration.
- S3267 — Replace the foreach + manual if filter with a .Where() LINQ call.
- S6607 — Move .Where(...) before .OrderBy(...) in the LINQ chain.
- S1144 — Delete the unused private method, property, or field entirely.
- S3008 — Rename the field to follow the configured naming convention.
- S1481 — Remove the unused local variable.
- S108 — Add a comment or throw explaining the intentionally empty block.

Apply the minimal change that resolves the issue. Do not reformat surrounding code, rename unrelated identifiers, or introduce abstractions beyond what the rule requires.

When to ask before fixing — stop and ask the user for any issue that requires a meaningful structural change:

- csharpsquid:S3776 — Cognitive Complexity too high (splitting methods).
- Any fix that changes a public method's signature or return type.
- Any fix that requires changes across more than one file.
- Any fix where you are genuinely uncertain what the correct behavior should be.

When asking, show: 1) the rule key and message (e.g. S3776 — Cognitive Complexity 18/15); 2) the current code block (the relevant lines, with context); 3) your proposed change (a before/after diff or rewritten block); 4) scope: how many lines change and which methods are affected.

Wait for the user to reply yes or no before proceeding. If they say no, skip the issue and note it in the final report.

## Step 5: Verify with local sonar analysis

After applying all fixes, run a local sonar analysis on every file you changed to confirm no new issues were introduced.

Run: sonar analyze <file1> <file2> ...

Pass each changed file as a separate argument. If sonar analyze does not accept individual file paths, run it on the directories containing the changed files.

Parse the output and check for any issues in the files you modified. Ignore issues in other files — those are pre-existing and not your responsibility.

If new issues are found in your changed files: fix them using the same rules from Step 4; re-run sonar analyze on the affected files again; repeat until the analysis reports no new issues in your changes.

This loop ensures your fixes are clean and do not trade one rule violation for another. Only proceed to the commit step once the changed files are issue-free.

## Step 6: Report

Finish with a brief summary:

- Fixed: list of rule + file + line for every issue resolved.
- Skipped (user declined): issues the user said no to.
- Skipped (unfixable): any issues you could not safely auto-fix, with a short reason.
