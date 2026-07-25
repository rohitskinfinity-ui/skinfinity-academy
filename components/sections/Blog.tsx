import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";

const blogs = [
  {
    category: "Research",
    title: "The Future of Laser Dermatology: 2025 Trends",
    excerpt: "Explore the latest advancements in laser technology and how they're reshaping aesthetic medicine.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Dr. Neha Gupta",
    date: "Aug 2, 2025",
    readTime: "8 min",
  },
  {
    category: "Case Study",
    title: "Managing Complications in Dermal Fillers",
    excerpt: "A comprehensive case study on identifying, preventing, and managing vascular complications.",
    image: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Dr. Priya Menon",
    date: "Jul 28, 2025",
    readTime: "12 min",
  },
  {
    category: "Medical Updates",
    title: "New Protocols in Chemical Peel Safety",
    excerpt: "Updated guidelines from international dermatology associations on chemical peel procedures.",
    image: "https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Dr. Arjun Reddy",
    date: "Jul 20, 2025",
    readTime: "6 min",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="section-tag mb-4">Blog & Insights</span>
            <h2 className="section-title mt-4">
              Latest in{" "}
              <span className="gradient-text">Dermatology</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1.5 group"
          >
            View All Articles
            <MaterialIcon name="arrow_forward" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b, i) => (
            <article
              key={b.title}
              className="card-academy overflow-hidden group cursor-pointer animate-on-scroll"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 glass rounded-xl px-3 py-1.5 text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                  {b.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <MaterialIcon name="calendar_today" size={12} /> {b.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialIcon name="schedule" size={12} /> {b.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-teal-600 transition-colors leading-snug" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
                  {b.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{b.excerpt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-600">{b.author}</span>
                  <span className="text-xs text-teal-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <MaterialIcon name="arrow_forward" size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
