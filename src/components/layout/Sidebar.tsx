"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { FileSpreadsheet, X } from "lucide-react";
import { SIDEBAR_NAV_ITEMS } from "@/data/navigation";
import { cn } from "@/lib/cn";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-60 shrink-0 flex-col bg-ink-950 transition-transform duration-200 ease-out",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
              <FileSpreadsheet className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold text-white">
              StatementX
            </span>
          </Link>
          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close menu"
            className="rounded p-1 text-gray-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {SIDEBAR_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5 border-t border-white/10 px-4 py-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
                userButtonPopoverFooter: "hidden",
                userButtonPopoverActionButton__manageAccount:
                  "text-sm text-gray-700",
                userButtonPopoverActionButton__signOut:
                  "text-sm text-gray-700",
              },
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user?.fullName ?? "Loading…"}
            </p>
            <p className="truncate text-xs text-gray-400">
              {user?.primaryEmailAddress?.emailAddress ?? ""}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
