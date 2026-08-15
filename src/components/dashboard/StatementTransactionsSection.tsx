"use client";

import { useState, useMemo } from "react";
import { TransactionsToolbar } from "@/components/dashboard/TransactionsToolbar";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import type { TransactionRow } from "@/data/transactions";

interface StatementTransactionsSectionProps {
  transactions: TransactionRow[];
  statementId: string;
}

export function StatementTransactionsSection({
  transactions,
  statementId,
}: StatementTransactionsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactions;
    const query = searchQuery.trim().toLowerCase();
    return transactions.filter((tx) =>
      tx.description.toLowerCase().includes(query)
    );
  }, [transactions, searchQuery]);

  return (
    <>
      <TransactionsToolbar
        onSearchChange={setSearchQuery}
        statementId={statementId}
      />
      <TransactionsTable transactions={filteredTransactions} />
    </>
  );
}