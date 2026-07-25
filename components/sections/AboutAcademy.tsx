"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  HeartHandshake,
  Microscope,
  Target,
} from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
import GradientText from "@/components/shared/GradientText";

const highlights = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "Equip doctors with evidence-based aesthetic dermatology skills through rigorous clinical training and lifelong mentorship.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "Become the global benchmark for professional dermatology education — trusted by clinicians, clinics, and patients worldwide.",
  },
  {
    icon: Microscope,
    title: "Clinical Rigor",
    desc: "Curriculum aligned with CIBTAC, CIDESCO, and international protocols, delivered by board-certified faculty.",
  },
  {
    icon: HeartHandshake,
    title: "Doctor-First Support",
    desc: "Hands-on live-patient practice, lifetime LMS access, and career guidance for every enrolled physician.",
  },
];

export default function AboutAcademy() {
  return (
    <section
      id="about-academy"
      className="relative overflow-hidden bg-[#F8FAFC] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
      aria-labelledby="about-academy-heading"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-teal-200/25 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-200/20 blur-[100px]" />

      <div className="container-max relative">
        <SectionHeader
          tag="About Us"
          title={
            <>
              The story behind{" "}
              <GradientText>Skinfinity Academy</GradientText>
            </>
          }
          subtitle="An international dermatology academy built for doctors who demand clinical excellence, ethical practice, and globally recognized credentials."
        />

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <FadeIn direction="right">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-teal-200/40 via-cyan-100/30 to-violet-200/30 blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] shadow-[0_24px_64px_rgba(15,118,110,0.16)] ring-1 ring-white/60">
                <div className="relative aspect-[4/5] sm:aspect-[5/4]">
                  <Image
                    src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    alt="Clinical training at Skinfinity Academy of Cosmetology"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/55 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/85 p-4 shadow-glass backdrop-blur-xl sm:left-6 sm:right-auto sm:max-w-xs">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-700">
                    Est. 2017
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    Premium dermatology education for medical professionals
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    From fellowships to workshops — science-led, hands-on, and
                    globally accredited.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <h3
                id="about-academy-heading"
                className="mb-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                Where clinical science meets aesthetic mastery
              </h3>
              <p className="mb-4 text-base leading-relaxed text-slate-500">
                Skinfinity Academy of Cosmetology is a premier institution
                dedicated to advancing dermatology and aesthetic medicine
                education for licensed doctors, dermatologists, and healthcare
                professionals.
              </p>
              <p className="mb-8 text-base leading-relaxed text-slate-500">
                Founded in 2017, we combine international curriculum standards
                with live-patient clinical training, expert faculty mentorship,
                and a modern LMS — so every graduate practices with confidence,
                safety, and measurable career growth.
              </p>

              <Stagger className="grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <StaggerItem key={item.title}>
                      <div className="group h-full rounded-[22px] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(15,118,110,0.1)]">
                        <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                          <Icon className="size-5" aria-hidden />
                        </div>
                        <h4 className="mb-1.5 text-sm font-bold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-500">
                          {item.desc}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>

              <Link
                href="/about"
                className="btn-primary group mt-8"
                aria-label="Learn more about Skinfinity Academy"
              >
                Learn more about us
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
