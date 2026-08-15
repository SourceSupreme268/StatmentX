import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex h-full min-h-[60vh] w-full flex-col items-center justify-center gap-3">
      <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
      <p className="text-sm text-gray-400">Loading…</p>
    </div>
  );
}
