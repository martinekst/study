# Sequence and flow production patterns

Load this reference only for ordered interactions, decision logic, process flows,
or UI transition flows. Replace every placeholder with evidence-backed content;
the snippets demonstrate notation, not application behavior.

## Sequence template

Group participants by semantic boundary when that materially helps the reader.
Use actors for people and participants for systems. Requests use solid arrows;
responses or asynchronous acknowledgements may use dashed arrows when that
distinction is documented.

```mermaid
sequenceDiagram
  autonumber
  box transparent Actor
    actor A as <Role>
  end
  box transparent Our system
    participant UI as <UI or client>
    participant API as <Service>
  end
  box transparent External system
    participant EXT as <External dependency>
  end

  A->>UI: <User action>
  UI->>API: <Request or command>
  API->>EXT: <External interaction>
  alt <Evidenced success condition>
    EXT-->>API: <Success response>
    API-->>UI: <Observable result>
    UI-->>A: <User feedback>
  else <Evidenced failure condition>
    EXT-->>API: <Failure response>
    API-->>UI: <Documented error>
    UI-->>A: <Recovery guidance>
  end
```

Production checks:

- Keep participant names stable across all messages and the host text.
- Show protocol/endpoint detail only when it answers the page question.
- Use `alt`, `opt`, `loop`, or `par` only for behavior the source explicitly
  supports. A long catalogue of rare errors belongs in a table, not one diagram.
- Avoid messages that merely say “process” or “handle”; use the observable
  command, event, result, or user feedback.

## Decision/activity template

Choose `TD` for a reader following a procedure and `LR` for a compact lifecycle.
Keep decision labels as questions and label every branch.

```mermaid
flowchart TD
  Start([Start]) --> Input[<Actor action>]
  Input --> Valid{<Decision question?>}
  Valid -- Yes --> Work[[<Sub-process or external call>]]
  Valid -- No --> Error["Error: <documented outcome>"]
  Work --> Done([<Successful outcome>])
  Error --> End([End])

  classDef decision fill:transparent,stroke:#16a34a,stroke-width:2px;
  classDef activity fill:transparent,stroke:#d97706,stroke-width:2px;
  classDef endpoint fill:transparent,stroke:#64748b,stroke-width:2px;
  classDef error fill:transparent,stroke:#dc2626,stroke-width:2px;
  classDef subprocess fill:transparent,stroke:#2563eb,stroke-width:2px;
  class Valid decision;
  class Input activity;
  class Start,Done,End endpoint;
  class Error error;
  class Work subprocess;
```

When two or more visual classes are used, put a plain-text legend immediately
before the diagram and list only classes actually present. Shape and wording
must still convey meaning without color: prefix negative terminal nodes with
“Error:” and external dependencies with “External:” where ambiguity is likely.

## Process and UI adaptations

- A process flow may group steps into role/system subgraphs when ownership is
  the point. Preserve one direction through all lanes and keep handoffs labelled.
- A UI transition flow uses named screens/states and user actions on edges. It
  does not duplicate field validation or full screen content.
- For a complex scenario, use sequence for cross-system orchestration and a
  separate decision flow only when the branching rules cannot be read clearly
  from the sequence. Cross-link both to the same owner.

## Syntax and layout checks

- Use stable ASCII node IDs and human-readable labels in quotes.
- Balance brackets and quote labels containing punctuation, parentheses, or
  slashes.
- Put class definitions and assignments after nodes and edges.
- Avoid one edge crossing several unrelated groups; split the diagram or add a
  clearly labelled intermediate boundary.
- Render the final source with the portal's Mermaid version; syntax accepted by
  another renderer is not sufficient.
