"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";

interface CalendarProps {
  selectedDate?: string; // YYYY-MM-DD
  onSelectDate: (dateIso: string) => void;
  className?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function Calendar({
  selectedDate,
  onSelectDate,
  className = "",
}: CalendarProps) {
  // Initial month view based on selectedDate or default August 2025 (matching events)
  const initialYear = selectedDate ? parseInt(selectedDate.split("-")[0]) : 2025;
  const initialMonth = selectedDate ? parseInt(selectedDate.split("-")[1]) - 1 : 7; // Aug = 7 (0-indexed)

  const [currentYear, setCurrentYear] = useState(initialYear);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get total days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // Get first day of week (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // Highlighted event dates for visual indicators (Aug 15, Aug 22, Sep 5, Sep 12, Sep 20, Oct 2)
  const eventDates = ["2025-08-15", "2025-08-22", "2025-09-05", "2025-09-12", "2025-09-20", "2025-10-02"];

  return (
    <div className={`w-[290px] bg-white rounded-3xl p-4 border border-slate-200 shadow-2xl select-none font-sans ${className}`}>
      {/* Month & Navigation Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-600 text-slate-600 flex items-center justify-center transition-colors"
          title="Previous Month"
        >
          <MaterialIcon name="chevron_left" size={20} />
        </button>

        <span className="text-sm font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          {MONTH_NAMES[currentMonth]} {currentYear}
        </span>

        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-600 text-slate-600 flex items-center justify-center transition-colors"
          title="Next Month"
        >
          <MaterialIcon name="chevron_right" size={20} />
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <span key={day} className="text-[11px] font-bold text-slate-400">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty Padding Cells before First Day */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}

        {/* Days of Month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNumber = i + 1;
          const dayStr = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
          const monthStr = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
          const dateIso = `${currentYear}-${monthStr}-${dayStr}`;

          const isSelected = selectedDate === dateIso;
          const hasEvent = eventDates.includes(dateIso);

          return (
            <button
              key={dateIso}
              onClick={() => onSelectDate(dateIso)}
              className={`h-8 rounded-xl text-xs font-bold relative flex items-center justify-center transition-all ${
                isSelected
                  ? "bg-teal-600 text-white shadow-teal font-extrabold scale-105"
                  : hasEvent
                  ? "bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold border border-teal-200/80"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {dayNumber}
              {hasEvent && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-teal-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Clear & Action */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-500">
          <span className="w-2 h-2 rounded-full bg-teal-600" />
          <span>Active Masterclasses</span>
        </div>
        {selectedDate && (
          <button
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
