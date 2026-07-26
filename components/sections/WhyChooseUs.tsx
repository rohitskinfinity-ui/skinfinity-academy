"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Briefcase,
  Globe2,
  HandHeart,
  Infinity as InfinityIcon,
  MessagesSquare,
  Pause,
  Play,
  Users,
  Video,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Users,
    title: "Expert Faculty",
    desc: "Learn from renowned dermatologists and aesthetic medicine specialists with decades of clinical experience.",
  },
  {
    icon: Globe2,
    title: "International Curriculum",
    desc: "Curriculum aligned with International Education Board (IEB) and DMHCA (Unit of New Delhi Medical Healthcare Pvt. Ltd.).",
  },
  {
    icon: HandHeart,
    title: "Clinical Hands-on Training",
    desc: "Practice on real patients under expert supervision in our partner clinics and hospitals.",
  },
  {
    icon: Award,
    title: "Certification",
    desc: "Earn internationally recognized certificates upon successful course completion.",
  },
  {
    icon: InfinityIcon,
    title: "Lifetime LMS Access",
    desc: "Access course materials, recordings, and resources forever — no expiry, no limits.",
  },
  {
    icon: Video,
    title: "Recorded Sessions",
    desc: "Never miss a class. All live sessions are recorded and available for review anytime.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    desc: "Get placement assistance, career counseling, and professional network access.",
  },
  {
    icon: MessagesSquare,
    title: "Community Access",
    desc: "Join an exclusive community of 12,000+ dermatology professionals worldwide.",
  },
];

const AUTO_MS = 3200;
const STEP = 360 / features.length;

function orbitPosition(index: number, active: number) {
  // Active node sits at the top (−90°)
  const angle = (index - active) * STEP - 90;
  const rad = (angle * Math.PI) / 180;
  const radius = 42;
  return {
    left: `${50 + radius * Math.cos(rad)}%`,
    top: `${50 + radius * Math.sin(rad)}%`,
  };
}

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);

  const isPlaying = !paused && !hovering && !reduceMotion;

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % features.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  const ActiveIcon = features[active].icon;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8"
      aria-roledescription="carousel"
      aria-label="Skinfinity advantage pillars"
    >
      <div className="container-max">
        <FadeIn className="mb-8 text-center sm:mb-10">
          <span className="section-tag mb-2 inline-flex">Why Choose Us</span>
          <h2
            className="section-title mt-2 mb-2"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            The Skinfinity advantage
          </h2>
          <p className="section-subtitle mx-auto">
            Eight pillars orbiting one goal — clinical excellence for every
            doctor.
          </p>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Circular orbit */}
          <FadeIn className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[480px]">
            <div
              className="absolute inset-0"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {/* Orbit rings */}
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

              {/* Orbiting nodes */}
              {features.map((f, i) => {
                const Icon = f.icon;
                const pos = orbitPosition(i, active);
                const isActive = active === i;

                return (
                  <motion.button
                    key={f.title}
                    type="button"
                    aria-label={f.title}
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
                      "absolute flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border sm:size-14",
                      isActive
                        ? "z-20 border-teal-600 bg-teal-700 text-white shadow-[0_12px_28px_rgba(15,118,110,0.35)]"
                        : "z-10 border-slate-200 bg-white text-teal-700 shadow-[0_6px_18px_rgba(15,23,42,0.08)] hover:border-teal-300 hover:shadow-[0_10px_24px_rgba(15,118,110,0.15)]"
                    )}
                    style={{ left: pos.left, top: pos.top }}
                  >
                    <Icon className="size-5" aria-hidden />
                  </motion.button>
                );
              })}

              {/* Center hub */}
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
                    <span className="mb-2 flex size-10 items-center justify-center rounded-full bg-teal-50 text-teal-700 sm:size-12">
                      <ActiveIcon className="size-5 sm:size-6" aria-hidden />
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-600">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(features.length).padStart(2, "0")}
                    </p>
                    <h3
                      className="mt-1 max-w-[9.5rem] text-sm font-bold leading-snug text-slate-900 sm:max-w-[11rem] sm:text-base"
                      style={{
                        fontFamily: "var(--font-heading), sans-serif",
                      }}
                    >
                      {features[active].title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={
                  isPlaying ? "Pause auto rotate" : "Resume auto rotate"
                }
                className="absolute bottom-2 right-2 z-30 flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-teal-300 hover:text-teal-700 sm:bottom-3 sm:right-3"
              >
                {isPlaying ? (
                  <Pause className="size-3.5" aria-hidden />
                ) : (
                  <Play className="size-3.5" aria-hidden />
                )}
              </button>
            )}
          </FadeIn>

          {/* Active detail panel */}
          <FadeIn delay={0.08} className="flex flex-col justify-center">
            <div className="rounded-[28px] border border-slate-200/80 bg-[#f8fafc] p-7 sm:p-9">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-600">
                Pillar {String(active + 1).padStart(2, "0")}
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
                    {features[active].title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-slate-500">
                    {features[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div
                className="mt-8 flex flex-wrap gap-2"
                role="tablist"
                aria-label="Advantage pillars"
              >
                {features.map((f, i) => (
                  <button
                    key={f.title}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    aria-label={f.title}
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
                  : "Paused · click play or a pillar to continue"}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
