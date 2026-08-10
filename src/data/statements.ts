import type { StatementStatus } from "@/components/dashboard/StatusBadge";

export interface StatementRow {
  id: string;
  fileName: string;
  bank: string;
  statementPeriod: string;
  transactionCount: number;
  status: StatementStatus;
  uploadedOn: string;
}

// Empty state — no statements uploaded/processed yet (no backend/DB wired up).
// Replace with a real query (e.g. `getStatementsForUser(userId)`) once
// 04 Database Schema and 13 Upload PDF are implemented.
export const STATEMENTS: StatementRow[] = [];