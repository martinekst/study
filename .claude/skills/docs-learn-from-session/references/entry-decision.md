# Feedback entry decision

Present one independently actionable feedback item in this shape:

```text
Evidence
- Request/context: <minimum relevant excerpt>
- Observed result: <artifact/path and behavior>
- User feedback: <verbatim or meaning-preserving excerpt>

Diagnosis
- Cause class: <classification>
- Reusable beyond this project: yes / no / uncertain, with reason
- Current semantic owner: <skill/reference/script/project output>

Proposed change
- Behavior before: <observable behavior>
- Behavior after: <observable behavior>
- Files/callers affected: <paths>
- Risk and validation: <what could regress and how to test>
```

Offer apply, edit proposal, defer, reject as non-reusable, or mark duplicate.
Never batch-apply unrelated entries or interpret no response as authorization.

If feedback conflicts with an existing rule, show both rules and their intended
contexts. Do not choose the newer statement automatically. If the correction
requires project facts rather than reusable guidance, route it to the project
artifact and leave the shared skill unchanged.

After an approved patch, record the disposition, reason, changed paths, and
validation result. Keep the original evidence intact.
