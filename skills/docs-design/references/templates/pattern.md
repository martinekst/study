# Template: reusable UI pattern

Create one entry only when an actual behavior/presentation recipe is reused or
explicitly standardized. Screens link to the entry instead of copying it.

```markdown
## <pattern-id>

**Use when:** <evidence-backed trigger>  
**Do not use when:** <important boundary>  
**Consumers:** <screen links>  
**Status/source:** <current/agreed target/proposal and source>

### Composition

| Region/element | Component/primitive               | Variant/tokens | Content rule       |
| -------------- | --------------------------------- | -------------- | ------------------ |
| <element>      | <exact verified name or proposal> | <refs>         | <copy/length rule> |

### State and interaction

| State   | Trigger                 | Visual response   | Keyboard/focus | Announcement          |
| ------- | ----------------------- | ----------------- | -------------- | --------------------- |
| <state> | <functional owner rule> | <design response> | <behavior>     | <live/error behavior> |

### Responsive behavior

<How composition, placement, wrapping, and visibility change at named
breakpoints.>

### Example

<Optional concise pseudo-markup or screenshot/wireframe link. Clearly label an
illustrative example as non-implementation.>

### Rules and exceptions

- <testable invariant>
- <known exception and owner>
```

Common useful patterns include loading skeleton, empty result, field error,
form/global error, success feedback, destructive confirmation, detail header,
and responsive action stack. Create only those used by the selected pages.

For an empty state, distinguish no data, no filtered results, no permission, and
load failure; their messages and actions are not interchangeable. For errors,
use text plus visual treatment, place recovery where the failure occurred, and
define focus/announcement. For success feedback, do not hide an outcome the user
must act on behind a short-lived toast.
