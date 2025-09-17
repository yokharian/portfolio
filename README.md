# Portfolio — 11ty + Tailwind + TypeScript

This repository contains a personal portfolio site built with [Eleventy (11ty)](https://www.11ty.dev/), Tailwind CSS, and TypeScript for enhanced type safety and developer experience.

## Quick start

Prerequisites: Node.js 18+ and npm.

1. Install dependencies

```
npm install
```

2. Start development server (with Tailwind watch)

```
npm run dev
```

Open http://localhost:8080

3. Production build

```
npm run build
```

The static site will be generated into the `_site/` directory. Assets are copied from `public/`.

## Structure

- `src/blog_posts/` — existing Markdown posts are auto-collected and listed on the home page.
- `src/layouts/` — Nunjucks layouts (`base.njk`).
- `src/pages/` — pages (e.g., `index.njk`).
- `src/styles/` — Tailwind CSS entry (`tailwind.css`).
- `src/public/` — static assets passthrough to site root (e.g., `/assets/css/styles.css`).
- `src/utils/` — TypeScript utility functions for content processing, dates, i18n, etc.
- `src/types/` — TypeScript type definitions and interfaces.
- `src/client/` — Client-side TypeScript files for browser functionality.
- `src/scripts/` — Build and development scripts in TypeScript.

## TypeScript Features

This project uses TypeScript for enhanced type safety and developer experience:

- **Strict Type Checking**: All TypeScript files use strict mode with comprehensive type checking
- **Type Definitions**: Comprehensive interfaces for all data structures and API contracts
- **Client-Side TypeScript**: Browser JavaScript converted to TypeScript with DOM type definitions
- **Build Integration**: TypeScript compilation integrated into development and production workflows
- **Testing**: Jest integration with TypeScript for type-safe unit testing

### Available Scripts

#### Development

- `npm run dev` - Start development server with hot reloading
- `npm run dev:css` - Watch Tailwind CSS changes
- `npm run dev:client` - Watch client-side TypeScript changes

#### Building

- `npm run build` - Full production build with type checking
- `npm run build:css` - Build CSS with Tailwind
- `npm run build:client` - Compile client-side TypeScript

#### Testing

- `npm test` - Run full test suite with type checking
- `npm run test:unit` - Run Jest unit tests
- `npm run test:types` - Run TypeScript type checking

#### Migration Tools

- `npm run migration:status` - Check migration progress
- `npm run migration:verify` - Verify complete migration
- `npm run optimize` - Check for type issues and bundle sizes

## Notes

- Tailwind scans `**/*.{html,njk,md,ts,js}` excluding `_site`, `node_modules`, `.taskmaster`, and `UI_UX_GUIDE`.
- Blog posts are sourced from `src/blog_posts/**/*.md`.
- You can add images to `src/public/images/` and reference them as `/images/...`.

## Featured Projects (homepage)

Mark any project as featured by adding `featured: true` to its frontmatter. Optional ordering can be set with a numeric `order` (lower numbers appear first). Example:

```md
---
title: Sample Project
description: A simple example.
lang: en
featured: true
order: 10
heroImage: /assets/images/sample.jpg
alt: Screenshot of Sample Project
tags: [JavaScript, Eleventy]
---
```

Image guidelines for best results:

- Use a landscape image approximately 3:2 (e.g., 900×600).
- Place images under `public/assets/images/` and reference with an absolute path (e.g., `/assets/images/your-image.jpg`).
- The build generates responsive formats (WebP/JPEG) at multiple widths and lazy-loads them automatically.

## Certifications Section

Add your certifications by editing `src/data/certifications.json`. Each item supports localized text via i18n keys:

- id: stable identifier string
- nameKey: i18n key for the certification name (e.g., `certifications.names.awsSAA.name`)
- issuerKey: i18n key for the issuer (e.g., `certifications.names.awsSAA.issuer`)
- issueDate: ISO date string (YYYY-MM-DD)
- credentialUrl: verification URL (will open in a new tab)
- badgeImage: path to an SVG/PNG under `public/assets/images/`
- altKey: i18n key for the badge alt text

Translations live in `src/data/i18n.json` under `certifications`. The homepage renders a responsive, accessible grid under the “Certifications” section, including JSON-LD (EducationalOccupationalCredential) for SEO.

## Next steps

- Git hooks (Husky) are configured with a pre-commit that runs `npm run build`. Run `npm install` once to activate hooks.
- Optionally add ESLint/Prettier and lint-staged for formatting/linting.
- Add more pages and components as needed.

<!-- TASKMASTER_EXPORT_START -->
> 🎯 **Taskmaster Export** - 2025-09-17 22:20:23 UTC
> 📋 Export: without subtasks • Status filter: none
> 🔗 Powered by [Task Master](https://task-master.dev?utm_source=github-readme&utm_medium=readme-export&utm_campaign=portfolio&utm_content=task-export-link)

| Project Dashboard |  |
| :-                |:-|
| Task Progress     | ████████████░░░░░░░░ 60% |
| Done | 3 |
| In Progress | 0 |
| Pending | 2 |
| Deferred | 0 |
| Cancelled | 0 |
|-|-|
| Subtask Progress | ████████████░░░░░░░░ 60% |
| Completed | 15 |
| In Progress | 0 |
| Pending | 10 |


| ID | Title | Status | Priority | Dependencies | Complexity |
| :- | :-    | :-     | :-       | :-           | :-         |
| 6 | Initialize Astro Project and Core Configuration | ✓&nbsp;done | high | None | N/A |
| 7 | Migrate Nunjucks Layouts and Partials to Astro Components | ✓&nbsp;done | high | 6 | N/A |
| 8 | Set Up Content Collections and Migrate Data Files | ✓&nbsp;done | high | 6 | N/A |
| 9 | Migrate Page Templates and Implement i18n Routing | ○&nbsp;pending | high | 7, 8 | N/A |
| 10 | Finalize Build, Verify SEO, and Test Deployment | ○&nbsp;pending | high | 9 | N/A |

> 📋 **End of Taskmaster Export** - Tasks are synced from your project using the `sync-readme` command.
<!-- TASKMASTER_EXPORT_END -->











