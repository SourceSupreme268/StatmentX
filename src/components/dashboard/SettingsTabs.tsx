"use client";

import { cn } from "@/lib/cn";
import { SETTINGS_TABS, type SettingsTabId } from "@/data/settings-tabs";

interface SettingsTabsProps {
  activeTab: SettingsTabId;
  onChange: (tab: SettingsTabId) => void;
}

export function SettingsTabs({ activeTab, onChange }: SettingsTabsProps) {
  return (
    <div className="flex gap-1 border-b border-gray-100">
      {SETTINGS_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "border-b-2 px-4 py-2.5 text-sm font-medium transition",
            activeTab === tab.id
              ? "border-brand-500 text-brand-600"
              : "border-transparent text-gray-500 hover:text-gray-900"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}