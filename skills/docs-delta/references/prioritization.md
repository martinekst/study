# Delta finding prioritization

Severity reflects consequence, not file count or ease of repair:

| Severity  | Use when                                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blocker` | the mismatch is likely to cause a materially wrong commercial decision, unsafe implementation/migration, security or data harm, or invalid acceptance result        |
| `major`   | declared scope is unusable or materially ambiguous for its lifecycle, a critical owner/link is missing, or behavior and documentation disagree in an important flow |
| `minor`   | the gap is bounded and readers can still use the documentation reliably                                                                                             |

Increase urgency when the affected behavior is currently being implemented,
tested, reviewed, migrated, or used in a decision; when other pages depend on the
claim; or when the mismatch affects money, personal data, authorization,
regulatory duties, irreversible data changes, or recovery.

Do not lower severity merely because the repair is difficult. Do not raise it
because a page is absent when the responsibility is not declared or material.
Historical records are not “stale” merely because the system later changed; the
problem exists only if they present themselves as current or break live links.

When one implementation surface nearly matches an acceptance statement, report
the exact difference and offer evidence-based resolution paths: update the
change package if the implemented divergence was approved, document the shipped
behavior while leaving the unfulfilled target open, or treat the implementation
as a defect. Do not choose among these without authority.
