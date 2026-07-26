import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Accordion, { type AccordionItem } from "@/components/shared/Accordion";

const modules: AccordionItem[] = [
  {
    title: "Facial Anatomy & Injectables (Botox & Fillers)",
    meta: "8 lessons · 6 hrs · Hands-on lab",
    badge: "01",
    tag: "Module 1",
    content: (
      <ul className="space-y-2">
        {[
          "Facial muscle mapping, danger zones & vascular anatomy",
          "Botulinum toxin: units, dilution, reconstitution & injection planes",
          "Dermal filler rheology and product selection by indication",
          "Live demonstration: upper face toxin + midface volumisation",
          "Cannula vs. needle technique and patient consent workflow",
        ].map((point) => (
          <li key={point} className="flex gap-2.5">
            <MaterialIcon
              name="check_circle"
              size={16}
              className="mt-0.5 shrink-0 text-teal-500"
            />
            {point}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Laser Physics, EBDs & Energy Devices",
    meta: "7 lessons · 5 hrs · Device workshop",
    badge: "02",
    tag: "Module 2",
    content: (
      <ul className="space-y-2">
        {[
          "Laser–tissue interaction, chromophores & selective photothermolysis",
          "Q-switched, picosecond, CO₂ fractional and Er:YAG platforms",
          "RF microneedling, HIFU and IPL parameter selection",
          "Fitzpatrick-based settings for Indian and Asian skin types",
          "Device safety, eyewear protocols and endpoint recognition",
        ].map((point) => (
          <li key={point} className="flex gap-2.5">
            <MaterialIcon
              name="check_circle"
              size={16}
              className="mt-0.5 shrink-0 text-teal-500"
            />
            {point}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Chemical Peels & Medical Microneedling",
    meta: "6 lessons · 4 hrs · Clinical practicum",
    badge: "03",
    tag: "Module 3",
    content: (
      <ul className="space-y-2">
        {[
          "Superficial, medium and deep peel agents with priming protocols",
          "Peel selection for melasma, acne, PIH and photoageing",
          "Microneedling depth charts and combination with PRP",
          "Neutralisation, frosting endpoints and post-peel care",
          "Managing downtime expectations and patient counselling",
        ].map((point) => (
          <li key={point} className="flex gap-2.5">
            <MaterialIcon
              name="check_circle"
              size={16}
              className="mt-0.5 shrink-0 text-teal-500"
            />
            {point}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Trichology, Scalp PRP & Hair Restoration",
    meta: "6 lessons · 4 hrs · Live patient cases",
    badge: "04",
    tag: "Module 4",
    content: (
      <ul className="space-y-2">
        {[
          "Hair cycle biology, trichoscopy and pull-test diagnostics",
          "Androgenetic alopecia grading and medical management",
          "PRP preparation, spin protocols and injection technique",
          "GFC, mesotherapy cocktails and low-level laser therapy",
          "Introduction to FUE/FUT referral pathways",
        ].map((point) => (
          <li key={point} className="flex gap-2.5">
            <MaterialIcon
              name="check_circle"
              size={16}
              className="mt-0.5 shrink-0 text-teal-500"
            />
            {point}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Complication Management & Vascular Safety",
    meta: "5 lessons · 4 hrs · Simulation drills",
    badge: "05",
    tag: "Module 5",
    content: (
      <ul className="space-y-2">
        {[
          "Early recognition of vascular occlusion and impending necrosis",
          "Hyaluronidase protocols and emergency kit essentials",
          "Managing nodules, biofilm, granulomas and Tyndall effect",
          "Anaphylaxis, syncope and post-laser burn management",
          "Documentation, escalation and medico-legal reporting",
        ].map((point) => (
          <li key={point} className="flex gap-2.5">
            <MaterialIcon
              name="check_circle"
              size={16}
              className="mt-0.5 shrink-0 text-teal-500"
            />
            {point}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Clinical Practice Setup & Medico-Legal Protocols",
    meta: "5 lessons · 3 hrs · Business toolkit",
    badge: "06",
    tag: "Module 6",
    content: (
      <ul className="space-y-2">
        {[
          "Clinic layout, equipment procurement and capital planning",
          "Pricing strategy, package design and treatment costing",
          "Consent forms, clinical records and insurance requirements",
          "Ethical marketing under NMC and advertising guidelines",
          "Patient retention, follow-up systems and referral growth",
        ].map((point) => (
          <li key={point} className="flex gap-2.5">
            <MaterialIcon
              name="check_circle"
              size={16}
              className="mt-0.5 shrink-0 text-teal-500"
            />
            {point}
          </li>
        ))}
      </ul>
    ),
  },
];

const courseFaqs: AccordionItem[] = [
  {
    title: "Who is eligible for this fellowship?",
    content:
      "The fellowship is open to MBBS, MD, BDS and equivalent registered medical practitioners. A valid medical council registration number is required at the time of enrolment. Prior aesthetic experience is helpful but not mandatory — the curriculum starts from core anatomy fundamentals.",
  },
  {
    title: "How is the hands-on training conducted?",
    content:
      "Clinical sessions run at our partner clinics in small batches, so every participant injects and operates devices under direct faculty supervision. You will work on live patients across toxin, filler, peel, laser and PRP cases, with a documented log of procedures performed.",
  },
  {
    title: "What is the class schedule and time commitment?",
    content:
      "The programme runs over 6 months. Theory modules are self-paced online with weekly live mentorship calls, and hands-on modules are scheduled as monthly weekend contact sessions. Expect roughly 6–8 hours of study per week alongside your practice.",
  },
  {
    title: "Is the certificate recognised and verifiable?",
    content:
      "Yes. On successful completion and assessment you receive a Skinfinity Board Certified fellowship certificate with a unique QR verification code that employers and institutions can validate online. Our programmes are affiliated with International Education Board (IEB) and DMHCA (Unit of New Delhi Medical Healthcare Pvt. Ltd.).",
  },
  {
    title: "Can I pay the fee in instalments?",
    content:
      "Yes. The ₹1,20,000 fee can be split into EMIs starting from ₹10,000 per month through our finance partners. No-cost EMI is available on select tenures — our counsellors can walk you through the options before you enrol.",
  },
  {
    title: "What support do I get after the programme ends?",
    content:
      "You retain lifetime access to recorded lectures, protocols and resource downloads in the LMS. Alumni also join our private case-discussion community and receive continued mentorship support plus placement and practice-setup assistance.",
  },
];

export default function CourseDetailPage() {
  return (
    <div>
      <PageHeader
        title="Fellowship in Aesthetic"
        highlight="Dermatology"
        subtitle="Comprehensive 6-month fellowship covering advanced aesthetic procedures, injectables, lasers, and clinical practice."
        breadcrumb="Course Details"
      />

      <section className="bg-white py-12">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-10 lg:col-span-2">
              {/* Overview */}
              <div>
                <h2
                  className="mb-4 text-2xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Program Overview
                </h2>
                <p className="leading-relaxed text-slate-600">
                  Our flagship Fellowship in Aesthetic Dermatology is designed
                  for qualified medical practitioners seeking to master advanced
                  non-surgical aesthetic procedures. Through intensive hands-on
                  clinical training, live patient demonstrations, and 1:1 doctor
                  mentorship, you will gain the expertise and confidence needed
                  to build a successful aesthetic practice.
                </p>
              </div>

              {/* Curriculum */}
              <div>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                  <h3
                    className="text-xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    Curriculum Modules
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    6 modules · 37 lessons · 26 hrs of training
                  </p>
                </div>
                <Accordion items={modules} allowMultiple />
              </div>

              {/* FAQ */}
              <div>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                  <h3
                    className="text-xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    Frequently Asked Questions
                  </h3>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-teal-600 transition-colors hover:text-teal-700"
                  >
                    Still have a question?
                  </Link>
                </div>
                <Accordion items={courseFaqs} defaultOpen={null} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <div className="sticky top-24 rounded-3xl border-2 border-teal-100 bg-white p-6 shadow-card">
                <div className="mb-6 text-center">
                  <p className="mb-1 text-xs text-slate-400">Course Fee</p>
                  <p
                    className="text-4xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    ₹1,20,000
                  </p>
                  <p className="mt-1 text-xs font-bold text-teal-600">
                    EMI options from ₹10,000/month
                  </p>
                </div>

                <Link
                  href="/enroll?program=Fellowship%20in%20Aesthetic%20Dermatology"
                  className="btn-primary mb-3 w-full cursor-pointer justify-center"
                >
                  Enroll Now
                </Link>
                <Link
                  href="/enroll?program=Fellowship%20in%20Aesthetic%20Dermatology"
                  className="btn-secondary w-full cursor-pointer justify-center"
                >
                  Download Brochure &amp; Syllabus
                </Link>

                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  {[
                    { icon: "schedule", label: "Duration", value: "6 Months" },
                    {
                      icon: "desktop_windows",
                      label: "Mode",
                      value: "Hands-On Hybrid",
                    },
                    {
                      icon: "workspace_premium",
                      label: "Certificate",
                      value: "Skinfinity Board Certified",
                    },
                    {
                      icon: "person",
                      label: "Faculty Lead",
                      value: "Dr. Aisha Sharma (MD)",
                    },
                    { icon: "star", label: "Rating", value: "4.9 / 5.0" },
                    { icon: "group", label: "Alumni Doctors", value: "3,200+" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-2 text-slate-500">
                        <MaterialIcon
                          name={item.icon}
                          size={16}
                          className="text-teal-500"
                        />
                        {item.label}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
