# How this app works locally and on Vercel (and where data lives)

You’re used to **PHP + MySQL**: the app runs on a server (nginx), and the database (MySQL) runs there too (or on another server). The code and the data are separate: **code** runs in PHP; **data** lives in MySQL.

This Next.js app works the same way conceptually: **code** runs in Node.js; **data** lives in **PostgreSQL**. The only difference is *where* the app runs (your machine vs Vercel) and *where* Postgres runs (local, Neon, or Vercel Postgres).

---

## 1. The big picture: app vs database

```
┌─────────────────┐         ┌─────────────────┐
│   Your app      │  talks   │   Database      │
│   (Next.js /    │ ───────► │   (PostgreSQL)   │
│    Node.js)     │  SQL     │   stores data   │
└─────────────────┘         └─────────────────┘
```

- **App**: Serves pages, API routes, dashboard, quiz, etc. It does **not** store data on disk itself (no “files” for surgeons, clients, matches).
- **Database**: Stores surgeons, clients, matches, match-surgeon links. All of that lives in **PostgreSQL**.
- **Connection**: The app connects to the database using a single URL: **`DATABASE_URL`**. That URL says: “which server, which database, which user, which password.”

So: **where the data is saved = wherever that PostgreSQL database is**. If Postgres runs on your laptop, data is on your laptop. If it runs on Neon or Vercel Postgres, data is in their cloud.

---

## 2. How it works **locally** (on your Mac)

On your machine you have two parts:

1. **The app** – when you run `npm run dev`, Next.js starts and listens on `http://localhost:3000`. It’s like starting PHP’s built‑in server or having nginx serve your app.
2. **The database** – PostgreSQL must be running somewhere, and the app must know how to reach it via `DATABASE_URL`.

You have two main options:

### Option A: Postgres on your machine (e.g. Homebrew or Docker)

- Install and run PostgreSQL locally (e.g. `brew install postgresql` and start it, or run a Postgres container with Docker/Warden).
- Create a database (e.g. `pirk`).
- Put in `.env` something like:
  ```bash
  DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/pirk"
  ```
- Run migrations once: `npx prisma migrate deploy`.
- Run the app: `npm run dev`.

**Where is the data?** On your Mac, inside that local Postgres instance (data files on disk, managed by Postgres). Same idea as MySQL data dir on your server.

### Option B: Postgres in the cloud (e.g. Neon) while you code locally

- You don’t install Postgres on your Mac.
- You create a free database on **Neon** (or another host) and get a `DATABASE_URL`.
- You put that same `DATABASE_URL` in `.env`.
- Run migrations once (against that cloud DB): `npx prisma migrate deploy`.
- Run the app: `npm run dev`. The app on your laptop connects to the cloud Postgres.

**Where is the data?** On Neon’s (or the provider’s) servers, not on your laptop. Your code runs locally; the data lives in the cloud.

So **locally** = “the Next.js process runs on your machine”; **where data is saved** = “wherever the Postgres server that `DATABASE_URL` points to is” (your Mac or Neon).

---

## 3. How it works on **Vercel**

On Vercel there are no long‑running servers and no persistent disk:

- Each request can run in a **new, short‑lived** Node process (serverless function).
- The filesystem is read‑only (or temporary). So you **cannot** use a database file (like SQLite) on Vercel’s “machine”; there is no permanent “server disk” to put it on.

So the model is:

- **App (code)** → runs on Vercel (they start your Next.js app per request / on their infrastructure).
- **Data** → must live **outside** Vercel, in a **database service** that is always on and reachable by URL.

That’s why we use **PostgreSQL** and **`DATABASE_URL`**:

- You create a Postgres database **somewhere** (Vercel Postgres or Neon).
- You give that URL to Vercel as an environment variable **`DATABASE_URL`**.
- When your app runs on Vercel, it connects to that URL and reads/writes data there.

So **on Vercel**:

- **Where the app runs:** Vercel’s infrastructure (serverless).
- **Where the data is saved:** In the PostgreSQL database whose URL you put in `DATABASE_URL` (e.g. Vercel Postgres or Neon). Not on Vercel’s “disk”; in a proper database service.

---

## 4. Where do you get `DATABASE_URL`?

You always get it from **whoever hosts the PostgreSQL database**. Two simple options:

### A. Vercel Postgres (database hosted by Vercel)

- In **Vercel**: open your **project** → **Storage** tab → **Create Database** → choose **Postgres**.
- Vercel creates a Postgres database for you and shows a **connection string** (and often auto‑adds `DATABASE_URL` to the project’s environment variables).
- That connection string **is** your `DATABASE_URL`. Example shape:
  ```text
  postgresql://user:password@host.region.vercel-storage.com:5432/database?sslmode=require
  ```
- **Where is the data?** On Vercel’s Postgres service (managed by Vercel, separate from the serverless app runtime).

### B. Neon (database hosted by Neon)

- **Neon** = a company that gives you a **hosted PostgreSQL database** in the cloud (like a managed MySQL, but for Postgres). They have a free tier.
- Go to [neon.tech](https://neon.tech) → sign up → create a **project** → create a **database**.
- In the dashboard they show a **connection string** (e.g. “Connection string” or “Postgres URL”). Copy it. It looks like:
  ```text
  postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
  ```
- That string **is** your `DATABASE_URL`.
- **Where is the data?** On Neon’s servers (their managed Postgres).

So:

- **For Vercel (production):** Create either a **Vercel Postgres** database or a **Neon** database, then copy the connection string and set it as **`DATABASE_URL`** in Vercel’s **Project → Settings → Environment Variables**.
- **For local:** Use the **same** `DATABASE_URL` in your `.env` (so local app and Vercel share one DB), or use a **different** `DATABASE_URL` (e.g. local Postgres) so local and prod data are separate.

---

## 5. Quick comparison to what you know (PHP + MySQL)

| Concept              | PHP / classic hosting      | This Next.js app              |
|----------------------|---------------------------|-------------------------------|
| App runtime          | PHP on nginx (or Apache)   | Node.js (Next.js) on Vercel   |
| Database             | MySQL                     | PostgreSQL                    |
| Where app runs       | Your server (or Warden)    | Your Mac (local) / Vercel     |
| Where data is saved  | MySQL (on server or elsewhere) | Postgres (local or Neon/Vercel Postgres) |
| How app finds DB     | Config (host, user, pass, db name) | One URL: `DATABASE_URL`   |
| Local dev            | Warden + nginx + MySQL     | `npm run dev` + Postgres (local or Neon) |

So: **data is never “inside” the Next.js app**; it’s always in **PostgreSQL**. `DATABASE_URL` is just the address of that Postgres (whether it’s on your machine, Neon, or Vercel Postgres).

---

## 6. Summary

- **Locally:** You run `npm run dev`; the app connects to Postgres using `DATABASE_URL` from `.env`. Data is wherever that Postgres is (your Mac or Neon).
- **On Vercel:** Vercel runs your app; the app connects to Postgres using `DATABASE_URL` from Vercel’s env. Data is in that Postgres (Vercel Postgres or Neon), not on Vercel’s app runtime.
- **Where to get `DATABASE_URL` for Vercel:** Create a Postgres database in **Vercel (Storage → Postgres)** or **Neon (neon.tech)** and copy the connection string into Vercel’s environment variables.
- **Neon** = hosted PostgreSQL (like managed MySQL, but Postgres). Free tier available, good for both local and Vercel.

If you want, we can add a short “First-time local setup” checklist (install Postgres or sign up to Neon → create DB → `.env` → `prisma migrate deploy` → `npm run dev`) in this doc or in the README.
