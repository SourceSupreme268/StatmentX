import { prisma } from "@/lib/prisma";

export interface ChartDataPoint {
  date: string;
  transactions: number;
}

export type ChartRange = "this-month" | "last-30-days" | "all-time";

const CHART_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function getRangeStartDate(range: ChartRange): Date | null {
  const now = new Date();

  switch (range) {
    case "this-month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "last-30-days": {
      const start = new Date(now);
      start.setDate(start.getDate() - 30);
      return start;
    }
    case "all-time":
      return null;
  }
}

export async function getTransactionsChartData(
  userId: string,
  range: ChartRange
): Promise<ChartDataPoint[]> {
  const startDate = getRangeStartDate(range);

  const transactions = await prisma.transaction.findMany({
    where: {
      statement: { userId, status: "completed" },
      ...(startDate ? { date: { gte: startDate } } : {}),
    },
    select: { date: true },
    orderBy: { date: "asc" },
  });

  const countsByDay = new Map<string, number>();
  for (const tx of transactions) {
    const label = CHART_DATE_FORMATTER.format(tx.date);
    countsByDay.set(label, (countsByDay.get(label) ?? 0) + 1);
  }

  return Array.from(countsByDay.entries()).map(([date, count]) => ({
    date,
    transactions: count,
  }));
}