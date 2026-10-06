# Architecture pages

Use this guide for `001-highlevel/` and each application's
`001-architektura.md`. These pages orient readers and link to detail; they do not
repeat every interface, schema, operational procedure, or decision.

## System architecture

`001-highlevel-architektura.md` answers:

- what is inside and outside the system boundary;
- which people/systems enter it and which applications participate;
- each application's single-sentence responsibility;
- synchronous, asynchronous, data, and external-integration boundaries;
- where the reader continues for application, infrastructure, and interface
  detail.

Use one diagram anchor such as
`<!-- diagram-anchor: highlevel-architecture -->` when a context/container map
helps. Follow it with a concise component table and narrative so the page
remains useful without the rendered diagram.

`002-highlevel-runtime.md` shows one representative end-to-end runtime flow. It
names participants, trigger, ordered interactions, important persistence or
event boundaries, failure/compensation, and final observable result. Use
`<!-- diagram-anchor: highlevel-runtime-sequence -->` when a sequence diagram is
appropriate. Omit the page when no canonical cross-application flow is known.

## Application architecture

Each backend, frontend, or mobile `001-architektura.md` covers:

1. purpose, consumers, and what the application does not own;
2. runtime/build boundary and major internal modules;
3. exposed and consumed interfaces with links to contracts;
4. owned/read data and consistency/lifecycle boundaries;
5. authentication, authorization, and sensitive-data consequences;
6. runtime flow and important failure/retry/idempotency behavior;
7. deployment/observability dependencies;
8. relevant ADRs and links to extracted sibling pages.

Use application-specific emphasis:

- Backend: domain modules, persistence, transactions, events/jobs, API and
  failure semantics.
- Frontend: routing, module/component boundaries, server/client data flow,
  state ownership, request layer, rendering/deployment boundary.
- Mobile: navigation/modules, local/offline state, platform services,
  synchronization, permissions, releases, and OS-specific differences.

## Progressive detail

Keep the architecture page as a map. Extract a sibling page when a data model,
state machine, queue catalogue, configuration matrix, API catalogue, or
operational procedure can be understood and maintained independently. Leave a
summary plus a direct link on the architecture page.

Diagram and prose must agree on names, direction, and boundaries. If an edit
makes an existing diagram inaccurate, mark its local status as stale according
to the portal's anchor convention and route diagram regeneration separately.

## Evidence and lifecycle

- Discovery: show supported options and the decision criteria; avoid invented
  components or flows.
- Implementation-ready: make the selected boundary, responsibilities,
  interfaces, failure behavior, and open blockers explicit.
- As-built: derive the view from inspected code/configuration and label any
  proposed target separately.

Link the technical domain-model projection to the canonical functional model.
It may add attributes, physical mappings, stores, and ownership, but must not
silently change shared entities, relationships, or cardinalities.
