"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { MoreVertical, Trash2, Loader2 } from "lucide-react";
import { deleteStatement } from "@/lib/statement-actions";

interface StatementRowMenuProps {
  statementId: string;
  fileName: string;
}

export function StatementRowMenu({
  statementId,
  fileName,
}: StatementRowMenuProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function openMenu() {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.right - 224,
      });
    }
    setIsMenuOpen(true);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
        setIsConfirming(false);
        setErrorMessage(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    setErrorMessage(null);

    const result = await deleteStatement(statementId);

    if (result.success) {
      setIsMenuOpen(false);
      setIsConfirming(false);
      setIsDeleting(false);
      router.refresh();
    } else {
      setIsDeleting(false);
      setErrorMessage(result.error ?? "Failed to delete statement.");
    }
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Row actions"
        onClick={(e) => {
          e.stopPropagation();
          isMenuOpen ? setIsMenuOpen(false) : openMenu();
        }}
        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {isMenuOpen &&
        createPortal(
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            style={{ top: menuPosition.top, left: menuPosition.left }}
            className="fixed z-50 w-56 rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
          >
            {!isConfirming ? (
              <button
                type="button"
                onClick={() => setIsConfirming(true)}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete statement
              </button>
            ) : (
              <div className="p-2">
                <p className="text-xs text-gray-600">
                  Delete <span className="font-medium">{fileName}</span> and
                  all its transactions? This can&apos;t be undone.
                </p>
                {errorMessage && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errorMessage}
                  </p>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-red-600 px-2 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isDeleting && (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                    {isDeleting ? "Deleting…" : "Delete"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsConfirming(false);
                      setErrorMessage(null);
                    }}
                    disabled={isDeleting}
                    className="flex-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}