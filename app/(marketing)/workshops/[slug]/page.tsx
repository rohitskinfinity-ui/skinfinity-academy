"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import {
  fetchWorkshopBySlug,
  formatPrice,
  PLACEHOLDER_COURSE_IMAGE,
} from "@/lib/api/public";
import type { PublicWorkshop } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

const DELIVERY_MODE_LABELS: Record<string, string> = {
  observation: "Observation",
  theory: "Theory",
  demonstration: "Demonstration",
  training: "Training",
  handson: "HandsOn",
};

function decodeHtmlEntities(str: string) {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function RichHtml({ html }: { html: string | null | undefined }) {
  if (!html?.trim()) return null;
  const decoded = decodeHtmlEntities(html);
  if (!looksLikeHtml(decoded)) {
    return (
      <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base">
        {decoded}
      </p>
    );
  }
  return (
    <div
      className="text-sm leading-relaxed text-slate-600 sm:text-base [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-900 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_a]:font-medium [&_a]:text-teal-600 [&_strong]:font-semibold"
      dangerouslySetInnerHTML={{ __html: decoded }}
    />
  );
}

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

function normalizeList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string" && v.trim() !== "");
}

function normalizeProcedures(
  value: unknown,
): Array<{ name: string; image_url: string | null }> {
  if (!Array.isArray(value)) return [];
  const out: Array<{ name: string; image_url: string | null }> = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const name = typeof row.name === "string" ? row.name.trim() : "";
    if (!name) continue;
    out.push({
      name,
      image_url: typeof row.image_url === "string" ? row.image_url : null,
    });
  }
  return out;
}

export default function WorkshopDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [workshop, setWorkshop] = useState<PublicWorkshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWorkshopBySlug(slug);
        if (!cancelled) setWorkshop(data);
      } catch (err) {
        if (!cancelled) {
          setWorkshop(null);
          setError(
            err instanceof ApiError && err.status === 404
              ? "Workshop not found"
              : err instanceof Error
                ? err.message
                : "Failed to load workshop",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div>
        <PageHeader title="Workshop" breadcrumb="Workshops" />
        <p className="py-20 text-center text-sm text-slate-400">
          Loading workshop…
        </p>
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div>
        <PageHeader title="Workshop" breadcrumb="Workshops" />
        <div className="container-max px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">{error || "Workshop not found"}</p>
          <Link href="/workshops" className="btn-primary mt-6 inline-flex">
            Back to workshops
          </Link>
        </div>
      </div>
    );
  }

  const features = normalizeList(workshop.features);
  const procedures = normalizeProcedures(workshop.procedures);
  const modes = Array.isArray(workshop.delivery_modes)
    ? workshop.delivery_modes
    : [];

  return (
    <div>
      <PageHeader
        title={workshop.title}
        subtitle={workshop.tagline || undefined}
        breadcrumb="Workshops"
      />

      <section className="bg-white py-10 sm:py-14">
        <div className="container-max grid gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.9fr] lg:px-8">
          <div className="space-y-10">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-950 flex items-center justify-center min-h-[260px] sm:min-h-[360px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={workshop.image_url || PLACEHOLDER_COURSE_IMAGE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover blur-xl opacity-40 scale-110 select-none"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={workshop.image_url || PLACEHOLDER_COURSE_IMAGE}
                alt={workshop.title}
                className="relative z-10 max-h-[380px] w-full object-contain p-2"
              />
            </div>

            {workshop.description ? (
              <div>
                <h2
                  className="mb-4 text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  About this workshop
                </h2>
                <RichHtml html={workshop.description} />
              </div>
            ) : null}

            {workshop.eligibility_html ? (
              <div>
                <h2
                  className="mb-4 text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Eligibility
                </h2>
                <RichHtml html={workshop.eligibility_html} />
              </div>
            ) : null}

            {modes.length > 0 ? (
              <div>
                <h2
                  className="mb-4 text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Delivery modes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {modes.map((mode) => (
                    <span
                      key={mode}
                      className="rounded-xl bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700"
                    >
                      {DELIVERY_MODE_LABELS[mode] || mode}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {features.length > 0 ? (
              <div>
                <h2
                  className="mb-4 text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  What you get
                </h2>
                <ul className="space-y-2.5">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <MaterialIcon
                        name="check_circle"
                        size={16}
                        className="mt-0.5 shrink-0 text-teal-500"
                      />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {procedures.length > 0 ? (
              <div>
                <h2
                  className="mb-4 text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Procedures covered
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {procedures.map((proc) => (
                    <div
                      key={proc.name}
                      className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50"
                    >
                      {proc.image_url ? (
                        <img
                          src={proc.image_url}
                          alt={proc.name}
                          className="h-36 w-full object-cover"
                        />
                      ) : null}
                      <p className="p-3 text-sm font-semibold text-slate-800">
                        {proc.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-teal-600">
                  Workshop fee
                </p>
                <p className="mt-1 text-3xl font-extrabold text-slate-900">
                  {formatPrice(workshop.price, workshop.currency || "INR")}
                </p>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MaterialIcon
                    name="calendar_month"
                    size={18}
                    className="mt-0.5 text-teal-500"
                  />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Dates
                    </p>
                    <p className="font-semibold text-slate-800">
                      {formatWorkshopDate(workshop.starts_on, workshop.ends_on)}
                    </p>
                  </div>
                </div>
                {workshop.duration_label ? (
                  <div className="flex items-start gap-2.5">
                    <MaterialIcon
                      name="schedule"
                      size={18}
                      className="mt-0.5 text-teal-500"
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Duration
                      </p>
                      <p className="font-semibold text-slate-800">
                        {workshop.duration_label}
                      </p>
                    </div>
                  </div>
                ) : null}
                <div className="flex items-start gap-2.5">
                  <MaterialIcon
                    name="location_on"
                    size={18}
                    className="mt-0.5 text-teal-500"
                  />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Locations
                    </p>
                    <p className="font-semibold text-slate-800">
                      {workshop.locations || "Skinfinity Academy"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MaterialIcon
                    name="event_seat"
                    size={18}
                    className="mt-0.5 text-teal-500"
                  />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Seats
                    </p>
                    <p className="font-semibold text-slate-800">
                      {workshop.seats_left != null
                        ? `${workshop.seats_left} left`
                        : workshop.seats_total != null
                          ? `${workshop.seats_total} total`
                          : "Limited"}
                    </p>
                  </div>
                </div>
                {workshop.contact_phone ? (
                  <div className="flex items-start gap-2.5">
                    <MaterialIcon
                      name="call"
                      size={18}
                      className="mt-0.5 text-teal-500"
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Contact
                      </p>
                      <a
                        href={`tel:${workshop.contact_phone}`}
                        className="font-semibold text-teal-700 hover:underline"
                      >
                        {workshop.contact_phone}
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>

              <Link
                href={`/enroll?workshop=${encodeURIComponent(workshop.slug)}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700"
              >
                Enroll now
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
              <Link
                href="/workshops"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:border-teal-300 hover:text-teal-700"
              >
                All workshops
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
