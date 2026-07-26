"use client";

import { useMemo, useState } from "react";
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
import { cn } from "@/lib/utils";

interface EventItem {
  id: string;
  dateIso: string;
  day: string;
  month: string;
  year: string;
  category: string;
  title: string;
  location: string;
  venue: string;
  time: string;
  instructor: string;
  seatsLeft: number;
  image: string;
  price: string;
  slug: string;
}

const scheduleEvents: EventItem[] = [
  {
    id: "1",
    dateIso: "2025-08-15",
    day: "15",
    month: "AUG",
    year: "2025",
    category: "Hands-on Workshop",
    title: "Advanced Injectables & Lip Augmentation Masterclass",
    location: "Bengaluru",
    venue: "Skinfinity Clinical Campus, MG Road",
    time: "10:00 AM - 04:00 PM",
    instructor: "Dr. Priya Menon (MD)",
    seatsLeft: 3,
    image:
      "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹15,000",
    slug: "advanced-injectables-fillers",
  },
  {
    id: "2",
    dateIso: "2025-08-22",
    day: "22",
    month: "AUG",
    year: "2025",
    category: "Clinical Course",
    title: "Certificate in Clinical Cosmetology & Chemical Peels",
    location: "Mumbai",
    venue: "Medanta Health Center, Bandra West",
    time: "09:30 AM - 05:00 PM",
    instructor: "Dr. Rajesh Kumar (MD)",
    seatsLeft: 5,
    image:
      "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹65,000",
    slug: "certificate-clinical-cosmetology",
  },
  {
    id: "3",
    dateIso: "2025-09-05",
    day: "05",
    month: "SEP",
    year: "2025",
    category: "Laser Masterclass",
    title: "Laser Safety & Energy-Based Devices Hands-On Training",
    location: "Delhi",
    venue: "Apollo Hospitals Campus, Sarita Vihar",
    time: "10:00 AM - 03:30 PM",
    instructor: "Dr. Neha Gupta (MD)",
    seatsLeft: 4,
    image:
      "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹28,000",
    slug: "laser-energy-devices",
  },
  {
    id: "4",
    dateIso: "2025-09-12",
    day: "12",
    month: "SEP",
    year: "2025",
    category: "Fellowship Module",
    title: "Trichology, Scalp PRP & Hair Transplant Fundamentals",
    location: "Hyderabad",
    venue: "KIMS Hospital Medical Center, Jubilee Hills",
    time: "10:00 AM - 04:00 PM",
    instructor: "Dr. Vikram Singh (FISHRS)",
    seatsLeft: 2,
    image:
      "https://images.pexels.com/photos/3992854/pexels-photo-3992854.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹38,000",
    slug: "trichology-hair-sciences",
  },
  {
    id: "5",
    dateIso: "2025-09-20",
    day: "20",
    month: "SEP",
    year: "2025",
    category: "Live Demo & Lab",
    title: "Chemical Peels Formulation & Post-Peel Care Protocols",
    location: "Bengaluru",
    venue: "Skinfinity Clinical Campus, MG Road",
    time: "01:00 PM - 05:00 PM",
    instructor: "Dr. Arjun Reddy (MD)",
    seatsLeft: 6,
    image:
      "https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹12,000",
    slug: "chemical-peels-rejuvenation",
  },
  {
    id: "6",
    dateIso: "2025-10-02",
    day: "02",
    month: "OCT",
    year: "2025",
    category: "Hybrid Webinar",
    title: "Vascular Occlusion Safety & Emergency Management",
    location: "Online",
    venue: "Live Zoom Interactive HD Stream",
    time: "06:00 PM - 08:30 PM",
    instructor: "Dr. Aisha Sharma (MD)",
    seatsLeft: 15,
    image:
      "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹4,999",
    slug: "advanced-injectables-fillers",
  },
];

export default function UpcomingSchedule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    return scheduleEvents.filter((event) => {
      const matchesDate =
        !selectedDate ||
        event.dateIso === selectedDate ||
        event.dateIso.startsWith(selectedDate);

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.instructor.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query);

      return matchesDate && matchesQuery;
    });
  }, [selectedDate, searchQuery]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDate("");
    setCalendarOpen(false);
  };

  return (
    <section
      id="schedule"
      className="relative overflow-hidden border-b border-slate-200/60 bg-white py-8 lg:py-10"
    >
      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <span className="section-tag mb-3 inline-flex">
            Live Clinical Calendar 2025–2026
          </span>
          <h2
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Upcoming training sessions &{" "}
            <span className="text-teal-700">workshops</span>
          </h2>
          <p className="mt-2 text-base text-slate-500 sm:text-lg">
            Filter by keyword or date to find the next hands-on clinical
            masterclass near you.
          </p>
        </div>

        {/* Filter bar */}
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
                    : "border-slate-200 text-slate-700 hover:border-teal-300"
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
            Showing{" "}
            <span className="font-bold text-teal-700">
              {filteredEvents.length}
            </span>{" "}
            session{filteredEvents.length !== 1 ? "s" : ""}
            {selectedDate ? ` on ${selectedDate}` : ""}
          </p>
        </div>

        {filteredEvents.length > 0 ? (
          <ol className="space-y-3">
            {filteredEvents.map((item) => (
              <li key={item.id}>
                <article className="group overflow-hidden rounded-[20px] border border-slate-200/80 bg-white transition-all duration-300 hover:border-teal-200 hover:shadow-[0_12px_32px_rgba(15,118,110,0.1)]">
                  <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-3.5">
                    {/* Date */}
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

                    {/* Image in front of course name */}
                    <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:block">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Course details */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                          <MapPin className="size-3 text-teal-600" />
                          {item.location}
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold",
                            item.seatsLeft <= 3
                              ? "bg-rose-50 text-rose-600"
                              : "bg-teal-50 text-teal-700"
                          )}
                        >
                          {item.seatsLeft} seats left
                        </span>
                      </div>

                      <h3
                        className="truncate text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700 sm:text-lg"
                        style={{
                          fontFamily: "var(--font-heading), sans-serif",
                        }}
                      >
                        {item.title}
                      </h3>

                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3 text-slate-400" />
                          {item.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <User className="size-3 text-slate-400" />
                          {item.instructor}
                        </span>
                      </div>
                    </div>

                    {/* Price + CTA */}
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
              No sessions match your filters
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try another date or clear your search.
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
