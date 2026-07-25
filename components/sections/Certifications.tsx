import MaterialIcon from "@/components/shared/MaterialIcon";

const certifications = [
  { name: "CIBTAC", desc: "Confederation of International Beauty Therapy & Cosmetology", color: "from-teal-500 to-teal-700" },
  { name: "CIDESCO", desc: "Comité International d'Esthétique et de Cosmétologie", color: "from-blue-500 to-blue-700" },
  { name: "AAD", desc: "American Academy of Dermatology — Educational Partner", color: "from-emerald-500 to-emerald-700" },
  { name: "IMA", desc: "Indian Medical Association — Accredited Programs", color: "from-amber-500 to-amber-700" },
];

export default function Certifications() {
  return (
    <section className="section-padding bg-slate-50/50 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />

      <div className="container-max relative">
        <div className="text-center mb-14">
          <span className="section-tag mb-4">Certifications</span>
          <h2 className="section-title mb-4 mt-4">
            Globally Recognized{" "}
            <span className="gradient-text">Credentials</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our certificates are accredited by international bodies and verifiable online.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Certificate preview */}
          <div className="relative animate-on-scroll visible">
            <div className="absolute -inset-3 bg-gradient-to-br from-teal-200/30 to-teal-400/10 blur-2xl rounded-full" />
            <div className="relative bg-white rounded-[2rem] p-8 shadow-card-hover border-2 border-teal-100">
              {/* Certificate header */}
              <div className="text-center mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center">
                    <MaterialIcon name="military_tech" size={26} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900" style={{ fontFamily: "var(--font-heading), sans-serif" }}>Skinfinity Academy</p>
                    <p className="text-[10px] text-teal-600 font-semibold tracking-widest uppercase">of Cosmetology</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Certificate of Completion</p>
                <h3 className="text-xl font-bold text-slate-900 mt-2" style={{ fontFamily: "var(--font-heading), sans-serif" }}>Fellowship in Aesthetic Dermatology</h3>
              </div>

              {/* Certificate body */}
              <div className="text-center mb-6">
                <p className="text-xs text-slate-400 mb-1">This certifies that</p>
                <p className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading), sans-serif" }}>Dr. Arjun Reddy</p>
                <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                  has successfully completed all requirements including clinical assessments, case studies, and examinations.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between pt-6 border-t border-slate-100">
                <div>
                  <p className="text-xs font-semibold text-slate-700" style={{ fontFamily: "var(--font-heading), sans-serif" }}>Dr. Aisha Sharma</p>
                  <p className="text-[10px] text-slate-400">Program Director</p>
                  <div className="mt-2 w-20 h-0.5 bg-slate-300" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <MaterialIcon name="qr_code_2" size={40} className="text-slate-700" />
                  </div>
                  <p className="text-[9px] text-slate-400">Verify at skinfinity.academy/verify</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-700">Aug 15, 2025</p>
                  <p className="text-[10px] text-slate-400">Completion Date</p>
                  <div className="mt-2 w-20 h-0.5 bg-slate-300 ml-auto" />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 py-2.5 bg-teal-600 text-white text-xs font-semibold rounded-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-1.5">
                  <MaterialIcon name="download" size={14} /> Download PDF
                </button>
                <button className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:border-teal-300 hover:text-teal-600 transition-all flex items-center justify-center gap-1.5">
                  <MaterialIcon name="visibility" size={14} /> Verify
                </button>
              </div>
            </div>
          </div>

          {/* Certification partners */}
          <div className="space-y-4">
            {certifications.map((c, i) => (
              <div
                key={c.name}
                className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-slate-100 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group animate-on-scroll"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <MaterialIcon name="verified_user" size={26} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900" style={{ fontFamily: "var(--font-heading), sans-serif" }}>{c.name}</h4>
                    <MaterialIcon name="verified" size={16} className="text-teal-500" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}

            {/* Verification badge */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 text-white">
              <div className="flex items-center gap-3 mb-2">
                <MaterialIcon name="qr_code_2" size={24} />
                <h4 className="font-bold" style={{ fontFamily: "var(--font-heading), sans-serif" }}>Online Verification</h4>
              </div>
              <p className="text-xs text-teal-100 leading-relaxed mb-3">
                Every certificate has a unique QR code and verification ID. Employers and institutions can verify authenticity instantly.
              </p>
              <button className="text-xs font-semibold text-white bg-white/20 backdrop-blur px-4 py-2 rounded-xl hover:bg-white/30 transition-colors">
                Verify a Certificate →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
