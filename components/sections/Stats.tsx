"use client";

import {
  Award,
  BookOpen,
  Globe2,
  TrendingUp,
  Users,
} from "lucide-react";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
const stats = [
  {
    icon: Users,
    value: 12000,
    suffix: "+",
    label: "Students Trained",
    hint: "Doctors & specialists worldwide",
  },
  {
    icon: BookOpen,
    value: 45,
    suffix: "+",
    label: "Courses & Programs",
    hint: "From fellowships to workshops",
  },
  {
    icon: Award,
    value: 80,
    suffix: "+",
    label: "Expert Faculty",
    hint: "Clinicians & industry leaders",
  },
  {
    icon: Globe2,
    value: 24,
    suffix: "+",
    label: "Countries",
    hint: "Global learner community",
  },
  {
    icon: TrendingUp,
    value: 94,
    suffix: "%",
    label: "Placement Rate",
    hint: "Career outcomes within 6 months",
  },
];

export default function Stats() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[480px] -translate-x-1/2 rounded-full bg-teal-200/30 blur-[100px]" />

      <div className="container-max relative">
        <SectionHeader
          tag="Impact"
          title={
            <>
              Numbers that reflect{" "}
              <span className="text-teal-700">clinical trust</span>
            </>
          }
          subtitle="A growing network of medical professionals advancing aesthetic dermatology with Skinfinity."
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <div className="group relative h-full overflow-hidden rounded-[24px] bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_4px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,118,110,0.12)]">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <p className="text-3xl font-bold tracking-tight text-slate-900">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {stat.hint}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
