# Choosing the change owner

| Observed need                                              | Likely owner                                     | Guardrail                                                               |
| ---------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| wrong setup question, phase, or artifact routing           | `docs-workflow`                                  | do not persist run operations in README                                 |
| contract field/value meaning or validation                 | `docs-base` contract and tests                   | change public values only through an approved contract migration design |
| universal writing/evidence invariant                       | v2 `CLAUDE.md` only when truly portal-wide       | avoid duplicating tf-doc-vault mechanics or artifact-specific rules     |
| business/functional/technical/test/change content behavior | owning artifact skill/reference                  | keep templates and review criteria with that skill                      |
| scoring, severity, report schema                           | `docs-review` and deterministic calculator/tests | preserve score reproducibility and audit statuses                       |
| applying findings                                          | `docs-apply-report`                              | do not weaken approval, recheck, or stable-ID rules                     |
| format/build/frontmatter mechanics                         | tf-doc-vault source or scaffold                  | do not shadow platform rules in every skill                             |
| one customer's vocabulary or preference                    | project documentation/run context                | do not generalize without repeated evidence                             |
| repeatable calculation/parsing failure                     | deterministic script plus tests                  | instruction prose is not a substitute for validation                    |

A change may require secondary pointer updates, but one file remains the semantic
owner. Prefer linking to it over copying the rule into callers.
