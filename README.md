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
