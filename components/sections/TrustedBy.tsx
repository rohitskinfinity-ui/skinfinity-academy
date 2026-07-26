"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Globe2,
  HeartPulse,
  Hospital,
  Medal,
  Shield,
} from "lucide-react";

const partners = [
  { icon: Shield, name: "IEB" },
  { icon: Medal, name: "DMHCA" },
  { icon: Hospital, name: "Apollo Hospitals" },
  { icon: HeartPulse, name: "Medanta" },
  { icon: Building2, name: "International Education Board" },
  { icon: Globe2, name: "New Delhi Medical Healthcare" },
  { icon: Shield, name: "IEB Affiliated" },
  { icon: Medal, name: "DMHCA Partner" },
];

export default function TrustedBy() {
  const loop = [...partners, ...partners];

  return (
    <section
      className="relative overflow-hidden border-y border-slate-100 bg-white py-7 sm:py-8"
      aria-label="Trusted institutions"
    >
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Trusted by leading medical institutions
      </p>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

        <motion.div
          className="flex w-max gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {loop.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={`${p.name}-${i}`}
                className="flex shrink-0 items-center gap-3 px-2"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-100">
                  <Icon className="size-5" aria-hidden />
                </div>
                <span className="whitespace-nowrap text-sm font-semibold text-slate-500">
                  {p.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
