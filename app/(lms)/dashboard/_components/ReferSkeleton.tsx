"use client";

export default function ReferSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="mb-6 space-y-2">
        <div className="h-8 w-44 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-3/4 max-w-xl animate-pulse rounded-lg bg-slate-200/60 dark:bg-slate-800/60" />
      </div>

      {/* Available Balance Card Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-3 w-28 animate-pulse rounded bg-teal-500/20" />
            <div className="h-8 w-36 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-48 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
          </div>
          <div className="h-10 w-44 shrink-0 animate-pulse rounded-xl bg-teal-600/30 dark:bg-teal-500/20" />
        </div>
      </div>

      {/* Hero Share Banner Skeleton */}
      <div className="rounded-2xl bg-gradient-to-br from-teal-700/80 to-teal-900/80 p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 animate-pulse rounded-lg bg-white/20" />
          <div className="h-6 w-56 animate-pulse rounded-lg bg-white/20" />
        </div>
        <div className="h-4 w-3/4 max-w-md animate-pulse rounded-md bg-white/10" />

        {/* Link box skeleton */}
        <div className="h-16 w-full animate-pulse rounded-xl bg-white/10" />

        {/* Code box skeleton */}
        <div className="h-16 w-full animate-pulse rounded-xl bg-white/10" />

        {/* Share buttons skeleton */}
        <div className="flex gap-2 pt-1">
          <div className="h-8 w-24 animate-pulse rounded-xl bg-white/15" />
          <div className="h-8 w-20 animate-pulse rounded-xl bg-white/15" />
          <div className="h-8 w-20 animate-pulse rounded-xl bg-white/15" />
        </div>
      </div>

      {/* 3 Step Cards Skeleton */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-sm"
          >
            <div className="h-8 w-8 animate-pulse rounded-lg bg-teal-500/20" />
            <div className="h-5 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-4/5 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
          </div>
        ))}
      </div>

      {/* Referrals List Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
          <div className="h-5 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {[1, 2, 3].map((r) => (
            <div key={r} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 animate-pulse rounded-xl bg-teal-500/20" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200/60 dark:bg-slate-800/60" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-14 animate-pulse rounded bg-teal-600/30 dark:bg-teal-500/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
