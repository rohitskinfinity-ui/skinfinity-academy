"use client";

import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

const stats = [
  {
    icon: "book",
    label: "Active Courses",
    value: "5",
    hint: "+1 this month",
    color: "from-teal-500 to-teal-700",
    soft: "bg-teal-50 text-teal-700",
  },
  {
    icon: "schedule",
    label: "Learning Hours",
    value: "248",
    hint: "+18 hrs week",
    color: "from-cyan-500 to-blue-600",
    soft: "bg-cyan-50 text-cyan-700",
  },
  {
    icon: "emoji_events",
    label: "Certificates",
    value: "3",
    hint: "1 pending",
    color: "from-amber-500 to-orange-600",
    soft: "bg-amber-50 text-amber-700",
  },
  {
    icon: "trending_up",
    label: "Avg Score",
    value: "94%",
    hint: "Top 5%",
    color: "from-emerald-500 to-teal-600",
    soft: "bg-emerald-50 text-emerald-700",
  },
];

const courses = [
  {
    title: "Advanced Injectables & Fillers",
    progress: 78,
    module: "Module 4: Lip Augmentation",
    color: "from-teal-600 to-teal-800",
    lessonsLeft: 4,
  },
  {
    title: "Laser & Energy Devices",
    progress: 45,
    module: "Module 2: Safety Protocols",
    color: "from-cyan-600 to-blue-800",
    lessonsLeft: 9,
  },
  {
    title: "Chemical Peels Mastery",
    progress: 92,
    module: "Module 6: Deep Peels",
    color: "from-emerald-600 to-teal-800",
    lessonsLeft: 1,
  },
];

const assignments = [
  {
    title: "Case Study: Vascular Complication Management",
    course: "Advanced Injectables",
    due: "Aug 18",
    status: "Pending",
  },
  {
    title: "MCQ Assessment: Laser Safety",
    course: "Laser & Energy Devices",
    due: "Aug 20",
    status: "Pending",
  },
  {
    title: "Clinical Report: Chemical Peel Protocol",
    course: "Chemical Peels",
    due: "Aug 22",
    status: "Submitted",
  },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Hero welcome banner */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-800 via-teal-700 to-violet-900 p-6 text-white shadow-[0_20px_50px_rgba(15,118,110,0.25)] sm:p-8">
        <div className="absolute inset-0 pattern-grid opacity-20" aria-hidden />
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-12 left-1/3 h-40 w-40 rounded-full bg-violet-400/25 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-teal-50 backdrop-blur">
              <MaterialIcon name="auto_awesome" size={14} />
              Fellowship in Aesthetic Dermatology
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, Dr. Arjun
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-teal-100 sm:text-base">
              You&apos;re 78% through your fellowship. One more module and you
              unlock the next clinical workshop.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/dashboard/courses"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-teal-800 transition-all hover:bg-teal-50"
              >
                Continue learning
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
              <Link
                href="/dashboard/live"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                Join live session
              </Link>
            </div>
          </div>

          <div className="w-full max-w-xs rounded-[22px] border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-teal-100">Overall progress</span>
              <span className="font-bold text-white">78%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-teal-200 to-white" />
            </div>
            <p className="mt-3 text-[11px] text-teal-100">
              12 of 16 modules completed · 4 remaining
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-[22px] border border-slate-200/70 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,118,110,0.12)]"
          >
            <div
              className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-sm`}
            >
              <MaterialIcon name={s.icon} size={20} />
            </div>
            <p className="text-2xl font-bold tracking-tight text-slate-900">
              {s.value}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-slate-600">
              {s.label}
            </p>
            <p className="mt-1 text-[10px] font-medium text-teal-600">{s.hint}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* Continue learning */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">Continue Learning</h3>
                <p className="text-xs text-slate-400">Pick up where you left off</p>
              </div>
              <Link
                href="/dashboard/courses"
                className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View All <MaterialIcon name="chevron_right" size={14} />
              </Link>
            </div>
            <div className="space-y-2.5">
              {courses.map((c) => (
                <Link
                  href={`/course/${encodeURIComponent(c.title)}`}
                  key={c.title}
                  className="group flex items-center gap-3.5 rounded-2xl border border-transparent p-3 transition-all hover:border-teal-100 hover:bg-teal-50/40"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} shadow-md`}
                  >
                    <MaterialIcon
                      name="play_circle"
                      size={22}
                      className="text-white"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-teal-700">
                      {c.title}
                    </p>
                    <p className="truncate text-xs text-slate-400">{c.module}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-teal-600">
                        {c.progress}%
                      </span>
                    </div>
                  </div>
                  <span className="hidden text-[10px] font-semibold text-slate-400 sm:block">
                    {c.lessonsLeft} left
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          {/* Assignments */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">Pending Assignments</h3>
                <p className="text-xs text-slate-400">Stay ahead of deadlines</p>
              </div>
              <Link
                href="/dashboard/assignments"
                className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View All <MaterialIcon name="chevron_right" size={14} />
              </Link>
            </div>
            <div className="space-y-2">
              {assignments.map((a) => (
                <div
                  key={a.title}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 transition-colors hover:bg-slate-50"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      a.status === "Pending" ? "bg-amber-50" : "bg-emerald-50"
                    }`}
                  >
                    <MaterialIcon
                      name={
                        a.status === "Pending"
                          ? "radio_button_unchecked"
                          : "check_circle"
                      }
                      size={20}
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
                      {a.course} · Due {a.due}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      a.status === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <MaterialIcon name="calendar_month" size={16} />
                </div>
                <h3 className="font-bold text-slate-900">Upcoming</h3>
              </div>
            </div>
            <div className="space-y-2">
              {[
                {
                  day: "15",
                  month: "AUG",
                  title: "Injectables Workshop",
                  time: "3:00 PM",
                  type: "Workshop",
                },
                {
                  day: "18",
                  month: "AUG",
                  title: "MCQ Assessment",
                  time: "10:00 AM",
                  type: "Exam",
                },
                {
                  day: "22",
                  month: "AUG",
                  title: "Live Q&A Session",
                  time: "5:00 PM",
                  type: "Live",
                },
              ].map((e) => (
                <div
                  key={e.title}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 p-2.5 transition-colors hover:border-teal-100 hover:bg-teal-50/30"
                >
                  <div className="flex h-12 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white">
                    <span className="text-sm font-bold leading-none">{e.day}</span>
                    <span className="text-[8px] font-semibold opacity-80">
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

          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-teal-700 via-teal-800 to-violet-900 p-5 text-white shadow-[0_16px_40px_rgba(15,118,110,0.3)]">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="relative mb-4 flex items-center gap-2">
              <MaterialIcon name="military_tech" size={18} />
              <h3 className="font-bold">Achievements</h3>
            </div>
            <div className="relative grid grid-cols-3 gap-2">
              {[
                { icon: "workspace_premium", label: "Top 5%" },
                { icon: "local_fire_department", label: "30-Day Streak" },
                { icon: "menu_book", label: "Bookworm" },
              ].map((a) => (
                <div
                  key={a.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur"
                >
                  <MaterialIcon
                    name={a.icon}
                    size={22}
                    className="mx-auto mb-1.5 text-teal-100"
                  />
                  <p className="text-[9px] font-semibold text-teal-50">
                    {a.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
