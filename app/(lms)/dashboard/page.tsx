"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Card from "./_components/Card";
import ProgressBar from "./_components/ProgressBar";
import StatTile from "./_components/StatTile";
import EmptyState from "./_components/EmptyState";
import {
  fetchStudentDashboard,
  type StudentDashboard,
} from "@/lib/api/student-client";
import { ApiError } from "@/lib/api/client";

import DashboardSkeleton from "./_components/DashboardSkeleton";

export default function DashboardOverviewPage() {
  const [data, setData] = useState<StudentDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchStudentDashboard();
        if (!cancelled) setData(res);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load dashboard",
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

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <EmptyState
        icon="error"
        title="Couldn’t load dashboard"
        description={error ?? "Please try again."}
      />
    );
  }

  const primary = data.continue_learning[0];
  const displayName =
    data.student.display_name || data.student.full_name || "Student";
  const overall = Math.round(primary?.progress_pct ?? data.stats.avg_progress_pct);

  const stats = [
    {
      icon: "book",
      label: "Active Courses",
      value: String(data.stats.active_courses),
      hint: "Confirmed enrollments",
    },
    {
      icon: "biotech",
      label: "Treatments",
      value: String(data.stats.treatments),
      hint: "Across enrollments",
    },
    {
      icon: "trending_up",
      label: "Avg Progress",
      value: `${Math.round(data.stats.avg_progress_pct)}%`,
      hint: "Across pathways",
    },
    {
      icon: "school",
      label: "Enrollments",
      value: String(data.stats.total_enrollments),
      hint: "Active + completed",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl sm:p-7 transition-colors duration-300">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-600 dark:text-teal-400">
              Your pathway
            </p>
            <h1
              className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Welcome back, {displayName}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {primary?.focus
                ? `Continue with ${primary.focus.label}. Watch theory videos, read booklets, then pass the quiz to unlock the next stage.`
                : "Your enrolled treatments are ready when you are."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={
                  primary
                    ? `/course/${encodeURIComponent(primary.enrollment_id)}`
                    : "/dashboard/courses"
                }
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
              >
                Continue learning
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
              <Link
                href="/dashboard/courses"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                My courses
              </Link>
            </div>
          </div>
          <div className="w-full max-w-xs rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 ring-1 ring-slate-100 dark:ring-slate-800">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Course progress</span>
              <span className="font-bold text-teal-700 dark:text-teal-400">{overall}%</span>
            </div>
            <ProgressBar value={overall} className="h-2" />
            <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
              {primary?.title ?? "No active course"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {stats.map((s) => (
          <StatTile key={s.label} {...s} />
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Continue learning</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Resume at your current treatment and stage
                </p>
              </div>
              <Link
                href="/dashboard/courses"
                className="flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700"
              >
                View all <MaterialIcon name="chevron_right" size={14} />
              </Link>
            </div>
            {data.continue_learning.length === 0 ? (
              <EmptyState
                icon="play_circle"
                title="No active pathways"
                description="Once you’re enrolled, your courses will appear here."
              />
            ) : (
              <div className="space-y-1">
                {data.continue_learning.map((c) => (
                  <Link
                    href={`/course/${encodeURIComponent(c.enrollment_id)}`}
                    key={c.enrollment_id}
                    className="group flex items-center gap-3.5 rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 ring-1 ring-teal-100 dark:ring-teal-900/50">
                      <MaterialIcon name="play_circle" size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400">
                        {c.title}
                      </p>
                      <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                        {c.focus?.label ?? "Continue your pathway"}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <ProgressBar
                          value={Math.round(c.progress_pct)}
                          className="flex-1"
                        />
                        <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400">
                          {Math.round(c.progress_pct)}%
                        </span>
                      </div>
                    </div>
                    <span className="hidden text-[10px] font-semibold text-slate-400 dark:text-slate-500 sm:block">
                      {c.treatments_left} left
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-1 ring-slate-100 dark:ring-slate-700">
                  <MaterialIcon name="calendar_month" size={16} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Upcoming live</h3>
              </div>
              <Link
                href="/dashboard/live"
                className="text-xs font-semibold text-teal-700 dark:text-teal-400"
              >
                View all
              </Link>
            </div>
            {(data.upcoming_live ?? []).length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No upcoming live classes scheduled for your courses yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {(data.upcoming_live ?? []).map((ev) => {
                  const when = new Date(ev.starts_at);
                  const dateLabel = Number.isNaN(when.getTime())
                    ? ev.starts_at
                    : when.toLocaleString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      });
                  return (
                    <li
                      key={ev.id}
                      className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 ring-1 ring-slate-100 dark:ring-slate-800"
                    >
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {ev.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                        {dateLabel}
                        {ev.treatment_title ? ` · ${ev.treatment_title}` : ""}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
