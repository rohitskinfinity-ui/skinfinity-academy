"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Search,
  User,
  X,
} from "lucide-react";
import Calendar from "@/components/ui/calendar";
import {
  PLACEHOLDER_COURSE_IMAGE,
  fetchCalendarCourses,
  formatPrice,
} from "@/lib/api/public";
import type { PublicCalendarCourse } from "@/lib/api/types";
import { cn } from "@/lib/utils";

type CalendarCard = {
  id: string;
  dateIso: string;
  day: string;
  month: string;
  year: string;
  category: string;
  title: string;
  subtitle: string | null;
  location: string;
  dateRange: string;
  instructor: string | null;
  seatsLeft: number | null;
  image: string;
  price: string;
  slug: string;
  status: "upcoming" | "ongoing";
};

function formatParts(iso: string | null | undefined) {
  if (!iso) {
    return { dateIso: "", day: "—", month: "", year: "" };
  }
  const dateIso = String(iso).slice(0, 10);
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return {
      dateIso,
      day: dateIso.slice(8, 10),
      month: "",
      year: dateIso.slice(0, 4),
    };
  }
  return {
    dateIso,
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    year: d.toLocaleDateString("en-GB", { year: "numeric" }),
  };
}

function formatDateRange(from: string | null, to: string | null) {
  if (!from) return "Dates TBA";
  const start = new Date(from);
  const end = to ? new Date(to) : start;
  if (Number.isNaN(start.getTime())) return "Dates TBA";
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  if (Number.isNaN(end.getTime()) || start.toDateString() === end.toDateString()) {
    return start.toLocaleDateString("en-GB", opts);
  }
  return `${start.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", opts)}`;
}

function mapCourse(course: PublicCalendarCourse): CalendarCard {
  const start = course.starts_on || course.starts_at;
  const end = course.ends_on ?? course.ends_at;
  const parts = formatParts(start);
  const category =
    course.category_label || course.tag || course.level || course.mode || "Course";
  return {
    id: course.id,
    dateIso: parts.dateIso,
    day: parts.day,
    month: parts.month,
    year: parts.year,
    category,
    title: course.title,
    subtitle: course.next_event_title,
    location: course.location || course.venue || "Campus TBA",
    dateRange: formatDateRange(start, end),
    instructor: course.instructor_name,
    seatsLeft: course.seats_left,
    image: course.image_url || PLACEHOLDER_COURSE_IMAGE,
    price: formatPrice(course.list_price, course.currency),
    slug: course.slug,
    status: course.status,
  };
}

