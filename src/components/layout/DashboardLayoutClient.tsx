"use client";

import { usePathname } from "next/navigation";

export function DashboardLayoutClient({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/dashboard/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {sidebar}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
