"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import { cn } from "@/lib/utils";

type Pillar = {
  icon: string;
  title: string;
  desc: string;
};

/** Positions around the circle: top, right, bottom, left */
const ORBIT = [
  { left: "50%", top: "6%" },
  { left: "94%", top: "50%" },
  { left: "50%", top: "94%" },
  { left: "6%", top: "50%" },
];

export default function PillarsCircle({ pillars }: { pillars: Pillar[] }) {
  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Desktop / tablet circular composition */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[400px] sm:block">
        {/* Outer rings */}
        <div
          className="absolute inset-[8%] rounded-full border border-slate-200"
          aria-hidden
        />
        <div
          className="absolute inset-[16%] rounded-full border border-dashed border-teal-200/80"
          aria-hidden
        />
        <div
          className="absolute inset-[24%] rounded-full border border-slate-100"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-[30%] rounded-full bg-teal-500/5"
          aria-hidden
        />

        {/* Center hub */}
        <div className="absolute inset-[34%] z-10 flex flex-col items-center justify-center rounded-full border border-teal-100 bg-white text-center shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-teal-600">
            Core
          </p>
          <p
            className="mt-0.5 text-lg font-bold text-slate-900"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            4 Pillars
          </p>
          <p className="mt-0.5 max-w-[6.5rem] text-[10px] leading-snug text-slate-400">
            Why doctors trust us
          </p>
        </div>

        {/* Orbiting pillar nodes — all four visible */}
        {pillars.map((p, i) => {
          const pos = ORBIT[i];
          return (
            <div
              key={p.title}
              className="absolute z-20 w-[34%] max-w-[132px] -translate-x-1/2 -translate-y-1/2"
              style={{ left: pos.left, top: pos.top }}
            >
              <article
                className={cn(
                  "group rounded-2xl border border-slate-200/80 bg-white p-2.5 text-center shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition-all duration-300",
                  "hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_12px_28px_rgba(15,118,110,0.12)]"
                )}
              >
                <div className="mx-auto mb-1.5 flex size-8 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                  <MaterialIcon name={p.icon} size={16} />
                </div>
                <h3
                  className="mb-0.5 text-[11px] font-bold leading-snug text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="line-clamp-2 text-[9px] leading-relaxed text-slate-500">
                  {p.desc}
                </p>
              </article>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {pillars.map((p) => (
          <article
            key={p.title}
            className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-[0_4px_16px_rgba(15,23,42,0.04)]"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <MaterialIcon name={p.icon} size={18} />
            </div>
            <div className="min-w-0">
              <h3
                className="mb-0.5 text-sm font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {p.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-500">{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
