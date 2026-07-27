"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";
import ProgressBar from "@/app/(lms)/dashboard/_components/ProgressBar";

const curriculum = [
  {
    module: "Module 1: Foundations",
    lessons: [
      { title: "Introduction to Aesthetic Dermatology", duration: "15 min", done: true },
      { title: "Skin Anatomy & Physiology", duration: "28 min", done: true },
      { title: "Patient Assessment & Consultation", duration: "22 min", done: true },
    ],
  },
  {
    module: "Module 2: Botulinum Toxin",
    lessons: [
      { title: "Pharmacology of Botulinum Toxin", duration: "35 min", done: true },
      { title: "Injection Techniques & Landmarks", duration: "42 min", done: true },
      { title: "Managing Complications", duration: "30 min", done: false, current: true },
      { title: "Case Studies & Review", duration: "25 min", done: false, locked: true },
    ],
  },
  {
    module: "Module 3: Dermal Fillers",
    lessons: [
      { title: "Filler Types & Properties", duration: "32 min", done: false, locked: true },
      { title: "Facial Anatomy for Fillers", duration: "38 min", done: false, locked: true },
      { title: "Injection Techniques", duration: "45 min", done: false, locked: true },
    ],
  },
];

type TabId = "notes" | "resources" | "discussion";

export default function CoursePlayerPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = typeof params.id === "string" ? params.id : "Advanced Injectables & Fillers";
  const courseTitle = decodeURIComponent(rawId);

  const [activeLesson, setActiveLesson] = useState("Managing Complications");
  const [openModules, setOpenModules] = useState<number[]>([0, 1]);
  const [tab, setTab] = useState<TabId>("notes");
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const toggleModule = (i: number) => {
    setOpenModules((prev) =>
      prev.includes(i) ? prev.filter((m) => m !== i) : [...prev, i]
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <header className="sticky top-0 z-30 flex-shrink-0 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => router.push("/dashboard/courses")}
              className="rounded-xl p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Back to courses"
            >
              <MaterialIcon name="arrow_back" size={20} />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {courseTitle}
              </p>
              <p className="truncate text-xs text-slate-400">
                Module 2 · Lesson 3 of 4
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurriculumOpen(true)}
              className="rounded-xl p-2 text-slate-300 transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Open curriculum"
            >
              <MaterialIcon name="list" size={18} />
            </button>
            <button
              onClick={() => setBookmarked((b) => !b)}
              className={`rounded-xl p-2 transition-colors ${
                bookmarked
                  ? "bg-teal-500/20 text-teal-300"
                  : "text-slate-300 hover:bg-white/10"
              }`}
              aria-label="Bookmark lesson"
            >
              <MaterialIcon name="bookmark" size={18} />
            </button>
            <button className="hidden items-center gap-1.5 rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-500 sm:flex">
              <MaterialIcon name="check" size={14} /> Mark Complete
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-4 sm:p-6">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950">
              <div className="absolute inset-0 pattern-grid opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xl transition-transform hover:scale-105 sm:h-20 sm:w-20">
                  <MaterialIcon name="play_arrow" size={32} className="ml-0.5" />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <ProgressBar
                  value={35}
                  trackClassName="bg-white/20"
                  barClassName="bg-teal-400"
                  className="mb-3"
                />
                <div className="flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-3">
                    <MaterialIcon name="play_arrow" size={18} />
                    <MaterialIcon name="volume_up" size={18} />
                    <span className="text-xs text-white/60">12:30 / 35:00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MaterialIcon name="settings" size={18} />
                    <MaterialIcon name="fullscreen" size={18} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h1
                className="text-xl font-bold text-white sm:text-2xl"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {activeLesson}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MaterialIcon name="person" size={14} /> Dr. Priya Menon
                </span>
                <span className="flex items-center gap-1">
                  <MaterialIcon name="schedule" size={14} /> 35 min
                </span>
              </div>

              <div className="mt-5 flex gap-1 border-b border-white/10">
                {(
                  [
                    { id: "notes" as const, label: "Notes", icon: "sticky_note_2" },
                    { id: "resources" as const, label: "Resources", icon: "folder" },
                    { id: "discussion" as const, label: "Discussion", icon: "forum" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                      tab === t.id
                        ? "border-teal-400 text-teal-300"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <MaterialIcon name={t.icon} size={16} /> {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 min-h-[180px] rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                {tab === "notes" && (
                  <div>
                    <textarea
                      placeholder="Take notes while watching..."
                      className="h-32 w-full resize-none rounded-xl border border-white/10 bg-slate-900/60 p-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-slate-500">
                        Notes save automatically
                      </p>
                      <button className="rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-500">
                        Save Note
                      </button>
                    </div>
                  </div>
                )}
                {tab === "resources" && (
                  <div className="space-y-2">
                    {[
                      { name: "Complication Management Protocol.pdf", size: "2.4 MB" },
                      { name: "Injection Landmarks Chart.pdf", size: "1.8 MB" },
                      { name: "Emergency Kit Checklist.pdf", size: "0.5 MB" },
                    ].map((d) => (
                      <div
                        key={d.name}
                        className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
                          <MaterialIcon name="description" size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-200">
                            {d.name}
                          </p>
                          <p className="text-xs text-slate-500">{d.size}</p>
                        </div>
                        <button className="rounded-lg p-2 text-teal-300 hover:bg-teal-500/10">
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
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-xs font-bold text-teal-300">
                          {d.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-200">
                              {d.name}
                            </p>
                            <span className="text-xs text-slate-500">{d.time}</span>
                          </div>
                          <p className="mt-0.5 text-sm text-slate-400">{d.text}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Join the discussion..."
                        className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:border-teal-500/50 focus:outline-none"
                      />
                      <button className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-500">
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between gap-3">
                <button className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/5">
                  <MaterialIcon name="arrow_back" size={16} /> Previous
                </button>
                <button className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-500">
                  Next <MaterialIcon name="arrow_forward" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop curriculum */}
        <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-white/10 bg-slate-900 lg:block">
          <CurriculumPanel
            openModules={openModules}
            toggleModule={toggleModule}
            activeLesson={activeLesson}
            setActiveLesson={setActiveLesson}
          />
        </aside>
      </div>

      {/* Mobile curriculum drawer */}
      {curriculumOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setCurriculumOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-[min(100%,20rem)] overflow-y-auto bg-slate-900 shadow-2xl lg:hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-sm font-bold text-white">Curriculum</p>
              <button
                onClick={() => setCurriculumOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10"
              >
                <MaterialIcon name="close" size={18} />
              </button>
            </div>
            <CurriculumPanel
              openModules={openModules}
              toggleModule={toggleModule}
              activeLesson={activeLesson}
              setActiveLesson={(title) => {
                setActiveLesson(title);
                setCurriculumOpen(false);
              }}
            />
          </aside>
        </>
      )}
    </div>
  );
}

function CurriculumPanel({
  openModules,
  toggleModule,
  activeLesson,
  setActiveLesson,
}: {
  openModules: number[];
  toggleModule: (i: number) => void;
  activeLesson: string;
  setActiveLesson: (title: string) => void;
}) {
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-white">Course Curriculum</h3>
        <span className="text-xs text-slate-400">4/12</span>
      </div>
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-slate-400">Progress</span>
          <span className="font-bold text-teal-400">33%</span>
        </div>
        <ProgressBar value={33} trackClassName="bg-white/10" barClassName="bg-teal-400" />
      </div>
      <div className="space-y-2">
        {curriculum.map((mod, mi) => (
          <div
            key={mod.module}
            className="overflow-hidden rounded-xl border border-white/10"
          >
            <button
              onClick={() => toggleModule(mi)}
              className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-white/5"
            >
              <span className="text-xs font-bold text-slate-200">
                {mod.module}
              </span>
              <MaterialIcon
                name="expand_more"
                size={16}
                className={`text-slate-400 transition-transform ${
                  openModules.includes(mi) ? "rotate-180" : ""
                }`}
              />
            </button>
            {openModules.includes(mi) && (
              <div className="space-y-0.5 px-2 pb-2">
                {mod.lessons.map((les) => (
                  <button
                    key={les.title}
                    disabled={les.locked}
                    onClick={() => !les.locked && setActiveLesson(les.title)}
                    className={`flex w-full items-center gap-2.5 rounded-xl p-2.5 text-left transition-all ${
                      activeLesson === les.title
                        ? "bg-teal-500/15 text-teal-300"
                        : les.locked
                          ? "cursor-not-allowed opacity-40"
                          : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {les.locked ? (
                      <MaterialIcon name="lock" size={16} className="shrink-0 text-slate-500" />
                    ) : les.done ? (
                      <MaterialIcon name="check_circle" size={16} className="shrink-0 text-teal-400" />
                    ) : (
                      <MaterialIcon
                        name="radio_button_unchecked"
                        size={16}
                        className="shrink-0 text-slate-500"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{les.title}</p>
                      <p className="text-[10px] text-slate-500">{les.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
