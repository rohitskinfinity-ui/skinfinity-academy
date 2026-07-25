import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Link from "next/link";

const pillars = [
  {
    icon: "science",
    title: "Evidence-Based Science",
    desc: "Curriculum developed by leading board-certified dermatologists and plastic surgeons, rooted in international clinical protocols.",
  },
  {
    icon: "personal_injury",
    title: "100% Live Patient Hands-on",
    desc: "Doctors gain direct hands-on practice under 1:1 specialist supervision on live patient cases across all procedures.",
  },
  {
    icon: "verified_user",
    title: "CIDESCO & CIBTAC Aligned",
    desc: "Globally recognized clinical certification standard allowing doctors to practice internationally with confidence.",
  },
  {
    icon: "support_agent",
    title: "Lifetime LMS & Mentorship",
    desc: "24/7 access to procedural video libraries, patient consent forms, and direct post-training doctor faculty guidance.",
  },
];

const milestones = [
  { year: "2017", title: "Academy Established", desc: "Founded with a vision to revolutionize hands-on clinical cosmetology education." },
  { year: "2019", title: "First Fellowship Batch", desc: "Graduated our first cohort of 150+ board-certified dermatologists and MBBS doctors." },
  { year: "2021", title: "Digital LMS Launch", desc: "Launched 24/7 procedural video portal & interactive clinical case library." },
  { year: "2023", title: "International Accreditations", desc: "Awarded CIDESCO & CIBTAC global accreditation standards." },
  { year: "2025", title: "12,000+ Alumni Network", desc: "Empowered 12,000+ doctors across 24+ countries worldwide." },
];

export default function AboutPage() {
  return (
    <div className="bg-white select-none">
      <PageHeader
        title="About Our"
        highlight="Clinical Institution"
        subtitle="Empowering medical practitioners with world-class, hands-on aesthetic dermatology and clinical cosmetology education."
        breadcrumb="About Us"
      />

      {/* Hero Brand Statement Section (Inspired by Reference Design) */}
      {/* <section className="py-20 sm:py-28 relative overflow-hidden bg-white border-b border-slate-200">
       
        <div className="absolute right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none text-slate-900/[0.07] whitespace-nowrap text-[50px] sm:text-[80px] md:text-[100px] lg:text-[130px] font-black tracking-tight uppercase">
          SKINFINITY ACADEMY
        </div>

        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-10 h-0.5 bg-teal-600" />
            <span>ABOUT SKINFINITY ACADEMY</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-10 max-w-4xl"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Your Practice. <br />
            <span className="italic font-serif text-teal-600 font-normal">Our Science.</span> <br />
            Your Clinical Excellence.
          </h1>

          <div className="relative max-w-3xl mb-16">
            <div className="border-l-2 border-teal-500 pl-6 py-1">
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Bringing dermatologist-backed clinical cosmetology and hands-on aesthetic medicine education to every medical practitioner worldwide — with evidence-based science, clinical rigor, and 1:1 doctor mentorship.
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            <div className="py-6 sm:py-8 sm:pr-8">
              <p
                className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                12K+
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">
                Enrolled Doctors & Surgeons
              </p>
            </div>

            <div className="py-6 sm:py-8 sm:px-8">
              <p
                className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                45+
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">
                Clinical Masterclasses & Programs
              </p>
            </div>

            <div className="py-6 sm:py-8 sm:px-8">
              <p
                className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                100%
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">
                Hands-on Live Patient Exposure
              </p>
            </div>

            <div className="py-6 sm:py-8 sm:pl-8">
              <p
                className="text-4xl sm:text-5xl font-extrabold text-teal-600 tracking-tight"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                1
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">
                Goal: Your Clinical Mastery
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Four Pillars Section */}
      <section className="py-10 bg-slate-50 border-b border-slate-200/60">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
              Our Core Pillars
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Why Doctors Trust Skinfinity Academy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
                    <MaterialIcon name={p.icon} size={28} />
                  </div>
                  <h3
                    className="text-lg font-bold text-slate-900 mb-3"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Milestones Timeline */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
              Institutional Journey
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Building a Legacy of Medical Excellence
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-20 flex-shrink-0 text-right">
                  <span
                    className="text-2xl font-extrabold text-teal-600"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {m.year}
                  </span>
                </div>
                <div className="relative flex-1 pb-8 border-l-2 border-teal-200 pl-6">
                  <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-teal-600 border-4 border-white shadow-teal" />
                  <h4
                    className="text-base font-bold text-slate-900 mb-1"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Admissions Open 2025–2026
              </span>
              <h3
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Elevate your clinical practice with Skinfinity
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Join our hands-on clinical masterclasses and master high-demand aesthetic procedures under specialist doctor mentorship.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <Link
                href="/courses"
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-2xl transition-all shadow-teal flex items-center justify-center gap-2"
              >
                Explore Courses
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
