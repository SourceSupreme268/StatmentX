import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { StatCard } from "@/components/dashboard/StatCard";
import { TransactionsOverTimeChart } from "@/components/dashboard/TransactionsOverTimeChart";
import { RecentStatementsPanel } from "@/components/dashboard/RecentStatementsPanel";
import { buildDashboardStats } from "@/data/dashboard-stats";
import {
  getDashboardCounts,
  getRecentStatementsForUser,
} from "@/lib/dashboard-data";
import { getTransactionsChartData, type ChartRange } from "@/lib/chart-data";
import { toStatementRow } from "@/lib/statement-mappers";

const VALID_RANGES: ChartRange[] = ["this-month", "last-30-days", "all-time"];

interface DashboardPageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { range: rawRange } = await searchParams;
  const range: ChartRange = VALID_RANGES.includes(rawRange as ChartRange)
    ? (rawRange as ChartRange)
    : "this-month";

  const [counts, recentStatements, chartData] = await Promise.all([
    getDashboardCounts(userId),
    getRecentStatementsForUser(userId),
    getTransactionsChartData(userId, range),
  ]);

  const stats = buildDashboardStats(counts);
  const recentStatementRows = recentStatements.map(toStatementRow);

  return (
    <>
      <DashboardTopBar title="Dashboard" />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TransactionsOverTimeChart data={chartData} range={range} />
          </div>
          <RecentStatementsPanel statements={recentStatementRows} />
        </div>
      </div>
    </>
  );
}