# Template: design tokens

Use only for token families consumed by selected screens. Copy values from the
canonical theme/design source when it exists. If a value is newly proposed, say
so in the status and provenance columns.

```markdown
# Design tokens

Tokens provide semantic names for reusable values; they do not duplicate the
component library or create a second theme source.

## Color

| Token                   | Light value | Dark value | Semantic use         | Contrast pair                 | Status/source |
| ----------------------- | ----------- | ---------- | -------------------- | ----------------------------- | ------------- |
| `color.action.primary`  | <value>     | <value>    | primary action/focus | <text token and ratio/status> | <source>      |
| `color.feedback.error`  | <value>     | <value>    | error/destructive    | <pair>                        | <source>      |
| `color.surface.default` | <value>     | <value>    | page surface         | <pair>                        | <source>      |

## Typography

| Token             | Family   | Size/line-height | Weight  | Use               | Status/source |
| ----------------- | -------- | ---------------- | ------- | ----------------- | ------------- |
| `type.page-title` | <family> | <value>          | <value> | one page title    | <source>      |
| `type.body`       | <family> | <value>          | <value> | primary content   | <source>      |
| `type.helper`     | <family> | <value>          | <value> | helper/error text | <source>      |

## Spacing and sizing

| Token                     | Value   | Use                  | Status/source     |
| ------------------------- | ------- | -------------------- | ----------------- |
| `space.1`                 | <value> | inline gap           | <source>          |
| `space.2`                 | <value> | control/group gap    | <source>          |
| `size.control.min-target` | <value> | pointer/touch target | <source/standard> |

## Shape and elevation

| Token               | Value   | Use            | Status/source |
| ------------------- | ------- | -------------- | ------------- |
| `radius.control`    | <value> | inputs/actions | <source>      |
| `elevation.overlay` | <value> | menus/dialogs  | <source>      |

## Breakpoints and layout

| Token                | Value   | Layout change  | Status/source |
| -------------------- | ------- | -------------- | ------------- |
| `breakpoint.<name>`  | <value> | <what changes> | <source>      |
| `layout.content.max` | <value> | <consumer>     | <source>      |

## Motion and z-order

| Token             | Value             | Use          | Reduced-motion behavior | Status/source |
| ----------------- | ----------------- | ------------ | ----------------------- | ------------- |
| `motion.feedback` | <duration/easing> | <consumer>   | <replacement>           | <source>      |
| `layer.dialog`    | <value>           | modal dialog | —                       | <source>      |

## Implementation mapping

| Design token | Theme/code key | Canonical source |
| ------------ | -------------- | ---------------- |
| <token>      | <key>          | <path/link>      |
```

Never fill every category with framework defaults “for completeness.” Omit an
unused family, and never label an inherited default as a project decision without
evidence.
