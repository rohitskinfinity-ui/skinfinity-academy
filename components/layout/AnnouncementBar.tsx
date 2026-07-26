"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";

const announcements = [
  "🎓 Admissions Open for Fellowship in Aesthetic Dermatology — Batch 2025",
  "📅 Upcoming Workshop: Advanced Injectables & Fillers — Aug 15, 2025",
  "✅ Now Enrolling: Certificate Course in Clinical Cosmetology",
  "🌍 Students from 24+ Countries — Join the Global Community",
  "🏆 IEB & DMHCA Affiliated Programs Available",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const track = [...announcements, ...announcements];

  return (
    <div className="relative bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white text-xs py-2.5 overflow-hidden z-50">
      <div className="flex items-center">
        <div className="overflow-hidden flex-1">
          <div className="marquee-track flex whitespace-nowrap">
            {track.map((msg, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-8 font-medium"
              >
                {msg}
                <MaterialIcon
                  name="chevron_right"
                  size={12}
                  className="opacity-50"
                />
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="flex-shrink-0 px-3 py-1 hover:bg-white/10 rounded transition-colors mr-2"
          aria-label="Close"
        >
          <MaterialIcon name="close" size={14} />
        </button>
      </div>
    </div>
  );
}
