"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Eye, HeartHandshake, Microscope, Target } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const pillars = [
  {
    icon: Target,
    label: "Mission",
    title: "Clinical excellence for every doctor",
    desc: "Equip physicians with evidence-based aesthetic dermatology skills through rigorous training and lifelong mentorship.",
  },
  {
    icon: Eye,
    label: "Vision",
    title: "The global education benchmark",
    desc: "Become the trusted standard for professional dermatology education — for clinicians, clinics, and patients worldwide.",
  },
];

const principles = [
  {
    icon: Microscope,
    title: "Clinical Rigor",
    desc: "CIBTAC, CIDESCO & international protocols",
  },
  {
    icon: HeartHandshake,
    title: "Doctor-First Support",
    desc: "Live-patient practice & lifetime LMS access",
  },
];

const facts = [
  { value: "2017", label: "Founded" },
  { value: "12k+", label: "Doctors trained" },
  { value: "24+", label: "Countries" },
  { value: "80+", label: "Faculty" },
];

export default function AboutAcademy() {
  return (
    <section
      id="about-academy"
      className="relative overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
      aria-labelledby="about-academy-heading"
    >
      <div className="container-max">
        {/* Header — left aligned, no gradient text */}
        <FadeIn className="mb-8 max-w-3xl sm:mb-10">
          <span className="section-tag mb-3 inline-flex">About Us</span>
          <h2
            id="about-academy-heading"
            className="section-title mb-3 text-left"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            The story behind{" "}
            <span className="text-teal-700">Skinfinity Academy</span>
          </h2>
          <p className="section-subtitle mx-0 max-w-2xl text-left">
            An international dermatology academy built for doctors who demand
            clinical excellence, ethical practice, and globally recognized
            credentials.
          </p>
        </FadeIn>

        {/* Asymmetric composition */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-5">
          {/* Image column — tall editorial frame */}
          <FadeIn direction="right" className="lg:col-span-5">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-teal-950 sm:aspect-auto sm:min-h-[480px] sm:rounded-[28px] lg:h-full">
              <Image
                src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Clinical training at Skinfinity Academy of Cosmetology"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-[center_20%] sm:object-center"
                priority={false}
              />
              {/* Solid teal wash — taller on mobile so caption stays readable */}
              <div
                className="absolute inset-x-0 bottom-0 h-[27%] bg-teal-950/80 sm:h-[24%] sm:bg-teal-950/75"
                aria-hidden
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
                <p className="mb-2 inline-flex rounded-full bg-teal-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white shadow-md sm:mb-2.5 sm:px-3 sm:py-1.5 sm:text-xs sm:tracking-[0.2em]">
                  Est. 2017
                </p>
                <p
                  className="max-w-xs text-base font-bold leading-snug text-white sm:text-xl"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Premium dermatology education for medical professionals
                </p>
                <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-white/85 sm:mt-2 sm:text-sm">
                  From fellowships to workshops — science-led, hands-on, and
                  globally accredited.
                </p>
              </figcaption>
            </figure>
          </FadeIn>

          {/* Content column */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            <FadeIn delay={0.06}>
              <div className="rounded-[28px] border border-slate-200/80 bg-[#f8fafc] p-6 sm:p-8">
                <h3
                  className="mb-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Where clinical science meets aesthetic mastery
                </h3>
                <div className="space-y-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                  <p>
                    Skinfinity Academy of Cosmetology is a premier institution
                    dedicated to advancing dermatology and aesthetic medicine
                    education for licensed doctors, dermatologists, and
                    healthcare professionals.
                  </p>
                  <p>
                    Founded in 2017, we combine international curriculum
                    standards with live-patient clinical training, expert faculty
                    mentorship, and a modern LMS — so every graduate practices
                    with confidence, safety, and measurable career growth.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Mission / Vision — two distinct panels */}
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.label}>
                    <article className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-5 text-slate-900 sm:p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-600">
                          {item.label}
                        </span>
                      </div>
                      <h4
                        className="mb-2 text-lg font-bold leading-snug"
                        style={{
                          fontFamily: "var(--font-heading), sans-serif",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-500">
                        {item.desc}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>

            {/* Principles row */}
            <FadeIn delay={0.12}>
              <div className="grid gap-3 sm:grid-cols-2">
                {principles.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900">
                          {item.title}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.14} className="mt-1">
              <Link
                href="/about"
                className="btn-primary group"
                aria-label="Learn more about Skinfinity Academy"
              >
                Learn more about us
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* Facts strip */}
        {/* <FadeIn delay={0.1} className="mt-8 sm:mt-10">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-slate-200 bg-slate-200 sm:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="bg-white px-5 py-5 text-center sm:py-6"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  {fact.label}
                </dt>
                <dd
                  className="mt-1.5 text-2xl font-bold text-slate-900 sm:text-3xl"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn> */}
      </div>
    </section>
  );
}
