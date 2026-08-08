"use client";

import { useLMSTheme } from "./LMSThemeProvider";

export default function QuizSkeleton() {
  const { theme } = useLMSTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-[#F4F6F8] text-slate-900"
      }`}
    >
      {/* Header Skeleton */}
      <header
        className={`sticky top-0 z-20 border-b backdrop-blur-xl transition-colors duration-300 ${
          isDark
            ? "border-slate-800 bg-slate-950/90"
            : "border-slate-200/80 bg-white/90"
        }`}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="h-7 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-44 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-16 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
        </div>
      </header>

      {/* Main Quiz Body Skeleton */}
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 space-y-5">
        {/* Banner Skeleton */}
        <div className="h-12 w-full animate-pulse rounded-xl bg-teal-500/10 border border-teal-500/20" />

        {/* Question Cards Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-2xl border p-5 space-y-4 shadow-sm transition-colors duration-300 ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              {/* Question prompt skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-5/6 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Options list skeleton */}
              <div className="space-y-2.5 pt-1">
                {[1, 2, 3, 4].map((o) => (
                  <div
                    key={o}
                    className="h-11 w-full animate-pulse rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/40"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit button skeleton */}
        <div className="h-12 w-full animate-pulse rounded-xl bg-teal-600/30 dark:bg-teal-500/20 mt-6" />
      </main>
    </div>
  );
}
