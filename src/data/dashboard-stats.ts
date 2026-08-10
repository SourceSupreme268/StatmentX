import type { LucideIcon } from "lucide-react";
import { FileText, ArrowLeftRight } from "lucide-react";
import type { DashboardCounts } from "@/lib/dashboard-data";

export interface DashboardStat {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
}

export function buildDashboardStats(counts: DashboardCounts): DashboardStat[] {
  return [
    {
      label: "Statements Processed",
      value: counts.statementsProcessed.toString(),
      trend:
        counts.statementsProcessed === 0 ? "No statements yet" : "All time",
      icon: FileText,
    },
    {
      label: "Transactions Extracted",
      value: counts.transactionsExtracted.toString(),
      trend:
        counts.transactionsExtracted === 0
          ? "No transactions yet"
          : "All time",
      icon: ArrowLeftRight,
    },
  ];
}