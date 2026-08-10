"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/cn";

interface SignOutButtonProps {
  className?: string;
  showLabel?: boolean;
  variant?: "dark" | "light";
}

const VARIANT_STYLES: Record<NonNullable<SignOutButtonProps["variant"]>, string> = {
  dark: "text-gray-400 hover:text-white",
  light: "text-gray-500 hover:text-gray-900",
};

export function SignOutButton({
  className,
  showLabel = true,
  variant = "light",
}: SignOutButtonProps) {
  const { signOut } = useClerk();

  return (
    <button
      type="button"
      onClick={() => signOut({ redirectUrl: "/sign-in" })}
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition",
        VARIANT_STYLES[variant],
        className
      )}
    >
      <LogOut className="h-4 w-4" />
      {showLabel && "Sign out"}
    </button>
  );
}