import MaterialIcon from "@/components/shared/MaterialIcon";

export default function StudentDashboardPreview() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/30 blur-[120px] rounded-full" />

      <div className="container-max relative">
        <div className="text-center mb-14">
          <span className="section-tag mb-4">Student Dashboard</span>
          <h2 className="section-title mb-4 mt-4">
            Your Personalized{" "}
            <span className="gradient-text">Learning Hub</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Track progress, manage schedules, and celebrate achievements — all in one place.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="glass rounded-[2rem] p-4 sm:p-6 shadow-card-hover max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden bg-slate-50/80">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
                  DA
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Welcome back, Dr. Arjun</p>
                  <p className="text-[10px] text-slate-400">Fellowship in Aesthetic Dermatology</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-500">Live Session at 3:00 PM</span>
              </div>
            </div>

            <div className="p-5 grid lg:grid-cols-3 gap-4">
              {/* Course progress */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: "menu_book", label: "Active Courses", value: "5", color: "text-teal-600 bg-teal-50" },
                    { icon: "schedule", label: "Learning Hours", value: "248", color: "text-blue-600 bg-blue-50" },
                    { icon: "military_tech", label: "Certificates", value: "3", color: "text-amber-600 bg-amber-50" },
                    { icon: "trending_up", label: "Avg Score", value: "94%", color: "text-emerald-600 bg-emerald-50" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-soft">
                      <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center mb-2`}>
                        <MaterialIcon name={stat.icon} size={18} />
                      </div>
                      <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-[10px] text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Continue learning */}
                <div className="bg-white rounded-2xl p-4 shadow-soft">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Continue Learning</h4>
                  <div className="space-y-2.5">
                    {[
                      { title: "Advanced Injectables & Fillers", progress: 78, module: "Module 4: Lip Augmentation" },
                      { title: "Laser & Energy Devices", progress: 45, module: "Module 2: Safety Protocols" },
                      { title: "Chemical Peels Mastery", progress: 92, module: "Module 6: Deep Peels" },
                    ].map((c) => (
                      <div key={c.title} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center flex-shrink-0">
                          <MaterialIcon name="play_circle" size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate">{c.title}</p>
                          <p className="text-[10px] text-slate-400 truncate">{c.module}</p>
                          <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full" style={{ width: `${c.progress}%` }} />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-teal-600">{c.progress}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent videos */}
                <div className="bg-white rounded-2xl p-4 shadow-soft">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Recent Videos</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {["Botulinum Toxin", "Filler Techniques", "Laser Safety"].map((v) => (
                      <div key={v} className="group cursor-pointer">
                        <div className="relative aspect-video rounded-xl bg-gradient-to-br from-teal-700 to-slate-900 overflow-hidden">
                          <div className="absolute inset-0 pattern-grid opacity-20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <MaterialIcon name="play_circle" size={24} className="text-white/80 group-hover:scale-110 transition-transform" />
                          </div>
                        </div>
                        <p className="text-[10px] font-medium text-slate-600 mt-1.5 truncate">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {/* Calendar */}
                <div className="bg-white rounded-2xl p-4 shadow-soft">
                  <div className="flex items-center gap-2 mb-3">
                    <MaterialIcon name="calendar_month" size={16} className="text-teal-600" />
                    <h4 className="text-sm font-semibold text-slate-900">Upcoming</h4>
                  </div>
                  <div className="space-y-2">
                    {[
                      { day: "15", month: "AUG", title: "Advanced Injectables Workshop", time: "3:00 PM" },
                      { day: "18", month: "AUG", title: "MCQ Assessment: Module 4", time: "10:00 AM" },
                      { day: "22", month: "AUG", title: "Live Q&A with Dr. Aisha", time: "5:00 PM" },
                    ].map((e) => (
                      <div key={e.title} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-teal-700 leading-none">{e.day}</span>
                          <span className="text-[8px] text-teal-500">{e.month}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-700 truncate">{e.title}</p>
                          <p className="text-[10px] text-slate-400">{e.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white rounded-2xl p-4 shadow-soft">
                  <div className="flex items-center gap-2 mb-3">
                    <MaterialIcon name="emoji_events" size={16} className="text-amber-500" />
                    <h4 className="text-sm font-semibold text-slate-900">Leaderboard</h4>
                  </div>
                  <div className="space-y-2">
                    {[
                      { rank: 1, name: "Dr. Sneha P.", points: "2,840", medal: "🥇" },
                      { rank: 2, name: "Dr. Arjun R.", points: "2,650", medal: "🥈" },
                      { rank: 3, name: "Dr. Kavya M.", points: "2,430", medal: "🥉" },
                    ].map((p) => (
                      <div key={p.rank} className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <span className="text-lg">{p.medal}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 truncate">{p.name}</p>
                        </div>
                        <span className="text-xs font-bold text-teal-600">{p.points}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <MaterialIcon name="military_tech" size={16} />
                    <h4 className="text-sm font-semibold">Achievements</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: "🏆", label: "Top 5%" },
                      { icon: "🔥", label: "30 Day Streak" },
                      { icon: "📚", label: "Bookworm" },
                    ].map((a) => (
                      <div key={a.label} className="bg-white/10 backdrop-blur rounded-xl p-2.5 text-center">
                        <p className="text-xl mb-0.5">{a.icon}</p>
                        <p className="text-[9px] text-teal-100">{a.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
