import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";

interface WorkshopItem {
  title: string;
  date: string;
  time: string;
  speaker: string;
  location: string;
  image: string;
  seats: number;
  price: string;
  type: string;
}

const workshops: WorkshopItem[] = [
  {
    title: "Advanced Injectables & Dermal Fillers",
    date: "Aug 15, 2025",
    time: "3:00 PM - 6:00 PM",
    speaker: "Dr. Priya Menon",
    location: "Bengaluru Campus",
    image: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=800",
    seats: 12,
    price: "₹15,000",
    type: "In-Person",
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
    type: "Online",
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
    type: "In-Person",
  },
  {
    title: "PRP & Mesotherapy Masterclass",
    date: "Oct 10, 2025",
    time: "9:00 AM - 12:00 PM",
    speaker: "Dr. Sneha Patel",
    location: "Delhi Campus",
    image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800",
    seats: 15,
    price: "₹10,000",
    type: "In-Person",
  },
];

export default function WorkshopsPage() {
  return (
    <div>
      <PageHeader
        title="Hands-On"
        highlight="Workshops"
        subtitle="Practical, hands-on training workshops led by expert dermatologists and aesthetic physicians."
        breadcrumb="Workshops"
      />

      <section className="py-12 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {workshops.map((w) => (
              <div key={w.title} className="card-academy overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute top-3 left-3 glass rounded-xl px-3 py-1.5">
                    <p className="text-xs font-bold text-white">{w.date}</p>
                  </div>
                  <span className="absolute top-3 right-3 bg-teal-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                    {w.type}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3
                      className="text-white font-bold text-lg"
                      style={{ fontFamily: "var(--font-heading), sans-serif" }}
                    >
                      {w.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MaterialIcon name="schedule" size={16} className="text-teal-500" />
                      {w.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MaterialIcon name="person" size={16} className="text-teal-500" />
                      {w.speaker}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MaterialIcon name="location_on" size={16} className="text-teal-500" />
                      {w.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-rose-500 font-semibold">{w.seats} seats left</p>
                      <p
                        className="text-xl font-bold text-slate-900"
                        style={{ fontFamily: "var(--font-heading), sans-serif" }}
                      >
                        {w.price}
                      </p>
                    </div>

                    <Link
                      href={`/enroll?program=${encodeURIComponent(w.title)}`}
                      className="btn-primary !py-2.5 cursor-pointer"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
