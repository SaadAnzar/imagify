"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="inline-flex items-center justify-center cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun
        className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:fill-accent-foreground"
        strokeWidth={2.5}
      />
      <Moon
        className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:fill-accent-foreground"
        strokeWidth={2.5}
      />
    </button>
  );
}
