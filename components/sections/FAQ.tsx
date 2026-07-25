"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";

const faqs = [
  {
    q: "Who is eligible to enroll in the courses?",
    a: "Our courses are designed for licensed medical professionals including MBBS doctors, dermatologists, aesthetic physicians, and healthcare professionals. Some advanced programs require prior dermatology experience. Check individual course pages for specific eligibility criteria.",
  },
  {
    q: "Are the certificates internationally recognized?",
    a: "Yes. Our programs are accredited by CIBTAC, CIDESCO, and aligned with AAD guidelines. Certificates include a QR verification code and can be verified online by employers and institutions worldwide.",
  },
  {
    q: "Do I get hands-on training or is it all online?",
    a: "We offer hybrid programs that combine online theoretical learning with in-person clinical hands-on training. Workshop courses are conducted at our partner clinics and hospitals under expert supervision.",
  },
  {
    q: "How long do I have access to the course materials?",
    a: "You get lifetime access to all course materials, recorded lectures, and resources through our LMS portal. There is no expiry date — revisit content anytime, even after course completion.",
  },
  {
    q: "What is the refund policy?",
    a: "We offer a 7-day money-back guarantee on all online courses. For fellowship and workshop programs, refunds are available up to 15 days before the start date. See our refund policy page for detailed terms.",
  },
  {
    q: "Can I pay in installments?",
    a: "Yes, we offer flexible EMI options through our payment partners. You can choose 3, 6, or 12-month installment plans during checkout. No-cost EMI is available on select programs.",
  },
  {
    q: "Do you provide placement assistance?",
    a: "Yes, we provide career support including placement assistance, resume building, interview preparation, and access to our job board. Our hiring partners include leading clinics, hospitals, and aesthetic chains.",
  },
  {
    q: "How are live classes conducted?",
    a: "Live classes are conducted via our integrated LMS platform or Zoom. You can interact with faculty in real-time, ask questions, and participate in discussions. All sessions are recorded for later review.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-slate-50/50">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="section-tag mb-4">FAQ</span>
          <h2 className="section-title mb-4 mt-4">
            Questions?{" "}
            <span className="gradient-text">We Have Answers</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know about our programs, enrollment, and certifications.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden animate-on-scroll ${open === i
                  ? "bg-white border-teal-200 shadow-card"
                  : "bg-white border-slate-100 hover:border-slate-200"
                }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex items-center justify-between w-full p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${open === i ? "bg-teal-600" : "bg-teal-50"
                      }`}
                  >
                    <MaterialIcon
                      name="help"
                      size={20}
                      className={open === i ? "text-white" : "text-teal-600"}
                    />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </h3>
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${open === i ? "bg-teal-100 rotate-180" : "bg-slate-100"
                    }`}
                >
                  <MaterialIcon
                    name={open === i ? "remove" : "add"}
                    size={16}
                    className={open === i ? "text-teal-600" : "text-slate-500"}
                  />
                </div>
              </button>
              <div
                className={`grid transition-all duration-300 ${open === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 pl-[4.5rem] text-sm text-slate-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
