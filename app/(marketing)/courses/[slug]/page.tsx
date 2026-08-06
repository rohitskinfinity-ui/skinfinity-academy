"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Accordion, { type AccordionItem } from "@/components/shared/Accordion";
import {
  fetchCourseBySlug,
  formatMode,
  formatPrice,
} from "@/lib/api/public";
import type {
  PublicCourseDetail,
  PublicCourseMedia,
  PublicCourseReview,
} from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

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

function stripHtml(value: string) {
  const decoded = decodeHtmlEntities(value);
  return decoded
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function CourseDescription({ html }: { html: string | null | undefined }) {
  if (!html?.trim()) {
    return (
      <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
        Details coming soon.
      </p>
    );
  }

  const decodedHtml = decodeHtmlEntities(html);

  if (!looksLikeHtml(decodedHtml)) {
    return (
      <div className="space-y-4 whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base">
        {decodedHtml}
      </div>
    );
  }

  return (
    <div
      className="course-description text-sm leading-relaxed text-slate-600 sm:text-base [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-900 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_a]:font-medium [&_a]:text-teal-600 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-slate-800"
      dangerouslySetInnerHTML={{ __html: decodedHtml }}
    />
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <MaterialIcon
            name="check_circle"
            size={16}
            className="mt-0.5 shrink-0 text-teal-500"
          />
          <span className="text-sm leading-relaxed text-slate-600">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function isEmptyRichHtml(html: string | null | undefined) {
  if (!html?.trim()) return true;
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim() === "";
}

/** Render marketing field that may be legacy string[] or rich HTML string. */
function MarketingBlock({
  value,
}: {
  value: string | string[] | null | undefined;
}) {
  if (value == null) return null;
  if (typeof value === "string") {
    if (isEmptyRichHtml(value)) return null;
    return <CourseDescription html={value} />;
  }
  if (!value.length) return null;
  if (value.length === 1 && looksLikeHtml(value[0])) {
    return <CourseDescription html={value[0]} />;
  }
  return <BulletList items={value} />;
}

function hasMarketingContent(value: string | string[] | null | undefined) {
  if (value == null) return false;
  if (typeof value === "string") return !isEmptyRichHtml(value);
  if (!value.length) return false;
  return true;
}

function formatCourseDate(value: string | null | undefined) {
  if (!value) return null;
  const d = new Date(
    value.includes("T") ? value : `${value.slice(0, 10)}T12:00:00`
  );
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ReviewsCarousel({ reviews }: { reviews: PublicCourseReview[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  function updateScrollState() {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [reviews.length]);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const amount = (card?.offsetWidth ?? 260) + 12;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-400">
          Student Experiences
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous reviews"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
            className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MaterialIcon name="chevron_left" size={18} />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
            className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MaterialIcon name="chevron_right" size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1"
      >
        {reviews.map((review) => {
          const rating =
            review.rating != null ? Number(review.rating) : null;
          return (
            <article
              key={review.id}
              data-review-card
              className="w-[240px] shrink-0 snap-start rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 sm:w-[260px]"
            >
              {rating != null && !Number.isNaN(rating) ? (
                <div
                  className="mb-2 flex items-center gap-0.5"
                  aria-label={`${rating.toFixed(1)} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => {
                    const fullStars = Math.floor(rating);
                    const hasHalf = rating - fullStars >= 0.25;
                    const isFull = i < fullStars;
                    const isHalf = !isFull && hasHalf && i === fullStars;
                    return (
                      <MaterialIcon
                        key={i}
                        name={isHalf ? "star_half" : "star"}
                        size={14}
                        filled={isFull || isHalf}
                        className={
                          isFull || isHalf ? "text-amber-400" : "text-slate-300"
                        }
                      />
                    );
                  })}
                  <span className="ml-1 text-[11px] font-semibold text-slate-500">
                    {rating.toFixed(1)}
                  </span>
                </div>
              ) : null}
              <p className="line-clamp-4 text-xs leading-relaxed text-slate-600">
                “{review.quote}”
              </p>
              <div className="mt-3 border-t border-slate-100 pt-2.5">
                <p className="truncate text-xs font-bold text-slate-900">
                  {review.person_name}
                </p>
                {review.credentials ? (
                  <p className="truncate text-[11px] text-slate-500">
                    {review.credentials}
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function buildModules(course: PublicCourseDetail): AccordionItem[] {
  const modeLabels: Record<string, string> = {
    observation: "Observation",
    theory: "Theory",
    demonstration: "Demonstration",
    training: "Training",
    handson: "HandsOn",
    // legacy fallbacks
    lecture: "Theory",
    practical: "Demonstration",
    hands_on: "HandsOn",
  };

  return course.modules.map((m, idx) => {
    const modes =
      (m.delivery_modes ?? [])
        .map((mode) => modeLabels[mode] || mode)
        .join(" · ") || "Theory";
    const checklist = Array.isArray(m.checklist) ? m.checklist : [];
    const topics =
      checklist.length > 0
        ? checklist
        : m.treatment.summary
          ? [m.treatment.summary]
          : [];

    return {
      title: m.treatment.name,
      meta: modes,
      badge: String(idx + 1).padStart(2, "0"),
      tag: `Module ${m.sort_order}`,
      content: (
        <div className="space-y-3">
          {topics.length > 0 ? (
            <ul className="space-y-2">
              {topics.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <MaterialIcon
                    name="check_circle"
                    size={16}
                    className="mt-0.5 shrink-0 text-teal-500"
                  />
                  <span className="text-sm leading-relaxed text-slate-600">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              Topics for this module will be published soon.
            </p>
          )}
        </div>
      ),
    };
  });
}

interface SectionItem {
  id: string;
  title: string;
  tag?: string;
  icon: string;
  content: React.ReactNode;
}

function CourseSectionAccordions({ sections }: { sections: SectionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    setOpenIndex(0);
  }, [sections.length]);

  const toggleSection = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-4">
      {sections.map((sec, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={sec.id}
            id={`course-sec-${sec.id}`}
            className={`overflow-hidden rounded-3xl border bg-white transition-all duration-300 ${
              isOpen
                ? "border-teal-200/90 shadow-[0_8px_30px_rgba(15,118,110,0.08)]"
                : "border-slate-200/80 hover:border-teal-100 hover:shadow-sm"
            }`}
          >
              <button
                type="button"
                onClick={() => toggleSection(idx)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors sm:p-6"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                      isOpen
                        ? "bg-teal-700 text-white shadow-md shadow-teal-900/20"
                        : "bg-teal-50 text-teal-700 border border-teal-100"
                    }`}
                  >
                    <MaterialIcon name={sec.icon} size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                      {sec.title}
                    </h3>
                    {sec.tag && (
                      <span className="mt-0.5 inline-block text-xs font-semibold text-teal-700">
                        {sec.tag}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-9 items-center justify-center rounded-full transition-transform duration-300 ${
                      isOpen
                        ? "bg-teal-100 text-teal-800 rotate-180"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <MaterialIcon name="keyboard_arrow_down" size={20} />
                  </span>
                </div>
              </button>

            {isOpen && (
              <div className="border-t border-slate-100 p-5 sm:p-6">
                {sec.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MediaCarousel({
  media,
  onSelectMedia,
}: {
  media: PublicCourseMedia[];
  onSelectMedia: (item: PublicCourseMedia) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  function updateScrollState() {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [media.length]);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-media-card]");
    const amount = (card?.offsetWidth ?? 280) + 16;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-400">
          Click any photo or video to view in full popup
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous media"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
            className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MaterialIcon name="chevron_left" size={18} />
          </button>
          <button
            type="button"
            aria-label="Next media"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
            className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MaterialIcon name="chevron_right" size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
      >
        {media.map((item) => {
          const isVideo = item.kind === "video";
          const thumb = item.thumbnail_url || item.url;

          return (
            <button
              key={item.id}
              data-media-card
              type="button"
              onClick={() => onSelectMedia(item)}
              className="group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left transition hover:border-teal-400 hover:shadow-md sm:w-[300px]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt={item.title || "Course media"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 transition group-hover:bg-slate-900/25">
                  {isVideo ? (
                    <span className="flex size-12 items-center justify-center rounded-full bg-white/95 text-teal-700 shadow-lg ring-4 ring-white/30 transition group-hover:scale-110">
                      <MaterialIcon name="play_arrow" size={28} />
                    </span>
                  ) : (
                    <span className="flex size-10 items-center justify-center rounded-full bg-white/95 text-slate-900 opacity-0 shadow-md transition group-hover:opacity-100 group-hover:scale-110">
                      <MaterialIcon name="zoom_in" size={22} />
                    </span>
                  )}
                </div>

                {/* Media Type Tag */}
                <span className="absolute top-2.5 right-2.5 rounded-md bg-teal-800/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
                  {isVideo ? "VIDEO" : "PHOTO"}
                </span>
              </div>

              {(item.title || item.caption) && (
                <div className="space-y-1 bg-white p-3 border-t border-slate-100">
                  {item.title && (
                    <p className="truncate text-xs font-bold text-slate-900">
                      {item.title}
                    </p>
                  )}
                  {item.caption && (
                    <p className="truncate text-[11px] text-slate-500">
                      {item.caption}
                    </p>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [course, setCourse] = useState<PublicCourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<PublicCourseMedia | null>(
    null,
  );

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        const data = await fetchCourseBySlug(slug);
        if (!cancelled) setCourse(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        } else {
          setError(
            err instanceof Error ? err.message : "Failed to load course",
          );
        }
        setCourse(null);
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
      <div className="flex min-h-[50vh] items-center justify-center bg-white">
        <p className="text-sm text-slate-400">Loading course details…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <p className="text-lg font-bold text-slate-900">Course not found</p>
        <p className="text-sm text-slate-500">
          No published programme matches “{slug}”.
        </p>
        <Link href="/courses" className="btn-primary">
          Back to courses
        </Link>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <p className="text-lg font-bold text-slate-900">Could not load course</p>
        <p className="text-sm text-red-600">{error || "Unknown error"}</p>
        <Link href="/courses" className="btn-secondary">
          Back to courses
        </Link>
      </div>
    );
  }

  const modules = buildModules(course);
  const courseFaqs: AccordionItem[] = course.faqs.map((f) => ({
    title: f.question,
    content: f.answer,
  }));

  const mc = course.marketing_content ?? {};
  const eligibilityItems = mc.eligibility?.items;
  const highlights = mc.highlights;
  const trainingHtml = mc.training_structure?.html;
  const trainingGroups = mc.training_structure?.groups ?? [];
  const whyChooseItems = mc.why_choose?.items;
  const considerations = mc.important_considerations;
  const courseReviews = course.reviews ?? [];
  const courseMedia = course.media ?? [];

  const titleParts = course.title.split(" ");
  const highlight =
    titleParts.length > 2 ? titleParts.slice(-2).join(" ") : course.title;
  const titleLead =
    titleParts.length > 2 ? titleParts.slice(0, -2).join(" ") : "Programme";

  const price = formatPrice(course.list_price, course.currency || "INR");
  const enrollHref = `/enroll?program=${encodeURIComponent(course.slug)}`;

  // Construct structured collapsible sections
  const sections: SectionItem[] = [
    {
      id: "overview",
      title: "Program Overview",
      tag: "Course Summary & Details",
      icon: "menu_book",
      content: (
        <div className="space-y-6">
          {course.image_url && (
            <button
              type="button"
              onClick={() =>
                setSelectedMedia({
                  id: "hero-image",
                  kind: "image",
                  url: course.image_url!,
                  thumbnail_url: null,
                  sort_order: 0,
                  title: course.title,
                  caption: "Course Banner Image",
                })
              }
              className="group relative w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.image_url}
                alt={course.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/25 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">
                  <MaterialIcon name="zoom_in" size={18} />
                  Click to view full image
                </span>
              </div>
            </button>
          )}
          <CourseDescription html={course.description} />
        </div>
      ),
    },
    {
      id: "curriculum",
      title: "Curriculum Modules",
      tag: `${course.modules.length} Modules`,
      icon: "view_module",
      content: (
        <div className="space-y-4">
          <p className="text-xs font-semibold text-slate-400">
            {course.modules.length} structured modules
            {course.programme_meta &&
            typeof course.programme_meta === "object" &&
            "programme_duration_months" in course.programme_meta
              ? ` · ${String(course.programme_meta.programme_duration_months)} months duration`
              : ""}
          </p>
          {modules.length > 0 ? (
            <Accordion items={modules} allowMultiple />
          ) : (
            <p className="text-sm text-slate-500">
              Curriculum modules will be published soon.
            </p>
          )}
        </div>
      ),
    },
  ];

  if (courseMedia.length > 0) {
    sections.push({
      id: "gallery",
      title: "Course Gallery & Videos",
      tag: `${courseMedia.length} Media Items`,
      icon: "perm_media",
      content: (
        <MediaCarousel media={courseMedia} onSelectMedia={setSelectedMedia} />
      ),
    });
  }

  if (mc.eligibility?.intro || hasMarketingContent(eligibilityItems)) {
    sections.push({
      id: "eligibility",
      title: "Eligibility & Prerequisites",
      tag: "Requirements",
      icon: "verified_user",
      content: (
        <div className="space-y-4">
          {mc.eligibility?.intro && (
            <CourseDescription html={mc.eligibility.intro} />
          )}
          <MarketingBlock value={eligibilityItems} />
        </div>
      ),
    });
  }

  if (hasMarketingContent(highlights)) {
    sections.push({
      id: "highlights",
      title: "Programme Highlights",
      tag: "Key Points",
      icon: "auto_awesome",
      content: <MarketingBlock value={highlights} />,
    });
  }

  if (!isEmptyRichHtml(trainingHtml) || trainingGroups.length > 0) {
    sections.push({
      id: "structure",
      title: "Training Structure & Delivery",
      tag: "Delivery Format",
      icon: "school",
      content: !isEmptyRichHtml(trainingHtml) ? (
        <CourseDescription html={trainingHtml} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {trainingGroups.map((group) => {
            const items = group.items ?? [];
            const isSingle = items.length <= 1;
            return (
              <div
                key={group.title}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5"
              >
                <div className="mb-2 flex items-start gap-2.5">
                  <MaterialIcon
                    name="check_circle"
                    size={18}
                    className="mt-0.5 shrink-0 text-teal-500"
                  />
                  <h4
                    className="text-base font-bold text-slate-900"
                    style={{
                      fontFamily: "var(--font-heading), sans-serif",
                    }}
                  >
                    {group.title}
                  </h4>
                </div>
                {isSingle ? (
                  <p className="pl-7 text-sm leading-relaxed text-slate-600">
                    {items[0]}
                  </p>
                ) : (
                  <ul className="space-y-2 pl-7">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-slate-600"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ),
    });
  }

  if (mc.why_choose?.intro || hasMarketingContent(whyChooseItems)) {
    sections.push({
      id: "why_choose",
      title: "Why Choose Skinfinity Academy?",
      tag: "Academy Benefits",
      icon: "star",
      content: (
        <div className="space-y-4">
          {mc.why_choose?.intro && (
            <CourseDescription html={mc.why_choose.intro} />
          )}
          <MarketingBlock value={whyChooseItems} />
        </div>
      ),
    });
  }

  if (hasMarketingContent(considerations)) {
    sections.push({
      id: "considerations",
      title: "Important Considerations",
      tag: "Guidelines",
      icon: "error_outline",
      content: <MarketingBlock value={considerations} />,
    });
  }

  if (courseReviews.length > 0) {
    sections.push({
      id: "reviews",
      title: "Student Reviews & Ratings",
      tag: `${courseReviews.length} Reviews`,
      icon: "rate_review",
      content: <ReviewsCarousel reviews={courseReviews} />,
    });
  }

  if (courseFaqs.length > 0) {
    sections.push({
      id: "faqs",
      title: "Frequently Asked Questions",
      tag: `${courseFaqs.length} FAQs`,
      icon: "quiz",
      content: (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Link
              href="/contact"
              className="text-xs font-bold text-teal-600 transition-colors hover:text-teal-700"
            >
              Still have a question? Contact Us
            </Link>
          </div>
          <Accordion items={courseFaqs} defaultOpen={null} />
        </div>
      ),
    });
  }

  return (
    <div>
      <PageHeader
        title={titleLead}
        highlight={highlight}
        subtitle={
          (course.description
            ? stripHtml(course.description).split("\n")[0].split(". ").slice(0, 2).join(". ")
            : null) ||
          "Clinically focused programme from Skinfinity Academy."
        }
        breadcrumb="Course Details"
      />

      <section className="bg-white py-12">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column: Interactive Section Accordions Stack */}
            <div className="lg:col-span-2">
              <CourseSectionAccordions sections={sections} />
            </div>

            {/* Right Sticky Sidebar: Enrollment & Quick Stats */}
            <div className="space-y-6">
              <div className="sticky top-24 rounded-3xl border-2 border-teal-100 bg-white p-6 shadow-card">
                <div className="mb-6 text-center">
                  <p className="mb-1 text-xs text-slate-400">Course Fee</p>
                  <p
                    className="text-4xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {price}
                  </p>
                </div>

                <Link
                  href={enrollHref}
                  className="btn-primary mb-3 w-full cursor-pointer justify-center"
                >
                  Enroll Now
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary w-full cursor-pointer justify-center"
                >
                  Ask Admissions
                </Link>

                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  {(
                    [
                      {
                        icon: "event",
                        label: "Start date",
                        value: formatCourseDate(course.starts_on) || "TBA",
                      },
                      {
                        icon: "schedule",
                        label: "Duration",
                        value: course.duration_label || "—",
                      },
                      {
                        icon: "desktop_windows",
                        label: "Mode",
                        value: formatMode(course.mode),
                      },
                      {
                        icon: "workspace_premium",
                        label: "Certificate",
                        value: course.certificate_label || "Certificate",
                      },
                      {
                        icon: "category",
                        label: "Category",
                        value: course.category_title || "Programme",
                      },
                      {
                        icon: "star",
                        label: "Rating",
                        value:
                          course.rating != null
                            ? `${Number(course.rating).toFixed(1)} / 5.0`
                            : "—",
                        filled: course.rating != null,
                        iconClass:
                          course.rating != null
                            ? "text-amber-400"
                            : "text-teal-500",
                      },
                      {
                        icon: "view_module",
                        label: "Modules",
                        value: String(course.modules.length),
                      },
                    ] as {
                      icon: string;
                      label: string;
                      value: string;
                      filled?: boolean;
                      iconClass?: string;
                    }[]
                  ).map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-2 text-slate-500">
                        <MaterialIcon
                          name={item.icon}
                          size={16}
                          filled={item.filled ?? false}
                          className={item.iconClass ?? "text-teal-500"}
                        />
                        {item.label}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Popup Modal for Images & Videos */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMedia(null)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 text-slate-900">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {selectedMedia.title || course.title}
                </h4>
                {selectedMedia.caption && (
                  <p className="text-[11px] font-medium text-slate-500">
                    {selectedMedia.caption}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                aria-label="Close preview"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            <div className="relative flex items-center justify-center bg-slate-50 p-4 sm:p-6 min-h-[300px] max-h-[80vh]">
              {selectedMedia.kind === "image" ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title || course.title}
                  className="max-h-[72vh] w-auto max-w-full rounded-2xl border border-slate-200/80 object-contain shadow-md"
                />
              ) : (
                <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-md">
                  {isDirectVideo(selectedMedia.url) ? (
                    <video
                      src={selectedMedia.url}
                      controls
                      autoPlay
                      className="aspect-video w-full object-contain"
                      poster={selectedMedia.thumbnail_url || undefined}
                    />
                  ) : (
                    <iframe
                      src={selectedMedia.url}
                      title={selectedMedia.title || course.title}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


