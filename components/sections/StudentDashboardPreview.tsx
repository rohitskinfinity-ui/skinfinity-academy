"use client";

import {
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  Medal,
  Play,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";
import GradientText from "@/components/shared/GradientText";

const chartData = [
  { week: "W1", hours: 4 },
  { week: "W2", hours: 7 },
  { week: "W3", hours: 5 },
  { week: "W4", hours: 9 },
  { week: "W5", hours: 8 },
  { week: "W6", hours: 12 },
];

const navItems = [
  { icon: BookOpen, label: "Courses", active: true },
  { icon: Calendar, label: "Schedule" },
  { icon: FileText, label: "Assignments" },
  { icon: Medal, label: "Certificates" },
  { icon: Bell, label: "Alerts" },
];

const lessons = [
  { title: "Advanced Injectables", progress: 78, module: "Module 4" },
  { title: "Laser Safety Protocols", progress: 45, module: "Module 2" },
  { title: "Chemical Peels Mastery", progress: 92, module: "Module 6" },
];

const assignments = [
  { title: "Case study: Lip anatomy", due: "Due tomorrow", done: false },
  { title: "MCQ: Energy devices", due: "Submitted", done: true },
];

export default function StudentDashboardPreview() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-100/40 blur-[120px]" />

      <div className="container-max relative">
        <SectionHeader
          tag="Learning Dashboard"
          title={
            <>
              Your personalized{" "}
              <GradientText>learning hub</GradientText>
            </>
          }
          subtitle="Track progress, manage schedules, and celebrate achievements — all in one place."
        />

        <FadeIn blur>
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-50/80 shadow-[0_24px_80px_rgba(15,23,42,0.1)]">
            <div className="grid lg:grid-cols-[200px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-slate-200/80 bg-white/90 p-5 backdrop-blur-xl lg:block">
                <div className="mb-8 flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-xs font-bold text-white">
                    SA
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Skinfinity</p>
                    <p className="text-[10px] text-slate-400">LMS Portal</p>
                  </div>
                </div>
                <nav className="space-y-1" aria-label="Dashboard preview navigation">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium ${
                          item.active
                            ? "bg-teal-50 text-teal-800"
                            : "text-slate-500"
                        }`}
                      >
                        <Icon className="size-4" aria-hidden />
                        {item.label}
                      </div>
                    );
                  })}
                </nav>
              </aside>

              {/* Main */}
              <div className="p-4 sm:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Welcome back, Dr. Arjun
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Fellowship in Aesthetic Dermatology
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Live session · 3:00 PM
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="space-y-4 lg:col-span-2">
                    {/* Stat widgets */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { label: "Courses", value: "5", icon: BookOpen },
                        { label: "Hours", value: "248", icon: TrendingUp },
                        { label: "Certificates", value: "3", icon: Medal },
                        { label: "Avg Score", value: "94%", icon: CheckCircle2 },
                      ].map((s) => {
                        const Icon = s.icon;
                        return (
                          <div
                            key={s.label}
                            className="rounded-[20px] bg-white p-4 shadow-soft ring-1 ring-slate-100"
                          >
                            <Icon className="mb-2 size-4 text-teal-600" aria-hidden />
                            <p className="text-xl font-bold text-slate-900">
                              {s.value}
                            </p>
                            <p className="text-[10px] text-slate-400">{s.label}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chart */}
                    <div className="rounded-[22px] bg-white p-4 shadow-soft ring-1 ring-slate-100">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-slate-900">
                          Learning hours
                        </h4>
                        <span className="text-[10px] font-medium text-teal-600">
                          +18% this month
                        </span>
                      </div>
                      <div className="h-36">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="hoursFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey="week"
                              tickLine={false}
                              axisLine={false}
                              tick={{ fontSize: 10, fill: "#94a3b8" }}
                            />
                            <Tooltip
                              contentStyle={{
                                borderRadius: 12,
                                border: "1px solid #e2e8f0",
                                fontSize: 12,
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="hours"
                              stroke="#0F766E"
                              strokeWidth={2}
                              fill="url(#hoursFill)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Recent lessons */}
                    <div className="rounded-[22px] bg-white p-4 shadow-soft ring-1 ring-slate-100">
                      <h4 className="mb-3 text-sm font-semibold text-slate-900">
                        Continue learning
                      </h4>
                      <div className="space-y-2.5">
                        {lessons.map((c) => (
                          <div
                            key={c.title}
                            className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                          >
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white">
                              <Play className="size-4" aria-hidden />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-semibold text-slate-900">
                                {c.title}
                              </p>
                              <p className="text-[10px] text-slate-400">{c.module}</p>
                              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600"
                                  style={{ width: `${c.progress}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs font-bold text-teal-700">
                              {c.progress}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right widgets */}
                  <div className="space-y-4">
                    <div className="rounded-[22px] bg-white p-4 shadow-soft ring-1 ring-slate-100">
                      <div className="mb-3 flex items-center gap-2">
                        <FileText className="size-4 text-teal-600" />
                        <h4 className="text-sm font-semibold text-slate-900">
                          Assignments
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {assignments.map((a) => (
                          <div
                            key={a.title}
                            className="rounded-xl bg-slate-50 p-3"
                          >
                            <p className="text-xs font-medium text-slate-800">
                              {a.title}
                            </p>
                            <p
                              className={`mt-1 text-[10px] font-semibold ${
                                a.done ? "text-emerald-600" : "text-amber-600"
                              }`}
                            >
                              {a.due}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[22px] bg-white p-4 shadow-soft ring-1 ring-slate-100">
                      <div className="mb-3 flex items-center gap-2">
                        <Bell className="size-4 text-violet-500" />
                        <h4 className="text-sm font-semibold text-slate-900">
                          Notifications
                        </h4>
                      </div>
                      <ul className="space-y-2.5 text-xs text-slate-600">
                        <li className="rounded-xl bg-violet-50/80 p-2.5">
                          New recording available: Facial anatomy
                        </li>
                        <li className="rounded-xl bg-teal-50/80 p-2.5">
                          Certificate ready to download
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-[22px] bg-gradient-to-br from-teal-700 to-teal-900 p-4 text-white">
                      <div className="mb-3 flex items-center gap-2">
                        <Medal className="size-4" />
                        <h4 className="text-sm font-semibold">Certificates</h4>
                      </div>
                      <p className="text-xs text-teal-100">
                        3 credentials earned · 1 pending verification
                      </p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
                        <div className="h-full w-3/4 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
