"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { AlertTriangle, Loader2 } from "lucide-react";
import { deleteAccount } from "@/lib/account-actions";

export function DeleteAccountSection() {
  const { signOut } = useClerk();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    setErrorMessage(null);

    const result = await deleteAccount();

    if (result.success) {
      await signOut({ redirectUrl: "/" });
    } else {
      setIsDeleting(false);
      setErrorMessage(result.error ?? "Failed to delete account.");
    }
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50/40 p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-900">
            Delete account
          </h3>
          <p className="mt-1 text-xs text-red-700">
            Permanently delete your account and all associated statements,
            transactions, and exports. This action cannot be undone.
          </p>

          {errorMessage && (
            <p className="mt-2 text-xs font-medium text-red-800">
              {errorMessage}
            </p>
          )}

          {isConfirming ? (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting && <Loader2 className="h-3 w-3 animate-spin" />}
                {isDeleting ? "Deleting…" : "Yes, delete my account"}
              </button>
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                disabled={isDeleting}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsConfirming(true)}
              className="mt-3 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50"
            >
              Delete account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}