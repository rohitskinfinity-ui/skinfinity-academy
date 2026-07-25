"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";

/* ── Section header helper ── */
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1
        className="text-2xl font-bold text-slate-900"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        {title}
      </h1>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}

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
  return (
    <>
      <SectionHeader
        title="My Certificates"
        subtitle="View and download your earned certificates."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-50 group hover:shadow-card-hover hover:-translate-y-1 transition-all"
          >
            {/* Certificate preview */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-teal-700 to-slate-900 p-5 overflow-hidden">
              <div className="absolute inset-0 pattern-grid opacity-20" />
              <div className="relative h-full flex flex-col justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                    <MaterialIcon name="military_tech" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold">Skinfinity Academy</p>
                    <p className="text-[7px] text-teal-300 tracking-widest uppercase">
                      Certificate
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[8px] text-teal-300 uppercase tracking-widest mb-1">
                    Certificate of Completion
                  </p>
                  <h3
                    className="text-sm font-bold leading-tight"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <MaterialIcon
                      name="qr_code"
                      size={20}
                      className="text-white/70"
                    />
                    <span className="text-[8px] text-teal-200">{cert.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                  Grade: {cert.grade}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MaterialIcon name="calendar_month" size={12} /> {cert.date}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                <MaterialIcon name="person" size={12} /> {cert.instructor}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-teal-600 text-white text-xs font-semibold rounded-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-1.5">
                  <MaterialIcon name="download" size={14} /> Download
                </button>
                <button className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:border-teal-300 hover:text-teal-600 transition-all flex items-center justify-center gap-1.5">
                  <MaterialIcon name="verified_user" size={14} /> Verify
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
