"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className = "", size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = !mounted || theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to blueprint light mode" : "Switch to blueprint dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex items-center justify-center rounded-xl border border-[#5CE1FF]/25 bg-[#0F1217] p-2 text-[#8B949E] hover:text-white hover:border-volt-lime hover:shadow-volt-glow transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-volt-lime ${
        size === "sm" ? "h-8 w-8" : "h-9 w-9"
      } ${className}`}
    >
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>

      <div className="relative h-4 w-4 sm:h-[18px] sm:w-[18px]">
        {/* Sun icon (visible in dark mode) */}
        <Sun
          className={`absolute inset-0 h-full w-full text-volt-lime transition-all duration-300 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />

        {/* Moon icon (visible in light mode) */}
        <Moon
          className={`absolute inset-0 h-full w-full text-[#5CE1FF] transition-all duration-300 ${
            !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}

export default ThemeToggle;
