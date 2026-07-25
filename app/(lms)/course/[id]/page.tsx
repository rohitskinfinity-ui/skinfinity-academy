"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";

const curriculum = [
  {
    module: "Module 1: Foundations",
    lessons: [
      {
        title: "Introduction to Aesthetic Dermatology",
        duration: "15 min",
        done: true,
      },
      { title: "Skin Anatomy & Physiology", duration: "28 min", done: true },
      {
        title: "Patient Assessment & Consultation",
        duration: "22 min",
        done: true,
      },
    ],
  },
  {
    module: "Module 2: Botulinum Toxin",
    lessons: [
      {
        title: "Pharmacology of Botulinum Toxin",
        duration: "35 min",
        done: true,
      },
      {
        title: "Injection Techniques & Landmarks",
        duration: "42 min",
        done: true,
      },
      {
        title: "Managing Complications",
        duration: "30 min",
        done: false,
        current: true,
      },
      { title: "Case Studies & Review", duration: "25 min", done: false, locked: true },
    ],
  },
  {
    module: "Module 3: Dermal Fillers",
    lessons: [
      {
        title: "Filler Types & Properties",
        duration: "32 min",
        done: false,
        locked: true,
      },
      {
        title: "Facial Anatomy for Fillers",
        duration: "38 min",
        done: false,
        locked: true,
      },
      {
        title: "Injection Techniques",
        duration: "45 min",
        done: false,
        locked: true,
      },
    ],
  },
];

export default function CoursePlayerPage() {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState("Managing Complications");
  const [openModules, setOpenModules] = useState<number[]>([0, 1]);
  const [tab, setTab] = useState<"notes" | "downloads" | "discussion">("notes");

  const toggleModule = (i: number) => {
    setOpenModules((prev) =>
      prev.includes(i) ? prev.filter((m) => m !== i) : [...prev, i]
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <MaterialIcon name="arrow_back" size={20} />
            </button>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Advanced Injectables & Fillers
              </p>
              <p className="text-xs text-slate-400">Module 2 • Lesson 3 of 4</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors">
              <MaterialIcon name="bookmark" size={18} className="text-slate-600" />
            </button>
            <button className="px-4 py-2.5 bg-teal-600 text-white text-xs font-semibold rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-1.5">
              <MaterialIcon name="military_tech" size={14} /> Mark Complete
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Main video area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto h-[calc(100vh-65px)]">
          {/* Video player */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 group">
            <div className="absolute inset-0 pattern-grid opacity-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-transform">
                <MaterialIcon
                  name="play_arrow"
                  size={32}
                  className="text-white ml-1"
                />
              </button>
            </div>
            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/90 to-transparent">
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
                <div className="h-full w-[35%] bg-teal-500 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="text-white/80 hover:text-white">
                    <MaterialIcon name="play_arrow" size={18} />
                  </button>
                  <button className="text-white/80 hover:text-white">
                    <MaterialIcon name="volume_up" size={18} />
                  </button>
                  <span className="text-xs text-white/60">12:30 / 35:00</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-white/80 hover:text-white">
                    <MaterialIcon name="settings" size={18} />
                  </button>
                  <button className="text-white/80 hover:text-white">
                    <MaterialIcon name="fullscreen" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson info */}
          <div className="mt-5">
            <h1
              className="text-xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              {activeLesson}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
              <span className="flex items-center gap-1">
                <MaterialIcon name="group" size={14} /> Dr. Priya Menon
              </span>
              <span className="flex items-center gap-1">
                <MaterialIcon name="description" size={14} /> 35 min
              </span>
              <span className="flex items-center gap-1">
                <MaterialIcon name="group" size={14} /> 1,240 watching
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-slate-100 mb-4">
              {[
                { id: "notes" as const, label: "Notes", icon: "sticky_note_2" },
                { id: "downloads" as const, label: "Downloads", icon: "download" },
                {
                  id: "discussion" as const,
                  label: "Discussion",
                  icon: "forum",
                },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                    tab === t.id
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <MaterialIcon name={t.icon} size={16} /> {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-2xl p-5 shadow-soft border border-slate-50 min-h-[200px]">
              {tab === "notes" && (
                <div>
                  <textarea
                    placeholder="Take notes while watching..."
                    className="w-full h-32 p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 resize-none transition-all"
                  />
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs text-slate-400">
                      Notes are saved automatically
                    </p>
                    <button className="px-4 py-2 bg-teal-600 text-white text-xs font-semibold rounded-xl hover:bg-teal-700 transition-colors">
                      Save Note
                    </button>
                  </div>
                </div>
              )}
              {tab === "downloads" && (
                <div className="space-y-2">
                  {[
                    {
                      name: "Complication Management Protocol.pdf",
                      size: "2.4 MB",
                    },
                    { name: "Injection Landmarks Chart.pdf", size: "1.8 MB" },
                    { name: "Emergency Kit Checklist.pdf", size: "0.5 MB" },
                  ].map((d) => (
                    <div
                      key={d.name}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                        <MaterialIcon
                          name="description"
                          size={18}
                          className="text-teal-600"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">
                          {d.name}
                        </p>
                        <p className="text-xs text-slate-400">{d.size}</p>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-teal-50 text-teal-600 transition-colors">
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
                      text: "Great question! Vascular occlusion presents with immediate blanching and pain.",
                      time: "1 hour ago",
                    },
                  ].map((d, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700 flex-shrink-0">
                        {d.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-900">
                            {d.name}
                          </p>
                          <span className="text-xs text-slate-400">
                            {d.time}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-0.5">
                          {d.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Join the discussion..."
                      className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                    />
                    <button className="px-4 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between mt-6">
            <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
              <MaterialIcon name="arrow_back" size={16} /> Previous Lesson
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-teal-600 text-white rounded-2xl text-sm font-semibold hover:bg-teal-700 transition-all">
              Next Lesson <MaterialIcon name="arrow_forward" size={16} />
            </button>
          </div>
        </div>

        {/* Sidebar - Curriculum */}
        <aside className="hidden lg:block w-80 bg-white border-l border-slate-100 h-[calc(100vh-65px)] overflow-y-auto">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Course Curriculum
              </h3>
              <span className="text-xs text-slate-400">4/12 lessons</span>
            </div>

            {/* Progress */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500">Progress</span>
                <span className="font-bold text-teal-600">33%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[33%] bg-gradient-to-r from-teal-500 to-teal-600 rounded-full" />
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-2">
              {curriculum.map((mod, mi) => (
                <div
                  key={mod.module}
                  className="border border-slate-100 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleModule(mi)}
                    className="flex items-center justify-between w-full p-3 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 text-left">
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
                    <div className="px-2 pb-2 space-y-0.5">
                      {mod.lessons.map((les) => (
                        <button
                          key={les.title}
                          disabled={les.locked}
                          onClick={() =>
                            !les.locked && setActiveLesson(les.title)
                          }
                          className={`flex items-center gap-2.5 w-full p-2.5 rounded-xl text-left transition-all ${
                            activeLesson === les.title
                              ? "bg-teal-50 text-teal-700"
                              : les.locked
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          {les.locked ? (
                            <MaterialIcon
                              name="lock"
                              size={16}
                              className="text-slate-400 flex-shrink-0"
                            />
                          ) : les.done ? (
                            <MaterialIcon
                              name="check_circle"
                              size={16}
                              className="text-teal-500 flex-shrink-0"
                            />
                          ) : (
                            <MaterialIcon
                              name="radio_button_unchecked"
                              size={16}
                              className="text-slate-300 flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">
                              {les.title}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {les.duration}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
