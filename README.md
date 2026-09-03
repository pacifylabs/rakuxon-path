# rakuxon-edu-FE

Turborepo monorepo for the Rakuxon Ed frontend surfaces. See `docs/` for the
PRD, implementation plan, design system and branch strategy.

## Current state

Stage 0 (trimmed) + the public landing page. The four remaining app shells
and the BE health badge are deliberately deferred — there is no backend to
call yet. See `docs/02-implementation-plan.md` for the full stage order.

```
apps/
└── base-site/     # Next.js, statically generated marketing page
packages/
├── ui/            # design system: theme tokens, ThemeProvider, components
├── config/        # NEXT_PUBLIC_* env validation
└── tsconfig/      # shared TypeScript configs
```

## Getting started

```bash
pnpm install
pnpm dev
```

The landing page runs at http://localhost:3000. It needs no environment
variables — it makes no API calls.

## Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Runs every app's dev server |
| `pnpm test` | Vitest + React Testing Library, once |
| `pnpm test:watch` | The TDD loop |
| `pnpm typecheck` | `tsc --noEmit` across the workspace |
| `pnpm build` | Production build of every app |

CI runs typecheck, test and build on every push.

## Design tokens

Every colour, size, radius and shadow is a CSS custom property published by
`ThemeProvider` from `packages/ui/src/theme/tokens.base.ts`.

The Tailwind preset in `packages/ui/tailwind-preset.cjs` **replaces** rather
than extends Tailwind's scales, so `bg-blue-500`, `p-7` and `rounded-3xl` do
not compile. If a utility you want does not exist, add the token — do not
reach for an arbitrary value.

Tenants may override brand tokens only (`--color-primary`, `--color-accent`,
`--font-heading`, the brand name). State and neutral tokens are fixed so
"danger" means the same thing in every tenant; `tokens.types.ts` encodes this
and `mergeTokens` enforces it.

## Rules for this repo

- Test first — red, green, refactor. Commit on green.
- API types come from `packages/contract`; never hand-type a response shape.
- No Cloudinary key or secret client-side, ever. Documents are viewed through
  backend-signed URLs, never a constructed public URL.
- No raw colour or spacing values in app code.
