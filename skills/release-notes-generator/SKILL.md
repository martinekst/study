---
name: release-notes-generator
description: Generate a Confluence release notes page from Jira tickets grouped by epic/area, then export it to a branded PDF via Scroll PDF Exporter.
metadata:
  author: "Tomáš Pokorný"
---

# Release Notes Generator

You are creating a Confluence release notes page from Jira tickets, then exporting it to a branded PDF. The goal is a clean, structured page that gives QA and stakeholders a clear picture of what's in the release — a summary overview at the top, then detailed per-area descriptions below — plus a PDF the user can share.

## Step 1: Gather parameters

Collect the parameters below. Anything not clear from the conversation must be asked before proceeding — use the AskUserQuestion tool to ask the open ones together in one prompt. Do not guess the project key, the status filter, the fix version, or where the page goes.

1. Jira project key (e.g. ISS). If the user hasn't said and it isn't obvious from context, ask. If a previous turn in the conversation already established it, reuse it.
2. Status filter — which Jira status(es) count as "in this release". Ask if not given. Common answer for the ISS project: READY TO PROD (the deployable status — note: it is NOT "READY TO DEPLOY"). The user may also want to include additional statuses (e.g. TEST DEV) or not filter by status at all. If the user says "everything in the fix version regardless of status", skip the status filter.
3. Fix version / release name (e.g. R2.4, R2.5.1) — used to filter tickets and title the page. Ask if not given. If the user isn't tracking fix versions, fall back to status-only filtering.
4. Confluence destination — ask where the release notes should go. Two cases:    - Existing page (most common — the user usually pre-creates an empty page and gives you its URL or ID): capture the page ID. You will update that page, not create a new one.    - New page: capture the space key and parent page ID. For the ISS project, the default parent is the "Fáze 2 – Roadmap" page (ID: 5426413570).

## Step 2: Fetch tickets from Jira

Search with JQL, filling in the gathered parameters. With both status and fix version:

```
project = {KEY} AND status = "{STATUS}" AND fixVersion = "{VERSION}" ORDER BY issuetype ASC, key ASC
```

Multiple statuses:

```
project = {KEY} AND status IN ("{STATUS1}", "{STATUS2}") AND fixVersion = "{VERSION}" ORDER BY issuetype ASC, key ASC
```

No status filter (everything in the version):

```
project = {KEY} AND fixVersion = "{VERSION}" ORDER BY key ASC
```

No fix version (status only):

```
project = {KEY} AND status = "{STATUS}" ORDER BY issuetype ASC, key ASC
```

Fetch fields: summary, issuetype, status, assignee, description, parent, fixVersions. Use a limit of 50 to catch all tickets in one call.

Verify the count. If the user mentioned an expected number of tickets ("it should have 8"), compare it against what the query returns. If they differ, re-run the query (the fix version may have changed since you last looked — tickets get added or moved between versions mid-review) and reconcile. Tickets you deliberately exclude as internal (see Step 3) still count toward the user's total — if the user's number only adds up when internal tickets are included, include them.

## Step 3: Group tickets by area

Each ticket has a parent field pointing to its epic. Group tickets by epic name — this becomes the "area" in the release notes. If a ticket has no parent epic, group it under a catch-all like "Ostatní" (or "Other" if the project is in English).

Good area names come from the epic title stripped of any prefix tags like [Backend]/[Frontend]/[Fullstack]. For example, epic "Číselníky Testovacích relací a norem" becomes area "Číselníky". Use your judgment to keep area names concise and readable. When an epic is a catch-all "extra work" bucket (e.g. "Vícepráce S13/14"), don't use it as an area name — regroup its tickets by their actual feature (multi-parameter tests, report tweaks, etc.).

If you recognise multiple tickets clearly belonging to the same product area (e.g. a backend + frontend ticket both doing "Úprava skupin"), group them together even if their epic names differ slightly.

Internal tickets: By default you may drop purely internal chores with no user-facing or operational effect (dependency bumps, dead-code cleanup, agents.md updates, test-speed chores, pure analysis/design tasks) into an "Ostatní" section or omit them — but only if the user hasn't asked for a specific total. If the user's expected ticket count requires them, include them with an honest, plain description (e.g. "Technická údržba — bez dopadu na funkčnost aplikace").

## Step 4: Write the page content

Use this structure — the summary table comes first, detailed sections come after. This order matters: readers scan the summary first, then drill into specifics.

```
## {VERSION} – Release Notes

**Datum nasazení na STAG:** {DATE or TBD}

{One sentence describing the release at a high level — what's the main theme?}

---

## Přehled ticketů

| Ticket | Název | Oblast |
|--------|-------|--------|
| [ISS-XXX](link) | Název ticketu | Oblast |

---

## {Oblast / Area name}

{Optional: one sentence context about this area if it's a significant new feature or breaking change.}

| Ticket | Popis |
|--------|-------|
| [ISS-XXX](link) | **[Backend/Frontend/Fullstack]** Concise description of what was implemented, focused on what changed and why it matters to the user or system. |

---

{Repeat per area}
```

