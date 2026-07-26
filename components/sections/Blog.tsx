"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const blogs = [
  {
    category: "Research",
    title: "The Future of Laser Dermatology: 2025 Trends",
    excerpt:
      "Explore the latest advancements in laser technology and how they're reshaping aesthetic medicine.",
    image:
      "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Dr. Neha Gupta",
    date: "Aug 2, 2025",
    readTime: "8 min",
    href: "/blog",
  },
  {
    category: "Case Study",
    title: "Managing Complications in Dermal Fillers",
    excerpt:
      "A comprehensive case study on identifying, preventing, and managing vascular complications.",
    image:
      "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Dr. Priya Menon",
    date: "Jul 28, 2025",
    readTime: "12 min",
    href: "/blog",
  },
  {
    category: "Medical Updates",
    title: "New Protocols in Chemical Peel Safety",
    excerpt:
      "Updated guidelines from international dermatology associations on chemical peel procedures.",
    image:
      "https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Dr. Arjun Reddy",
    date: "Jul 20, 2025",
    readTime: "6 min",
    href: "/blog",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-max">
        <FadeIn className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="section-tag mb-2 inline-flex">Blog & Insights</span>
            <h2
              className="section-title mt-2 mb-2 text-left"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Latest in{" "}
              <span className="text-teal-700">dermatology</span>
            </h2>
            <p className="section-subtitle mx-0 max-w-lg text-left">
              Research, case studies, and clinical updates from Skinfinity
              faculty.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 transition-colors hover:text-teal-800"
          >
            View all articles
            <ArrowRight className="size-4" />
          </Link>
        </FadeIn>

        <Stagger className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-2 scrollbar-hide sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:px-0 sm:py-0 lg:grid-cols-3">
          {blogs.map((b) => (
            <StaggerItem
              key={b.title}
              className="w-[82vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <Link href={b.href} className="block h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_16px_40px_rgba(15,118,110,0.1)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={b.image}
                      alt={b.title}
                      fill
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-700 shadow-sm">
                      {b.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2.5 flex items-center gap-3 text-[11px] font-medium text-slate-400">
                      <span>{b.date}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {b.readTime}
                      </span>
                    </div>

                    <h3
                      className="mb-2 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-700"
                      style={{ fontFamily: "var(--font-heading), sans-serif" }}
                    >
                      {b.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
                      {b.excerpt}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs font-semibold text-slate-600">
                        {b.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 transition-all group-hover:gap-1.5">
                        Read more
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-3 text-center text-xs font-medium text-slate-400 sm:hidden">
          Swipe to explore more articles →
        </p>
      </div>
    </section>
  );
}
