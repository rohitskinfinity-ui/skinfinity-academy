"use client";

export default function CertificatesSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4"
        >
          {/* Certificate aspect preview shimmer */}
          <div className="aspect-[4/3] w-full animate-pulse bg-slate-200 dark:bg-slate-800 flex flex-col justify-between p-5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-slate-300 dark:bg-slate-700/80" />
              <div className="space-y-1">
                <div className="h-3 w-24 rounded bg-slate-300 dark:bg-slate-700/80" />
                <div className="h-2 w-16 rounded bg-slate-300/60 dark:bg-slate-700/50" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-28 rounded bg-slate-300/60 dark:bg-slate-700/50" />
              <div className="h-4 w-3/4 rounded bg-slate-300 dark:bg-slate-700/80" />
            </div>
          </div>

          {/* Certificate info footer */}
          <div className="p-4 pt-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 w-20 animate-pulse rounded-full bg-teal-500/20" />
              <div className="h-4 w-24 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />
            </div>
            <div className="h-5 w-4/5 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60" />

            <div className="flex gap-2 pt-1">
              <div className="h-10 flex-1 animate-pulse rounded-xl bg-teal-600/30 dark:bg-teal-500/20" />
              <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
