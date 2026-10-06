# Prototype scope

Define before building:

- decision, hypothesis, or demonstration goal and who will evaluate it;
- linked scenario/process/UI pages and design/wireframe references;
- covered journey entry, success outcome, relevant recovery/failure states, and
  explicitly omitted branches;
- fidelity, target device/viewport/input, accessibility depth, and expected
  lifetime;
- mock data, simulated integrations, prototype-only controls, and privacy limits;
- success/feedback method and handoff consumer.

## Select screens and states

Include a screen only when it is required to reach the selected outcome, test a
material decision, demonstrate an explicitly requested branch, or provide the
minimum orientation needed by the audience. Include at least one supported
failure/recovery state when error handling is part of the decision. Do not add
admin, settings, index, or dashboard screens merely to make the artifact appear
complete.

## Select fidelity

| Need                                                   | Appropriate fidelity                                                                                           |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Validate navigation, terminology, or information order | structural components, real labels, essential states, minimal visual styling                                   |
| Validate visual system or responsive behavior          | project tokens/components, required breakpoints, content extremes, focus/error states                          |
| Implementation handoff                                 | actual target stack when practical, reusable project patterns, deterministic fixtures, build/test instructions |
| Brief stakeholder demonstration                        | polished selected path, clearly visible simulation boundaries, no unsupported completeness claims              |

Fidelity is per decision, not a permanent portal property. A visually polished
screen may still use simulated behavior; a structural prototype still requires
working navigation and observable feedback.

## Select delivery shape

- Extend an existing prototype project when it already matches the requested
  journey and target stack.
- Use a repository project/build when multiple screens, responsive behavior,
  reusable components, repeatable testing, or implementation handoff matter.
- Use a self-contained artifact only for a small disposable path whose required
  dependencies and security policy permit it.
- Use a hosted artifact only when the user requests sharing/hosting and that
  external mutation is authorized.

Record why the selected shape fits. Do not introduce a framework, runtime, CDN,
router, or package manager without evidence or an explicit proposal.

Prototype the smallest coherent path that answers the decision. Do not add
features merely to make the demo appear complete.
