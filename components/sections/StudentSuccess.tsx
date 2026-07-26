"use client";

import Image from "next/image";
import { Building2, Quote, Star } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";

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
      className="section-padding relative overflow-hidden bg-[#F8FAFC]"
    >
      <div className="container-max relative">
        <SectionHeader
          tag="Testimonials"
          title={
            <>
              Real doctors.{" "}
              <span className="text-teal-700">Real results.</span>
            </>
          }
          subtitle="Hear from healthcare professionals who transformed their careers with Skinfinity Academy."
        />

        <Stagger className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-2 scrollbar-hide sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:px-0 sm:py-0 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem
              key={t.name}
              className="w-[82vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-[0_20px_48px_rgba(15,118,110,0.12)]">
                <div
                  className="mb-3 flex items-center gap-1"
                  aria-label={`${t.rating} out of 5 stars`}
                >
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

        <p className="mt-3 text-center text-xs font-medium text-slate-400 sm:hidden">
          Swipe to read more stories →
        </p>
      </div>
    </section>
  );
}
