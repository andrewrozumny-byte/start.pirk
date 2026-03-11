# Vercel deployment plan — Pirk

Pushing the repo to Vercel **will not work smoothly** as-is. The app uses **SQLite** (local file `pirk.db`) and **better-sqlite3**. Vercel’s serverless environment has no persistent filesystem, so the database would fail in production. Most pages (dashboard, surgeons, match, quiz, results, etc.) depend on the DB.

Below is a step-by-step plan for two scenarios: **marketing-only** (no DB) and **full app** (with a cloud database).

---

## Option A — Marketing-only (no database)

Use this if you only need the public marketing/landing pages and static funnels. Dashboard, surgeons, match, quiz results, and any API that uses the DB will not work.

### Steps

1. **Connect repo to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new).
   - Import your Git repo (e.g. the one that has `ChloePirk/pirkhomepagefunnel` merged).
   - Leave **Build Command**: `npm run build` (or leave default).
   - Leave **Output Directory** as default (Next.js is auto-detected).

2. **Ensure Prisma doesn’t break the build**
   - Add a **postinstall** that runs `prisma generate` so the Prisma client exists even if you don’t use the DB in this deploy:
   - In `package.json`:
     ```json
     "scripts": {
       "postinstall": "prisma generate",
       "dev": "next dev",
       "build": "next build",
       ...
     }
     ```
   - The build may still fail when any server code imports `@/lib/db` and tries to open SQLite. If it does, you’ll need Option B (full app with a real DB).

3. **Environment variables (optional for marketing)**
   - `NEXT_PUBLIC_BASE_URL` = `https://your-app.vercel.app` (or your custom domain).
   - Optional: `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID` for tracking.

4. **Preview PIN (middleware)**
   - The app currently shows a “Team Preview” PIN page for **non-localhost** visitors.
   - To open the site without the PIN on Vercel, either:
     - Enter the PIN once (cookie is set), or
     - Change/remove the PIN check in `src/middleware.ts` for production.

5. **Deploy**
   - Push to the branch connected to Vercel; deployment runs automatically.

**Result:** Homepage, `/start`, `/breast-surgery`, `/funnel.html`, `/funnel-b.html`, and other static or non-DB pages can work. Anything that hits the DB (dashboard, surgeons, match, quiz submission, results) will error until you complete Option B.

---

## Option B — Full app (with database) — recommended

Use this so the whole app (including dashboard, surgeons, match, quiz, results) works on Vercel.

### 1. Choose a production database

SQLite is not suitable for Vercel. Pick one:

- **Vercel Postgres** or **Neon** (PostgreSQL) — recommended; works with Prisma and Vercel.
- **Turso** (libSQL) — SQLite-compatible; you can keep the Prisma SQLite schema and use Turso’s connection URL with an adapter.

If you choose **Postgres** (Vercel Postgres or Neon), you’ll switch the Prisma datasource and adjust the app for Postgres (see below). If you choose **Turso**, you keep SQLite in the schema and only change the connection (and possibly the driver/adapter in `src/lib/db.ts`).

---

### 2. Switch to PostgreSQL (if you chose Vercel Postgres or Neon)

