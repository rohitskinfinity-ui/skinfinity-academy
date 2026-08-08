"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SecureVideoPlayer from "@/components/lms/SecureVideoPlayer";
import ProgressBar from "@/app/(lms)/dashboard/_components/ProgressBar";
import EmptyState from "@/app/(lms)/dashboard/_components/EmptyState";
import { LMSThemeToggle } from "@/components/lms/LMSThemeToggle";
import { useLMSTheme } from "@/components/lms/LMSThemeProvider";
import CoursePlayerSkeleton from "@/components/lms/CoursePlayerSkeleton";
import {
  createStudentBookmark,
  fetchStudentEnrollment,
  requestBookletDownload,
  type StudentEnrollmentDetail,
  type StudentVideoMeta,
} from "@/lib/api/student-client";
import { ApiError } from "@/lib/api/client";
import { useStudentAuth } from "@/store/student-auth";

function formatDuration(seconds: number | null) {
  if (seconds == null || seconds <= 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function stageLabel(stage: string) {
  if (stage === "hands-on") return "Hands-on";
  return stage.charAt(0).toUpperCase() + stage.slice(1);
}

export default function CoursePlayerPage() {
  const params = useParams();
  const enrollmentId =
    typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  const { student } = useStudentAuth();
  const { theme } = useLMSTheme();

  const isDark = theme === "dark";

  const [detail, setDetail] = useState<StudentEnrollmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTreatmentId, setActiveTreatmentId] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [openTreatments, setOpenTreatments] = useState<string[]>([]);
  const [bookmarkBusy, setBookmarkBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!enrollmentId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudentEnrollment(enrollmentId);
      setDetail(data);
      const focusTreatment =
        data.continue_focus?.treatment_id ||
        data.treatments[0]?.treatment_id ||
        null;
      const focusVideo =
        data.continue_focus?.video_id ||
        data.treatments
          .flatMap((t) => t.videos)
          .find((v) => !v.progress.is_completed)?.id ||
        data.treatments[0]?.videos[0]?.id ||
        null;
      setActiveTreatmentId((prev) => prev || focusTreatment);
      setActiveVideoId((prev) => prev || focusVideo);
      if (focusTreatment) {
        setOpenTreatments((prev) =>
          prev.includes(focusTreatment) ? prev : [...prev, focusTreatment],
        );
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load course");
    } finally {
      setLoading(false);
    }
  }, [enrollmentId]);

  useEffect(() => {
    void load();
  }, [load]);

  const activeTreatment = useMemo(
    () => detail?.treatments.find((t) => t.treatment_id === activeTreatmentId) ?? null,
    [detail, activeTreatmentId],
  );

  const activeVideo: StudentVideoMeta | null = useMemo(() => {
    if (!detail || !activeVideoId) return null;
    for (const t of detail.treatments) {
      const v = t.videos.find((x) => x.id === activeVideoId);
      if (v) return v;
    }
    return null;
  }, [detail, activeVideoId]);

  const stageLocked = useMemo(() => {
    if (!activeTreatment || !activeVideo) return false;
    const st = activeTreatment.stages.find((s) => s.stage === activeVideo.stage);
    return st?.status === "locked";
  }, [activeTreatment, activeVideo]);

  async function onBookmark() {
    if (!detail || !activeTreatment || !activeVideo) return;
    setBookmarkBusy(true);
    try {
      await createStudentBookmark({
        enrollment_id: detail.id,
        treatment_id: activeTreatment.treatment_id,
        video_id: activeVideo.id,
        title: activeVideo.title,
        module_label: stageLabel(activeVideo.stage),
        timestamp_seconds: activeVideo.progress.last_position_seconds || 0,
      });
      setToast("Bookmark saved");
      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      setToast(err instanceof ApiError ? err.message : "Bookmark failed");
      setTimeout(() => setToast(null), 2500);
    } finally {
      setBookmarkBusy(false);
    }
  }

  async function openBooklet(bookletId: string) {
    if (!detail) return;
    try {
      const res = await requestBookletDownload(detail.id, bookletId);
      window.open(res.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setToast(err instanceof ApiError ? err.message : "Download failed");
      setTimeout(() => setToast(null), 2500);
    }
  }

  if (loading) {
    return <CoursePlayerSkeleton />;
  }

  if (error || !detail) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? "bg-slate-950" : "bg-slate-50"
        }`}
      >
        <EmptyState
          fullPage
          icon="error"
          title="Couldn’t load this course"
          description={error ?? "Enrollment not found."}
          action={
            <Link
              href="/dashboard/courses"
              className="text-sm font-semibold text-teal-700 dark:text-teal-400"
            >
              Back to My Courses
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Sticky Top Header Navigation */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl px-4 py-3 sm:px-6 transition-colors duration-300 ${
          isDark
            ? "border-slate-800 bg-slate-950/90 text-white"
            : "border-slate-200 bg-white/90 text-slate-900 shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          {/* Left: Back button + Course Title */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/dashboard/courses"
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all shrink-0 ${
                isDark
                  ? "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                  : "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              <MaterialIcon name="arrow_back" size={16} />
              <span className="hidden sm:inline">My Courses</span>
            </Link>
            <div
              className={`hidden sm:block h-4 w-px shrink-0 ${
                isDark ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
            <div className="min-w-0">
              <h1
                className={`truncate text-sm sm:text-base font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {detail.title}
              </h1>
              <p
                className={`truncate text-[11px] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {student?.full_name ?? "Student"} · {Math.round(detail.progress_pct)}% Complete
              </p>
            </div>
          </div>

          {/* Right: Progress Meter & Dark/Light Theme Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <LMSThemeToggle />

            <div className="hidden md:flex flex-col items-end gap-1">
              <span
                className={`text-[11px] font-semibold ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {Math.round(detail.progress_pct)}% Complete
              </span>
              <div className="w-36">
                <ProgressBar value={Math.round(detail.progress_pct)} className="h-1.5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main LMS Workspace */}
      <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Left Column: Video Player & Lesson Details Panel */}
          <div
            className={`flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${
              isDark
                ? "border-slate-800/80 bg-slate-900"
                : "border-slate-200/90 bg-white"
            }`}
          >
            {/* Video Container */}
            <div className="relative bg-black">
              {activeVideo && !stageLocked && activeVideo.has_file ? (
                <SecureVideoPlayer
                  key={activeVideo.id}
                  videoId={activeVideo.id}
                  title={activeVideo.title}
                  initialPosition={activeVideo.progress.last_position_seconds}
                  onProgress={(pct, completed) => {
                    setDetail((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        treatments: prev.treatments.map((t) => ({
                          ...t,
                          videos: t.videos.map((v) =>
                            v.id === activeVideo.id
                              ? {
                                  ...v,
                                  progress: {
                                    ...v.progress,
                                    watched_percent: pct,
                                    is_completed:
                                      v.progress.is_completed || completed,
                                  },
                                }
                              : v,
                          ),
                        })),
                      };
                    });
                  }}
                />
              ) : (
                <div
                  className={`flex aspect-video items-center justify-center p-6 text-center text-xs ${
                    isDark ? "bg-slate-950 text-slate-400" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 max-w-sm">
                    <MaterialIcon
                      name={stageLocked ? "lock" : "play_disabled"}
                      size={32}
                      className="text-slate-500"
                    />
                    <span>
                      {stageLocked
                        ? "This stage is locked. Complete the previous stage first."
                        : activeVideo
                          ? "Video file not available yet."
                          : "Select a lesson from the curriculum to start learning."}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Lesson Details Panel */}
            <div
              className={`p-5 sm:p-6 space-y-5 border-t transition-colors duration-300 ${
                isDark
                  ? "bg-gradient-to-b from-slate-900 to-slate-900/95 border-slate-800"
                  : "bg-white border-slate-100"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {activeVideo ? (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                          isDark
                            ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                            : "bg-teal-50 text-teal-700 border-teal-200"
                        }`}
                      >
                        {stageLabel(activeVideo.stage)}
                      </span>
                    ) : null}
                    {activeVideo?.duration_seconds ? (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] ${
                          isDark
                            ? "bg-slate-800 text-slate-400"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <MaterialIcon name="schedule" size={12} />
                        {formatDuration(activeVideo.duration_seconds)}
                      </span>
                    ) : null}
                  </div>

                  <h2
                    className={`text-lg sm:text-xl font-bold tracking-tight ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {activeVideo?.title ?? "No lesson selected"}
                  </h2>

                  {activeTreatment ? (
                    <p
                      className={`text-xs flex items-center gap-1.5 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      <MaterialIcon
                        name="folder_open"
                        size={14}
                        className={isDark ? "text-slate-500" : "text-slate-400"}
                      />
                      <span>
                        Module:{" "}
                        <strong
                          className={`font-medium ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          {activeTreatment.name}
                        </strong>
                      </span>
                    </p>
                  ) : null}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {detail.progress_pct >= 90 ? (
                    <Link
                      href={`/course/${detail.id}/certificate-quiz`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-amber-600/25 hover:from-amber-500 hover:to-amber-400 transition-all"
                    >
                      <MaterialIcon name="military_tech" size={16} />
                      <span>Certificate quiz</span>
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    disabled={!activeVideo || bookmarkBusy}
                    onClick={() => void onBookmark()}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all disabled:opacity-40 ${
                      isDark
                        ? "border-slate-700 bg-slate-800/80 text-slate-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
                        : "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <MaterialIcon name="bookmark" size={16} className="text-amber-400" />
                    <span>Bookmark</span>
                  </button>

                  {activeTreatment?.quiz ? (
                    <Link
                      href={`/course/${detail.id}/quiz/${activeTreatment.treatment_id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-teal-600/25 hover:from-teal-500 hover:to-teal-400 transition-all"
                    >
                      <MaterialIcon name={activeTreatment.quiz.passed ? "task_alt" : "quiz"} size={16} />
                      <span>{activeTreatment.quiz.passed ? "Quiz Passed" : "Take Module Quiz"}</span>
                    </Link>
                  ) : null}
                </div>
              </div>

              {/* Booklets / Materials */}
              {activeTreatment?.booklets?.length ? (
                <div
                  className={`border-t pt-4 space-y-2.5 ${
                    isDark ? "border-slate-800/80" : "border-slate-100"
                  }`}
                >
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    <MaterialIcon name="auto_stories" size={14} className="text-teal-500" />
                    Downloadable Study Booklets & Materials
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {activeTreatment.booklets.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        disabled={!b.has_file}
                        onClick={() => void openBooklet(b.id)}
                        className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs transition-all disabled:opacity-40 ${
                          isDark
                            ? "border-slate-700/60 bg-slate-800/50 text-slate-300 hover:border-teal-500/50 hover:bg-slate-800 hover:text-teal-300"
                            : "border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-300 hover:bg-teal-50/50 hover:text-teal-700"
                        }`}
                      >
                        <MaterialIcon
                          name="description"
                          size={16}
                          className="text-teal-500 group-hover:scale-110 transition-transform"
                        />
                        <span className="font-medium">{b.name}</span>
                        <MaterialIcon
                          name="download"
                          size={14}
                          className={isDark ? "text-slate-500 group-hover:text-teal-400" : "text-slate-400 group-hover:text-teal-600"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right Column: Curriculum Accordion Drawer */}
          <aside
            className={`flex flex-col rounded-2xl border shadow-2xl p-4 sm:p-5 h-fit max-h-[85vh] lg:sticky lg:top-20 transition-all duration-300 ${
              isDark
                ? "border-slate-800/80 bg-slate-900"
                : "border-slate-200/90 bg-white"
            }`}
          >
            <div
              className={`flex items-center justify-between pb-3.5 mb-3 border-b ${
                isDark ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <div>
                <h3
                  className={`text-sm font-bold tracking-wide uppercase flex items-center gap-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  <MaterialIcon name="format_list_bulleted" size={18} className="text-teal-500" />
                  Course Curriculum
                </h3>
                <p
                  className={`text-[11px] mt-0.5 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {detail.treatments.length} Modules · {detail.treatments.reduce((acc, t) => acc + t.videos.length, 0)} Lessons
                </p>
              </div>
            </div>

            {/* Accordion List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {detail.treatments.map((t, idx) => {
                const open = openTreatments.includes(t.treatment_id);
                const completedCount = t.videos.filter((v) => v.progress.is_completed).length;
                const isModuleDone = completedCount === t.videos.length && t.videos.length > 0;

                return (
                  <div
                    key={t.treatment_id}
                    className={`rounded-xl border transition-all ${
                      open
                        ? isDark
                          ? "border-slate-700 bg-slate-800/30"
                          : "border-slate-300 bg-slate-50"
                        : isDark
                          ? "border-slate-800/80 bg-slate-800/20 hover:border-slate-700/60 hover:bg-slate-800/40"
                          : "border-slate-200/80 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100/60"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 p-3.5 text-left"
                      onClick={() => {
                        setOpenTreatments((prev) =>
                          prev.includes(t.treatment_id)
                            ? prev.filter((id) => id !== t.treatment_id)
                            : [...prev, t.treatment_id],
                        );
                        setActiveTreatmentId(t.treatment_id);
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                            isModuleDone
                              ? "bg-emerald-500/20 text-emerald-500 dark:text-emerald-400"
                              : isDark
                                ? "bg-slate-800 text-slate-400"
                                : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isModuleDone ? <MaterialIcon name="check" size={14} /> : idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs font-bold truncate ${
                              isDark ? "text-slate-200" : "text-slate-800"
                            }`}
                          >
                            {t.name}
                          </p>
                          <p
                            className={`text-[10px] ${
                              isDark ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            {completedCount}/{t.videos.length} completed
                          </p>
                        </div>
                      </div>

                      <MaterialIcon
                        name={open ? "expand_less" : "expand_more"}
                        size={18}
                        className={`shrink-0 ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      />
                    </button>

                    {open ? (
                      <div
                        className={`border-t p-2 space-y-1 ${
                          isDark ? "border-slate-800/80" : "border-slate-200/80"
                        }`}
                      >
                        {t.videos.map((v) => {
                          const locked =
                            t.stages.find((s) => s.stage === v.stage)?.status === "locked";
                          const active = v.id === activeVideoId;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              disabled={locked}
                              onClick={() => {
                                setActiveTreatmentId(t.treatment_id);
                                setActiveVideoId(v.id);
                              }}
                              className={`group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${
                                active
                                  ? isDark
                                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm"
                                    : "bg-teal-50 text-teal-800 font-semibold border-l-2 border-teal-600 shadow-sm"
                                  : locked
                                    ? isDark
                                      ? "cursor-not-allowed text-slate-600"
                                      : "cursor-not-allowed text-slate-400"
                                    : isDark
                                      ? "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                                      : "text-slate-700 hover:bg-slate-200/60 hover:text-slate-900"
                              }`}
                            >
                              <MaterialIcon
                                name={
                                  v.progress.is_completed
                                    ? "check_circle"
                                    : locked
                                      ? "lock"
                                      : "play_circle"
                                }
                                filled={active || v.progress.is_completed}
                                size={16}
                                className={
                                  v.progress.is_completed
                                    ? "text-emerald-500 dark:text-emerald-400"
                                    : active
                                      ? "text-teal-600 dark:text-teal-400"
                                      : locked
                                        ? "text-slate-400 dark:text-slate-600"
                                        : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                                }
                              />
                              <span className="min-w-0 flex-1 truncate">
                                {v.title}
                              </span>
                              <span
                                className={`shrink-0 text-[10px] font-mono ${
                                  isDark ? "text-slate-500" : "text-slate-400"
                                }`}
                              >
                                {formatDuration(v.duration_seconds)}
                              </span>
                            </button>
                          );
                        })}

                        {t.quiz ? (
                          <Link
                            href={`/course/${detail.id}/quiz/${t.treatment_id}`}
                            className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs transition-all mt-1 ${
                              isDark
                                ? "bg-slate-800/50 border-slate-700/40 text-slate-300 hover:bg-slate-800 hover:text-teal-300"
                                : "bg-slate-100/70 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-teal-700"
                            }`}
                          >
                            <MaterialIcon
                              name={t.quiz.passed ? "verified" : "quiz"}
                              size={16}
                              className={t.quiz.passed ? "text-emerald-500" : "text-teal-600"}
                            />
                            <span className="flex-1 truncate">{t.quiz.title}</span>
                            {t.quiz.passed ? (
                              <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                Passed
                              </span>
                            ) : null}
                          </Link>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </main>

      {/* Toast Notification */}
      {toast ? (
        <div
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border px-4 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md ${
            isDark
              ? "bg-slate-900 border-slate-700 text-white"
              : "bg-slate-900 border-slate-800 text-white"
          }`}
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}


