# Business evidence scan

Scan available material top-down and build a small evidence map before writing.
The inputs may be interviews, a proposal, an existing portal, measurements,
research, or implementation evidence; source type is run context, not a README
setting.

| Responsibility        | Evidence to locate                                                                 | Do not infer                                    |
| --------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------- |
| Decision summary      | decision, sponsor question, problem, desired outcome, deadline                     | a decision that nobody has to make              |
| Current state         | named processes, roles, systems, workarounds, volumes, cycle time, errors, cost    | negative labels without a cited pain            |
| Target state          | agreed/proposed outcomes, role changes, retained/replaced systems, target measures | implementation mechanics                        |
| Value                 | a supported current-to-target delta, beneficiary, measure, time horizon            | generic benefit language or unsupported savings |
| Stakeholders          | named role/team, interest, influence, required input, expected output              | ownership based only on job-title conventions   |
| Risks and assumptions | dependency, trigger, impact, mitigation, decision owner                            | likelihood, severity, or owner without evidence |
| Roadmap               | outcome milestones, dependencies, gates, external dates, definition of completion  | calendar dates or staffing commitments          |

For each intended page record the evidence reference, supported claims, material
gaps, and canonical owner. If a source has only a target but no baseline, keep
the target and state that value cannot yet be quantified. If it has only a
baseline, expose the missing target as an open decision.

Lifecycle controls how uncertainty is presented:

- `discovery`: alternatives and open questions are expected; distinguish
  observations, customer statements, recommendations, and assumptions;
- `implementation-ready`: target outcomes and acceptance measures must be
  agreed or an unresolved item is a blocking gap;
- `as-built`: current behavior must agree with inspected implementation or
  operational evidence for the stated scope; proposed outcomes stay separate.

Route scenario steps, screen behavior, implementation design, explicit tests,
and change packages to their canonical sections. Business pages summarize why
those details matter and link to them.
