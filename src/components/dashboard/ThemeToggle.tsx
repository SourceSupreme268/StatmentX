"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/cn";

// Visual only — does not actually change the app's theme yet. Wiring this
// up (e.g. via next-themes or a ThemeProvider + CSS variables) is deferred
// to the functionality phase per "UI first" instruction.
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-gray-700">Theme</span>
      <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition",
            theme === "light"
              ? "bg-gray-900 text-white"
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Sun className="h-3.5 w-3.5" />
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition",
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Moon className="h-3.5 w-3.5" />
          Dark
        </button>
      </div>
    </div>
  );
}
