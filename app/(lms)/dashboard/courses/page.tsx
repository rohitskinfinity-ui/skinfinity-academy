"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import FilterChips from "../_components/FilterChips";
import ProgressBar from "../_components/ProgressBar";
import StatusBadge from "../_components/StatusBadge";
import EmptyState from "../_components/EmptyState";
import {
  fetchStudentEnrollments,
  type StudentEnrollmentListItem,
} from "@/lib/api/student-client";
import { ApiError } from "@/lib/api/client";

import CourseCardSkeleton from "../_components/CourseCardSkeleton";

export default function MyCoursesPage() {
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState<StudentEnrollmentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchStudentEnrollments();
        if (!cancelled) setItems(res.items ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load courses",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "completed") {
      return items.filter((c) => c.status === "completed");
    }
    return items.filter((c) => c.status === "active");
  }, [filter, items]);

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

      {loading ? (
        <CourseCardSkeleton />
      ) : error ? (
        <EmptyState icon="error" title="Couldn’t load courses" description={error} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="book"
          title="No courses in this filter"
          description="Try another filter or contact the academy if you expect an enrollment."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((c) => {
            const progress = Math.round(Number(c.progress_pct) || 0);
            const program = c.workshop_title || c.course_title || c.title;
            return (
              <Link
                key={c.id}
                href={`/course/${encodeURIComponent(c.id)}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200 dark:hover:border-slate-700 hover:shadow-[0_12px_32px_rgba(13,148,136,0.1)]"
              >
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 p-5">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 ring-1 ring-teal-100 dark:ring-teal-900/50 transition-transform group-hover:scale-105">
                      <MaterialIcon name="play_circle" size={22} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="font-bold text-slate-900 dark:text-white transition-colors group-hover:text-teal-700 dark:group-hover:text-teal-400"
                        style={{
                          fontFamily: "var(--font-heading), sans-serif",
                        }}
                      >
                        {c.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{program}</p>
                    </div>
                  </div>
                  {c.status === "completed" ? (
                    <StatusBadge status="completed" label="Completed" />
                  ) : (
                    <StatusBadge status="in-progress" label="In progress" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 pt-4">
                  <p className="line-clamp-2 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {c.type === "workshop" ? "Workshop pathway" : "Course pathway"}{" "}
                    · {c.treatment_count} treatments
                  </p>
                  <div className="mt-auto pt-4">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Progress</span>
                      <span className="font-bold text-teal-700 dark:text-teal-400">{progress}%</span>
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
