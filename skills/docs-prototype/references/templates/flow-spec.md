# Template: prototype flow specification

Use only for a prototype spanning multiple screens or materially distinct states.

```markdown
# Prototype flow: <goal>

**Decision/goal:** <what this flow evaluates>  
**Audience and viewport:** <who/where>  
**Canonical owners:** <scenario/process/UI links>  
**Status:** <proposal/accepted prototype>

## Entry and completion

- Entry: <route/screen/state and fixture precondition>
- Successful completion: <observable outcome>
- Included failure/recovery: <outcome>

## Screens and routes

| Route/state | Screen             | Owner/design | Actor/permission | Included states |
| ----------- | ------------------ | ------------ | ---------------- | --------------- |
| <route>     | <stable screen ID> | <links>      | <role/rule>      | <states>        |

## Transitions

| From           | Stable action ID and accessible name | Preconditions | State effect | Visible feedback | To             | Source |
| -------------- | ------------------------------------ | ------------- | ------------ | ---------------- | -------------- | ------ |
| <screen/state> | <id/name>                            | <condition>   | <mutation>   | <feedback>       | <screen/state> | <link> |

## Shared prototype state

| State   | Initial fixture | Changed by | Reset boundary | Why global |
| ------- | --------------- | ---------- | -------------- | ---------- |
| <state> | <value/ref>     | <actions>  | <boundary>     | <reason>   |

## Simulated boundaries

| Action/integration | Fixture condition | Simulated result/latency | Real owner | Visible simulation cue |
| ------------------ | ----------------- | ------------------------ | ---------- | ---------------------- |
| <boundary>         | <condition>       | <result>                 | <link>     | <cue>                  |

## Omitted paths

| Trigger  | Omitted destination/state | Prototype response           | Reason         |
| -------- | ------------------------- | ---------------------------- | -------------- |
| <action> | <path>                    | <disabled/not-included/etc.> | <scope reason> |
```
