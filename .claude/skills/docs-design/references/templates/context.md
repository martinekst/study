# Template: design context

Use only when the selected deliverable needs a project-level orientation page.
Adapt headings to the existing design folder and omit unsupported rows.

```markdown
# Design context

> This section records visual and interaction decisions for <product/scope>.
> Functional behavior remains owned by <links>.

## Product and UI purpose

<What users accomplish and why a design specification is needed.>

## Audiences and operating context

| Role   | Primary tasks | Device/environment | Relevant constraints                         | Functional owner |
| ------ | ------------- | ------------------ | -------------------------------------------- | ---------------- |
| <role> | <tasks>       | <device/context>   | <accessibility, density, connectivity, etc.> | <link>           |

## Platforms and viewports

| Platform          | Supported viewport/input      | Status                    | Evidence |
| ----------------- | ----------------------------- | ------------------------- | -------- |
| <web/mobile/etc.> | <range; mouse/keyboard/touch> | <current/target/proposal> | <source> |

## Component and theme system

| Concern      | Source/version            | Status              | Notes                   |
| ------------ | ------------------------- | ------------------- | ----------------------- |
| Components   | <library/internal system> | <verified/proposed> | <link/path>             |
| Theme/tokens | <canonical source>        | <verified/proposed> | <link/path>             |
| Icons/assets | <source>                  | <verified/proposed> | <license/variant notes> |

## Inputs and ownership

| Input                          | Purpose                                                | Canonical link   |
| ------------------------------ | ------------------------------------------------------ | ---------------- |
| Functional UI/scenario/process | Behavior, fields, validation, permissions, transitions | <link>           |
| Wireframes/accepted visuals    | Layout and hierarchy                                   | <link>           |
| Existing implementation        | Current component/token behavior                       | <path/reference> |

## Status and open decisions

- Current: <supported design facts>
- Agreed target: <approved changes>
- Proposal: <clearly labelled alternatives>
- Unknown: <decision and evidence needed>

## Design documentation

- [Tokens](tokens-link)
- [Principles](principles-link)
- [Patterns](patterns-link)
- [Screens](screens-link)
- [Repeated compositions](components-link)
```
