"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";

interface CourseCardItem {
  title: string;
  desc: string;
  image: string;
  duration: string;
  mode: string;
  certificate: string;
  faculty: string;
  price: string;
  rating: number;
  category: string;
  level: string;
}

const allCourses: CourseCardItem[] = [
  { title: "Fellowship in Aesthetic Dermatology", desc: "Comprehensive 6-month fellowship covering advanced aesthetic procedures.", image: "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "6 Months", mode: "Hybrid", certificate: "Fellowship Certificate", faculty: "Dr. Aisha Sharma", price: "₹1,20,000", rating: 4.9, category: "Fellowship", level: "Advanced" },
  { title: "Certificate in Clinical Cosmetology", desc: "Master fundamentals of clinical cosmetology with hands-on training.", image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "3 Months", mode: "Online + Hands-on", certificate: "IEB & DMHCA Certificate", faculty: "Dr. Rajesh Kumar", price: "₹65,000", rating: 4.8, category: "Certificate", level: "Intermediate" },
  { title: "Advanced Injectables & Dermal Fillers", desc: "Specialized training in botulinum toxin and dermal fillers.", image: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "2 Weeks", mode: "In-Person", certificate: "Workshop Certificate", faculty: "Dr. Priya Menon", price: "₹45,000", rating: 5.0, category: "Workshop", level: "Advanced" },
  { title: "Trichology & Hair Sciences", desc: "Complete program in trichology and scalp disorder treatments.", image: "https://images.pexels.com/photos/3992854/pexels-photo-3992854.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "4 Months", mode: "Online", certificate: "Certificate of Completion", faculty: "Dr. Vikram Singh", price: "₹38,000", rating: 4.7, category: "Certificate", level: "Intermediate" },
  { title: "Laser & Energy-Based Devices", desc: "Master laser physics, safety, and treatment modalities.", image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "1 Month", mode: "Hybrid", certificate: "Certificate of Completion", faculty: "Dr. Neha Gupta", price: "₹28,000", rating: 4.8, category: "Certificate", level: "Intermediate" },
  { title: "Chemical Peels & Skin Rejuvenation", desc: "Deep dive into chemical peel formulations and protocols.", image: "https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "2 Weeks", mode: "Online", certificate: "Workshop Certificate", faculty: "Dr. Arjun Reddy", price: "₹22,000", rating: 4.9, category: "Workshop", level: "Beginner" },
  { title: "PRP Therapy & Mesotherapy", desc: "Platelet-rich plasma techniques for hair and skin rejuvenation.", image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "1 Week", mode: "In-Person", certificate: "Workshop Certificate", faculty: "Dr. Sneha Patel", price: "₹18,000", rating: 4.8, category: "Workshop", level: "Intermediate" },
  { title: "Facial Anatomy & Assessment", desc: "Master facial anatomy for safe aesthetic procedures.", image: "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "2 Weeks", mode: "Online", certificate: "Certificate of Completion", faculty: "Dr. Karthik Nair", price: "₹15,000", rating: 4.6, category: "Certificate", level: "Beginner" },
];

const categories = ["All", "Fellowship", "Certificate", "Workshop"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Levels");
  const [search, setSearch] = useState("");

  const filtered = allCourses.filter(
    (c) =>
      (category === "All" || c.category === category) &&
      (level === "All Levels" || c.level === level) &&
      (search === "" || c.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <PageHeader
        title="Explore Our"
        highlight="Courses & Programs"
        subtitle="Browse our complete catalog of dermatology and aesthetic medicine courses, designed for every level of expertise."
        breadcrumb="Courses"
      />

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-white py-6">
        <div className="container-max px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: "menu_book", label: "Total Courses", value: "45+" },
            { icon: "person", label: "Expert Faculty", value: "80+" },
            { icon: "workspace_premium", label: "Certified Programs", value: "12" },
            { icon: "trending_up", label: "Completion Rate", value: "87%" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <MaterialIcon name={s.icon} size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading), sans-serif" }}>{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-10 bg-slate-50/50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <MaterialIcon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl border border-slate-200">
                <MaterialIcon name="filter_list" size={16} className="text-slate-400" />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="text-sm font-medium text-slate-600 focus:outline-none bg-transparent">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl border border-slate-200">
                <select value={level} onChange={(e) => setLevel(e.target.value)} className="text-sm font-medium text-slate-600 focus:outline-none bg-transparent">
                  {levels.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400 mb-6">{filtered.length} courses found</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div key={course.title} className="card-academy overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 glass rounded-xl px-2.5 py-1 text-[10px] font-bold text-teal-700 uppercase tracking-wider">{course.category}</span>
                  <span className="absolute top-3 right-3 glass rounded-xl px-2.5 py-1 text-[10px] font-bold text-slate-700">{course.level}</span>
                  <div className="absolute bottom-3 right-3 glass rounded-xl px-2.5 py-1 flex items-center gap-1">
                    <MaterialIcon name="star" size={12} className="text-amber-400" filled />
                    <span className="text-xs font-bold text-white">{course.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-teal-600 transition-colors" style={{ fontFamily: "var(--font-heading), sans-serif" }}>{course.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.desc}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600"><MaterialIcon name="schedule" size={13} className="text-teal-500" /> {course.duration}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600"><MaterialIcon name="desktop_windows" size={13} className="text-teal-500" /> {course.mode}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600"><MaterialIcon name="workspace_premium" size={13} className="text-teal-500" /> {course.certificate}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600"><MaterialIcon name="person" size={13} className="text-teal-500" /> {course.faculty}</div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <p className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading), sans-serif" }}>{course.price}</p>
                    <div className="flex gap-2">
                      <Link href="/courses/detail" className="px-4 py-2.5 text-xs font-semibold text-teal-600 border border-teal-200 rounded-xl hover:bg-teal-50 transition-all">Details</Link>
                      <Link
                        href={`/enroll?program=${encodeURIComponent(course.title)}`}
                        className="px-4 py-2.5 text-xs font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        Enroll <MaterialIcon name="arrow_forward" size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-sm">No courses match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
