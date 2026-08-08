"use client";

import React from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import { useLMSTheme } from "./LMSThemeProvider";

export function LMSThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useLMSTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all select-none ${
        isDark
          ? "border border-slate-800 bg-slate-900 text-amber-400 hover:border-slate-700 hover:bg-slate-800"
          : "border border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200"
      } ${className}`}
    >
      <MaterialIcon
        name={isDark ? "light_mode" : "dark_mode"}
        size={16}
        className={isDark ? "text-amber-400" : "text-slate-700"}
      />
      <span className="hidden sm:inline">
        {isDark ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}
