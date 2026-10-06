# Change-request structure

Use a top-down structure:

1. section summary: scope, dependency graph, rollout order, and aggregate risk;
2. one group per independently understandable/deliverable change outcome;
3. group index: purpose, boundaries, E2E acceptance, dependencies, affected
   canonical pages, and implementation state;
4. task pages only where separate FE, BE, data/migration, configuration,
   operations, or documentation work needs ownership;
5. technical design pages only for interfaces/models/sequences/decisions too
   detailed for the group index.

Avoid project-management vocabulary that pretends the documentation is a live
ticket system. Link to the actual ticket when one exists.

State values are evidence-based: proposed, in progress, implemented. Record the
evidence reference for implemented state.

Folder/file prefixes may express the established menu sequence, but sequence is
not a dependency model. Record real dependencies explicitly and reject cycles
or explain how the scope will be re-sliced.
