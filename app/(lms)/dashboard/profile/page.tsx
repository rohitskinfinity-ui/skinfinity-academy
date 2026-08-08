"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import EmptyState from "../_components/EmptyState";
import ProfileSkeleton from "../_components/ProfileSkeleton";
import { patchStudentProfile } from "@/lib/api/student-client";
import { ApiError } from "@/lib/api/client";
import { useStudentAuth } from "@/store/student-auth";

type ProfileForm = {
  full_name: string;
  display_name: string;
  phone: string;
  whatsapp: string;
  alternate_phone: string;
  guardian_name: string;
  date_of_birth: string;
  gender: string;
  location: string;
  city_state: string;
  pin_code: string;
  address_line: string;
  program_label: string;
  highest_qualification: string;
  profession: string;
  registration_no: string;
  medical_background: string;
  currently_working: string;
};

const emptyForm: ProfileForm = {
  full_name: "",
  display_name: "",
  phone: "",
  whatsapp: "",
  alternate_phone: "",
  guardian_name: "",
  date_of_birth: "",
  gender: "",
  location: "",
  city_state: "",
  pin_code: "",
  address_line: "",
  program_label: "",
  highest_qualification: "",
  profession: "",
  registration_no: "",
  medical_background: "",
  currently_working: "",
};

const inputClass =
  "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-teal-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-teal-400";
const labelClass =
  "mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400";

function toDateInput(value: string | null | undefined) {
  if (!value) return "";
  return value.slice(0, 10);
}

