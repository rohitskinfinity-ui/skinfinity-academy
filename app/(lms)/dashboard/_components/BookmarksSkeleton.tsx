"use client";

export default function BookmarksSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-teal-500/20" />
            <div className="h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-5 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-1/2 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
          <div className="h-4 w-24 animate-pulse rounded-md bg-teal-600/30 dark:bg-teal-500/20 pt-1" />
        </div>
      ))}
    </div>
  );
}
