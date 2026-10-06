# Interaction mapping

Load this reference after scope selects a real journey and before implementation.
Functional and UI pages remain authoritative; this map translates supported
behavior into observable prototype transitions.

## Extract the journey

For each selected screen/state, inventory:

| Input                   | Extract                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| Scenario/process steps  | user actions, entry/exit conditions, next owner/screen           |
| UI screen page          | fields, validation, permissions, actions, states, target screens |
| Design screen/pattern   | components, visual feedback, responsive/focus behavior           |
| Interfaces/integrations | boundary being simulated and documented outcomes                 |

Map each user action to a stable element ID, precondition, state mutation,
visible feedback, next state/route, and source link. Do not turn internal system
steps into clicks unless the UI actually exposes them.

## Alternatives and errors

- Give every included alternative a complete entry and observable terminal or
  return state.
- Map supported errors to deterministic fixture conditions. Use the canonical
  error copy/code only when documented.
- Distinguish field validation, business rejection, permission denial,
  integration failure, and unexpected technical failure; their feedback and
  recovery are not interchangeable.
- When a branch is outside scope, keep its action honest: disable it with a clear
  note, show “not included in this prototype,” or omit it if the design permits.
  Never route it to a fake success screen.

## State design

Keep global state only for facts that genuinely cross screens (for example the
selected actor, session simulation, or shared fixture record). Keep form values,
dialog visibility, loading, and local errors with their screen. Reset state at
documented boundaries so tests are repeatable.

Latency is a fixture decision, not a product claim. Use deterministic controls
or a small configurable value only when loading behavior is under evaluation.

## Fixture conventions

- Use synthetic, recognizable test data with stable IDs.
- Include only fields visible in the selected journey or required to drive a
  documented condition.
- Store success and failure cases explicitly rather than relying on accidental
  strings or random results.
- Reset between tests and expose no live endpoint, token, credential, or customer
  record.

Write [templates/flow-spec.md](templates/flow-spec.md) for multi-screen flows and
[templates/interaction-spec.md](templates/interaction-spec.md) for each built
screen. Stable test IDs support tests but do not replace accessible roles/names.
