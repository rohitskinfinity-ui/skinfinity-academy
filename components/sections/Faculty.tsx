import MaterialIcon from "@/components/shared/MaterialIcon";

const faculty = [
  {
    name: "Dr. Aisha Sharma",
    specialization: "Aesthetic Dermatology",
    experience: "18+ Years",
    hospital: "Apollo Hospitals, Delhi",
    image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Dr. Rajesh Kumar",
    specialization: "Clinical Cosmetology",
    experience: "15+ Years",
    hospital: "Medanta, Gurgaon",
    image: "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Dr. Priya Menon",
    specialization: "Injectables & Fillers",
    experience: "12+ Years",
    hospital: "Manipal Hospital, Bengaluru",
    image: "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Dr. Vikram Singh",
    specialization: "Trichology & Hair Sciences",
    experience: "20+ Years",
    hospital: "AIIMS, New Delhi",
    image: "https://images.pexels.com/photos/5407242/pexels-photo-5407242.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function Faculty() {
  return (
    <section id="faculty" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="section-tag mb-4">Our Faculty</span>
          <h2 className="section-title mb-4 mt-4">
            Learn from{" "}
            <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="section-subtitle mx-auto">
            World-class dermatologists and aesthetic medicine experts guiding your journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((doc, i) => (
            <div
              key={doc.name}
              className="group card-academy overflow-hidden animate-on-scroll"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Social links */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <a href="#" className="w-8 h-8 rounded-xl glass flex items-center justify-center hover:bg-teal-600 transition-colors">
                    <MaterialIcon name="work" size={14} className="text-slate-700" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-xl glass flex items-center justify-center hover:bg-teal-600 transition-colors">
                    <MaterialIcon name="public" size={14} className="text-slate-700" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading), sans-serif" }}>{doc.name}</h3>
                <p className="text-sm text-teal-600 font-medium mb-3">{doc.specialization}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <MaterialIcon name="work" size={14} className="text-slate-400" />
                  {doc.experience} Experience
                </div>
                <p className="text-xs text-slate-400">{doc.hospital}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
