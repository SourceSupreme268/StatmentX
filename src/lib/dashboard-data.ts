import { prisma } from "@/lib/prisma";

export interface DashboardCounts {
  statementsProcessed: number;
  transactionsExtracted: number;
}

// "Processed" = completed statements only, not ones still processing/failed
// — matches what a user would consider a real, usable result.
export async function getDashboardCounts(
  userId: string
): Promise<DashboardCounts> {
  const [statementsProcessed, transactionsExtracted] = await Promise.all([
    prisma.statement.count({
      where: { userId, status: "completed" },
    }),
    prisma.transaction.count({
      where: { statement: { userId, status: "completed" } },
    }),
  ]);

  return { statementsProcessed, transactionsExtracted };
}

export async function getRecentStatementsForUser(userId: string, limit = 4) {
  return prisma.statement.findMany({
    where: { userId },
    orderBy: { uploadedAt: "desc" },
    take: limit,
    include: {
      _count: { select: { transactions: true } },
    },
  });
}


const CHART_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

