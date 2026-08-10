import Link from "next/link";
import { Rocket } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-gray-50 p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:p-8 sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-card">
            <Rocket className="h-4 w-4 text-brand-500" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Ready to save hours on bank statement processing?
            </h3>
            <p className="mt-0.5 text-sm text-gray-500">
              Upload your first statement and see the difference.
            </p>
          </div>
        </div>

        <Link
          href="/sign-up"
          className="shrink-0 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Get Started for Free
        </Link>
      </div>
    </section>
  );
}