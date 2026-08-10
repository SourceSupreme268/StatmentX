import type { Statement, Transaction, Export } from "@prisma/client";
import type { StatementRow } from "@/data/statements";
import type { TransactionRow } from "@/data/transactions";
import type { ExportRow } from "@/data/exports";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDateRange(start: Date, end: Date): string {
  const startLabel = DATE_FORMATTER.format(start);
  const endLabel = DATE_FORMATTER.format(end);
  return startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`;
}

type StatementWithCount = Statement & {
  _count: { transactions: number };
};

export function toStatementRow(statement: StatementWithCount): StatementRow {
  return {
    id: statement.id,
    fileName: statement.fileName,
    bank: statement.bank,
    statementPeriod: formatDateRange(
      statement.statementPeriodStart,
      statement.statementPeriodEnd
    ),
    transactionCount: statement._count.transactions,
    status: statement.status,
    uploadedOn: DATE_FORMATTER.format(statement.uploadedAt),
  };
}

export function toTransactionRow(transaction: Transaction): TransactionRow {
  return {
    id: transaction.id,
    date: DATE_FORMATTER.format(transaction.date),
    description: transaction.description,
    type: transaction.type,
    amount: Number(transaction.amount),
    balance: Number(transaction.balance),
    statementId: transaction.statementId,
  };
}

type ExportWithStatement = Export & {
  statement: { fileName: string };
};

export function toExportRow(exportRow: ExportWithStatement): ExportRow {
  return {
    id: exportRow.id,
    fileName: exportRow.fileName,
    format: exportRow.format,
    statementName: exportRow.statement.fileName,
    createdAt: exportRow.createdAt.toISOString(),
  };
}