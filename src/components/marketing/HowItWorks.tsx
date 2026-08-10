import { Upload, ScanLine, CheckCircle2, FileText, ArrowRight, ArrowDown } from "lucide-react";

const STEPS = [
  { number: 1, icon: Upload, title: "Upload PDF", description: "Upload your bank statement PDF file securely." },
  { number: 2, icon: ScanLine, title: "Extract Transactions", description: "Our AI extracts transactions accurately from your statement." },
  { number: 3, icon: CheckCircle2, title: "Review & Validate", description: "Review extracted data and confirm the accuracy." },
  { number: 4, icon: FileText, title: "Export Excel/CSV", description: "Download your transactions in Excel or CSV format." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          How it works
        </h2>

        <div className="mt-14 flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="flex w-full max-w-xs flex-col items-center gap-6 lg:w-auto lg:flex-1 lg:flex-row lg:items-start"
            >
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/5">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1 max-w-[180px] text-xs leading-relaxed text-gray-400">
                  {step.description}
                </p>
              </div>

              {idx < STEPS.length - 1 && (
                <>
                  <ArrowDown className="h-4 w-4 shrink-0 text-gray-600 lg:hidden" />
                  <ArrowRight className="mt-6 hidden h-4 w-4 shrink-0 text-gray-600 lg:block" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}