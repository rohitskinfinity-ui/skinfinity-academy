import PageHeader from "@/components/shared/PageHeader";
import UpcomingSchedule from "@/components/sections/UpcomingSchedule";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Link from "next/link";

export default function CourseCalendarPage() {
  return (
    <div>
      <PageHeader
        title="Clinical Course"
        highlight="Calendar 2025–2026"
        subtitle="Browse and filter upcoming hands-on procedural workshops, masterclasses, and clinical training sessions by campus location and date."
        breadcrumb="Course Calendar"
      />

      {/* Main Interactive Schedule Calendar Section */}
      <UpcomingSchedule />

      {/* Additional Info & Helpline Banner */}
      <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Need Custom Training Dates?
              </span>
              <h3
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Can't find a suitable date in your city?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                Contact our admissions advisory team to request private 1:1 doctor mentorship sessions or custom group clinical dates at our partner hospitals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-2xl transition-all shadow-teal flex items-center justify-center gap-2"
              >
                Request Custom Schedule
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
              <a
                href="tel:+919876543210"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <MaterialIcon name="call" size={16} />
                Call Admissions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
