import { Sparkles, Check } from "lucide-react";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";

// V1: "Coming soon" placeholder — no real billing/plans/payment yet.
// Structured as a features list so that when real pricing tiers are added
// later, this becomes a straightforward swap of PLANNED_FEATURES + adding
// actual plan cards/payment below, without needing to restructure the
// page or its route.
const PLANNED_FEATURES = [
  "Unlimited statement uploads",
  "Priority processing",
  "Advanced export options",
  "Multi-account support",
] as const;

export default function UpgradePage() {
  return (
    <>
      <DashboardTopBar title="Upgrade" />

      <div className="flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
          <Sparkles className="h-6 w-6 text-brand-500" />
        </span>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Upgrade — Coming soon
        </h1>
        <p className="mt-2 max-w-sm text-sm text-gray-500">
          Paid plans aren&apos;t available yet. Here&apos;s what&apos;s
          planned for upgraded accounts.
        </p>

        <ul className="mt-8 w-full max-w-xs space-y-3 text-left">
          {PLANNED_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-700">
              <Check className="h-4 w-4 shrink-0 text-green-600" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
