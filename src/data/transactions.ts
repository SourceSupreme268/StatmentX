export type TransactionType = "credit" | "debit" | "opening_balance";

export interface TransactionRow {
  id: string;
  date: string;
  description: string;
  type: TransactionType;
  amount: number; // signed: negative for debits, positive for credits
  balance: number;
  statementId: string; // which statement this transaction belongs to
}

// Empty state — no transactions exist yet (no backend/DB wired up).
// Replace with a real query once 04 Database Schema + statement processing
// are implemented. Once real, filter by `statementId` for the per-statement
// view and return all rows for the all-transactions view.
export const TRANSACTIONS: TransactionRow[] = [];