"use client";

export default function CourseCardSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3 flex-1">
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-teal-500/20 dark:bg-teal-500/10" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-1/2 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
              </div>
            </div>
            <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-3 w-1/3 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
            <div className="h-2 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
