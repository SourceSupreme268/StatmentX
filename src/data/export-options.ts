export type ExportFormat = "xlsx" | "csv";

export interface ExportOptions {
  format: ExportFormat;
  includeOpeningBalance: boolean;
  includeClosingBalance: boolean;
  preserveOriginalOrder: boolean;
}

export const DEFAULT_EXPORT_OPTIONS: ExportOptions = {
  format: "xlsx",
  includeOpeningBalance: true,
  includeClosingBalance: true,
  preserveOriginalOrder: true,
};