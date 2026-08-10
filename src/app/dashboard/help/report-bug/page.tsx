"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { HelpPageBackLink } from "@/components/help/HelpPageBackLink";
import { FormField } from "@/components/help/FormField";
import { FormTextareaField } from "@/components/help/FormTextareaField";
import { BUG_SEVERITY_OPTIONS } from "@/data/bug-report-options";
import { submitBugReport } from "@/lib/support-actions";
import type { BugSeverity } from "@prisma/client";

export default function ReportBugPage() {
  const [severity, setSeverity] = useState<BugSeverity>("low");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitBugReport({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      stepsToReproduce: formData.get("stepsToReproduce") as string,
      severity,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(result.error ?? "Something went wrong.");
    }
  }

  return (
    <>
      <DashboardTopBar title="Report a Bug" />

      <div className="mx-auto max-w-xl space-y-6 p-4 sm:p-6 lg:p-8">
        <HelpPageBackLink />

        {isSubmitted ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 p-8 text-center shadow-card">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <h2 className="text-sm font-semibold text-gray-900">
              Report submitted
            </h2>
            <p className="text-sm text-gray-500">
              Thanks for the report — we&apos;ll take a look.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-gray-200 p-6 shadow-card"
          >
            <FormField
              label="Title"
              name="title"
              placeholder="Brief summary of the issue"
              required
            />
            <FormTextareaField
              label="Description"
              name="description"
              placeholder="What happened?"
              required
            />
            <FormTextareaField
              label="Steps to reproduce"
              name="stepsToReproduce"
              placeholder={"1. Go to...\n2. Click on...\n3. See error"}
              rows={4}
            />

            <div>
              <label
                htmlFor="severity"
                className="block text-sm font-medium text-gray-700"
              >
                Severity
              </label>
              <select
                id="severity"
                name="severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value as BugSeverity)}
                className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              >
                {BUG_SEVERITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit report"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
