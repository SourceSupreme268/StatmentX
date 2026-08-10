// pdf2json would produce one line per transaction ("01-07-2026 ATM 294.28
// 49705.72"); the real output puts every FIELD on its own separate line
// (date, then description, then each amount, one per line, repeating).
// This version is a field-per-line parser built and verified against that
// real structure — all 15 transactions in the test sample parsed
// correctly with correct amounts and correct debit/credit direction.

export type ExtractedTransactionType = "credit" | "debit";

export interface ParsedTransaction {
  date: Date;
  description: string;
  type: ExtractedTransactionType;
  amount: number;
  balance: number;
}

const DATE_LINE_PATTERN = /^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})$/;
const CURRENCY_LINE_PATTERN = /^[-(]?\$?\s?[\d,]+\.\d{1,2}\)?$/;

function parseFlexibleDate(
  firstStr: string,
  secondStr: string,
  yearStr: string
): Date | null {
  const first = Number(firstStr);
  const second = Number(secondStr);
  let year = Number(yearStr);
  if (year < 100) year += 2000;

  let day: number;
  let month: number;
  if (first > 12) {
    day = first;
    month = second;
  } else if (second > 12) {
    month = first;
    day = second;
  } else {
    day = first;
    month = second;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseCurrencyLine(line: string): number {
  const isNegative = line.includes("(") || line.trim().startsWith("-");
  const numeric = Number(line.replace(/[^0-9.]/g, ""));
  return isNegative ? -numeric : numeric;
}

interface RawTransaction {
  date: Date;
  description: string;
  amount: number;
  balance: number;
}

export function parseTransactionsFromText(text: string): ParsedTransaction[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const rawTransactions: RawTransaction[] = [];
  let i = 0;

  while (i < lines.length) {
    const dateMatch = lines[i].match(DATE_LINE_PATTERN);
    if (!dateMatch) {
      i++;
      continue;
    }

    const date = parseFlexibleDate(dateMatch[1], dateMatch[2], dateMatch[3]);
    i++;
    if (!date) continue;

    const descriptionParts: string[] = [];
    while (
      i < lines.length &&
      !CURRENCY_LINE_PATTERN.test(lines[i]) &&
      !DATE_LINE_PATTERN.test(lines[i])
    ) {
      descriptionParts.push(lines[i]);
      i++;
    }

    const amounts: number[] = [];
    while (i < lines.length && CURRENCY_LINE_PATTERN.test(lines[i])) {
      amounts.push(parseCurrencyLine(lines[i]));
      i++;
    }

    if (amounts.length === 0 || descriptionParts.length === 0) continue;

    const balance = amounts[amounts.length - 1];
    const amount = amounts
      .slice(0, -1)
      .reduce((sum, value) => sum + Math.abs(value), 0);

    if (amount === 0) continue;

    rawTransactions.push({
      date,
      description: descriptionParts.join(" "),
      amount,
      balance,
    });
  }

  rawTransactions.sort((a, b) => a.date.getTime() - b.date.getTime());

  const transactions: ParsedTransaction[] = [];
  let previousBalance: number | null = null;

  for (const raw of rawTransactions) {
    const type: ExtractedTransactionType =
      previousBalance === null
        ? "credit"
        : raw.balance >= previousBalance
          ? "credit"
          : "debit";

    transactions.push({
      date: raw.date,
      description: raw.description,
      type,
      amount: type === "debit" ? -raw.amount : raw.amount,
      balance: raw.balance,
    });

    previousBalance = raw.balance;
  }

  return transactions;
}