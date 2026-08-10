export const FAQ_ITEMS = [
  {
    question: "What file formats can I upload?",
    answer:
      "StatementX accepts PDF bank statements up to 50MB. Password-protected PDFs are not currently supported — remove the password before uploading.",
  },
  {
    question: "Which banks are supported?",
    answer:
      "StatementX works with statements from most major banks. If your bank's statement doesn't extract correctly, let us know via Contact Support so we can improve support for it.",
  },
  {
    question: "How accurate is the extraction?",
    answer:
      "Extraction uses AI to read transaction data directly from your PDF. We recommend reviewing extracted transactions before exporting, especially for statements with unusual formatting.",
  },
  {
    question: "Can I export to both Excel and CSV?",
    answer:
      "Yes. When exporting, choose either Excel (.xlsx) or CSV (.csv) — both contain the same transaction data.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Your statements and extracted data are encrypted and never shared with third parties.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to Settings → Settings tab → Delete account. This permanently removes your account and all associated statements, transactions, and exports.",
  },
] as const;

export const GETTING_STARTED_STEPS = [
  {
    title: "Upload a statement",
    description:
      "Go to Upload Statement and choose a PDF bank statement from your device.",
  },
  {
    title: "Review extracted transactions",
    description:
      "Once processed, open the statement to review the transactions StatementX extracted.",
  },
  {
    title: "Export your data",
    description:
      "Click Export, choose Excel or CSV, and download your transactions.",
  },
] as const;