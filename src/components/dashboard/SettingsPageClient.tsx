"use client";

import { useState } from "react";
import { SettingsTabs } from "@/components/dashboard/SettingsTabs";
import { ProfileTab } from "@/components/dashboard/ProfileTab";
import { PreferencesTab } from "@/components/dashboard/PreferencesTab";
import { HelpTab } from "@/components/dashboard/HelpTab";
import type { SettingsTabId } from "@/data/settings-tabs";
import type { UserPreferencesData } from "@/lib/preferences-actions";

interface SettingsPageClientProps {
  initialPreferences: UserPreferencesData;
}

export function SettingsPageClient({
  initialPreferences,
}: SettingsPageClientProps) {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("profile");

  return (
    <>
      <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "preferences" && (
        <PreferencesTab initialPreferences={initialPreferences} />
      )}
      {activeTab === "help" && <HelpTab />}
    </>
  );
}