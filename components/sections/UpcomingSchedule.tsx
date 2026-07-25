"use client";

import { useState, useMemo } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Calendar from "@/components/ui/calendar";
import Link from "next/link";

interface EventItem {
  id: string;
  dateIso: string;
  day: string;
  month: string;
  year: string;
  category: string;
  categoryColor: string;
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
    category: "HANDS-ON WORKSHOP",
    categoryColor: "bg-teal-600",
    title: "Advanced Injectables & Lip Augmentation Masterclass",
    location: "Bengaluru",
    venue: "Skinfinity Clinical Campus, MG Road",
    time: "10:00 AM - 04:00 PM",
    instructor: "Dr. Priya Menon (MD)",
    seatsLeft: 3,
    image: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹15,000",
    slug: "advanced-injectables-fillers",
  },
  {
    id: "2",
    dateIso: "2025-08-22",
    day: "22",
    month: "AUG",
    year: "2025",
    category: "CLINICAL COURSE",
    categoryColor: "bg-blue-600",
    title: "Certificate in Clinical Cosmetology & Chemical Peels",
    location: "Mumbai",
    venue: "Medanta Health Center, Bandra West",
    time: "09:30 AM - 05:00 PM",
    instructor: "Dr. Rajesh Kumar (MD)",
    seatsLeft: 5,
    image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹65,000",
    slug: "certificate-clinical-cosmetology",
  },
  {
    id: "3",
    dateIso: "2025-09-05",
    day: "05",
    month: "SEP",
    year: "2025",
    category: "LASER MASTERCLASS",
    categoryColor: "bg-purple-600",
    title: "Laser Safety & Energy-Based Devices Hands-On Training",
    location: "Delhi",
    venue: "Apollo Hospitals Campus, Sarita Vihar",
    time: "10:00 AM - 03:30 PM",
    instructor: "Dr. Neha Gupta (MD)",
    seatsLeft: 4,
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹28,000",
    slug: "laser-energy-devices",
  },
  {
    id: "4",
    dateIso: "2025-09-12",
    day: "12",
    month: "SEP",
    year: "2025",
    category: "FELLOWSHIP MODULE",
    categoryColor: "bg-emerald-600",
    title: "Trichology, Scalp PRP & Hair Transplant Fundamentals",
    location: "Hyderabad",
    venue: "KIMS Hospital Medical Center, Jubilee Hills",
    time: "10:00 AM - 04:00 PM",
    instructor: "Dr. Vikram Singh (FISHRS)",
    seatsLeft: 2,
    image: "https://images.pexels.com/photos/3992854/pexels-photo-3992854.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹38,000",
    slug: "trichology-hair-sciences",
  },
  {
    id: "5",
    dateIso: "2025-09-20",
    day: "20",
    month: "SEP",
    year: "2025",
    category: "LIVE DEMO & LAB",
    categoryColor: "bg-amber-600",
    title: "Chemical Peels Formulation & Post-Peel Care Protocols",
    location: "Bengaluru",
    venue: "Skinfinity Clinical Campus, MG Road",
    time: "01:00 PM - 05:00 PM",
    instructor: "Dr. Arjun Reddy (MD)",
    seatsLeft: 6,
    image: "https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹12,000",
    slug: "chemical-peels-rejuvenation",
  },
  {
    id: "6",
    dateIso: "2025-10-02",
    day: "02",
    month: "OCT",
    year: "2025",
    category: "HYBRID WEBINAR",
    categoryColor: "bg-teal-700",
    title: "Vascular Occlusion Safety & Emergency Management",
    location: "Online",
    venue: "Live Zoom Interactive HD Stream",
    time: "06:00 PM - 08:30 PM",
    instructor: "Dr. Aisha Sharma (MD)",
    seatsLeft: 15,
    image: "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "₹4,999",
    slug: "advanced-injectables-fillers",
  },
];

