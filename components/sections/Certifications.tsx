"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
  Award,
} from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";

const accreditations = [
  {
    id: "iso-9001",
    badge: "ISO 9001:2015",
    category: "Quality Management Standard",
    title: "ISO 9001 Quality System",
    subtitle: "Universal Registrars (UICL) Verified",
    authority: "UICL — Quality Management Systems",
    scope: "Cosmetology & Aesthetic Medicine Education & Training",
    rating: "ISO 9001:2015 Certified",
    ratingBadge: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    ratingIconColor: "text-emerald-600",
    logo: "/iso-9001-quality-management-systems.png",
    pillars: [
      {
        title: "Standardized Education Protocols",
        desc: "Rigorous quality benchmarks applied across all clinical and theoretical training modules.",
      },
      {
        title: "Clinical Safety & Hygiene Audits",
        desc: "Monitored safety procedures matching international clinical healthcare standards.",
      },
      {
        title: "Continuous Quality Audits",
        desc: "Independently audited and re-verified regularly for sustained academic excellence.",
      },
    ],
    stats: [
      { label: "Compliance Rate", value: "100%" },
      { label: "Standard Code", value: "ISO 9001" },
      { label: "Audit Body", value: "UICL" },
    ],
  },
  {
    id: "ieb-uk",
    badge: "IEB Accredited (UK)",
    category: "Department of Aesthetic Medicine & Surgery",
    title: "International Education Board",
    subtitle: "United Kingdom — Regd. No. 12209687",
    authority: "IEB UK Board of Certification",
    scope: "Clinical Cosmetology & Aesthetic Medicine Programs",
    rating: "Grade A — Full Accreditation",
    ratingBadge: "bg-amber-50 text-amber-800 border-amber-200/80",
    ratingIconColor: "text-amber-600",
    logo: "/ieb-logo.avif",
    pillars: [
      {
        title: "UK Recognized Standards",
        desc: "Curriculum strictly aligned with international aesthetic medicine board requirements.",
      },
      {
        title: "Grade A Institutional Rating",
        desc: "Awarded the highest accreditation tier for institutional quality and faculty excellence.",
      },
      {
        title: "Global Graduate Recognition",
        desc: "Recognized certification valid for practice and advancement across international markets.",
      },
    ],
    stats: [
      { label: "Accreditation Tier", value: "Grade A" },
      { label: "Registration No.", value: "12209687" },
      { label: "Global Validity", value: "Verified" },
    ],
  },
];

export default function Certifications() {
  const [activeTab, setActiveTab] = useState<string>("iso-9001");
  const selected =
    accreditations.find((a) => a.id === activeTab) || accreditations[0];

  return (
    <section className="section-padding relative overflow-hidden bg-[#F8FAFC]">
      <div className="absolute inset-0 pattern-dots opacity-30" aria-hidden />

      <div className="container-max relative">
        <SectionHeader
          tag="Accreditation & Quality"
          title={
            <>
              ISO certified &{" "}
              <span className="text-teal-700">internationally accredited</span>
            </>
          }
          subtitle="Skinfinity Academy operates under audited ISO quality benchmarks and UK-accredited medical aesthetic boards to deliver world-class clinical training."
        />

        {/* Light Mode Tab Switcher */}
        <div className="mx-auto mb-10 flex max-w-md justify-center rounded-2xl border border-slate-200 bg-slate-200/60 p-1.5 backdrop-blur-md">
          {accreditations.map((acc) => (
            <button
              key={acc.id}
              onClick={() => setActiveTab(acc.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all duration-200 sm:text-sm ${
                activeTab === acc.id
                  ? "bg-white text-teal-800 shadow-md shadow-slate-200/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <BadgeCheck className="size-4 text-teal-600" />
              <span>{acc.badge}</span>
            </button>
          ))}
        </div>

        {/* Accreditation Display (Light Theme) */}
        <FadeIn key={selected.id} delay={0.05}>
          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            {/* Left Card: Key Credentials */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-[0_10px_35px_rgba(15,23,42,0.05)] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
                <Award className="size-48 text-teal-900" />
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    VERIFIED STANDARDS
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    {selected.category}
                  </span>
                </div>

                {/* Logo / Emblem + Title */}
                <div className="my-6 flex items-center gap-4">
                  <div className="flex size-18 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
                    {selected.logo ? (
                      <Image
                        src={selected.logo}
                        alt={selected.title}
                        width={52}
                        height={52}
                        className="size-13 object-contain"
                      />
                    ) : (
                      <div className="flex size-12 items-center justify-center rounded-xl bg-teal-700 text-white shadow">
                        <ShieldCheck className="size-7" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight sm:text-2xl">
                      {selected.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-teal-700">
                      {selected.subtitle}
                    </p>
                  </div>
                </div>

                {/* Rating Badge */}
                <div
                  className={`mt-3 inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-bold ${selected.ratingBadge}`}
                >
                  <Sparkles className={`size-3.5 ${selected.ratingIconColor}`} />
                  <span>{selected.rating}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6">
                {selected.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-slate-50 p-3 text-center border border-slate-100"
                  >
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-slate-800">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Assurance Pillars */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <BadgeCheck className="size-5 text-teal-600" />
                  Key Quality Assurance Pillars
                </h4>
                <p className="text-xs text-slate-500 mb-6">
                  Scope: <span className="text-slate-700 font-medium">{selected.scope}</span>
                </p>

                <div className="space-y-3.5">
                  {selected.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/30"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-100/70 text-teal-700 border border-teal-200/60">
                        <CheckCircle2 className="size-4" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">
                          {pillar.title}
                        </h5>
                        <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-teal-200/60 bg-teal-50/60 p-4">
                <Globe2 className="size-5 text-teal-700 shrink-0" />
                <p className="text-xs text-teal-900 font-medium leading-relaxed">
                  Skinfinity Academy graduates receive recognized diplomas backed by these verified international quality standards.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Quick Selectors */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {accreditations.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-200 flex items-center justify-between ${
                activeTab === item.id
                  ? "border-teal-500 bg-teal-50/40 shadow-sm ring-1 ring-teal-500/20"
                  : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 object-contain"
                    />
                  ) : (
                    <ShieldCheck className="size-5 text-teal-700" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                    {item.badge}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 sm:text-sm">{item.title}</h5>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                  activeTab === item.id
                    ? "bg-teal-700 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {activeTab === item.id ? "Selected" : "View"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



