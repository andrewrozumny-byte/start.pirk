import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// PIN for team preview access — change or remove when done
const PREVIEW_PIN = "pirk2025";

const DASHBOARD_COOKIE = "dashboard-auth";

// /dashboard alone or /dashboard/xxx except /dashboard/login
function isDashboardProtectedPath(path: string): boolean {
  if (path === "/dashboard") return true;
  if (!path.startsWith("/dashboard/")) return false;
  return path !== "/dashboard/login";
}

function requiresDashboardAuth(path: string): boolean {
  if (path === "/dashboard/login") return false;
  if (isDashboardProtectedPath(path)) return true;
  if (path.startsWith("/surgeons")) return true;
  if (path.startsWith("/match")) return true;
  if (path.startsWith("/clients")) return true;
  if (path.startsWith("/surgeon-profiles")) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow static assets and API routes used by auth
  if (
    path === "/api/preview-auth" ||
    path === "/api/dashboard-auth" ||
    path.startsWith("/_next") ||
    path.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Dashboard password protection — always require cookie for admin routes
  if (requiresDashboardAuth(path)) {
    const dashboardCookie = request.cookies.get(DASHBOARD_COOKIE);
    if (!dashboardCookie?.value) {
      const loginUrl = new URL("/dashboard/login", request.url);
      loginUrl.searchParams.set("returnUrl", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Only gate rest of site when accessed via tunnel (not localhost)
  const host = request.headers.get("host") || "";
  const isLocalhost =
    host.startsWith("localhost") || host.startsWith("127.0.0.1");

  if (isLocalhost) {
    return NextResponse.next();
  }

  // Check for PIN cookie
  const pinCookie = request.cookies.get("preview-pin");
  if (pinCookie?.value === PREVIEW_PIN) {
    return NextResponse.next();
  }

  // Show PIN entry page
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pirk Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Outfit', system-ui, sans-serif;
      background: #F9F5F2;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      text-align: center;
    }
    h1 { color: #4D0121; font-size: 24px; margin-bottom: 8px; }
    p { color: #7A7067; font-size: 14px; margin-bottom: 24px; }
    input {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #e5e5e5;
      border-radius: 12px;
      font-size: 18px;
      text-align: center;
      letter-spacing: 4px;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus { border-color: #F2705C; }
    button {
      width: 100%;
      padding: 14px;
      background: #F2705C;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 16px;
      transition: opacity 0.2s;
    }
    button:hover { opacity: 0.9; }
    .error { color: #ef4444; font-size: 13px; margin-top: 8px; display: none; }
    .logo { font-size: 32px; font-weight: 800; color: #4D0121; margin-bottom: 4px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">pirk</div>
    <h1>Team Preview</h1>
    <p>Enter the PIN to view the site.</p>
    <form onsubmit="handleSubmit(event)">
      <input type="text" id="pin" placeholder="Enter PIN" autofocus autocomplete="off" />
      <div class="error" id="error">Incorrect PIN. Try again.</div>
      <button type="submit">Enter</button>
    </form>
  </div>
  <script>
    async function handleSubmit(e) {
      e.preventDefault();
      const pin = document.getElementById('pin').value;
      const res = await fetch('/api/preview-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      if (res.ok) {
        window.location.reload();
      } else {
        document.getElementById('error').style.display = 'block';
        document.getElementById('pin').value = '';
        document.getElementById('pin').focus();
      }
    }
  </script>
</body>
</html>`,
    {
      status: 200,
      headers: { "Content-Type": "text/html" },
    }
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
