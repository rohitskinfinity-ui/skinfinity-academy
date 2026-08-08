"use client";

import { FormEvent, useEffect, useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import EmptyState from "../_components/EmptyState";
import { patchStudentProfile } from "@/lib/api/student-client";
import { ApiError } from "@/lib/api/client";
import { useStudentAuth } from "@/store/student-auth";

export default function ProfilePage() {
  const { student, refreshMe, loading } = useStudentAuth();
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setDisplayName(student?.display_name || student?.full_name || "");
  }, [student]);

  if (loading && !student) {
    return <EmptyState icon="hourglass_empty" title="Loading profile…" />;
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

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await patchStudentProfile({ display_name: displayName.trim() || null });
      await refreshMe();
      setMessage("Profile updated");
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : "Save failed");
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

      <div className="mb-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl sm:p-6 transition-colors duration-300">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-2xl font-bold text-white sm:h-24 sm:w-24">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h2
              className="text-xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              {student.full_name}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Enrolled student</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="mail" size={14} /> {student.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="school" size={14} />{" "}
                {student.enrollments?.length ?? 0} enrollments
              </span>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Edit profile</h3>
        <form onSubmit={onSave} className="max-w-md space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Display name
            </label>
            <input
              className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm text-slate-900 dark:text-white outline-none focus:border-teal-400 dark:focus:border-teal-400"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {message ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">{message}</p>
          ) : null}
        </form>
      </Card>
    </div>
  );
}
