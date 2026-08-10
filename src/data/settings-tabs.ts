export type SettingsTabId = "profile" | "preferences" | "help";

export interface SettingsTab {
  id: SettingsTabId;
  label: string;
}

export const SETTINGS_TABS: SettingsTab[] = [
  { id: "profile", label: "Profile" },
  { id: "preferences", label: "Settings" },
  { id: "help", label: "Help" },
];