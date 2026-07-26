"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-[#f8fafc]">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-800/10 bg-slate-900 px-6 py-12 text-center sm:px-12 sm:py-16">
          {/* Soft atmosphere — single hue, no rainbow gradient */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,118,110,0.22),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(15,23,42,0.9),transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-teal-200">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden />
              Limited seats available
            </div>

            <h2
              className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Ready to become a certified dermatology professional?
            </h2>

            <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Join 12,000+ doctors who advanced their careers with Skinfinity
              Academy. Your journey to clinical excellence starts here.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/enroll"
                className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-50"
              >
                Enroll Now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-transparent px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/5"
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
