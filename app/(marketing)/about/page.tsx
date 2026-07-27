import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import GradientText from "@/components/shared/GradientText";
import PillarsCircle from "@/components/sections/PillarsCircle";
import ValuesOrbit from "@/components/sections/ValuesOrbit";

const stats = [
  { value: 12000, suffix: "+", label: "Doctors & Surgeons Trained" },
  { value: 45, suffix: "+", label: "Clinical Programs" },
  { value: 80, suffix: "+", label: "Expert Faculty" },
  { value: 24, suffix: "+", label: "Countries Reached" },
];

const values = [
  {
    icon: "health_and_safety",
    title: "Patient Safety First",
    desc: "Every protocol we teach prioritizes patient safety, informed consent, and ethical clinical practice above all else.",
  },
  {
    icon: "menu_book",
    title: "Evidence Over Trends",
    desc: "We teach what the science supports — peer-reviewed techniques, not passing fads or unverified shortcuts.",
  },
  {
    icon: "diversity_3",
    title: "Mentorship Culture",
    desc: "Small cohorts and 1:1 faculty access ensure every physician is guided, not just lectured to.",
  },
  {
    icon: "public",
    title: "Global Standards",
    desc: "Curriculum benchmarked with International Education Board (IEB) and DMHCA so credentials travel with you worldwide.",
  },
  {
    icon: "trending_up",
    title: "Measurable Outcomes",
    desc: "We measure success by our graduates' clinical confidence, patient results, and career growth.",
  },
  {
    icon: "handshake",
    title: "Lifelong Community",
    desc: "Enrollment is the beginning of a lasting professional network, not a one-time transaction.",
  },
];

const leadership = [
  {
    name: "Dr. Aisha Sharma",
    role: "Program Director & Lead Dermatologist",
    image:
      "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "20+ years in aesthetic dermatology, board-certified, and lead architect of our fellowship curriculum.",
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Head of Clinical Training",
    image:
      "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Specialist in injectables and energy-based devices, mentoring physicians through live-patient practice.",
  },
  {
    name: "Dr. Priya Menon",
    role: "Faculty — Advanced Injectables",
    image:
      "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "International trainer in dermal fillers and facial anatomy with a focus on vascular safety.",
  },
];