export default function UpcomingSchedule() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const filteredEvents = useMemo(() => {
    return scheduleEvents.filter((event) => {
      // Filter by Calendar Date
      const matchesDate =
        !selectedDate || event.dateIso === selectedDate || event.dateIso.startsWith(selectedDate);

      // Filter by Search Query (Course Name / Title / Instructor / Category)
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
    <section id="schedule" className="py-8 lg:py-10 bg-slate-50/80 border-b border-slate-200/60 relative overflow-hidden select-none">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/50 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 border border-teal-100 px-3.5 py-1.5 rounded-full">
            Live Clinical Calendar 2025–2026
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Upcoming Training Sessions & <span className="gradient-text">Workshops</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg mt-2 max-w-2xl">
            Browse upcoming hands-on clinical masterclasses by selecting a date from the Shadcn calendar or searching by course name.
          </p>
        </div>

        {/* Filter Control Bar (Course Name Input & Shadcn UI Calendar Popover Date Picker) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Filter 1: Search by Course Name Input */}
            <div className="md:col-span-6 relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                <MaterialIcon name="search" size={14} className="text-teal-600" />
                Filter by Course Name / Keyword
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Injectables, Cosmetology, Laser, Chemical Peels..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />
                <MaterialIcon
                  name="search"
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <MaterialIcon name="close" size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter 2: Shadcn UI Popover Calendar Picker */}
            <div className="md:col-span-4 relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                <MaterialIcon name="calendar_month" size={14} className="text-teal-600" />
                Shadcn Calendar Filter
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCalendarOpen(!calendarOpen)}
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm font-semibold flex items-center justify-between transition-all ${
                    selectedDate
                      ? "border-teal-500 text-teal-700 bg-teal-50/50 shadow-xs"
                      : "border-slate-200 text-slate-700 hover:border-teal-300"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MaterialIcon name="event" size={18} className="text-teal-600 flex-shrink-0" />
                    <span className="truncate">
                      {selectedDate ? `Selected: ${selectedDate}` : "Pick Date from Calendar"}
                    </span>
                  </div>
                  <MaterialIcon
                    name="keyboard_arrow_down"
                    size={18}
                    className={`transition-transform flex-shrink-0 ${calendarOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Popover Calendar Dropdown */}
                {calendarOpen && (
                  <div className="absolute top-full left-0 mt-2 z-50 animate-in fade-in zoom-in-95 duration-200">
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
            </div>

            {/* Reset Filters CTA */}
            <div className="md:col-span-2 flex items-end justify-end">
              {(searchQuery || selectedDate) && (
                <button
                  onClick={clearFilters}
                  className="w-full py-3 px-4 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-rose-100"
                >
                  <MaterialIcon name="restart_alt" size={16} />
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Event Counter & Status Bar */}
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-xs font-bold text-slate-600">
            Showing <span className="text-teal-600 font-extrabold">{filteredEvents.length}</span> upcoming session{filteredEvents.length !== 1 ? "s" : ""}
            {selectedDate && <span className="text-teal-700 font-bold ml-1">for {selectedDate}</span>}
          </span>
          {filteredEvents.length === 0 && (
            <span className="text-xs text-rose-500 font-semibold">
              No matching courses found for your selected date or query.
            </span>
          )}
        </div>

        {/* Event Cards List */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:border-teal-200 transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Left Date Box & Content */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                  {/* Date Badge Box */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-850 text-white flex flex-col items-center justify-center flex-shrink-0 border border-slate-800 shadow-sm group-hover:scale-105 transition-transform">
                    <span
                      className="text-xl sm:text-2xl font-extrabold leading-none"
                      style={{ fontFamily: "var(--font-heading), sans-serif" }}
                    >
                      {item.day}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-teal-400 tracking-wider mt-0.5">
                      {item.month} {item.year}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`text-[10px] font-extrabold text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider ${item.categoryColor}`}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <MaterialIcon name="location_on" size={14} className="text-teal-600" />
                        {item.location}
                      </span>
                      <span className="text-xs font-medium text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                        {item.seatsLeft} Seats Remaining
                      </span>
                    </div>

                    <h3
                      className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug truncate"
                      style={{ fontFamily: "var(--font-heading), sans-serif" }}
                    >
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MaterialIcon name="schedule" size={14} className="text-slate-400" />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MaterialIcon name="person" size={14} className="text-slate-400" />
                        {item.instructor}
                      </span>
                      <span className="flex items-center gap-1 hidden lg:inline-flex text-slate-400">
                        <MaterialIcon name="place" size={14} />
                        {item.venue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Image & Action CTA */}
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="hidden sm:block w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Course Fee</span>
                    <span
                      className="text-xl font-extrabold text-slate-900 block"
                      style={{ fontFamily: "var(--font-heading), sans-serif" }}
                    >
                      {item.price}
                    </span>
                  </div>

                  <Link
                    href={`/enroll?program=${encodeURIComponent(item.title)}`}
                    className="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-teal flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    Reserve Seat
                    <MaterialIcon name="arrow_forward" size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft">
            <MaterialIcon name="event_busy" size={48} className="text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No courses match your selected date or query</h3>
            <p className="text-sm text-slate-500 mt-1 mb-6">Try picking another date from the calendar or clear your search input.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-2xl font-bold text-xs hover:bg-teal-700 transition-colors inline-flex items-center gap-1.5"
            >
              <MaterialIcon name="restart_alt" size={16} />
              Reset Date & Search Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
