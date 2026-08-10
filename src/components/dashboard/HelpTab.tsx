import Link from "next/link";
import { BookOpen, MessageCircle, Bug, ChevronRight } from "lucide-react";

const HELP_LINKS = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Browse guides and answers to common questions.",
    href: "/dashboard/help/docs",
  },
  {
    icon: MessageCircle,
    title: "Contact support",
    description: "Get help from our team directly.",
    href: "/dashboard/help/contact",
  },
  {
    icon: Bug,
    title: "Report a bug",
    description: "Let us know if something isn't working right.",
    href: "/dashboard/help/report-bug",
  },
] as const;

export function HelpTab() {
  return (
    <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 shadow-card">
      {HELP_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-4 p-5 transition hover:bg-gray-50/50"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
            <link.icon className="h-4 w-4 text-brand-500" />
          </span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              {link.title}
            </h3>
            <p className="mt-0.5 text-xs text-gray-500">{link.description}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-300" />
        </Link>
      ))}
    </div>
  );
}