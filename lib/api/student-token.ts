const TOKEN_KEY = "academy_student_token";

type Listener = () => void;

let tokenMemory: string | null | undefined;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener();
}

export function getStudentToken(): string | null {
  if (typeof window === "undefined") return null;
  if (tokenMemory !== undefined) return tokenMemory;
  tokenMemory = localStorage.getItem(TOKEN_KEY);
  return tokenMemory;
}

export function setStudentToken(token: string | null) {
  if (typeof window === "undefined") return;
  tokenMemory = token;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
  emit();
}

export function subscribeStudentToken(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getGoogleAuthStartUrl() {
  const base =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://localhost:3001";
  return `${base}/api/public/auth/google`;
}
