import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import {
  extractStatementData,
  StatementExtractionError,
} from "@/lib/statement-extractor";

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB, matches UI copy

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    );
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Only PDF files are supported" },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: "File exceeds the 50MB limit" },
      { status: 400 }
    );
  }

  const statement = await prisma.statement.create({
    data: {
      userId,
      fileName: file.name,
      bank: "processing...",
      statementPeriodStart: new Date(),
      statementPeriodEnd: new Date(),
      status: "processing",
    },
  });

  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const extracted = await extractStatementData(fileBuffer, file.name);

    await prisma.$transaction([
      prisma.statement.update({
        where: { id: statement.id },
        data: {
          bank: extracted.bank,
          statementPeriodStart: extracted.statementPeriodStart,
          statementPeriodEnd: extracted.statementPeriodEnd,
          status: "completed",
        },
      }),
      prisma.transaction.createMany({
        data: extracted.transactions.map((tx) => ({
          statementId: statement.id,
          date: tx.date,
          description: tx.description,
          type: tx.type,
          amount: tx.amount,
          balance: tx.balance,
        })),
      }),
    ]);
} catch (error) {
    const isValidationRejection = error instanceof StatementExtractionError;

    console.error(
      isValidationRejection
        ? "Statement rejected:"
        : "Statement processing failed unexpectedly:",
      error
    );

    await prisma.statement.update({
      where: { id: statement.id },
      data: {
        status: "failed",
        errorMessage:
          error instanceof Error ? error.message : "Unknown error",
      },
    });

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process statement",
        statementId: statement.id,
      },
      { status: isValidationRejection ? 400 : 500 }
    );
  }

  return NextResponse.json({ statementId: statement.id }, { status: 201 });
}