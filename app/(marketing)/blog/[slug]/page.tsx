"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { fetchBlogBySlug, PLACEHOLDER_COURSE_IMAGE } from "@/lib/api/public";
import type { PublicBlogPost } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

function renderBody(body: string | null | undefined) {
  if (!body?.trim()) {
    return (
      <p className="text-slate-500">Full article content will appear here.</p>
    );
  }

  return body
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => (
      <p key={para.slice(0, 40)} className="leading-relaxed text-slate-600">
        {para}
      </p>
    ));
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [post, setPost] = useState<PublicBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        const data = await fetchBlogBySlug(slug);
        if (!cancelled) setPost(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        } else {
          setError(err instanceof Error ? err.message : "Failed to load post");
        }
        setPost(null);
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
        <p className="text-sm text-slate-400">Loading article…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <p className="text-lg font-bold text-slate-900">Article not found</p>
        <Link href="/blog" className="btn-primary">
          Back to blog
        </Link>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <p className="text-lg font-bold text-slate-900">Could not load article</p>
        <p className="text-sm text-red-600">{error || "Unknown error"}</p>
        <Link href="/blog" className="btn-secondary">
          Back to blog
        </Link>
      </div>
    );
  }

  const published = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div>
      <PageHeader
        title={post.category_name || "Blog"}
        highlight="Insights"
        subtitle={post.excerpt || undefined}
        breadcrumb="Blog"
      />

      <article className="bg-white py-12">
        <div className="container-max max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <ArrowLeft className="size-4" />
            All articles
          </Link>

          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-teal-600">
            {post.category_name || "Insights"}
          </p>
          <h1
            className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {post.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="font-medium text-slate-700">
              {post.author_name || "Skinfinity Academy"}
            </span>
            {published ? <span>· {published}</span> : null}
            {post.read_time_minutes ? (
              <span className="inline-flex items-center gap-1">
                · <Clock className="size-3.5" /> {post.read_time_minutes} min
                read
              </span>
            ) : null}
          </div>

          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={post.image_url || PLACEHOLDER_COURSE_IMAGE}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <div className="space-y-5 text-base">{renderBody(post.body)}</div>
        </div>
      </article>
    </div>
  );
}
