"use client";

export default function CoursePlayerSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Header Skeleton */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-24 animate-pulse rounded-xl bg-slate-900 border border-slate-800" />
            <div className="hidden sm:block h-4 w-px bg-slate-800" />
            <div className="space-y-1.5 min-w-0">
              <div className="h-4 w-48 animate-pulse rounded-md bg-slate-800" />
              <div className="h-3 w-32 animate-pulse rounded-md bg-slate-800/60" />
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-8 w-24 animate-pulse rounded-xl bg-slate-900 border border-slate-800" />
            <div className="hidden md:block h-3 w-28 animate-pulse rounded-md bg-slate-800" />
          </div>
        </div>
      </header>

      {/* Main Workspace Skeleton */}
      <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Left Player Column Skeleton */}
          <div className="flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900 shadow-2xl overflow-hidden">
            <div className="aspect-video w-full animate-pulse bg-slate-950 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
            </div>
            <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-900">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-20 animate-pulse rounded-full bg-teal-500/20" />
                  <div className="h-6 w-64 animate-pulse rounded-xl bg-slate-800" />
                  <div className="h-3 w-40 animate-pulse rounded-md bg-slate-800/60" />
                </div>
                <div className="flex gap-2">
                  <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-800" />
                  <div className="h-9 w-28 animate-pulse rounded-xl bg-teal-600/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Curriculum Column Skeleton */}
          <aside className="rounded-2xl border border-slate-800/80 bg-slate-900 p-5 space-y-4">
            <div className="space-y-1.5 pb-3 border-b border-slate-800">
              <div className="h-4 w-36 animate-pulse rounded-md bg-slate-800" />
              <div className="h-3 w-24 animate-pulse rounded-md bg-slate-800/60" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 w-full animate-pulse rounded-xl bg-slate-800/40 border border-slate-800" />
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
