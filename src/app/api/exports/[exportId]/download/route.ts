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

// UTF-8 byte order mark — without this, Excel on Windows sometimes
// misreads a plain UTF-8 CSV's encoding and/or fails to recognize the
// file type cleanly in its Open dialog (reported symptom: file doesn't
// show up unless "All Files" is selected). Prepending the BOM is the
// standard fix for Excel/CSV interop on Windows.
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

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${exportRow.fileName}"`,
    },
  });
}