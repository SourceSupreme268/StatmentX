"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardMobileHeader } from "@/components/layout/DashboardMobileHeader";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <DashboardMobileHeader
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />
        <main>{children}</main>
      </div>
    </div>
  );
}
