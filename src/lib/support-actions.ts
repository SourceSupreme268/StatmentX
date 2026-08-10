"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { BugSeverity } from "@prisma/client";

interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
}): Promise<SubmitResult> {
  const { userId } = await auth();

  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "All fields are required." };
  }

  await prisma.contactSubmission.create({
    data: {
      userId: userId ?? undefined,
      name: data.name,
      email: data.email,
      message: data.message,
    },
  });

  return { success: true };
}

export async function submitBugReport(data: {
  title: string;
  description: string;
  stepsToReproduce?: string;
  severity: BugSeverity;
}): Promise<SubmitResult> {
  const { userId } = await auth();

  if (!data.title || !data.description) {
    return { success: false, error: "Title and description are required." };
  }

  await prisma.bugReport.create({
    data: {
      userId: userId ?? undefined,
      title: data.title,
      description: data.description,
      stepsToReproduce: data.stepsToReproduce || undefined,
      severity: data.severity,
    },
  });

  return { success: true };
}
