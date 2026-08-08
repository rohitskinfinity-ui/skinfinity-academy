"use client";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-4">
            <div className="h-3 w-28 animate-pulse rounded-full bg-teal-500/20" />
            <div className="h-8 w-64 sm:w-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-full max-w-md animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
            <div className="pt-2 flex flex-wrap gap-3">
              <div className="h-10 w-40 animate-pulse rounded-xl bg-teal-600/30 dark:bg-teal-500/20" />
              <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
          <div className="w-full max-w-xs rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 ring-1 ring-slate-100 dark:ring-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-8 animate-pulse rounded-md bg-teal-500/30" />
            </div>
            <div className="h-2 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-40 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-700/60" />
          </div>
        </div>
      </div>

      {/* Stat Tiles Skeleton (4 grid tiles) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-sm"
          >
            <div className="h-9 w-9 animate-pulse rounded-xl bg-teal-500/15 dark:bg-teal-500/10" />
            <div className="space-y-1.5">
              <div className="h-6 w-12 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-20 animate-pulse rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Bottom Section Skeleton */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="h-5 w-40 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-56 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
              </div>
              <div className="h-4 w-16 animate-pulse rounded-md bg-teal-500/20" />
            </div>

            {/* Course list items skeleton */}
            <div className="space-y-3 pt-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-800/30"
                >
                  <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-teal-500/20 dark:bg-teal-500/10" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-1/2 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
                    <div className="h-2 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Upcoming Live Card Skeleton */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-3 w-full animate-pulse rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
            <div className="h-3 w-4/5 animate-pulse rounded-md bg-slate-200/50 dark:bg-slate-800/50" />
            <div className="h-4 w-28 animate-pulse rounded-md bg-teal-500/20 pt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
