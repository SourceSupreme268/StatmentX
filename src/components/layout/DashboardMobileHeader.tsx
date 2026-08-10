"use client";

import { Menu, FileSpreadsheet } from "lucide-react";

interface DashboardMobileHeaderProps {
  onMenuClick: () => void;
}

export function DashboardMobileHeader({
  onMenuClick,
}: DashboardMobileHeaderProps) {
  return (
    <div className="flex h-14 items-center gap-3 border-b border-gray-100 px-4 lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-50"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500 text-white">
          <FileSpreadsheet className="h-3 w-3" />
        </span>
        <span className="text-sm font-semibold text-gray-900">
          StatementX
        </span>
      </div>
    </div>
  );
}