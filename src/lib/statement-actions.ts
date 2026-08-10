"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

interface DeleteStatementResult {
  success: boolean;
  error?: string;
}

export async function deleteStatement(
  statementId: string
): Promise<DeleteStatementResult> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const statement = await prisma.statement.findFirst({
    where: { id: statementId, userId },
  });

  if (!statement) {
    return { success: false, error: "Statement not found" };
  }

  await prisma.statement.delete({ where: { id: statementId } });

  revalidatePath("/dashboard/statements");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/exports");

  return { success: true };
}
