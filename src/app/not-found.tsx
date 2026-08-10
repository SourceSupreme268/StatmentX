import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { StatusPageShell } from "@/components/shared/StatusPageShell";

export default function NotFound() {
  return (
    <StatusPageShell>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
        <FileQuestion className="h-6 w-6 text-gray-400" />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/dashboard"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Back to Home
        </Link>
      </div>
    </StatusPageShell>
  );
}