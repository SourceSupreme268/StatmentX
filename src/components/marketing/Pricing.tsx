import { Sparkles, Check } from "lucide-react";

const PLANNED_FEATURES = [
  "Unlimited statement uploads",
  "Priority processing",
  "Advanced export options",
  "Multi-account support",
] as const;

export function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-gray-200 p-8 text-center shadow-card sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
          <Sparkles className="h-5 w-5 text-brand-500" />
        </span>

        <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          Pricing — Coming soon
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          StatementX is free to use right now. Paid plans aren&apos;t
          available yet — here&apos;s what&apos;s planned for upgraded
          accounts.
        </p>

        <ul className="mt-6 w-full max-w-xs space-y-3 text-left">
          {PLANNED_FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2.5 text-sm text-gray-700"
            >
              <Check className="h-4 w-4 shrink-0 text-green-600" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}