"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

interface DeleteExportResult {
  success: boolean;
  error?: string;
}

export async function deleteExport(
  exportId: string
): Promise<DeleteExportResult> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const exportRow = await prisma.export.findFirst({
    where: { id: exportId, userId },
  });

  if (!exportRow) {
    return { success: false, error: "Export not found" };
  }

  await prisma.export.delete({ where: { id: exportId } });

  revalidatePath("/dashboard/exports");

  return { success: true };
}