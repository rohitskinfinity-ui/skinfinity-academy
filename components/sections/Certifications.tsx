"use client";

import Link from "next/link";
import {
  Award,
  BadgeCheck,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
const certifications = [
  {
    name: "IEB",
    desc: "International Education Board — Affiliated certification authority",
    color: "from-teal-500 to-teal-700",
  },
  {
    name: "DMHCA",
    desc: "Unit of New Delhi Medical Healthcare Pvt. Ltd. — Clinical education partner",
    color: "from-cyan-500 to-cyan-700",
  },
];

export default function Certifications() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#F8FAFC]">
      <div className="absolute inset-0 pattern-dots opacity-30" aria-hidden />

      <div className="container-max relative">
        <SectionHeader
          tag="Certifications"
          title={
            <>
              Globally recognized{" "}
              <span className="text-teal-700">credentials</span>
            </>
          }
          subtitle="Our certificates are affiliated with International Education Board (IEB) and DMHCA, and verifiable online."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn blur>
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-teal-200/30 to-violet-200/20 blur-2xl" />
              <div className="relative rounded-[28px] border-2 border-teal-100 bg-white p-8 shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
                <div className="mb-6 border-b border-slate-100 pb-6 text-center">
                  <div className="mb-3 flex items-center justify-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-white">
                      <Award className="size-6" aria-hidden />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Skinfinity Academy</p>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-600">
                        of Cosmetology
                      </p>
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Certificate of Completion
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    Fellowship in Aesthetic Dermatology
                  </h3>
                </div>

                <div className="mb-6 text-center">
                  <p className="mb-1 text-xs text-slate-400">This certifies that</p>
                  <p className="text-lg font-bold text-slate-900">Dr. Arjun Reddy</p>
                  <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-slate-500">
                    has successfully completed all requirements including clinical
                    assessments, case studies, and examinations. Affiliated with
                    International Education Board (IEB) and DMHCA (Unit of New
                    Delhi Medical Healthcare Pvt. Ltd.).
                  </p>
                </div>

                <div className="flex items-end justify-between border-t border-slate-100 pt-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      Dr. Aisha Sharma
                    </p>
                    <p className="text-[10px] text-slate-400">Program Director</p>
                    <div className="mt-2 h-0.5 w-20 bg-slate-300" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                      <QrCode className="size-10" aria-hidden />
                    </div>
                    <p className="text-[9px] text-slate-400">
                      Verify online
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-700">
                      Aug 15, 2026
                    </p>
                    <p className="text-[10px] text-slate-400">Completion Date</p>
                    <div className="ml-auto mt-2 h-0.5 w-20 bg-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-4">
            <Stagger>
              {certifications.map((c) => (
                <StaggerItem key={c.name} className="mb-4 last:mb-0">
                  <div className="group flex items-center gap-4 rounded-[24px] border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
                    <div
                      className={`flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-white transition-transform group-hover:scale-105`}
                    >
                      <ShieldCheck className="size-6" aria-hidden />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{c.name}</h4>
                        <BadgeCheck className="size-4 text-teal-500" aria-hidden />
                      </div>
                      <p className="text-xs leading-relaxed text-slate-500">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="rounded-[24px] bg-gradient-to-br from-teal-700 to-teal-900 p-5 text-white">
              <div className="mb-2 flex items-center gap-3">
                <QrCode className="size-6" aria-hidden />
                <h4 className="font-bold">Online Verification</h4>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-teal-100">
                Every certificate has a unique QR code and verification ID.
                Employers can verify authenticity instantly.
              </p>
              <Link
                href="/contact"
                className="inline-flex rounded-xl bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                Verify a Certificate →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
