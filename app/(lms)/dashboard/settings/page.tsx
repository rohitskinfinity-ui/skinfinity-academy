"use client";

import { useState } from "react";
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

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({
    emailNotif: true,
    pushNotif: true,
    weeklyDigest: false,
    courseReminders: true,
    twoFactor: false,
    autoPlay: true,
    subtitles: false,
  });

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
        on ? "bg-teal-500" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform`}
        style={{ transform: on ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );

  return (
    <>
      <SectionHeader
        title="Settings"
        subtitle="Manage your account preferences and configurations."
      />
      <div className="space-y-5">
        <Card>
          <h3
            className="font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Notification Preferences
          </h3>
          <div className="space-y-3">
            {[
              {
                key: "emailNotif",
                label: "Email Notifications",
                desc: "Receive course updates via email",
              },
              {
                key: "pushNotif",
                label: "Push Notifications",
                desc: "Get real-time alerts on your device",
              },
              {
                key: "weeklyDigest",
                label: "Weekly Digest",
                desc: "Summary of your weekly activity",
              },
              {
                key: "courseReminders",
                label: "Course Reminders",
                desc: "Reminders for live classes and deadlines",
              },
            ].map((s) => (
              <div
                key={s.key}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {s.label}
                  </p>
                  <p className="text-xs text-slate-400">{s.desc}</p>
                </div>
                <Toggle
                  on={prefs[s.key as keyof typeof prefs]}
                  onClick={() =>
                    setPrefs({
                      ...prefs,
                      [s.key]: !prefs[s.key as keyof typeof prefs],
                    })
                  }
                />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3
            className="font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Playback Preferences
          </h3>
          <div className="space-y-3">
            {[
              {
                key: "autoPlay",
                label: "Auto-play Next Lesson",
                desc: "Automatically play the next lesson",
              },
              {
                key: "subtitles",
                label: "Show Subtitles",
                desc: "Display subtitles by default",
              },
            ].map((s) => (
              <div
                key={s.key}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {s.label}
                  </p>
                  <p className="text-xs text-slate-400">{s.desc}</p>
                </div>
                <Toggle
                  on={prefs[s.key as keyof typeof prefs]}
                  onClick={() =>
                    setPrefs({
                      ...prefs,
                      [s.key]: !prefs[s.key as keyof typeof prefs],
                    })
                  }
                />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3
            className="font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Security
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-slate-400">
                  Add an extra layer of security
                </p>
              </div>
              <Toggle
                on={prefs.twoFactor}
                onClick={() =>
                  setPrefs({ ...prefs, twoFactor: !prefs.twoFactor })
                }
              />
            </div>
            <button className="w-full py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <MaterialIcon name="lock" size={16} /> Change Password
            </button>
          </div>
        </Card>
      </div>
    </>
  );
}
