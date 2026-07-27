"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import { liveSessions } from "@/lib/lms/mock-data";

export default function LiveClassesPage() {
  const [reminded, setReminded] = useState<string[]>([]);
  const liveNow = liveSessions.find((c) => c.status === "live");
  const upcoming = liveSessions.filter((c) => c.status === "upcoming");

  return (
    <div>
      <SectionHeader
        title="Live Classes"
        subtitle="Weekly ~1 hour doctor sessions on Google Meet — booklet PPT shared via Drive."
      />

      {liveNow && (
        <div className="mb-6 rounded-2xl border border-emerald-100 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1.5 ring-1 ring-emerald-100">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                Live now
              </span>
            </div>
            <div className="flex-1">
              <h3
                className="text-lg font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {liveNow.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {liveNow.instructor} · {liveNow.duration} · {liveNow.attendees}{" "}
                connected
              </p>
              {liveNow.bookletLabel && (
                <a
                  href={liveNow.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
                >
                  <MaterialIcon name="folder_open" size={14} />
                  {liveNow.bookletLabel}
                </a>
              )}
            </div>
            <a
              href={liveNow.meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
            >
              <MaterialIcon name="video_camera_front" size={18} /> Join Meet
            </a>
          </div>
        </div>
      )}

      <h2 className="mb-3 text-sm font-bold text-slate-800">
        Upcoming weekly sessions
      </h2>
      <div className="space-y-3">
        {upcoming.map((lc) => {
          const day = lc.date.split(",")[0].split(" ")[1];
          const month = lc.date.split(",")[0].split(" ")[0];
          const isReminded = reminded.includes(lc.id);
          return (
            <div
              key={lc.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all hover:border-teal-100 sm:flex-row sm:items-center sm:p-5"
            >
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100">
                <span className="text-lg font-bold leading-none text-slate-800">
                  {day}
                </span>
                <span className="text-[9px] uppercase text-slate-400">
                  {month}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className="font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {lc.title}
                </h3>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MaterialIcon name="person" size={12} /> {lc.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialIcon name="schedule" size={12} /> {lc.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialIcon name="timelapse" size={12} /> {lc.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialIcon name="videocam" size={12} /> Google Meet
                  </span>
                </div>
                {lc.driveUrl && (
                  <a
                    href={lc.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    <MaterialIcon name="folder_open" size={14} />
                    {lc.bookletLabel ?? "Session booklet PPT"}
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={lc.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <MaterialIcon name="link" size={16} /> Meet link
                </a>
                <button
                  onClick={() =>
                    setReminded((prev) =>
                      prev.includes(lc.id)
                        ? prev.filter((t) => t !== lc.id)
                        : [...prev, lc.id]
                    )
                  }
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    isReminded
                      ? "border border-slate-200 bg-slate-50 text-slate-600"
                      : "bg-teal-600 text-white shadow-sm hover:bg-teal-700"
                  }`}
                >
                  <MaterialIcon
                    name={isReminded ? "notifications_active" : "notifications"}
                    size={16}
                  />
                  {isReminded ? "Reminder set" : "Set reminder"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
