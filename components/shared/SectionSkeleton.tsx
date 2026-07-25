import { cn } from "@/lib/utils";

export default function SectionSkeleton({
  className,
  cards = 3,
}: {
  className?: string;
  cards?: number;
}) {
  return (
    <section className={cn("section-padding", className)} aria-hidden>
      <div className="container-max">
        <div className="mx-auto mb-8 max-w-xl space-y-3 text-center">
          <div className="mx-auto h-6 w-28 animate-pulse rounded-full bg-slate-200/80" />
          <div className="mx-auto h-10 w-3/4 animate-pulse rounded-2xl bg-slate-200/80" />
          <div className="mx-auto h-4 w-full animate-pulse rounded-xl bg-slate-100" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[24px] bg-white shadow-soft ring-1 ring-slate-100"
            >
              <div className="aspect-[16/10] animate-pulse bg-slate-200/70" />
              <div className="space-y-3 p-6">
                <div className="h-5 w-4/5 animate-pulse rounded-lg bg-slate-200/80" />
                <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                <div className="mt-4 flex gap-2">
                  <div className="h-10 flex-1 animate-pulse rounded-2xl bg-slate-100" />
                  <div className="h-10 flex-1 animate-pulse rounded-2xl bg-slate-200/70" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
