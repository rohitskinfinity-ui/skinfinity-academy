"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";

/* ── Section header helper ── */
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1
        className="text-2xl font-bold text-slate-900"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        {title}
      </h1>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function LiveClassesPage() {
  const liveClasses = [
    {
      title: "Advanced Injection Techniques Live Demo",
      instructor: "Dr. Priya Menon",
      date: "Aug 15, 2025",
      time: "3:00 PM",
      duration: "2 hours",
      status: "live",
      attendees: 1240,
    },
    {
      title: "Laser Safety Protocols Q&A",
      instructor: "Dr. Neha Gupta",
      date: "Aug 18, 2025",
      time: "5:00 PM",
      duration: "1 hour",
      status: "upcoming",
      attendees: 0,
    },
    {
      title: "Chemical Peel Deep Dive Workshop",
      instructor: "Dr. Arjun Reddy",
      date: "Aug 22, 2025",
      time: "2:00 PM",
      duration: "3 hours",
      status: "upcoming",
      attendees: 0,
    },
    {
      title: "Patient Consultation Roleplay",
      instructor: "Dr. Aisha Sharma",
      date: "Aug 25, 2025",
      time: "4:00 PM",
      duration: "1.5 hours",
      status: "upcoming",
      attendees: 0,
    },
    {
      title: "Trichology Case Discussion",
      instructor: "Dr. Vikram Singh",
      date: "Aug 28, 2025",
      time: "6:00 PM",
      duration: "1 hour",
      status: "upcoming",
      attendees: 0,
    },
  ];

  return (
    <>
      <SectionHeader
        title="Live Classes"
        subtitle="Join live sessions and upcoming webinars from your instructors."
      />
      {liveClasses[0].status === "live" && (
        <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl p-6 text-white mb-6 relative overflow-hidden">
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Live Now
              </span>
            </div>
            <div className="flex-1">
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {liveClasses[0].title}
              </h3>
              <p className="text-sm text-red-100">
                {liveClasses[0].instructor} •{" "}
                {liveClasses[0].attendees.toLocaleString()} watching
              </p>
            </div>
            <button className="px-6 py-3 bg-white text-red-600 font-bold rounded-2xl hover:bg-red-50 transition-all text-sm flex items-center gap-2">
              <MaterialIcon name="video_camera_front" size={18} /> Join Now
            </button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {liveClasses.slice(1).map((lc) => (
          <div
            key={lc.title}
            className="bg-white rounded-3xl p-5 shadow-soft border border-slate-50 hover:shadow-card-hover transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-teal-700 leading-none">
                {lc.date.split(",")[0].split(" ")[1]}
              </span>
              <span className="text-[9px] text-teal-500 uppercase">
                {lc.date.split(",")[0].split(" ")[0]}
              </span>
            </div>
            <div className="flex-1">
              <h3
                className="font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {lc.title}
              </h3>
              <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MaterialIcon name="group" size={12} /> {lc.instructor}
                </span>
                <span className="flex items-center gap-1">
                  <MaterialIcon name="schedule" size={12} /> {lc.time}
                </span>
                <span className="flex items-center gap-1">
                  <MaterialIcon name="video_camera_front" size={12} />{" "}
                  {lc.duration}
                </span>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2">
              Set Reminder <MaterialIcon name="notifications" size={16} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
