import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";

const workshops = [
  {
    title: "Advanced Injectables & Dermal Fillers",
    date: "Aug 15, 2025",
    time: "3:00 PM - 6:00 PM",
    speaker: "Dr. Priya Menon",
    location: "Bengaluru Campus",
    image: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=800",
    seats: 12,
    price: "₹15,000",
  },
  {
    title: "Laser Safety & Advanced Protocols",
    date: "Sep 5, 2025",
    time: "10:00 AM - 1:00 PM",
    speaker: "Dr. Neha Gupta",
    location: "Online (Zoom)",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800",
    seats: 25,
    price: "₹8,000",
  },
  {
    title: "Chemical Peels: Deep Dive Workshop",
    date: "Sep 20, 2025",
    time: "2:00 PM - 5:00 PM",
    speaker: "Dr. Arjun Reddy",
    location: "Mumbai Campus",
    image: "https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=800",
    seats: 8,
    price: "₹12,000",
  },
];

export default function Workshops() {
  return (
    <section id="workshops" className="section-padding bg-white">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="section-tag mb-4">Upcoming Workshops</span>
            <h2 className="section-title mt-4">
              Learn by{" "}
              <span className="gradient-text">Doing</span>
            </h2>
          </div>
          <Link
            href="/workshops"
            className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1.5 group"
          >
            View All Workshops
            <MaterialIcon name="arrow_forward" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w, i) => (
            <div key={w.title} className="card-academy overflow-hidden group animate-on-scroll" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative h-44 overflow-hidden">
                <img src={w.image} alt={w.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute top-3 left-3 glass rounded-xl px-3 py-2">
                  <p className="text-xs font-bold text-white">{w.date}</p>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-heading), sans-serif" }}>{w.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MaterialIcon name="schedule" size={14} className="text-teal-500" /> {w.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MaterialIcon name="person" size={14} className="text-teal-500" /> {w.speaker}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MaterialIcon name="location_on" size={14} className="text-teal-500" /> {w.location}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="w-7 h-7 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-teal-700">
                          {`S${s}`}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{w.seats} seats left</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{w.price}</span>
                </div>

                <button className="w-full py-3 bg-teal-600 text-white text-sm font-semibold rounded-2xl hover:bg-teal-700 transition-all hover:shadow-teal flex items-center justify-center gap-2">
                  Register Now
                  <MaterialIcon name="arrow_forward" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
