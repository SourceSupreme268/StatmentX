import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function HelpPageBackLink() {
  return (
    <Link
      href="/dashboard/settings"
      className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900"
    >
      <ChevronLeft className="h-3.5 w-3.5" />
      Back to Settings
    </Link>
  );
}
