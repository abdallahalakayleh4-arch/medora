# Repository Guidelines

This repository is a TanStack Start app that preserves the original Medora UI. Keep changes focused, easy to review, and consistent with the existing route-per-page structure.

## Project Structure & Module Organization

- Application routes live in `app/routes` (`index.tsx`, `login.tsx`, `dashboard.tsx`, etc.).
- Shared helpers are in `app/lib` (Firebase setup, auth guard, HTML helpers).
- Legacy HTML templates remain in the repo root (`*.html`) and are imported as raw markup.
- Content data is served from `public/book.json` and `public/book_structured.json`.
- UI reference screenshots are stored as `.png` files in the root.

## Build, Test, and Development Commands

- `npm install`: install dependencies.
- `npm run dev`: start the TanStack Start dev server.
- `npm run build`: create a production build.
- `npm run start`: run the production server locally.
- `npm run typecheck`: run TypeScript checks.

## Coding Style & Naming Conventions

- Keep JSX and TypeScript formatting consistent with existing route files.
- Prefer double quotes for JSX props and strings.
- Keep functions in `camelCase` and file names in `kebab-case`.
- When updating markup, prefer editing the corresponding HTML template and reusing it via `?raw`.

## Testing Guidelines

No automated tests are configured. Manually validate:

- Login/logout flow (`app/routes/login.tsx`).
- Auth redirects on protected routes (`app/lib/useAuthGuard.ts`).
- Knowledge search data rendering (`app/routes/knowledge.tsx`).

## Commit & Pull Request Guidelines

- Recent commits use short, imperative summaries like `Update reports route`; follow that pattern and mention the primary file touched.
- Keep commits scoped to a single route or feature.
- PRs should include a clear summary, manual test notes, and screenshots for UI changes when relevant.

## Security & Configuration Tips

- Firebase config is centralized in `app/lib/firebase.ts`; do not introduce secrets or private keys into the repo.
- If new configuration is required, document it in the PR description and keep defaults safe for local use.
