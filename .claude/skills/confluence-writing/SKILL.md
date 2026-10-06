---
name: confluence-writing
description: Use whenever editing an existing Confluence page via the Atlassian MCP tools — fetch fresh in storage format, edit the XHTML directly, and write back in storage format so info/note/warning panels, expands, and other macros (including user mentions) are never silently flattened.
metadata:
  author: "Tomáš Pokorný"
---

# Writing to Confluence safely

Editing a Confluence page has three traps that are easy to fall into and expensive to undo. This skill exists because all three have already bitten us on real pages.

## The three traps

**1. Editing a stale copy.** Users frequently hand-edit a page between (and even during) your turns — reordering sections, adding note panels, fixing wording. If you edit from a copy you fetched earlier, your write overwrites their changes with no warning. The content you send replaces the *entire* page body.

**2. Flattening rich elements.** Confluence stores pages as **storage format** — XHTML containing macros like `<ac:structured-macro ac:name="info">` (the colored info/note/warning panels), expands, layouts, status badges, and more. Fetching with `convert_to_markdown: true` is *lossy*: those macros collapse into plain text. If you then write markdown back, the panel wrapper is gone — an info panel becomes an ordinary paragraph, a status badge becomes a bare word. The text survives but the structure is quietly destroyed, and the user has to notice and complain before you even know it happened.

**3. `convert_to_markdown: false` is not fully raw — user mentions are the known exception.** On the `mcp__atlassian` connector, `confluence_get_page` with `convert_to_markdown: false` claims to return true storage XHTML, but it silently degrades `@mention` macros to plain `@Name` text even in this "raw" mode — the lossiness happens on *read*, before you ever touch the content. If you then round-trip that fetched body back through `confluence_update_page`, the plain-text mention becomes permanent: the real, clickable mention is gone from the page forever, even though nothing in your diff looked like it touched that paragraph. This was confirmed empirically: a page's real mention macro survived several `mcp__atlassian` storage fetches untouched (because nothing wrote it back) but was destroyed the moment a storage-format `confluence_update_page` call included that paragraph, even unchanged.

- **Before writing back a body that contains any `@Name` text**, don't trust that it's already just text. Cross-check against a connector that surfaces the true node, e.g. `mcp__claude_ai_Atlassian__getConfluencePage` with `contentFormat: "html"`, which renders real mentions as `<span data-type="mention" data-user-id="ACCOUNT_ID">@Name</span>`. If that shows a mention where the `mcp__atlassian` fetch showed plain text, preserve it by writing back through `mcp__claude_ai_Atlassian__updateConfluencePage` (contentFormat `"html"`) with the proper `<span data-type="mention" data-user-id="...">` node instead of plain text, or exclude that paragraph from your edit entirely.
- If a mention has already been flattened by a past edit and you're asked to restore it, get the account ID via `confluence_search_user` or by finding another page/comment where the same person is still a live mention.

## The safe workflow

Do this every time, for every edit, even a one-word change:

1. **Fetch fresh, in storage format.** Call `confluence_get_page` (or the history/version equivalent) with `convert_to_markdown: false`. This gives you the true XHTML, so you can *see* the macros — info panels, expands, layouts — that markdown would have hidden. Do this immediately before editing, never reuse a body string from an earlier turn. If the body contains any `@Name` text, don't assume it's plain text — see trap 3 above, and cross-check with `mcp__claude_ai_Atlassian__getConfluencePage` (`contentFormat: "html"`) before you write anything back.
2. **Edit the storage HTML directly.** Make your change inside the XHTML you just fetched. Keep every existing macro intact — copy `<ac:structured-macro>…</ac:structured-macro>` blocks verbatim, preserve tables, layouts, and emoji. You're surgically inserting or modifying, not regenerating the page from a mental model of it.
3. **Write back in storage format.** Call `confluence_update_page` with `content_format: "storage"` and the full edited XHTML. Never send markdown for a page that contains macros — that's what flattens them. If the page has any real `@mention`s, write those through `mcp__claude_ai_Atlassian__updateConfluencePage` instead (see trap 3) so they aren't silently converted to plain text.
4. **Verify by re-fetching storage.** After the update, fetch again with `convert_to_markdown: false` and confirm the macros you meant to preserve are still there (search the returned body for `ac:name="info"`, your new text, etc.). This catches most flattening regressions — but *not* mention flattening, since `mcp__atlassian` shows mentions as plain text either way. To verify mentions specifically, re-fetch with `mcp__claude_ai_Atlassian__getConfluencePage` and confirm any `@Name` you expect is still a `data-type="mention"` span, not bare text.

## Writing the storage XHTML

A few practical notes so the round-trip stays clean:

- **You can drop `local-id` / `ac:local-id` / `ac:macro-id` attributes** when reconstructing elements. Confluence regenerates them. Keeping them is fine too; removing them just makes the HTML readable.
- **Panels** are `<ac:structured-macro ac:name="info|note|warning|tip"><ac:rich-text-body><p>…</p></ac:rich-text-body></ac:structured-macro>`. Match the `ac:name` to the panel color the user had.
- **Inline code** is `<code>…</code>`; **code blocks** are the `code` macro with a `<ac:plain-text-body><![CDATA[…]]></ac:plain-text-body>`.
- **Tables** need `<table><tbody><tr><th>/<td>…`. Preserve `data-layout` if present.
- **List items** wrap their text in `<p>`: `<li><p>text</p></li>`.
- Section dividers are `<hr/>`.

## When markdown is acceptable

For a **brand-new page with no macros** (plain headings, paragraphs, lists, tables), writing markdown via `content_format: "markdown"` is fine and more convenient — there's nothing to flatten. The moment a page gains an info panel, expand, layout, or status badge, switch to the storage-format workflow above. When unsure, fetch storage first and look: if you see `<ac:structured-macro>` anywhere, use storage.

## Version comments

Pass a short `version_comment` on every update describing what changed (e.g. "Added 'Nevyžaduje FR' label section"). Page history is the user's safety net; a clear comment makes it easy for them to see what you touched and revert if needed.
