"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";
import ProgressBar from "@/app/(lms)/dashboard/_components/ProgressBar";
import {
  STAGE_LABELS,
  courseProgress,
  getCourse,
  getTreatment,
  isStageUnlocked,
  stagesForEnrollment,
  videoKindLabel,
} from "@/lib/lms/mock-data";
import type {
  Booklet,
  Treatment,
  TreatmentStage,
  VideoKind,
  VideoLesson,
} from "@/lib/lms/types";

type TabId = "notes" | "booklets" | "discussion";
type ActiveItem =
  | { type: "video"; video: VideoLesson }
  | { type: "stage"; stage: TreatmentStage }
  | { type: "quiz" };

function kindBadgeClass(kind: VideoKind) {
  if (kind === "ai_procedure") return "bg-slate-900 text-white";
  if (kind === "clinical") return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
  return "bg-teal-50 text-teal-700 ring-1 ring-teal-100";
}

export default function CoursePlayerPage() {
  const router = useRouter();
  const params = useParams();
  const rawId =
    typeof params.id === "string" ? params.id : "custom-injectables";
  const course = getCourse(rawId) ?? getCourse("custom-injectables")!;

  const enrolledTreatments = useMemo(
    () =>
      course.treatments
        .map((et) => {
          const treatment = getTreatment(et.treatmentId);
          return treatment ? { et, treatment } : null;
        })
        .filter(Boolean) as {
        et: (typeof course.treatments)[0];
        treatment: Treatment;
      }[],
    [course]
  );

  const first = enrolledTreatments[0];
  const firstVideo = first?.treatment.theory.videos[0];

  const [activeTreatmentId, setActiveTreatmentId] = useState(
    first?.treatment.id ?? "botox"
  );
  const [activeItem, setActiveItem] = useState<ActiveItem>(
    firstVideo
      ? { type: "video", video: firstVideo }
      : { type: "stage", stage: "theory" }
  );
  const [openTreatments, setOpenTreatments] = useState<string[]>(
    first ? [first.treatment.id] : []
  );
  const [tab, setTab] = useState<TabId>("notes");
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [passedQuizzes, setPassedQuizzes] = useState<string[]>(() => {
    const fromEnrollment = course.treatments
      .filter((t) => t.completedStages.includes("theory"))
      .map((t) => t.treatmentId);
    if (typeof window === "undefined") return fromEnrollment;
    try {
      const raw = window.sessionStorage.getItem("lms-passed-quizzes");
      const stored: string[] = raw ? JSON.parse(raw) : [];
      return Array.from(new Set([...fromEnrollment, ...stored]));
    } catch {
      return fromEnrollment;
    }
  });

  useEffect(() => {
    const sync = () => {
      try {
        const raw = window.sessionStorage.getItem("lms-passed-quizzes");
        const stored: string[] = raw ? JSON.parse(raw) : [];
        if (stored.length === 0) return;
        setPassedQuizzes((prev) => Array.from(new Set([...prev, ...stored])));
      } catch {
        /* ignore */
      }
    };
    sync();
    window.addEventListener("focus", sync);
    return () => window.removeEventListener("focus", sync);
  }, []);

  const progress = courseProgress(course);
  const activePair = enrolledTreatments.find(
    (x) => x.treatment.id === activeTreatmentId
  );
  const activeTreatment = activePair?.treatment;
  const activeEnrollment = activePair?.et;

  const completedStages = useMemo(() => {
    if (!activeEnrollment) return [] as TreatmentStage[];
    const base = [...activeEnrollment.completedStages];
    if (
      passedQuizzes.includes(activeEnrollment.treatmentId) &&
      !base.includes("theory")
    ) {
      base.push("theory");
    }
    return base;
  }, [activeEnrollment, passedQuizzes]);

  const booklets: Booklet[] = activeTreatment?.theory.booklets ?? [];

  const headerSubtitle = activeTreatment
    ? `${activeTreatment.name} · ${
        activeItem.type === "video"
          ? videoKindLabel(activeItem.video.kind)
          : activeItem.type === "quiz"
            ? "Theory Quiz"
            : STAGE_LABELS[activeItem.stage]
      }`
    : "Select a treatment";

  const selectVideo = (treatmentId: string, video: VideoLesson) => {
    setActiveTreatmentId(treatmentId);
    setActiveItem({ type: "video", video });
  };

  const selectStage = (treatmentId: string, stage: TreatmentStage) => {
    setActiveTreatmentId(treatmentId);
    setActiveItem({ type: "stage", stage });
  };

  const toggleTreatment = (id: string) => {
    setOpenTreatments((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F8]">
      <header className="sticky top-0 z-30 shrink-0 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => router.push("/dashboard/courses")}
              className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              aria-label="Back to courses"
            >
              <MaterialIcon name="arrow_back" size={20} />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {course.title}
              </p>
              <p className="truncate text-xs text-slate-500">{headerSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurriculumOpen(true)}
              className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
              aria-label="Open treatments"
            >
              <MaterialIcon name="list" size={18} />
            </button>
            <button
              onClick={() => setBookmarked((b) => !b)}
              className={`rounded-xl p-2 transition-colors ${
                bookmarked
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
              aria-label="Bookmark lesson"
            >
              <MaterialIcon name="bookmark" size={18} />
            </button>
            {activeItem.type === "video" && (
              <button className="hidden items-center gap-1.5 rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 sm:flex">
                <MaterialIcon name="check" size={14} /> Mark complete
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
            {activeItem.type === "video" && (
              <VideoView
                video={activeItem.video}
                tab={tab}
                setTab={setTab}
                booklets={booklets}
                courseId={course.id}
                treatmentId={activeTreatmentId}
                theoryComplete={completedStages.includes("theory")}
              />
            )}

            {activeItem.type === "stage" &&
              activeTreatment &&
              activeEnrollment && (
                <StageView
                  treatment={activeTreatment}
                  stage={activeItem.stage}
                  unlocked={isStageUnlocked(
                    completedStages,
                    activeItem.stage,
                    activeEnrollment.handsOnIncluded
                  )}
                  completed={completedStages.includes(activeItem.stage)}
                  handsOnIncluded={activeEnrollment.handsOnIncluded}
                  courseId={course.id}
                  onOpenTheoryVideo={(video) =>
                    selectVideo(activeTreatment.id, video)
                  }
                  onOpenQuiz={() => setActiveItem({ type: "quiz" })}
                />
              )}

            {activeItem.type === "quiz" && activeTreatment && (
              <InlineQuizPrompt
                treatment={activeTreatment}
                courseId={course.id}
                alreadyPassed={completedStages.includes("theory")}
              />
            )}
          </div>
        </div>

        <aside className="hidden w-[300px] shrink-0 overflow-y-auto border-l border-slate-200/80 bg-white lg:block xl:w-[320px]">
          <TreatmentsPanel
            courseTitle={course.title}
            progress={progress}
            enrolledTreatments={enrolledTreatments}
            openTreatments={openTreatments}
            toggleTreatment={toggleTreatment}
            activeTreatmentId={activeTreatmentId}
            activeItem={activeItem}
            passedQuizzes={passedQuizzes}
            onSelectVideo={selectVideo}
            onSelectStage={selectStage}
            onSelectQuiz={(treatmentId) => {
              setActiveTreatmentId(treatmentId);
              setActiveItem({ type: "quiz" });
            }}
          />
        </aside>
      </div>

      {curriculumOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
            onClick={() => setCurriculumOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-[min(100%,20rem)] overflow-y-auto bg-white shadow-2xl lg:hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-bold text-slate-900">Treatments</p>
              <button
                onClick={() => setCurriculumOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <MaterialIcon name="close" size={18} />
              </button>
            </div>
            <TreatmentsPanel
              courseTitle={course.title}
              progress={progress}
              enrolledTreatments={enrolledTreatments}
              openTreatments={openTreatments}
              toggleTreatment={toggleTreatment}
              activeTreatmentId={activeTreatmentId}
              activeItem={activeItem}
              passedQuizzes={passedQuizzes}
              onSelectVideo={(tid, video) => {
                selectVideo(tid, video);
                setCurriculumOpen(false);
              }}
              onSelectStage={(tid, stage) => {
                selectStage(tid, stage);
                setCurriculumOpen(false);
              }}
              onSelectQuiz={(treatmentId) => {
                setActiveTreatmentId(treatmentId);
                setActiveItem({ type: "quiz" });
                setCurriculumOpen(false);
              }}
            />
          </aside>
        </>
      )}
    </div>
  );
}

function VideoView({
  video,
  tab,
  setTab,
  booklets,
  courseId,
  treatmentId,
  theoryComplete,
}: {
  video: VideoLesson;
  tab: TabId;
  setTab: (t: TabId) => void;
  booklets: Booklet[];
  courseId: string;
  treatmentId: string;
  theoryComplete: boolean;
}) {
  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <div className="relative aspect-video bg-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.25),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(15,23,42,0.5),transparent_40%)]" />
          {video.kind === "ai_procedure" && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
              AI Procedure
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform hover:scale-105 sm:h-[72px] sm:w-[72px]">
              <MaterialIcon name="play_arrow" size={34} className="ml-0.5" />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10">
            <ProgressBar
              value={35}
              trackClassName="bg-white/20"
              barClassName="bg-white"
              className="mb-3"
            />
            <div className="flex items-center justify-between text-white/85">
              <div className="flex items-center gap-3">
                <MaterialIcon name="play_arrow" size={18} />
                <MaterialIcon name="volume_up" size={18} />
                <span className="text-xs text-white/70">
                  12:30 / {video.duration}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MaterialIcon name="settings" size={18} />
                <MaterialIcon name="fullscreen" size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${kindBadgeClass(video.kind)}`}
            >
              {videoKindLabel(video.kind)}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              Theory
            </span>
          </div>
          <h1
            className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {video.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            {video.instructor && (
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="person" size={14} /> {video.instructor}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MaterialIcon name="schedule" size={14} /> {video.duration}
            </span>
          </div>

          {!theoryComplete && (
            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-teal-100 bg-teal-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-teal-900">
                  Finish theory with the quiz
                </p>
                <p className="mt-0.5 text-xs text-teal-700/80">
                  Videos + booklets first, then pass the quiz to unlock Observation.
                </p>
              </div>
              <Link
                href={`/course/${encodeURIComponent(courseId)}/quiz/${treatmentId}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
              >
                Take quiz <MaterialIcon name="arrow_forward" size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
        <div className="flex gap-1 border-b border-slate-100 px-2 pt-2 sm:px-3">
          {(
            [
              { id: "notes" as const, label: "Notes", icon: "sticky_note_2" },
              { id: "booklets" as const, label: "Booklets", icon: "menu_book" },
              { id: "discussion" as const, label: "Discussion", icon: "forum" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-t-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-slate-50 text-teal-700"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <MaterialIcon name={t.icon} size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="min-h-[180px] p-4 sm:p-5">
          {tab === "notes" && (
            <div>
              <textarea
                placeholder="Take notes while watching..."
                className="h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-teal-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-slate-400">Notes save automatically</p>
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800">
                  Save note
                </button>
              </div>
            </div>
          )}
          {tab === "booklets" && (
            <div className="space-y-2">
              {booklets.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition-colors hover:border-teal-100 hover:bg-teal-50/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm ring-1 ring-slate-100">
                    <MaterialIcon name="menu_book" size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {d.name}
                    </p>
                    <p className="text-xs text-slate-400">{d.size}</p>
                  </div>
                  <button className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-teal-700">
                    <MaterialIcon name="download" size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {tab === "discussion" && (
            <div className="space-y-4">
              {[
                {
                  name: "Dr. Sneha P.",
                  text: "How do we differentiate between vascular occlusion and bruising?",
                  time: "2 hours ago",
                },
                {
                  name: "Dr. Karthik N.",
                  text: "Vascular occlusion presents with immediate blanching and pain.",
                  time: "1 hour ago",
                },
              ].map((d) => (
                <div key={d.name + d.time} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700 ring-1 ring-teal-100">
                    {d.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800">
                        {d.name}
                      </p>
                      <span className="text-xs text-slate-400">{d.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">{d.text}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Join the discussion..."
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-teal-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
                />
                <button className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StageView({
  treatment,
  stage,
  unlocked,
  completed,
  handsOnIncluded,
  courseId,
  onOpenTheoryVideo,
  onOpenQuiz,
}: {
  treatment: Treatment;
  stage: TreatmentStage;
  unlocked: boolean;
  completed: boolean;
  handsOnIncluded: boolean;
  courseId: string;
  onOpenTheoryVideo: (video: VideoLesson) => void;
  onOpenQuiz: () => void;
}) {
  if (stage === "hands-on" && !handsOnIncluded) {
    return (
      <EmptyCard
        icon="block"
        title="Hands-on not included"
        body={`This customized enrollment does not include hands-on for ${treatment.name}.`}
      />
    );
  }

  if (!unlocked) {
    return (
      <EmptyCard
        icon="lock"
        title={`${STAGE_LABELS[stage]} locked`}
        body="Complete the previous stage (including the theory quiz) to unlock this step."
      />
    );
  }

  if (stage === "theory") {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600">
            Theory
          </p>
          <h1
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {treatment.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            {treatment.summary}
          </p>
        </div>

        <div className="space-y-2">
          {treatment.theory.videos.map((video) => (
            <button
              key={video.id}
              onClick={() => onOpenTheoryVideo(video)}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 text-left shadow-[0_2px_12px_rgba(15,23,42,0.03)] transition-all hover:border-teal-200 hover:shadow-[0_8px_24px_rgba(13,148,136,0.08)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-teal-600 ring-1 ring-slate-100">
                <MaterialIcon
                  name={
                    video.kind === "ai_procedure"
                      ? "smart_display"
                      : "play_circle"
                  }
                  size={22}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {video.title}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${kindBadgeClass(video.kind)}`}
                  >
                    {videoKindLabel(video.kind)}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{video.duration}</p>
              </div>
              <MaterialIcon
                name="chevron_right"
                size={18}
                className="text-slate-300"
              />
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <p className="mb-3 text-sm font-semibold text-slate-900">Booklets</p>
          <div className="space-y-2">
            {treatment.theory.booklets.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-600"
              >
                <MaterialIcon
                  name="menu_book"
                  size={16}
                  className="text-teal-600"
                />
                <span className="flex-1 truncate">{b.name}</span>
                <span className="text-xs text-slate-400">{b.size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/course/${encodeURIComponent(courseId)}/quiz/${treatment.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
          >
            {completed ? "Review quiz" : "Take theory quiz"}
            <MaterialIcon name="quiz" size={16} />
          </Link>
          <button
            onClick={onOpenQuiz}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Quiz overview
          </button>
        </div>
      </div>
    );
  }

  const content =
    stage === "observation"
      ? treatment.observation
      : stage === "training"
        ? treatment.training
        : treatment.handsOn;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700 ring-1 ring-teal-100">
          {STAGE_LABELS[stage]}
        </span>
        {completed && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
            Completed
          </span>
        )}
      </div>
      <h1
        className="text-2xl font-bold tracking-tight text-slate-900"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        {content.title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
        {content.description}
      </p>
      <ul className="mt-6 space-y-2">
        {(content.items ?? []).map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 text-sm text-slate-700"
          >
            <MaterialIcon
              name="check_circle"
              size={18}
              className="mt-0.5 shrink-0 text-teal-600"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptyCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-100">
        <MaterialIcon name={icon} size={28} />
      </div>
      <h2 className="mt-4 text-lg font-bold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{body}</p>
    </div>
  );
}

function InlineQuizPrompt({
  treatment,
  courseId,
  alreadyPassed,
}: {
  treatment: Treatment;
  courseId: string;
  alreadyPassed: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600">
        Theory quiz
      </p>
      <h1
        className="mt-2 text-2xl font-bold tracking-tight text-slate-900"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        {treatment.name}
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
        {alreadyPassed
          ? "Theory is complete for this treatment. Retake the quiz anytime for practice."
          : "Pass this quiz to finish Theory and unlock Observation."}
      </p>
      <Link
        href={`/course/${encodeURIComponent(courseId)}/quiz/${treatment.id}`}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
      >
        {alreadyPassed ? "Retake quiz" : "Start quiz"}
        <MaterialIcon name="arrow_forward" size={16} />
      </Link>
    </div>
  );
}

function TreatmentsPanel({
  courseTitle,
  progress,
  enrolledTreatments,
  openTreatments,
  toggleTreatment,
  activeTreatmentId,
  activeItem,
  passedQuizzes,
  onSelectVideo,
  onSelectStage,
  onSelectQuiz,
}: {
  courseTitle: string;
  progress: number;
  enrolledTreatments: {
    et: {
      treatmentId: string;
      handsOnIncluded: boolean;
      completedStages: TreatmentStage[];
      currentStage: TreatmentStage;
    };
    treatment: Treatment;
  }[];
  openTreatments: string[];
  toggleTreatment: (id: string) => void;
  activeTreatmentId: string;
  activeItem: ActiveItem;
  passedQuizzes: string[];
  onSelectVideo: (treatmentId: string, video: VideoLesson) => void;
  onSelectStage: (treatmentId: string, stage: TreatmentStage) => void;
  onSelectQuiz: (treatmentId: string) => void;
}) {
  const doneCount = enrolledTreatments.reduce((acc, { et }) => {
    const stages = stagesForEnrollment(et.handsOnIncluded);
    const completed = new Set(et.completedStages);
    if (passedQuizzes.includes(et.treatmentId)) completed.add("theory");
    return acc + stages.filter((s) => completed.has(s)).length;
  }, 0);
  const totalCount = enrolledTreatments.reduce(
    (acc, { et }) => acc + stagesForEnrollment(et.handsOnIncluded).length,
    0
  );

  return (
    <div className="p-4 sm:p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Your pathway</h3>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
          {doneCount}/{totalCount}
        </span>
      </div>
      <p className="mb-4 text-xs text-slate-400">{courseTitle}</p>

      <div className="mb-5 rounded-2xl bg-slate-50 p-3.5 ring-1 ring-slate-100">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-500">Progress</span>
          <span className="font-bold text-teal-700">{progress}%</span>
        </div>
        <ProgressBar value={progress} className="h-2" />
      </div>

      <div className="space-y-2.5">
        {enrolledTreatments.map(({ et, treatment }) => {
          const completed = new Set(et.completedStages);
          if (passedQuizzes.includes(et.treatmentId)) completed.add("theory");
          const stages = stagesForEnrollment(et.handsOnIncluded);
          const open = openTreatments.includes(treatment.id);

          return (
            <div
              key={treatment.id}
              className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white"
            >
              <button
                onClick={() => toggleTreatment(treatment.id)}
                className="flex w-full items-center justify-between gap-2 p-3.5 text-left transition-colors hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-900">
                    {treatment.name}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {et.handsOnIncluded ? "Hands-on included" : "No hands-on"}
                  </span>
                </div>
                <MaterialIcon
                  name="expand_more"
                  size={18}
                  className={`shrink-0 text-slate-400 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="space-y-1 border-t border-slate-100 px-2 py-2">
                  {stages.map((stage) => {
                    const unlocked = isStageUnlocked(
                      [...completed],
                      stage,
                      et.handsOnIncluded
                    );
                    const done = completed.has(stage);
                    const isActiveStage =
                      activeTreatmentId === treatment.id &&
                      ((activeItem.type === "stage" &&
                        activeItem.stage === stage) ||
                        (stage === "theory" &&
                          (activeItem.type === "video" ||
                            activeItem.type === "quiz")));

                    return (
                      <div key={stage}>
                        <button
                          disabled={!unlocked}
                          onClick={() => onSelectStage(treatment.id, stage)}
                          className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                            isActiveStage
                              ? "bg-teal-50 text-teal-800"
                              : unlocked
                                ? "text-slate-600 hover:bg-slate-50"
                                : "cursor-not-allowed text-slate-300"
                          }`}
                        >
                          {!unlocked ? (
                            <MaterialIcon name="lock" size={14} />
                          ) : done ? (
                            <MaterialIcon
                              name="check_circle"
                              size={14}
                              className="text-teal-600"
                            />
                          ) : (
                            <MaterialIcon
                              name="radio_button_unchecked"
                              size={14}
                              className="text-slate-300"
                            />
                          )}
                          {STAGE_LABELS[stage]}
                        </button>

                        {stage === "theory" && unlocked && (
                          <div className="ml-3 mt-0.5 space-y-0.5 border-l border-slate-100 pl-2">
                            {treatment.theory.videos.map((video) => {
                              const active =
                                activeTreatmentId === treatment.id &&
                                activeItem.type === "video" &&
                                activeItem.video.id === video.id;
                              return (
                                <button
                                  key={video.id}
                                  onClick={() =>
                                    onSelectVideo(treatment.id, video)
                                  }
                                  className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                                    active
                                      ? "bg-teal-50 text-teal-800"
                                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                  }`}
                                >
                                  <MaterialIcon
                                    name={
                                      video.kind === "ai_procedure"
                                        ? "smart_display"
                                        : "play_arrow"
                                    }
                                    size={14}
                                    className="mt-0.5 shrink-0"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-[11px] font-medium">
                                      {video.title}
                                    </p>
                                    <p className="text-[10px] text-slate-400">
                                      {videoKindLabel(video.kind)} ·{" "}
                                      {video.duration}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                            <button
                              onClick={() => onSelectQuiz(treatment.id)}
                              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] font-semibold transition-colors ${
                                activeTreatmentId === treatment.id &&
                                activeItem.type === "quiz"
                                  ? "bg-teal-50 text-teal-800"
                                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                              }`}
                            >
                              <MaterialIcon name="quiz" size={14} />
                              Theory quiz
                              {done && (
                                <span className="ml-auto text-[10px] font-semibold text-teal-600">
                                  Passed
                                </span>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {!et.handsOnIncluded && (
                    <p className="px-2.5 pb-1 pt-1 text-[10px] text-slate-400">
                      Hands-on excluded from this enrollment
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
