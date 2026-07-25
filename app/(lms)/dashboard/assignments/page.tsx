"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";

type SubmissionStatus = "pending" | "submitted" | "graded";

const assignments = [
  {
    id: 1,
    title: "Case Study: Vascular Complication Management",
    course: "Advanced Injectables",
    due: "Aug 18",
    status: "pending" as SubmissionStatus,
    marks: null,
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

/* ── Section header helper ── */
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1
        className="text-2xl font-bold text-slate-900"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        {title}
      </h1>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function AssignmentsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [files, setFiles] = useState<string[]>([]);

  const assignment = assignments.find((a) => a.id === selected);

  const handleUpload = (fileName: string) => {
    setFiles([...files, fileName]);
  };

  if (assignment) {
    return (
      <>
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 mb-6"
        >
          <MaterialIcon name="arrow_back" size={16} /> Back to Assignments
        </button>
        <div className="mb-6">
          <h1
            className="text-xl font-bold text-slate-900"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {assignment.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {assignment.course} • Due {assignment.due}
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-50">
              <h2
                className="font-bold text-slate-900 mb-3"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Assignment Brief
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Submit a comprehensive case study on managing vascular
                complications in aesthetic procedures. Include patient history,
                assessment, intervention, and outcome analysis. Minimum 1500
                words with supporting images.
              </p>
              <div className="flex flex-wrap gap-2">
                {["PDF", "Images", "1500 words min", "Case Study"].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Upload area */}
            {assignment.status === "pending" && (
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-50">
                <h3
                  className="font-bold text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Submit Your Work
                </h3>
                <div
                  onClick={() =>
                    handleUpload(`document_${files.length + 1}.pdf`)
                  }
                  className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
                    <MaterialIcon
                      name="upload"
                      size={26}
                      className="text-teal-600"
                    />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                      >
                        <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center">
                          <MaterialIcon
                            name="description"
                            size={18}
                            className="text-teal-600"
                          />
                        </div>
                        <span className="text-sm text-slate-700 flex-1">
                          {f}
                        </span>
                        <button
                          onClick={() =>
                            setFiles(files.filter((_, idx) => idx !== i))
                          }
                          className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
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

                <button className="w-full mt-4 py-3.5 bg-teal-600 text-white font-semibold rounded-2xl hover:bg-teal-700 transition-all">
                  Submit Assignment
                </button>
              </div>
            )}

            {/* Feedback */}
            {assignment.status === "graded" && (
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-50">
                <div className="flex items-center gap-2 mb-4">
                  <MaterialIcon name="forum" size={18} className="text-teal-600" />
                  <h3
                    className="font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    Teacher Feedback
                  </h3>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-teal-700">AS</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Dr. Aisha Sharma
                    </p>
                    <p className="text-xs text-slate-400 mb-2">2 days ago</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Excellent analysis! Your case study demonstrated strong
                      clinical reasoning. The intervention timeline was
                      well-documented. Consider adding more detail on
                      post-procedure monitoring in future reports.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-50">
              <h3
                className="font-bold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Status
              </h3>
              <div
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  assignment.status === "graded"
                    ? "bg-emerald-50"
                    : assignment.status === "submitted"
                    ? "bg-blue-50"
                    : "bg-amber-50"
                }`}
              >
                {assignment.status === "graded" ? (
                  <MaterialIcon
                    name="check_circle"
                    size={20}
                    className="text-emerald-500"
                  />
                ) : assignment.status === "submitted" ? (
                  <MaterialIcon name="schedule" size={20} className="text-blue-500" />
                ) : (
                  <MaterialIcon
                    name="schedule"
                    size={20}
                    className="text-amber-500"
                  />
                )}
                <span className="text-sm font-semibold capitalize text-slate-700">
                  {assignment.status}
                </span>
              </div>
              {assignment.marks !== null && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400 mb-1">Your Score</p>
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className="text-3xl font-bold text-teal-600"
                      style={{ fontFamily: "var(--font-heading), sans-serif" }}
                    >
                      {assignment.marks}
                    </span>
                    <span className="text-lg text-slate-400">/100</span>
                  </div>
                  <div className="flex items-center justify-center gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <MaterialIcon
                        key={i}
                        name="star"
                        size={14}
                        className={
                          i <= Math.round(assignment.marks! / 20)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-50">
              <h3
                className="font-bold text-slate-900 mb-3"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Guidelines
              </h3>
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
                      className="text-teal-500 mt-0.5 flex-shrink-0"
                    />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SectionHeader
        title="Assignments"
        subtitle="Manage your pending and graded course assignments."
      />
      <div className="space-y-3">
        {assignments.map((a) => (
          <div
            key={a.id}
            onClick={() => setSelected(a.id)}
            className="bg-white rounded-2xl p-4 shadow-soft border border-slate-50 hover:shadow-card-hover hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                a.status === "graded"
                  ? "bg-emerald-50"
                  : a.status === "submitted"
                  ? "bg-blue-50"
                  : "bg-amber-50"
              }`}
            >
              {a.status === "graded" ? (
                <MaterialIcon
                  name="check_circle"
                  size={22}
                  className="text-emerald-500"
                />
              ) : a.status === "submitted" ? (
                <MaterialIcon name="schedule" size={22} className="text-blue-500" />
              ) : (
                <MaterialIcon
                  name="description"
                  size={22}
                  className="text-amber-500"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {a.title}
              </p>
              <p className="text-xs text-slate-400">
                {a.course} • Due {a.due}
              </p>
            </div>
            {a.marks !== null && (
              <span className="text-sm font-bold text-teal-600">
                {a.marks}/100
              </span>
            )}
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${
                a.status === "graded"
                  ? "bg-emerald-50 text-emerald-600"
                  : a.status === "submitted"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
