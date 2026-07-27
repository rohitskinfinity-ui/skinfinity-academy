"use client";

import { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import FilterChips from "../_components/FilterChips";
import ProgressBar from "../_components/ProgressBar";
import StatusBadge from "../_components/StatusBadge";
import EmptyState from "../_components/EmptyState";
import {
  courseProgress,
  currentFocusLabel,
  getTreatment,
  studentCourses,
} from "@/lib/lms/mock-data";

export default function MyCoursesPage() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? studentCourses
      : filter === "completed"
        ? studentCourses.filter((c) => c.status === "completed")
        : studentCourses.filter((c) => c.status === "in-progress");

  return (
    <div>
      <SectionHeader
        title="My Courses"
        subtitle="Customized treatment sets — theory, observation, training, and optional hands-on."
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
          {filtered.map((c) => {
            const progress = courseProgress(c);
            const focus = currentFocusLabel(c);
            const treatmentNames = c.treatments
              .map((t) => getTreatment(t.treatmentId)?.name)
              .filter(Boolean);
            const handsOnCount = c.treatments.filter(
              (t) => t.handsOnIncluded
            ).length;

            return (
              <Link
                key={c.id}
                href={`/course/${encodeURIComponent(c.id)}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_12px_32px_rgba(13,148,136,0.1)]"
              >
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 transition-transform group-hover:scale-105">
                      <MaterialIcon name="play_circle" size={22} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="font-bold text-slate-900 transition-colors group-hover:text-teal-700"
                        style={{
                          fontFamily: "var(--font-heading), sans-serif",
                        }}
                      >
                        {c.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">{focus}</p>
                    </div>
                  </div>
                  {c.status === "completed" && (
                    <StatusBadge status="completed" label="Completed" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 pt-4">
                  <p className="line-clamp-2 text-[12px] leading-relaxed text-slate-500">
                    {treatmentNames.join(" · ")}
                  </p>
                  <div className="mt-auto pt-4">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        {c.treatments.length} treatments · {handsOnCount}{" "}
                        hands-on
                      </span>
                      <span className="font-bold text-teal-700">{progress}%</span>
                    </div>
                    <ProgressBar value={progress} className="h-2" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
