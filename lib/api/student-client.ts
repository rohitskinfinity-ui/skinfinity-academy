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
  enrollments: StudentEnrollmentSummary[];
};

async function studentFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const token = getStudentToken();
  const url = `${getApiBaseUrl()}/api/public${path.startsWith("/") ? path : `/${path}`}`;
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
      setStudentToken(null);
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
    // ignore — clear local token anyway
  } finally {
    setStudentToken(null);
  }
}
