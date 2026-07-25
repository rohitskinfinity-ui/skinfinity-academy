"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Headphones,
  Lock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import FadeIn from "@/components/motion/FadeIn";
import GradientText from "@/components/shared/GradientText";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-500";

const selectClass = cn(inputClass, "appearance-none cursor-pointer pr-10");

const trustPoints = [
  { icon: ShieldCheck, text: "Reviewed by academic board within 24 hours" },
  { icon: Lock, text: "Secure application — your data stays private" },
  { icon: BadgeCheck, text: "CIBTAC & CIDESCO aligned programs" },
  { icon: Headphones, text: "Free 1:1 counseling available anytime" },
];

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-0", className)}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({
  step,
  icon: Icon,
  title,
}: {
  step: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-3">
      <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 text-sm font-bold text-white shadow-teal">
        {step}
      </div>
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-teal-600" aria-hidden />
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
      </div>
    </div>
  );
}

function EnrollFormContent() {
  const searchParams = useSearchParams();
  const initialProgram =
    searchParams.get("program") ||
    searchParams.get("title") ||
    "Fellowship in Aesthetic Dermatology";

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "MBBS Doctor",
    regNumber: "",
    program: initialProgram,
    campus: "Bengaluru Clinical Campus (MG Road)",
    batch: "August 2025 Upcoming Batch",
    paymentOption: "deposit",
  });

  useEffect(() => {
    if (initialProgram) {
      setFormData((prev) => ({ ...prev, program: initialProgram }));
    }
  }, [initialProgram]);

  const update = (key: keyof typeof formData, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const paymentOptions = [
    {
      id: "deposit",
      title: "Pay Seat Reservation Deposit",
      desc: "Lock your seat today; balance payable at campus onset.",
      badge: "₹5,000",
      badgeTone: "solid" as const,
    },
    {
      id: "full",
      title: "Pay Full Program Fee",
      desc: "Includes instant LMS portal & video vault access.",
      badge: "Full Fee",
      badgeTone: "outline" as const,
    },
    {
      id: "callback",
      title: "Request 1:1 Admissions Counseling",
      desc: "Free call with an academic advisor to discuss curriculum & dates.",
      badge: "FREE",
      badgeTone: "free" as const,
    },
  ];

  if (submitted) {
    return (
      <FadeIn>
        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12">
          <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-cyan-50 text-teal-600 ring-8 ring-teal-50">
            <CheckCircle2 className="size-10" />
          </div>
          <span className="mb-3 inline-flex rounded-full bg-teal-600 px-4 py-1 text-xs font-bold text-white">
            Application submitted successfully
          </span>
          <h3 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Welcome to Skinfinity Academy
          </h3>
          <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-slate-600">
            Thank you,{" "}
            <strong className="text-slate-900">
              {formData.fullName || "Doctor"}
            </strong>
            ! Your reference code is{" "}
            <span className="font-mono font-bold text-teal-700">
              #SA-ENROLL-9041
            </span>{" "}
            for <strong>{formData.program}</strong>.
          </p>

          <div className="mx-auto mb-8 max-w-md space-y-2.5 rounded-[22px] border border-slate-100 bg-slate-50/80 p-5 text-left text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Email</span>
              <span className="font-semibold text-slate-800">
                {formData.email || "doctor@example.com"}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Campus</span>
              <span className="text-right font-semibold text-slate-800">
                {formData.campus}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Advisor</span>
              <span className="font-semibold text-teal-700">
                Dr. Rajesh Kumar (MD)
              </span>
            </div>
          </div>

          <Link href="/courses" className="btn-primary inline-flex">
            Browse all courses
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        {/* Premium header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-violet-900 px-6 py-7 sm:px-8 sm:py-8">
          <div className="absolute inset-0 pattern-grid opacity-20" aria-hidden />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -bottom-8 left-1/3 h-32 w-32 rounded-full bg-violet-400/25 blur-3xl" />

          <div className="relative">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-50 backdrop-blur">
                <Sparkles className="size-3" />
                Admissions application
              </span>
              <span className="inline-flex rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-200">
                Batch 2025–2026
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Skinfinity Academy Enrollment
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-teal-100">
              Complete your application to reserve a 1:1 doctor-supervised
              clinical seat. Reviewed within 24 hours.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8">
          {/* Section 1 */}
          <section>
            <SectionTitle
              step={1}
              icon={UserRound}
              title="Doctor & Applicant Information"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name (with prefix) *">
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="e.g. Dr. Priya Sharma"
                  className={inputClass}
                />
              </Field>
              <Field label="Email address *">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="doctor@example.com"
                  className={inputClass}
                />
              </Field>
              <Field label="Phone / WhatsApp *">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </Field>
              <Field label="Qualification / Specialization *">
                <div className="relative">
                  <select
                    value={formData.qualification}
                    onChange={(e) => update("qualification", e.target.value)}
                    className={selectClass}
                  >
                    <option value="MBBS Doctor">MBBS Doctor</option>
                    <option value="MD Dermatology / DVD">
                      MD Dermatology / DVD
                    </option>
                    <option value="BDS / MDS Dental Surgeon">
                      BDS / MDS Dental Surgeon
                    </option>
                    <option value="BAMS / BHMS Physician">
                      BAMS / BHMS Physician
                    </option>
                    <option value="Certified Cosmetologist">
                      Certified Cosmetologist
                    </option>
                    <option value="Other Medical Specialist">
                      Other Medical Specialist
                    </option>
                  </select>
                  <GraduationCap className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>
              <Field
                label="Medical council registration no. (optional)"
                className="sm:col-span-2"
              >
                <input
                  type="text"
                  value={formData.regNumber}
                  onChange={(e) => update("regNumber", e.target.value)}
                  placeholder="e.g. KMC/12345/2020"
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <SectionTitle
              step={2}
              icon={MapPin}
              title="Program & Campus Preferences"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Selected program / course *" className="sm:col-span-2">
                <input
                  type="text"
                  required
                  value={formData.program}
                  onChange={(e) => update("program", e.target.value)}
                  placeholder="e.g. Fellowship in Aesthetic Dermatology"
                  className={cn(inputClass, "font-semibold text-teal-700")}
                />
              </Field>
              <Field label="Preferred campus *">
                <div className="relative">
                  <select
                    value={formData.campus}
                    onChange={(e) => update("campus", e.target.value)}
                    className={selectClass}
                  >
                    <option value="Bengaluru Clinical Campus (MG Road)">
                      Bengaluru Clinical Campus (MG Road)
                    </option>
                    <option value="Mumbai Clinical Campus (Bandra West)">
                      Mumbai Campus (Bandra West)
                    </option>
                    <option value="Delhi NCR Campus (Sarita Vihar)">
                      Delhi NCR Campus (Sarita Vihar)
                    </option>
                    <option value="Hyderabad Campus (Jubilee Hills)">
                      Hyderabad Campus (Jubilee Hills)
                    </option>
                    <option value="Online Live Hybrid HD Zoom">
                      Online HD Zoom Stream
                    </option>
                  </select>
                  <MapPin className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>
              <Field label="Upcoming batch *">
                <select
                  value={formData.batch}
                  onChange={(e) => update("batch", e.target.value)}
                  className={selectClass}
                >
                  <option value="August 2025 Upcoming Batch">
                    August 2025 Upcoming Batch
                  </option>
                  <option value="September 2025 Batch">
                    September 2025 Batch
                  </option>
                  <option value="October 2025 Batch">October 2025 Batch</option>
                </select>
              </Field>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <SectionTitle
              step={3}
              icon={CreditCard}
              title="Seat Reservation Choice"
            />
            <div className="space-y-3">
              {paymentOptions.map((opt) => {
                const active = formData.paymentOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => update("paymentOption", opt.id)}
                    className={cn(
                      "group flex w-full items-center justify-between gap-4 rounded-[20px] border p-4 text-left transition-all duration-300",
                      active
                        ? "border-teal-500 bg-teal-50/60 shadow-[0_8px_24px_rgba(15,118,110,0.12)] ring-1 ring-teal-500/40"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-soft"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                          active
                            ? "border-teal-600 bg-teal-600"
                            : "border-slate-300 bg-white"
                        )}
                      >
                        {active && (
                          <CheckCircle2 className="size-3.5 text-white" />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {opt.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-3 py-1 text-xs font-bold",
                        opt.badgeTone === "solid" &&
                          "bg-teal-600 text-white",
                        opt.badgeTone === "outline" &&
                          "border border-slate-200 text-slate-700",
                        opt.badgeTone === "free" &&
                          "border border-emerald-200 bg-emerald-50 text-emerald-700"
                      )}
                    >
                      {opt.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs leading-relaxed text-slate-500">
              All doctor applications are reviewed by our academic board within
              24 hours.
            </p>
            <button type="submit" className="btn-primary btn-ripple group w-full sm:w-auto">
              Submit enrollment application
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </form>
      </div>
    </FadeIn>
  );
}

function EnrollSidebar() {
  return (
    <FadeIn delay={0.1} className="space-y-4 lg:sticky lg:top-28">
      <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-soft">
        <h3 className="mb-4 text-base font-bold text-slate-900">
          Why doctors enroll with us
        </h3>
        <ul className="space-y-3.5">
          {trustPoints.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.text} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="text-sm leading-snug text-slate-600">
                  {item.text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-[24px] bg-gradient-to-br from-teal-700 to-teal-900 p-6 text-white shadow-teal">
        <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
          <Phone className="size-5" />
        </div>
        <h3 className="mb-1 text-base font-bold">Need help applying?</h3>
        <p className="mb-4 text-sm leading-relaxed text-teal-100">
          Talk to an admissions counselor about eligibility, fees, and batch
          dates.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-teal-800 transition-all hover:bg-teal-50"
        >
          Contact admissions
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </FadeIn>
  );
}

function FormSkeleton() {
  return (
    <div className="h-[520px] animate-pulse rounded-[28px] bg-white shadow-soft ring-1 ring-slate-100" />
  );
}

export default function EnrollPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageHeader
        title="Student Admissions &"
        highlight="Enrollment Form"
        subtitle="Complete your doctor registration application for hands-on clinical courses and workshops."
        breadcrumb="Enrollment"
      />

      <section className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-teal-200/25 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-violet-200/20 blur-[90px]" />

        <div className="container-max relative">
          <div className="mb-6 text-center lg:mb-8">
            <p className="text-sm text-slate-500">
              Applying for a{" "}
              <GradientText className="font-semibold">
                clinical training seat
              </GradientText>
              ? Fill the form — our team responds within a day.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] xl:gap-8">
            <Suspense fallback={<FormSkeleton />}>
              <EnrollFormContent />
            </Suspense>
            <EnrollSidebar />
          </div>
        </div>
      </section>
    </div>
  );
}
