import MaterialIcon from "@/components/shared/MaterialIcon";

const features = [
  { icon: "group", title: "Expert Faculty", desc: "Learn from renowned dermatologists and aesthetic medicine specialists with decades of clinical experience." },
  { icon: "language", title: "International Curriculum", desc: "Curriculum aligned with global standards including CIBTAC, CIDESCO, and AAD guidelines." },
  { icon: "volunteer_activism", title: "Clinical Hands-on Training", desc: "Practice on real patients under expert supervision in our partner clinics and hospitals." },
  { icon: "workspace_premium", title: "Certification", desc: "Earn internationally recognized certificates upon successful course completion." },
  { icon: "all_inclusive", title: "Lifetime LMS Access", desc: "Access course materials, recordings, and resources forever — no expiry, no limits." },
  { icon: "videocam", title: "Recorded Sessions", desc: "Never miss a class. All live sessions are recorded and available for review anytime." },
  { icon: "work", title: "Career Support", desc: "Get placement assistance, career counseling, and professional network access." },
  { icon: "forum", title: "Community Access", desc: "Join an exclusive community of 12,000+ dermatology professionals worldwide." },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/40 blur-[120px] rounded-full" />

      <div className="container-max relative">
        <div className="text-center mb-14">
          <span className="section-tag mb-4">Why Choose Us</span>
          <h2 className="section-title mb-4 mt-4">
            The Skinfinity{" "}
            <span className="gradient-text">Advantage</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Eight pillars that make our academy the preferred choice for dermatology education.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-3xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-on-scroll"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center mb-4 group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-300">
                <MaterialIcon
                  name={f.icon}
                  size={26}
                  className="text-teal-600 group-hover:text-white transition-colors"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-heading), sans-serif" }}>{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
