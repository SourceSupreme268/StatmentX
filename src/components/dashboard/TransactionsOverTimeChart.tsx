"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";
import type { ChartDataPoint, ChartRange } from "@/lib/chart-data";

interface TransactionsOverTimeChartProps {
  data: ChartDataPoint[];
  range: ChartRange;
}

const RANGE_OPTIONS: { value: ChartRange; label: string }[] = [
  { value: "this-month", label: "This Month" },
  { value: "last-30-days", label: "Last 30 Days" },
  { value: "all-time", label: "All Time" },
];

export function TransactionsOverTimeChart({
  data,
  range,
}: TransactionsOverTimeChartProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasData = data.length > 0;

  function handleRangeChange(newRange: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", newRange);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="rounded-xl border border-gray-200 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          Transactions Over Time
        </h2>
        <select
          value={range}
          onChange={(e) => handleRangeChange(e.target.value)}
          className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600"
        >
          {RANGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 h-64">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="transactions"
                stroke="#3B6EF6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <TrendingUp className="h-6 w-6 text-gray-300" />
            <p className="text-sm text-gray-500">No transaction data yet</p>
            <p className="text-xs text-gray-400">
              Upload your first statement to see activity here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}