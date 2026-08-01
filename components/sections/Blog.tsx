"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { fetchBlog, PLACEHOLDER_COURSE_IMAGE } from "@/lib/api/public";

type BlogCard = {
  category: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  href: string;
};

const FALLBACK: BlogCard[] = [
  {
    category: "Updates",
    title: "Clinical Cosmetology programmes now open",
    excerpt:
      "Explore our Diploma and PG Diploma pathways designed for medical practitioners.",
    image: PLACEHOLDER_COURSE_IMAGE,
    author: "Skinfinity Academy",
    date: "Coming soon",
    readTime: "3 min",
    href: "/blog",
  },
];

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogCard[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchBlog({ limit: 3 });
        if (cancelled) return;
        if (list.items.length === 0) return;
        setBlogs(
          list.items.map((p) => ({
            category: p.category_name || "Insights",
            title: p.title,
            excerpt: p.excerpt || "",
            image: p.image_url || PLACEHOLDER_COURSE_IMAGE,
            author: p.author_name || "Skinfinity Academy",
            date: p.published_at
              ? new Date(p.published_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "",
            readTime: p.read_time_minutes
              ? `${p.read_time_minutes} min`
              : "5 min",
            href: `/blog/${p.slug}`,
          })),
        );
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
              Latest in <span className="text-teal-700">dermatology</span>
            </h2>
            <p className="text-sm text-slate-500">
              Clinical insights, programme updates, and aesthetic medicine
              education.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </FadeIn>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <StaggerItem key={post.href}>
              <Link
                href={post.href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-teal-600">
                    {post.category}
                  </span>
                  <h3 className="mb-2 text-base font-bold text-slate-900 group-hover:text-teal-700">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 flex-1 text-sm text-slate-500">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{post.author}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
