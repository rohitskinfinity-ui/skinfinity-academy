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
import type { PublicCourseDetail, PublicCourseReview } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-4 text-2xl font-bold text-slate-900"
      style={{ fontFamily: "var(--font-heading), sans-serif" }}
    >
      {children}
    </h2>
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
      <div className="mb-3 flex items-end justify-between gap-3">
        <SectionHeading>Reviews</SectionHeading>
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            aria-label="Previous reviews"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
            className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MaterialIcon name="chevron_left" size={20} />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
            className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MaterialIcon name="chevron_right" size={20} />
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
  return course.modules.map((m, idx) => {
    const modes = (m.delivery_modes ?? []).join(" · ") || "Lecture";
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

export default function CourseDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [course, setCourse] = useState<PublicCourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        // Calls GET {NEXT_PUBLIC_API_URL}/api/public/courses/:slug
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
  const eligibilityItems = mc.eligibility?.items ?? [];
  const highlights = mc.highlights ?? [];
  const trainingGroups = mc.training_structure?.groups ?? [];
  const whyChooseItems = mc.why_choose?.items ?? [];
  const considerations = mc.important_considerations ?? [];
  const courseReviews = course.reviews ?? [];

  const titleParts = course.title.split(" ");
  const highlight =
    titleParts.length > 2 ? titleParts.slice(-2).join(" ") : course.title;
  const titleLead =
    titleParts.length > 2 ? titleParts.slice(0, -2).join(" ") : "Programme";

  const price = formatPrice(course.list_price, course.currency || "INR");
  const enrollHref = `/enroll?program=${encodeURIComponent(course.slug)}`;

  return (
    <div>
      <PageHeader
        title={titleLead}
        highlight={highlight}
        subtitle={
          course.description?.split("\n\n")[0] ??
          "Clinically focused programme from Skinfinity Academy."
        }
        breadcrumb="Course Details"
      />

      <section className="bg-white py-12">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <div>
                <SectionHeading>Program Overview</SectionHeading>
                <div className="space-y-4 leading-relaxed text-slate-600 whitespace-pre-line">
                  {course.description || "Details coming soon."}
                </div>
              </div>

              {(mc.eligibility?.intro || eligibilityItems.length > 0) && (
                <div>
                  <SectionHeading>Eligibility</SectionHeading>
                  {mc.eligibility?.intro && (
                    <p className="mb-4 leading-relaxed text-slate-600">
                      {mc.eligibility.intro}
                    </p>
                  )}
                  <BulletList items={eligibilityItems} />
                </div>
              )}

              {highlights.length > 0 && (
                <div>
                  <SectionHeading>Programme Highlights</SectionHeading>
                  <BulletList items={highlights} />
                </div>
              )}

              {trainingGroups.length > 0 && (
                <div>
                  <SectionHeading>Training Structure & Delivery</SectionHeading>
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
                            <h3
                              className="text-base font-bold text-slate-900"
                              style={{
                                fontFamily: "var(--font-heading), sans-serif",
                              }}
                            >
                              {group.title}
                            </h3>
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
                </div>
              )}

              <div>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                  <h3
                    className="text-xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    Curriculum Modules
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    {course.modules.length} modules
                    {course.programme_meta &&
                    typeof course.programme_meta === "object" &&
                    "programme_duration_months" in course.programme_meta
                      ? ` · ${String(course.programme_meta.programme_duration_months)} months`
                      : ""}
                  </p>
                </div>
                {modules.length > 0 ? (
                  <Accordion items={modules} allowMultiple />
                ) : (
                  <p className="text-sm text-slate-500">
                    Curriculum modules will be published soon.
                  </p>
                )}
              </div>

              {(mc.why_choose?.intro || whyChooseItems.length > 0) && (
                <div>
                  <SectionHeading>Why Choose Skinfinity Academy?</SectionHeading>
                  {mc.why_choose?.intro && (
                    <p className="mb-4 leading-relaxed text-slate-600">
                      {mc.why_choose.intro}
                    </p>
                  )}
                  <BulletList items={whyChooseItems} />
                </div>
              )}

              {considerations.length > 0 && (
                <div>
                  <SectionHeading>Important Considerations</SectionHeading>
                  <BulletList items={considerations} />
                </div>
              )}

              {courseReviews.length > 0 && (
                <ReviewsCarousel reviews={courseReviews} />
              )}

              <div>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                  <h3
                    className="text-xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    Frequently Asked Questions
                  </h3>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-teal-600 transition-colors hover:text-teal-700"
                  >
                    Still have a question?
                  </Link>
                </div>
                {courseFaqs.length > 0 ? (
                  <Accordion items={courseFaqs} defaultOpen={null} />
                ) : (
                  <p className="text-sm text-slate-500">
                    FAQs will be available soon.
                  </p>
                )}
              </div>
            </div>

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
    </div>
  );
}
