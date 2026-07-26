"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selectedDate?: string; // YYYY-MM-DD
  onSelectDate: (dateIso: string) => void;
  className?: string;
  /** Hide masterclass event dots (use for DOB / general pickers) */
  showEvents?: boolean;
  /** Prevent selecting future dates */
  disableFuture?: boolean;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const EVENT_DATES = [
  "2025-08-15",
  "2025-08-22",
  "2025-09-05",
  "2025-09-12",
  "2025-09-20",
  "2025-10-02",
];

function toIso(y: number, m0: number, d: number) {
  const mm = String(m0 + 1).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

function todayIso() {
  const n = new Date();
  return toIso(n.getFullYear(), n.getMonth(), n.getDate());
}

export default function Calendar({
  selectedDate,
  onSelectDate,
  className = "",
  showEvents = true,
  disableFuture = false,
}: CalendarProps) {
  const today = todayIso();
  const initialYear = selectedDate
    ? parseInt(selectedDate.split("-")[0], 10)
    : showEvents
      ? 2025
      : new Date().getFullYear() - 25;
  const initialMonth = selectedDate
    ? parseInt(selectedDate.split("-")[1], 10) - 1
    : showEvents
      ? 7
      : 0;

  const [currentYear, setCurrentYear] = useState(initialYear);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const nowYear = new Date().getFullYear();
  const minYear = showEvents ? 2024 : 1950;
  const maxYear = disableFuture ? nowYear : nowYear + 5;
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i
  );

  const selectClass =
    "appearance-none rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-bold text-slate-900 outline-none transition-colors hover:border-teal-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500";

  return (
    <div
      className={cn(
        "w-[300px] select-none rounded-3xl border border-slate-200 bg-white p-4 font-sans shadow-2xl",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600"
          title="Previous Month"
        >
          <MaterialIcon name="chevron_left" size={20} />
        </button>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
          <select
            aria-label="Select month"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(Number(e.target.value))}
            className={cn(selectClass, "max-w-[7.5rem]")}
          >
            {MONTH_NAMES.map((name, i) => (
              <option key={name} value={i}>
                {name}
              </option>
            ))}
          </select>
          <select
            aria-label="Select year"
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className={cn(selectClass, "max-w-[4.5rem]")}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={nextMonth}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600"
          title="Next Month"
        >
          <MaterialIcon name="chevron_right" size={20} />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {DAYS_OF_WEEK.map((day) => (
          <span key={day} className="text-[11px] font-bold text-slate-400">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNumber = i + 1;
          const dateIso = toIso(currentYear, currentMonth, dayNumber);
          const isSelected = selectedDate === dateIso;
          const hasEvent = showEvents && EVENT_DATES.includes(dateIso);
          const isFuture = disableFuture && dateIso > today;
          const isToday = dateIso === today;

          return (
            <button
              key={dateIso}
              type="button"
              disabled={isFuture}
              onClick={() => onSelectDate(dateIso)}
              className={cn(
                "relative flex h-8 items-center justify-center rounded-xl text-xs font-bold transition-all",
                isSelected &&
                  "scale-105 bg-teal-600 font-extrabold text-white shadow-teal",
                !isSelected &&
                  hasEvent &&
                  "border border-teal-200/80 bg-teal-50 font-bold text-teal-700 hover:bg-teal-100",
                !isSelected &&
                  !hasEvent &&
                  !isFuture &&
                  "text-slate-700 hover:bg-slate-100",
                !isSelected && isToday && "ring-1 ring-teal-400",
                isFuture && "cursor-not-allowed text-slate-300"
              )}
            >
              {dayNumber}
              {hasEvent && !isSelected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-teal-600" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
        {showEvents ? (
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            <span>Active Masterclasses</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (disableFuture) {
                onSelectDate(today);
                return;
              }
              onSelectDate(today);
            }}
            className="font-bold text-teal-600 hover:underline"
          >
            Today
          </button>
        )}
        {selectedDate && (
          <button
            type="button"
            onClick={() => onSelectDate("")}
            className="font-bold text-rose-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
