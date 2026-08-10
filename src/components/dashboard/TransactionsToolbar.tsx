"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, Download } from "lucide-react";
import { ExportModal } from "@/components/dashboard/ExportModal";
import { createExport } from "@/lib/export-actions";
import type { ExportOptions } from "@/data/export-options";

interface TransactionsToolbarProps {
  enableSearch?: boolean;
  statementId?: string;
}

const SEARCH_DEBOUNCE_MS = 300;

export function TransactionsToolbar({
  enableSearch = false,
  statementId,
}: TransactionsToolbarProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuery = searchParams.get("q") ?? "";
  const canExport = Boolean(statementId);

  const handleSearchChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("q", value);
        } else {
          params.delete("q");
        }
        router.replace(`${pathname}?${params.toString()}`);
      }, SEARCH_DEBOUNCE_MS);
    },
    [router, pathname, searchParams]
  );

  async function handleExport(options: ExportOptions) {
    if (!statementId) return;

    const result = await createExport(statementId, options);
    if (!result.success) {
      throw new Error(result.error ?? "Export failed");
    }

    setIsExportModalOpen(false);
    router.push("/dashboard/exports");
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search transactions..."
          defaultValue={enableSearch ? currentQuery : undefined}
          onChange={
            enableSearch
              ? (e) => handleSearchChange(e.target.value)
              : undefined
          }
          className="h-9 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
        <button
          type="button"
          onClick={() => setIsExportModalOpen(true)}
          disabled={!canExport}
          title={
            canExport
              ? undefined
              : "Export is only available from a specific statement's page for now"
          }
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <Download className="h-3.5 w-3.5" />
          Export
        </button>
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
}