const accreditations = [
  {
    name: "ISO 9001",
    desc: "ISO 9001 certified quality management system for education and training",
  },
  {
    name: "IEB",
    desc: "International Education Board — Department of Aesthetic Medicine and Surgery",
  },
  {
    name: "DMHCA",
    desc: "Unit of New Delhi Medical Healthcare Pvt. Ltd. — Clinical education partner",
  },
];

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
    title: "IEB & DMHCA Affiliated",
    desc: "Globally recognized clinical certification through International Education Board (IEB) and DMHCA (Unit of New Delhi Medical Healthcare Pvt. Ltd.).",
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
  { year: "2023", title: "International Affiliations", desc: "Affiliated with International Education Board (IEB) and DMHCA (Unit of New Delhi Medical Healthcare Pvt. Ltd.)." },
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

      {/* Our Story */}
      <section className="relative overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-teal-200/25 blur-[110px]" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-violet-200/20 blur-[100px]" />

        <div className="container-max relative grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <FadeIn direction="right">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-teal-200/40 via-cyan-100/30 to-violet-200/30 blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] shadow-[0_24px_64px_rgba(15,118,110,0.16)] ring-1 ring-white/60">
                <div className="relative aspect-[4/5] sm:aspect-[5/4]">
                  <Image
                    src="https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    alt="Faculty guiding doctors through hands-on clinical training"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/55 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/85 p-4 shadow-glass backdrop-blur-xl sm:right-auto sm:max-w-xs">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-700">
                    Since 2017
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    Built by dermatologists, for medical professionals
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <span className="section-tag mb-4 inline-flex">Our Story</span>
              <h2 className="section-title mb-4 mt-3">
                Where clinical science meets{" "}
                <GradientText>aesthetic mastery</GradientText>
              </h2>
              <p className="mb-3 text-base leading-relaxed text-slate-600">
                Skinfinity Academy of Cosmetology was founded in 2017 with a
                singular purpose: to close the gap between medical qualification
                and confident, safe, real-world aesthetic practice. We saw
                talented doctors held back by theory-heavy courses that never let
                them touch a real patient.
              </p>
              <p className="mb-6 text-base leading-relaxed text-slate-600">
                Today we are an international academy trusted by thousands of
                physicians — blending an evidence-based curriculum, live-patient
                clinical training, expert mentorship, and a lifetime learning
                platform into one seamless journey from student to specialist.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-slate-100 bg-slate-50/70 p-5">
                  <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-teal-600 text-white">
                    <MaterialIcon name="target" size={22} />
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-slate-900">
                    Our Mission
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Equip every doctor with the clinical skill and confidence to
                    deliver safe, world-class aesthetic care.
                  </p>
                </div>
                <div className="rounded-[22px] border border-slate-100 bg-slate-50/70 p-5">
                  <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-violet-500 text-white">
                    <MaterialIcon name="visibility" size={22} />
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-slate-900">
                    Our Vision
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    To be the global benchmark for dermatology and aesthetic
                    medicine education.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* By the Numbers */}
      {/* <section className="relative overflow-hidden border-y border-slate-200/60 bg-gradient-to-br from-teal-800 via-teal-700 to-violet-900 py-10 sm:py-12">
        <div className="absolute inset-0 pattern-grid opacity-20" aria-hidden />
        <div className="container-max relative px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <FadeIn key={s.label} className="text-center">
                <p className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-teal-100">
                  {s.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

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

      {/* Four Pillars Section — circular composition */}
      <section className="border-b border-slate-200/60 bg-slate-50 py-8 sm:py-10">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-10">
            <span className="rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-600">
              Our Core Pillars
            </span>
            <h2
              className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Why Doctors Trust Skinfinity Academy
            </h2>
          </div>

          <PillarsCircle pillars={pillars} />
        </div>
      </section>

      {/* Institutional Milestones Timeline */}
      <section className="py-8 sm:py-10 lg:py-12 bg-white border-b border-slate-200">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
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

          <div className="max-w-3xl mx-auto space-y-4">
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
                <div className="relative flex-1 pb-5 border-l-2 border-teal-200 pl-6">
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

      {/* Our Values — circular orbit like homepage */}
      <section className="section-padding border-b border-slate-200/60 bg-white">
        <div className="container-max">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <span className="section-tag mb-2 inline-flex">What We Stand For</span>
            <h2
              className="section-title mt-2 mb-2"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              The values that guide{" "}
              <span className="text-teal-700">every program</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Six principles orbiting one goal — clinical excellence for every
              doctor.
            </p>
          </div>

          <ValuesOrbit values={values} />
        </div>
      </section>

      {/* Leadership & Faculty */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="container-max">
          <div className="mx-auto mb-6 sm:mb-8 max-w-2xl text-center">
            <span className="section-tag mb-2 inline-flex">Leadership & Faculty</span>
            <h2 className="section-title mt-2">
              Learn from{" "}
              <GradientText>practicing specialists</GradientText>
            </h2>
            <p className="section-subtitle mx-auto mt-2">
              Our faculty are board-certified clinicians who treat patients every
              week — not just teach from slides.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.08}>
                <article className="group h-full overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900">
                      {person.name}
                    </h3>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-600">
                      {person.role}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {person.bio}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/60">
        <div className="container-max">
          <div className="mx-auto mb-6 sm:mb-8 max-w-2xl text-center">
            <span className="section-tag mb-2 inline-flex">Accreditations</span>
            <h2 className="section-title mt-2">
              Globally recognized{" "}
              <GradientText>credentials</GradientText>
            </h2>
            <p className="section-subtitle mx-auto mt-2">
              Skinfinity Academy is ISO 9001 certified and accredited by the
              International Education Board (IEB).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {accreditations.map((a, i) => (
              <FadeIn key={a.name} delay={i * 0.06}>
                <div className="group flex h-full flex-col items-center rounded-[24px] border border-slate-200/80 bg-white p-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-teal">
                    <MaterialIcon name="verified" size={30} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {a.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {a.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-10 bg-slate-50">
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
