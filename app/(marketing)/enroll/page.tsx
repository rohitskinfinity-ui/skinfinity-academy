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
          Application Submitted Successfully
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
        <p className="mb-6 text-xs text-slate-500">
          Our academic board will review your application within 24 hours.
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700"
        >
          BACK TO COURSES &gt;
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5 pt-2"
    >
      {/* Section 1 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-600">
            1
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Doctor &amp; Applicant Information
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      {/* Section 2 */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-600">
            2
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Program &amp; Campus Preferences
          </h3>
        </div>

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>PREFERRED CAMPUS *</label>
            <select
              value={formData.campus}
              onChange={(e) => update("campus", e.target.value)}
              className={`${fieldClass} text-slate-700`}
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
              <option value="September 2025 Batch">
                September 2025 Batch
              </option>
              <option value="October 2025 Batch">October 2025 Batch</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-600">
            3
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Seat Reservation Choice
          </h3>
        </div>

        {[
          {
            id: "deposit",
            title: "Pay Seat Reservation Deposit (₹5,000)",
            desc: "Lock your seat today; balance payable at campus onset.",
            badge: "₹5,000",
          },
          {
            id: "full",
            title: "Pay Full Program Fee",
            desc: "Includes instant online LMS portal & video vault access.",
            badge: "Full Fee",
          },
          {
            id: "callback",
            title: "Request 1:1 Doctor Admissions Counseling Call",
            desc: "Free call with an academic advisor to discuss curriculum & dates.",
            badge: "FREE",
          },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => update("paymentOption", opt.id)}
            className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${
              formData.paymentOption === opt.id
                ? "border-teal-500 bg-teal-50/50 ring-1 ring-teal-500"
                : "border-slate-200 bg-white hover:border-teal-300"
            }`}
          >
            <div>
              <p className="text-sm font-bold text-slate-900">{opt.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{opt.desc}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                formData.paymentOption === opt.id
                  ? "bg-teal-600 text-white"
                  : "border border-slate-200 text-slate-600"
              }`}
            >
              {opt.badge}
            </span>
          </button>
        ))}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700"
      >
        SUBMIT ENROLLMENT APPLICATION &gt;
      </button>

      <p className="mt-2 text-[11px] italic text-slate-500">
        All doctor applications are reviewed by our academic board within 24
        hours. For urgent queries, please call us directly.
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
            {/* Left form column */}
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

            {/* Right cream sidebar — matching contact */}
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
                      icon: "all_inclusive",
                      title: "Lifetime LMS",
                      desc: "Recordings & resources with no expiry",
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
