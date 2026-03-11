# Pirk — Technical specification

High-level technical overview of how the project is built, for handover or client reference.

---

## What this application does

**Pirk** is a surgeon-matching web app for the Australian market. It:

- **Public side:** Lets visitors take a short quiz (procedure, location, preferences), get matched with vetted surgeons, and see results. It includes marketing pages (home, breast-surgery, social landing), booking/payment-options, and static funnels.
- **Admin side:** Gives staff a password-protected dashboard to manage surgeons, clients, matches, and surgeon profiles; run the matching flow; and import data (e.g. CSV).
- **Integrations:** Can collect payment via Stripe (tiers: free, guided, concierge), use AI (Anthropic) for matching/parsing, and track with Meta/TikTok pixels.

Data is stored in PostgreSQL (surgeons, clients, matches). The site is behind a preview PIN in production; the dashboard is behind a separate password.

---

## What needs to be configured

Before going live or using all features, configure the following:

| What | Where | Required for |
|------|--------|----------------|
| **DATABASE_URL** | Vercel → Settings → Environment Variables (or `.env` locally) | App to run; already set if you use Vercel Postgres. |
| **DASHBOARD_PASSWORD** | Same | Logging into /dashboard and admin routes. |
| **NEXT_PUBLIC_BASE_URL** | Same | Correct links in emails and Stripe (e.g. `https://startpirkau.vercel.app`). |
| **STRIPE_SECRET_KEY** | Same | Checkout and paid tiers. |
| **STRIPE_PRICE_ID** (and optionally STRIPE_PRICE_ID_GUIDED, STRIPE_PRICE_ID_CONCIERGE) | Same | Stripe products for each tier. |
| **ANTHROPIC_API_KEY** | Same (optional) | AI-powered matching and typeform parsing. |
| **NEXT_PUBLIC_META_PIXEL_ID** / **NEXT_PUBLIC_TIKTOK_PIXEL_ID** | Same (optional) | Meta and TikTok tracking. |
| **Preview PIN** | Code: `src/middleware.ts` (`PREVIEW_PIN`) | Change or remove for public launch so the whole site isn’t behind a PIN. |

**Minimum for a working site:** `DATABASE_URL`, `DASHBOARD_PASSWORD`, and (for production URLs) `NEXT_PUBLIC_BASE_URL`. Add Stripe keys when you want paid signups; add pixels and Anthropic when you want tracking and AI features.

---

## 1. Runtime & framework

