// Heuristic (not AI-based, per explicit cost decision) check for whether
// extracted PDF text plausibly looks like a bank statement, vs. some other
// PDF entirely (a resume, an invoice, a novel, etc).
//
// This is deliberately approximate — it can't truly "understand" a
// document the way an AI model would. See progressTracker.md for the cost
// tradeoff behind this choice.

const BANK_STATEMENT_KEYWORDS = [
  "statement",
  "account",
  "balance",
  "transaction",
  "deposit",
  "withdrawal",
  "opening balance",
  "closing balance",
  "debit",
  "credit",
];

const CURRENCY_AMOUNT_PATTERN = /(?:\$|USD|INR|₹)?\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})\b/g;
const DATE_PATTERN =
  /\b\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{2,4}\b/gi;

export interface StatementValidationResult {
  isLikelyBankStatement: boolean;
  reason?: string;
}

const MIN_KEYWORD_MATCHES = 3;
const MIN_CURRENCY_AMOUNTS = 3;
const MIN_DATES = 2;

export function validateBankStatementText(
  text: string
): StatementValidationResult {
  const lowerText = text.toLowerCase();

  const keywordMatches = BANK_STATEMENT_KEYWORDS.filter((keyword) =>
    lowerText.includes(keyword)
  ).length;

  const currencyMatches = text.match(CURRENCY_AMOUNT_PATTERN)?.length ?? 0;
  const dateMatches = text.match(DATE_PATTERN)?.length ?? 0;

  if (text.trim().length === 0) {
    return {
      isLikelyBankStatement: false,
      reason:
        "No readable text found in this PDF. Scanned/image-only PDFs aren't supported yet.",
    };
  }

  if (keywordMatches < MIN_KEYWORD_MATCHES) {
    return {
      isLikelyBankStatement: false,
      reason:
        "This doesn't look like a bank statement — expected terms like 'balance', 'transaction', or 'account' weren't found.",
    };
  }

  if (currencyMatches < MIN_CURRENCY_AMOUNTS) {
    return {
      isLikelyBankStatement: false,
      reason:
        "This doesn't look like a bank statement — not enough monetary amounts were found.",
    };
  }

  if (dateMatches < MIN_DATES) {
    return {
      isLikelyBankStatement: false,
      reason:
        "This doesn't look like a bank statement — not enough dates were found.",
    };
  }

  return { isLikelyBankStatement: true };
}