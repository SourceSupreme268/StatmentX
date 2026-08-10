import Link from "next/link";
import { Bell, Sparkles } from "lucide-react";

interface DashboardTopBarProps {
  title: string;
}

export function DashboardTopBar({ title }: DashboardTopBarProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4 sm:px-6 lg:px-8">
      <h1 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
        {title}
      </h1>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
            href="/dashboard/upgrade"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:px-3"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upgrade</span>
        </Link>

        {/* <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-50"
        >
          <Bell className="h-4 w-4" />
        </button> */}
      </div>
    </div>
  );
}