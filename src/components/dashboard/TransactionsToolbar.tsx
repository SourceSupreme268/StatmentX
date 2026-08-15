"use client";

import { useState, useRef } from "react";
import { Search, SlidersHorizontal, Download } from "lucide-react";
import { ExportModal } from "@/components/dashboard/ExportModal";
import { createExport } from "@/lib/export-actions";
import type { ExportOptions } from "@/data/export-options";

interface TransactionsToolbarProps {
  onSearchChange?: (query: string) => void;
  statementId?: string;
}

const SEARCH_DEBOUNCE_MS = 300;

export function TransactionsToolbar({
  onSearchChange,
  statementId,
}: TransactionsToolbarProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canExport = Boolean(statementId);

  function handleSearchInput(value: string) {
    if (!onSearchChange) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChange(value);
    }, SEARCH_DEBOUNCE_MS);
  }

  async function handleExport(options: ExportOptions) {
    if (!statementId) return;

    const result = await createExport(statementId, options);
    if (!result.success) {
      throw new Error(result.error ?? "Export failed");
    }

    setIsExportModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search transactions..."
          disabled={!onSearchChange}
          onChange={(e) => handleSearchInput(e.target.value)}
          className="h-9 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:cursor-not-allowed disabled:bg-gray-50"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* <button       for version 2
          type="button"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:flex-initial"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button> */}
        <button
          type="button"
          onClick={() => setIsExportModalOpen(true)}
          disabled={!canExport}
          title={
            canExport
              ? undefined
              : "Export is only available from a specific statement's page"
          }
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent sm:flex-initial"
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