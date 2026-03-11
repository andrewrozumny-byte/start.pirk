"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function DashboardLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push(returnUrl);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid password");
        setPassword("");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6 text-center font-extrabold text-[#4D0121] text-3xl">
        pirk
      </div>
      <h1 className="text-center font-semibold text-[#4D0121] text-xl">
        Dashboard
      </h1>
      <p className="mt-1 text-center text-sm text-[#7A7067]">
        Enter the password to continue.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-xl border-2 border-[#e5e5e5] px-4 py-3 text-center outline-none transition-colors focus:border-[#F2705C]"
          disabled={loading}
        />
        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#F2705C] py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

export default function DashboardLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F5F2] p-4">
      <Suspense
        fallback={
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-6 text-center font-extrabold text-[#4D0121] text-3xl">
              pirk
            </div>
            <p className="text-center text-[#7A7067]">Loading…</p>
          </div>
        }
      >
        <DashboardLoginForm />
      </Suspense>
    </div>
  );
}
