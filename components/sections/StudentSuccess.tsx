import MaterialIcon from "@/components/shared/MaterialIcon";

const testimonials = [
  {
    name: "Dr. Sneha Patel",
    role: "Dermatologist, Mumbai",
    image: "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    quote: "The fellowship program transformed my practice. Within 3 months of completing the course, I was able to introduce 5 new aesthetic procedures to my clinic.",
    before: "General Practitioner",
    after: "Aesthetic Clinic Owner",
    revenue: "+180% Revenue",
  },
  {
    name: "Dr. Karthik Nair",
    role: "Aesthetic Physician, Dubai",
    image: "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    quote: "The international curriculum and hands-on training gave me the confidence to practice in Dubai. The LMS access means I can always revisit concepts.",
    before: "Junior Doctor",
    after: "Senior Aesthetic Consultant",
    revenue: "+220% Revenue",
  },
  {
    name: "Dr. Anjali Reddy",
    role: "Cosmetologist, Hyderabad",
    image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    quote: "Best investment in my career. The faculty support and community access have been invaluable. I now run a successful chain of skin clinics.",
    before: "Private Practice",
    after: "Clinic Chain Founder",
    revenue: "+340% Revenue",
  },
];

export default function StudentSuccess() {
  return (
    <section id="success" className="section-padding bg-gradient-to-b from-teal-50/30 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-teal-200/20 blur-[120px] rounded-full" />

      <div className="container-max relative">
        <div className="text-center mb-14">
          <span className="section-tag mb-4">Student Success</span>
          <h2 className="section-title mb-4 mt-4">
            Real Doctors.{" "}
            <span className="gradient-text">Real Results.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Hear from healthcare professionals who transformed their careers with Skinfinity Academy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="card-academy p-6 group animate-on-scroll"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Video thumbnail */}
              <div className="relative h-40 rounded-2xl overflow-hidden mb-4 cursor-pointer">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MaterialIcon name="play_arrow" size={22} className="text-white" filled />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 glass rounded-lg px-2.5 py-1">
                  <span className="text-[10px] text-white font-medium">2:34 min</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <MaterialIcon key={i} name="star" size={14} className="text-amber-400" filled />
                ))}
                <span className="text-xs text-slate-400 ml-1.5">{t.rating}.0</span>
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <MaterialIcon name="format_quote" size={28} className="text-teal-100 absolute -top-1 -left-1" />
                <p className="text-sm text-slate-600 leading-relaxed pl-6">{t.quote}</p>
              </div>

              {/* Before/After */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Before</p>
                    <p className="text-xs font-semibold text-slate-600">{t.before}</p>
                  </div>
                  <div className="flex-1 mx-3 h-px bg-gradient-to-r from-slate-300 via-teal-400 to-teal-500 relative">
                    <MaterialIcon name="trending_up" size={14} className="absolute -top-1.5 right-0 text-teal-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-teal-600 uppercase tracking-wider font-semibold">After</p>
                    <p className="text-xs font-semibold text-teal-700">{t.after}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-2 pt-2 border-t border-slate-200">
                  <span className="text-sm font-bold text-emerald-600">{t.revenue}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
