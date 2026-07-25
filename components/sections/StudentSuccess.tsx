"use client";

import Image from "next/image";
import { Building2, Play, Quote, Star } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
import GradientText from "@/components/shared/GradientText";

const testimonials = [
  {
    name: "Dr. Sneha Patel",
    role: "Dermatologist",
    company: "GlowDerm Clinic, Mumbai",
    image:
      "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    quote:
      "The fellowship program transformed my practice. Within 3 months of completing the course, I introduced five new aesthetic procedures to my clinic.",
  },
  {
    name: "Dr. Karthik Nair",
    role: "Aesthetic Physician",
    company: "Emirates Aesthetic, Dubai",
    image:
      "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    quote:
      "The international curriculum and hands-on training gave me the confidence to practice in Dubai. Lifetime LMS access means I can always revisit concepts.",
  },
  {
    name: "Dr. Anjali Reddy",
    role: "Cosmetologist",
    company: "SkinLab Group, Hyderabad",
    image:
      "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    quote:
      "Best investment in my career. Faculty support and community access have been invaluable. I now run a successful chain of skin clinics.",
  },
];

export default function StudentSuccess() {
  return (
    <section
      id="success"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-white"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-teal-200/25 blur-[120px]" />

      <div className="container-max relative">
        <SectionHeader
          tag="Testimonials"
          title={
            <>
              Real doctors. <GradientText>Real results.</GradientText>
            </>
          }
          subtitle="Hear from healthcare professionals who transformed their careers with Skinfinity Academy."
        />

        <Stagger className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/60 bg-white/70 p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(15,118,110,0.12)]">
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/35" />
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label={`Play video testimonial from ${t.name}`}
                  >
                    <span className="flex size-14 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-md ring-1 ring-white/40 transition-transform group-hover:scale-110">
                      <Play className="size-5 fill-current" />
                    </span>
                  </button>
                </div>

                <div className="mb-3 flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <Quote className="mb-2 size-6 text-teal-200" aria-hidden />
                <blockquote className="mb-5 flex-1 text-sm leading-relaxed text-slate-600">
                  “{t.quote}”
                </blockquote>

                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                  <Image
                    src={t.image}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover ring-2 ring-teal-50"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-teal-700">
                      <Building2 className="size-3" aria-hidden />
                      {t.company}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
