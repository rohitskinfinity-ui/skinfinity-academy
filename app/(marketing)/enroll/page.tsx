"use client";

import { useState, useEffect, Suspense, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import DatePicker from "@/components/ui/date-picker";
import {
  fetchCourses,
  fetchWorkshopBySlug,
  formatPrice,
  submitApplication,
} from "@/lib/api/public";
import type { PublicCourseCard, PublicWorkshop } from "@/lib/api/types";

const fieldClass =
  "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500";

const labelClass =
  "block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5";

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

function mapGender(value: string): "female" | "male" | "other" | null {
  const v = value.toLowerCase();
  if (v === "female") return "female";
  if (v === "male") return "male";
  if (v === "other") return "other";
  return null;
}

function mapYesNo(value: string): "yes" | "no" | null {
  const v = value.toLowerCase();
  if (v === "yes") return "yes";
  if (v === "no") return "no";
  return null;
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
function parsePriceNumber(val: string | number | null | undefined): number {
  if (val == null) return 0;
  if (typeof val === "number") return val;
  const num = parseFloat(val.toString().replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });
}

function EnrollFormContent() {
  const searchParams = useSearchParams();
  const initialProgram =
    searchParams.get("program") || searchParams.get("title") || "";
  const workshopSlug = searchParams.get("workshop")?.trim() || "";
  const isWorkshop = Boolean(workshopSlug);

  const [courses, setCourses] = useState<PublicCourseCard[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(!isWorkshop);
  const [workshop, setWorkshop] = useState<PublicWorkshop | null>(null);
  const [workshopLoading, setWorkshopLoading] = useState(isWorkshop);
  const [workshopError, setWorkshopError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [photoName, setPhotoName] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const [docName, setDocName] = useState("");
  const [docBase64, setDocBase64] = useState("");

  const handlePhotoSelect = async (file: File | undefined) => {
    if (!file) {
      setPhotoName("");
      setPhotoBase64("");
      return;
    }
    setPhotoName(file.name);
    try {
      const b64 = await fileToBase64(file);
      setPhotoBase64(b64);
    } catch {
      setPhotoBase64("");
    }
  };

  const handleDocSelect = async (file: File | undefined) => {
    if (!file) {
      setDocName("");
      setDocBase64("");
      return;
    }
    setDocName(file.name);
    try {
      const b64 = await fileToBase64(file);
      setDocBase64(b64);
    } catch {
      setDocBase64("");
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    guardianName: "",
    courseSlug: "",
    dateOfBirth: "",
    gender: "male",
    highestQualification: "MBBS",
    profession: "",
    medicalBackground: "yes",
    registrationNo: "",
    currentlyWorking: "yes",
    whatsapp: "",
    alternateNo: "",
    email: "",
    address: "",
    cityState: "",
    pinCode: "",
    source: "",
  });

  const update = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (isWorkshop) return;
    let cancelled = false;
    (async () => {
      try {
        setCoursesLoading(true);
        const list = await fetchCourses();
        if (!cancelled) setCourses(list.items);
      } catch {
        if (!cancelled) setCourses([]);
      } finally {
        if (!cancelled) setCoursesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isWorkshop]);

  useEffect(() => {
    if (!isWorkshop) return;
    let cancelled = false;
    (async () => {
      try {
        setWorkshopLoading(true);
        setWorkshopError(null);
        const data = await fetchWorkshopBySlug(workshopSlug);
        if (!cancelled) setWorkshop(data);
      } catch (err) {
        if (cancelled) return;
        setWorkshopError(
          err instanceof Error
            ? err.message
            : "Failed to load workshop details",
        );
        setWorkshop(null);
      } finally {
        if (!cancelled) setWorkshopLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isWorkshop, workshopSlug]);

  useEffect(() => {
    if (isWorkshop || courses.length === 0) return;
    const matched = courses.find((c) => {
      if (initialProgram) {
        const q = initialProgram.toLowerCase();
        if (c.slug.toLowerCase() === q || c.title.toLowerCase() === q) {
          return true;
        }
      }
      return false;
    });
    if (matched) {
      setFormData((prev) => ({ ...prev, courseSlug: matched.slug }));
    } else if (courses[0]) {
      setFormData((prev) => ({ ...prev, courseSlug: courses[0].slug }));
    }
  }, [courses, initialProgram, isWorkshop]);

  const selectedCourse = courses.find((c) => c.slug === formData.courseSlug);

  const payableAmount = isWorkshop
    ? parsePriceNumber(workshop?.price)
    : parsePriceNumber(selectedCourse?.list_price);

  const programTitle = isWorkshop
    ? workshop?.title || "Hands-On Workshop"
    : selectedCourse?.title || "Clinical Cosmetology Programme";

  const programCurrency = isWorkshop
    ? workshop?.currency || "INR"
    : selectedCourse?.currency || "INR";

  if (submitted) {
    return (
      <div className="rounded-3xl border border-teal-200 bg-teal-50/50 p-8 text-center sm:p-12">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg">
          <MaterialIcon name="check_circle" size={36} />
        </div>
        <h3
          className="text-2xl font-extrabold text-slate-900 sm:text-3xl"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          Registration Submitted!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Thank you for enrolling in{" "}
          <strong className="text-slate-900">{programTitle}</strong>. Your
          application has been received by our admissions team.
        </p>

        {registrationId ? (
          <div className="mx-auto mt-6 inline-block rounded-2xl border border-teal-200 bg-white px-6 py-3 shadow-xs">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
              REGISTRATION ID
            </span>
            <span className="text-lg font-extrabold tracking-wider text-teal-700">
              {registrationId}
            </span>
          </div>
        ) : null}

        <div className="mt-8 rounded-2xl border border-teal-100 bg-white p-5 text-left text-xs text-slate-600 space-y-2">
          <p className="font-bold text-slate-900">What happens next?</p>
          <p>
            1. Our counselors will verify your document and qualification
            details.
          </p>
          <p>
            2. You will receive a formal confirmation email at{" "}
            <strong className="text-slate-900">{formData.email}</strong> with your
            seat allocation details.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">
            Return to Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Admissions
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    if (!photoBase64) {
      setSubmitError("Please upload a photo.");
      return;
    }
    if (!docBase64) {
      setSubmitError("Please upload your qualification document.");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      const result = await submitApplication(
        isWorkshop
          ? {
              application_kind: "workshop",
              full_name: formData.fullName,
              guardian_name: formData.guardianName || null,
              workshop_slug: workshopSlug,
              workshop_id: workshop?.id || null,
              date_of_birth: formData.dateOfBirth || null,
              gender: mapGender(formData.gender),
              highest_qualification: formData.highestQualification || null,
              profession: formData.profession || null,
              medical_background: mapYesNo(formData.medicalBackground),
              registration_no: formData.registrationNo || null,
              currently_working: mapYesNo(formData.currentlyWorking),
              whatsapp: formData.whatsapp,
              alternate_no: formData.alternateNo || null,
              email: formData.email,
              address: formData.address || null,
              city_state: formData.cityState || null,
              pin_code: formData.pinCode || null,
              source: formData.source || null,
              quoted_price: payableAmount > 0 ? payableAmount : null,
              currency: programCurrency,
              accepted_terms: acceptedTerms,
              photo_name: photoName || null,
              photo_base64: photoBase64 || null,
              doc_name: docName || null,
              doc_base64: docBase64 || null,
              notes:
                [
                  photoName ? `Photo: ${photoName}` : null,
                  docName ? `Qualification Document: ${docName}` : null,
                ]
                  .filter(Boolean)
                  .join(" | ") || null,
            }
          : {
              full_name: formData.fullName,
              guardian_name: formData.guardianName || null,
              course_slug: formData.courseSlug || null,
              course_preference: programTitle,
              date_of_birth: formData.dateOfBirth || null,
              gender: mapGender(formData.gender),
              highest_qualification: formData.highestQualification || null,
              profession: formData.profession || null,
              medical_background: mapYesNo(formData.medicalBackground),
              registration_no: formData.registrationNo || null,
              currently_working: mapYesNo(formData.currentlyWorking),
              whatsapp: formData.whatsapp,
              alternate_no: formData.alternateNo || null,
              email: formData.email,
              address: formData.address || null,
              city_state: formData.cityState || null,
              pin_code: formData.pinCode || null,
              source: formData.source || null,
              quoted_price: payableAmount > 0 ? payableAmount : null,
              currency: programCurrency,
              accepted_terms: acceptedTerms,
              photo_name: photoName || null,
              photo_base64: photoBase64 || null,
              doc_name: docName || null,
              doc_base64: docBase64 || null,
              notes:
                [
                  photoName ? `Photo: ${photoName}` : null,
                  docName ? `Qualification Document: ${docName}` : null,
                ]
                  .filter(Boolean)
                  .join(" | ") || null,
            },
      );
      setRegistrationId(result.registration_id);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : isWorkshop
            ? "Failed to submit workshop application"
            : "Failed to complete enrollment",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-2">
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
            <label className={labelClass}>
              {isWorkshop ? "Workshop *" : "Select Course *"}
            </label>
            {isWorkshop ? (
              <input
                type="text"
                readOnly
                value={programTitle}
                className={`${fieldClass} bg-slate-50 text-slate-700`}
              />
            ) : (
              <select
                required
                value={formData.courseSlug}
                onChange={(e) => update("courseSlug", e.target.value)}
                className={`${fieldClass} text-slate-700`}
                disabled={coursesLoading || courses.length === 0}
              >
                {coursesLoading ? (
                  <option value="">Loading courses…</option>
                ) : courses.length === 0 ? (
                  <option value="">No courses available</option>
                ) : (
                  courses.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                      {c.list_price != null
                        ? ` · ${formatPrice(c.list_price, c.currency)}`
                        : ""}
                    </option>
                  ))
                )}
              </select>
            )}
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
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
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
                onChange={(e) => void handlePhotoSelect(e.target.files?.[0])}
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
                onChange={(e) => void handleDocSelect(e.target.files?.[0])}
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
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 disabled:opacity-60 sm:w-auto"
      >
        {submitting
          ? "SUBMITTING…"
          : payableAmount > 0
            ? `SUBMIT APPLICATION · ${formatINR(payableAmount)}`
            : "SUBMIT APPLICATION"}
        <MaterialIcon name="send" size={16} />
      </button>
      {submitError ? (
        <p className="mt-3 text-sm text-red-600">{submitError}</p>
      ) : null}
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
                      title: "Instant Enrollment",
                      desc: "Your seat is confirmed as soon as you submit",
                    },
                    {
                      icon: "medical_services",
                      title: "Live Patients",
                      desc: "1:1 supervised clinical hands-on training",
                    },
                    {
                      icon: "workspace_premium",
                      title: "Certification",
                      desc: "IEB & DMHCA affiliated credentials",
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
                    href="mailto:admissions@skinfinityacademy.com"
                    className="flex items-center gap-2.5 font-semibold text-slate-800 transition-colors hover:text-teal-700"
                  >
                    <MaterialIcon name="mail" size={16} className="text-teal-600" />
                    admissions@skinfinityacademy.com
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
