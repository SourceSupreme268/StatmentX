"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, Check } from "lucide-react";
import { deleteExport } from "@/lib/export-delete-action";
import { cn } from "@/lib/cn";

interface ExportDeleteButtonProps {
  exportId: string;
}

export function ExportDeleteButton({ exportId }: ExportDeleteButtonProps) {
  const router = useRouter();
  const [isArmed, setIsArmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const disarmTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsArmed(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleClick() {
    if (!isArmed) {
      setIsArmed(true);
      disarmTimeoutRef.current = setTimeout(() => setIsArmed(false), 4000);
      return;
    }

    if (disarmTimeoutRef.current) clearTimeout(disarmTimeoutRef.current);
    setIsDeleting(true);

    const result = await deleteExport(exportId);

    if (result.success) {
      router.refresh();
    } else {
      setIsDeleting(false);
      setIsArmed(false);
      alert(result.error ?? "Failed to delete export.");
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      disabled={isDeleting}
      aria-label={isArmed ? "Confirm delete export" : "Delete export"}
      title={isArmed ? "Click again to confirm" : "Delete export"}
      className={cn(
        "rounded p-1.5 transition disabled:cursor-not-allowed",
        isArmed
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "text-gray-400 hover:bg-red-50 hover:text-red-600"
      )}
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isArmed ? (
        <Check className="h-4 w-4" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}