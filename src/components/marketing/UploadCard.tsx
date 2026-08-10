import Image from "next/image";

export function UploadCard() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-10 text-center shadow-card">
      <div className="mx-auto flex h-16 w-16 items-center justify-center">
        {/* Internal asset per project image rule — replace with actual PDF glyph asset */}
        <Image
          src="/icons/pdf-file.svg"
          alt="PDF file"
          width={56}
          height={56}
        />
      </div>

      <h3 className="mt-4 text-base font-semibold text-gray-900">
        Upload your bank statement PDF
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Drag and drop your file here, or{" "}
        <span className="font-medium text-brand-500">browse</span>
      </p>

      <button
        type="button"
        className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Choose PDF File
      </button>

      <p className="mt-4 text-xs text-gray-400">
        Supported format: PDF (Max 50MB)
      </p>
    </div>
  );
}
