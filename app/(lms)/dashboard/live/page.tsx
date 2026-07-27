"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";

const liveClasses = [
  {
    title: "Advanced Injection Techniques Live Demo",
    instructor: "Dr. Priya Menon",
    date: "Aug 15, 2026",
    time: "3:00 PM",
    duration: "2 hours",
    status: "live" as const,
    attendees: 1240,
  },
  {
    title: "Laser Safety Protocols Q&A",
    instructor: "Dr. Neha Gupta",
    date: "Aug 18, 2026",
    time: "5:00 PM",
    duration: "1 hour",
    status: "upcoming" as const,
    attendees: 0,
  },
  {
    title: "Chemical Peel Deep Dive Workshop",
    instructor: "Dr. Arjun Reddy",
    date: "Aug 22, 2026",
    time: "2:00 PM",
    duration: "3 hours",
    status: "upcoming" as const,
    attendees: 0,
  },
  {
    title: "Patient Consultation Roleplay",
    instructor: "Dr. Aisha Sharma",
    date: "Aug 25, 2026",
    time: "4:00 PM",
    duration: "1.5 hours",
    status: "upcoming" as const,
    attendees: 0,
  },
  {
    title: "Trichology Case Discussion",
    instructor: "Dr. Vikram Singh",
    date: "Aug 28, 2026",
    time: "6:00 PM",
    duration: "1 hour",
    status: "upcoming" as const,
    attendees: 0,
  },
];

export default function LiveClassesPage() {
  const [reminded, setReminded] = useState<string[]>([]);
  const liveNow = liveClasses.find((c) => c.status === "live");
  const upcoming = liveClasses.filter((c) => c.status === "upcoming");

  return (
    <div>
      <SectionHeader
        title="Live Classes"
        subtitle="Join live sessions and upcoming webinars from your instructors."
      />

      {liveNow && (
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-5 text-white sm:p-6">
          <div className="absolute inset-0 pattern-grid opacity-15" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Live Now
              </span>
            </div>
            <div className="flex-1">
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {liveNow.title}
              </h3>
              <p className="mt-1 text-sm text-red-100">
                {liveNow.instructor} · {liveNow.attendees.toLocaleString()} watching
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50">
              <MaterialIcon name="video_camera_front" size={18} /> Join Now
            </button>
          </div>
        </div>
      )}

      <h2 className="mb-3 text-sm font-bold text-slate-800">Upcoming</h2>
      <div className="space-y-3">
        {upcoming.map((lc) => {
          const day = lc.date.split(",")[0].split(" ")[1];
          const month = lc.date.split(",")[0].split(" ")[0];
          const isReminded = reminded.includes(lc.title);
          return (
            <div
              key={lc.title}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all hover:border-teal-100 sm:flex-row sm:items-center sm:p-5"
            >
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-teal-50">
                <span className="text-lg font-bold leading-none text-teal-700">
                  {day}
                </span>
                <span className="text-[9px] uppercase text-teal-500">{month}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className="font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {lc.title}
                </h3>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MaterialIcon name="person" size={12} /> {lc.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialIcon name="schedule" size={12} /> {lc.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialIcon name="timelapse" size={12} /> {lc.duration}
                  </span>
                </div>
              </div>
              <button
                onClick={() =>
                  setReminded((prev) =>
                    prev.includes(lc.title)
                      ? prev.filter((t) => t !== lc.title)
                      : [...prev, lc.title]
                  )
                }
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  isReminded
                    ? "border border-teal-200 bg-teal-50 text-teal-700"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                <MaterialIcon
                  name={isReminded ? "notifications_active" : "notifications"}
                  size={16}
                />
                {isReminded ? "Reminder set" : "Set Reminder"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
