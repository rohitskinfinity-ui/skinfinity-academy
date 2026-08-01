"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import {
  fetchCategories,
  fetchCourses,
  formatLevel,
  formatMode,
  formatPrice,
  PLACEHOLDER_COURSE_IMAGE,
} from "@/lib/api/public";
import type { PublicCategory, PublicCourseCard } from "@/lib/api/types";

type CourseCardItem = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  duration: string;
  mode: string;
  certificate: string;
  faculty: string;
  price: string;
  rating: number;
  category: string;
  categorySlug: string;
  level: string;
};

function mapCourse(c: PublicCourseCard): CourseCardItem {
  return {
    slug: c.slug,
    title: c.title,
    desc: c.description ?? "",
    image: c.image_url || PLACEHOLDER_COURSE_IMAGE,
    duration: c.duration_label || "—",
    mode: formatMode(c.mode),
    certificate: c.certificate_label || "Certificate",
    faculty: "Skinfinity Faculty",
    price: formatPrice(c.list_price, c.currency || "INR"),
    rating: c.rating != null ? Number(c.rating) : 0,
    category: c.category_title || "Programme",
    categorySlug: c.category_slug || "",
    level: formatLevel(c.level),
  };
}

export default function CoursesPage() {
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Levels");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [courses, setCourses] = useState<CourseCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [cats, list] = await Promise.all([
          fetchCategories(),
          fetchCourses({ limit: 100 }),
        ]);
        if (cancelled) return;
        setCategories(cats);
        setCourses(list.items.map(mapCourse));
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load courses");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryOptions = useMemo(
    () => ["All", ...categories.map((c) => c.title)],
    [categories],
  );
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  const filtered = courses.filter((c) => {
    const catOk =
      category === "All" ||
      c.category === category ||
      c.categorySlug ===
        categories.find((cat) => cat.title === category)?.slug;
    const levelOk = level === "All Levels" || c.level === level;
    const searchOk =
      search === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase());
    return catOk && levelOk && searchOk;
  });

  return (
    <div>
      <PageHeader
        title="Explore Our"
        highlight="Courses & Programs"
        subtitle="Browse our complete catalog of dermatology and aesthetic medicine courses, designed for every level of expertise."
        breadcrumb="Courses"
      />

      <section className="border-y border-slate-100 bg-white py-6">
        <div className="container-max px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              icon: "menu_book",
              label: "Total Courses",
              value: loading ? "…" : String(courses.length),
            },
            { icon: "person", label: "Expert Faculty", value: "80+" },
            {
              icon: "workspace_premium",
              label: "Categories",
              value: loading ? "…" : String(categories.length),
            },
            { icon: "trending_up", label: "Completion Rate", value: "87%" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <MaterialIcon name={s.icon} size={20} className="text-teal-600" />
              </div>
              <div>
                <p
                  className="text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 bg-slate-50/50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <MaterialIcon
                name="search"
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-11"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl border border-slate-200">
                <MaterialIcon name="filter_list" size={16} className="text-slate-400" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-sm font-medium text-slate-600 focus:outline-none bg-transparent"
                >
                  {categoryOptions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl border border-slate-200">
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="text-sm font-medium text-slate-600 focus:outline-none bg-transparent"
                >
                  {levels.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <p className="text-sm text-slate-400 mb-6">
            {loading ? "Loading courses…" : `${filtered.length} courses found`}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div key={course.slug} className="card-academy overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 glass rounded-xl px-2.5 py-1 text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                    {course.category}
                  </span>
                  <span className="absolute top-3 right-3 glass rounded-xl px-2.5 py-1 text-[10px] font-bold text-slate-700">
                    {course.level}
                  </span>
                  {course.rating > 0 && (
                    <div className="absolute bottom-3 right-3 glass rounded-xl px-2.5 py-1 flex items-center gap-1">
                      <MaterialIcon name="star" size={12} className="text-amber-400" filled />
                      <span className="text-xs font-bold text-white">
                        {course.rating}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3
                    className="font-bold text-slate-900 text-base mb-2 group-hover:text-teal-600 transition-colors"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                    {course.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MaterialIcon name="schedule" size={13} className="text-teal-500" />{" "}
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MaterialIcon
                        name="desktop_windows"
                        size={13}
                        className="text-teal-500"
                      />{" "}
                      {course.mode}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MaterialIcon
                        name="workspace_premium"
                        size={13}
                        className="text-teal-500"
                      />{" "}
                      {course.certificate}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MaterialIcon name="person" size={13} className="text-teal-500" />{" "}
                      {course.faculty}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <p
                      className="text-lg font-bold text-slate-900"
                      style={{ fontFamily: "var(--font-heading), sans-serif" }}
                    >
                      {course.price}
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="px-4 py-2.5 text-xs font-semibold text-teal-600 border border-teal-200 rounded-xl hover:bg-teal-50 transition-all"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/enroll?program=${encodeURIComponent(course.slug)}`}
                        className="px-4 py-2.5 text-xs font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        Enroll <MaterialIcon name="arrow_forward" size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-sm">
                No courses match your filters. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
