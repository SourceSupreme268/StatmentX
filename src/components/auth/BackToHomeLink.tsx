import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToHomeLink() {
  return (
    <Link
      href="/"
      className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back to home
    </Link>
  );
}