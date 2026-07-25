import MaterialIcon from "@/components/shared/MaterialIcon";

const steps = [
  { icon: "person_add", title: "Register", desc: "Create your account and choose your preferred program." },
  { icon: "vpn_key", title: "Get Access", desc: "Receive instant access to the LMS portal and course materials." },
  { icon: "ondemand_video", title: "Attend Classes", desc: "Join live sessions or watch recorded lectures at your pace." },
  { icon: "description", title: "Assignments", desc: "Complete practical assignments and case studies." },
  { icon: "assignment_turned_in", title: "Assessments", desc: "Pass MCQ tests and clinical assessments to validate learning." },
  { icon: "military_tech", title: "Certification", desc: "Receive your internationally recognized certificate." },
];

export default function LearningJourney() {
  return (
    <section className="section-padding bg-gradient-to-b from-teal-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />

      <div className="container-max relative">
        <div className="text-center mb-16">
          <span className="section-tag mb-4">Learning Journey</span>
          <h2 className="section-title mb-4 mt-4">
            Your Path to{" "}
            <span className="gradient-text">Certification</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A structured six-step journey from registration to certification.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative group animate-on-scroll"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 rounded-3xl bg-white shadow-card flex items-center justify-center mb-4 group-hover:shadow-card-hover group-hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shadow-teal">
                      {i + 1}
                    </div>
                    <MaterialIcon name={step.icon} size={32} className="text-teal-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5" style={{ fontFamily: "var(--font-heading), sans-serif" }}>{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