2.1. **Create the database**
   - **Vercel Postgres:** Vercel dashboard → your project → Storage → Create Database → Postgres.
   - **Neon:** [neon.tech](https://neon.tech) → create a project and copy the connection string.

2.2. **Point Prisma at Postgres**
   - In `prisma/schema.prisma`, change:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - Remove the `url` from `prisma.config.ts` datasource if it’s only for SQLite; rely on `env("DATABASE_URL")` for production.

2.3. **Adjust schema for Postgres (if needed)**
   - SQLite and Postgres are mostly compatible for simple types. Check for:
     - `Int` vs `BigInt`
     - JSON: SQLite often uses `String` for JSON; Postgres can use `Json` type.
   - Run `npx prisma validate` and fix any errors.

2.4. **Create migrations**
   - `npx prisma migrate dev --name init_postgres` (creates migration from current schema).
   - Commit the new migration files under `prisma/migrations`.

2.5. **Change `src/lib/db.ts` for Postgres**
   - Stop using the SQLite adapter and use the default Prisma client with `DATABASE_URL`:
     ```ts
     import { PrismaClient } from "@/generated/prisma/client";

     const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

     function createPrismaClient() {
       return new PrismaClient();
     }

     export const prisma = globalForPrisma.prisma ?? createPrismaClient();
     if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
     ```
   - Remove `@prisma/adapter-better-sqlite3` and `better-sqlite3` from production code paths (you can keep them in dev if you still use SQLite locally with a separate config).

2.6. **Optional: keep SQLite for local dev**
   - Use `DATABASE_URL` in production (Postgres) and a local `file:./pirk.db` or `DATABASE_URL` only when running locally, so the same codebase can use Postgres on Vercel and SQLite (or Postgres) locally.

---

### 3. If you chose Turso (keep SQLite schema)

- Create a Turso database and get the connection URL and auth token.
- Configure Prisma to use Turso (e.g. with `@prisma/adapter-turso` or Turso’s Prisma setup).
- In production, set `DATABASE_URL` (and any Turso-specific env) in Vercel; do not rely on a local file.

(If you want, we can add a separate “Turso setup” section with exact `db.ts` and schema snippets.)

---

### 4. Build and Prisma on Vercel

4.1. **Ensure Prisma client is generated on deploy**
   - In `package.json`:
     ```json
     "scripts": {
       "postinstall": "prisma generate",
       "build": "prisma generate && next build",
       ...
     }
     ```
   - Or use a custom **Build Command** in Vercel: `prisma generate && next build`.
   - `src/generated/prisma` is gitignored, so generation must run on Vercel.

4.2. **Migrations in production**
   - In Vercel **Build Command** you can run:
     `prisma generate && prisma migrate deploy && next build`
   - So the production DB is migrated on each deploy (ensure `DATABASE_URL` is set before build if you run migrations there).

---

### 5. Environment variables in Vercel

In Vercel: Project → Settings → Environment Variables. Add (and mark for Production / Preview as needed):

| Variable | Required for full app | Notes |
|----------|------------------------|--------|
| `DATABASE_URL` | Yes | Postgres (or Turso) connection string from step 2. |
| `STRIPE_SECRET_KEY` | If you use checkout | From Stripe dashboard. |
| `STRIPE_PRICE_ID` | If you use checkout | Default price. |
| `STRIPE_PRICE_ID_CONCIERGE` | If you use concierge | Optional. |
| `STRIPE_PRICE_ID_GUIDED` | If you use guided | Optional. |
| `NEXT_PUBLIC_BASE_URL` | Recommended | e.g. `https://your-app.vercel.app` or custom domain. |
| `ANTHROPIC_API_KEY` | If you use AI matching / typeform | For quiz/match AI features. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta/Facebook pixel. |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Optional | TikTok pixel. |

---

### 6. Preview PIN (production access)

- Same as Option A: either use the PIN once to set the cookie or change/remove the PIN gate in `src/middleware.ts` for production so the site is public.

---

### 7. Deploy

1. Commit all changes (Prisma schema, `db.ts`, `package.json` scripts, migrations).
2. Push to the branch connected to Vercel.
3. In Vercel, confirm **Build Command** (e.g. `prisma generate && prisma migrate deploy && next build`) and that **Root Directory** is correct if the app is in a subfolder.
4. Trigger a deploy (or rely on Git push). Check the build logs for `prisma generate` and `prisma migrate deploy` (if used).
5. After deploy, test:
   - `/` (homepage)
   - `/quiz` (submit quiz; should create client + match in DB)
   - `/dashboard`, `/surgeons`, `/match`, `/clients`, `/surgeon-profiles`
   - `/results/[matchId]` (with a real match ID from DB)

---

## Summary

| If you… | Then… |
|--------|--------|
| Just push without changes | Build may fail (missing Prisma client); runtime will fail on any DB use (SQLite not supported on Vercel). |
| Only need marketing pages | Option A: add `postinstall`/`prisma generate`, set optional env, fix or accept PIN; expect DB-dependent routes to fail. |
| Need full app (dashboard, quiz, match, etc.) | Option B: add a cloud DB (Postgres or Turso), switch Prisma and `db.ts`, add `prisma generate` (and optionally `migrate deploy`) to build, set all required env vars, then deploy. |

**Recommended:** Follow **Option B** and use **Vercel Postgres** or **Neon** so the entire app works on Vercel with minimal surprises.
