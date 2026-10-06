# Template: screen design specification

Use for one actual screen identity. Keep function and validation in the linked UI
or scenario owner; this file specifies how supported behavior is presented.

```markdown
# <Screen title>

**Screen/state ID:** `<stable-id>`  
**Functional owner:** <UI/scenario/process link>  
**Wireframe/reference:** <link>  
**Platforms/viewports:** <named tokens/range>  
**Status:** <current/agreed target/proposal>

## Purpose

<User goal and expected visible outcome in one or two sentences.>

## Regions and elements

### <Header/navigation/content/feedback/actions/overlay>

| Element               | Functional reference | Component/composition             | Variant and token refs | Content constraints |
| --------------------- | -------------------- | --------------------------------- | ---------------------- | ------------------- |
| <verbatim label/role> | <owner anchor>       | <exact verified name or proposal> | <token/pattern refs>   | <length/format>     |

Repeat only for regions that exist.

## Visual states

| State                                           | Trigger/owner | Changed elements | Pattern/token | Focus/announcement | Exit         |
| ----------------------------------------------- | ------------- | ---------------- | ------------- | ------------------ | ------------ |
| Default                                         | <source>      | <elements>       | <refs>        | <behavior>         | <next state> |
| Loading/empty/error/success/disabled/permission | <source>      | <elements>       | <refs>        | <behavior>         | <recovery>   |

## Responsive behavior

| Region   | Small viewport                    | Medium/large viewport | Constraint/source |
| -------- | --------------------------------- | --------------------- | ----------------- |
| <region> | <order/width/nav/action behavior> | <behavior>            | <token/source>    |

## Accessibility

| Element/flow | Semantic role/name | Keyboard/focus | Description/error/live behavior | Library support vs project work |
| ------------ | ------------------ | -------------- | ------------------------------- | ------------------------------- |
| <element>    | <detail>           | <detail>       | <detail>                        | <detail>                        |

## Assets and content

| Asset/copy | Source   | Variant/crop/format | License/privacy/status |
| ---------- | -------- | ------------------- | ---------------------- |
| <item>     | <source> | <rules>             | <detail>               |

## Reused patterns and compositions

- [<pattern/composition>](link) — <where used>.

## Prototype/implementation notes

<Only visual handoff constraints. Link behavior and interfaces rather than
copying them. Label illustrative snippets and prototype shortcuts.>

## Open decisions

| Question   | Impact   | Evidence/decision needed | Owner/status   |
| ---------- | -------- | ------------------------ | -------------- |
| <question> | <impact> | <need>                   | <owner/status> |
```
