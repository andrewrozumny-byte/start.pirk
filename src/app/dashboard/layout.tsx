import { DashboardLayoutClient } from "@/components/layout/DashboardLayoutClient";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutClient sidebar={<Sidebar />}>
      {children}
    </DashboardLayoutClient>
  );
}
