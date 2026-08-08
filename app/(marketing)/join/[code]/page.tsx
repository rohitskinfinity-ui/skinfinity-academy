"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function JoinReferralPage() {
  const params = useParams();
  const router = useRouter();
  const raw =
    typeof params.code === "string"
      ? params.code
      : Array.isArray(params.code)
        ? params.code[0]
        : "";

  useEffect(() => {
    const code = decodeURIComponent(raw || "").trim();
    const qs = code
      ? `?ref=${encodeURIComponent(code.toUpperCase())}`
      : "";
    router.replace(`/enroll${qs}`);
  }, [raw, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 text-sm text-slate-600">
      Opening enrollment…
    </div>
  );
}