| Item | Technology |
|------|------------|
| **Framework** | [Next.js](https://nextjs.org/) 16.1.6 (App Router) |
| **Runtime** | Node.js (server); React 19 (client) |
| **Language** | TypeScript 5 (strict mode) |
| **React** | React 19.2.3, React DOM 19.2.3 |
| **Bundler** | Next.js (Turbopack in dev) |

The app uses the **App Router** (`src/app/`): file-based routing, React Server Components by default, layouts, and Route Handlers (API routes under `src/app/api/`).

---

## 2. Styling & UI

| Item | Technology |
|------|------------|
| **CSS** | [Tailwind CSS](https://tailwindcss.com/) 4 (via `@tailwindcss/postcss`) |
| **PostCSS** | `postcss.config.mjs` with Tailwind plugin only |
| **Font** | [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts, loaded via `next/font`) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) 12 |
| **Forms** | [React Hook Form](https://react-hook-form.com/) 7 |
| **Utilities** | `clsx`, `class-variance-authority` (CVA) for conditional classes |
| **Toasts** | [Sonner](https://sonner.emilkowal.ski/) |

No separate UI component library; components are custom built with Tailwind and shared in `src/components/`.

---

## 3. Database & ORM

| Item | Technology |
|------|------------|
| **Database** | PostgreSQL (production; e.g. Vercel Postgres or Neon) |
| **ORM** | [Prisma](https://www.prisma.io/) 7.4.2 |
| **Driver (production)** | `@prisma/adapter-pg` + `pg` (Node PostgreSQL client) |
| **Config** | `prisma.config.ts` (schema path, migrations, `DATABASE_URL`) |
| **Schema** | `prisma/schema.prisma` (generator: `prisma-client`, output: `src/generated/prisma`) |
| **Migrations** | `prisma/migrations/` (SQL migrations; applied on deploy via `prisma migrate deploy`) |

Main models: **Surgeon**, **Client**, **Match**, **MatchSurgeon**. Connection is via a single **`DATABASE_URL`** environment variable.

---

## 4. Hosting & deployment

| Item | Technology |
|------|------------|
| **Hosting** | [Vercel](https://vercel.com/) |
| **Build** | `npm run vercel-build` (see below) |
| **Config** | `vercel.json`: `buildCommand: "npm run vercel-build"` |
| **Env** | All secrets and config via Vercel Environment Variables (or `.env` locally) |

**Build steps (`vercel-build`):**

1. `prisma generate` — generate Prisma Client  
2. If `DATABASE_URL` is set: `prisma migrate deploy` — apply migrations  
3. `next build` — production Next.js build  

---

## 5. Authentication & protection

- **Site-wide (preview):** Middleware (`src/middleware.ts`) shows a PIN gate for non-localhost visitors. PIN is set in code; cookie `preview-pin` bypasses the gate.
- **Dashboard:** Same middleware requires cookie `dashboard-auth` for `/dashboard`, `/surgeons`, `/match`, `/clients`, `/surgeon-profiles`. Login at `/dashboard/login`; password checked by `POST /api/dashboard-auth` against **`DASHBOARD_PASSWORD`** env var; cookie set on success (httpOnly, 7 days).

No OAuth or third-party auth provider; dashboard is single shared password.

---

## 6. Integrations & external services

| Purpose | Technology / service |
|--------|-----------------------|
| **Payments** | [Stripe](https://stripe.com/) (Checkout; `stripe` npm package); price IDs and secret key from env |
| **AI (matching / parsing)** | [Anthropic](https://www.anthropic.com/) (`@anthropic-ai/sdk`); optional, used for quiz/match and typeform parsing when **`ANTHROPIC_API_KEY`** is set |
| **Analytics / ads** | Meta Pixel, TikTok Pixel (optional; `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID`) |
| **Spreadsheets** | `xlsx` for CSV/Excel import (e.g. surgeons import) |

Base URL for links/redirects: **`NEXT_PUBLIC_BASE_URL`** (e.g. `https://startpirkau.vercel.app`).

---

## 7. Project structure (high level)

```
src/
  app/                    # App Router: routes and API
    (public)/             # Public marketing routes (/, /quiz, /book-call, etc.)
    (social)/             # Social/landing routes (/start, /breast-surgery)
    api/                  # Route Handlers: /api/checkout, /api/quiz, /api/dashboard-auth, etc.
    dashboard/            # Dashboard + login
    surgeons/, match/, clients/, surgeon-profiles/
    results/, upgrade/, pdf/, profile/
  components/             # React components (landing, quiz, layout, tracking)
  config/                 # Procedures, brand, etc.
  generated/prisma/       # Prisma Client (generated; gitignored)
  lib/                    # DB client, utils, tracking, PDF, matching logic
  middleware.ts           # Preview PIN + dashboard auth
prisma/
  schema.prisma
  migrations/
public/                   # Static assets + funnel.html, funnel-b.html
```

Path alias **`@/*`** maps to **`./src/*`** (see `tsconfig.json`).

---

## 8. Environment variables (summary)

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes (production) | PostgreSQL connection string |
| `DASHBOARD_PASSWORD` | For dashboard login | Password for `/dashboard` and admin routes |
| `NEXT_PUBLIC_BASE_URL` | Recommended | App URL (emails, Stripe, links) |
| `STRIPE_SECRET_KEY` | For checkout | Stripe API key |
| `STRIPE_PRICE_ID` | For checkout | Default Stripe price ID |
| `STRIPE_PRICE_ID_GUIDED` / `STRIPE_PRICE_ID_CONCIERGE` | Optional | Tier-specific price IDs |
| `ANTHROPIC_API_KEY` | Optional | AI matching / typeform parsing |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta Pixel |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Optional | TikTok Pixel |

See **`.env.example`** in the repo for a full template.

---

## 9. Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Local development |
| `build` | `prisma generate && next build` | Local/production build (no migrate) |
| `vercel-build` | `prisma generate && (migrate deploy if DATABASE_URL) && next build` | Vercel build |
| `start` | `next start` | Run production build locally |
| `postinstall` | `prisma generate` | Generate Prisma Client after install |
| `lint` | `eslint` | Linting |

---

## 10. Browsers & compatibility

- Target: modern browsers (ES2017+; Next.js and React 19 defaults).
- No explicit legacy browser support (e.g. no IE11).

---

*Document generated for the Pirk project. Update as the stack or deployment changes.*
