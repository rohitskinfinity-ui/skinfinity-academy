"use client";

import { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import { liveSessions } from "@/lib/lms/mock-data";
import type { LiveSession, RecordingStatus, VideoPlatform } from "@/lib/lms/types";

function platformLabel(platform: VideoPlatform) {
  return platform === "zoom" ? "Zoom" : "Google Meet";
}

function recurrenceLabel(rule?: string) {
  if (!rule) return null;
  if (rule.includes("INTERVAL=2")) return "Every other day";
  if (rule.includes("FREQ=WEEKLY")) return "Weekly";
  if (rule.includes("FREQ=DAILY")) return "Daily";
  return "Recurring";
}

function recordingLabel(status: RecordingStatus) {
  switch (status) {
    case "ready":
      return "Recording ready";
    case "processing":
      return "Processing recording";
    case "failed":
      return "Recording failed";
    default:
      return "Recording pending";
  }
}

function SessionCard({
  session,
  reminded,
  onToggleReminder,
}: {
  session: LiveSession;
  reminded: boolean;
  onToggleReminder: () => void;
}) {
  const day = session.date.split(",")[0].split(" ")[1];
  const month = session.date.split(",")[0].split(" ")[0];
  const isCompleted = session.status === "completed";
  const joinLabel =
    session.platform === "zoom" ? "Join Zoom" : "Join Meet";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all hover:border-teal-100 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100">
          <span className="text-lg font-bold leading-none text-slate-800">
            {day}
          </span>
          <span className="text-[9px] uppercase text-slate-400">{month}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {isCompleted && session.recordingStatus && (
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  session.recordingStatus === "ready"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : session.recordingStatus === "processing"
                      ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {recordingLabel(session.recordingStatus)}
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
              {platformLabel(session.platform)}
            </span>
            {recurrenceLabel(session.recurrenceRule) && (
              <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-700 ring-1 ring-sky-100">
                {recurrenceLabel(session.recurrenceRule)}
              </span>
            )}
            {session.quiz && (
              <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-700 ring-1 ring-violet-100">
                {session.quiz.isRequired ? "Quiz required" : "Optional quiz"}
              </span>
            )}
          </div>

          <h3
            className="font-bold text-slate-900"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {session.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MaterialIcon name="person" size={12} /> {session.instructor}
            </span>
            <span className="flex items-center gap-1">
              <MaterialIcon name="schedule" size={12} /> {session.time}
            </span>
            <span className="flex items-center gap-1">
              <MaterialIcon name="timelapse" size={12} /> {session.duration}
            </span>
          </div>

          {isCompleted &&
            session.recordingStatus === "ready" &&
            session.recordingTitle && (
              <p className="mt-2 text-xs text-slate-500">
                Rewatch in course player:{" "}
                <span className="font-medium text-slate-700">
                  {session.recordingTitle}
                </span>
              </p>
            )}

          {session.driveUrl && !isCompleted && (
            <a
              href={session.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              <MaterialIcon name="folder_open" size={14} />
              {session.bookletLabel ?? "Session booklet PPT"}
            </a>
          )}

          {session.attachments && session.attachments.length > 0 && (
            <div className="mt-3 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Class materials
              </p>
              {session.attachments.map((a) => (
                <a
                  key={a.id}
                  href={a.fileUrl}
                  className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2 text-xs text-slate-700 transition-colors hover:border-teal-100 hover:bg-teal-50/40"
                >
                  <MaterialIcon name="description" size={14} className="text-teal-600" />
                  <span className="min-w-0 flex-1 truncate">{a.fileName}</span>
                  {a.sizeLabel && (
                    <span className="shrink-0 text-slate-400">{a.sizeLabel}</span>
                  )}
                </a>
              ))}
            </div>
          )}

          {session.quiz && isCompleted && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">
                {session.quiz.title} · {session.quiz.questionCount} questions
              </span>
              {session.quizAttemptPassed ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <MaterialIcon name="check_circle" size={12} /> Passed
                </span>
              ) : (
                <button
                  type="button"
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800"
                >
                  Take optional quiz
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
          {!isCompleted && (
            <>
              <a
                href={session.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
              >
                <MaterialIcon name="video_camera_front" size={16} />
                {joinLabel}
              </a>
              <button
                type="button"
                onClick={onToggleReminder}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  reminded
                    ? "border border-slate-200 bg-slate-50 text-slate-600"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <MaterialIcon
                  name={reminded ? "notifications_active" : "notifications"}
                  size={16}
                />
                {reminded ? "Reminder set" : "Remind me"}
              </button>
            </>
          )}
          {isCompleted && session.recordingStatus === "ready" && session.treatmentId && (
            <Link
              href={`/course/custom-injectables`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <MaterialIcon name="play_circle" size={16} />
              Watch in course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LiveClassesPage() {
  const [reminded, setReminded] = useState<string[]>([]);
  const liveNow = liveSessions.find((c) => c.status === "live");
  const upcoming = liveSessions.filter((c) => c.status === "upcoming");
  const past = liveSessions.filter((c) => c.status === "completed");

  return (
    <div>
      <SectionHeader
        title="Live Classes"
        subtitle="Weekly ~1 hour doctor sessions on Zoom. Recordings publish to your course player; optional quizzes and attachments per class."
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
                connected · {platformLabel(liveNow.platform)}
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
              href={liveNow.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
            >
              <MaterialIcon name="video_camera_front" size={18} /> Join Zoom
            </a>
          </div>
        </div>
      )}

      <h2 className="mb-3 text-sm font-bold text-slate-800">
        Upcoming weekly sessions
      </h2>
      <div className="mb-8 space-y-3">
        {upcoming.map((lc) => (
          <SessionCard
            key={lc.id}
            session={lc}
            reminded={reminded.includes(lc.id)}
            onToggleReminder={() =>
              setReminded((prev) =>
                prev.includes(lc.id)
                  ? prev.filter((t) => t !== lc.id)
                  : [...prev, lc.id]
              )
            }
          />
        ))}
      </div>

      <h2 className="mb-3 text-sm font-bold text-slate-800">
        Past classes & recordings
      </h2>
      <div className="space-y-3">
        {past.map((lc) => (
          <SessionCard
            key={lc.id}
            session={lc}
            reminded={false}
            onToggleReminder={() => undefined}
          />
        ))}
      </div>
    </div>
  );
}
