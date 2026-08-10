import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { SettingsPageClient } from "@/components/dashboard/SettingsPageClient";
import { getUserPreferences } from "@/lib/preferences-actions";

export default async function SettingsPage() {
  const preferences = await getUserPreferences();

  return (
    <>
      <DashboardTopBar title="Settings" />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <SettingsPageClient initialPreferences={preferences} />
      </div>
    </>
  );
}