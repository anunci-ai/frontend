# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc -b`) then `vite build`
- `npm run typecheck` — `tsc --noEmit` (no test runner is configured)
- `npm run lint` — ESLint over the repo
- `npm run format` — Prettier write on all `.ts`/`.tsx`

## Stack

- React 19 + TypeScript (strict, `noUnusedLocals`/`noUnusedParameters` on)
- Vite 7 with `@vitejs/plugin-react` and `@tailwindcss/vite`
- Tailwind v4 — no `tailwind.config.*`; theme tokens live in `src/index.css` via `@theme inline` and `:root` / `.dark` CSS variables. `tw-animate-css` and `shadcn/tailwind.css` are imported there too.
- shadcn/ui configured in `components.json`: style `radix-vega`, baseColor `zinc`, icon library `hugeicons`. A custom registry alias `@reui` points to `https://reui.io/r/{style}/{name}.json` — install reui components with `npx shadcn@latest add @reui/<name>`.
- Icons: `@hugeicons/react` (`<HugeiconsIcon icon={...} />`) with icons from `@hugeicons/core-free-icons`. Do not pull in lucide-react.
- `radix-ui` is the new meta-package (single import surface). Don't add `@radix-ui/react-*` sub-packages.
- TanStack Router is installed and `src/routes/__root.tsx` exists, but `src/main.tsx` currently renders `<App />` directly — the router is not yet mounted. If adding routes, expect to wire `createRouter` + `RouterProvider` into `main.tsx`.

## Conventions

- Path alias `@/*` → `src/*` (configured in both `tsconfig.app.json` and `vite.config.ts`). Prefer `@/...` over relative paths for cross-folder imports.
- shadcn aliases (per `components.json`): `@/components/ui`, `@/components`, `@/lib/utils`, `@/lib`, `@/hooks`.
- `cn()` from `@/lib/utils` is the standard `clsx` + `tailwind-merge` helper for conditional classes.
- Prettier: no semicolons, double quotes, 2 spaces, ES5 trailing commas, 80-col. `prettier-plugin-tailwindcss` is active and recognizes `cn` and `cva` for class sorting.
- File naming: kebab-case (`create-listing-form.tsx`, `collapsed-tooltip.tsx`).
- UI copy is in Brazilian Portuguese (e.g. "Novo Anúncio", "Marketplace"). Match this when adding user-facing strings.

## Component layout

- `src/components/ui/` — shadcn primitives (don't reinvent; add via `npx shadcn@latest add <name>`).
- `src/components/reui/` — components installed from the reui.io registry.
- `src/components/examples/` — example/demo compositions from registries.
- `src/components/` (top-level) — app-specific components (`sidebar.tsx`, `create-listing-form.tsx`, `theme-provider.tsx`, etc.).

## Theme system

`ThemeProvider` (`src/components/theme-provider.tsx`) wraps the app in `main.tsx`. It supports `light` / `dark` / `system`, persists to `localStorage["theme"]`, syncs across tabs, and toggles via the `d` key (ignored when typing in editable elements). Don't reimplement theme handling; consume via `useTheme()`.
