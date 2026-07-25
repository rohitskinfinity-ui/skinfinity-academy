"use client";

import { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";

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

export default function MyCoursesPage() {
  const [filter, setFilter] = useState("all");
  const courses = [
    {
      title: "Advanced Injectables & Fillers",
      progress: 78,
      module: "Module 4: Lip Augmentation",
      lessons: 12,
      completed: 9,
      color: "from-teal-600 to-teal-800",
      status: "in-progress",
    },
    {
      title: "Laser & Energy Devices",
      progress: 45,
      module: "Module 2: Safety Protocols",
      lessons: 10,
      completed: 4,
      color: "from-blue-600 to-blue-800",
      status: "in-progress",
    },
    {
      title: "Chemical Peels Mastery",
      progress: 92,
      module: "Module 6: Deep Peels",
      lessons: 8,
      completed: 7,
      color: "from-emerald-600 to-emerald-800",
      status: "in-progress",
    },
    {
      title: "Trichology & Hair Sciences",
      progress: 30,
      module: "Module 1: Hair Biology",
      lessons: 14,
      completed: 4,
      color: "from-amber-600 to-amber-800",
      status: "in-progress",
    },
    {
      title: "Facial Anatomy & Assessment",
      progress: 100,
      module: "Completed",
      lessons: 6,
      completed: 6,
      color: "from-slate-600 to-slate-800",
      status: "completed",
    },
  ];

  const filtered =
    filter === "all"
      ? courses
      : filter === "completed"
      ? courses.filter((c) => c.status === "completed")
      : courses.filter((c) => c.status === "in-progress");

  return (
    <>
      <SectionHeader
        title="My Courses"
        subtitle="Track your progress across all enrolled programs."
      />
      <div className="flex gap-2 mb-6">
        {[
          { id: "all", label: "All Courses" },
          { id: "in-progress", label: "In Progress" },
          { id: "completed", label: "Completed" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              filter === f.id
                ? "bg-teal-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-teal-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {filtered.map((c) => (
          <Link
            key={c.title}
            href={`/course/${encodeURIComponent(c.title)}`}
            className="bg-white rounded-3xl p-5 shadow-soft border border-slate-50 hover:shadow-card-hover hover:-translate-y-0.5 transition-all cursor-pointer group block"
          >
            <div
              className={`w-full h-28 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 relative overflow-hidden`}
            >
              <div className="absolute inset-0 pattern-grid opacity-20" />
              <MaterialIcon
                name="play_circle"
                size={36}
                className="text-white/90 group-hover:scale-110 transition-transform"
              />
              {c.status === "completed" && (
                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <MaterialIcon name="check" size={12} /> Completed
                </span>
              )}
            </div>
            <h3
              className="font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              {c.title}
            </h3>
            <p className="text-xs text-slate-400 mb-3">{c.module}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">
                {c.completed}/{c.lessons} lessons
              </span>
              <span className="text-sm font-bold text-teal-600">
                {c.progress}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                style={{ width: `${c.progress}%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
