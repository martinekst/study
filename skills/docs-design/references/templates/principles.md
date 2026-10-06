# Template: design principles

Use for decisions inherited across multiple screens. Keep principles testable and
link each to a user/context need or existing system source.

```markdown
# Design principles and visual language

## Visual tone and density

| Decision | Choice                                | Why                   | Applies to | Status/source |
| -------- | ------------------------------------- | --------------------- | ---------- | ------------- |
| Tone     | <formal/friendly/neutral/etc.>        | <user/context reason> | <scope>    | <source>      |
| Density  | <comfortable/compact/mixed by region> | <reason>              | <scope>    | <source>      |
| Theme    | <light/dark/system/etc.>              | <reason>              | <scope>    | <source>      |

## Information hierarchy

- <Heading levels and region hierarchy.>
- <How status, metadata, and primary content are differentiated.>
- <Content-length/localization expectations.>

## Action hierarchy

- Primary: <one supported dominant action rule and exceptions>.
- Secondary/tertiary: <visual and placement rule>.
- Destructive: <confirmation/recovery rule from functional ownership>.

## Forms and validation

- Labels: <placement and persistent-label rule>.
- Required/optional: <non-color cue>.
- Validation timing: <only if functionally defined>.
- Error communication: <inline, summary, focus, announcement>.

## Loading, empty, error, success, permission

Reference the named patterns used for each supported state. State how the user
distinguishes “loading” from “empty” and how recovery is presented.

## Responsive behavior

<Rules shared by navigation, columns, actions, tables, and overlays. Link the
breakpoint tokens and record exceptions in individual screens.>

## Motion

| Interaction  | Motion token | Purpose                | Reduced-motion alternative |
| ------------ | ------------ | ---------------------- | -------------------------- |
| <transition> | <token>      | <feedback/orientation> | <none/instant/etc.>        |

## Accessibility principles

- Semantic structure and heading order.
- Visible focus and logical keyboard order.
- Accessible names, instructions, error association, and live feedback.
- Contrast, zoom/reflow, target size, and non-color cues.
- Reduced motion and platform assistive-technology expectations.

## Exceptions and open decisions

| Scope            | Exception/question | Reason/evidence | Owner/status   |
| ---------------- | ------------------ | --------------- | -------------- |
| <screen/pattern> | <detail>           | <source>        | <owner/status> |
```
