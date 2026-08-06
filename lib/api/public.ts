import { publicFetch } from "./client";
import type {
  Paginated,
  PublicBlogPost,
  PublicCalendarCourse,
  PublicCategory,
  PublicCourseCard,
  PublicCourseDetail,
  PublicEvent,
  PublicHomeReviewsResponse,
  PublicTestimonial,
  PublicWorkshop,
  SubmitApplicationBody,
  SubmitContactBody,
} from "./types";

export const PLACEHOLDER_COURSE_IMAGE =
  "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800";

export const PLACEHOLDER_AVATAR =
  "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=200";

export function formatPrice(
  amount: string | number | null | undefined,
  currency = "INR",
) {
  if (amount == null || amount === "") return "Contact us";
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(n)) return "Contact us";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatMode(mode: string | null | undefined) {
  if (!mode) return "Hybrid";
  return mode.charAt(0).toUpperCase() + mode.slice(1);
}

export function formatLevel(level: string | null | undefined) {
  if (!level) return "All Levels";
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export async function fetchCategories() {
  return publicFetch<PublicCategory[]>("/categories");
}

export async function fetchCampuses() {
  return publicFetch<
    Array<{ id: string; name: string; city: string | null; address: string | null }>
  >("/campuses");
}

export async function fetchCourses(params?: {
  category?: string;
  level?: string;
  q?: string;
  page?: number;
  limit?: number;
}) {
  const sp = new URLSearchParams();
  if (params?.category) sp.set("category", params.category);
  if (params?.level) sp.set("level", params.level);
  if (params?.q) sp.set("q", params.q);
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return publicFetch<Paginated<PublicCourseCard>>(
    `/courses${qs ? `?${qs}` : ""}`,
  );
}

export async function fetchCourseBySlug(slug: string) {
  return publicFetch<PublicCourseDetail>(
    `/courses/${encodeURIComponent(slug)}`,
  );
}

export async function fetchWorkshops(params?: {
  page?: number;
  limit?: number;
}) {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return publicFetch<Paginated<PublicWorkshop>>(
    `/workshops${qs ? `?${qs}` : ""}`,
  );
}

export async function fetchWorkshopBySlug(slug: string) {
  return publicFetch<PublicWorkshop>(
    `/workshops/${encodeURIComponent(slug)}`,
  );
}

export async function fetchEvents(params?: {
  type?: string;
  page?: number;
  limit?: number;
}) {
  const sp = new URLSearchParams();
  if (params?.type) sp.set("type", params.type);
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return publicFetch<Paginated<PublicEvent>>(
    `/events${qs ? `?${qs}` : ""}`,
  );
}

export async function fetchCalendarCourses(params?: {
  status?: "upcoming" | "ongoing" | "all";
  search?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}) {
  const sp = new URLSearchParams();
  if (params?.status) sp.set("status", params.status);
  if (params?.search) sp.set("search", params.search);
  if (params?.from) sp.set("from", params.from);
  if (params?.to) sp.set("to", params.to);
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return publicFetch<Paginated<PublicCalendarCourse>>(
    `/calendar${qs ? `?${qs}` : ""}`,
  );
}

export async function fetchSite() {
  return publicFetch<{
    announcements: Array<{ id: string; message: string; href: string | null }>;
    hero_banners: Array<{
      id: string;
      image_url: string;
      eyebrow: string | null;
      title: string;
      subtitle: string | null;
      cta_label: string | null;
      cta_href: string | null;
    }>;
    partners: Array<{ id: string; name: string; logo_url: string | null }>;
    faqs: Array<{
      id: string;
      icon: string | null;
      question: string;
      answer: string;
    }>;
    site_stats: Array<{
      id: string;
      value_label: string;
      suffix: string | null;
      label: string;
    }>;
  }>("/site");
}

export async function fetchAbout() {
  return publicFetch<{
    leadership: Array<{
      id: string;
      name: string;
      role: string;
      bio: string | null;
      image_url: string | null;
    }>;
    milestones: Array<{
      id: string;
      year_label: string;
      title: string;
      description: string | null;
    }>;
    pillars: Array<{
      id: string;
      icon: string | null;
      title: string;
      description: string | null;
      kind: string;
    }>;
    affiliations: Array<{
      id: string;
      name: string;
      description: string | null;
    }>;
    institutional_certificates: Array<{
      id: string;
      code: string;
      title: string;
      subtitle: string | null;
    }>;
    site_stats: Array<{
      id: string;
      value_label: string;
      suffix: string | null;
      label: string;
    }>;
  }>("/about");
}

export async function fetchBlog(params?: { page?: number; limit?: number }) {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return publicFetch<Paginated<PublicBlogPost>>(
    `/blog${qs ? `?${qs}` : ""}`,
  );
}

export async function fetchBlogBySlug(slug: string) {
  return publicFetch<PublicBlogPost>(`/blog/${encodeURIComponent(slug)}`);
}

export async function fetchTestimonials(params?: {
  type?: "text" | "video";
  featured?: boolean;
  page?: number;
  limit?: number;
}) {
  const sp = new URLSearchParams();
  if (params?.type) sp.set("type", params.type);
  if (params?.featured != null) sp.set("featured", String(params.featured));
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return publicFetch<Paginated<PublicTestimonial>>(
    `/testimonials${qs ? `?${qs}` : ""}`,
  );
}

/** Featured written reviews for the marketing homepage. */
export async function fetchHomeReviews(params?: { limit?: number }) {
  const sp = new URLSearchParams();
  if (params?.limit) sp.set("limit", String(params.limit));
  const qs = sp.toString();
  return publicFetch<PublicHomeReviewsResponse>(
    `/reviews${qs ? `?${qs}` : ""}`,
  );
}

export async function submitApplication(body: SubmitApplicationBody) {
  return publicFetch<{
    id: string;
    enrollment_id?: string;
    registration_id: string;
    status: string;
    created_at: string;
    already_enrolled?: boolean;
  }>("/applications", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function submitContact(body: SubmitContactBody) {
  return publicFetch<{ id: string; created_at: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function subscribeNewsletter(email: string) {
  return publicFetch<{ id: string; email: string }>("/newsletter", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
