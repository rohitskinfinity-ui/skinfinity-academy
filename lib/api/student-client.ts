import { getApiBaseUrl, ApiError } from "./client";
import { getStudentToken, setStudentToken } from "./student-token";
import type { ApiFailure, ApiSuccess } from "./types";

export type StudentEnrollmentSummary = {
  id: string;
  course_id: string | null;
  status: string;
  course_title: string | null;
};

export type StudentProfile = {
  id: string;
  email: string;
  full_name: string;
  display_name: string | null;
  avatar_url: string | null;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  alternate_phone?: string | null;
  location?: string | null;
  address_line?: string | null;
  city_state?: string | null;
  pin_code?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  program_label?: string | null;
  highest_qualification?: string | null;
  profession?: string | null;
  medical_background?: string | null;
  registration_no?: string | null;
  currently_working?: string | null;
  guardian_name?: string | null;
  enrollments: StudentEnrollmentSummary[];
};

export type StudentEnrollmentListItem = {
  id: string;
  title: string;
  status: string;
  progress_pct: number;
  course_id: string | null;
  workshop_id: string | null;
  course_title: string | null;
  workshop_title: string | null;
  type: "course" | "workshop";
  started_at: string | null;
  treatment_count: number;
};

export type StudentVideoMeta = {
  id: string;
  title: string;
  stage: string;
  kind: string;
  duration_seconds: number | null;
  sort_order: number;
  has_file: boolean;
  progress: {
    last_position_seconds: number;
    watched_percent: number;
    is_completed: boolean;
  };
};

export type StudentEnrollmentDetail = {
  id: string;
  title: string;
  status: string;
  progress_pct: number;
  course_id: string | null;
  workshop_id: string | null;
  course_title: string | null;
  workshop_title: string | null;
  type: "course" | "workshop";
  continue_focus: {
    treatment_id: string;
    treatment_name: string;
    video_id: string | null;
    label: string;
  } | null;
  treatments: Array<{
    enrollment_treatment_id: string;
    treatment_id: string;
    sort_order: number;
    hands_on_included: boolean;
    current_stage: string;
    name: string;
    slug: string;
    summary: string | null;
    stages: Array<{
      stage: string;
      status: string;
      started_at: string | null;
      completed_at: string | null;
    }>;
    videos: StudentVideoMeta[];
    booklets: Array<{
      id: string;
      name: string;
      stage: string;
      mime_type: string | null;
      size_bytes: number | null;
      has_file: boolean;
      sort_order: number;
    }>;
    quiz: {
      id: string;
      title: string;
      pass_percent: number;
      is_required: boolean;
      question_count: number;
      passed: boolean;
      best_percent: number | null;
    } | null;
  }>;
};

export type StudentDashboard = {
  student: {
    full_name: string;
    display_name: string | null;
    email: string;
  };
  stats: {
    active_courses: number;
    treatments: number;
    avg_progress_pct: number;
    total_enrollments: number;
  };
  continue_learning: Array<{
    enrollment_id: string;
    title: string;
    progress_pct: number;
    type: string;
    focus: StudentEnrollmentDetail["continue_focus"];
    treatments_left: number;
  }>;
  enrollments: StudentEnrollmentListItem[];
  upcoming_live: Array<{
    id: string;
    title: string;
    starts_at: string;
    ends_at: string | null;
    course_title: string | null;
    treatment_title: string | null;
    platform: string;
  }>;
};

export type StudentLiveAttachment = {
  id: string;
  file_name: string;
  file_url: string;
  mime_type: string | null;
  size_label: string | null;
};

export type StudentLiveQuiz = {
  id: string;
  title: string;
  pass_percent: number;
  is_required: boolean;
  question_count: number;
};

export type StudentLiveSession = {
  id: string;
  title: string;
  instructor: string;
  starts_at: string;
  ends_at: string | null;
  duration_label: string | null;
  status: "live" | "upcoming" | "completed";
  attendees: number;
  platform: "zoom" | "google_meet";
  meeting_url: string | null;
  drive_url: string | null;
  booklet_label: string | null;
  treatment_id: string;
  treatment_name: string | null;
  course_id: string | null;
  course_title: string | null;
  enrollment_id: string | null;
  recording_status: "pending" | "processing" | "ready" | "failed";
  recording_title: string | null;
  recording_id: string | null;
  recurrence_rule: string | null;
  series_id: string | null;
  reminded: boolean;
  attachments: StudentLiveAttachment[];
  quiz: StudentLiveQuiz | null;
  quiz_attempt_passed: boolean;
};

export type StudentLiveClasses = {
  live_now: StudentLiveSession | null;
  upcoming: StudentLiveSession[];
  past: StudentLiveSession[];
};

export type VideoPlayback = {
  playback_url: string;
  expires_at: string;
  expires_in_seconds: number;
  watermark: { name: string; email: string };
  video: {
    id: string;
    title: string;
    duration_seconds: number | null;
    stage: string;
    treatment_id: string;
    enrollment_id: string;
    enrollment_treatment_id: string;
  };
};

