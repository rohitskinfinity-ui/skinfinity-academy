"use client";

import {
  ClipboardCheck,
  FileText,
  KeyRound,
  Medal,
  UserPlus,
  Video,
} from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: UserPlus,
    title: "Enroll",
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
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="container-max">
        <FadeIn className="mb-8 text-center sm:mb-10">
          <span className="section-tag mb-2 inline-flex">Learning Journey</span>
          <h2
            className="section-title mt-2 mb-2"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Your path to{" "}
            <span className="text-teal-700">certification</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A structured six-step journey from enrollment to certification.
          </p>
        </FadeIn>

        {/* Mobile / tablet: vertical zigzag · Desktop: horizontal */}
        <div className="relative">
          {/* Vertical spine — mobile only */}
          <div
            className="pointer-events-none absolute bottom-4 left-1/2 top-4 w-0.5 -translate-x-1/2 bg-teal-600/20 lg:hidden"
            aria-hidden
          />

          <Stagger className="flex flex-col gap-6 lg:grid lg:grid-cols-6 lg:gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              const isLeft = i % 2 === 0;
              const num = String(i + 1).padStart(2, "0");

              return (
                <StaggerItem
                  key={step.title}
                  className={cn(
                    "relative w-full lg:w-auto",
                    // Zigzag offset on mobile
                    isLeft ? "pr-[12%] pl-0" : "pl-[12%] pr-0",
                    "lg:px-2"
                  )}
                >
                  <li
                    className={cn(
                      "relative flex list-none flex-col lg:h-full lg:items-center",
                      isLeft ? "items-start" : "items-end",
                      "lg:items-center"
                    )}
                  >
                    {/* Horizontal connectors — desktop only */}
                    {i > 0 && (
                      <span
                        className="absolute left-0 top-7 hidden h-0.5 w-1/2 bg-teal-600/25 lg:block"
                        aria-hidden
                      />
                    )}
                    {!isLast && (
                      <span
                        className="absolute right-0 top-7 hidden h-0.5 w-1/2 bg-teal-600/25 lg:block"
                        aria-hidden
                      />
                    )}

                    {/* Node */}
                    <span
                      className={cn(
                        "relative z-10 flex size-12 items-center justify-center rounded-full border-4 border-[#f8fafc] sm:size-14",
                        isLast
                          ? "bg-teal-700 text-white shadow-[0_8px_24px_rgba(15,118,110,0.3)]"
                          : "bg-white text-teal-700 ring-1 ring-teal-200"
                      )}
                      aria-hidden
                    >
                      <Icon className="size-5" />
                    </span>

                    <span className="relative z-10 -mt-1 mb-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1.5 text-[9px] font-extrabold text-white lg:mb-4">
                      {num}
                    </span>

                    <article
                      className={cn(
                        "group w-[88%] rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-teal-200 hover:shadow-[0_14px_36px_rgba(15,118,110,0.1)] sm:p-5",
                        isLeft ? "text-left" : "text-right",
                        "lg:w-full lg:text-center",
                        isLast && "border-teal-200 bg-teal-50/50"
                      )}
                    >
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-600">
                        Step {num}
                      </p>
                      <h3
                        className="mb-1.5 text-base font-bold text-slate-900 sm:text-lg"
                        style={{
                          fontFamily: "var(--font-heading), sans-serif",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-500">
                        {step.desc}
                      </p>
                    </article>
                  </li>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
