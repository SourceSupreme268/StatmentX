import { Check, X, HelpCircle } from "lucide-react";

const WORKS_WELL_WITH = [
  "Statements with a clear Date column",
  "A Description or transaction detail column",
  "Debit/Credit or a single signed Amount column",
  "A running Balance column",
  "Text-based PDFs (not scanned images)",
];

const DOES_NOT_WORK_WITH = [
  "Scanned or photographed statements (image-only PDFs)",
  "Password-protected PDFs",
  "Statements with no running balance shown",
  "Highly unconventional or heavily stylized layouts",
];

export function SupportedBanks() {
  return (
    <section
      id="supported-banks"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Which banks does this work with?
        </h2>
        <p className="mt-4 text-sm text-gray-600">
          StatementX doesn&apos;t rely on a fixed list of supported banks.
          Instead, it reads the structure of your PDF directly — so it
          works with any bank whose statement follows a standard layout,
          not just a preset few.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-green-200 bg-green-50/40 p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-green-900">
            <Check className="h-4 w-4" />
            Works well with
          </h3>
          <ul className="mt-4 space-y-2.5">
            {WORKS_WELL_WITH.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-green-800"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-red-900">
            <X className="h-4 w-4" />
            Doesn&apos;t currently work with
          </h3>
          <ul className="mt-4 space-y-2.5">
            {DOES_NOT_WORK_WITH.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-red-800"
              >
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-xl bg-gray-50 p-5 text-left">
        <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
        <p className="text-xs text-gray-500">
          Not sure if your statement will work? The best way to check is to
          try uploading it — StatementX will let you know right away if it
          can&apos;t read your file, and nothing is saved unless
          extraction succeeds.
        </p>
      </div>
    </section>
  );
}
