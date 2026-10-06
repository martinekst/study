# Component-system mapping

Load this reference when selecting library components or documenting a repeated
composition. Use the system actually declared or implemented by the project.
Do not substitute a preferred library.

## Discover the vocabulary

Inspect, as available:

- package/dependency manifests and locked versions;
- theme/provider configuration and token source;
- component imports and wrappers used by representative screens;
- Storybook, design-library, or internal component documentation;
- icon and asset packages;
- accessibility and localization helpers.

Record what was inspected and distinguish a verified component from a proposed
one. If no component system exists, use neutral semantic names and label the
selection as a design proposal.

## Mapping table

For each visual element capture:

| Field           | Meaning                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| Semantic role   | input, navigation, primary action, alert, status, list row, dialog, etc. |
| Exact primitive | project/library component name and package when verified                 |
| Variant/props   | only choices that affect design or behavior                              |
| Tokens          | semantic color/type/spacing/size/elevation/motion references             |
| States          | default, focus, disabled, loading, error, selected, expanded, etc.       |
| Accessibility   | supplied by primitive versus required project configuration              |
| Consumers       | screens/patterns/compositions using it                                   |

## Composition instead of invention

When no single primitive represents a region:

1. List the existing primitives and their arrangement.
2. Keep business/state logic with the functional owner.
3. Keep a one-screen composition local.
4. Promote it to a named domain composition only after actual reuse or an
   explicit system decision.
5. Document slots/variants rather than copying near-identical compositions.

A documented composition may later become a code component, but the design page
does not claim it already exists unless implementation evidence proves that.

## Consistency checks

- Same semantic role uses the same primitive/variant unless an exception is
  documented.
- Token aliases resolve to one source and are not redefined per screen.
- Wrapper/custom components do not hide inaccessible keyboard or naming behavior.
- Optional or paid package components are used only when the project actually
  includes or approves that dependency.
- Example snippets contain no invented API, version, business rule, or raw design
  value that contradicts the canonical token page.
