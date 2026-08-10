"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { ExportOptions } from "@/data/export-options";

interface CreateExportResult {
  success: boolean;
  error?: string;
  exportId?: string;
}

// Creates an Export row representing a user's export request. Does NOT
// generate a real file yet — no fileUrl is set (schema allows this: fileUrl
// is nullable).
//
// `options` (format, include-balance flags, etc.) aren't persisted yet
// either — there's no column for them on Export. Once real file generation
// is built, decide whether these need to be stored (e.g. to regenerate an
// identical file later) or are only relevant at generation time.
export async function createExport(
  statementId: string,
  options: ExportOptions
): Promise<CreateExportResult> {
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

  const extension = options.format;
  const fileName = `${statement.fileName.replace(/\.pdf$/i, "")}.${extension}`;

  const exportRow = await prisma.export.create({
    data: {
      userId,
      statementId,
      fileName,
      format: options.format,
    },
  });

  return { success: true, exportId: exportRow.id };
}
