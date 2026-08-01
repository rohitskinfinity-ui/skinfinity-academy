"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CourseCard, { type CourseCardData } from "@/components/shared/CourseCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  fetchCourses,
  formatPrice,
  PLACEHOLDER_AVATAR,
  PLACEHOLDER_COURSE_IMAGE,
} from "@/lib/api/public";

export default function FeaturedPrograms() {
  const [courses, setCourses] = useState<CourseCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchCourses({ limit: 6 });
        if (cancelled) return;
        setCourses(
          list.items.map((c) => ({
            title: c.title,
            desc: c.description ?? "",
            image: c.image_url || PLACEHOLDER_COURSE_IMAGE,
            duration: c.duration_label || "—",
            lessons:
              typeof c.programme_meta?.module_count === "number"
                ? c.programme_meta.module_count
                : 13,
            certificate: c.certificate_label || "Certificate",
            faculty: "Skinfinity Faculty",
            facultyAvatar: PLACEHOLDER_AVATAR,
            price: formatPrice(c.list_price, c.currency || "INR"),
            rating: c.rating != null ? Number(c.rating) : 0,
            tag: c.tag,
            bestseller: c.is_bestseller,
            href: `/courses/${c.slug}`,
          })),
        );
      } catch {
        if (!cancelled) setCourses([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="courses"
      className="bg-[#F8FAFC] px-4 pb-8 pt-8 sm:px-6 sm:pb-8 sm:pt-10 lg:px-8 lg:pt-12"
    >
      <div className="container-max">
        <SectionHeader
          tag="Featured Programs"
          title={
            <>
              Curated courses for{" "}
              <span className="text-teal-700">medical excellence</span>
            </>
          }
          subtitle="Explore flagship programs designed by leading dermatologists and aesthetic medicine experts."
        />

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-400">
            Loading programmes…
          </p>
        ) : courses.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">
            No published programmes yet. Check back soon.
          </p>
        ) : (
          <Stagger className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-2 scrollbar-hide sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:px-0 sm:py-0 lg:grid-cols-3">
            {courses.map((course) => (
              <StaggerItem
                key={course.href || course.title}
                className="w-[80vw] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none"
              >
                <CourseCard course={course} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400 sm:hidden">
          <ArrowRight className="size-3.5" aria-hidden />
          Swipe to explore more programs
        </p>

        <div className="mt-6 flex justify-center">
          <Link href="/courses" className="btn-secondary group">
            View all programs
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
