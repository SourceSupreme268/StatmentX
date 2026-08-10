"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { StatusPageShell } from "@/components/shared/StatusPageShell";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to console for now — replace with real error reporting
    // (e.g. Sentry) once that's wired up.
    console.error(error);
  }, [error]);

  return (
    <StatusPageShell>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="h-6 w-6 text-red-500" />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        We ran into a problem loading this page. This is usually temporary —
        try again in a moment.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Go to Dashboard
        </Link>
      </div>
    </StatusPageShell>
  );
}
