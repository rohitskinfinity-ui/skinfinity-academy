"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import ProgressBar from "../_components/ProgressBar";

const badges = [
  { icon: "emoji_events", label: "Top 5%", desc: "Excellence Award", color: "bg-amber-50 text-amber-600" },
  { icon: "local_fire_department", label: "30-Day Streak", desc: "Consistency", color: "bg-orange-50 text-orange-600" },
  { icon: "menu_book", label: "Bookworm", desc: "50+ Hours", color: "bg-teal-50 text-teal-600" },
  { icon: "bolt", label: "Fast Learner", desc: "10 Courses", color: "bg-sky-50 text-sky-600" },
  { icon: "gps_fixed", label: "Sharp Shooter", desc: "95% Avg Score", color: "bg-emerald-50 text-emerald-600" },
  { icon: "star", label: "Rising Star", desc: "Top 10 Rank", color: "bg-violet-50 text-violet-600" },
];

export default function ProfilePage() {
  return (
    <div>
      <SectionHeader
        title="My Profile"
        subtitle="View your achievements and learning progress."
      />

      <div className="mb-6 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-2xl font-bold text-white sm:h-24 sm:w-24">
              DA
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-lg border-2 border-white bg-emerald-500">
              <MaterialIcon name="star" size={12} className="text-white" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h2
                className="text-xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Dr. Arjun Reddy
              </h2>
              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-600">
                Pro Member
              </span>
            </div>
            <p className="mb-3 text-sm text-slate-500">
              Fellowship in Aesthetic Dermatology
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
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
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <MaterialIcon name="edit" size={16} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {[
          { icon: "book", label: "Completed", value: "8", soft: "bg-teal-50 text-teal-600" },
          { icon: "schedule", label: "Learning Hours", value: "248", soft: "bg-sky-50 text-sky-600" },
          { icon: "military_tech", label: "Certificates", value: "3", soft: "bg-amber-50 text-amber-600" },
          { icon: "emoji_events", label: "Rank", value: "#2", soft: "bg-emerald-50 text-emerald-600" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)]"
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.soft}`}
            >
              <MaterialIcon name={s.icon} size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-bold text-slate-900">Achievements & Badges</h3>
          <div className="grid grid-cols-3 gap-2.5">
            {badges.map((a) => (
              <div
                key={a.label}
                className="rounded-xl bg-slate-50 p-3 text-center transition-colors hover:bg-teal-50/60"
              >
                <div
                  className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${a.color}`}
                >
                  <MaterialIcon name={a.icon} size={20} />
                </div>
                <p className="text-xs font-bold text-slate-700">{a.label}</p>
                <p className="text-[10px] text-slate-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-bold text-slate-900">Learning Progress</h3>
          <div className="space-y-4">
            {[
              { name: "Advanced Injectables", progress: 78 },
              { name: "Laser & Energy Devices", progress: 45 },
              { name: "Chemical Peels", progress: 92 },
              { name: "Trichology", progress: 30 },
            ].map((c) => (
              <div key={c.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    {c.name}
                  </span>
                  <span className="text-xs font-bold text-teal-600">
                    {c.progress}%
                  </span>
                </div>
                <ProgressBar value={c.progress} />
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 p-4 text-white">
            <div className="mb-2 flex items-center gap-2">
              <MaterialIcon name="trending_up" size={18} />
              <p className="text-sm font-semibold">Weekly Goal</p>
            </div>
            <p className="text-2xl font-bold">12 / 15 hours</p>
            <ProgressBar
              value={80}
              className="mt-2"
              trackClassName="bg-white/20"
              barClassName="bg-white"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
