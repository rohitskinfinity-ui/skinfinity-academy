"use client";

import {
  Award,
  Globe2,
  HandHeart,
  Infinity as InfinityIcon,
  MessagesSquare,
  Users,
  Video,
  Briefcase,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
import GradientText from "@/components/shared/GradientText";

const features = [
  {
    icon: Users,
    title: "Expert Faculty",
    desc: "Learn from renowned dermatologists and aesthetic medicine specialists with decades of clinical experience.",
  },
  {
    icon: Globe2,
    title: "International Curriculum",
    desc: "Curriculum aligned with global standards including CIBTAC, CIDESCO, and AAD guidelines.",
  },
  {
    icon: HandHeart,
    title: "Clinical Hands-on Training",
    desc: "Practice on real patients under expert supervision in our partner clinics and hospitals.",
  },
  {
    icon: Award,
    title: "Certification",
    desc: "Earn internationally recognized certificates upon successful course completion.",
  },
  {
    icon: InfinityIcon,
    title: "Lifetime LMS Access",
    desc: "Access course materials, recordings, and resources forever — no expiry, no limits.",
  },
  {
    icon: Video,
    title: "Recorded Sessions",
    desc: "Never miss a class. All live sessions are recorded and available for review anytime.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    desc: "Get placement assistance, career counseling, and professional network access.",
  },
  {
    icon: MessagesSquare,
    title: "Community Access",
    desc: "Join an exclusive community of 12,000+ dermatology professionals worldwide.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 lg:pb-12">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-200/25 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-teal-200/30 blur-[90px]" />

      <div className="container-max relative">
        <SectionHeader
          tag="Why Choose Us"
          title={
            <>
              The Skinfinity <GradientText>advantage</GradientText>
            </>
          }
          subtitle="Eight pillars that make our academy the preferred choice for dermatology education."
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title}>
                <div className="gradient-border group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,118,110,0.12)]">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 text-teal-700 transition-all duration-300 group-hover:from-teal-600 group-hover:to-teal-700 group-hover:text-white group-hover:shadow-teal">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {f.desc}
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
