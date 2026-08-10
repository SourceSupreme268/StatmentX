import Link from "next/link";
import { FileSpreadsheet } from "lucide-react";

interface StatusPageShellProps {
  children: React.ReactNode;
}

export function StatusPageShell({ children }: StatusPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 text-center">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
          <FileSpreadsheet className="h-4 w-4" />
        </span>
        <span className="text-base font-semibold text-gray-900">
          StatementX
        </span>
      </Link>

      {children}
    </div>
  );
}