For the deployment date, use the date the user gives you. If they don't give one, write TBD and tell them at the end that you left it as TBD — do not invent a date.

### Writing good ticket descriptions

The audience is non-technical: product owners, QA, and the client. Descriptions must answer "what can the user now do differently?" — not "what did we change in the code?".

Each ticket description should: - Start with [Backend], [Frontend], [Fullstack], or [Bug] in bold, derived from the ticket title prefix / issue type - Lead with the user-facing or business outcome — what capability was added, what problem was solved, what the user can now do - Never mention database tables, migrations, API endpoints, M:N relations, entity names, or any implementation detail that has no meaning outside the dev team - Only include a technical note if it has a direct operational implication — e.g. "existing groups with tests have been automatically converted to Testing Profiles" (the user will see their data reorganised), not "the GroupTests join table was dropped" - Be one or two sentences — clear and direct

Good: "Uživatel může nyní vybírat hráče do skupin hromadně — výběrem více hráčů najednou místo jednoho po druhém." Bad: "Implementován multiselect komponent pro výběr hráčů, nahrazující single-select na endpoint POST /groups/players."

The Jira ticket description is source material, not the output. Extract the business intent, discard the implementation. When a ticket's summary is ambiguous, fetch its description to write an accurate note.

### Language

Match the language of the Confluence space. For the ISS project, write in Czech. Area headings, intro text, and table headers should all be in Czech.

### Ticket links

Always link ticket numbers directly to Jira, in the form https://techfides.atlassian.net/browse/ followed by the ticket key (e.g. ISS-429).

## Step 5: Publish to Confluence

Updating an existing page (the destination is a page ID/URL the user gave you): fetch it first with confluence_get_page, then confluence_update_page with content_format markdown. Keep the existing title unless it has an obvious typo or is inconsistent with the release naming (e.g. "R.5" becomes "R2.5") — fix it and mention you did. Set emoji to the rocket. Add a short version_comment describing the change.

Creating a new page (the destination is a space + parent): - Title format: Release Notes - {VERSION} (match the naming of the space's other release-notes pages) - Emoji: rocket - Content format: markdown - Parent: the parent page ID gathered in Step 1

If the page already has rich content (info/note panels, macros, layouts), follow the safe fetch-edit-verify workflow — see the confluence-writing skill — so you don't clobber macros. A page you created or an empty page is safe to replace wholesale.

After publishing, note the page URL — you'll need it for the PDF export.

## Step 6: Export to PDF

The PDF must be produced with the Scroll PDF Exporter Confluence app using the "TF Documentation v3 bez table of contents" template — this is what gives the PDF its TechFides branding. This app cannot be triggered through the Atlassian MCP (which only does page CRUD), so use browser automation, and fall back to manual steps if that isn't possible.

Attempt automated export first (via the chrome-devtools tools): 1. Connect to the user's Chrome and open the published Confluence page URL. The user must be logged into Confluence in that browser; if no page/tab is reachable or the user isn't authenticated, skip to the manual fallback. 2. Open the page's app/export menu: the Apps menu (or the more-actions "..." menu) in the top-right of the page, then "Export with Scroll PDF Exporter" (the user may call it "Scroll PDF Explorer" — same thing). 3. In the export dialog, select the template / export scheme "TF Documentation v3 bez table of contents". 4. Trigger Export and wait for the PDF to be generated and downloaded. 5. Locate the downloaded file and deliver it to the user with SendUserFile (status proactive, display attach).

Take a snapshot before clicking to find the right elements, and don't guess menu positions — the Scroll UI changes between versions. If any step can't be completed reliably, stop and use the fallback rather than clicking blindly.

Manual fallback — give the user these exact steps and ask them to download the PDF (they can then share it or send it back to you): 1. Open the published page in Confluence. 2. Top-right of the page, Apps (or the "..." menu), then "Export with Scroll PDF Exporter". 3. Choose the template "TF Documentation v3 bez table of contents". 4. Click Export and download the resulting PDF.

## Step 7: Report back

Give the user: the published page URL, a one-line summary of how many tickets across how many areas, anything you excluded and why, whether the deployment date was left as TBD, and the PDF (delivered as a file, or the manual steps if automation wasn't possible).

## Example input

"can you create release notes for fix version R2.4 pls? put them here: [Confluence page URL]. it should have 22 tickets"

## Example output

A published Confluence release-notes page (rocket emoji) titled "Release Notes - R2.4" containing: a one-line release summary, a "Přehled ticketů" overview table, and per-area sections (grouped by epic) with user-facing Czech descriptions for all 22 tickets — followed by a branded PDF exported via the Scroll PDF Exporter "TF Documentation v3 bez table of contents" template, delivered to the user.
