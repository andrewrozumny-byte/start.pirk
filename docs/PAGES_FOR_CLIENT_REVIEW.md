# Pirk — All available pages (for client review)

**Base URL:** https://startpirkau.vercel.app  

*Note: First-time visitors see a Team Preview PIN screen; after entering the PIN, the site is accessible. The dashboard area requires a separate password.*

---

## Public / marketing (no login)

| Page | URL | Description |
|------|-----|-------------|
| Homepage | https://startpirkau.vercel.app/ | Main landing: “Find Your Perfect Surgeon”, procedures, how it works, pricing, FAQ |
| Quiz | https://startpirkau.vercel.app/quiz | 2-minute surgeon matching quiz (area → procedure → etc.) |
| Social landing | https://startpirkau.vercel.app/start | Social/ad feed-style landing: “Every surgeon you've seen today paid to be in your feed” |
| Breast surgery | https://startpirkau.vercel.app/breast-surgery | Procedure-specific landing for breast surgery |
| Book a call | https://startpirkau.vercel.app/book-call | Book a free call |
| Payment options | https://startpirkau.vercel.app/payment-options | Payment options info |
| Short link | https://startpirkau.vercel.app/s | Short /s route (e.g. for campaigns) |

---

## Static HTML funnels

| Page | URL | Description |
|------|-----|-------------|
| Funnel A | https://startpirkau.vercel.app/funnel.html | Static funnel (preview / lead capture) |
| Funnel B | https://startpirkau.vercel.app/funnel-b.html | Static funnel variant |

---

## Client-facing (after quiz / match)

| Page | URL | Description |
|------|-----|-------------|
| Match results | https://startpirkau.vercel.app/results/[matchId] | Client’s match results (replace `[matchId]` with real ID from DB) |
| Upgrade | https://startpirkau.vercel.app/upgrade/[matchId] | Upgrade flow for a match |
| Upgrade success | https://startpirkau.vercel.app/upgrade/success | Post-upgrade success page |
| PDF view | https://startpirkau.vercel.app/pdf/[matchId] | PDF-style view of match (replace `[matchId]`) |

---

## Surgeon profile (public by link)

| Page | URL | Description |
|------|-----|-------------|
| Surgeon profile | https://startpirkau.vercel.app/profile/[token] | Surgeon’s public profile page (replace `[token]` with their profile token) |

---

## Dashboard / admin (password protected)

*These require the dashboard password. Without it, visitors are redirected to the login page.*

| Page | URL | Description |
|------|-----|-------------|
| Dashboard login | https://startpirkau.vercel.app/dashboard/login | Login page for dashboard access |
| Dashboard | https://startpirkau.vercel.app/dashboard | Overview: stats, quick actions (Surgeons, Match) |
| Surgeons list | https://startpirkau.vercel.app/surgeons | List and manage surgeons |
| Add surgeon | https://startpirkau.vercel.app/surgeons/add | Add a new surgeon |
| Edit surgeon | https://startpirkau.vercel.app/surgeons/[id] | Edit surgeon (replace `[id]` with surgeon ID) |
| Import surgeons | https://startpirkau.vercel.app/surgeons/import | Import surgeons (e.g. CSV) |
| Match list | https://startpirkau.vercel.app/match | List matches; start new match |
| Match detail | https://startpirkau.vercel.app/match/[id] | View/edit a match (replace `[id]`) |
| Match review | https://startpirkau.vercel.app/match/[id]/review | Review step for a match |
| Clients | https://startpirkau.vercel.app/clients | Clients list |
| Surgeon profiles | https://startpirkau.vercel.app/surgeon-profiles | Surgeon profiles (portal management) |

---

## Summary

- **Public:** 7 main routes (home, quiz, start, breast-surgery, book-call, payment-options, s).
- **Static:** 2 (funnel.html, funnel-b.html).
- **Client-facing (dynamic):** results, upgrade, upgrade/success, pdf (use real IDs in place of `[matchId]`).
- **Surgeon profile:** 1 pattern (use real token in place of `[token]`).
- **Dashboard (protected):** 11 routes (login + dashboard, surgeons, match, clients, surgeon-profiles and sub-routes).

**Total:** 22+ distinct page types (some use dynamic segments like `[matchId]`, `[id]`, `[token]`).
