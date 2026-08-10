import { Check } from "lucide-react";

const UPLOAD_TIPS = [
  "Upload clear, high-quality PDF bank statements",
  "Ensure all pages are included",
  "Password-protected PDFs are not supported",
] as const;

export function UploadTipsCard() {
  return (
    <div className="rounded-xl bg-gray-50 p-5">
      <h3 className="text-sm font-semibold text-gray-900">
        Tips for best results
      </h3>
      <ul className="mt-3 space-y-2.5">
        {UPLOAD_TIPS.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-xs text-gray-600">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}