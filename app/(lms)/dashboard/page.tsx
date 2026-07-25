"use client";

import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";

/* ── Card wrapper ── */
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-3xl p-5 shadow-soft border border-slate-50 ${className}`}
    >
      {children}
    </div>
  );
}

export default function DashboardOverviewPage() {
  return (
    <>
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-slate-900"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          Welcome back, Dr. Arjun!
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          You're 78% through your fellowship. Keep going!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          {
            icon: "book",
            label: "Active Courses",
            value: "5",
            color: "bg-teal-50 text-teal-600",
          },
          {
            icon: "schedule",
            label: "Learning Hours",
            value: "248",
            color: "bg-blue-50 text-blue-600",
          },
          {
            icon: "emoji_events",
            label: "Certificates",
            value: "3",
            color: "bg-amber-50 text-amber-600",
          },
          {
            icon: "trending_up",
            label: "Avg Score",
            value: "94%",
            color: "bg-emerald-50 text-emerald-600",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-4 shadow-soft border border-slate-50"
          >
            <div
              className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}
            >
              <MaterialIcon name={s.icon} size={20} />
            </div>
            <p
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              {s.value}
            </p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3
                className="font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Continue Learning
              </h3>
              <Link
                href="/dashboard/courses"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                View All <MaterialIcon name="chevron_right" size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Advanced Injectables & Fillers",
                  progress: 78,
                  module: "Module 4: Lip Augmentation",
                  color: "from-teal-600 to-teal-800",
                },
                {
                  title: "Laser & Energy Devices",
                  progress: 45,
                  module: "Module 2: Safety Protocols",
                  color: "from-blue-600 to-blue-800",
                },
                {
                  title: "Chemical Peels Mastery",
                  progress: 92,
                  module: "Module 6: Deep Peels",
                  color: "from-emerald-600 to-emerald-800",
                },
              ].map((c) => (
                <Link
                  href={`/course/${encodeURIComponent(c.title)}`}
                  key={c.title}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <MaterialIcon
                      name="play_circle"
                      size={22}
                      className="text-white"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-teal-600 transition-colors">
                      {c.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{c.module}</p>
                    <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-teal-600">
                    {c.progress}%
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3
                className="font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Pending Assignments
              </h3>
              <Link
                href="/dashboard/assignments"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                View All <MaterialIcon name="chevron_right" size={14} />
              </Link>
            </div>
            <div className="space-y-2.5">
              {[
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
              ].map((a) => (
                <div
                  key={a.title}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      a.status === "Pending" ? "bg-amber-50" : "bg-emerald-50"
                    }`}
                  >
                    {a.status === "Pending" ? (
                      <MaterialIcon
                        name="radio_button_unchecked"
                        size={20}
                        className="text-amber-500"
                      />
                    ) : (
                      <MaterialIcon
                        name="check_circle"
                        size={20}
                        className="text-emerald-500"
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
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
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

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon name="calendar_month" size={18} className="text-teal-600" />
              <h3
                className="font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Upcoming
              </h3>
            </div>
            <div className="space-y-2">
              {[
                {
                  day: "15",
                  month: "AUG",
                  title: "Injectables Workshop",
                  time: "3:00 PM",
                },
                {
                  day: "18",
                  month: "AUG",
                  title: "MCQ Assessment",
                  time: "10:00 AM",
                },
                {
                  day: "22",
                  month: "AUG",
                  title: "Live Q&A Session",
                  time: "5:00 PM",
                },
              ].map((e) => (
                <div
                  key={e.title}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-50 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-teal-700 leading-none">
                      {e.day}
                    </span>
                    <span className="text-[8px] text-teal-500">{e.month}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">
                      {e.title}
                    </p>
                    <p className="text-[10px] text-slate-400">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon name="emoji_events" size={18} className="text-amber-500" />
              <h3
                className="font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Leaderboard
              </h3>
            </div>
            <div className="space-y-2">
              {[
                { rank: 1, name: "Dr. Sneha P.", points: "2,840", you: false },
                { rank: 2, name: "Dr. Arjun R.", points: "2,650", you: true },
                { rank: 3, name: "Dr. Kavya M.", points: "2,430", you: false },
              ].map((p) => (
                <div
                  key={p.rank}
                  className={`flex items-center gap-3 p-2.5 rounded-xl ${
                    p.you
                      ? "bg-teal-50 border border-teal-100"
                      : "hover:bg-slate-50"
                  } transition-colors`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      p.rank === 1
                        ? "bg-amber-100 text-amber-700"
                        : p.rank === 2
                        ? "bg-slate-200 text-slate-600"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {p.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">
                      {p.name}{" "}
                      {p.you && <span className="text-teal-600">(You)</span>}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-teal-600">
                    {p.points}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <MaterialIcon name="star" size={18} />
              <h3
                className="font-bold"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Achievements
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "🏆", label: "Top 5%" },
                { icon: "🔥", label: "30-Day Streak" },
                { icon: "📚", label: "Bookworm" },
              ].map((a) => (
                <div
                  key={a.label}
                  className="bg-white/10 backdrop-blur rounded-xl p-3 text-center"
                >
                  <p className="text-2xl mb-1">{a.icon}</p>
                  <p className="text-[9px] text-teal-100">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
