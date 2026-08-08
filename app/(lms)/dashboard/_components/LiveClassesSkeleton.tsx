"use client";

export default function LiveClassesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="mb-6 space-y-2">
        <div className="h-8 w-44 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-3/4 max-w-xl animate-pulse rounded-lg bg-slate-200/60 dark:bg-slate-800/60" />
      </div>

      {/* Live Now Banner Skeleton */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-6 w-24 animate-pulse rounded-full bg-emerald-500/20" />
            <div className="h-6 w-2/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
          </div>
          <div className="h-11 w-32 shrink-0 animate-pulse rounded-xl bg-teal-600/30 dark:bg-teal-500/20" />
        </div>
      </div>

      {/* Section Heading Shimmer */}
      <div className="space-y-3 pt-2">
        <div className="h-5 w-48 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />

        {/* Upcoming Session Cards Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm space-y-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {/* Date badge skeleton */}
                  <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                  <div className="space-y-2.5 flex-1 min-w-0">
                    {/* Tags skeleton */}
                    <div className="flex gap-2">
                      <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                      <div className="h-5 w-20 animate-pulse rounded-full bg-sky-500/20" />
                    </div>

                    {/* Title skeleton */}
                    <div className="h-5 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                    {/* Instructor & time skeleton */}
                    <div className="flex gap-3">
                      <div className="h-4 w-28 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
                      <div className="h-4 w-20 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
                    </div>
                  </div>
                </div>

                {/* Button skeleton */}
                <div className="shrink-0 sm:w-32">
                  <div className="h-10 w-full animate-pulse rounded-xl bg-teal-600/30 dark:bg-teal-500/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