function yesNo(value: string | null | undefined) {
  const v = (value || "").trim().toLowerCase();
  if (v === "yes" || v === "true" || v === "1") return "yes";
  if (v === "no" || v === "false" || v === "0") return "no";
  return "";
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export default function ProfilePage() {
  const { student, refreshMe, loading } = useStudentAuth();
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!student) return;
    setForm({
      full_name: student.full_name || "",
      display_name: student.display_name || "",
      phone: student.phone || "",
      whatsapp: student.whatsapp || "",
      alternate_phone: student.alternate_phone || "",
      guardian_name: student.guardian_name || "",
      date_of_birth: toDateInput(student.date_of_birth),
      gender: (student.gender || "").toLowerCase(),
      location: student.location || "",
      city_state: student.city_state || "",
      pin_code: student.pin_code || "",
      address_line: student.address_line || "",
      program_label: student.program_label || "",
      highest_qualification: student.highest_qualification || "",
      profession: student.profession || "",
      registration_no: student.registration_no || "",
      medical_background: yesNo(student.medical_background),
      currently_working: yesNo(student.currently_working),
    });
  }, [student]);

  if (loading && !student) {
    return <ProfileSkeleton />;
  }

  if (!student) {
    return (
      <EmptyState
        icon="person"
        title="Not signed in"
        description="Sign in to view your profile."
      />
    );
  }

  const initials = (student.full_name || "S")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function setField<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await patchStudentProfile({
        full_name: form.full_name.trim(),
        display_name: form.display_name.trim() || null,
        phone: form.phone.trim() || null,
        whatsapp: form.whatsapp.trim() || null,
        alternate_phone: form.alternate_phone.trim() || null,
        guardian_name: form.guardian_name.trim() || null,
        date_of_birth: form.date_of_birth || null,
        gender: form.gender || null,
        location: form.location.trim() || null,
        city_state: form.city_state.trim() || null,
        pin_code: form.pin_code.trim() || null,
        address_line: form.address_line.trim() || null,
        program_label: form.program_label.trim() || null,
        highest_qualification: form.highest_qualification.trim() || null,
        profession: form.profession.trim() || null,
        registration_no: form.registration_no.trim() || null,
        medical_background: form.medical_background || null,
        currently_working: form.currently_working || null,
      });
      await refreshMe();
      setMessage("Profile updated");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <SectionHeader
        title="My Profile"
        subtitle="Your account details for the Skinfinity Academy LMS."
      />

      <div className="mb-6 rounded-2xl border border-slate-200/70 bg-white p-5 text-slate-900 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:shadow-2xl sm:p-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          {student.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={student.avatar_url}
              alt={student.full_name}
              className="h-20 w-20 rounded-2xl object-cover sm:h-24 sm:w-24"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-2xl font-bold text-white sm:h-24 sm:w-24">
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2
              className="text-xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              {student.full_name}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Enrolled student
              {student.program_label ? ` · ${student.program_label}` : ""}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="mail" size={14} /> {student.email}
              </span>
              {student.phone || student.whatsapp ? (
                <span className="flex items-center gap-1.5">
                  <MaterialIcon name="call" size={14} />{" "}
                  {student.phone || student.whatsapp}
                </span>
              ) : null}
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="school" size={14} />{" "}
                {student.enrollments?.length ?? 0} enrollments
              </span>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
          Edit profile
        </h3>
        <form onSubmit={onSave} className="space-y-8">
          <section>
            <h4 className="mb-3 text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Account
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  required
                  className={inputClass}
                  value={form.full_name}
                  onChange={(e) => setField("full_name", e.target.value)}
                />
              </Field>
              <Field label="Display name">
                <input
                  className={inputClass}
                  value={form.display_name}
                  onChange={(e) => setField("display_name", e.target.value)}
                />
              </Field>
              <Field label="Email" className="sm:col-span-2">
                <input
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500 dark:bg-slate-800/60`}
                  value={student.email}
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Email is linked to your Google login and cannot be changed here.
                </p>
              </Field>
            </div>
          </section>

          <section>
            <h4 className="mb-3 text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Contact
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone">
                <input
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                />
              </Field>
              <Field label="WhatsApp">
                <input
                  className={inputClass}
                  value={form.whatsapp}
                  onChange={(e) => setField("whatsapp", e.target.value)}
                />
              </Field>
              <Field label="Alternate phone">
                <input
                  className={inputClass}
                  value={form.alternate_phone}
                  onChange={(e) => setField("alternate_phone", e.target.value)}
                />
              </Field>
              <Field label="Guardian name">
                <input
                  className={inputClass}
                  value={form.guardian_name}
                  onChange={(e) => setField("guardian_name", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section>
            <h4 className="mb-3 text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Personal
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date of birth">
                <input
                  type="date"
                  className={inputClass}
                  value={form.date_of_birth}
                  onChange={(e) => setField("date_of_birth", e.target.value)}
                />
              </Field>
              <Field label="Gender">
                <select
                  className={inputClass}
                  value={form.gender}
                  onChange={(e) => setField("gender", e.target.value)}
                >
                  <option value="">Select…</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </Field>
            </div>
          </section>

          <section>
            <h4 className="mb-3 text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Address
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Location">
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => setField("location", e.target.value)}
                />
              </Field>
              <Field label="City / state">
                <input
                  className={inputClass}
                  value={form.city_state}
                  onChange={(e) => setField("city_state", e.target.value)}
                />
              </Field>
              <Field label="PIN code">
                <input
                  className={inputClass}
                  value={form.pin_code}
                  onChange={(e) => setField("pin_code", e.target.value)}
                />
              </Field>
              <Field label="Address" className="sm:col-span-2">
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-teal-400"
                  value={form.address_line}
                  onChange={(e) => setField("address_line", e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section>
            <h4 className="mb-3 text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Academic & professional
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Program / course" className="sm:col-span-2">
                <input
                  className={inputClass}
                  value={form.program_label}
                  onChange={(e) => setField("program_label", e.target.value)}
                />
              </Field>
              <Field label="Highest qualification">
                <input
                  className={inputClass}
                  value={form.highest_qualification}
                  onChange={(e) =>
                    setField("highest_qualification", e.target.value)
                  }
                />
              </Field>
              <Field label="Profession">
                <input
                  className={inputClass}
                  value={form.profession}
                  onChange={(e) => setField("profession", e.target.value)}
                />
              </Field>
              <Field label="Registration no.">
                <input
                  className={inputClass}
                  value={form.registration_no}
                  onChange={(e) => setField("registration_no", e.target.value)}
                />
              </Field>
              <Field label="Medical background">
                <select
                  className={inputClass}
                  value={form.medical_background}
                  onChange={(e) =>
                    setField("medical_background", e.target.value)
                  }
                >
                  <option value="">Select…</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </Field>
              <Field label="Currently working">
                <select
                  className={inputClass}
                  value={form.currently_working}
                  onChange={(e) =>
                    setField("currently_working", e.target.value)
                  }
                >
                  <option value="">Select…</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </Field>
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            {message ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                {message}
              </p>
            ) : null}
            {error ? (
              <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
            ) : null}
          </div>
        </form>
      </Card>
    </div>
  );
}
