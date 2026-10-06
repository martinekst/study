# Optional machine-readable inventory

Create a machine-readable inventory only when a named process or skill consumes
it. Store it with the dated landscape snapshot and treat it as a handoff, not a
replacement for repository-owned facts.

```yaml
snapshot_date: <YYYY-MM-DD>
scope:
  included: [<repository-or-system>]
  excluded: [<known-exclusion>]
systems:
  - id: <stable-local-id>
    name: <display-name>
    source: <path-or-url>
    revision: <commit-tag-or-version>
    purpose: <evidence-backed-summary>
    roles: [<application-service-library-data-infrastructure-docs-other>]
    product: <supported-group-or-null>
    ownership_signals: [<source-and-value>]
    interfaces:
      provides: [<interface-id>]
      consumes: [<interface-id>]
    evidence: [<path-or-url-and-location>]
    confidence: confirmed | supported | inferred | unknown
interactions:
  - id: <stable-edge-id>
    from: <system-id>
    to: <system-id>
    mechanism: <protocol-event-data-or-other>
    contract: <operation-event-schema-or-null>
    evidence: [<both-sides-when-available>]
    confidence: confirmed | supported | inferred | unknown
unknowns: [<material-access-or-evidence-gap>]
```

IDs are stable within later comparisons. A field may be null/unknown; never fill
it from convention. Validate referenced system IDs, unique IDs, allowed confidence
values, and evidence presence before handing the file to a consumer.
