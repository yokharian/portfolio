# Portfolio — 11ty + Tailwind

This repository contains a personal portfolio site built with [Eleventy (11ty)](https://www.11ty.dev/) and Tailwind CSS.

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

- `blog_posts/` — existing Markdown posts are auto-collected and listed on the home page.
- `src/layouts/` — Nunjucks layouts (`base.njk`).
- `src/pages/` — pages (e.g., `index.njk`).
- `src/styles/` — Tailwind CSS entry (`tailwind.css`).
- `public/` — static assets passthrough to site root (e.g., `/assets/styles.css`).

## Notes

- Tailwind scans `**/*.{html,njk,md}` excluding `_site`, `node_modules`, `.taskmaster`, and `UI_UX_GUIDE`.
- Blog posts are sourced from `blog_posts/**/*.md`.
- You can add images to `public/images/` and reference them as `/images/...`.

## Next steps

- Git hooks (Husky) are configured with a pre-commit that runs `npm run build`. Run `npm install` once to activate hooks.
- Optionally add ESLint/Prettier and lint-staged for formatting/linting.
- Add more pages and components as needed.

<!-- TASKMASTER_EXPORT_START -->
> 🎯 **Taskmaster Export** - 2025-09-13 00:28:11 UTC
> 📋 Export: without subtasks • Status filter: none
> 🔗 Powered by [Task Master](https://task-master.dev?utm_source=github-readme&utm_medium=readme-export&utm_campaign=portfolio&utm_content=task-export-link)

| Project Dashboard |  |
| :-                |:-|
| Task Progress     | ████░░░░░░░░░░░░░░░░ 20% |
| Done | 3 |
| In Progress | 0 |
| Pending | 12 |
| Deferred | 0 |
| Cancelled | 0 |
|-|-|
| Subtask Progress | ██████████░░░░░░░░░░ 52% |
| Completed | 25 |
| In Progress | 0 |
| Pending | 23 |


| ID | Title | Status | Priority | Dependencies | Complexity |
| :- | :-    | :-     | :-       | :-           | :-         |
| 1 | Project Setup and Repository Configuration | ○&nbsp;pending | high | None | N/A |
| 2 | Implement Base Layout Components | ✓&nbsp;done | high | 1 | N/A |
| 3 | Develop Markdown Processing System | ✓&nbsp;done | high | 1 | N/A |
| 4 | Design and Implement Homepage Hero Section | ✓&nbsp;done | high | 2 | N/A |
| 5 | Implement Featured Work Section | ○&nbsp;pending | medium | 3, 4, 1 | N/A |
| 6 | Implement Certifications Section | ○&nbsp;pending | medium | 2, 4 | N/A |
| 7 | Develop Individual Project Page Template | ○&nbsp;pending | high | 3 | N/A |
| 8 | Implement SEO Optimization | ○&nbsp;pending | medium | 2, 3, 7 | N/A |
| 9 | Implement Performance Optimizations | ○&nbsp;pending | medium | 2, 3, 4, 5, 6, 7 | N/A |
| 10 | Implement Language Switching Functionality | ○&nbsp;pending | medium | 2, 3, 7 | N/A |
| 11 | Implement Animation and Interactive Elements | ○&nbsp;pending | low | 4, 5, 6, 7 | N/A |
| 12 | Implement AWS CloudWatch RUM Integration | ○&nbsp;pending | low | 9 | N/A |
| 13 | Create Sample Project Content | ○&nbsp;pending | medium | 3, 7 | N/A |
| 14 | Configure AWS Amplify Hosting | ○&nbsp;pending | medium | 1, 9 | N/A |
| 15 | Final Testing and Launch | ○&nbsp;pending | high | 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 | N/A |

> 📋 **End of Taskmaster Export** - Tasks are synced from your project using the `sync-readme` command.
<!-- TASKMASTER_EXPORT_END -->
