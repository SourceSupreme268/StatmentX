import { Building2, UploadCloud, ShieldCheck, Download } from "lucide-react";

const FEATURES = [
  {
    icon: Building2,
    title: "Multi-format Support",
    description: "Works with statements from multiple banks.",
  },
  {
    icon: UploadCloud,
    title: "Smart Data Extraction",
    description: "AI-powered extraction for accurate results.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    description: "Bank-level security to protect your data.",
  },
];

const PREVIEW_ROWS = [
  { date: "01 May 2024", desc: "Opening Balance", type: "Opening Balance", amount: "–", balance: "10,000.00" },
  { date: "02 May 2024", desc: "ATM Withdrawal", type: "Debit", amount: "-200.00", balance: "9,800.00" },
  { date: "03 May 2024", desc: "Salary Credit", type: "Credit", amount: "3,500.00", balance: "13,300.00" },
  { date: "04 May 2024", desc: "Utility Payment", type: "Debit", amount: "-150.00", balance: "13,150.00" },
  { date: "05 May 2024", desc: "Online Transfer", type: "Debit", amount: "-500.00", balance: "12,650.00" },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Everything you need
            <br />
            to get started
          </h2>
          <p className="mt-4 max-w-md text-sm text-gray-600">
            Built for accountants, bookkeepers, and finance teams who want to
            save time and reduce manual work.
          </p>

          <div className="mt-8 space-y-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                  <Icon className="h-4 w-4 text-brand-500" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-card">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-green-600 text-[10px] font-bold text-white">
                X
              </span>
              Excel
            </span>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          </div>

          <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-xs">
            <thead>
              <tr className="text-gray-500">
                <th className="px-5 py-2.5 font-medium">Date</th>
                <th className="px-5 py-2.5 font-medium">Description</th>
                <th className="px-5 py-2.5 font-medium">Type</th>
                <th className="px-5 py-2.5 font-medium">Amount</th>
                <th className="px-5 py-2.5 font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {PREVIEW_ROWS.map((row) => (
                <tr key={row.date + row.desc} className="border-t border-gray-50 text-gray-700">
                  <td className="px-5 py-2.5">{row.date}</td>
                  <td className="px-5 py-2.5">{row.desc}</td>
                  <td className="px-5 py-2.5">{row.type}</td>
                  <td className="px-5 py-2.5">{row.amount}</td>
                  <td className="px-5 py-2.5">{row.balance}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-100 bg-gray-50 font-medium text-gray-900">
                <td className="px-5 py-2.5" colSpan={3}>
                  Total (5 transactions)
                </td>
                <td className="px-5 py-2.5">2,650.00</td>
                <td className="px-5 py-2.5">12,650.00</td>
              </tr>
            </tfoot>
          </table>
          </div>
        </div>
      </div>
    </section>
  );
}
