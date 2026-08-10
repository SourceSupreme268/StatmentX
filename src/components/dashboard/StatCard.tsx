
import type { DashboardStat } from "@/data/dashboard-stats";

export function StatCard({ label, value, trend, icon: Icon }: DashboardStat) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{label}</span>
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <p className="mt-3 text-2xl font-semibold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{trend}</p>
    </div>
  );
}