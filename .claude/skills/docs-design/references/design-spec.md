# Design specification structure

Create only the layers selected by [scope.md](scope.md). Preserve the project's
existing design-documentation location and file names. When no convention
exists, a useful shape is:

```text
<design-root>/
|-- context.md
|-- tokens.md
|-- principles.md
|-- patterns.md
|-- screens/
|   `-- <screen-or-state>.md
`-- components/
    `-- compositions.md
```

Do not create empty files to satisfy this tree. A small project may need one
screen spec that links directly to existing product tokens; a mature application
may need every layer.

## Ownership

| Information                                                                          | Canonical owner                                  |
| ------------------------------------------------------------------------------------ | ------------------------------------------------ |
| User goal, behavior, fields, validation, permissions, transition                     | functional scenario/process/UI page              |
| Existing implemented component and token value                                       | inspected implementation/design-system source    |
| Visual hierarchy, token aliases, component variants, responsive and motion decisions | design specification                             |
| Reusable loading/empty/error/success/confirmation treatment                          | one design pattern entry                         |
| Repeated domain arrangement                                                          | one documented composition linked from consumers |
| Prototype shortcut or simulation                                                     | prototype handoff, not design truth              |

## Required qualities

- Context links to the user and functional owners and states the platform,
  viewport assumptions, component/theme source, and evidence status.
- Tokens cover only values the selected screens use: color, typography, spacing,
  size/radius, elevation, breakpoints, motion, and z-order as applicable. Each
  token has provenance and semantic use.
- Principles record decisions that screens inherit; screen files describe only
  exceptions.
- Patterns have a trigger, composition, states, accessibility behavior, and
  consumer links. Screens reference the pattern instead of copying its recipe.
- A screen spec inventories regions and elements, links functional ownership,
  defines every relevant visual state, and gives responsive and accessibility
  behavior that can be implemented.
- Assets list source/license/variant/crop requirements and have stable links.

Use explicit labels for current, agreed target, proposal, and unknown. A visual
proposal is not evidence of application behavior, and a code snippet in a design
page is illustrative unless the page links to an inspected implementation.
