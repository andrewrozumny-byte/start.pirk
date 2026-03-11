# Vercel setup — step-by-step (from GitHub + empty Vercel)

You have: **GitHub** `andrewrozumny-byte/start.pirk` and a **new Vercel account**.

Do the steps in this order.

---

## Step 1 — Create the Vercel project (import from GitHub)

1. Go to **[vercel.com](https://vercel.com)** and log in (e.g. with GitHub).
2. Click **“Add New…”** → **“Project”** (or go to [vercel.com/new](https://vercel.com/new)).
3. Under **“Import Git Repository”**, find **`andrewrozumny-byte/start.pirk`** (or paste the repo URL). If you don’t see it, click **“Adjust GitHub App Permissions”** and allow Vercel access to the repo.
4. Click **“Import”** (next to the repo).
5. On the **Configure Project** screen:
   - **Framework Preset:** should be **Next.js** (auto-detected).
   - **Build Command:** set to **`npm run vercel-build`** (so Prisma runs migrations on deploy).  
     If you don’t see it, leave default for now; we’ll set it in Step 4.
   - **Root Directory:** leave default (usually empty) unless the app lives in a subfolder.
6. **Do not** add any environment variables yet. Click **“Deploy”**.

The first deploy may **succeed** (build runs) but the **site may error** when you open it (no database yet). That’s expected.

---

## Step 2 — Create the database (Vercel Postgres)

1. In Vercel, open **your project** (the one you just created for `start.pirk`).
2. Go to the **“Storage”** tab.
3. Click **“Create Database”**.
4. Choose **“Postgres”** (Vercel Postgres).
5. Pick a name (e.g. `pirk-db`) and region (closest to you or your users). Click **Create**.
6. When the database is ready, Vercel will show a **“.env.local”** snippet or **“Connect to Project”**.  
   - If you see **“Connect”** or **“Add to Project”**, use it so Vercel adds the connection env vars to this project.  
   - The important one is **`POSTGRES_URL`** or **`DATABASE_URL`**.  
   - If they give **`POSTGRES_URL`** but the app expects **`DATABASE_URL`**, you’ll add **`DATABASE_URL`** in the next step.

---

## Step 3 — Add `DATABASE_URL` to the project

1. In your project, go to **Settings** → **Environment Variables**.
2. You may already see vars from Step 2 (e.g. `POSTGRES_URL`).  
   - If there is **`DATABASE_URL`** and it’s linked to Production (and Preview if you use previews), you’re done with env for the DB.  
   - If there is only **`POSTGRES_URL`**, add:
     - **Name:** `DATABASE_URL`  
     - **Value:** paste the **same** connection string as `POSTGRES_URL` (the long `postgresql://...` string).  
     - **Environments:** check **Production** (and **Preview** if you want preview deployments to use the DB).
3. Save.

Optional but useful for production:

- **`NEXT_PUBLIC_BASE_URL`** = `https://your-project.vercel.app` (or your custom domain later).

---

## Step 4 — Set build command (if not done in Step 1)

1. In the project, go to **Settings** → **General**.
2. Find **“Build & Development Settings”**.
3. Set **Build Command** to: **`npm run vercel-build`** (so each deploy runs `prisma generate`, `prisma migrate deploy`, then `next build`).
4. Save.

---

## Step 5 — Redeploy so the app uses the database

1. Go to the **“Deployments”** tab.
2. Open the **⋮** menu on the latest deployment → **“Redeploy”** (or push a small commit to trigger a new deploy).
3. Wait for the build to finish. The build log should show Prisma generating and migrations running.
4. Open your site (e.g. `https://your-project.vercel.app`). You may still see the **preview PIN** page (from the app’s middleware). Enter the PIN once (e.g. `pirk2025` if you haven’t changed it) to get a cookie and see the site.

---

## Order summary

| Order | What |
|-------|------|
| 1 | Create Vercel project (import `andrewrozumny-byte/start.pirk`), deploy once. |
| 2 | In that project: Storage → Create Database → Postgres. |
| 3 | Settings → Environment Variables: ensure **`DATABASE_URL`** is set (use value from Step 2). |
| 4 | Settings → Build Command: **`npm run vercel-build`**. |
| 5 | Redeploy. |

After that, the app runs on Vercel and data is stored in the Postgres database you created in Step 2.
