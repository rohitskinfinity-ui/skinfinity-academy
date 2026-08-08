"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import CertificateViewer from "@/components/shared/CertificateViewer";
import SectionHeader from "../_components/SectionHeader";
import EmptyState from "../_components/EmptyState";
import CertificatesSkeleton from "../_components/CertificatesSkeleton";
import { ApiError, getApiBaseUrl, publicFetch } from "@/lib/api/client";
import {
  downloadStudentCertificate,
  fetchStudentCertificates,
  previewStudentCertificate,
  type StudentCertificateCard,
  type StudentCertificatePreview,
} from "@/lib/api/student-client";

function formatDate(value: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function lockCopy(cert: StudentCertificateCard) {
  const pass = Math.round(cert.quiz_pass_percent ?? 75);
  const best =
    cert.quiz_best_percent != null ? Math.round(cert.quiz_best_percent) : null;
  switch (cert.status) {
    case "awaiting_admin":
      return "Waiting for the academy to issue your certificate.";
    case "quiz_ready":
      return `Pass the certificate quiz (${pass}%) to unlock download.`;
    case "quiz_failed":
      return `Retake the certificate quiz to unlock. Best ${best ?? 0}% / ${pass}%.`;
    default:
      return `Complete at least 90% of the course to unlock. Progress ${Math.round(cert.progress_pct)}%.`;
  }
}

export default function CertificatesPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<StudentCertificateCard[]>([]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchStudentCertificates();
        if (!cancelled) setItems(res.certificates ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load certificates",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <SectionHeader
        title="My Certificates"
        subtitle="Preview your certificates. Download unlocks after 90% progress, a 75% quiz pass, and academy issue."
      />
      {toast ? (
        <div className="mb-4 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-medium text-teal-700 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-300">
          {toast}
        </div>
      ) : null}

      {loading ? (
        <CertificatesSkeleton />
      ) : error ? (
        <EmptyState icon="error" title="Couldn’t load certificates" description={error} />
      ) : items.length === 0 ? (
        <EmptyState
          icon="military_tech"
          title="No certificates yet"
          description="Enroll in a course to start working toward your certificate."
          action={
            <Link
              href="/dashboard/courses"
              className="rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
            >
              My courses
            </Link>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cert) => (
            <CertificateCard
              key={cert.enrollment_id}
              cert={cert}
              onToast={showToast}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function getDownloadFilename(
  apiFilename: string | undefined | null,
  url: string,
  blobType: string | undefined | null,
  contentType: string | undefined | null,
  fallbackTitle: string
): string {
  if (apiFilename && apiFilename.includes(".")) return apiFilename;

  try {
    const pathname = new URL(url, "http://localhost").pathname;
    const lastPart = pathname.split("/").pop();
    if (lastPart && lastPart.includes(".")) {
      return lastPart;
    }
  } catch {
    /* ignore */
  }

  const sanitized = (fallbackTitle || "certificate")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const type = (blobType || contentType || "").toLowerCase();
  let ext = ".jpg";
  if (type.includes("pdf")) {
    ext = ".pdf";
  } else if (type.includes("png")) {
    ext = ".png";
  } else if (type.includes("webp")) {
    ext = ".webp";
  }

  return `${sanitized || "certificate"}${ext}`;
}

function CertificateCard({
  cert,
  onToast,
}: {
  cert: StudentCertificateCard;
  onToast: (msg: string) => void;
}) {
  const locked = !cert.can_download;
  const [preview, setPreview] = useState<StudentCertificatePreview | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!cert.has_file) return;
    let cancelled = false;
    previewStudentCertificate(cert.enrollment_id)
      .then((data) => {
        if (!cancelled) setPreview(data);
      })
      .catch(() => {
        if (!cancelled) setPreview(null);
      });
    return () => {
      cancelled = true;
    };
  }, [cert.enrollment_id, cert.has_file]);

  const isImage = Boolean(preview?.content_type?.startsWith("image/"));
  const previewUrl = preview?.url ?? null;

  async function onDownload() {
    if (locked || downloading) return;
    setDownloading(true);
    try {
      const res = await downloadStudentCertificate(cert.enrollment_id);

      try {
        const response = await fetch(res.url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const filename = getDownloadFilename(
          res.filename,
          res.url,
          blob.type,
          preview?.content_type,
          cert.title
        );

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      } catch {
        const filename = getDownloadFilename(
          res.filename,
          res.url,
          null,
          preview?.content_type,
          cert.title
        );
        const a = document.createElement("a");
        a.href = res.url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

      onToast(`Downloaded ${res.certificate_code || "certificate"}`);
    } catch (err) {
      onToast(
        err instanceof ApiError ? err.message : "Download is not available yet",
      );
    } finally {
      setDownloading(false);
    }
  }

  async function onVerify() {
    if (!cert.certificate_code || locked || verifying) return;
    setVerifying(true);
    try {
      await publicFetch(`/certificates/verify/${encodeURIComponent(cert.certificate_code)}`);
      onToast(`Verified: ${cert.certificate_code}`);
    } catch {
      const href = `${getApiBaseUrl()}/api/public/certificates/verify/${encodeURIComponent(cert.certificate_code)}`;
      window.open(href, "_blank", "noopener,noreferrer");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200/70 bg-white text-slate-900 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,118,110,0.1)] dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-700 to-slate-900">
        <div
          className={
            locked
              ? "h-full w-full blur-md scale-105 pointer-events-none select-none"
              : "h-full w-full"
          }
        >
          {previewUrl && isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt={cert.title}
              className="h-full w-full object-contain bg-slate-950"
            />
          ) : previewUrl && !isImage ? (
            <CertificateViewer
              src={previewUrl}
              title={cert.title}
              interactive={!locked}
            />
          ) : (
            <PlaceholderFace cert={cert} />
          )}
        </div>

        {locked ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/55 px-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
              <MaterialIcon name="lock" size={20} />
            </div>
            <p className="text-xs font-semibold text-white">Download locked</p>
            <p className="text-[11px] leading-relaxed text-white/80">
              {lockCopy(cert)}
            </p>
            {cert.status === "quiz_ready" || cert.status === "quiz_failed" ? (
              <Link
                href={`/course/${encodeURIComponent(cert.enrollment_id)}/certificate-quiz`}
                className="mt-1 rounded-lg bg-teal-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-teal-400"
              >
                {cert.status === "quiz_failed"
                  ? "Retake certificate quiz"
                  : "Take certificate quiz"}
              </Link>
            ) : (
              <Link
                href={`/course/${encodeURIComponent(cert.enrollment_id)}`}
                className="mt-1 rounded-lg bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-white/25"
              >
                Continue course
              </Link>
            )}
          </div>
        ) : null}
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          {cert.grade ? (
            <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
              Grade: {cert.grade}
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {Math.round(cert.progress_pct)}% complete
            </span>
          )}
          <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <MaterialIcon name="calendar_month" size={12} />{" "}
            {formatDate(cert.issued_at)}
          </span>
        </div>
        <p
          className="mb-1 line-clamp-2 text-sm font-semibold text-slate-800 dark:text-slate-100"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          {cert.title}
        </p>
        <p className="mb-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <MaterialIcon name="person" size={12} /> {cert.student_name}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={locked || downloading}
            onClick={() => void onDownload()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-teal-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
          >
            <MaterialIcon name={locked ? "lock" : "download"} size={14} />
            {downloading ? "Preparing…" : locked ? "Locked" : "Download"}
          </button>
          <button
            type="button"
            disabled={locked || !cert.certificate_code || verifying}
            onClick={() => void onVerify()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition-all hover:border-teal-300 hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-teal-400"
          >
            <MaterialIcon name="verified" size={14} /> Verify
          </button>
        </div>
      </div>
    </div>
  );
}

function PlaceholderFace({ cert }: { cert: StudentCertificateCard }) {
  return (
    <div className="relative flex h-full flex-col justify-between p-5 text-white">
      <div className="absolute inset-0 pattern-grid opacity-20" />
      <div className="relative flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
          <MaterialIcon name="military_tech" size={16} />
        </div>
        <div>
          <p className="text-[10px] font-bold">Skinfinity Academy</p>
          <p className="text-[7px] uppercase tracking-widest text-teal-300">
            Certificate
          </p>
        </div>
      </div>
      <div className="relative">
        <p className="mb-1 text-[8px] uppercase tracking-widest text-teal-300">
          Certificate of Completion
        </p>
        <h3
          className="text-sm font-bold leading-tight"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          {cert.title}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          <MaterialIcon name="qr_code" size={18} className="text-white/70" />
          <span className="text-[8px] text-teal-200">
            {cert.certificate_code || "Pending issue"}
          </span>
        </div>
      </div>
    </div>
  );
}
