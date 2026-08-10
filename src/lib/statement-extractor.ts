import { extractTextFromPdf } from "@/lib/pdf-text-extractor";
import { validateBankStatementText } from "@/lib/statement-validator";
import { parseTransactionsFromText } from "@/lib/transaction-parser";

export interface ExtractedTransaction {
  date: Date;
  description: string;
  type: "credit" | "debit" | "opening_balance";
  amount: number;
  balance: number;
}

export interface ExtractedStatementData {
  bank: string;
  statementPeriodStart: Date;
  statementPeriodEnd: Date;
  transactions: ExtractedTransaction[];
}

export class StatementExtractionError extends Error {}

export async function extractStatementData(
  fileBuffer: Buffer,
  fileName: string
): Promise<ExtractedStatementData> {
  void fileName;

  let text: string;
  try {
    text = await extractTextFromPdf(fileBuffer);

  } catch (error) {
    console.error("PDF text extraction failed:", error);
    throw new StatementExtractionError(
      "We couldn't read this PDF. It may be corrupted or password-protected."
    );
  }

  const validation = validateBankStatementText(text);
  if (!validation.isLikelyBankStatement) {
    throw new StatementExtractionError(
      validation.reason ?? "This file doesn't look like a bank statement."
    );
  }

  const parsedTransactions = parseTransactionsFromText(text);

  if (parsedTransactions.length === 0) {
    throw new StatementExtractionError(
      "We couldn't find any transactions in this PDF. It may use a layout we don't support yet."
    );
  }

  const dates = parsedTransactions.map((tx) => tx.date.getTime());
  const statementPeriodStart = new Date(Math.min(...dates));
  const statementPeriodEnd = new Date(Math.max(...dates));

  const bank = "Unknown Bank";

  const transactions: ExtractedTransaction[] = parsedTransactions.map(
    (tx) => ({
      date: tx.date,
      description: tx.description,
      type: tx.type,
      amount: tx.amount,
      balance: tx.balance ?? 0,
    })
  );

  return { bank, statementPeriodStart, statementPeriodEnd, transactions };
}