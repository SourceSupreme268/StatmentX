"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { HelpPageBackLink } from "@/components/help/HelpPageBackLink";
import { FormField } from "@/components/help/FormField";
import { FormTextareaField } from "@/components/help/FormTextareaField";
import { submitContactForm } from "@/lib/support-actions";

export default function ContactSupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
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
      <DashboardTopBar title="Contact Support" />

      <div className="mx-auto max-w-xl space-y-6 p-4 sm:p-6 lg:p-8">
        <HelpPageBackLink />

        {isSubmitted ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 p-8 text-center shadow-card">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <h2 className="text-sm font-semibold text-gray-900">
              Message sent
            </h2>
            <p className="text-sm text-gray-500">
              Thanks for reaching out — we&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-gray-200 p-6 shadow-card"
          >
            <FormField label="Name" name="name" required />
            <FormField label="Email" name="email" type="email" required />
            <FormTextareaField
              label="Message"
              name="message"
              placeholder="How can we help?"
              required
            />

            {errorMessage && (
              <p className="text-xs text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>
        )}

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-card">
            <Mail className="h-4 w-4 text-gray-500" />
          </span>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Prefer email?
            </p>
            <a
              href="mailto:support@statementx.com"
              className="text-xs text-brand-500 hover:text-brand-600"
            >
              support@statementx.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}