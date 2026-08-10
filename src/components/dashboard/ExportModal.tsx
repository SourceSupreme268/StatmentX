
"use client";

import { useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  DEFAULT_EXPORT_OPTIONS,
  type ExportFormat,
  type ExportOptions,
} from "@/data/export-options";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void | Promise<void>;
}

const FORMAT_CARDS: {
  value: ExportFormat;
  label: string;
  sublabel: string;
}[] = [
  { value: "xlsx", label: "Excel (.xlsx)", sublabel: "Best for Microsoft Excel" },
  { value: "csv", label: "CSV (.csv)", sublabel: "Best for spreadsheets" },
];

export function ExportModal({ isOpen, onClose, onExport }: ExportModalProps) {
  const [options, setOptions] = useState<ExportOptions>(DEFAULT_EXPORT_OPTIONS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleExportClick() {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await onExport(options);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Export failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            Export Transactions
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium text-gray-500">Choose format</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {FORMAT_CARDS.map((card) => (
              <button
                key={card.value}
                type="button"
                onClick={() =>
                  setOptions((prev) => ({ ...prev, format: card.value }))
                }
                className={cn(
                  "rounded-xl border p-3 text-left transition",
                  options.format === card.value
                    ? "border-brand-500 ring-1 ring-brand-500"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <span className="text-sm font-medium text-gray-900">
                  {card.label}
                </span>
                <p className="mt-0.5 text-xs text-gray-500">{card.sublabel}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium text-gray-500">Export options</p>
          <div className="mt-2 space-y-2.5">
            <ExportCheckbox
              label="Include opening balance"
              checked={options.includeOpeningBalance}
              onChange={(checked) =>
                setOptions((prev) => ({ ...prev, includeOpeningBalance: checked }))
              }
            />
            <ExportCheckbox
              label="Include closing balance"
              checked={options.includeClosingBalance}
              onChange={(checked) =>
                setOptions((prev) => ({ ...prev, includeClosingBalance: checked }))
              }
            />
            <ExportCheckbox
              label="Preserve original transaction order"
              checked={options.preserveOriginalOrder}
              onChange={(checked) =>
                setOptions((prev) => ({ ...prev, preserveOriginalOrder: checked }))
              }
            />
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <p className="text-xs text-red-700">{errorMessage}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExportClick}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {isSubmitting ? "Exporting…" : "Export"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface ExportCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ExportCheckbox({ label, checked, onChange }: ExportCheckboxProps) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
      />
      {label}
    </label>
  );
}