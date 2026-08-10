import type { TransactionSummary } from "@/lib/transactions";
import { formatCurrency } from "@/lib/transactions";

interface TransactionSummaryCardsProps {
  summary: TransactionSummary;
}

export function TransactionSummaryCards({
  summary,
}: TransactionSummaryCardsProps) {
  const cards = [
    { label: "Total Transactions", value: summary.totalTransactions.toString() },
    { label: "Total Credits", value: formatCurrency(summary.totalCredits) },
    { label: "Total Debits", value: formatCurrency(-Math.abs(summary.totalDebits)) },
    { label: "Net Amount", value: formatCurrency(summary.netAmount) },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-gray-200 p-5 shadow-card"
        >
          <p className="text-xs text-gray-500">{card.label}</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}