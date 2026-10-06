---
title: Post title
date: 2026-07-10
category: Announcements
description: One-line summary shown on the blog index and used as the page description.
draft: true
---

Copy this file to a new name (for example `my-post-slug.md`). The filename without `.md` becomes the URL: `/blog/my-post-slug`.

Frontmatter fields:

- **title** (required) — large headline on the post page
- **date** (required) — ISO date `YYYY-MM-DD`, shown under the title
- **category** (optional) — small label above the title (e.g. Announcements, Product)
- **description** (optional) — shown on the blog index list
- **draft** (optional) — set to `true` to hide the post from the site

Write the body in Markdown below the frontmatter. Supports headings, lists, links, emphasis, code, tables, and blockquotes.

## Section heading

Body text with [inline links](https://example.com), **bold**, and _italic_.

Use a blockquote for an update callout (styled like Anthropic’s “UPDATE” badge):

> **UPDATE** · Short update title · 1 Jul 2026
>
> Access is restored and the rest of the detail continues here.

### Subsection

- Bullet one
- Bullet two

1. Numbered step
2. Another step

```ts
// Fenced code blocks work too
const example = true;
```
