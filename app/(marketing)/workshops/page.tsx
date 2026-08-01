"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import {
  fetchEvents,
  formatPrice,
  PLACEHOLDER_COURSE_IMAGE,
} from "@/lib/api/public";

interface WorkshopItem {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  location: string;
  image: string;
  seats: number;
  price: string;
  type: string;
}

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<WorkshopItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchEvents({ type: "workshop", limit: 50 });
        if (cancelled) return;
        setWorkshops(
          list.items.map((e) => {
            const start = new Date(e.starts_at);
            return {
              id: e.id,
              title: e.title,
              date: start.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              time:
                e.duration_label ||
                start.toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  minute: "2-digit",
                }),
              speaker: e.category_label || "Skinfinity Faculty",
              location: e.venue || e.location || "Skinfinity Academy",
              image: e.image_url || PLACEHOLDER_COURSE_IMAGE,
              seats: e.seats_left ?? e.seats_total ?? 0,
              price: formatPrice(e.price, e.currency || "INR"),
              type: e.type,
            };
          }),
        );
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
            <div className="grid sm:grid-cols-2 gap-6">
              {workshops.map((w) => (
                <div key={w.id} className="card-academy overflow-hidden group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={w.image}
                      alt={w.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 glass rounded-xl px-2.5 py-1 text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                      {w.type}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3
                      className="font-bold text-slate-900 text-lg"
                      style={{ fontFamily: "var(--font-heading), sans-serif" }}
                    >
                      {w.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <MaterialIcon
                          name="calendar_month"
                          size={14}
                          className="text-teal-500"
                        />
                        {w.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MaterialIcon
                          name="schedule"
                          size={14}
                          className="text-teal-500"
                        />
                        {w.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MaterialIcon
                          name="location_on"
                          size={14}
                          className="text-teal-500"
                        />
                        {w.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MaterialIcon
                          name="event_seat"
                          size={14}
                          className="text-teal-500"
                        />
                        {w.seats} seats
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <p className="text-lg font-bold text-slate-900">{w.price}</p>
                      <Link
                        href={`/enroll?program=${encodeURIComponent(w.title)}`}
                        className="px-4 py-2.5 text-xs font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700"
                      >
                        Enroll
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
