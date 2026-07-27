"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import StatusBadge from "../_components/StatusBadge";
import FilterChips from "../_components/FilterChips";

type SubmissionStatus = "pending" | "submitted" | "graded";

const assignments = [
  {
    id: 1,
    title: "Case Study: Vascular Complication Management",
    course: "Advanced Injectables",
    due: "Aug 18",
    status: "pending" as SubmissionStatus,
    marks: null as number | null,
  },
  {
    id: 2,
    title: "Clinical Report: Chemical Peel Protocol",
    course: "Chemical Peels",
    due: "Aug 22",
    status: "submitted" as SubmissionStatus,
    marks: null,
  },
  {
    id: 3,
    title: "Patient Assessment Case Report",
    course: "Clinical Cosmetology",
    due: "Aug 10",
    status: "graded" as SubmissionStatus,
    marks: 92,
  },
  {
    id: 4,
    title: "Laser Safety Protocol Documentation",
    course: "Laser & Energy Devices",
    due: "Aug 5",
    status: "graded" as SubmissionStatus,
    marks: 88,
  },
];

const statusIcon: Record<SubmissionStatus, { icon: string; bg: string; color: string }> = {
  pending: { icon: "description", bg: "bg-amber-50", color: "text-amber-500" },
  submitted: { icon: "schedule", bg: "bg-sky-50", color: "text-sky-500" },
  graded: { icon: "check_circle", bg: "bg-emerald-50", color: "text-emerald-500" },
};

export default function AssignmentsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");

  const assignment = assignments.find((a) => a.id === selected);

  const filtered =
    filter === "all"
      ? assignments
      : assignments.filter((a) => a.status === filter);

  const handleUpload = (fileName: string) => {
    setFiles((prev) => [...prev, fileName]);
  };

  if (assignment) {
    const meta = statusIcon[assignment.status];
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600"
        >
          <MaterialIcon name="arrow_back" size={16} /> Back to Assignments
        </button>
        <div className="mb-6">
          <div className="mb-2">
            <StatusBadge status={assignment.status} />
          </div>
          <h1
            className="text-xl font-bold text-slate-900"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {assignment.title}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {assignment.course} · Due {assignment.due}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <Card>
              <h2 className="mb-3 font-bold text-slate-900">Assignment Brief</h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-500">
                Submit a comprehensive case study on managing vascular
                complications in aesthetic procedures. Include patient history,
                assessment, intervention, and outcome analysis. Minimum 1500
                words with supporting images.
              </p>
              <div className="flex flex-wrap gap-2">
                {["PDF", "Images", "1500 words min", "Case Study"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>

            {assignment.status === "pending" && (
              <Card>
                <h3 className="mb-4 font-bold text-slate-900">Submit Your Work</h3>
                <div
                  onClick={() => handleUpload(`document_${files.length + 1}.pdf`)}
                  className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center transition-all hover:border-teal-400 hover:bg-teal-50/30"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                    <MaterialIcon name="upload" size={24} className="text-teal-600" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    Click to upload or drag & drop
                  </p>
                  <p className="mt-1 text-xs text-slate-400">PDF, PNG, JPG up to 10MB</p>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <div
                        key={f}
                        className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100">
                          <MaterialIcon name="description" size={18} className="text-teal-600" />
                        </div>
                        <span className="flex-1 text-sm text-slate-700">{f}</span>
                        <button
                          onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                          className="rounded-lg p-1.5 hover:bg-slate-200"
                        >
                          <MaterialIcon name="close" size={16} className="text-slate-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button className="mt-4 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700">
                  Submit Assignment
                </button>
              </Card>
            )}

            {assignment.status === "graded" && (
              <Card>
                <div className="mb-4 flex items-center gap-2">
                  <MaterialIcon name="forum" size={18} className="text-teal-600" />
                  <h3 className="font-bold text-slate-900">Teacher Feedback</h3>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                    AS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Dr. Aisha Sharma</p>
                    <p className="mb-2 text-xs text-slate-400">2 days ago</p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Excellent analysis! Your case study demonstrated strong
                      clinical reasoning. Consider adding more detail on
                      post-procedure monitoring in future reports.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <h3 className="mb-4 font-bold text-slate-900">Status</h3>
              <div className={`flex items-center gap-3 rounded-xl p-3 ${meta.bg}`}>
                <MaterialIcon name={meta.icon} size={20} className={meta.color} />
                <span className="text-sm font-semibold capitalize text-slate-700">
                  {assignment.status}
                </span>
              </div>
              {assignment.marks !== null && (
                <div className="mt-4 text-center">
                  <p className="mb-1 text-xs text-slate-400">Your Score</p>
                  <p className="text-3xl font-bold text-teal-600">
                    {assignment.marks}
                    <span className="text-lg text-slate-400">/100</span>
                  </p>
                </div>
              )}
            </Card>
            <Card>
              <h3 className="mb-3 font-bold text-slate-900">Guidelines</h3>
              <ul className="space-y-2 text-xs text-slate-500">
                {[
                  "Submit in PDF format",
                  "Include patient consent forms",
                  "Minimum 1500 words",
                  "Cite all references",
                  "Attach clinical images",
                ].map((g) => (
                  <li key={g} className="flex items-start gap-2">
                    <MaterialIcon
                      name="check_circle"
                      size={14}
                      className="mt-0.5 shrink-0 text-teal-500"
                    />
                    {g}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Assignments"
        subtitle="Manage your pending and graded course assignments."
      />
      <div className="mb-5">
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "submitted", label: "Submitted" },
            { id: "graded", label: "Graded" },
          ]}
        />
      </div>
      <div className="space-y-2">
        {filtered.map((a) => {
          const meta = statusIcon[a.status];
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelected(a.id)}
              className="flex w-full items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 text-left shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:border-teal-100 hover:shadow-[0_12px_32px_rgba(15,118,110,0.08)]"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.bg}`}
              >
                <MaterialIcon name={meta.icon} size={20} className={meta.color} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{a.title}</p>
                <p className="text-xs text-slate-400">
                  {a.course} · Due {a.due}
                </p>
              </div>
              {a.marks !== null && (
                <span className="text-sm font-bold text-teal-600">{a.marks}/100</span>
              )}
              <StatusBadge status={a.status} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
