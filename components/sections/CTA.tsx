import MaterialIcon from "@/components/shared/MaterialIcon";

export default function CTA() {
  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      <div className="container-max">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 p-8 sm:p-16 text-center">
          {/* Decorations */}
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-400/20 blur-[100px] rounded-full animate-pulse-soft" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-300/15 blur-[100px] rounded-full animate-float" />

          {/* Floating elements */}
          <div className="absolute top-8 left-8 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center animate-float hidden sm:flex">
            <MaterialIcon name="auto_awesome" size={24} className="text-white/80" />
          </div>
          <div className="absolute bottom-8 right-8 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center animate-float-delay hidden sm:flex">
            <MaterialIcon name="chat" size={20} className="text-white/80" />
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-teal-100 text-xs font-semibold mb-6 border border-white/20">
              <MaterialIcon name="auto_awesome" size={14} />
              Limited Seats Available
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Ready to Become a Certified{" "}
              <span className="text-teal-300">Dermatology Professional?</span>
            </h2>

            <p className="text-teal-100 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Join 12,000+ doctors who advanced their careers with Skinfinity Academy. Your journey to clinical excellence starts here.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-700 font-bold rounded-2xl hover:bg-teal-50 transition-all hover:scale-105 hover:shadow-2xl text-sm">
                Enroll Now
                <MaterialIcon name="arrow_forward" size={18} />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl border border-white/30 hover:bg-white/20 transition-all hover:scale-105 text-sm">
                <MaterialIcon name="chat" size={18} />
                Talk to Counselor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
