import ExcelJS from "exceljs";
import type { Transaction } from "@prisma/client";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
});

function toRow(tx: Transaction) {
  const amount = Number(tx.amount);
  const balance = Number(tx.balance);

  return {
    date: DATE_FORMATTER.format(tx.date),
    description: tx.description,
    debit: amount < 0 ? Math.abs(amount) : null,
    credit: amount > 0 ? amount : null,
    balance,
    reference: tx.reference ?? "",
  };
}

export async function generateExcelBuffer(
  transactions: Transaction[]
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Transactions");

  sheet.columns = [
    { header: "Date", key: "date", width: 12 },
    { header: "Description", key: "description", width: 32 },
    { header: "Debit", key: "debit", width: 14 },
    { header: "Credit", key: "credit", width: 14 },
    { header: "Balance", key: "balance", width: 14 },
    { header: "Reference", key: "reference", width: 16 },
  ];

  sheet.getRow(1).font = { bold: true };

  for (const tx of transactions) {
    sheet.addRow(toRow(tx));
  }

  sheet.getColumn("debit").numFmt = "#,##0.00";
  sheet.getColumn("credit").numFmt = "#,##0.00";
  sheet.getColumn("balance").numFmt = "#,##0.00";

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function generateCsvBuffer(transactions: Transaction[]): Buffer {
  const header = "Date,Description,Debit,Credit,Balance,Reference";
  const rows = transactions.map((tx) => {
    const row = toRow(tx);
    return [
      row.date,
      csvEscape(row.description),
      row.debit !== null ? row.debit.toFixed(2) : "",
      row.credit !== null ? row.credit.toFixed(2) : "",
      row.balance.toFixed(2),
      csvEscape(row.reference),
    ].join(",");
  });

  return Buffer.from([header, ...rows].join("\n"), "utf-8");
}
