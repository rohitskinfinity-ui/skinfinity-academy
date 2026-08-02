"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setStudentToken } from "@/lib/api/student-token";
import { useStudentAuth } from "@/store/student-auth";

function AuthCallbackInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { refreshMe } = useStudentAuth();

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");

    if (error) {
      router.replace(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!token) {
      router.replace("/login?error=oauth_failed");
      return;
    }

    setStudentToken(token);
    void (async () => {
      try {
        await refreshMe();
        router.replace("/dashboard");
      } catch {
        setStudentToken(null);
        router.replace("/login?error=oauth_failed");
      }
    })();
  }, [params, refreshMe, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <p className="text-sm text-slate-500">Signing you in…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
          <p className="text-sm text-slate-500">Signing you in…</p>
        </div>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}
