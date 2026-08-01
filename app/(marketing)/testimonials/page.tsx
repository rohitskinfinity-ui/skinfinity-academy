"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Link from "next/link";
import {
  PLACEHOLDER_AVATAR,
  fetchTestimonials,
} from "@/lib/api/public";
import type { PublicTestimonial } from "@/lib/api/types";

type VideoCard = {
  id: string;
  doctor: string;
  title: string;
  course: string;
  location: string;
  thumbnail: string;
  quote: string;
  duration: string;
  videoUrl: string | null;
};

type WrittenCard = {
  id: string;
  doctor: string;
  credentials: string;
  location: string;
  course: string;
  rating: number;
  date: string;
  text: string;
  clinic: string;
};

function formatReviewDate(value: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function mapVideo(t: PublicTestimonial): VideoCard {
  return {
    id: t.id,
    doctor: t.person_name,
    title: t.credentials || t.role || "Doctor Alumni",
    course: t.course_label || "Skinfinity Academy",
    location: t.location || "",
    thumbnail: t.thumbnail_url || t.image_url || PLACEHOLDER_AVATAR,
    quote: t.quote,
    duration: t.video_duration || "",
    videoUrl: t.video_url,
  };
}

function mapWritten(t: PublicTestimonial): WrittenCard {
  const ratingRaw = t.rating == null ? 5 : Number(t.rating);
  return {
    id: t.id,
    doctor: t.person_name,
    credentials: t.credentials || t.role || "",
    location: t.location || "",
    course: t.course_label || "",
    rating: Number.isFinite(ratingRaw) ? Math.round(ratingRaw) : 5,
    date: formatReviewDate(t.review_date),
    text: t.quote,
    clinic: t.company || t.role || "",
  };
}

function isDirectVideo(url: string | null) {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "video" | "reviews">("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);
  const [videoReviews, setVideoReviews] = useState<VideoCard[]>([]);
  const [writtenReviews, setWrittenReviews] = useState<WrittenCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [videos, texts] = await Promise.all([
          fetchTestimonials({ type: "video", limit: 50 }),
          fetchTestimonials({ type: "text", limit: 50 }),
        ]);
        if (cancelled) return;
        setVideoReviews((videos.items ?? []).map(mapVideo));
        setWrittenReviews((texts.items ?? []).map(mapWritten));
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Failed to load testimonials",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const avgRating = useMemo(() => {
    const ratings = writtenReviews
      .map((r) => r.rating)
      .filter((n) => Number.isFinite(n) && n > 0);
    if (!ratings.length) return null;
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return avg.toFixed(1);
  }, [writtenReviews]);

  return (
    <div>
      <PageHeader
        title="Doctor & Alumni"
        highlight="Testimonials"
        subtitle="Read verified reviews, clinical career growth stories, and watch live video feedback from doctors trained at Skinfinity Academy."
        breadcrumb="Testimonials"
      />

      <section className="sticky top-20 z-30 border-b border-slate-200/60 bg-slate-50 py-8 shadow-xs">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-200/70 p-1.5">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Feedback
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("video")}
                className={`flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                  activeTab === "video"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <MaterialIcon name="videocam" size={16} />
                Video Reviews
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                  activeTab === "reviews"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <MaterialIcon name="rate_review" size={16} />
                Written Reviews
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1">
                <MaterialIcon
                  name="star"
                  size={16}
                  className="fill-amber-500 text-amber-500"
                />
                {avgRating
                  ? `${avgRating} / 5.0 Rating (${writtenReviews.length} Reviews)`
                  : "Verified Doctor Alumni"}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
              <span className="hidden text-teal-700 sm:inline-block">
                100% Verified Doctor Alumni
              </span>
            </div>
          </div>
        </div>
      </section>

      {error ? (
        <div className="container-max px-4 py-16 text-center text-sm text-rose-600 sm:px-6 lg:px-8">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="container-max px-4 py-16 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          Loading testimonials…
        </div>
      ) : null}

      {!loading && (activeTab === "all" || activeTab === "video") && (
        <section
          id="video-reviews"
          className="border-b border-slate-100 bg-white py-16"
        >
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold tracking-widest text-teal-600 uppercase">
                  Video Feedback
                </span>
                <h2
                  className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Doctor Video Testimonials
                </h2>
              </div>
            </div>

            {!videoReviews.length ? (
              <p className="text-sm text-slate-500">
                No video testimonials published yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {videoReviews.map((v) => (
                  <div
                    key={v.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:shadow-card-hover"
                  >
                    <div
                      className="relative aspect-video cursor-pointer overflow-hidden bg-slate-900"
                      onClick={() => setSelectedVideo(v)}
                    >
                      <img
                        src={v.thumbnail}
                        alt={v.doctor}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 transition-all group-hover:bg-slate-950/20">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg transition-transform group-hover:scale-110">
                          <MaterialIcon name="play_arrow" size={28} />
                        </div>
                      </div>
                      {v.duration ? (
                        <span className="absolute right-3 bottom-3 rounded-md bg-slate-950/80 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-xs">
                          {v.duration}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <p className="mb-1 text-xs font-bold tracking-wider text-teal-600 uppercase">
                          {v.course}
                        </p>
                        <h3
                          className="text-lg font-bold text-slate-900"
                          style={{
                            fontFamily: "var(--font-heading), sans-serif",
                          }}
                        >
                          {v.doctor}
                        </h3>
                        <p className="mb-3 text-xs font-medium text-slate-500">
                          {v.title}
                          {v.location ? ` • ${v.location}` : ""}
                        </p>
                        <p className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600 italic">
                          &ldquo;{v.quote}&rdquo;
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedVideo(v)}
                        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-teal-50 py-2.5 text-xs font-bold text-teal-700 transition-colors hover:bg-teal-100/80"
                      >
                        <MaterialIcon name="play_circle" size={16} />
                        Watch Doctor Interview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {!loading && (activeTab === "all" || activeTab === "reviews") && (
        <section id="reviews" className="bg-slate-50 py-16">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold tracking-widest text-teal-600 uppercase">
                Verified Reviews
              </span>
              <h2
                className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                What Doctors Say About Our Training
              </h2>
            </div>

            {!writtenReviews.length ? (
              <p className="text-sm text-slate-500">
                No written reviews published yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {writtenReviews.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-card-hover"
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(Math.max(1, Math.min(5, r.rating)))].map(
                            (_, i) => (
                              <MaterialIcon
                                key={i}
                                name="star"
                                size={16}
                                className="fill-amber-500 text-amber-500"
                              />
                            ),
                          )}
                        </div>
                        {r.date ? (
                          <span className="text-[11px] font-semibold text-slate-400">
                            {r.date}
                          </span>
                        ) : null}
                      </div>

                      <p className="mb-4 text-xs leading-relaxed text-slate-700 sm:text-sm">
                        &ldquo;{r.text}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <div>
                        <h4
                          className="text-sm font-bold text-slate-900"
                          style={{
                            fontFamily: "var(--font-heading), sans-serif",
                          }}
                        >
                          {r.doctor}
                        </h4>
                        {r.credentials ? (
                          <p className="text-[11px] font-semibold text-teal-600">
                            {r.credentials}
                          </p>
                        ) : null}
                        <p className="text-[10px] font-medium text-slate-400">
                          {[r.clinic, r.location].filter(Boolean).join(" • ")}
                        </p>
                      </div>
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                        <MaterialIcon name="verified" size={18} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-4 text-white">
              <div className="flex items-center gap-3">
                <MaterialIcon
                  name="videocam"
                  size={20}
                  className="text-teal-400"
                />
                <div>
                  <h4 className="text-sm font-bold">{selectedVideo.doctor}</h4>
                  <p className="text-[11px] text-slate-400">
                    {selectedVideo.course}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            <div className="relative aspect-video bg-black">
              {selectedVideo.videoUrl && isDirectVideo(selectedVideo.videoUrl) ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                  poster={selectedVideo.thumbnail}
                />
              ) : selectedVideo.videoUrl ? (
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.doctor}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative flex h-full items-center justify-center">
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.doctor}
                    className="h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/40 p-6 text-center">
                    <p className="max-w-md text-sm font-bold text-white">
                      &ldquo;{selectedVideo.quote}&rdquo;
                    </p>
                    <span className="text-xs font-semibold text-teal-300">
                      Video URL not set yet
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="bg-white py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white shadow-card sm:p-12 md:flex-row">
            <div className="max-w-xl">
              <span className="mb-3 inline-block rounded-full border border-teal-500/20 bg-teal-500/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-teal-400 uppercase">
                Join 12,000+ Enrolled Doctors
              </span>
              <h3
                className="text-2xl font-extrabold sm:text-3xl"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Ready to elevate your clinical practice?
              </h3>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                Enroll in hands-on clinical masterclasses and master high-demand
                aesthetic procedures.
              </p>
            </div>

            <div className="flex w-full flex-shrink-0 flex-col gap-3 sm:flex-row md:w-auto">
              <Link
                href="/courses"
                className="shadow-teal flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-teal-700"
              >
                Explore All Courses
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/15"
              >
                Book Advisory Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
