import MaterialIcon from "@/components/shared/MaterialIcon";

const courses = [
  {
    title: "Fellowship in Aesthetic Dermatology",
    desc: "Comprehensive 6-month fellowship covering advanced aesthetic procedures, injectables, lasers, and clinical practice.",
    image:
      "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "6 Months",
    mode: "Hybrid",
    certificate: "Fellowship Certificate",
    faculty: "Dr. Aisha Sharma",
    price: "₹1,20,000",
    rating: 4.9,
    tag: "Most Popular",
    tagColor: "bg-teal-600",
  },
  {
    title: "Certificate in Clinical Cosmetology",
    desc: "Master the fundamentals of clinical cosmetology with hands-on training in aesthetic procedures.",
    image:
      "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "3 Months",
    mode: "Online + Hands-on",
    certificate: "CIBTAC Certificate",
    faculty: "Dr. Rajesh Kumar",
    price: "₹65,000",
    rating: 4.8,
    tag: "Best Value",
    tagColor: "bg-amber-500",
  },
  {
    title: "Advanced Injectables & Dermal Fillers",
    desc: "Specialized training in botulinum toxin, dermal fillers, and advanced injection techniques.",
    image:
      "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "2 Weeks",
    mode: "In-Person",
    certificate: "Workshop Certificate",
    faculty: "Dr. Priya Menon",
    price: "₹45,000",
    rating: 5.0,
    tag: "New",
    tagColor: "bg-emerald-500",
  },
  {
    title: "Trichology & Hair Sciences",
    desc: "Complete program in trichology, hair transplant fundamentals, and scalp disorder treatments.",
    image:
      "https://images.pexels.com/photos/3992854/pexels-photo-3992854.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "4 Months",
    mode: "Online",
    certificate: "Certificate of Completion",
    faculty: "Dr. Vikram Singh",
    price: "₹38,000",
    rating: 4.7,
    tag: null,
    tagColor: "",
  },
  {
    title: "Laser & Energy-Based Devices",
    desc: "Master laser physics, safety protocols, and advanced energy-based treatment modalities.",
    image:
      "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "1 Month",
    mode: "Hybrid",
    certificate: "Certificate of Completion",
    faculty: "Dr. Neha Gupta",
    price: "₹28,000",
    rating: 4.8,
    tag: null,
    tagColor: "",
  },
  {
    title: "Chemical Peels & Skin Rejuvenation",
    desc: "Deep dive into chemical peel formulations, protocols, and skin rejuvenation techniques.",
    image:
      "https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "2 Weeks",
    mode: "Online",
    certificate: "Workshop Certificate",
    faculty: "Dr. Arjun Reddy",
    price: "₹22,000",
    rating: 4.9,
    tag: null,
    tagColor: "",
  },
];

export default function FeaturedPrograms() {
  return (
    <section id="courses" className="section-padding bg-slate-50/50">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="section-tag mb-4">Featured Programs</span>
          <h2 className="section-title mb-4 mt-4">
            Curated Courses for{" "}
            <span className="gradient-text">Medical Excellence</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Explore our flagship programs designed by leading dermatologists and
            aesthetic medicine experts.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div
              key={course.title}
              className="card-academy overflow-hidden group animate-on-scroll"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                {course.tag && (
                  <span
                    className={`absolute top-3 left-3 ${course.tagColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg`}
                  >
                    {course.tag}
                  </span>
                )}
                <div className="absolute bottom-3 right-3 glass rounded-xl px-2.5 py-1.5 flex items-center gap-1">
                  <MaterialIcon
                    name="star"
                    size={12}
                    className="text-amber-400"
                    filled
                  />
                  <span className="text-xs font-bold text-white">
                    {course.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-teal-600 transition-colors" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                  {course.desc}
                </p>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MaterialIcon
                      name="schedule"
                      size={14}
                      className="text-teal-500"
                    />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MaterialIcon
                      name="desktop_windows"
                      size={14}
                      className="text-teal-500"
                    />
                    {course.mode}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MaterialIcon
                      name="workspace_premium"
                      size={14}
                      className="text-teal-500"
                    />
                    {course.certificate}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MaterialIcon
                      name="person"
                      size={14}
                      className="text-teal-500"
                    />
                    {course.faculty}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400">Starting from</p>
                    <p
                      className="text-xl font-bold text-slate-900"
                      style={{ fontFamily: "var(--font-heading), sans-serif" }}
                    >
                      {course.price}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl hover:border-teal-300 hover:text-teal-600 transition-all">
                      Details
                    </button>
                    <button className="px-4 py-2.5 text-xs font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all hover:shadow-teal flex items-center gap-1">
                      Enroll
                      <MaterialIcon name="arrow_forward" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
