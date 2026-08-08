"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import EmptyState from "../_components/EmptyState";
import BookmarksSkeleton from "../_components/BookmarksSkeleton";
import {
  deleteStudentBookmark,
  fetchStudentBookmarks,
  type StudentBookmark,
} from "@/lib/api/student-client";
import { ApiError } from "@/lib/api/client";

function formatTs(seconds: number | null) {
  if (seconds == null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function BookmarksPage() {
  const [items, setItems] = useState<StudentBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchStudentBookmarks();
      setItems(res.items ?? []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function remove(id: string) {
    try {
      await deleteStudentBookmark(id);
      setItems((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Delete failed");
    }
  }

  return (
    <div>
      <SectionHeader
        title="Bookmarks"
        subtitle="Your saved lessons and timestamps for quick access."
      />

      {loading ? (
        <BookmarksSkeleton />
      ) : error ? (
        <EmptyState icon="error" title="Couldn’t load bookmarks" description={error} />
      ) : items.length === 0 ? (
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
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((b) => (
            <div
              key={b.id}
              className="flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl transition-colors duration-300"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400">
                  <MaterialIcon name="bookmark" size={18} />
                </div>
                <button
                  type="button"
                  onClick={() => void remove(b.id)}
                  className="text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400"
                >
                  Remove
                </button>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">{b.title}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {b.treatment_name || "Treatment"}
                {b.module_label ? ` · ${b.module_label}` : ""}
                {" · "}
                {formatTs(b.timestamp_seconds)}
              </p>
              {b.enrollment_id ? (
                <Link
                  href={`/course/${b.enrollment_id}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300"
                >
                  Open course <MaterialIcon name="arrow_forward" size={14} />
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
