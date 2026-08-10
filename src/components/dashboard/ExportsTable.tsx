import Link from "next/link";
import { Download, FolderDown, Upload, FileText } from "lucide-react";
import type { ExportRow } from "@/data/exports";
import { cn } from "@/lib/cn";
import { formatRelativeDate, formatAbsoluteDate } from "@/lib/dates";
import { ExportDeleteButton } from "@/components/dashboard/ExportDeleteButton";

const FORMAT_STYLES: Record<ExportRow["format"], string> = {
  csv: "bg-blue-50 text-blue-700",
  xlsx: "bg-green-50 text-green-700",
};

const EMPTY_STATE_STEPS = [
  { icon: Upload, text: "Upload a bank statement" },
  { icon: FileText, text: "Open it from your Statements list" },
  {
    icon: Download,
    text: "Click Export on that statement's page — your export will then show up here",
  },
] as const;

interface ExportsTableProps {
  exports: ExportRow[];
}

export function ExportsTable({ exports: exportRows }: ExportsTableProps) {
  const isEmpty = exportRows.length === 0;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-500">
              <th className="px-5 py-3 font-medium">File</th>
              <th className="px-5 py-3 font-medium">Format</th>
              <th className="px-5 py-3 font-medium">Statement</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 font-medium">Download</th>
            </tr>
          </thead>

          {!isEmpty && (
            <tbody>
              {exportRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 text-gray-700 last:border-0 hover:bg-gray-50/50"
                >
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {row.fileName}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium uppercase",
                        FORMAT_STYLES[row.format]
                      )}
                    >
                      {row.format}
                    </span>
                  </td>
                  <td className="px-5 py-3">{row.statementName}</td>
                  <td className="px-5 py-3">
                    <div className="leading-tight">
                      <p>{formatRelativeDate(row.createdAt)}</p>
                      <p className="text-xs text-gray-400">
                        {formatAbsoluteDate(row.createdAt)}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <a
                        href={`/api/exports/${row.id}/download`}
                        aria-label="Download export"
                        className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                      <ExportDeleteButton exportId={row.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center gap-6 py-12 text-center">
          <div className="flex flex-col items-center gap-2">
            <FolderDown className="h-8 w-8 text-gray-300" />
            <p className="text-sm font-medium text-gray-700">No exports yet</p>
          </div>

          <ol className="w-full max-w-sm space-y-3 px-6 text-left">
            {EMPTY_STATE_STEPS.map((step, index) => (
              <li key={step.text} className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
                  {index + 1}
                </span>
                <span className="flex items-start gap-1.5 text-xs text-gray-600">
                  <step.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                  {step.text}
                </span>
              </li>
            ))}
          </ol>

          <Link
            href="/dashboard/statements"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Go to Statements
          </Link>
        </div>
      )}
    </div>
  );
}