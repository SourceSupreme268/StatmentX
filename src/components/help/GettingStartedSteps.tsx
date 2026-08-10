import { GETTING_STARTED_STEPS } from "@/data/help-content";

export function GettingStartedSteps() {
  return (
    <div className="rounded-xl border border-gray-200 p-5 shadow-card">
      <h2 className="text-sm font-semibold text-gray-900">Getting started</h2>
      <ol className="mt-4 space-y-4">
        {GETTING_STARTED_STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {step.title}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
