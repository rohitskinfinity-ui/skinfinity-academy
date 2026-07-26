"use client";

import { useState, useEffect, Suspense, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import DatePicker from "@/components/ui/date-picker";

const fieldClass =
  "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500";

const labelClass =
  "block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5";

const PROGRAM_FEE = 120000;

const COURSES = [
  "Fellowship in Aesthetic Dermatology",
  "Certificate in Clinical Cosmetology",
  "Advanced Injectables & Dermal Fillers",
  "Trichology & Hair Sciences",
  "Laser & Energy-Based Devices",
  "Chemical Peels & Skin Rejuvenation",
];

const SOURCES = [
  "Instagram",
  "Google",
  "Website",
  "YouTube",
  "Facebook",
  "Referral",
  "Other",
] as const;

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function SectionTitle({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-600">
        {n}
      </div>
      <h3 className="text-sm font-bold text-teal-700">{title}</h3>
    </div>
  );
}

function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
            step >= 1 ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"
          }`}
        >
          1
        </span>
        <span
          className={`text-sm font-bold ${
            step === 1 ? "text-slate-900" : "text-slate-500"
          }`}
        >
          Registration
        </span>
      </div>
      <div className="h-px flex-1 bg-slate-200" />
      <div className="flex items-center gap-2">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
            step >= 2 ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"
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
    COURSES[0];

  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [photoName, setPhotoName] = useState("");
  const [docName, setDocName] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    guardianName: "",
    course: initialProgram,
    dateOfBirth: "",
    gender: "",
    highestQualification: "",
    profession: "",
    medicalBackground: "",
    registrationNo: "",
    currentlyWorking: "",
    whatsapp: "",
    alternateNo: "",
    email: "",
    address: "",
    cityState: "",
    pinCode: "",
    source: "",
  });

  useEffect(() => {
    if (initialProgram) {
      setFormData((prev) => ({ ...prev, course: initialProgram }));
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
          for <strong>{formData.course}</strong>.
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

  if (step === 2) {
    const formatDob = (iso: string) => {
      if (!iso) return "—";
      const [y, m, d] = iso.split("-");
      return `${d}/${m}/${y}`;
    };

    const detailSections = [
      {
        title: "Personal Details",
        rows: [
          ["Full Name", formData.fullName],
          ["Father's / Husband's Name", formData.guardianName],
          ["Course", formData.course],
          ["Date of Birth", formatDob(formData.dateOfBirth)],
          ["Gender", formData.gender],
          ["Photo", photoName || "—"],
        ],
      },
      {
        title: "Education & Profession",
        rows: [
          ["Highest Qualification", formData.highestQualification],
          ["Profession", formData.profession],
          ["Qualification Document", docName || "—"],
        ],
      },
      {
        title: "Medical / Declaration",
        rows: [
          ["Medical Background", formData.medicalBackground],
          ["Registration No", formData.registrationNo || "—"],
          ["Currently Working", formData.currentlyWorking],
        ],
      },
      {
        title: "Contact Details",
        rows: [
          ["WhatsApp No", formData.whatsapp],
          ["Alternate No", formData.alternateNo || "—"],
          ["Email ID", formData.email],
          ["Address", formData.address],
          ["City / State", formData.cityState],
          ["PIN Code", formData.pinCode],
        ],
      },
      {
        title: "Other",
        rows: [["How Did You Find Us?", formData.source]],
      },
    ];

    return (
      <div className="space-y-5 pt-2">
        <StepIndicator step={2} />

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">
              Full Application Details
            </h4>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-teal-600 hover:text-teal-700"
            >
              Edit
            </button>
          </div>

          <div className="space-y-4">
            {detailSections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-teal-600">
                  {section.title}
                </p>
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  {section.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className={
                        label === "Address" || label === "Course"
                          ? "sm:col-span-2"
                          : ""
                      }
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {label}
                      </p>
                      <p className="mt-0.5 break-words font-semibold text-slate-800">
                        {value || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 rounded-2xl border border-teal-200 bg-teal-50/50 p-5">
          <h4 className="text-sm font-bold text-slate-900">Payment Breakdown</h4>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Program fee (full payment)</span>
            <span className="font-semibold text-slate-800">
              {formatINR(PROGRAM_FEE)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-teal-200 pt-3">
            <span className="text-sm font-bold text-slate-900">Payable now</span>
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
            BACK
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
      </div>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    setStep(2);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 pt-2">
      <StepIndicator step={1} />

      {/* 1. Personal Details */}
      <div className="space-y-4">
        <SectionTitle n={1} title="Personal Details" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Full Name (as per ID) *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Full name as per ID"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Father&apos;s / Husband&apos;s Name *</label>
            <input
              type="text"
              required
              value={formData.guardianName}
              onChange={(e) => update("guardianName", e.target.value)}
              placeholder="Father's / Husband's name"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Select Course *</label>
            <select
              required
              value={formData.course}
              onChange={(e) => update("course", e.target.value)}
              className={`${fieldClass} text-slate-700`}
            >
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Date of Birth *</label>
            <DatePicker
              required
              disableFuture
              value={formData.dateOfBirth}
              onChange={(date) => update("dateOfBirth", date)}
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div>
            <label className={labelClass}>Gender *</label>
            <select
              required
              value={formData.gender}
              onChange={(e) => update("gender", e.target.value)}
              className={`${fieldClass} text-slate-700`}
            >
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Photo *</label>
            <label className={`${fieldClass} flex cursor-pointer items-center gap-2 text-slate-500`}>
              <MaterialIcon name="upload" size={16} className="text-teal-600" />
              <span className="truncate">
                {photoName || "Choose photo file"}
              </span>
              <input
                type="file"
                accept="image/*"
                required
                className="sr-only"
                onChange={(e) =>
                  setPhotoName(e.target.files?.[0]?.name || "")
                }
              />
            </label>
          </div>
        </div>
      </div>

      {/* 2. Education & Profession */}
      <div className="space-y-4">
        <SectionTitle n={2} title="Education & Profession" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Highest Qualification *</label>
            <input
              type="text"
              required
              value={formData.highestQualification}
              onChange={(e) => update("highestQualification", e.target.value)}
              placeholder="e.g. MBBS, MD, BDS"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Profession *</label>
            <input
              type="text"
              required
              value={formData.profession}
              onChange={(e) => update("profession", e.target.value)}
              placeholder="e.g. Dermatologist, Physician"
              className={fieldClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Upload Qualification Document *</label>
            <label className={`${fieldClass} flex cursor-pointer items-center gap-2 text-slate-500`}>
              <MaterialIcon name="upload_file" size={16} className="text-teal-600" />
              <span className="truncate">
                {docName || "Choose document (PDF / Image)"}
              </span>
              <input
                type="file"
                accept=".pdf,image/*"
                required
                className="sr-only"
                onChange={(e) => setDocName(e.target.files?.[0]?.name || "")}
              />
            </label>
          </div>
        </div>
      </div>

      {/* 3. Medical / Declaration */}
      <div className="space-y-4">
        <SectionTitle n={3} title="Medical / Declaration" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Do you have medical background? *</label>
            <select
              required
              value={formData.medicalBackground}
              onChange={(e) => update("medicalBackground", e.target.value)}
              className={`${fieldClass} text-slate-700`}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Registration No (if yes)</label>
            <input
              type="text"
              value={formData.registrationNo}
              onChange={(e) => update("registrationNo", e.target.value)}
              placeholder="e.g. KMC/12345/2020"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Currently Working? *</label>
            <select
              required
              value={formData.currentlyWorking}
              onChange={(e) => update("currentlyWorking", e.target.value)}
              className={`${fieldClass} text-slate-700`}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Contact Details */}
      <div className="space-y-4">
        <SectionTitle n={4} title="Contact Details" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>WhatsApp No *</label>
            <input
              type="tel"
              required
              value={formData.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              placeholder="+91 98765 43210"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Alternate No</label>
            <input
              type="tel"
              value={formData.alternateNo}
              onChange={(e) => update("alternateNo", e.target.value)}
              placeholder="+91 98765 43211"
              className={fieldClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Email ID *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="doctor@example.com"
              className={fieldClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Address *</label>
            <textarea
              required
              rows={2}
              value={formData.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Full postal address"
              className={`${fieldClass} resize-none`}
            />
          </div>
          <div>
            <label className={labelClass}>City / State *</label>
            <input
              type="text"
              required
              value={formData.cityState}
              onChange={(e) => update("cityState", e.target.value)}
              placeholder="Bengaluru, Karnataka"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>PIN Code *</label>
            <input
              type="text"
              required
              inputMode="numeric"
              pattern="[0-9]{6}"
              value={formData.pinCode}
              onChange={(e) => update("pinCode", e.target.value)}
              placeholder="560001"
              className={fieldClass}
            />
          </div>
        </div>
      </div>

      {/* 5. How Did You Find Us */}
      <div className="space-y-4">
        <SectionTitle n={5} title="How Did You Find Us?" />
        <div className="flex flex-wrap gap-2">
          {SOURCES.map((source) => (
            <label
              key={source}
              className={`cursor-pointer rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                formData.source === source
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"
              }`}
            >
              <input
                type="radio"
                name="source"
                value={source}
                required
                checked={formData.source === source}
                onChange={() => update("source", source)}
                className="sr-only"
              />
              {source}
            </label>
          ))}
        </div>
      </div>

      {/* 6. Terms */}
      <div className="space-y-4">
        <SectionTitle n={6} title="Terms & Conditions" />
        <ul className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs leading-relaxed text-slate-600">
          <li>• Fees once paid are non-refundable after batch confirmation.</li>
          <li>
            • Students must attend scheduled clinical sessions as per the
            academic calendar.
          </li>
          <li>
            • Certificates are issued only after successful completion of
            assessments.
          </li>
          <li>
            • The academy reserves the right to reschedule batches for operational
            reasons.
          </li>
        </ul>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            required
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 size-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          <span>
            I have read and agree to the terms &amp; conditions of Skinfinity
            Academy. *
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 sm:w-auto"
      >
        SUBMIT REGISTRATION
        <MaterialIcon name="arrow_forward" size={16} />
      </button>
    </form>
  );
}

export default function EnrollPage() {
  return (
    <div className="min-h-screen select-none bg-white">
      <PageHeader
        title="Student"
        highlight="Registration"
        subtitle="Complete your enrollment application for hands-on clinical courses and workshops."
        breadcrumb="Enrollment"
      />

      <section className="border-b border-slate-200 bg-white py-10">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">
                  ENROLL WITH US NOW
                </span>
                <h2
                  className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Student registration form
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
                  className="mb-4 mt-1 text-xl font-bold text-slate-900 sm:text-2xl"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  What you get
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
                      title: "LMS Access",
                      desc: "Recordings & resources with multi-year access",
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
                  className="mb-2 mt-1 text-xl font-bold text-slate-900 sm:text-2xl"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Talk to admissions
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
                    <MaterialIcon name="call" size={16} className="text-teal-600" />
                    +91 98765 43210
                  </a>
                  <a
                    href="mailto:support@skinfinity.edu"
                    className="flex items-center gap-2.5 font-semibold text-slate-800 transition-colors hover:text-teal-700"
                  >
                    <MaterialIcon name="mail" size={16} className="text-teal-600" />
                    support@skinfinity.edu
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
