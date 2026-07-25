import MaterialIcon from "@/components/shared/MaterialIcon";

const features = [
  { icon: "videocam", title: "Video Learning", desc: "HD video lectures with adaptive streaming." },
  { icon: "description", title: "Digital Notes", desc: "Comprehensive downloadable study notes." },
  { icon: "download", title: "Resources", desc: "Download clinical guidelines & protocols." },
  { icon: "assignment", title: "Assignments", desc: "Submit PDFs, images & case reports." },
  { icon: "checklist", title: "MCQ Tests", desc: "Self-assessment with instant feedback." },
  { icon: "chat", title: "Discussion Forum", desc: "Engage with peers and faculty." },
  { icon: "military_tech", title: "Certificates", desc: "Auto-generated completion certificates." },
  { icon: "bar_chart", title: "Progress Tracking", desc: "Visual progress & performance analytics." },
  { icon: "bookmark", title: "Bookmarks", desc: "Save lessons & resources for later." },
  { icon: "smartphone", title: "Mobile Learning", desc: "Learn anywhere, anytime on any device." },
];

export default function LMSFeatures() {
  return (
    <section className="section-padding bg-slate-50/50 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-80 h-80 bg-teal-100/40 blur-[120px] rounded-full" />

      <div className="container-max relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Dashboard preview */}
          <div className="relative animate-on-scroll visible">
            <div className="absolute -inset-4 bg-gradient-to-br from-teal-200/30 to-teal-400/10 blur-3xl rounded-full" />
            <div className="relative glass rounded-[2rem] p-4 shadow-card-hover">
              {/* Mock dashboard */}
              <div className="rounded-3xl overflow-hidden bg-white">
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    skinfinity-academy.com/lms
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 bg-slate-50/50">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {["Courses", "Hours", "Score"].map((label, i) => (
                      <div key={label} className="bg-white rounded-2xl p-3 shadow-soft">
                        <p className="text-[10px] text-slate-400 mb-1">{label}</p>
                        <p className="text-lg font-bold text-slate-900">
                          {["12", "248", "94%"][i]}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Video preview */}
                  <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl p-4 mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 pattern-grid opacity-20" />
                    <div className="relative flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <MaterialIcon name="videocam" size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">Advanced Injectables</p>
                        <p className="text-teal-200 text-[10px]">Lesson 4 of 12</p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[33%] bg-white rounded-full" />
                    </div>
                  </div>

                  {/* List items */}
                  <div className="space-y-2">
                    {["Module 1: Skin Anatomy", "Module 2: Injection Techniques", "Module 3: Complications"].map((m, i) => (
                      <div key={m} className="flex items-center gap-2 bg-white rounded-xl p-2.5 shadow-soft">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 2 ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-400"}`}>
                          {i < 2 ? "✓" : "3"}
                        </div>
                        <span className="text-xs text-slate-600 flex-1">{m}</span>
                        <span className="text-[10px] text-slate-400">{["Done", "Done", "30 min"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div>
            <span className="section-tag mb-4">LMS Features</span>
            <h2 className="section-title mb-4 mt-4">
              A Modern Learning{" "}
              <span className="gradient-text">Platform</span>
            </h2>
            <p className="section-subtitle mb-8">
              Everything you need to succeed, built into one intuitive platform designed for medical professionals.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-soft transition-all duration-300 group animate-on-scroll"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 transition-colors">
                    <MaterialIcon
                      name={f.icon}
                      size={20}
                      className="text-teal-600 group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-0.5">{f.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary mt-8">
              Explore LMS Portal
              <MaterialIcon name="arrow_forward" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
