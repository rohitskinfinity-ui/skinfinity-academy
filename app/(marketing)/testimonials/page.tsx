"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Link from "next/link";

const videoReviews = [
  {
    id: 1,
    doctor: "Dr. Ananya Sharma",
    title: "MD Dermatology, AIIMS Delhi",
    course: "Advanced Injectables & Dermal Fillers",
    location: "New Delhi, India",
    thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    quote: "The hands-on patient ratio was outstanding. I performed lip augmentations under 1:1 specialist supervision on Day 1.",
    duration: "2:45",
  },
  {
    id: 2,
    doctor: "Dr. Rajesh Kulkarni",
    title: "Plastic & Reconstructive Surgeon",
    course: "Laser & Energy Devices Mastery",
    location: "Mumbai, India",
    thumbnail: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    quote: "Learning Alexandrite & Nd:YAG laser physics with live patient settings transformed my clinical confidence completely.",
    duration: "3:10",
  },
  {
    id: 3,
    doctor: "Dr. Meera Nambiar",
    title: "Cosmetic Dermatologist",
    course: "PG Diploma in Clinical Cosmetology",
    location: "Bengaluru, India",
    thumbnail: "https://images.unsplash.com/photo-1594824813570-78988072613d?auto=format&fit=crop&w=800&q=80",
    quote: "Skinfinity gave me full confidence to open my own aesthetic clinic in Indiranagar. The CIDESCO certification is internationally recognized.",
    duration: "4:05",
  },
];

