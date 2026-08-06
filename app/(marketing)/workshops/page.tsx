"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import {
  fetchWorkshops,
  formatPrice,
  PLACEHOLDER_COURSE_IMAGE,
} from "@/lib/api/public";
import type { PublicWorkshop } from "@/lib/api/types";

function formatWorkshopDate(startsOn: string, endsOn: string | null) {
  const start = new Date(`${startsOn}T00:00:00`);
  const startLabel = start.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (!endsOn || endsOn === startsOn) return startLabel;
  const end = new Date(`${endsOn}T00:00:00`);
  return `${startLabel} – ${end.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
}

function formatDeliveryMode(mode: string) {
  const map: Record<string, string> = {
    handson: "Hands-On",
    observation: "Observation",
    demonstration: "Demonstration",
    training: "Clinical Training",
    lecture: "Lecture",
  };
  return map[mode.toLowerCase()] || mode;
}

function stripHtml(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<PublicWorkshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchWorkshops({ limit: 50 });
        if (cancelled) return;
        setWorkshops(list.items);
      } catch {
        if (!cancelled) setWorkshops([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <PageHeader
        title="Hands-On"
        highlight="Workshops"
        subtitle="Practical, hands-on training workshops led by expert dermatologists and aesthetic physicians."
        breadcrumb="Workshops"
      />

      <section className="py-12 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="py-16 text-center text-sm text-slate-400">
              Loading workshops…
            </p>
          ) : workshops.length === 0 ? (
            <div className="rounded-3xl border border-slate-100 bg-slate-50 px-6 py-16 text-center">
              <p className="text-sm text-slate-500">
                No published workshops yet. Browse our diploma programmes or
                contact admissions for the next cohort dates.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link href="/courses" className="btn-primary">
                  View courses
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact us
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {workshops.map((w) => {
                const excerpt = w.tagline
                  ? w.tagline
                  : w.description
                    ? stripHtml(w.description)
                    : null;
                const modes = w.delivery_modes ?? [];

                return (
                  <Link
                    key={w.id}
                    href={`/workshops/${w.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-teal-300 hover:shadow-xl"
                  >
                    {/* Banner Image with Badges */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                      {/* Blurred backdrop image to fill container naturally */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={w.image_url || PLACEHOLDER_COURSE_IMAGE}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover blur-xl opacity-40 scale-110 select-none"
                      />
                      {/* Foreground intact image displaying full resolution without cut off */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={w.image_url || PLACEHOLDER_COURSE_IMAGE}
                        alt={w.title}
                        className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between gap-2">
                        {w.duration_label ? (
                          <span className="rounded-xl border border-white/20 bg-teal-700/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md">
                            {w.duration_label}
                          </span>
                        ) : <span />}

                        {w.locations && (
                          <span className="flex items-center gap-1 rounded-xl border border-white/20 bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md backdrop-blur-md">
                            <MaterialIcon name="location_on" size={13} className="text-teal-400" />
                            {w.locations}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                      <div className="space-y-3">
                        <h3
                          className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-teal-700 sm:text-2xl"
                          style={{ fontFamily: "var(--font-heading), sans-serif" }}
                        >
                          {w.title}
                        </h3>

                        {/* Delivery Modes Pills */}
                        {modes.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {modes.map((mode) => (
                              <span
                                key={mode}
                                className="inline-flex items-center rounded-md border border-teal-200/80 bg-teal-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700 shadow-2xs"
                              >
                                <span className="mr-1.5 size-1.5 rounded-full bg-teal-500" />
                                {formatDeliveryMode(mode)}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Short Excerpt */}
                        {excerpt && (
                          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                            {excerpt}
                          </p>
                        )}
                      </div>

                      {/* Info Grid */}
                      <div className="space-y-3 pt-2">
                        <div className="grid grid-cols-2 gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-xs text-slate-600">
                          <span className="flex items-center gap-2">
                            <MaterialIcon
                              name="calendar_month"
                              size={16}
                              className="text-teal-600 shrink-0"
                            />
                            <span className="truncate font-medium">
                              {formatWorkshopDate(w.starts_on, w.ends_on)}
                            </span>
                          </span>

                          <span className="flex items-center gap-2">
                            <MaterialIcon
                              name="event_seat"
                              size={16}
                              className="text-teal-600 shrink-0"
                            />
                            <span className="truncate font-medium">
                              {w.seats_left != null
                                ? `${w.seats_left} seats left`
                                : w.seats_total != null
                                  ? `${w.seats_total} Total Seats`
                                  : "Limited seats"}
                            </span>
                          </span>

                          {w.contact_phone && (
                            <span className="col-span-2 flex items-center gap-2 border-t border-slate-200/60 pt-2 text-slate-600">
                              <MaterialIcon
                                name="call"
                                size={15}
                                className="text-teal-600 shrink-0"
                              />
                              <span className="font-semibold text-slate-800">
                                Contact: +91 {w.contact_phone}
                              </span>
                            </span>
                          )}
                        </div>

                        {/* Footer Price & CTA */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                          <div>
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Fee
                            </span>
                            <span className="text-2xl font-extrabold text-slate-900">
                              {formatPrice(w.price, w.currency || "INR")}
                            </span>
                          </div>

                          <span className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all group-hover:bg-teal-700 group-hover:shadow-md">
                            View details
                            <MaterialIcon name="arrow_forward" size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
