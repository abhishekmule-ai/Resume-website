"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className = "", size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = !mounted || theme === "dark";

  return (
    <MagneticButton strength={0.3}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`relative inline-flex items-center justify-center rounded-xl border border-surface-border bg-surface-elevated/80 p-2 text-muted-foreground hover:text-foreground hover:border-blue-500/40 hover:bg-surface-elevated transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
          size === "sm" ? "h-8 w-8" : "h-9 w-9"
        } ${className}`}
      >
        <span className="sr-only">
          {isDark ? "Switch to light mode" : "Switch to dark mode"}
        </span>

        <div className="relative h-4 w-4 sm:h-[18px] sm:w-[18px]">
          {/* Sun icon (visible in dark mode) */}
          <Sun
            className={`absolute inset-0 h-full w-full text-amber-400 transition-all duration-500 ${
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
          />

          {/* Moon icon (visible in light mode) */}
          <Moon
            className={`absolute inset-0 h-full w-full text-indigo-600 transition-all duration-500 ${
              !isDark
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            }`}
          />
        </div>
      </button>
    </MagneticButton>
  );
}

export default ThemeToggle;
