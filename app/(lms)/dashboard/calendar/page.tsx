"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";

export default function CalendarPage() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const events: Record<number, { title: string; type: string; color: string }[]> = {
    5: [{ title: 'Laser Safety Quiz', type: 'Quiz', color: 'bg-amber-500' }],
    12: [{ title: 'Injectables Workshop', type: 'Workshop', color: 'bg-teal-500' }],
    15: [{ title: 'Live Demo: Injection', type: 'Live', color: 'bg-red-500' }],
    18: [{ title: 'MCQ Assessment', type: 'Assessment', color: 'bg-blue-500' }],
    22: [{ title: 'Live Q&A Session', type: 'Live', color: 'bg-red-500' }],
    25: [{ title: 'Peel Workshop', type: 'Workshop', color: 'bg-teal-500' }],
    28: [{ title: 'Assignment Due', type: 'Deadline', color: 'bg-slate-600' }],
  };

  return (
    <>
      <SectionHeader title="Calendar" subtitle="Your scheduled classes, assessments, and deadlines." />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>August 2025</h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-xl hover:bg-slate-100"><MaterialIcon name="chevron_left" size={18} className="text-slate-400" /></button>
                <button className="p-2 rounded-xl hover:bg-slate-100"><MaterialIcon name="chevron_right" size={18} className="text-slate-400" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <div key={day} className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition-all cursor-pointer ${events[day] ? 'bg-teal-50 text-teal-700 font-bold hover:bg-teal-100' : 'text-slate-600 hover:bg-slate-50'}`}>
                  {day}
                  {events[day] && <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${events[day][0].color}`} />}
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>Upcoming Events</h3>
            <div className="space-y-3">
              {Object.entries(events).map(([day, evts]) => (
                evts.map((e, i) => (
                  <div key={`${day}-${i}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className={`w-1 h-10 rounded-full ${e.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{e.title}</p>
                      <p className="text-xs text-slate-400">Aug {day} • {e.type}</p>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
