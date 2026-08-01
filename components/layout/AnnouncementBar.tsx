"use client";

import { useEffect, useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import { fetchSite } from "@/lib/api/public";

const FALLBACK = [
  "Admissions open for Diploma & PG Diploma in Clinical Cosmetology",
  "Live lectures every week with hands-on clinical training",
  "Skinfinity Academy — physician education in aesthetic medicine",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [announcements, setAnnouncements] = useState<string[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const site = await fetchSite();
        if (cancelled) return;
        const messages = (site.announcements ?? [])
          .map((a) => a.message)
          .filter(Boolean);
        if (messages.length > 0) setAnnouncements(messages);
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!visible) return null;

  const track = [...announcements, ...announcements];

  return (
    <div className="relative bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white text-xs py-2.5 overflow-hidden z-50">
      <div className="flex items-center">
        <div className="overflow-hidden flex-1">
          <div className="marquee-track flex whitespace-nowrap">
            {track.map((msg, i) => (
              <span
                key={`${msg}-${i}`}
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
