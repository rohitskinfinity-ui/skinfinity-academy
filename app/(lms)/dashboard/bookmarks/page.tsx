"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import { useRouter } from "next/navigation";

export default function BookmarksPage() {
  const router = useRouter();
  const bookmarks = [
    { title: 'Lip Augmentation Technique', course: 'Advanced Injectables', module: 'Module 4', time: '12:30', icon: 'play_circle' },
    { title: 'Vascular Occlusion Management', course: 'Advanced Injectables', module: 'Module 2', time: '08:15', icon: 'play_circle' },
    { title: 'Laser Safety Protocols', course: 'Laser & Energy Devices', module: 'Module 2', time: '15:00', icon: 'play_circle' },
    { title: 'Deep Peel Application', course: 'Chemical Peels', module: 'Module 6', time: '22:40', icon: 'play_circle' },
    { title: 'Hair Growth Cycles', course: 'Trichology', module: 'Module 1', time: '05:20', icon: 'play_circle' },
    { title: 'Patient Consultation Framework', course: 'Facial Anatomy', module: 'Module 3', time: '10:00', icon: 'play_circle' },
  ];

  const handleOpenCourse = () => {
    router.push("/course/Advanced-Injectables");
  };

  return (
    <>
      <SectionHeader title="Bookmarks" subtitle="Your saved lessons and timestamps for quick access." />
      <div className="grid sm:grid-cols-2 gap-4">
        {bookmarks.map((b) => (
          <div key={b.title} onClick={handleOpenCourse} className="bg-white rounded-2xl p-4 shadow-soft border border-slate-50 hover:shadow-card-hover transition-all cursor-pointer flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
              <MaterialIcon name={b.icon} size={22} className="text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-teal-600 transition-colors">{b.title}</p>
              <p className="text-xs text-slate-400">{b.course} • {b.module}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-2.5 py-1.5 rounded-lg">
              <MaterialIcon name="schedule" size={12} /> {b.time}
            </div>
            <MaterialIcon name="bookmark" size={18} className="text-teal-500 flex-shrink-0" />
          </div>
        ))}
      </div>
    </>
  );
}
