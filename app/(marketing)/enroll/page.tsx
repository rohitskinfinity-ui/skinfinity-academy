"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";

const fieldClass =
  "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500";

const labelClass =
  "block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1";

const PROGRAM_FEE = 120000;

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
            step >= 1
              ? "bg-teal-600 text-white"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          1
        </span>
        <span
          className={`text-sm font-bold ${
            step === 1 ? "text-slate-900" : "text-slate-500"
          }`}
        >
          Details
        </span>
      </div>
      <div className="h-px flex-1 bg-slate-200" />
      <div className="flex items-center gap-2">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
            step >= 2
              ? "bg-teal-600 text-white"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          2
        </span>
        <span
          className={`text-sm font-bold ${
            step === 2 ? "text-slate-900" : "text-slate-500"
          }`}
        >
          Checkout
        </span>
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

  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "MBBS Doctor",
    regNumber: "",
    program: initialProgram,
    batch: "August 2025 Upcoming Batch",
  });

  useEffect(() => {
    if (initialProgram) {
      setFormData((prev) => ({ ...prev, program: initialProgram }));
    }
  }, [initialProgram]);

  const update = (key: keyof typeof formData, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const payableAmount = PROGRAM_FEE;

  if (submitted) {
    return (
      <div className="rounded-3xl border border-teal-200 bg-teal-50 p-8 py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg">
          <MaterialIcon name="check" size={32} />
        </div>
        <h3
          className="mb-2 text-2xl font-bold text-slate-900"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          Payment Initiated Successfully
        </h3>
        <p className="mx-auto mb-4 max-w-md text-sm text-slate-600">
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
        <p className="mb-2 text-sm font-semibold text-teal-700">
          Amount paid: {formatINR(payableAmount)}
        </p>
        <div className="mx-auto mb-4 flex max-w-md items-start gap-3 rounded-2xl border border-teal-200 bg-white/70 p-4 text-left">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
            <MaterialIcon name="login" size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              Your student account is ready
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              You can now log in with Google using the same email address you
              entered during registration:{" "}
              <strong className="text-slate-900">{formData.email}</strong>
            </p>
          </div>
        </div>
        <p className="mb-6 text-xs text-slate-500">
          Our academic board will review your application within 24 hours.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700"
          >
            <MaterialIcon name="login" size={16} />
            LOGIN NOW
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-teal-300 hover:text-teal-700"
          >
            BACK TO COURSES &gt;
          </Link>
        </div>
      </div>
    );
  }

  /* ───────── Step 2: Checkout ───────── */
  if (step === 2) {
    return (
      <div className="space-y-5 pt-2">
        <StepIndicator step={2} />

        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">
            REVIEW & PAY
          </span>
          <h3
            className="mt-1 text-2xl font-bold text-slate-900"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Checkout{" "}
            <span className="font-serif italic font-normal text-teal-600">
              summary
            </span>
          </h3>
        </div>

        {/* Applicant summary */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">
              Applicant Details
            </h4>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-teal-600 hover:text-teal-700"
            >
              Edit
            </button>
          </div>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Name
              </p>
              <p className="font-semibold text-slate-800">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Email
              </p>
              <p className="font-semibold text-slate-800">{formData.email}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Phone
              </p>
              <p className="font-semibold text-slate-800">{formData.phone}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Qualification
              </p>
              <p className="font-semibold text-slate-800">
                {formData.qualification}
              </p>
            </div>
          </div>
        </div>

        {/* Program summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Program Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Program</span>
              <span className="text-right font-semibold text-slate-900">
                {formData.program}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Batch</span>
              <span className="text-right font-semibold text-slate-900">
                {formData.batch}
              </span>
            </div>
          </div>
        </div>

        {/* Amount breakdown */}
        <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-5 space-y-2.5">
          <h4 className="text-sm font-bold text-slate-900">Payment Breakdown</h4>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Program fee (full payment)</span>
            <span className="font-semibold text-slate-800">
              {formatINR(PROGRAM_FEE)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Includes</span>
            <span className="text-right font-medium text-slate-700">
              LMS access &amp; video vault
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-teal-200 pt-3">
            <span className="text-sm font-bold text-slate-900">
              Payable now
            </span>
            <span className="text-2xl font-extrabold text-teal-700">
              {formatINR(payableAmount)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-teal-300 hover:text-teal-700"
          >
            <MaterialIcon name="arrow_back" size={16} />
            BACK TO DETAILS
          </button>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700"
          >
            CHECKOUT · {formatINR(payableAmount)}
            <MaterialIcon name="lock" size={16} />
          </button>
        </div>

        <p className="text-[11px] italic text-slate-500">
          Payments are processed securely. You will receive a confirmation email
          with your enrollment reference.
        </p>
      </div>
    );
  }

  /* ───────── Step 1: Details ───────── */
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(2);
      }}
      className="space-y-5 pt-2"
    >
      <StepIndicator step={1} />

      {/* Applicant info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-600">
            1
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Doctor &amp; Applicant Information
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>FULL NAME (WITH PREFIX) *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="e.g. Dr. Priya Sharma"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>EMAIL ADDRESS *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="doctor@example.com"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>PHONE / WHATSAPP *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>QUALIFICATION / SPECIALIZATION *</label>
            <select
              value={formData.qualification}
              onChange={(e) => update("qualification", e.target.value)}
              className={`${fieldClass} text-slate-700`}
            >
              <option value="MBBS Doctor">MBBS Doctor</option>
              <option value="MD Dermatology / DVD">MD Dermatology / DVD</option>
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
          </div>
          <div>
            <label className={labelClass}>
              MEDICAL COUNCIL REGISTRATION NO. (OPTIONAL)
            </label>
            <input
              type="text"
              value={formData.regNumber}
              onChange={(e) => update("regNumber", e.target.value)}
              placeholder="e.g. KMC/12345/2020"
              className={fieldClass}
            />
          </div>
        </div>
      </div>

      {/* Program preferences */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-600">
            2
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Program Preferences
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>SELECTED PROGRAM / COURSE *</label>
            <input
              type="text"
              required
              value={formData.program}
              onChange={(e) => update("program", e.target.value)}
              placeholder="e.g. Fellowship in Aesthetic Dermatology"
              className={`${fieldClass} font-semibold text-teal-700`}
            />
          </div>
          <div>
            <label className={labelClass}>UPCOMING BATCH *</label>
            <select
              value={formData.batch}
              onChange={(e) => update("batch", e.target.value)}
              className={`${fieldClass} text-slate-700`}
            >
              <option value="August 2025 Upcoming Batch">
                August 2025 Upcoming Batch
              </option>
              <option value="September 2025 Batch">September 2025 Batch</option>
              <option value="October 2025 Batch">October 2025 Batch</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 sm:w-auto"
      >
        CONTINUE TO CHECKOUT
        <MaterialIcon name="arrow_forward" size={16} />
      </button>

      <p className="mt-2 text-[11px] italic text-slate-500">
        Next step: review your summary and complete payment securely.
      </p>
    </form>
  );
}

export default function EnrollPage() {
  return (
    <div className="min-h-screen select-none bg-white">
      <PageHeader
        title="Student Admissions &"
        highlight="Enrollment Form"
        subtitle="Complete your doctor registration application for hands-on clinical courses and workshops."
        breadcrumb="Enrollment"
      >
        <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
          <div className="shadow-xs flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <MaterialIcon name="school" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                BATCH
              </p>
              <p className="text-sm font-bold text-slate-900">
                Admissions Open 2025–2026
              </p>
            </div>
          </div>

          <div className="shadow-xs flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <MaterialIcon name="schedule" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                RESPONSE TIME
              </p>
              <p className="text-sm font-bold text-slate-900">
                Reviewed within 24 hours
              </p>
            </div>
          </div>
        </div>
      </PageHeader>

      <section className="border-b border-slate-200 bg-white py-10">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">
                  START YOUR APPLICATION
                </span>
                <h2
                  className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Reserve your{" "}
                  <span className="font-serif text-teal-600 italic font-normal">
                    clinical
                  </span>{" "}
                  seat
                </h2>
              </div>

              <Suspense
                fallback={
                  <div className="py-12 text-center text-sm font-semibold text-slate-500">
                    Loading enrollment form...
                  </div>
                }
              >
                <EnrollFormContent />
              </Suspense>
            </div>

            <div className="space-y-8 rounded-3xl border border-amber-900/10 bg-[#fcfaf7] p-8 lg:col-span-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700">
                  WHY ENROLL
                </span>
                <h3
                  className="mb-4 mt-1 text-2xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  What You{" "}
                  <span className="font-serif text-teal-600 italic font-normal">
                    Get
                  </span>
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      icon: "verified_user",
                      title: "Board Review",
                      desc: "Application reviewed within 24 hours",
                    },
                    {
                      icon: "medical_services",
                      title: "Live Patients",
                      desc: "1:1 supervised clinical hands-on training",
                    },
                    {
                      icon: "workspace_premium",
                      title: "Certification",
                      desc: "CIBTAC & CIDESCO aligned credentials",
                    },
                    {
                      icon: "school",
                      title: "3 year access to LMS",
                      desc: "Recordings & resources with 3 year access",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                        <MaterialIcon name={item.icon} size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-amber-900/10 pt-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700">
                  NEED HELP?
                </span>
                <h3
                  className="mb-2 mt-1 text-2xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Talk to{" "}
                  <span className="font-serif text-teal-600 italic font-normal">
                    Admissions
                  </span>
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-slate-600">
                  Questions about eligibility, fees, or batch dates? Our
                  counselors are happy to guide you.
                </p>

                <div className="space-y-2.5 text-sm">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2.5 font-semibold text-slate-800 transition-colors hover:text-teal-700"
                  >
                    <MaterialIcon
                      name="call"
                      size={16}
                      className="text-teal-600"
                    />
                    +91 98765 43210
                  </a>
                  <a
                    href="mailto:support@skinfinity.edu"
                    className="flex items-center gap-2.5 font-semibold text-slate-800 transition-colors hover:text-teal-700"
                  >
                    <MaterialIcon
                      name="mail"
                      size={16}
                      className="text-teal-600"
                    />
                    support@skinfinity.edu
                  </a>
                </div>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 transition-all hover:border-teal-300 hover:text-teal-700"
                >
                  CONTACT PAGE &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
