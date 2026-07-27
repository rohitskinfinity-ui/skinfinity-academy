"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";

const certificates = [
  {
    title: "Fellowship in Aesthetic Dermatology",
    date: "Aug 15, 2025",
    instructor: "Dr. Aisha Sharma",
    grade: "A+",
    id: "SKN-2025-001",
  },
  {
    title: "Certificate in Clinical Cosmetology",
    date: "Jun 20, 2025",
    instructor: "Dr. Rajesh Kumar",
    grade: "A",
    id: "SKN-2025-002",
  },
  {
    title: "Advanced Injectables Workshop",
    date: "May 5, 2025",
    instructor: "Dr. Priya Menon",
    grade: "A+",
    id: "SKN-2025-003",
  },
];

export default function CertificatesPage() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div>
      <SectionHeader
        title="My Certificates"
        subtitle="View and download your earned certificates."
      />
      {toast && (
        <div className="mb-4 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-medium text-teal-700">
          {toast}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,118,110,0.1)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-700 to-slate-900 p-5">
              <div className="absolute inset-0 pattern-grid opacity-20" />
              <div className="relative flex h-full flex-col justify-between text-white">
                <div className="flex items-center gap-2">
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
                <div>
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
                    <span className="text-[8px] text-teal-200">{cert.id}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-600">
                  Grade: {cert.grade}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <MaterialIcon name="calendar_month" size={12} /> {cert.date}
                </span>
              </div>
              <p className="mb-3 flex items-center gap-1.5 text-xs text-slate-500">
                <MaterialIcon name="person" size={12} /> {cert.instructor}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => showToast(`Downloading ${cert.id}…`)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-teal-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-teal-700"
                >
                  <MaterialIcon name="download" size={14} /> Download
                </button>
                <button
                  onClick={() => showToast(`Verified: ${cert.id}`)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:border-teal-300 hover:text-teal-600"
                >
                  <MaterialIcon name="verified" size={14} /> Verify
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
