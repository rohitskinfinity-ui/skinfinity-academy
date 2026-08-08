"use client";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="mb-6 space-y-2">
        <div className="h-8 w-44 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-3/4 max-w-xl animate-pulse rounded-lg bg-slate-200/60 dark:bg-slate-800/60" />
      </div>

      {/* Profile Card Skeleton */}
      <div className="mb-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 animate-pulse rounded-2xl bg-teal-600/30 dark:bg-teal-500/20" />
          <div className="space-y-3 flex-1 min-w-0">
            <div className="h-6 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-28 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
            <div className="flex flex-wrap gap-4 pt-1">
              <div className="h-4 w-40 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Skeleton */}
      <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
        <div className="h-5 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3.5 w-24 animate-pulse rounded bg-slate-200/60 dark:bg-slate-800/60" />
              <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
          <div className="h-10 w-32 animate-pulse rounded-xl bg-teal-600/30 dark:bg-teal-500/20" />
        </div>
      </div>
    </div>
  );
}
