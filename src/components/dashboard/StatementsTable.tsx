"use client";

import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { StatementRowMenu } from "@/components/dashboard/StatementRowMenu";
import type { StatementRow } from "@/data/statements";

const TABLE_COLUMNS = [
  "File Name",
  "Bank",
  "Statement Period",
  "Transactions",
  "Status",
  "Uploaded On",
] as const;

interface StatementsTableProps {
  statements: StatementRow[];
}

export function StatementsTable({ statements }: StatementsTableProps) {
  const router = useRouter();
  const isEmpty = statements.length === 0;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-500">
              {TABLE_COLUMNS.map((col) => (
                <th key={col} className="px-5 py-3 font-medium">
                  {col}
                </th>
              ))}
              <th className="w-10 px-5 py-3" aria-label="Row actions" />
            </tr>
          </thead>

          {!isEmpty && (
            <tbody>
              {statements.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => router.push(`/dashboard/statements/${row.id}`)}
                  className="cursor-pointer border-b border-gray-50 text-gray-700 last:border-0 hover:bg-gray-50/50"
                >
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {row.fileName}
                  </td>
                  <td className="px-5 py-3">{row.bank}</td>
                  <td className="px-5 py-3">{row.statementPeriod}</td>
                  <td className="px-5 py-3">{row.transactionCount}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-3">{row.uploadedOn}</td>
                  <td className="px-5 py-3">
                    <StatementRowMenu
                      statementId={row.id}
                      fileName={row.fileName}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <FileText className="h-8 w-8 text-gray-300" />
          <p className="text-sm font-medium text-gray-700">
            No statements yet
          </p>
          <p className="max-w-xs text-xs text-gray-400">
            Upload your first bank statement to see it listed here with its
            extracted transactions.
          </p>
        </div>
      )}

      {!isEmpty && (
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
          <span>
            Showing 1 to {statements.length} of {statements.length} results
          </span>
        </div>
      )}
    </div>
  );
}
