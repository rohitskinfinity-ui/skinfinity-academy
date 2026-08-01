import type { ApiFailure, ApiSuccess } from "./types";

const DEFAULT_API_URL = "http://localhost:3000";

export function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || DEFAULT_API_URL
  );
}

export class ApiError extends Error {
  status: number;
  errors?: unknown;

  constructor(message: string, status: number, errors?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export async function publicFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = `${getApiBaseUrl()}/api/public${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: init?.cache ?? "no-store",
  });

  let payload: ApiSuccess<T> | ApiFailure | null = null;
  try {
    payload = (await res.json()) as ApiSuccess<T> | ApiFailure;
  } catch {
    throw new ApiError("Invalid API response", res.status);
  }

  if (!res.ok || !payload || payload.success === false) {
    throw new ApiError(
      payload && "message" in payload ? payload.message : "Request failed",
      res.status,
      payload && "errors" in payload ? payload.errors : undefined,
    );
  }

  return payload.data;
}
