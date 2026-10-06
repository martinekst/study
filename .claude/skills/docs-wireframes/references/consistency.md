# Wireframe-to-owner consistency

Compare the rendered frame and its text labels against the canonical owners after
geometry validation.

## All screens

- Every visible field, value, action, state, role, permission, and navigation
  target is supported or visibly labelled as a proposal/unknown.
- Editable, read-only, hidden, and backend-only data are not confused.
- Required markers, helper/error text, disabled state, and outcome feedback match
  the owner.
- Technical identifiers retain their canonical spelling; user-visible labels
  match the documented/localized text.
- The figure link, filename, screen name, state, viewport, and owner backlinks
  resolve.

## Owner-specific checks

| Owner                   | Additional checks                                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI screen               | Field/control inventory, validation, permissions, state transitions, and responsive rules match the screen page.                                                          |
| Scenario                | Entry/exit state and each on-screen user action match the scenario; notifications and backend side effects are not drawn as visible UI unless the scenario says they are. |
| Process                 | Frame represents the named supporting step and role; it does not claim to visualize the entire end-to-end process.                                                        |
| Business overview       | The frame illustrates only the supported dominant capability and audience; it is not presented as exhaustive.                                                             |
| Technical/admin surface | Technical labels and role restrictions match implementation/technical owners while user-visible behavior remains linked to functional ownership.                          |

Use `wireframe-gap` when required detail is absent or cannot be represented from
available evidence. Use `wireframe-text-contradiction` when two representations
make different claims about the same detail. Name both sources and do not choose
a winner without evidence.
