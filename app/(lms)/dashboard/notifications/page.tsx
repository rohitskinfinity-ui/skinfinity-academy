"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";

export default function NotificationsPage() {
  const notifications = [
    { icon: 'description', title: 'New Assignment Posted', desc: 'Case Study: Vascular Complication Management is due Aug 18', time: '2 hours ago', color: 'bg-amber-50 text-amber-500', unread: true },
    { icon: 'play_circle', title: 'Live Class Starting Soon', desc: 'Advanced Injection Techniques Live Demo starts in 1 hour', time: '1 hour ago', color: 'bg-red-50 text-red-500', unread: true },
    { icon: 'emoji_events', title: 'Certificate Earned', desc: 'You earned a certificate for Fellowship in Aesthetic Dermatology', time: '1 day ago', color: 'bg-emerald-50 text-emerald-500', unread: false },
    { icon: 'emoji_events', title: 'Leaderboard Update', desc: 'You moved up to rank #2 on the monthly leaderboard', time: '2 days ago', color: 'bg-amber-50 text-amber-500', unread: false },
    { icon: 'check_circle', title: 'Assignment Graded', desc: 'Your Patient Assessment Case Report scored 92/100', time: '3 days ago', color: 'bg-teal-50 text-teal-500', unread: false },
    { icon: 'chat', title: 'New Message', desc: 'Dr. Aisha Sharma replied to your question', time: '4 days ago', color: 'bg-blue-50 text-blue-500', unread: false },
    { icon: 'notifications', title: 'Course Update', desc: 'New lesson added to Chemical Peels Mastery', time: '5 days ago', color: 'bg-slate-100 text-slate-500', unread: false },
  ];

  return (
    <>
      <SectionHeader title="Notifications" subtitle="Stay updated on your courses, assignments, and activity." />
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className={`bg-white rounded-2xl p-4 shadow-soft border flex items-start gap-4 transition-all ${n.unread ? 'border-teal-100' : 'border-slate-50'}`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${n.color}`}>
              <MaterialIcon name={n.icon} size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                {n.unread && <span className="w-2 h-2 rounded-full bg-teal-500" />}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
              <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
