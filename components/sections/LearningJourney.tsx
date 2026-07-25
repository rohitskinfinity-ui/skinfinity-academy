"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ClipboardCheck,
  FileText,
  KeyRound,
  Medal,
  UserPlus,
  Video,
} from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";
import GradientText from "@/components/shared/GradientText";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    desc: "Create your account and choose your preferred program.",
  },
  {
    icon: KeyRound,
    title: "Get Access",
    desc: "Receive instant access to the LMS portal and course materials.",
  },
  {
    icon: Video,
    title: "Attend Classes",
    desc: "Join live sessions or watch recorded lectures at your pace.",
  },
  {
    icon: FileText,
    title: "Assignments",
    desc: "Complete practical assignments and case studies.",
  },
  {
    icon: ClipboardCheck,
    title: "Assessments",
    desc: "Pass MCQ tests and clinical assessments to validate learning.",
  },
  {
    icon: Medal,
    title: "Certification",
    desc: "Receive your internationally recognized certificate.",
  },
];

export default function LearningJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-teal-50/40 to-[#F8FAFC]">
      <div className="absolute inset-0 pattern-dots opacity-30" aria-hidden />

      <div className="container-max relative">
        <SectionHeader
          tag="Learning Journey"
          title={
            <>
              Your path to <GradientText>certification</GradientText>
            </>
          }
          subtitle="A structured six-step journey from registration to certification."
        />

        <div ref={ref} className="relative">
          {/* Desktop connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-0.5 bg-slate-200 lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-teal-600 via-teal-400 to-violet-500"
              style={{
                scaleX: reduceMotion ? 1 : lineScale,
              }}
            />
          </div>

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title}>
                  <FadeIn delay={i * 0.08} className="relative flex flex-col items-center text-center">
                    <div className="relative mb-4 flex size-24 items-center justify-center rounded-[24px] border border-slate-100 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,118,110,0.14)]">
                      <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white shadow-teal">
                        {i + 1}
                      </span>
                      <Icon className="size-8 text-teal-700" aria-hidden />
                    </div>
                    <h3 className="mb-1.5 text-sm font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {step.desc}
                    </p>
                  </FadeIn>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
