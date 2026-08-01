"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Building2, Quote, Star } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
import { fetchHomeReviews, PLACEHOLDER_AVATAR } from "@/lib/api/public";
import type { PublicHomeReview } from "@/lib/api/types";

type ReviewCard = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  quote: string;
};

function mapReview(t: PublicHomeReview): ReviewCard {
  const ratingRaw = t.rating == null ? 5 : Number(t.rating);
  return {
    id: t.id,
    name: t.person_name,
    role: t.credentials || t.course_label || "Doctor Alumni",
    company: t.location || t.course_label || "",
    image: t.image_url || PLACEHOLDER_AVATAR,
    rating: Number.isFinite(ratingRaw)
      ? Math.min(5, Math.max(1, Math.round(ratingRaw)))
      : 5,
    quote: t.quote,
  };
}

export default function StudentSuccess() {
  const [reviews, setReviews] = useState<ReviewCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchHomeReviews({ limit: 6 });
        if (cancelled) return;
        setReviews((res.items ?? []).map(mapReview));
      } catch {
        if (!cancelled) setReviews([]);
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
      id="success"
      className="section-padding relative overflow-hidden bg-[#F8FAFC]"
    >
      <div className="container-max relative">
        <SectionHeader
          tag="Testimonials"
          title={
            <>
              Real doctors.{" "}
              <span className="text-teal-700">Real results.</span>
            </>
          }
          subtitle="Hear from healthcare professionals who transformed their careers with Skinfinity Academy."
        />

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-400">
            Loading reviews…
          </p>
        ) : reviews.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">
            No published reviews yet. Check back soon.
          </p>
        ) : (
          <Stagger className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-2 scrollbar-hide sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:px-0 sm:py-0 lg:grid-cols-3">
            {reviews.map((t) => (
              <StaggerItem
                key={t.id}
                className="w-[82vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none"
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-[0_20px_48px_rgba(15,118,110,0.12)]">
                  <div
                    className="mb-3 flex items-center gap-1"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <Quote className="mb-2 size-6 text-teal-200" aria-hidden />
                  <blockquote className="mb-5 flex-1 text-sm leading-relaxed text-slate-600">
                    “{t.quote}”
                  </blockquote>

                  <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                    <Image
                      src={t.image}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover ring-2 ring-teal-50"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                      {t.company ? (
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-teal-700">
                          <Building2 className="size-3" aria-hidden />
                          {t.company}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {!loading && reviews.length > 0 ? (
          <p className="mt-3 text-center text-xs font-medium text-slate-400 sm:hidden">
            Swipe to read more stories →
          </p>
        ) : null}
      </div>
    </section>
  );
}
