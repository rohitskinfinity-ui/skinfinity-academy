"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleHelp,
  Minus,
  Plus,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";
import { fetchSite } from "@/lib/api/public";

type FaqItem = {
  icon: typeof CircleHelp;
  q: string;
  a: string;
};

const FALLBACK: FaqItem[] = [
  {
    icon: CircleHelp,
    q: "Who is eligible to enroll in the courses?",
    a: "Our programmes are open to licensed medical graduates including MBBS, BDS, BAMS, BHMS, and MDS practitioners. Check individual course pages for specific eligibility.",
  },
  {
    icon: CircleHelp,
    q: "Do I get hands-on training or is it all online?",
    a: "Programmes combine live online lectures with intensive hands-on clinical training at Skinfinity Academy under expert faculty supervision.",
  },
  {
    icon: CircleHelp,
    q: "What certificate will I receive?",
    a: "Successful candidates receive a vocational diploma / PG diploma certificate from Skinfinity Academy upon completing assessments and attendance requirements.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FaqItem[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const site = await fetchSite();
        if (cancelled) return;
        const items = (site.faqs ?? []).map((f) => ({
          icon: CircleHelp,
          q: f.question,
          a: f.answer,
        }));
        if (items.length > 0) setFaqs(items);
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="faq" className="section-padding bg-slate-50/80">
      <div className="container-max">
        <SectionHeader
          tag="FAQs"
          title={
            <>
              Answers for{" "}
              <span className="text-teal-700">curious doctors</span>
            </>
          }
          subtitle="Everything you need to know about admissions, training format, and certification."
        />

        <Stagger className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const Icon = faq.icon;
            const isOpen = open === i;
            return (
              <StaggerItem key={faq.q}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-white transition-shadow",
                    isOpen
                      ? "border-teal-200 shadow-md"
                      : "border-slate-100 shadow-sm",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Icon className="size-4" />
                    </span>
                    <span className="flex-1 text-sm font-bold text-slate-900">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <Minus className="size-4 text-teal-600" />
                    ) : (
                      <Plus className="size-4 text-slate-400" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="border-t border-slate-50 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
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
