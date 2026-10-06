# Select the design deliverable from actual needs

Do not select a fixed package from a former workflow. Inspect the request, the
canonical functional pages, existing design documentation, and the downstream
consumer.

| Actual need                                                   | Produce or update                                                                                   | Skip unless independently needed               |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| First implementable UI design with no foundation              | context, used tokens/principles/patterns, selected screen specs, repeated compositions              | unused token families and hypothetical screens |
| One new or changed screen/state                               | that screen spec; update shared token/pattern/composition only when the change truly introduces one | regeneration of unrelated foundation/screens   |
| Theme or brand-system change                                  | affected tokens/principles and a representative impact check across consuming screens               | rewriting functional behavior                  |
| Repeated loading/empty/error/success behavior is inconsistent | one canonical pattern plus consumer links                                                           | screen catalogue expansion                     |
| Implementation handoff for selected journey                   | screens/states in that journey, referenced foundation, assets and open decisions                    | all application screens                        |
| Design review only                                            | inspect the selected artifacts and report findings                                                  | content edits without explicit authorization   |
| Scenario/process portal without a UI view                     | interaction-specific design note only where requested                                               | invented screen hierarchy or per-screen files  |

## Existing foundation

Read existing context, tokens, principles, patterns, and compositions before
writing. Treat supported shared decisions as canonical. Update them only when the
request or evidence changes that decision; otherwise reference them by stable
name from the selected screen.

## Screen and state granularity

Use one screen file for one stable screen identity. Keep states together when
they share structure and differ only through values, feedback, or enablement.
Split states when modal/permission/empty/error variants materially alter regions,
navigation, or the task. Use names from the UI owner or wireframe rather than
creating a second screen taxonomy.

## Stop conditions

Pause the affected artifact when its user goal, owner, component/theme source,
required state, or target viewport is unknown and the choice would materially
change the design. Preserve an explicit placeholder or open decision instead of
filling an entire design system with defaults.
