import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import {
  generateExcelBuffer,
  generateCsvBuffer,
} from "@/lib/export-file-generator";

interface RouteParams {
  params: Promise<{ exportId: string }>;
}

const UTF8_BOM = Buffer.from([0xef, 0xbb, 0xbf]);

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { exportId } = await params;

  const exportRow = await prisma.export.findFirst({
    where: { id: exportId, userId },
    include: {
      statement: {
        include: { transactions: { orderBy: { date: "asc" } } },
      },
    },
  });

  if (!exportRow) {
    return NextResponse.json({ error: "Export not found" }, { status: 404 });
  }

  const transactions = exportRow.statement.transactions;

  let buffer: Buffer;
  let contentType: string;

  if (exportRow.format === "xlsx") {
    buffer = await generateExcelBuffer(transactions);
    contentType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  } else {
    const csvBuffer = generateCsvBuffer(transactions);
    buffer = Buffer.concat([UTF8_BOM, csvBuffer]);
    contentType = "text/csv; charset=utf-8";
  }

  const responseBody = new Uint8Array(buffer);

  return new NextResponse(responseBody, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${exportRow.fileName}"`,
    },
  });
}