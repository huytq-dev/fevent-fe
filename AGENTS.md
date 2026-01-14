# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router routes, layouts, and pages.
- `src/components/`: shared UI components.
- `src/features/`: feature-specific modules and flows.
- `src/hooks/`, `src/utils/`, `src/lib/`: reusable hooks and helpers.
- `src/config/`, `src/types/`, `src/providers/`, `src/middlewares/`: configuration, shared types, providers, and middleware.
- `public/`: static assets.
- Aliases from `tsconfig.json`: `@/components/*`, `@/utils/*`, etc.

## Build, Test, and Development Commands
- `npm run dev`: start the Next.js dev server on `http://localhost:3000`.
- `npm run build`: create a production build.
- `npm run start`: run the production server from `.next`.
- `npm run lint`: run ESLint (Next.js core-web-vitals + TypeScript rules).

## Coding Style & Naming Conventions
- Language: TypeScript + React (Next.js App Router).
- Indentation: 2 spaces (match existing TS/JS configs).
- Filenames: `kebab-case` for folders, `PascalCase` for React components where used.
- Prefer absolute imports via aliases (e.g., `@/components/Button`).
- Linting: ESLint is configured in `eslint.config.mjs`; follow its rules.

## Testing Guidelines
- No test runner is configured in `package.json` yet.
- If you add tests, document the framework and add a script (e.g., `npm run test`).

## Commit & Pull Request Guidelines
- Commit messages in history are short, imperative, and lowercase (e.g., "init project", "move app to src folder").
- PRs should include: clear description, linked issue (if any), and screenshots for UI changes.

## Configuration & Environment
- Use `.env` for local environment variables; avoid committing secrets.
- Next.js config is in `next.config.ts` and TypeScript paths in `tsconfig.json`.