const writtenReviews = [
  {
    id: 1,
    doctor: "Dr. Siddharth Menon",
    credentials: "MBBS, DVD (Dermatology)",
    location: "Hyderabad",
    course: "Botulinum Toxin & Upper Face Contouring",
    rating: 5,
    date: "July 2025",
    text: "Exceeded all my expectations. The faculty broke down complex facial anatomy and dangerous vascular danger zones with extreme clarity. Practicing on live patient cases with 1:1 guidance made all the difference.",
    clinic: "Founder, Zenith Aesthetics Clinic",
  },
  {
    id: 2,
    doctor: "Dr. Priya Deshmukh",
    credentials: "BDS, Fellowship in Aesthetic Dentistry",
    location: "Pune",
    course: "Certificate in Clinical Cosmetology",
    rating: 5,
    date: "June 2025",
    text: "As a dentist transitioning into facial aesthetics, Skinfinity provided the most supportive learning environment. The chemical peel and RF microneedling modules were thorough and hands-on.",
    clinic: "Aura Dental & Aesthetic Hub",
  },
  {
    id: 3,
    doctor: "Dr. Aris Thorne",
    credentials: "MD, Aesthetic Practitioner",
    location: "Dubai, UAE",
    course: "Advanced Injectables & Dermal Fillers",
    rating: 5,
    date: "May 2025",
    text: "Flew down from Dubai specifically for this clinical masterclass. The practical exposure to tear trough and cheek augmentation using cannulas was world class.",
    clinic: "Harley Street Medical Center, Dubai",
  },
  {
    id: 4,
    doctor: "Dr. Kavita Reddy",
    credentials: "MD General Medicine",
    location: "Chennai",
    course: "Trichology & Hair Sciences Fellowship",
    rating: 5,
    date: "April 2025",
    text: "The PRP extraction and GFC protocols were explained with solid scientific backing. I integrated trichology procedures into my practice within 2 weeks of completion.",
    clinic: "Reddy Skin & Hair Clinic",
  },
  {
    id: 5,
    doctor: "Dr. Vikram Sethi",
    credentials: "MS General Surgery",
    location: "Chandigarh",
    course: "COG Thread Lift Masterclass",
    rating: 5,
    date: "March 2025",
    text: "Sensational PDO thread lifting course! Understanding vector angles for midface lifting under expert supervision was worth every penny.",
    clinic: "Sethi Cosmetic Surgery Institute",
  },
  {
    id: 6,
    doctor: "Dr. Sunita Rao",
    credentials: "MBBS, DDVL",
    location: "Kolkata",
    course: "Chemical Peels & Skin Rejuvenation",
    rating: 5,
    date: "February 2025",
    text: "The step-by-step guidance on deep TCA peels and managing post-inflammatory hyperpigmentation gave me immense peace of mind in my practice.",
    clinic: "DermaCare Aesthetics",
  },
];

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "video" | "reviews">("all");
  const [selectedVideo, setSelectedVideo] = useState<typeof videoReviews[0] | null>(null);

  return (
    <div>
      <PageHeader
        title="Doctor & Alumni"
        highlight="Testimonials"
        subtitle="Read verified reviews, clinical career growth stories, and watch live video feedback from doctors trained at Skinfinity Academy."
        breadcrumb="Testimonials"
      />

      {/* Filter Tabs */}
      <section className="py-8 bg-slate-50 border-b border-slate-200/60 sticky top-20 z-30 shadow-xs">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Feedback
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "video"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <MaterialIcon name="videocam" size={16} />
                Video Reviews
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "reviews"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <MaterialIcon name="rate_review" size={16} />
                Written Reviews
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1">
                <MaterialIcon name="star" size={16} className="text-amber-500 fill-amber-500" />
                4.9 / 5.0 Rating (3,200+ Reviews)
              </span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300" />
              <span className="hidden sm:inline-block text-teal-700">100% Verified Doctor Alumni</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Reviews Section */}
      {(activeTab === "all" || activeTab === "video") && (
        <section id="video-reviews" className="py-16 bg-white border-b border-slate-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  Video Feedback
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Doctor Video Testimonials
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videoReviews.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(v)}>
                    <img
                      src={v.thumbnail}
                      alt={v.doctor}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-all flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <MaterialIcon name="play_arrow" size={28} />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[11px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {v.duration}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
                        {v.course}
                      </p>
                      <h3
                        className="text-lg font-bold text-slate-900"
                        style={{ fontFamily: "var(--font-heading), sans-serif" }}
                      >
                        {v.doctor}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mb-3">{v.title} • {v.location}</p>
                      <p className="text-xs text-slate-600 italic leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        "{v.quote}"
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedVideo(v)}
                      className="mt-4 w-full py-2.5 bg-teal-50 hover:bg-teal-100/80 text-teal-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MaterialIcon name="play_circle" size={16} />
                      Watch Doctor Interview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Written Reviews Section */}
      {(activeTab === "all" || activeTab === "reviews") && (
        <section id="reviews" className="py-16 bg-slate-50">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                Verified Reviews
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                What Doctors Say About Our Training
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {writtenReviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(r.rating)].map((_, i) => (
                          <MaterialIcon key={i} name="star" size={16} className="text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">{r.date}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                      "{r.text}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4
                        className="text-sm font-bold text-slate-900"
                        style={{ fontFamily: "var(--font-heading), sans-serif" }}
                      >
                        {r.doctor}
                      </h4>
                      <p className="text-[11px] text-teal-600 font-semibold">{r.credentials}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{r.clinic} • {r.location}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <MaterialIcon name="verified" size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-3">
                <MaterialIcon name="videocam" size={20} className="text-teal-400" />
                <div>
                  <h4 className="text-sm font-bold">{selectedVideo.doctor}</h4>
                  <p className="text-[11px] text-slate-400">{selectedVideo.course}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.doctor}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-slate-950/40">
                <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-2xl animate-pulse">
                  <MaterialIcon name="play_arrow" size={36} />
                </div>
                <p className="text-sm text-white font-bold max-w-md">
                  "{selectedVideo.quote}"
                </p>
                <span className="text-xs text-teal-300 font-semibold">
                  Skinfinity Academy Verified Video Interview
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Footer Banner */}
      <section className="py-16 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Join 12,000+ Enrolled Doctors
              </span>
              <h3
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Ready to elevate your clinical practice?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Enroll in hands-on clinical masterclasses and master high-demand aesthetic procedures.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <Link
                href="/courses"
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-2xl transition-all shadow-teal flex items-center justify-center gap-2"
              >
                Explore All Courses
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                Book Advisory Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
