# Contract semantics

The `documentation` object is a small set of stable user decisions. Do not add
fields for values that are derived, temporary, or owned elsewhere.

| Field              | Allowed value                                                     | Runtime consequence                                                                 |
| ------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `active_version`   | `vN`, `N >= 1`                                                    | Targets an existing `docs/vN` folder. It is never inferred from the highest folder. |
| `lifecycle_stage`  | `discovery`                                                       | Decision support. Unknowns and alternatives may remain explicit.                    |
|                    | `implementation-ready`                                            | Agreed target. Behavior must be testable and blocking decisions resolved.           |
|                    | `as-built`                                                        | Implemented reality. Code/configuration is authoritative for inspected scope.       |
| `deliverable_type` | `documentation`                                                   | Neutral, explanatory specification/reference language.                              |
|                    | `offer`                                                           | Executive, outcome-first offer language and commercial completeness checks.         |
| `sections`         | `business`, `functional`, `technical`, `tests`, `change-requests` | Selects the owning artifact skills.                                                 |
| `functional_views` | ordered `scenario`, `process`, `ui`                               | Selects functional resources; the first value is primary.                           |

`sections` is a set; use the canonical order shown above. `functional_views` is
ordered: supporting views follow the primary view after the shared overview.

Platform fields outside `documentation` are not behavior switches:

- `title` names the README page.
- `status: published` activates the contract. `draft` and `review` allow setup
  or review only; `archived` is inactive.
- `updated_at` records a README edit, never code or documentation verification.

## Deliberately absent

No schema version, owner, verification date, source path, skill list, scoring
weight, menu tree, operation, profile, mode, override, or `top_down` flag belongs
in this object. Add a future field only when a real workflow consumes it and a
controlled update path exists.
