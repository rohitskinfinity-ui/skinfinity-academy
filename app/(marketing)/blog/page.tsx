"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { fetchBlog, PLACEHOLDER_COURSE_IMAGE } from "@/lib/api/public";
import type { PublicBlogPost } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

export default function BlogPage() {
  const [posts, setPosts] = useState<PublicBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBlog({ page, limit: 9 });
        if (cancelled) return;
        setPosts(data.items);
        setTotalPages(data.meta.total_pages || 1);
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof ApiError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Failed to load blog",
        );
        setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <div>
      <PageHeader
        title="Blog &"
        highlight="Insights"
        subtitle="Stay updated with the latest research, case studies, and medical advances in dermatology."
        breadcrumb="Blog"
      />

      <section className="bg-white py-12">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-sm text-slate-400">Loading articles…</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-slate-500">No articles published yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={post.image_url || PLACEHOLDER_COURSE_IMAGE}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-teal-600">
                      {post.category_name || "Insights"}
                    </span>
                    <h3 className="mb-2 text-base font-bold text-slate-900 group-hover:text-teal-700">
                      {post.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 flex-1 text-sm text-slate-500">
                      {post.excerpt || ""}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{post.author_name || "Skinfinity Academy"}</span>
                      {post.read_time_minutes ? (
                        <span className="inline-flex items-center gap-1">
                          · <Clock className="size-3" />{" "}
                          {post.read_time_minutes} min
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <div className="mt-10 flex justify-center gap-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="btn-secondary disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn-secondary disabled:opacity-40"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
