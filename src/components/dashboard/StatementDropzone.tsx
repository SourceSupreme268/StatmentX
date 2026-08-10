"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

type UploadState = "idle" | "uploading" | "error";

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB, matches UI copy

export function StatementDropzone() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<UploadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  async function uploadFile(file: File) {
    setErrorMessage(null);

    if (file.type !== "application/pdf") {
      setState("error");
      setErrorMessage("Only PDF files are supported.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setState("error");
      setErrorMessage("File exceeds the 50MB limit.");
      return;
    }

    setState("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/statements/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed");
      }

      router.push(`/dashboard/statements/${data.statementId}`);
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={handleDrop}
      className={cn(
        "rounded-xl border border-dashed px-6 py-16 text-center transition",
        isDraggingOver
          ? "border-brand-500 bg-brand-50/40"
          : "border-gray-300 bg-gray-50/40"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
        {state === "uploading" ? (
          <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
        ) : (
          <UploadCloud className="h-6 w-6 text-brand-500" />
        )}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        {state === "uploading"
          ? "Processing your statement…"
          : "Drag and drop your PDF here"}
      </h3>

      {state !== "uploading" && (
        <p className="mt-1 text-xs text-gray-400">or</p>
      )}

      <button
        type="button"
        disabled={state === "uploading"}
        onClick={() => fileInputRef.current?.click()}
        className="mt-4 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "uploading" ? "Uploading…" : "Choose PDF File"}
      </button>

      {state === "error" && errorMessage && (
        <div className="mx-auto mt-4 flex max-w-xs items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-left">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-xs text-red-700">{errorMessage}</p>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        Supported format: PDF (Max 50MB)
      </p>
    </div>
  );
}