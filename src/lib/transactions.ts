import type { TransactionRow } from "@/data/transactions";

export interface TransactionSummary {
  totalTransactions: number;
  totalCredits: number;
  totalDebits: number;
  netAmount: number;
}

export function summarizeTransactions(
  transactions: TransactionRow[]
): TransactionSummary {
  return transactions.reduce<TransactionSummary>(
    (summary, tx) => {
      if (tx.type === "credit") {
        summary.totalCredits += tx.amount;
      } else if (tx.type === "debit") {
        summary.totalDebits += tx.amount;
      }
      summary.netAmount += tx.type === "opening_balance" ? 0 : tx.amount;
      summary.totalTransactions += 1;
      return summary;
    },
    { totalTransactions: 0, totalCredits: 0, totalDebits: 0, netAmount: 0 }
  );
}

export function formatCurrency(value: number): string {
  const formatted = Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `-$${formatted}` : `$${formatted}`;
}