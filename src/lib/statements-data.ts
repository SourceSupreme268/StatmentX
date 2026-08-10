import { prisma } from "@/lib/prisma";

export async function getStatementsForUser(userId: string) {
  const statements = await prisma.statement.findMany({
    where: { userId },
    orderBy: { uploadedAt: "desc" },
    include: {
      _count: { select: { transactions: true } },
    },
  });

  return statements;
}

export async function getStatementWithTransactions(
  statementId: string,
  userId: string
) {
  const statement = await prisma.statement.findFirst({
    // Scoped to userId as well as id — prevents one user from viewing
    // another user's statement by guessing/incrementing an ID.
    where: { id: statementId, userId },
    include: {
      transactions: { orderBy: { date: "asc" } },
    },
  });

  return statement;
}
