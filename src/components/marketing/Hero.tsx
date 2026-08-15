import { Shield, Zap, CheckCircle2 } from "lucide-react";
import { UploadCard } from "./UploadCard";

const TRUST_POINTS = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared.",
  },
  {
    icon: Zap,
    title: "Fast Extraction",
    description: "Get your data in seconds.",
  },
  {
    icon: CheckCircle2,
    title: "Accurate Results",
    description: "AI-powered extraction for high accuracy.",
  },
];

export function Hero() {
  return (
    <section className="mx-auto lg:h-[85vh] max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            PDF Bank Statements
            <br />
            to Excel <span className="text-brand-500">in Seconds</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-gray-600">
            Upload your bank statement PDF and get accurate transactions in
            Excel or CSV. Fast, secure, and easy to use.
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TRUST_POINTS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-2">
                <Icon className="h-4 w-4 text-brand-500" />
                <dt className="text-sm font-semibold text-gray-900">
                  {title}
                </dt>
                <dd className="text-xs leading-relaxed text-gray-500">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <UploadCard />
      </div>
    </section>
  );
}
