"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";

export default function NotesPage() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Vascular Occlusion Signs', course: 'Advanced Injectables', date: 'Aug 10', preview: 'Immediate blanching, pain, tissue duskiness. Use hyaluronidase immediately...' },
    { id: 2, title: 'Laser Parameters', course: 'Laser & Energy Devices', date: 'Aug 8', preview: 'Alexandrite 755nm for hair removal. Fluence 15-25 J/cm². Pulse width 3-100ms...' },
    { id: 3, title: 'Peel Classification', course: 'Chemical Peels', date: 'Aug 5', preview: 'Superficial: salicylic acid 20-30%. Medium: TCA 35%. Deep: TCA 50%+ phenol...' },
  ]);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [newNote, setNewNote] = useState('');

  const note = notes.find(n => n.id === activeNote);

  if (note) {
    return (
      <>
        <button onClick={() => setActiveNote(null)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 mb-4">
          <MaterialIcon name="chevron_left" size={16} /> Back to Notes
        </button>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>{note.title}</h2>
              <p className="text-xs text-slate-400">{note.course} • {note.date}</p>
            </div>
            <button onClick={() => setActiveNote(null)} className="p-2 rounded-lg hover:bg-slate-100"><MaterialIcon name="close" size={18} /></button>
          </div>
          <textarea defaultValue={note.preview} className="w-full h-64 p-4 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 resize-none transition-all" />
          <div className="flex justify-end mt-3">
            <button className="px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-colors">Save Changes</button>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <SectionHeader title="My Notes" subtitle="Personal notes from your lessons. Click any note to edit." />
      <Card className="mb-5">
        <div className="flex gap-3">
          <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Create a new note..." className="flex-1 px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all" />
          <button onClick={() => { if (newNote.trim()) { setNotes([{ id: Date.now(), title: newNote, course: 'General', date: 'Today', preview: '' }, ...notes]); setNewNote(''); } }} className="px-5 py-3 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2">
            <MaterialIcon name="sticky_note_2" size={16} /> Add Note
          </button>
        </div>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((n) => (
          <div key={n.id} onClick={() => setActiveNote(n.id)} className="bg-white rounded-2xl p-5 shadow-soft border border-slate-50 hover:shadow-card-hover hover:-translate-y-0.5 transition-all cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0"><MaterialIcon name="sticky_note_2" size={20} className="text-teal-600" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-teal-600 transition-colors">{n.title}</h3>
                <p className="text-[10px] text-slate-400">{n.course} • {n.date}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{n.preview}</p>
          </div>
        ))}
      </div>
    </>
  );
}
