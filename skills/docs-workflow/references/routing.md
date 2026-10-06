# Skill routing and phase order

## Section owners

| Declared section  | Owner                  |
| ----------------- | ---------------------- |
| `business`        | `docs-business`        |
| `functional`      | `docs-functional`      |
| `technical`       | `docs-technical`       |
| `change-requests` | `docs-change-requests` |
| `tests`           | `docs-tests`           |

`functional_views` selects only the matching `docs-functional` references. The
first view controls the functional landing emphasis; common definitions remain
first and have one owner.

## Ordinary creation/update order

1. Business framing when enabled.
2. Functional behavior when enabled.
3. ANA technical content when enabled.
4. Change requests when enabled or explicitly requested by an extension.
5. Tests when enabled, after behavior and changes are stable enough to trace.
6. Diagrams, wireframes, design, and prototype only where the text creates a
   concrete need or anchor.
7. Targeted review; full review when the run claims complete declared scope.

Pricing is task-triggered, including offer price/estimate work. Landscape and
learning-from-session are standalone maintenance workflows, not portal phases.
