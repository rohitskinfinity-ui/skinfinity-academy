export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiFailure = {
  success: false;
  message: string;
  errors?: unknown;
};

export type PublicCategory = {
  id: string;
  slug: string;
  title: string;
  icon: string | null;
  sort_order: number;
};

export type CourseMarketingContent = {
  eligibility?: { intro?: string; items?: string[] };
  highlights?: string[];
  training_structure?: {
    groups?: Array<{ title: string; items: string[] }>;
  };
  why_choose?: { intro?: string; items?: string[] };
  important_considerations?: string[];
};

export type PublicCourseCard = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
  duration_label: string | null;
  mode: string | null;
  level: string | null;
  certificate_label: string | null;
  list_price: string | number | null;
  currency: string;
  rating: string | number | null;
  tag: string | null;
  is_bestseller: boolean;
  programme_meta?: Record<string, unknown> | null;
  eligible_qualifications?: string[] | null;
  marketing_content?: CourseMarketingContent | null;
  category_id?: string | null;
  category_slug?: string | null;
  category_title?: string | null;
  published_at?: string | null;
};

export type PublicCourseModule = {
  sort_order: number;
  hands_on_default: boolean;
  delivery_modes: string[];
  live_sessions_planned: number;
  checklist: string[];
  treatment: {
    id: string;
    slug: string;
    name: string;
    summary: string | null;
    image_url: string | null;
  };
};

export type PublicCourseFaq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export type PublicCourseReview = {
  id: string;
  person_name: string;
  credentials: string | null;
  rating: string | number | null;
  quote: string;
  sort_order: number;
  review_date?: string | null;
};

export type PublicCourseDetail = PublicCourseCard & {
  faqs: PublicCourseFaq[];
  reviews?: PublicCourseReview[];
  modules: PublicCourseModule[];
  seo_title?: string | null;
  seo_description?: string | null;
};

export type Paginated<T> = {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
};

export type PublicEvent = {
  id: string;
  type: string;
  slug: string | null;
  title: string;
  description: string | null;
  category_label: string | null;
  starts_at: string;
  ends_at: string | null;
  duration_label: string | null;
  location: string | null;
  venue: string | null;
  seats_total: number | null;
  seats_left: number | null;
  price: string | number | null;
  currency: string;
  image_url: string | null;
  course_id: string | null;
  status: string;
};

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body?: string | null;
  image_url: string | null;
  author_name: string | null;
  read_time_minutes: number | null;
  published_at: string | null;
  category_slug?: string | null;
  category_name?: string | null;
};

export type PublicTestimonial = {
  id: string;
  type: "text" | "video";
  person_name: string;
  credentials: string | null;
  role: string | null;
  company: string | null;
  location: string | null;
  course_label: string | null;
  rating: string | number | null;
  quote: string;
  image_url: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  video_duration: string | null;
  video_title: string | null;
  is_featured: boolean;
  review_date: string | null;
};

export type SubmitApplicationBody = {
  full_name: string;
  guardian_name?: string | null;
  course_preference?: string | null;
  course_slug?: string | null;
  course_id?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  highest_qualification?: string | null;
  profession?: string | null;
  medical_background?: "yes" | "no" | null;
  registration_no?: string | null;
  currently_working?: "yes" | "no" | null;
  whatsapp: string;
  alternate_no?: string | null;
  email: string;
  address?: string | null;
  city_state?: string | null;
  pin_code?: string | null;
  source?: string | null;
  quoted_price?: number | null;
  currency?: string;
  accepted_terms: boolean;
};

export type SubmitContactBody = {
  first_name: string;
  last_name?: string | null;
  email: string;
  phone?: string | null;
  topic?: string | null;
  message: string;
};
