"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardMobileHeader } from "@/components/layout/DashboardMobileHeader";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex h-screen flex-col lg:pl-60">
        <DashboardMobileHeader
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}