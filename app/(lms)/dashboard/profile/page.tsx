"use client";

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

export default function ProfilePage() {
  return (
    <>
      <SectionHeader
        title="My Profile"
        subtitle="View your achievements and learning progress."
      />
      <div className="bg-white rounded-4xl p-6 shadow-card-hover border border-slate-50 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-3xl bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              DA
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500 border-4 border-white flex items-center justify-center">
              <MaterialIcon name="star" size={14} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2
                className="text-xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Dr. Arjun Reddy
              </h2>
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                Pro Member
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-3">
              Fellowship in Aesthetic Dermatology
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="mail" size={14} /> arjun.reddy@example.com
              </span>
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="phone" size={14} /> +91 98765 43210
              </span>
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="location_on" size={14} /> Hyderabad, India
              </span>
            </div>
          </div>
          <button className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
            <MaterialIcon name="edit" size={16} /> Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          {
            icon: "book",
            label: "Completed",
            value: "8",
            color: "bg-teal-50 text-teal-600",
          },
          {
            icon: "schedule",
            label: "Learning Hours",
            value: "248",
            color: "bg-blue-50 text-blue-600",
          },
          {
            icon: "military_tech",
            label: "Certificates",
            value: "3",
            color: "bg-amber-50 text-amber-600",
          },
          {
            icon: "emoji_events",
            label: "Rank",
            value: "#2",
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

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3
            className="font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Achievements & Badges
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🏆", label: "Top 5%", desc: "Excellence Award" },
              { icon: "🔥", label: "30-Day Streak", desc: "Consistency" },
              { icon: "📚", label: "Bookworm", desc: "50+ Hours" },
              { icon: "⚡", label: "Fast Learner", desc: "10 Courses" },
              { icon: "🎯", label: "Sharp Shooter", desc: "95% Avg Score" },
              { icon: "🌟", label: "Rising Star", desc: "Top 10 Rank" },
            ].map((a) => (
              <div
                key={a.label}
                className="text-center p-3 rounded-2xl bg-slate-50 hover:bg-teal-50 transition-colors group cursor-pointer"
              >
                <p className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">
                  {a.icon}
                </p>
                <p className="text-xs font-bold text-slate-700">{a.label}</p>
                <p className="text-[10px] text-slate-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3
            className="font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Learning Progress
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Advanced Injectables",
                progress: 78,
                color: "from-teal-500 to-teal-600",
              },
              {
                name: "Laser & Energy Devices",
                progress: 45,
                color: "from-blue-500 to-blue-600",
              },
              {
                name: "Chemical Peels",
                progress: 92,
                color: "from-emerald-500 to-emerald-600",
              },
              {
                name: "Trichology",
                progress: 30,
                color: "from-amber-500 to-amber-600",
              },
            ].map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.name}
                  </span>
                  <span className="text-xs font-bold text-teal-600">
                    {c.progress}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${c.color} rounded-full transition-all duration-500`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-white">
            <div className="flex items-center gap-2 mb-2">
              <MaterialIcon name="trending_up" size={18} />
              <p className="text-sm font-semibold">Weekly Goal</p>
            </div>
            <p
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              12 / 15 hours
            </p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-2">
              <div className="h-full w-[80%] bg-white rounded-full" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
