"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export default function CTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-white">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-800 via-teal-700 to-violet-900 px-6 py-10 text-center sm:px-12 sm:py-14">
          <div className="absolute inset-0 pattern-grid opacity-20" aria-hidden />
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-teal-400/25 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-violet-400/20 blur-[100px]" />

          {/* Floating shapes */}
          {!reduceMotion && (
            <>
              <motion.div
                className="absolute left-8 top-8 hidden size-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl sm:flex"
                animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              >
                <Sparkles className="size-6 text-white/80" />
              </motion.div>
              <motion.div
                className="absolute bottom-8 right-8 hidden size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl sm:flex"
                animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
                transition={{
                  duration: 5.5,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden
              >
                <MessageCircle className="size-5 text-white/80" />
              </motion.div>
              <motion.div
                className="absolute right-16 top-16 hidden size-8 rounded-full bg-cyan-300/30 blur-sm sm:block"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
                aria-hidden
              />
            </>
          )}

          <div className="relative mx-auto max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-teal-50 backdrop-blur-xl">
              <Sparkles className="size-3.5" aria-hidden />
              Limited seats available
            </div>

            <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to become a certified{" "}
              <span className="bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">
                dermatology professional?
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-teal-100 sm:text-lg">
              Join 12,000+ doctors who advanced their careers with Skinfinity
              Academy. Your journey to clinical excellence starts here.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/enroll"
                className="btn-ripple group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-teal-800 transition-all hover:scale-[1.03] hover:bg-teal-50 hover:shadow-2xl"
              >
                Enroll Now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-xl transition-all hover:scale-[1.03] hover:bg-white/20"
              >
                <MessageCircle className="size-4" aria-hidden />
                Talk to Counselor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
