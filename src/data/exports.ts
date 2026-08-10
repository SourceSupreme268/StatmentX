
export type ExportFormat = "csv" | "xlsx";

export interface ExportRow {
  id: string;
  fileName: string;
  format: ExportFormat;
  statementName: string; // e.g. "SBI May" — the source statement this export was generated from
  createdAt: string; // ISO 8601 timestamp
}

// Empty state — no exports have been generated yet (no backend/DB wired up,
// and export generation itself is not implemented yet — UI only for now).
// Replace with a real query once export generation + persistence exist.
export const EXPORTS: ExportRow[] = [];