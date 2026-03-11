# Vercel deployment plan — Pirk

**Option B (PostgreSQL) is already prepared in this repo.** The app is configured for PostgreSQL; you only need to create a database, set `DATABASE_URL`, and deploy. See [Option B — What’s done and what you do next](#option-b--full-app-with-database--recommended) below.

Below is the full plan for both **marketing-only** (Option A) and **full app** (Option B).

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

### Option B — What’s done and what you do next

**Already done in this repo:**

- Prisma is set to **PostgreSQL** (`prisma/schema.prisma`: `provider = "postgresql"`).
- Connection URL is read from **`DATABASE_URL`** in `prisma.config.ts`.
- **`src/lib/db.ts`** uses the default Prisma client (no SQLite adapter).
- **Initial migration** is in `prisma/migrations/20250311120000_init_postgres/migration.sql`.
- **Build scripts:** `postinstall` runs `prisma generate`; `vercel-build` runs `prisma generate && prisma migrate deploy && next build`.
- **`.env.example`** lists `DATABASE_URL` and other optional env vars.

**You need to:**

1. **Create a Postgres database**  
   - **Vercel Postgres:** Vercel dashboard → your project → Storage → Create Database → Postgres. Copy `DATABASE_URL` (or the env vars Vercel gives you).  
   - **Neon:** [neon.tech](https://neon.tech) → create a project → copy the connection string.

2. **Set `DATABASE_URL`**  
   - **Locally:** Copy `.env.example` to `.env` and set `DATABASE_URL` to your Postgres URL.  
   - **Vercel:** Project → Settings → Environment Variables → add `DATABASE_URL` for Production and Preview.

3. **Apply migrations**  
   - **Locally (first time):** `npx prisma migrate deploy` (or `npx prisma migrate dev` if you prefer).  
   - **On Vercel:** Use **Build Command** `npm run vercel-build` so `prisma migrate deploy` runs on each deploy and creates/updates tables.

4. **Deploy**  
   - Push to your connected branch. Ensure the Vercel project uses **Build Command**: `npm run vercel-build` (or leave default and it will use `vercel-build` if configured in `package.json`).  
   - Add any other env vars from `.env.example` (Stripe, `NEXT_PUBLIC_BASE_URL`, etc.) as needed.

---

### 1. Choose a production database (reference)

SQLite is not suitable for Vercel. This repo is already set up for **PostgreSQL**:

- **Vercel Postgres** or **Neon** — use one of these; create a database and set `DATABASE_URL` as above.

**Turso** (SQLite-compatible) is an alternative but would require changing the Prisma provider and adapter back to SQLite/Turso; the current setup is Postgres-only.

---

### 2. PostgreSQL setup (already done in repo)

2.1. **Create the database** — see “You need to” above.

2.2. **Prisma** — already set: `prisma/schema.prisma` has `provider = "postgresql"`; `prisma.config.ts` has `datasource.url` from `process.env["DATABASE_URL"]`.

2.3. **Migrations** — initial migration is in `prisma/migrations/20250311120000_init_postgres/`. Run `prisma migrate deploy` when `DATABASE_URL` is set.

2.4. **`src/lib/db.ts`** — already uses `new PrismaClient()` (no SQLite adapter).

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
