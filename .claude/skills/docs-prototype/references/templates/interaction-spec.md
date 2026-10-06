# Template: per-screen interaction specification

Use for one screen implemented in the prototype. Copy behavior from canonical
owners; the examples in this template are structural placeholders only.

```markdown
# Interaction spec: <screen title>

**Stable ID/route:** `<id-or-route>`  
**Functional owner:** <UI/scenario link>  
**Design/wireframe:** <links>  
**Flow:** <flow-spec link>

## Interactive elements

| Stable test ID | Accessible role/name | Component          | Purpose   | Permission/source |
| -------------- | -------------------- | ------------------ | --------- | ----------------- |
| `<id>`         | <role/name>          | <actual component> | <purpose> | <rule/link>       |

## Local state

| State   | Type/values | Initial fixture | Changed by | Visible effect |
| ------- | ----------- | --------------- | ---------- | -------------- |
| <state> | <type>      | <value/ref>     | <action>   | <effect>       |

## Interactions and transitions

| Action | Preconditions/validation | Pending state | Success          | Failure/recovery     | Source |
| ------ | ------------------------ | ------------- | ---------------- | -------------------- | ------ |
| <id>   | <rules>                  | <feedback>    | <mutation/route> | <feedback and retry> | <link> |

## State rendering

| Screen state                                            | Trigger   | Elements changed | Focus/announcement | Pattern/design link |
| ------------------------------------------------------- | --------- | ---------------- | ------------------ | ------------------- |
| Default/loading/empty/error/success/disabled/permission | <trigger> | <detail>         | <detail>           | <link>              |

## Fixtures and simulation

| Fixture   | Drives      | Synthetic values | Reset behavior | Real boundary |
| --------- | ----------- | ---------------- | -------------- | ------------- |
| <fixture> | <condition> | <safe values>    | <reset>        | <link>        |

## Smoke checks

- Happy path: <steps and expected outcome>.
- Negative/recovery path: <steps and expected outcome>.
- Keyboard/focus: <expected order and restoration>.
- Responsive/content extreme: <viewport and expected behavior>.

## Divergences and open points

| Difference/question | Canonical source | Prototype behavior | Reason/impact | Owner/status   |
| ------------------- | ---------------- | ------------------ | ------------- | -------------- |
| <item>              | <link>           | <behavior>         | <reason>      | <owner/status> |
```
