"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const label =
    theme === "dark"
      ? "Switch to light mode"
      : theme === "light"
        ? "Switch to dark mode"
        : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-colors duration-200 hover:border-primary/40 hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {/* Both icons are rendered and selected by the .dark class on <html>, so
          the correct icon paints immediately even before hydration. */}
      <span className="relative h-4 w-4" aria-hidden="true">
        <Sun className="h-4 w-4 text-amber-500 dark:hidden" />
        <Moon className="hidden h-4 w-4 dark:block" />
      </span>
    </button>
  );
}
