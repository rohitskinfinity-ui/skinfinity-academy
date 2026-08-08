"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import StatusBadge from "../_components/StatusBadge";
import FilterChips from "../_components/FilterChips";
import { STAGE_LABELS, practicalAssignments } from "@/lib/lms/mock-data";
import type { PracticalAssignment } from "@/lib/lms/types";

type SubmissionStatus = PracticalAssignment["status"];

const statusIcon: Record<
  SubmissionStatus,
  { icon: string; bg: string; color: string }
> = {
  pending: { icon: "description", bg: "bg-amber-50 dark:bg-amber-950/60", color: "text-amber-500 dark:text-amber-400" },
  submitted: { icon: "schedule", bg: "bg-sky-50 dark:bg-sky-950/60", color: "text-sky-500 dark:text-sky-400" },
  graded: {
    icon: "check_circle",
    bg: "bg-emerald-50 dark:bg-emerald-950/60",
    color: "text-emerald-500 dark:text-emerald-400",
  },
};

export default function AssignmentsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");

  const assignment = practicalAssignments.find((a) => a.id === selected);

  const filtered =
    filter === "all"
      ? practicalAssignments
      : practicalAssignments.filter((a) => a.status === filter);

  const handleUpload = (fileName: string) => {
    setFiles((prev) => [...prev, fileName]);
  };

  if (assignment) {
    const meta = statusIcon[assignment.status];
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
        >
          <MaterialIcon name="arrow_back" size={16} /> Back to Assignments
        </button>
        <div className="mb-6">
          <div className="mb-2 flex flex-wrap gap-2">
            <StatusBadge status={assignment.status} />
            <span className="rounded-full bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 text-[11px] font-bold text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-900/50">
              {STAGE_LABELS[assignment.stage]}
            </span>
          </div>
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {assignment.title}
          </h1>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
            {assignment.course} · {assignment.treatment} · Due {assignment.due}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <Card>
              <h2 className="mb-3 font-bold text-slate-900 dark:text-white">Assignment Brief</h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {assignment.brief}
              </p>
              <div className="flex flex-wrap gap-2">
                {["PDF", "Images", STAGE_LABELS[assignment.stage], "Practical"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                Theory quizzes live inside each treatment — this page is for
                observation, training, and hands-on practical submissions only.
              </p>
            </Card>

            {assignment.status === "pending" && (
              <Card>
                <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Submit Your Work</h3>
                <div
                  onClick={() =>
                    handleUpload(`document_${files.length + 1}.pdf`)
                  }
                  className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 text-center transition-all hover:border-teal-400 hover:bg-teal-50/30 dark:hover:bg-teal-950/20"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/60">
                    <MaterialIcon
                      name="upload"
                      size={24}
                      className="text-teal-600 dark:text-teal-400"
                    />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Click to upload or drag & drop
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <div
                        key={f}
                        className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 p-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-950">
                          <MaterialIcon
                            name="description"
                            size={18}
                            className="text-teal-600 dark:text-teal-400"
                          />
                        </div>
                        <span className="flex-1 text-sm text-slate-700 dark:text-slate-200">{f}</span>
                        <button
                          onClick={() =>
                            setFiles(files.filter((_, idx) => idx !== i))
                          }
                          className="rounded-lg p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          <MaterialIcon
                            name="close"
                            size={16}
                            className="text-slate-400"
                          />
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
                  <MaterialIcon
                    name="forum"
                    size={18}
                    className="text-teal-600 dark:text-teal-400"
                  />
                  <h3 className="font-bold text-slate-900 dark:text-white">Teacher Feedback</h3>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950 text-xs font-bold text-teal-700 dark:text-teal-400">
                    AS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Dr. Aisha Sharma
                    </p>
                    <p className="mb-2 text-xs text-slate-400 dark:text-slate-500">2 days ago</p>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      Excellent analysis! Your submission demonstrated strong
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
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Status</h3>
              <div className={`flex items-center gap-3 rounded-xl p-3 ${meta.bg}`}>
                <MaterialIcon
                  name={meta.icon}
                  size={20}
                  className={meta.color}
                />
                <span className="text-sm font-semibold capitalize text-slate-700 dark:text-slate-200">
                  {assignment.status}
                </span>
              </div>
              {assignment.marks !== null && (
                <div className="mt-4 text-center">
                  <p className="mb-1 text-xs text-slate-400 dark:text-slate-500">Your Score</p>
                  <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                    {assignment.marks}
                    <span className="text-lg text-slate-400 dark:text-slate-500">/100</span>
                  </p>
                </div>
              )}
            </Card>
            <Card>
              <h3 className="mb-3 font-bold text-slate-900 dark:text-white">Guidelines</h3>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                {[
                  "Submit in PDF format",
                  "Include patient consent forms where required",
                  "Tag the correct treatment stage",
                  "Cite all references",
                  "Attach clinical images when relevant",
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
        subtitle="Practical work for Observation, Training, and Hands-on. Theory quizzes live inside each treatment."
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
              className="flex w-full items-center gap-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-4 text-left shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl transition-all hover:-translate-y-0.5 hover:border-teal-100 dark:hover:border-slate-700"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.bg}`}
              >
                <MaterialIcon
                  name={meta.icon}
                  size={20}
                  className={meta.color}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {a.title}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {a.treatment} · {STAGE_LABELS[a.stage]} · Due {a.due}
                </p>
              </div>
              {a.marks !== null && (
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                  {a.marks}/100
                </span>
              )}
              <StatusBadge status={a.status} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
