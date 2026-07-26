"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import Calendar from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  /** For date of birth — block future dates */
  disableFuture?: boolean;
  id?: string;
  name?: string;
};

function formatDisplay(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "dd/mm/yyyy",
  required,
  className,
  disableFuture = false,
  id,
  name,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {/* Hidden input for native form required validation */}
      <input
        id={id}
        name={name}
        type="text"
        required={required}
        value={value}
        readOnly
        tabIndex={-1}
        aria-hidden
        className="sr-only"
        onChange={() => {}}
      />

      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-sm shadow-sm transition-all",
          "focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500",
          value ? "text-slate-900" : "text-slate-400",
          open && "border-teal-500 ring-1 ring-teal-500"
        )}
      >
        <span className="truncate">{value ? formatDisplay(value) : placeholder}</span>
        <CalendarDays className="size-4 shrink-0 text-teal-600" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 animate-in fade-in zoom-in-95 duration-200">
          <Calendar
            selectedDate={value}
            showEvents={false}
            disableFuture={disableFuture}
            onSelectDate={(date) => {
              onChange(date);
              if (date) setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
