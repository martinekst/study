# Reusable wireframe fragments

Load this reference when two or more in-scope wireframes share a visual primitive
or when the project already maintains SVG fragments.

Fragments are small derived helpers, not a parallel design system. Their purpose
is to keep shells, inputs, actions, navigation, rows, banners, and domain
compositions visually consistent. Extract only what the selected screens use.

## Source order

For each needed fragment, prefer the strongest applicable visual evidence:

1. current project design tokens and component/pattern specification;
2. verified implementation and its component/theme/localization sources;
3. accepted prototype for the same screen/state;
4. supplied screenshot for arrangement only;
5. neutral wireframe primitive when no visual system is established.

Record provenance in the fragment library's README or adjacent metadata: source
path/reference, inspected date or revision, tokens used, and consumers. Refresh a
fragment when that source changed or provenance is missing; do not regenerate
unrelated fragments on every small edit.

## Useful categories

- shells and navigation;
- labelled inputs and common states;
- primary, secondary, text, icon, and destructive actions;
- list/table rows and pagination;
- alerts, empty/loading/success/error patterns;
- avatars and role indicators;
- repeated domain compositions already defined by design.

Do not create empty categories or a catalogue of hypothetical variants.

## Composition rules

- Copy the source fragment without silent styling changes, then substitute only
  documented parameters such as label, value, selected state, and coordinates.
- Keep fragment IDs unique when several copies share one SVG.
- Resolve transforms before geometry validation.
- If a primitive appears once, compose it locally. Promote it only after actual
  reuse or an explicit design-system decision.
- A screenshot can refine one screen's layout but should not become a reusable
  fragment by itself.
- When an existing fragment disagrees with current source, refresh or flag it;
  do not score a wireframe against a stale helper.

The deliverable is the finished wireframe and its link from the owner. Fragments
remain implementation aids and should not be presented as product behavior.
