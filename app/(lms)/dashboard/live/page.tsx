"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import EmptyState from "../_components/EmptyState";
import LiveClassesSkeleton from "../_components/LiveClassesSkeleton";
import {
  fetchStudentLiveClasses,
  setStudentLiveReminder,
  type StudentLiveSession,
} from "@/lib/api/student-client";
import { ApiError } from "@/lib/api/client";

type VideoPlatform = StudentLiveSession["platform"];
type RecordingStatus = StudentLiveSession["recording_status"];

function platformLabel(platform: VideoPlatform) {
  return platform === "zoom" ? "Zoom" : "Google Meet";
}

function recurrenceLabel(rule?: string | null) {
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

function dateParts(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { day: "—", month: "" };
  return {
    day: String(d.getDate()),
    month: d.toLocaleString(undefined, { month: "short" }),
  };
}

function timeLabel(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function SessionCard({
  session,
  reminding,
  onToggleReminder,
}: {
  session: StudentLiveSession;
  reminding: boolean;
  onToggleReminder: () => void;
}) {
  const { day, month } = dateParts(session.starts_at);
  const isCompleted = session.status === "completed";
  const joinLabel =
    session.platform === "zoom" ? "Join Zoom" : "Join Meet";

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl transition-all hover:border-teal-200 dark:hover:border-slate-700 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/80 ring-1 ring-slate-100 dark:ring-slate-700">
          <span className="text-lg font-bold leading-none text-slate-800 dark:text-white">
            {day}
          </span>
          <span className="text-[9px] uppercase text-slate-400 dark:text-slate-400">
            {month}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {isCompleted && session.recording_status && (
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  session.recording_status === "ready"
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-100 dark:ring-emerald-900/50"
                    : session.recording_status === "processing"
                      ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 ring-1 ring-amber-100 dark:ring-amber-900/50"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                {recordingLabel(session.recording_status)}
              </span>
            )}
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
              {platformLabel(session.platform)}
            </span>
            {recurrenceLabel(session.recurrence_rule) && (
              <span className="rounded-full bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 text-[10px] font-semibold text-sky-700 dark:text-sky-300 ring-1 ring-sky-100 dark:ring-sky-900/50">
                {recurrenceLabel(session.recurrence_rule)}
              </span>
            )}
            {session.quiz && (
              <span className="rounded-full bg-violet-50 dark:bg-violet-950/60 px-2.5 py-1 text-[10px] font-semibold text-violet-700 dark:text-violet-300 ring-1 ring-violet-100 dark:ring-violet-900/50">
                {session.quiz.is_required ? "Quiz required" : "Optional quiz"}
              </span>
            )}
          </div>

          <h3
            className="font-bold text-slate-900 dark:text-white"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {session.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MaterialIcon name="person" size={12} /> {session.instructor}
            </span>
            <span className="flex items-center gap-1">
              <MaterialIcon name="schedule" size={12} /> {timeLabel(session.starts_at)}
            </span>
            {session.duration_label ? (
              <span className="flex items-center gap-1">
                <MaterialIcon name="timelapse" size={12} /> {session.duration_label}
              </span>
            ) : null}
          </div>

          {isCompleted &&
            session.recording_status === "ready" &&
            session.recording_title && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Rewatch in course player:{" "}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {session.recording_title}
                </span>
              </p>
            )}

          {session.drive_url && !isCompleted && (
            <a
              href={session.drive_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300"
            >
              <MaterialIcon name="folder_open" size={14} />
              {session.booklet_label ?? "Session booklet PPT"}
            </a>
          )}

          {session.attachments.length > 0 && (
            <div className="mt-3 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Class materials
              </p>
              {session.attachments.map((a) => (
                <a
                  key={a.id}
                  href={a.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 transition-colors hover:border-teal-100 dark:hover:border-teal-900/50 hover:bg-teal-50/40 dark:hover:bg-teal-950/30"
                >
                  <MaterialIcon name="description" size={14} className="text-teal-600 dark:text-teal-400" />
                  <span className="min-w-0 flex-1 truncate">{a.file_name}</span>
                  {a.size_label && (
                    <span className="shrink-0 text-slate-400 dark:text-slate-500">
                      {a.size_label}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}

          {session.quiz && isCompleted && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {session.quiz.title} · {session.quiz.question_count} questions
              </span>
              {session.quiz_attempt_passed ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <MaterialIcon name="check_circle" size={12} /> Passed
                </span>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
          {!isCompleted && session.meeting_url && (
            <a
              href={session.meeting_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
            >
              <MaterialIcon name="video_camera_front" size={16} />
              {joinLabel}
            </a>
          )}
          {isCompleted &&
            session.recording_status === "ready" &&
            session.enrollment_id && (
              <Link
                href={`/course/${encodeURIComponent(session.enrollment_id)}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
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
  const [liveNow, setLiveNow] = useState<StudentLiveSession | null>(null);
  const [upcoming, setUpcoming] = useState<StudentLiveSession[]>([]);
  const [past, setPast] = useState<StudentLiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [remindingId, setRemindingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchStudentLiveClasses();
        if (!cancelled) {
          setLiveNow(res.live_now);
          setUpcoming(res.upcoming ?? []);
          setPast(res.past ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load live classes",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function toggleReminder(session: StudentLiveSession) {
    setRemindingId(session.id);
    try {
      const res = await setStudentLiveReminder(session.id, !session.reminded);
      const patch = (s: StudentLiveSession) =>
        s.id === session.id ? { ...s, reminded: res.reminded } : s;
      setLiveNow((cur) => (cur ? patch(cur) : cur));
      setUpcoming((items) => items.map(patch));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not update reminder",
      );
    } finally {
      setRemindingId(null);
    }
  }

  if (loading) {
    return <LiveClassesSkeleton />;
  }

  if (error && !liveNow && upcoming.length === 0 && past.length === 0) {
    return (
      <EmptyState icon="error" title="Couldn’t load live classes" description={error} />
    );
  }

  const empty = !liveNow && upcoming.length === 0 && past.length === 0;

  return (
    <div>
      <SectionHeader
        title="Live Classes"
        subtitle="Weekly doctor sessions on Zoom or Meet. Recordings publish to your course player; optional quizzes and attachments per class."
      />

      {error ? (
        <p className="mb-4 text-xs text-rose-600 dark:text-rose-400">{error}</p>
      ) : null}

      {empty ? (
        <EmptyState
          icon="video_camera_front"
          title="No live classes yet"
          description="When your faculty schedules Zoom or Meet sessions for your enrolled courses, they will appear here."
        />
      ) : null}

      {liveNow && (
        <div className="mb-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl sm:p-6 transition-colors">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 ring-1 ring-emerald-100 dark:ring-emerald-900/50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                Live now
              </span>
            </div>
            <div className="flex-1">
              <h3
                className="text-lg font-bold text-slate-900 dark:text-white"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {liveNow.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {liveNow.instructor}
                {liveNow.duration_label ? ` · ${liveNow.duration_label}` : ""}
                {liveNow.attendees > 0 ? ` · ${liveNow.attendees} connected` : ""}
                {` · ${platformLabel(liveNow.platform)}`}
              </p>
              {liveNow.booklet_label && liveNow.drive_url && (
                <a
                  href={liveNow.drive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300"
                >
                  <MaterialIcon name="folder_open" size={14} />
                  {liveNow.booklet_label}
                </a>
              )}
            </div>
            {liveNow.meeting_url ? (
              <a
                href={liveNow.meeting_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
              >
                <MaterialIcon name="video_camera_front" size={18} />{" "}
                {liveNow.platform === "zoom" ? "Join Zoom" : "Join Meet"}
              </a>
            ) : null}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <>
          <h2 className="mb-3 text-sm font-bold text-slate-800 dark:text-slate-200">
            Upcoming weekly sessions
          </h2>
          <div className="mb-8 space-y-3">
            {upcoming.map((lc) => (
              <SessionCard
                key={lc.id}
                session={lc}
                reminding={remindingId === lc.id}
                onToggleReminder={() => void toggleReminder(lc)}
              />
            ))}
          </div>
        </>
      )}

      {past.length > 0 && (
        <>
          <h2 className="mb-3 text-sm font-bold text-slate-800 dark:text-slate-200">
            Past classes & recordings
          </h2>
          <div className="space-y-3">
            {past.map((lc) => (
              <SessionCard
                key={lc.id}
                session={lc}
                reminding={false}
                onToggleReminder={() => undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
