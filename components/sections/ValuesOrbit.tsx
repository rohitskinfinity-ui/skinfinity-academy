"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import FadeIn from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

type ValueItem = {
  icon: string;
  title: string;
  desc: string;
};

const AUTO_MS = 3200;

function orbitPosition(index: number, active: number, total: number) {
  const step = 360 / total;
  const angle = (index - active) * step - 90;
  const rad = (angle * Math.PI) / 180;
  const radius = 42;
  return {
    left: `${50 + radius * Math.cos(rad)}%`,
    top: `${50 + radius * Math.sin(rad)}%`,
  };
}

export default function ValuesOrbit({ values }: { values: ValueItem[] }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);

  const isPlaying = !paused && !hovering && !reduceMotion;
  const current = values[active];

  useEffect(() => {
    if (!isPlaying || values.length === 0) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % values.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [isPlaying, values.length]);

  return (
    <div
      className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12"
      aria-roledescription="carousel"
      aria-label="Academy values"
    >
      {/* Circular orbit */}
      <FadeIn className="relative mx-auto aspect-square w-full max-w-[400px] sm:max-w-[440px]">
        <div
          className="absolute inset-0"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div
            className="absolute inset-[8%] rounded-full border border-slate-200/80"
            aria-hidden
          />
          <div
            className="absolute inset-[18%] rounded-full border border-dashed border-teal-200/70"
            aria-hidden
          />
          <div
            className="absolute inset-[28%] rounded-full border border-slate-100"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[30%] rounded-full bg-teal-500/10 blur-2xl"
            aria-hidden
          />

          {values.map((v, i) => {
            const pos = orbitPosition(i, active, values.length);
            const isActive = active === i;

            return (
              <motion.button
                key={v.title}
                type="button"
                aria-label={v.title}
                aria-pressed={isActive}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                animate={{ left: pos.left, top: pos.top }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 70, damping: 18 }
                }
                className={cn(
                  "absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border sm:size-12",
                  isActive
                    ? "z-20 border-teal-600 bg-teal-700 text-white shadow-[0_12px_28px_rgba(15,118,110,0.35)]"
                    : "z-10 border-slate-200 bg-white text-teal-700 shadow-[0_6px_18px_rgba(15,23,42,0.08)] hover:border-teal-300"
                )}
                style={{ left: pos.left, top: pos.top }}
              >
                <MaterialIcon name={v.icon} size={18} />
              </motion.button>
            );
          })}

          <div className="absolute inset-[32%] flex flex-col items-center justify-center rounded-full border border-teal-100 bg-white text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.28 }}
                className="flex flex-col items-center px-4"
              >
                <span className="mb-2 flex size-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <MaterialIcon name={current.icon} size={20} />
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-600">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(values.length).padStart(2, "0")}
                </p>
                <h3
                  className="mt-1 max-w-[9rem] text-sm font-bold leading-snug text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {current.title}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={isPlaying ? "Pause auto rotate" : "Resume auto rotate"}
            className="absolute bottom-2 right-2 z-30 flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-teal-300 hover:text-teal-700"
          >
            {isPlaying ? (
              <Pause className="size-3.5" aria-hidden />
            ) : (
              <Play className="size-3.5" aria-hidden />
            )}
          </button>
        )}
      </FadeIn>

      {/* Detail panel */}
      <FadeIn delay={0.08} className="flex flex-col justify-center">
        <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 sm:p-9">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-600">
            Value {String(active + 1).padStart(2, "0")}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {current.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-slate-500">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Academy values"
          >
            {values.map((v, i) => (
              <button
                key={v.title}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={v.title}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  active === i
                    ? "w-8 bg-teal-700"
                    : "w-1.5 bg-slate-300 hover:bg-teal-400"
                )}
              />
            ))}
          </div>

          <p className="mt-5 text-xs text-slate-400">
            {isPlaying
              ? "Auto-rotating · hover or click a node to pause"
              : "Paused · click play or a value to continue"}
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
