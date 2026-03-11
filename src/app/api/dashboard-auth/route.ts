import { NextResponse } from "next/server";

const DASHBOARD_COOKIE = "dashboard-auth";

export async function POST(request: Request) {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Dashboard login is not configured" },
      { status: 503 }
    );
  }

  const { password } = (await request.json()) as { password?: string };

  if (password === expected) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(DASHBOARD_COOKIE, "1", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
