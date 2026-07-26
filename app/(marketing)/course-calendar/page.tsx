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
      {/* <section className="border-b border-slate-200/60 bg-[#f8fafc] py-10 sm:py-12">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] border border-slate-200 bg-white p-7 sm:flex-row sm:items-center sm:p-9">
            <div className="max-w-xl">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-600">
                Need custom training dates?
              </p>
              <h3
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Can&apos;t find a suitable date in your city?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
                Request private 1:1 doctor mentorship or custom group clinical
                dates at our partner hospitals.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-700 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-teal-800"
              >
                Request Custom Schedule
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-teal-300 hover:text-teal-700"
              >
                <MaterialIcon name="call" size={16} />
                Call Admissions
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