export default function UpcomingSchedule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [items, setItems] = useState<CalendarCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCalendarCourses({ status: "all", limit: 50 });
        if (cancelled) return;
        setItems((res.items ?? []).map(mapCourse));
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Failed to load calendar",
        );
        setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDate("");
    setCalendarOpen(false);
  };

  const visible = useMemo(() => {
    return items.filter((event) => {
      const dateOk =
        !selectedDate ||
        event.dateIso === selectedDate ||
        event.dateIso.startsWith(selectedDate);

      const query = searchQuery.toLowerCase().trim();
      const queryOk =
        !query ||
        event.title.toLowerCase().includes(query) ||
        (event.subtitle || "").toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        (event.instructor || "").toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query);

      return dateOk && queryOk;
    });
  }, [items, selectedDate, searchQuery]);

  return (
    <section
      id="schedule"
      className="relative overflow-hidden border-b border-slate-200/60 bg-white py-8 lg:py-10"
    >
      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <span className="section-tag mb-3 inline-flex">
            Course calendar
          </span>
          <h2
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Upcoming & ongoing{" "}
            <span className="text-teal-700">courses</span>
          </h2>
          <p className="mt-2 text-base text-slate-500 sm:text-lg">
            Browse published courses with upcoming or ongoing sessions. Filter
            by keyword or start date.
          </p>
        </div>

        <div className="mb-8 rounded-[24px] border border-slate-200/80 bg-[#f8fafc] p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Search courses
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Injectables, Laser, Cosmetology…"
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-teal-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="relative md:col-span-4">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Filter by date
              </label>
              <button
                type="button"
                onClick={() => setCalendarOpen(!calendarOpen)}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-3 text-sm font-semibold transition-all",
                  selectedDate
                    ? "border-teal-500 text-teal-700"
                    : "border-slate-200 text-slate-700 hover:border-teal-300",
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  <CalendarDays className="size-4 shrink-0 text-teal-600" />
                  {selectedDate || "Pick a date"}
                </span>
              </button>

              {calendarOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 animate-in fade-in zoom-in-95 duration-200">
                  <Calendar
                    selectedDate={selectedDate}
                    onSelectDate={(date) => {
                      setSelectedDate(date);
                      setCalendarOpen(false);
                    }}
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              {(searchQuery || selectedDate) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-600 transition-colors hover:border-teal-200 hover:text-teal-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between px-0.5">
          <p className="text-xs font-semibold text-slate-500">
            {loading ? (
              "Loading courses…"
            ) : (
              <>
                Showing{" "}
                <span className="font-bold text-teal-700">{visible.length}</span>{" "}
                course{visible.length !== 1 ? "s" : ""}
                {selectedDate ? ` on ${selectedDate}` : ""}
              </>
            )}
          </p>
        </div>

        {error ? (
          <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-6 py-10 text-center text-sm text-rose-700">
            {error}
          </div>
        ) : loading ? (
          <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] px-6 py-14 text-center text-sm text-slate-500">
            Loading courses…
          </div>
        ) : visible.length > 0 ? (
          <ol className="space-y-3">
            {visible.map((item) => (
              <li key={item.id}>
                <article className="group overflow-hidden rounded-[20px] border border-slate-200/80 bg-white transition-all duration-300 hover:border-teal-200 hover:shadow-[0_12px_32px_rgba(15,118,110,0.1)]">
                  <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-3.5">
                    <div className="flex shrink-0 items-center gap-3 sm:w-[88px] sm:flex-col sm:items-center sm:justify-center sm:gap-0.5 sm:rounded-2xl sm:bg-teal-50 sm:px-2 sm:py-3">
                      <div className="flex items-baseline gap-1.5 sm:flex-col sm:items-center sm:gap-0">
                        <span
                          className="text-2xl font-bold leading-none text-teal-800 sm:text-3xl"
                          style={{
                            fontFamily: "var(--font-heading), sans-serif",
                          }}
                        >
                          {item.day}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                          {item.month} {item.year}
                        </span>
                      </div>
                      <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-teal-700 sm:mt-1.5 sm:bg-white sm:ring-1 sm:ring-teal-100">
                        {item.category}
                      </span>
                    </div>

                    <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:block">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                          <MapPin className="size-3 text-teal-600" />
                          {item.location}
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold capitalize",
                            item.status === "ongoing"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-sky-50 text-sky-700",
                          )}
                        >
                          {item.status}
                        </span>
                        {item.seatsLeft != null ? (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold",
                              item.seatsLeft <= 3
                                ? "bg-rose-50 text-rose-600"
                                : "bg-teal-50 text-teal-700",
                            )}
                          >
                            {item.seatsLeft} seats left
                          </span>
                        ) : null}
                      </div>

                      <h3
                        className="truncate text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700 sm:text-lg"
                        style={{
                          fontFamily: "var(--font-heading), sans-serif",
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.subtitle ? (
                        <p className="truncate text-xs text-slate-500">
                          {item.subtitle}
                        </p>
                      ) : null}

                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3 text-slate-400" />
                          {item.dateRange}
                        </span>
                        {item.instructor ? (
                          <span className="inline-flex items-center gap-1">
                            <User className="size-3 text-slate-400" />
                            {item.instructor}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:border-t-0 sm:pt-0 sm:pl-2">
                      <div className="sm:text-right">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Fee
                        </p>
                        <p
                          className="text-lg font-bold text-slate-900"
                          style={{
                            fontFamily: "var(--font-heading), sans-serif",
                          }}
                        >
                          {item.price}
                        </p>
                      </div>

                      <Link
                        href={`/courses/${item.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-teal-800"
                      >
                        View Details
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] px-6 py-14 text-center">
            <CalendarDays className="mx-auto mb-3 size-10 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-900">
              No courses match your filters
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Set a start date on a published course to list it here.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-1.5 rounded-2xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
