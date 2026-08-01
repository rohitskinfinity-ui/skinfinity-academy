"use client";

import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Card from "./_components/Card";
import ProgressBar from "./_components/ProgressBar";
import StatTile from "./_components/StatTile";
import {
  courseProgress,
  currentFocusLabel,
  liveSessions,
  practicalAssignments,
  studentCourses,
} from "@/lib/lms/mock-data";

const stats = [
  {
    icon: "book",
    label: "Active Courses",
    value: String(studentCourses.filter((c) => c.status === "in-progress").length),
    hint: "Custom treatment sets",
  },
  {
    icon: "biotech",
    label: "Treatments",
    value: String(
      studentCourses.reduce((acc, c) => acc + c.treatments.length, 0)
    ),
    hint: "Across enrollments",
  },
  {
    icon: "emoji_events",
    label: "Certificates",
    value: "3",
    hint: "1 pending",
  },
  {
    icon: "trending_up",
    label: "Avg Score",
    value: "94%",
    hint: "Top 5%",
  },
];

const continueCourses = studentCourses
  .filter((c) => c.status === "in-progress")
  .slice(0, 3)
  .map((c) => ({
    id: c.id,
    title: c.title,
    progress: courseProgress(c),
    focus: currentFocusLabel(c),
    treatmentsLeft: c.treatments.filter(
      (t) => !t.completedStages.includes(t.currentStage)
    ).length,
  }));

const assignmentTeasers = practicalAssignments
  .filter((a) => a.status === "pending" || a.status === "submitted")
  .slice(0, 3)
  .map((a) => ({
    title: a.title,
    course: a.course,
    due: a.due,
    status: a.status === "pending" ? "Pending" : "Submitted",
    stage: a.stage,
  }));

const liveNow = liveSessions.find((s) => s.status === "live");
const upcomingLive = liveSessions
  .filter((s) => s.status === "upcoming")
  .slice(0, 2)
  .map((s) => {
    const [monthDay] = s.date.split(",");
    const [month, day] = monthDay.split(" ");
    return {
      day,
      month: month.slice(0, 3).toUpperCase(),
      title: s.title,
      time: s.time,
      type: "Live",
    };
  });

export default function DashboardOverviewPage() {
  const primary = continueCourses[0];
  const overall = primary?.progress ?? 0;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-600">
              Your pathway
            </p>
            <h1
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Welcome back, Dr. Arjun
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {primary
                ? `Continue with ${primary.focus}. Watch theory videos, read booklets, then pass the quiz to unlock the next stage.`
                : "Your enrolled treatments are ready when you are."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={
                  primary
                    ? `/course/${encodeURIComponent(primary.id)}`
                    : "/dashboard/courses"
                }
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
              >
                Continue learning
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
              <Link
                href="/dashboard/live"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Weekly class
              </Link>
            </div>
          </div>
          <div className="w-full max-w-xs rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Course progress</span>
              <span className="font-bold text-teal-700">{overall}%</span>
            </div>
            <ProgressBar value={overall} className="h-2" />
            <p className="mt-3 text-[11px] text-slate-400">
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
                <h3 className="font-bold text-slate-900">Continue learning</h3>
                <p className="text-xs text-slate-400">
                  Resume at your current treatment and stage
                </p>
              </div>
              <Link
                href="/dashboard/courses"
                className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View all <MaterialIcon name="chevron_right" size={14} />
              </Link>
            </div>
            <div className="space-y-1">
              {continueCourses.map((c) => (
                <Link
                  href={`/course/${encodeURIComponent(c.id)}`}
                  key={c.id}
                  className="group flex items-center gap-3.5 rounded-xl p-3 transition-all hover:bg-slate-50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                    <MaterialIcon name="play_circle" size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-teal-700">
                      {c.title}
                    </p>
                    <p className="truncate text-xs text-slate-400">{c.focus}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <ProgressBar value={c.progress} className="flex-1" />
                      <span className="text-[11px] font-bold text-teal-700">
                        {c.progress}%
                      </span>
                    </div>
                  </div>
                  <span className="hidden text-[10px] font-semibold text-slate-400 sm:block">
                    {c.treatmentsLeft} active
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">Practical assignments</h3>
                <p className="text-xs text-slate-400">
                  Observation, training, and hands-on submissions
                </p>
              </div>
              <Link
                href="/dashboard/assignments"
                className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View all <MaterialIcon name="chevron_right" size={14} />
              </Link>
            </div>
            <div className="space-y-2">
              {assignmentTeasers.map((a) => (
                <div
                  key={a.title}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      a.status === "Pending" ? "bg-amber-50" : "bg-emerald-50"
                    }`}
                  >
                    <MaterialIcon
                      name={
                        a.status === "Pending"
                          ? "radio_button_unchecked"
                          : "check_circle"
                      }
                      size={18}
                      className={
                        a.status === "Pending"
                          ? "text-amber-500"
                          : "text-emerald-500"
                      }
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {a.title}
                    </p>
                    <p className="text-xs text-slate-400">
                      {a.course} · {a.stage} · Due {a.due}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      a.status === "Pending"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-600 ring-1 ring-slate-100">
                <MaterialIcon name="calendar_month" size={16} />
              </div>
              <h3 className="font-bold text-slate-900">Upcoming live</h3>
            </div>
            <div className="space-y-2">
              {upcomingLive.map((e) => (
                <div
                  key={e.title}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-2.5 transition-colors hover:border-teal-100 hover:bg-teal-50/40"
                >
                  <div className="flex h-11 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-50 text-slate-800 ring-1 ring-slate-100">
                    <span className="text-sm font-bold leading-none">{e.day}</span>
                    <span className="text-[8px] font-semibold text-slate-400">
                      {e.month}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-800">
                      {e.title}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {e.time} · {e.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Link
            href="/dashboard/live"
            className="block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all hover:border-teal-200 hover:shadow-[0_8px_24px_rgba(13,148,136,0.08)]"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                {liveNow ? "Live now" : "Next live"}
              </span>
            </div>
            <p className="font-bold text-slate-900">
              {liveNow?.title ?? "Weekly doctor class"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {liveNow
                ? `${liveNow.time} · ${liveNow.duration} · Zoom`
                : "Weekly · ~1 hour"}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-teal-700">
              View schedule <MaterialIcon name="arrow_forward" size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
