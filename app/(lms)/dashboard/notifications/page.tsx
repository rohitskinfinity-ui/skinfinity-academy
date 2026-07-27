"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";

type Notification = {
  id: number;
  icon: string;
  title: string;
  desc: string;
  time: string;
  color: string;
  unread: boolean;
  group: string;
};

const initial: Notification[] = [
  {
    id: 1,
    icon: "description",
    title: "New Assignment Posted",
    desc: "Case Study: Vascular Complication Management is due Aug 18",
    time: "2 hours ago",
    color: "bg-amber-50 text-amber-500",
    unread: true,
    group: "Today",
  },
  {
    id: 2,
    icon: "play_circle",
    title: "Live Class Starting Soon",
    desc: "Advanced Injection Techniques Live Demo starts in 1 hour",
    time: "1 hour ago",
    color: "bg-red-50 text-red-500",
    unread: true,
    group: "Today",
  },
  {
    id: 3,
    icon: "emoji_events",
    title: "Certificate Earned",
    desc: "You earned a certificate for Fellowship in Aesthetic Dermatology",
    time: "1 day ago",
    color: "bg-emerald-50 text-emerald-500",
    unread: false,
    group: "Earlier",
  },
  {
    id: 4,
    icon: "check_circle",
    title: "Assignment Graded",
    desc: "Your Patient Assessment Case Report scored 92/100",
    time: "3 days ago",
    color: "bg-teal-50 text-teal-500",
    unread: false,
    group: "Earlier",
  },
  {
    id: 5,
    icon: "chat",
    title: "New Message",
    desc: "Dr. Aisha Sharma replied to your question",
    time: "4 days ago",
    color: "bg-sky-50 text-sky-500",
    unread: false,
    group: "Earlier",
  },
  {
    id: 6,
    icon: "notifications",
    title: "Course Update",
    desc: "New lesson added to Chemical Peels Mastery",
    time: "5 days ago",
    color: "bg-slate-100 text-slate-500",
    unread: false,
    group: "Earlier",
  },
];

export default function NotificationsPage() {
  const [items, setItems] = useState(initial);
  const unreadCount = items.filter((n) => n.unread).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markRead = (id: number) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const groups = ["Today", "Earlier"];

  return (
    <div>
      <SectionHeader
        title="Notifications"
        subtitle="Stay updated on your courses, assignments, and activity."
        action={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-teal-200 hover:text-teal-700"
            >
              Mark all read
            </button>
          ) : undefined
        }
      />

      <div className="space-y-6">
        {groups.map((group) => {
          const groupItems = items.filter((n) => n.group === group);
          if (groupItems.length === 0) return null;
          return (
            <div key={group}>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                {group}
              </h2>
              <div className="space-y-2">
                {groupItems.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => markRead(n.id)}
                    className={`flex w-full items-start gap-3.5 rounded-2xl border bg-white p-4 text-left shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all hover:border-teal-100 ${
                      n.unread ? "border-teal-100 bg-teal-50/20" : "border-slate-200/70"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${n.color}`}
                    >
                      <MaterialIcon name={n.icon} size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {n.title}
                        </p>
                        {n.unread && (
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">{n.desc}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{n.time}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
