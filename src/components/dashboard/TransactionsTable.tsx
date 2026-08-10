"use client";

import { ArrowLeftRight } from "lucide-react";
import type { TransactionRow } from "@/data/transactions";
import { formatCurrency } from "@/lib/transactions";
import { cn } from "@/lib/cn";

const TABLE_COLUMNS = ["Date", "Description", "Type", "Amount", "Balance"] as const;

interface TransactionsTableProps {
  transactions: TransactionRow[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const isEmpty = transactions.length === 0;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-card">
      <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-xs text-gray-500">
            {TABLE_COLUMNS.map((col) => (
              <th key={col} className="px-5 py-3 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {!isEmpty && (
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-gray-50 text-gray-700 last:border-0 hover:bg-gray-50/50"
              >
                <td className="px-5 py-3">{tx.date}</td>
                <td className="px-5 py-3">{tx.description}</td>
                <td className="px-5 py-3 capitalize">
                  {tx.type.replace("_", " ")}
                </td>
                <td
                  className={cn(
                    "px-5 py-3 font-medium",
                    tx.amount < 0 ? "text-red-600" : "text-green-700"
                  )}
                >
                  {tx.type === "opening_balance" ? "–" : formatCurrency(tx.amount)}
                </td>
                <td className="px-5 py-3">{formatCurrency(tx.balance)}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <ArrowLeftRight className="h-8 w-8 text-gray-300" />
          <p className="text-sm font-medium text-gray-700">
            No transactions yet
          </p>
          <p className="max-w-xs text-xs text-gray-400">
            Upload a bank statement to see extracted transactions here.
          </p>
        </div>
      )}

      {!isEmpty && (
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
          <span>
            Showing 1 to {transactions.length} of {transactions.length} results
          </span>
        </div>
      )}
    </div>
  );
}