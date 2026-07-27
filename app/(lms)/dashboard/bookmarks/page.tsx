"use client";

import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import EmptyState from "../_components/EmptyState";

const bookmarks = [
  {
    title: "Lip Augmentation Technique",
    course: "Advanced Injectables & Fillers",
    module: "Module 4",
    time: "12:30",
  },
  {
    title: "Vascular Occlusion Management",
    course: "Advanced Injectables & Fillers",
    module: "Module 2",
    time: "08:15",
  },
  {
    title: "Laser Safety Protocols",
    course: "Laser & Energy Devices",
    module: "Module 2",
    time: "15:00",
  },
  {
    title: "Deep Peel Application",
    course: "Chemical Peels Mastery",
    module: "Module 6",
    time: "22:40",
  },
  {
    title: "Hair Growth Cycles",
    course: "Trichology & Hair Sciences",
    module: "Module 1",
    time: "05:20",
  },
  {
    title: "Patient Consultation Framework",
    course: "Facial Anatomy & Assessment",
    module: "Module 3",
    time: "10:00",
  },
];

export default function BookmarksPage() {
  if (bookmarks.length === 0) {
    return (
      <div>
        <SectionHeader
          title="Bookmarks"
          subtitle="Your saved lessons and timestamps for quick access."
        />
        <EmptyState
          icon="bookmark"
          title="No bookmarks yet"
          description="Save lessons from the course player to jump back in later."
          action={
            <Link
              href="/dashboard/courses"
              className="rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
            >
              Browse courses
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Bookmarks"
        subtitle="Your saved lessons and timestamps for quick access."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {bookmarks.map((b) => (
          <Link
            key={b.title}
            href={`/course/${encodeURIComponent(b.course)}`}
            className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:border-teal-100 hover:shadow-[0_12px_32px_rgba(15,118,110,0.08)]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <MaterialIcon name="play_circle" size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-teal-700">
                {b.title}
              </p>
              <p className="text-xs text-slate-400">
                {b.course} · {b.module}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-400">
              <MaterialIcon name="schedule" size={12} /> {b.time}
            </div>
            <MaterialIcon
              name="bookmark"
              size={18}
              className="shrink-0 text-teal-500"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
