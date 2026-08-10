"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ThemePreference, ExportFormat } from "@prisma/client";

export interface UserPreferencesData {
  theme: ThemePreference;
  defaultExportFormat: ExportFormat;
  dateFormat: string;
  timeZone: string;
}

const DEFAULT_PREFERENCES: UserPreferencesData = {
  theme: "light",
  defaultExportFormat: "xlsx",
  dateFormat: "mm-dd-yyyy",
  timeZone: "UTC",
};

export async function getUserPreferences(): Promise<UserPreferencesData> {
  const { userId } = await auth();
  if (!userId) return DEFAULT_PREFERENCES;

  const preferences = await prisma.userPreferences.findUnique({
    where: { userId },
  });

  return preferences ?? DEFAULT_PREFERENCES;
}

interface SavePreferencesResult {
  success: boolean;
  error?: string;
}

export async function saveUserPreferences(
  data: UserPreferencesData
): Promise<SavePreferencesResult> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.userPreferences.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}