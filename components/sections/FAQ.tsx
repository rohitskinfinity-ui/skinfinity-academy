"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  CircleHelp,
  CreditCard,
  GraduationCap,
  Handshake,
  Laptop,
  Minus,
  Plus,
  RefreshCw,
  Video,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
import GradientText from "@/components/shared/GradientText";
import { cn } from "@/lib/utils";

const faqs = [
  {
    icon: GraduationCap,
    q: "Who is eligible to enroll in the courses?",
    a: "Our courses are designed for licensed medical professionals including MBBS doctors, dermatologists, aesthetic physicians, and healthcare professionals. Some advanced programs require prior dermatology experience. Check individual course pages for specific eligibility criteria.",
  },
  {
    icon: BadgeCheck,
    q: "Are the certificates internationally recognized?",
    a: "Yes. Our programs are accredited by CIBTAC, CIDESCO, and aligned with AAD guidelines. Certificates include a QR verification code and can be verified online by employers and institutions worldwide.",
  },
  {
    icon: Laptop,
    q: "Do I get hands-on training or is it all online?",
    a: "We offer hybrid programs that combine online theoretical learning with in-person clinical hands-on training. Workshop courses are conducted at our partner clinics and hospitals under expert supervision.",
  },
  {
    icon: RefreshCw,
    q: "How long do I have access to the course materials?",
    a: "You get lifetime access to all course materials, recorded lectures, and resources through our LMS portal. There is no expiry date — revisit content anytime, even after course completion.",
  },
  {
    icon: Handshake,
    q: "What is the refund policy?",
    a: "We offer a 7-day money-back guarantee on all online courses. For fellowship and workshop programs, refunds are available up to 15 days before the start date. See our refund policy page for detailed terms.",
  },
  {
    icon: CreditCard,
    q: "Can I pay in installments?",
    a: "Yes, we offer flexible EMI options through our payment partners. You can choose 3, 6, or 12-month installment plans during checkout. No-cost EMI is available on select programs.",
  },
  {
    icon: CircleHelp,
    q: "Do you provide placement assistance?",
    a: "Yes, we provide career support including placement assistance, resume building, interview preparation, and access to our job board. Our hiring partners include leading clinics, hospitals, and aesthetic chains.",
  },
  {
    icon: Video,
    q: "How are live classes conducted?",
    a: "Live classes are conducted via our integrated LMS platform or Zoom. You can interact with faculty in real-time, ask questions, and participate in discussions. All sessions are recorded for later review.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-[#F8FAFC]" aria-labelledby="faq-heading">
      <div className="container-max">
        <SectionHeader
          tag="FAQ"
          title={
            <>
              Questions? <GradientText>We have answers</GradientText>
            </>
          }
          subtitle="Everything you need to know about our programs, enrollment, and certifications."
        />

        <Stagger className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const Icon = faq.icon;
            const isOpen = open === i;
            return (
              <StaggerItem key={faq.q}>
                <div
                  className={cn(
                    "overflow-hidden rounded-[24px] border bg-white transition-all duration-300",
                    isOpen
                      ? "border-teal-200 shadow-[0_8px_32px_rgba(15,118,110,0.1)]"
                      : "border-slate-100 hover:border-slate-200"
                  )}
                >
                  <button
                    type="button"
                    id={`faq-button-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                          isOpen
                            ? "bg-teal-700 text-white"
                            : "bg-teal-50 text-teal-700"
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <h3
                        id={i === 0 ? "faq-heading" : undefined}
                        className="text-sm font-semibold text-slate-900 sm:text-base"
                      >
                        {faq.q}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full transition-all",
                        isOpen ? "rotate-180 bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {isOpen ? (
                        <Minus className="size-4" aria-hidden />
                      ) : (
                        <Plus className="size-4" aria-hidden />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 pl-[4.5rem] text-sm leading-relaxed text-slate-500">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
