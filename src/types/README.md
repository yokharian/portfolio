This directory contains shared TypeScript type definitions for the portfolio project.

Guidelines:
- Add global ambient declarations in `global.d.ts` (avoid polluting the global scope unnecessarily).
- Create feature-specific `.d.ts` files as needed (e.g., `eleventy.d.ts`, `content.d.ts`).
- Prefer exporting interfaces/types from actual `.ts` modules in `src/` when possible.
