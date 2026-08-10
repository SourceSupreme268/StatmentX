import Link from "next/link";
import { FileText } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import type { StatementRow } from "@/data/statements";

interface RecentStatementsPanelProps {
  statements: StatementRow[];
}

export function RecentStatementsPanel({
  statements,
}: RecentStatementsPanelProps) {
  const isEmpty = statements.length === 0;

  return (
    <div className="rounded-xl border border-gray-200 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          Recent Statements
        </h2>
        <Link
          href="/dashboard/statements"
          className="text-xs font-medium text-brand-500 hover:text-brand-600"
        >
          View all
        </Link>
      </div>

      {isEmpty ? (
        <div className="mt-8 flex flex-col items-center justify-center gap-2 py-8 text-center">
          <FileText className="h-6 w-6 text-gray-300" />
          <p className="text-sm text-gray-500">No statements yet</p>
          <Link
            href="/dashboard/upload"
            className="mt-1 text-xs font-medium text-brand-500 hover:text-brand-600"
          >
            Upload your first statement
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-1">
          {statements.map((statement) => (
            <li key={statement.id}>
              <Link
                href={`/dashboard/statements/${statement.id}`}
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition hover:bg-gray-50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-4 w-4 shrink-0 text-gray-400" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {statement.fileName}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {statement.statementPeriod} · {statement.transactionCount}{" "}
                      transactions
                    </p>
                  </div>
                </div>
                <StatusBadge status={statement.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}