"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, Sun, Moon } from "lucide-react";
import { SettingsSelectField } from "@/components/dashboard/SettingsSelectField";
import { DeleteAccountSection } from "@/components/dashboard/DeleteAccountSection";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { cn } from "@/lib/cn";
import { EXPORT_FORMAT_OPTIONS } from "@/data/preferences-options";
import { saveUserPreferences, type UserPreferencesData } from "@/lib/preferences-actions";

interface PreferencesTabProps {
  initialPreferences: UserPreferencesData;
}

export function PreferencesTab({ initialPreferences }: PreferencesTabProps) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isPending, startTransition] = useTransition();
  const [justSaved, setJustSaved] = useState(false);

  function updateAndSave(next: UserPreferencesData) {
    setPreferences(next);
    setJustSaved(false);
    startTransition(async () => {
      const result = await saveUserPreferences(next);
      if (result.success) {
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);
      }
    });
  }

  return (
    <div className="space-y-6">

      {/* -------- version 2 ---------- */}
      {/* <div className="rounded-xl border border-gray-200 p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Preferences</h3>
          {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-400" />}
          {justSaved && !isPending && (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <Check className="h-3.5 w-3.5" />
              Saved
            </span>
          )}
        </div>

        <div className="mt-1 divide-y divide-gray-100">
          <SettingsSelectField
            label="Default export format"
            value={preferences.defaultExportFormat}
            onChange={(value) =>
              updateAndSave({
                ...preferences,
                defaultExportFormat: value as UserPreferencesData["defaultExportFormat"],
              })
            }
            options={EXPORT_FORMAT_OPTIONS}
          />

          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-700">Theme</span>
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
              <button
                type="button"
                onClick={() => updateAndSave({ ...preferences, theme: "light" })}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition",
                  preferences.theme === "light" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
                )}
              >
                <Sun className="h-3.5 w-3.5" />
                Light
              </button>
              <button
                type="button"
                onClick={() => updateAndSave({ ...preferences, theme: "dark" })}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition",
                  preferences.theme === "dark" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
                )}
              >
                <Moon className="h-3.5 w-3.5" />
                Dark
              </button>
            </div>
          </div>
        </div>
      
      </div> */}

      <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5 shadow-card">
        <div className="mr-2">
          <h3 className="text-sm font-semibold text-gray-900">Sign out</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Sign out of your account on this device.
          </p>
        </div>
        <SignOutButton  variant="light" />
      </div>

      <DeleteAccountSection />
    </div>
  );
}