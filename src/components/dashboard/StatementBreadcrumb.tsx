import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface StatementBreadcrumbProps {
  fileName: string;
}

export function StatementBreadcrumb({ fileName }: StatementBreadcrumbProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500">
      <Link href="/dashboard/statements" className="hover:text-gray-900">
        Statements
      </Link>
      <ChevronRight className="h-3 w-3" />
      <span className="text-gray-700">{fileName}</span>
    </div>
  );
}