export type StudentQuizPayload = {
  enrollment_id: string;
  treatment_id: string;
  enrollment_treatment_id: string;
  quiz: {
    id: string;
    title: string;
    pass_percent: number;
    is_required: boolean;
    questions: Array<{
      id: string;
      prompt: string;
      options: string[] | unknown;
      sort_order: number;
    }>;
  };
  attempts: Array<{
    id: string;
    score: number;
    max_score: number;
    percent: number;
    passed: boolean;
    submitted_at: string;
  }>;
  already_passed: boolean;
};

export type StudentBookmark = {
  id: string;
  enrollment_id: string | null;
  treatment_id: string;
  video_id: string | null;
  title: string;
  module_label: string | null;
  timestamp_seconds: number | null;
  created_at: string;
  treatment_name?: string | null;
  video_title?: string | null;
};

async function studentFetch<T>(
  path: string,
  init?: RequestInit,
  base: "public" | "student" = "public",
): Promise<T> {
  const token = getStudentToken();
  const url = `${getApiBaseUrl()}/api/${base}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  let payload: ApiSuccess<T> | ApiFailure | null = null;
  try {
    payload = (await res.json()) as ApiSuccess<T> | ApiFailure;
  } catch {
    throw new ApiError("Invalid API response", res.status);
  }

  if (!res.ok || !payload || payload.success === false) {
    if (res.status === 401 || res.status === 403) {
      if (base === "public" && path.includes("/auth/me")) {
        setStudentToken(null);
      } else if (res.status === 401) {
        setStudentToken(null);
      }
    }
    throw new ApiError(
      payload && "message" in payload ? payload.message : "Request failed",
      res.status,
      payload && "errors" in payload ? payload.errors : undefined,
    );
  }

  return payload.data;
}

export async function fetchStudentMe() {
  return studentFetch<StudentProfile>("/auth/me");
}

export async function studentLogout() {
  try {
    await studentFetch<{ ok: boolean }>("/auth/logout", { method: "POST" });
  } catch {
    // ignore
  } finally {
    setStudentToken(null);
  }
}

export async function fetchStudentDashboard() {
  return studentFetch<StudentDashboard>("/dashboard", undefined, "student");
}

export async function fetchStudentLiveClasses() {
  return studentFetch<StudentLiveClasses>("/live", undefined, "student");
}

export async function setStudentLiveReminder(
  eventId: string,
  reminded?: boolean,
) {
  return studentFetch<{ event_id: string; reminded: boolean }>(
    `/live/${eventId}/reminder`,
    {
      method: "POST",
      body: JSON.stringify(reminded === undefined ? {} : { reminded }),
    },
    "student",
  );
}

export async function fetchStudentEnrollments() {
  return studentFetch<{ items: StudentEnrollmentListItem[] }>(
    "/enrollments",
    undefined,
    "student",
  );
}

export async function fetchStudentEnrollment(id: string) {
  return studentFetch<StudentEnrollmentDetail>(
    `/enrollments/${id}`,
    undefined,
    "student",
  );
}

export async function requestVideoPlayback(videoId: string) {
  return studentFetch<VideoPlayback>(
    `/videos/${videoId}/playback`,
    { method: "POST" },
    "student",
  );
}

export async function saveVideoProgress(
  videoId: string,
  body: {
    position_seconds: number;
    watched_percent: number;
    is_completed?: boolean;
  },
) {
  return studentFetch<{
    video_id: string;
    enrollment_id: string;
    last_position_seconds: number;
    watched_percent: number;
    is_completed: boolean;
    enrollment_progress_pct: number;
  }>(`/videos/${videoId}/progress`, {
    method: "PUT",
    body: JSON.stringify(body),
  }, "student");
}

export async function fetchStudentQuiz(
  enrollmentId: string,
  treatmentId: string,
) {
  return studentFetch<StudentQuizPayload>(
    `/enrollments/${enrollmentId}/treatments/${treatmentId}/quiz`,
    undefined,
    "student",
  );
}

export async function submitStudentQuiz(
  enrollmentId: string,
  treatmentId: string,
  answers: Record<string, number>,
) {
  return studentFetch<{
    attempt_id: string | null;
    score: number;
    max_score: number;
    percent: number;
    passed: boolean;
    pass_percent: number;
    enrollment_progress_pct: number;
  }>(
    `/enrollments/${enrollmentId}/treatments/${treatmentId}/quiz`,
    { method: "POST", body: JSON.stringify({ answers }) },
    "student",
  );
}

export type StudentFinalQuizPayload = {
  enrollment_id: string;
  progress_pct: number;
  quiz: {
    id: string;
    title: string;
    pass_percent: number;
    questions: Array<{
      id: string;
      prompt: string;
      options: string[] | unknown;
      sort_order: number;
    }>;
  };
  attempts: Array<{
    id: string;
    score: number;
    max_score: number;
    percent: number;
    passed: boolean;
    submitted_at: string;
  }>;
  already_passed: boolean;
};

export async function fetchStudentFinalQuiz(enrollmentId: string) {
  return studentFetch<StudentFinalQuizPayload>(
    `/enrollments/${enrollmentId}/final-quiz`,
    undefined,
    "student",
  );
}

export async function submitStudentFinalQuiz(
  enrollmentId: string,
  answers: Record<string, number>,
) {
  return studentFetch<{
    attempt_id: string | null;
    score: number;
    max_score: number;
    percent: number;
    passed: boolean;
    pass_percent: number;
    awaiting_admin: boolean;
  }>(
    `/enrollments/${enrollmentId}/final-quiz`,
    { method: "POST", body: JSON.stringify({ answers }) },
    "student",
  );
}

export async function requestBookletDownload(
  enrollmentId: string,
  bookletId: string,
) {
  return studentFetch<{
    url: string;
    expires_at: string;
    booklet: { id: string; name: string; stage: string };
  }>(
    `/enrollments/${enrollmentId}/booklets/${bookletId}/download`,
    { method: "POST" },
    "student",
  );
}

export async function fetchStudentBookmarks() {
  return studentFetch<{ items: StudentBookmark[] }>(
    "/bookmarks",
    undefined,
    "student",
  );
}

export async function createStudentBookmark(body: {
  enrollment_id?: string | null;
  treatment_id: string;
  video_id?: string | null;
  title: string;
  module_label?: string | null;
  timestamp_seconds?: number | null;
}) {
  return studentFetch<StudentBookmark>(
    "/bookmarks",
    { method: "POST", body: JSON.stringify(body) },
    "student",
  );
}

export async function deleteStudentBookmark(id: string) {
  return studentFetch<{ id: string }>(
    `/bookmarks/${id}`,
    { method: "DELETE" },
    "student",
  );
}

export async function patchStudentProfile(body: {
  full_name?: string;
  display_name?: string | null;
  avatar_url?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  alternate_phone?: string | null;
  location?: string | null;
  address_line?: string | null;
  city_state?: string | null;
  pin_code?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  guardian_name?: string | null;
  highest_qualification?: string | null;
  profession?: string | null;
  medical_background?: string | null;
  currently_working?: string | null;
  registration_no?: string | null;
  program_label?: string | null;
}) {
  return studentFetch<StudentProfile>(
    "/profile",
    { method: "PATCH", body: JSON.stringify(body) },
    "student",
  );
}

export type StudentCertificateStatus =
  | "issued"
  | "awaiting_admin"
  | "quiz_ready"
  | "quiz_failed"
  | "quiz_locked"
  | "in_progress";

export type StudentCertificateCard = {
  enrollment_id: string;
  status: StudentCertificateStatus;
  student_name: string;
  title: string;
  certificate_code: string | null;
  grade: string | null;
  issued_at: string | null;
  instructor_name: string | null;
  progress_pct: number;
  quiz_unlocked: boolean;
  quiz_best_percent: number | null;
  quiz_pass_percent: number | null;
  can_download: boolean;
  has_file: boolean;
  blockers: string[];
  verify_url: string | null;
};

export type StudentCertificatePreview = {
  url: string;
  expires_at: string | null;
  issued: boolean;
  certificate_code: string | null;
  content_type?: string | null;
};

export async function fetchStudentCertificates() {
  return studentFetch<{
    student_name: string;
    certificates: StudentCertificateCard[];
  }>("/certificates", undefined, "student");
}

export async function previewStudentCertificate(enrollmentId: string) {
  return studentFetch<StudentCertificatePreview>(
    `/certificates/${enrollmentId}/preview`,
    undefined,
    "student",
  );
}

export async function downloadStudentCertificate(enrollmentId: string) {
  return studentFetch<{
    url: string;
    expires_at: string;
    filename: string;
    certificate_code: string;
  }>(`/certificates/${enrollmentId}/download`, { method: "POST" }, "student");
}

export type StudentReferralItem = {
  id: string;
  invitee_name: string | null;
  invitee_email: string | null;
  status: "pending" | "enrolled" | "rewarded" | "expired" | string;
  reward_amount: number | null;
  currency: string;
  avatar_url: string | null;
  enrolled_at: string | null;
  created_at: string;
};

export type StudentReferralWallet = {
  available: number;
  earned: number;
  redeemed: number;
  currency: string;
};

export type StudentReferralDashboard = {
  code: string;
  link: string;
  reward_amount: number;
  friend_discount: number;
  currency: string;
  wallet?: StudentReferralWallet;
  available_balance?: number;
  referrals: StudentReferralItem[];
};

export async function fetchStudentReferrals() {
  return studentFetch<StudentReferralDashboard>(
    "/referrals",
    undefined,
    "student",
  );
}

export async function fetchStudentWallet() {
  return studentFetch<StudentReferralWallet>("/wallet", undefined, "student");
}

export type StudentPaymentItem = {
  id: string;
  txn_code: string;
  course: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  payment_option?: string | null;
  description?: string | null;
  paid_at: string | null;
  created_at: string;
};

export type StudentPaymentsPayload = {
  summary: {
    total_spent: number;
    pending: number;
    courses_purchased: number;
    currency: string;
  };
  items: StudentPaymentItem[];
};

export async function fetchStudentPayments() {
  return studentFetch<StudentPaymentsPayload>(
    "/payments",
    undefined,
    "student",
  );
}
