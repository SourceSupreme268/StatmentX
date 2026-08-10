import Image from "next/image";

export function TrustedBy() {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6 pb-16">
      <div className="flex -space-x-2">
        {[1, 2, 3].map((i) => (
          <Image
            key={i}
            src={`/avatars/user-${i}.svg`}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full border-2 border-white"
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">
        Trusted by finance & accounting teams
      </span>
    </div>
  );
}
