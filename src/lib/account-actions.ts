"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

interface DeleteAccountResult {
  success: boolean;
  error?: string;
}

export async function deleteAccount(): Promise<DeleteAccountResult> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.$transaction([
      prisma.statement.deleteMany({ where: { userId } }),
      prisma.userPreferences.deleteMany({ where: { userId } }),
    ]);

    const client = await clerkClient();
    await client.users.deleteUser(userId);

    return { success: true };
  } catch (error) {
    console.error("Account deletion failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Deletion failed",
    };
  }
}