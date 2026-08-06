"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  /** Stable key + heading text */
  title: string;
  /** Small text rendered under the title (duration, lesson count, …) */
  meta?: string;
  /** Leading badge, e.g. a module number */
  badge?: ReactNode;
  /** Pill rendered on the right of the trigger */
  tag?: string;
  /** Collapsed body copy */
  content: ReactNode;
};

interface AccordionProps {
  items: AccordionItem[];
  /** Index open on first render, or null for all collapsed */
  defaultOpen?: number | null;
  /** Allow more than one panel open at a time */
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  defaultOpen = 0,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const uid = useId();
  const [open, setOpen] = useState<number[]>(
    defaultOpen === null || defaultOpen === undefined ? [] : [defaultOpen]
  );

  const toggle = (index: number) =>
    setOpen((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      return allowMultiple ? [...prev, index] : [index];
    });

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const buttonId = `${uid}-trigger-${i}`;
        const panelId = `${uid}-panel-${i}`;

        return (
          <div
            key={item.title}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
              isOpen
                ? "border-teal-200 shadow-[0_8px_28px_rgba(15,118,110,0.10)]"
                : "border-slate-200/80 hover:border-teal-100 hover:shadow-[0_4px_16px_rgba(15,23,42,0.05)]"
            )}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-4 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 sm:p-5"
            >
              {item.badge && (
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors",
                    isOpen
                      ? "bg-teal-700 text-white"
                      : "bg-teal-50 text-teal-700"
                  )}
                >
                  {item.badge}
                </span>
              )}

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-900 sm:text-base">
                  {item.title}
                </span>
                {item.meta && (
                  <span className="mt-1 flex flex-wrap items-center gap-1.5">
                    {typeof item.meta === "string" ? (
                      item.meta.includes(" · ") || item.meta.includes(", ") ? (
                        item.meta.split(/\s*·\s*|\s*,\s*/).map((m) => (
                          <span
                            key={m}
                            className={cn(
                              "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold transition-colors",
                              isOpen
                                ? "border-teal-200 bg-teal-50 text-teal-800 shadow-xs"
                                : "border-slate-200/80 bg-slate-100/80 text-teal-700 hover:border-teal-200 hover:bg-teal-50/50"
                            )}
                          >
                            <span className="mr-1.5 size-1.5 rounded-full bg-teal-500" />
                            {m}
                          </span>
                        ))
                      ) : (
                        <span
                          className={cn(
                            "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold transition-colors",
                            isOpen
                              ? "border-teal-200 bg-teal-50 text-teal-800 shadow-xs"
                              : "border-slate-200/80 bg-slate-100/80 text-teal-700 hover:border-teal-200 hover:bg-teal-50/50"
                          )}
                        >
                          <span className="mr-1.5 size-1.5 rounded-full bg-teal-500" />
                          {item.meta}
                        </span>
                      )
                    ) : (
                      <span className="text-xs font-semibold text-teal-700">
                        {item.meta}
                      </span>
                    )}
                  </span>
                )}
              </span>

              {item.tag && (
                <span className="hidden shrink-0 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-600 sm:inline-block">
                  {item.tag}
                </span>
              )}

              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full transition-all",
                  isOpen
                    ? "bg-teal-100 text-teal-700"
                    : "bg-slate-100 text-slate-500"
                )}
                aria-hidden
              >
                {isOpen ? (
                  <Minus className="size-4" />
                ) : (
                  <Plus className="size-4" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "px-4 pb-5 text-sm leading-relaxed text-slate-600 sm:px-5",
                      item.badge && "sm:pl-[4.5rem]"
                    )}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
