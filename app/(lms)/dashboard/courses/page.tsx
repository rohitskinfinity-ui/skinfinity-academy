"use client";

import { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import FilterChips from "../_components/FilterChips";
import ProgressBar from "../_components/ProgressBar";
import StatusBadge from "../_components/StatusBadge";
import EmptyState from "../_components/EmptyState";

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
    color: "from-emerald-600 to-teal-800",
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

export default function MyCoursesPage() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? courses
      : filter === "completed"
        ? courses.filter((c) => c.status === "completed")
        : courses.filter((c) => c.status === "in-progress");

  return (
    <div>
      <SectionHeader
        title="My Courses"
        subtitle="Track your progress across all enrolled programs."
      />
      <div className="mb-6">
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: "All Courses" },
            { id: "in-progress", label: "In Progress" },
            { id: "completed", label: "Completed" },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="book"
          title="No courses in this filter"
          description="Try another filter or enroll in a new program."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((c) => (
            <Link
              key={c.title}
              href={`/course/${encodeURIComponent(c.title)}`}
              className="group overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,118,110,0.1)]"
            >
              <div
                className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${c.color}`}
              >
                <div className="absolute inset-0 pattern-grid opacity-20" />
                <MaterialIcon
                  name="play_circle"
                  size={36}
                  className="relative text-white/90 transition-transform group-hover:scale-110"
                />
                {c.status === "completed" && (
                  <span className="absolute right-3 top-3">
                    <StatusBadge status="completed" label="Completed" />
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3
                  className="font-bold text-slate-900 transition-colors group-hover:text-teal-700"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {c.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400">{c.module}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {c.completed}/{c.lessons} lessons
                  </span>
                  <span className="font-bold text-teal-600">{c.progress}%</span>
                </div>
                <ProgressBar value={c.progress} className="mt-2" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
