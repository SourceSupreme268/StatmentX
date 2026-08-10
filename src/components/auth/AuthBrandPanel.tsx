import Image from "next/image";

export function AuthBrandPanel() {
  return (
    <div className="relative hidden h-full flex-1 flex-col justify-center overflow-hidden bg-ink-950 px-10 py-10 lg:flex">
      <div>
        <h2 className="max-w-xs text-xl font-semibold leading-snug text-white xl:text-2xl">
          Turn bank statements into clean data
        </h2>
        <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-gray-400">
          Save hours of manual work and eliminate data entry errors.
        </p>
      </div>

      <div className="mt-8 max-h-[45vh] overflow-hidden">
        <Image
          src="/illustrations/statement-preview.svg"
          alt="Bank statement preview"
          width={360}
          height={220}
          className="w-full max-w-md rounded-xl"
        />
      </div>
    </div>
  );
}
