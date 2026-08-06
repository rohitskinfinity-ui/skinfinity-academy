"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { fetchCategories, fetchCourses, fetchWorkshops } from "@/lib/api/public";

interface CourseItem {
  name: string;
  slug: string;
  badge?: string;
}

interface CourseCategory {
  id: string;
  title: string;
  icon: string;
  courses: CourseItem[];
}

interface NavbarWorkshopItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  href: string;
  badge?: string;
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

const FALLBACK_CATEGORIES: CourseCategory[] = [
  {
    id: "pg-diploma",
    title: "PG Diploma",
    icon: "workspace_premium",
    courses: [
      {
        name: "PG Diploma in Clinical Cosmetology (PGDCC)",
        slug: "pg-diploma-in-clinical-cosmetology",
        badge: "Flagship",
      },
    ],
  },
  {
    id: "diploma",
    title: "Diploma",
    icon: "school",
    courses: [
      {
        name: "Diploma in Clinical Cosmetology",
        slug: "diploma-in-clinical-cosmetology",
        badge: "Popular",
      },
    ],
  },
];

const FALLBACK_WORKSHOPS: NavbarWorkshopItem[] = [
  {
    id: "1",
    title: "Botox & Dermal Fillers Hands-On",
    desc: "1:1 doctor supervised live patient procedure training.",
    icon: "vaccines",
    href: "/workshops",
    badge: "Limited Seats",
  },
  {
    id: "2",
    title: "PRP & GFC Hair Restoration",
    desc: "Centrifugation protocols, scalp mapping & injection technique.",
    icon: "water_drop",
    href: "/workshops",
  },
  {
    id: "3",
    title: "Laser Hair Removal & CO2 Laser",
    desc: "Spot size selection, fluence optimization & cooling safety.",
    icon: "light_mode",
    href: "/workshops",
  },
  {
    id: "4",
    title: "COG Thread Lift Masterclass",
    desc: "Mid-face lifting, vector design & complication management.",
    icon: "architecture",
    href: "/workshops",
    badge: "Advanced",
  },
  {
    id: "5",
    title: "Weight Loss & Body Contouring",
    desc: "Cryolipolysis, RF lipolysis & non-invasive body sculpting protocols.",
    icon: "fitness_center",
    href: "/workshops",
  },
  {
    id: "6",
    title: "Rhinoplasty Courses (Non-Surgical)",
    desc: "Liquid rhinoplasty, nose thread lifts & facial anatomical safety.",
    icon: "face",
    href: "/workshops",
    badge: "Masterclass",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesMobileOpen, setCoursesMobileOpen] = useState(false);
  const [workshopsMobileOpen, setWorkshopsMobileOpen] = useState(false);
  const [testimonialsMobileOpen, setTestimonialsMobileOpen] = useState(false);
  const [courseCategories, setCourseCategories] =
    useState<CourseCategory[]>(FALLBACK_CATEGORIES);
  const [workshopsList, setWorkshopsList] =
    useState<NavbarWorkshopItem[]>(FALLBACK_WORKSHOPS);
  const [activeCategory, setActiveCategory] = useState<string>(
    FALLBACK_CATEGORIES[0]?.id ?? "pg-diploma",
  );
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [cats, courses, workshopRes] = await Promise.all([
          fetchCategories(),
          fetchCourses({ limit: 100 }),
          fetchWorkshops({ limit: 10 }),
        ]);
        if (cancelled) return;

        const mapped: CourseCategory[] = cats
          .map((cat) => ({
            id: cat.slug,
            title: cat.title,
            icon: cat.icon || "school",
            courses: courses.items
              .filter((c) => c.category_slug === cat.slug)
              .map((c) => ({
                name: c.title,
                slug: c.slug,
                badge: c.is_bestseller ? "Popular" : c.tag || undefined,
              })),
          }))
          .filter((cat) => cat.courses.length > 0);

        if (mapped.length > 0) {
          setCourseCategories(mapped);
          setActiveCategory(mapped[0].id);
        }

        if (workshopRes.items.length > 0) {
          const iconList = [
            "vaccines",
            "water_drop",
            "light_mode",
            "architecture",
            "fitness_center",
            "face",
          ];
          const mappedWorkshops: NavbarWorkshopItem[] = workshopRes.items.map(
            (w, idx) => {
              const icon = iconList[idx % iconList.length];
              const desc = w.tagline
                ? w.tagline
                : w.description
                  ? stripHtml(w.description)
                  : `${w.duration_label || "Hands-On"} workshop in ${w.locations || "Noida"}.`;
              const badge = w.duration_label
                ? w.duration_label
                : w.seats_left != null && w.seats_left <= 5
                  ? "Limited Seats"
                  : undefined;

              return {
                id: w.id,
                title: w.title,
                desc,
                icon,
                href: `/workshops/${w.slug}`,
                badge,
              };
            },
          );
          setWorkshopsList(mappedWorkshops);
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentCategoryData =
    courseCategories.find((c) => c.id === activeCategory) || courseCategories[0];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft py-3 border-b border-slate-100"
          : "bg-white backdrop-blur-md py-3.5 border-b border-slate-100"
      }`}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="Skinfinity Academy Logo"
              className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
                SKINFINITY
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-teal-600">
                ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">

            {/* Courses 2-Level Cascading Mega Dropdown */}
            <div className="relative group/mega py-2">
              <Link
                href="/courses"
                className={`text-sm font-semibold flex items-center gap-1 transition-colors duration-200 ${
                  pathname.startsWith("/courses")
                    ? "text-teal-600"
                    : "text-slate-700 hover:text-teal-600"
                }`}
              >
                Courses
                <MaterialIcon
                  name="keyboard_arrow_down"
                  size={16}
                  className="transition-transform duration-200 group-hover/mega:rotate-180"
                />
              </Link>

              {/* Mega Dropdown Menu Container */}
              <div className="invisible opacity-0 translate-y-2 group-hover/mega:visible group-hover/mega:opacity-100 group-hover/mega:translate-y-0 transition-all duration-200 ease-out absolute top-full left-1/2 -translate-x-1/2 w-[780px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 z-50">
                <div className="grid grid-cols-12 gap-4">
                  {/* Left Column: Specialization Categories */}
                  <div className="col-span-5 border-r border-slate-100 pr-3 space-y-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 py-1 mb-1">
                      Specializations
                    </p>
                    {courseCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-left p-2.5 rounded-2xl transition-all duration-200 flex items-center justify-between group/cat cursor-pointer ${
                          activeCategory === cat.id
                            ? "bg-teal-50/80 text-teal-700 font-bold border border-teal-100/80"
                            : "hover:bg-slate-50 text-slate-700 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                              activeCategory === cat.id
                                ? "bg-teal-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-500 group-hover/cat:bg-white group-hover/cat:text-teal-600"
                            }`}
                          >
                            <MaterialIcon name={cat.icon} size={15} />
                          </div>
                          <span
                            className={`text-xs truncate ${
                              activeCategory === cat.id ? "font-bold text-teal-700" : "text-slate-700"
                            }`}
                          >
                            {cat.title}
                          </span>
                        </div>
                        <MaterialIcon
                          name="chevron_right"
                          size={16}
                          className={`transition-transform ${
                            activeCategory === cat.id
                              ? "text-teal-600 translate-x-1"
                              : "text-slate-300 group-hover/cat:text-slate-500"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Right Column: Sub-Courses List Flyout */}
                  <div className="col-span-7 pl-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {currentCategoryData.title}
                        </span>
                        <span className="text-[10px] text-teal-600 font-semibold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                          {currentCategoryData.courses.length} Programs
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {currentCategoryData.courses.map((course) => (
                          <Link
                            key={course.slug}
                            href={`/courses/${course.slug}`}
                            className="p-2.5 rounded-xl hover:bg-teal-50/60 border border-transparent hover:border-teal-100/60 transition-all duration-200 flex items-center justify-between group/cItem"
                          >
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 group-hover/cItem:scale-125 transition-transform flex-shrink-0" />
                              <span className="text-xs font-medium text-slate-800 group-hover/cItem:text-teal-700 group-hover/cItem:font-semibold transition-colors truncate">
                                {course.name}
                              </span>
                            </div>
                            {course.badge && (
                              <span className="text-[9px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                {course.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Looking for customized doctor training?</span>
                      <Link
                        href="/courses"
                        className="font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 hover:underline"
                      >
                        All Programs &gt;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/course-calendar"
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname === "/course-calendar"
                  ? "text-teal-600"
                  : "text-slate-700 hover:text-teal-600"
              }`}
            >
              Calendar
            </Link>

            {/* Workshops Dropdown Mega-Menu */}
            <div className="relative group/workshops py-2">
              <Link
                href="/workshops"
                className={`text-sm font-semibold flex items-center gap-1 transition-colors duration-200 ${
                  pathname.startsWith("/workshops")
                    ? "text-teal-600"
                    : "text-slate-700 hover:text-teal-600"
                }`}
              >
                Workshops
                <MaterialIcon
                  name="keyboard_arrow_down"
                  size={16}
                  className="transition-transform duration-200 group-hover/workshops:rotate-180"
                />
              </Link>

              {/* Workshops Dropdown Grid */}
              <div className="invisible opacity-0 translate-y-2 group-hover/workshops:visible group-hover/workshops:opacity-100 group-hover/workshops:translate-y-0 transition-all duration-200 ease-out absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 z-50">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    Hands-On Masterclass Workshops
                  </span>
                  <Link
                    href="/workshops"
                    className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
                  >
                    View All Workshops &gt;
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {workshopsList.map((w) => (
                    <Link
                      key={w.id || w.title}
                      href={w.href}
                      className="p-3 rounded-2xl hover:bg-teal-50/80 border border-transparent hover:border-teal-100 transition-all duration-200 flex items-start gap-3 group/wItem"
                    >
                      <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover/wItem:bg-teal-600 group-hover/wItem:text-white transition-all shadow-sm">
                        <MaterialIcon name={w.icon} size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h4 className="text-xs font-bold text-slate-900 group-hover/wItem:text-teal-700 transition-colors truncate">
                            {w.title}
                          </h4>
                          {w.badge && (
                            <span className="text-[8px] font-extrabold uppercase text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full flex-shrink-0">
                              {w.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {w.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials Dropdown Menu */}
            <div className="relative group/testimonials py-2">
              <Link
                href="/testimonials"
                className={`text-sm font-semibold flex items-center gap-1 transition-colors duration-200 ${
                  pathname.startsWith("/testimonials")
                    ? "text-teal-600"
                    : "text-slate-700 hover:text-teal-600"
                }`}
              >
                Testimonials
                <MaterialIcon
                  name="keyboard_arrow_down"
                  size={16}
                  className="transition-transform duration-200 group-hover/testimonials:rotate-180"
                />
              </Link>

              {/* Testimonials Menu Popup */}
              <div className="invisible opacity-0 translate-y-2 group-hover/testimonials:visible group-hover/testimonials:opacity-100 group-hover/testimonials:translate-y-0 transition-all duration-200 ease-out absolute top-full left-0 w-64 bg-white rounded-2xl p-3 shadow-2xl border border-slate-100 z-50">
                <div className="space-y-1">
                  <Link
                    href="/testimonials#reviews"
                    className="p-3 rounded-2xl hover:bg-teal-50/80 border border-transparent hover:border-teal-100 transition-all duration-200 flex items-center gap-3 group/tItem"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover/tItem:bg-teal-600 group-hover/tItem:text-white transition-all shadow-sm">
                      <MaterialIcon name="rate_review" size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover/tItem:text-teal-700 transition-colors">
                        Reviews
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Verified doctor feedback
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/testimonials#video-reviews"
                    className="p-3 rounded-2xl hover:bg-teal-50/80 border border-transparent hover:border-teal-100 transition-all duration-200 flex items-center gap-3 group/tItem"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover/tItem:bg-teal-600 group-hover/tItem:text-white transition-all shadow-sm">
                      <MaterialIcon name="play_circle" size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover/tItem:text-teal-700 transition-colors">
                        Video Reviews
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Live procedural feedback
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/blog"
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname === "/blog" ? "text-teal-600" : "text-slate-700 hover:text-teal-600"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/about"
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname === "/about" ? "text-teal-600" : "text-slate-700 hover:text-teal-600"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname === "/contact" ? "text-teal-600" : "text-slate-700 hover:text-teal-600"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-bold text-slate-700 hover:text-teal-600">
                Login
              </Button>
            </Link>
            <Link href="/enroll">
              <Button className="btn-primary !py-2.5 !px-5 font-bold shadow-teal cursor-pointer">
                Enroll Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="lg:hidden p-2 text-slate-700 hover:text-teal-600">
              <MaterialIcon name="menu" size={24} />
            </SheetTrigger>

            <SheetContent side="right" className="w-80 p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <SheetTitle className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Navigation Menu
                </SheetTitle>

                <div className="space-y-3">

                  {/* Courses Accordion Mobile */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setCoursesMobileOpen(!coursesMobileOpen)}
                      className="w-full flex items-center justify-between text-base font-semibold text-slate-800 hover:text-teal-600"
                    >
                      <span>Courses</span>
                      <MaterialIcon
                        name="keyboard_arrow_down"
                        size={18}
                        className={`transition-transform ${
                          coursesMobileOpen ? "rotate-180 text-teal-600" : ""
                        }`}
                      />
                    </button>

                    {coursesMobileOpen && (
                      <div className="pl-4 space-y-2 border-l-2 border-teal-100 pt-1">
                        {courseCategories.map((c) => (
                          <div key={c.id} className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                              {c.title}
                            </span>
                            {c.courses.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/courses/${sub.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="block text-xs font-medium text-slate-600 hover:text-teal-600 py-0.5"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/course-calendar"
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-semibold text-slate-800 hover:text-teal-600"
                  >
                    Calendar
                  </Link>

                  {/* Workshops Accordion Mobile */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setWorkshopsMobileOpen(!workshopsMobileOpen)}
                      className="w-full flex items-center justify-between text-base font-semibold text-slate-800 hover:text-teal-600"
                    >
                      <span>Workshops</span>
                      <MaterialIcon
                        name="keyboard_arrow_down"
                        size={18}
                        className={`transition-transform ${
                          workshopsMobileOpen ? "rotate-180 text-teal-600" : ""
                        }`}
                      />
                    </button>

                    {workshopsMobileOpen && (
                      <div className="pl-4 space-y-1.5 border-l-2 border-teal-100 pt-1">
                        {workshopsList.map((w) => (
                          <Link
                            key={w.title}
                            href={w.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-xs font-medium text-slate-600 hover:text-teal-600 py-1"
                          >
                            {w.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Testimonials Accordion Mobile */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setTestimonialsMobileOpen(!testimonialsMobileOpen)}
                      className="w-full flex items-center justify-between text-base font-semibold text-slate-800 hover:text-teal-600"
                    >
                      <span>Testimonials</span>
                      <MaterialIcon
                        name="keyboard_arrow_down"
                        size={18}
                        className={`transition-transform ${
                          testimonialsMobileOpen ? "rotate-180 text-teal-600" : ""
                        }`}
                      />
                    </button>

                    {testimonialsMobileOpen && (
                      <div className="pl-4 space-y-1.5 border-l-2 border-teal-100 pt-1">
                        <Link
                          href="/testimonials#reviews"
                          onClick={() => setMobileOpen(false)}
                          className="block text-xs font-medium text-slate-600 hover:text-teal-600 py-1"
                        >
                          Doctor Reviews
                        </Link>
                        <Link
                          href="/testimonials#video-reviews"
                          onClick={() => setMobileOpen(false)}
                          className="block text-xs font-medium text-slate-600 hover:text-teal-600 py-1"
                        >
                          Video Feedback
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-semibold text-slate-800 hover:text-teal-600"
                  >
                    Blog
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-semibold text-slate-800 hover:text-teal-600"
                  >
                    About
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-semibold text-slate-800 hover:text-teal-600"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="btn-secondary justify-center w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/enroll" onClick={() => setMobileOpen(false)}>
                  <Button className="btn-primary justify-center w-full cursor-pointer">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
