# Project Content Authoring Guide

This guide explains how to author project pages using Markdown with frontmatter in this repository.

## Frontmatter Schema

Required fields:
- title (string): Project title.
- description (string): Short description.
- startDate (ISO date string YYYY-MM-DD): Project start.
- tags (string[]): List of technologies.
- heroImage (string): Path to hero image, relative to site root (e.g., "/assets/images/example.jpg").
- language ("en" | "es"): Content language.

Optional fields:
- employer (string): Employer or client name.
- endDate (ISO date string): Project end date. If omitted, page shows a localized "Present/Actual" label.
- slug (string): Custom slug (otherwise derived from filename).
- featured (boolean): Whether the project is featured.
- alt (string): Custom hero image alt text (defaults to title).

Example frontmatter:

---
title: "Sample Project"
description: "A simple example project to test markdown processing."
employer: "Acme Corp"
startDate: "2022-01-15"
endDate: "2022-06-30"
tags:
  - JavaScript
  - Eleventy
heroImage: "/assets/images/sample.jpg"
language: "en"
---

## Markdown Features

- Headings automatically get anchor links and IDs.
- External links open in a new tab with rel="noopener noreferrer".
- Code blocks are syntax highlighted (highlight.js).
- Tables (GFM-style) are supported.
- Images get lazy-loading and decoding="async" by default.

## Template & Layout

- All files in `content/projects/` use the `project.njk` layout automatically via `content/projects/projects.json`.
- The layout includes: hero image banner, metadata (title, dates, employer), main content (with Tailwind prose), and a "Technologies Used" section generated from tags.
- Permalinks are generated under `/projects/{fileSlug}/`.

## Language & Dates

- Add `language: "en" | "es"` in frontmatter to categorize content.
- Collections are available in Eleventy: `collections.projects`, `collections.projects_en`, and `collections.projects_es`.
- Dates are formatted with locale-aware month+year using the `dateRange` filter: `{{ startDate | dateRange(endDate, language) }}`.

## Images

- `heroImage` should point to a file under `public/` (e.g., `/assets/images/my-hero.jpg`).
- The build validates existence (logs a warning if missing) and generates default `alt` text from the title when `alt` is omitted.

## Local Development

- Run dev server: `npm run dev`
- Run full test suite: `npm test`
- Build the site: `npm run build`

## Authoring Tips

- Keep frontmatter field values simple (strings, arrays, booleans).
- Use ISO dates (YYYY-MM-DD).
- Prefer relative links and host external images carefully.
- For Spanish content, set `language: "es"` and dates will be localized.
