import { prisma } from "@/lib/prisma";

export async function getExportsForUser(userId: string) {
  return prisma.export.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      statement: { select: { fileName: true } },
    },
  });
}