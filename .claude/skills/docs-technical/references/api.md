# API documentation

Keep a small interface summary on the owning application's architecture page.
Create a dedicated API page only when readers need a catalogue, detailed
schemas/examples, version policy, or failure behavior that would overwhelm the
overview. Link an authoritative OpenAPI, AsyncAPI, or GraphQL artifact rather
than copying the whole contract into prose.

## Exposed API page

Use the following shape and omit inapplicable sections:

```markdown
## Přehled

<Boundary, consumers, base path or topic namespace, current version.>

## Autentizace a autorizace

<Mechanism, required scopes/roles, tenant boundary, failure response.>

## Konvence

<Media type, identifiers, time/currency, pagination, correlation, idempotency.>

## Endpointy nebo zprávy

| Operace | Účel | Vstup | Úspěch | Chyby | Oprávnění | Zdroj |
| ------- | ---- | ----- | ------ | ----- | --------- | ----- |

## Verzování a ukončení podpory

<Compatibility promise, change notice, deprecation and migration path.>

## Odkazy

- [Strojově čitelný kontrakt](existing-relative-or-approved-external-link)
```

For each operation/message, capture only evidenced details: identifier,
request/event schema, required versus optional fields, success result, stable
error codes, authentication/authorization, idempotency/retry behavior, rate or
payload limits, and an example with non-sensitive data.

## Consumed API or external integration

Document why it is called, which operations are used, credentials/identity
mechanism (never the secret), timeouts, retry/backoff, circuit breaking,
idempotency, rate limits, fallback/compensation, observability, test substitute,
version monitoring, and ownership. Cross-application external integrations use
`009-integrace-tretich-stran/`; a single consumer usually owns the page locally.

## Contract integrity

- The machine-readable contract wins for shapes it defines; record a conflict
  when implementation or prose differs.
- Do not claim that a route is public merely because it has no obvious local
  guard; verify gateway and platform enforcement too.
- Distinguish HTTP acceptance from completed asynchronous processing.
- Show realistic errors and examples, but never production tokens, personal
  data, or secret headers.
- Link tests that verify the contract. Test source shows implemented coverage;
  a run/report is needed to claim that it passed.
