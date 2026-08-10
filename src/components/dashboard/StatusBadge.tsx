import { cn } from "@/lib/cn";

export type StatementStatus = "completed" | "processing" | "failed";

interface StatusBadgeProps {
  status: StatementStatus;
}

const STATUS_STYLES: Record<StatementStatus, string> = {
  completed: "bg-green-50 text-green-700",
  processing: "bg-amber-50 text-amber-700",
  failed: "bg-red-50 text-red-700",
};

const STATUS_LABELS: Record<StatementStatus, string> = {
  completed: "Completed",
  processing: "Processing",
  failed: "Failed",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}