# Calculation contract

Maintain one machine-checkable source for quantities, effort, rates, contingency,
and totals. A Markdown summary or offer is a view of that source, not a second
calculation.

## Required item fields

| Field           | Rule                                                           |
| --------------- | -------------------------------------------------------------- |
| ID              | stable within the estimate and reused by summaries             |
| Scope anchor    | resolvable source or explicit assumption                       |
| Quantity/effort | number or range plus unit; blank is not zero                   |
| Role/rate       | named rate category and effective date/basis                   |
| Dependency      | priced elsewhere, included here, customer-owned, or unresolved |
| Contingency     | visible inclusion method; never hidden in a rate               |
| Subtotal        | formula-derived, not manually retyped                          |
| Status          | estimate, approved budget, or contractual price kept distinct  |

## Calculation order

1. Compute effort by item and role.
2. Compute base price from effort and applicable rates.
3. Apply contingency exactly once on the documented base.
4. Add explicit pass-through/license/travel or other non-effort costs.
5. Apply discounts or option adjustments with their basis visible.
6. Apply tax only at the defined stage.
7. Round according to one stated rule and reconcile displayed subtotals to total.

Keep currency conversion rate and date visible when used. Do not combine
currencies without conversion. Distinguish person-days, calendar duration, team
capacity, and elapsed schedule; none can be derived from another without
staffing/dependency assumptions.

## Verification

Recalculate totals independently. Check option totals use the same basis, no item
is counted twice, formulas cover added rows, blanks remain visible, rates match
roles, tax/contingency are neither omitted nor duplicated, and offer totals match
exactly. Record any manual override and its approval/evidence.
