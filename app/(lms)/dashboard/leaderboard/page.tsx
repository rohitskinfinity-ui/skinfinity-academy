"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";

export default function LeaderboardPage() {
  const leaders = [
    { rank: 1, name: 'Dr. Sneha Patel', points: 2840, courses: 12, streak: 45 },
    { rank: 2, name: 'Dr. Arjun Reddy', points: 2650, courses: 10, streak: 30, you: true },
    { rank: 3, name: 'Dr. Kavya Menon', points: 2430, courses: 9, streak: 28 },
    { rank: 4, name: 'Dr. Vikram Singh', points: 2210, courses: 8, streak: 22 },
    { rank: 5, name: 'Dr. Neha Gupta', points: 2080, courses: 7, streak: 18 },
    { rank: 6, name: 'Dr. Rohit Sharma', points: 1950, courses: 7, streak: 15 },
    { rank: 7, name: 'Dr. Anjali Reddy', points: 1820, courses: 6, streak: 12 },
    { rank: 8, name: 'Dr. Karthik Nair', points: 1700, courses: 5, streak: 10 },
  ];

  return (
    <>
      <SectionHeader title="Leaderboard" subtitle="See how you rank against your peers this month." />
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <MaterialIcon name="emoji_events" size={32} className="text-amber-300" />
          </div>
          <div>
            <p className="text-sm text-teal-100">Your Current Rank</p>
            <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>#2 of 8</p>
            <p className="text-xs text-teal-200 mt-1">2,650 points • 30-day streak</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {leaders.map((p) => (
          <div key={p.rank} className={`bg-white rounded-2xl p-4 shadow-soft border flex items-center gap-4 transition-all ${p.you ? 'border-teal-200 bg-teal-50/30' : 'border-slate-50 hover:shadow-card-hover'}`}>
            <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${p.rank === 1 ? 'bg-amber-100 text-amber-700' : p.rank === 2 ? 'bg-slate-200 text-slate-600' : p.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-500'}`}>{p.rank}</span>
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{p.name.split(' ').map(n => n[0]).join('')}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{p.name} {p.you && <span className="text-teal-600 text-xs">(You)</span>}</p>
              <div className="flex gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><MaterialIcon name="menu_book" size={11} /> {p.courses} courses</span>
                <span className="flex items-center gap-1"><MaterialIcon name="trending_up" size={11} /> {p.streak} day streak</span>
              </div>
            </div>
            <span className="text-lg font-bold text-teal-600">{p.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </>
  );
}
