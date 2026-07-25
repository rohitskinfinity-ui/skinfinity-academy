"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [message, setMessage] = useState('');

  const conversations = [
    { id: 1, name: 'Dr. Aisha Sharma', role: 'Faculty', last: 'Great progress on Module 4!', time: '2h', unread: 2 },
    { id: 2, name: 'Dr. Priya Menon', role: 'Faculty', last: 'Check the injection landmarks chart', time: '5h', unread: 0 },
    { id: 3, name: 'Dr. Neha Gupta', role: 'Faculty', last: 'Your laser safety quiz is due', time: '1d', unread: 1 },
    { id: 4, name: 'Student Group', role: 'Group', last: 'Dr. Karthik: Anyone done Module 6?', time: '2d', unread: 0 },
  ];

  const chat = conversations.find(c => c.id === activeChat);
  const messages = [
    { from: 'them', text: 'Hi Dr. Arjun, how is Module 4 going?', time: '10:30 AM' },
    { from: 'me', text: 'Going well! I just finished the lip augmentation lesson.', time: '10:32 AM' },
    { from: 'them', text: 'Excellent! Make sure to review the vascular danger zones before the assessment.', time: '10:35 AM' },
    { from: 'me', text: 'Will do. Is the assessment on Aug 18?', time: '10:36 AM' },
    { from: 'them', text: 'Yes, and great progress on Module 4!', time: '10:38 AM' },
  ];

  return (
    <>
      <SectionHeader title="Messages" subtitle="Chat with your instructors and peers." />
      <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
        {/* Conversation list */}
        <div className="bg-white rounded-3xl shadow-soft border border-slate-50 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex-shrink-0">
            <div className="relative">
              <MaterialIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-transparent focus:border-teal-300 focus:bg-white focus:outline-none transition-all" />
            </div>
          </div>
          <div className="overflow-y-auto scrollbar-hide flex-1">
            {conversations.map(c => (
              <button key={c.id} onClick={() => setActiveChat(c.id)} className={`flex items-center gap-3 w-full p-4 text-left border-b border-slate-50 transition-colors ${activeChat === c.id ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                <div className="w-11 h-11 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{c.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900 truncate">{c.name}</p>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{c.last}</p>
                </div>
                {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-soft border border-slate-50 flex flex-col overflow-hidden">
          {chat ? (
            <>
              <div className="flex items-center gap-3 p-4 border-b border-slate-100 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-xs">{chat.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{chat.name}</p>
                  <p className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active now</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.from === 'me' ? 'bg-teal-600 text-white rounded-br-sm' : 'bg-slate-100 text-slate-700 rounded-bl-sm'}`}>
                      {m.text}
                      <p className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-teal-100' : 'text-slate-400'}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-100 flex items-center gap-2 flex-shrink-0">
                <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400"><MaterialIcon name="attach_file" size={18} /></button>
                <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-transparent focus:border-teal-300 focus:bg-white focus:outline-none transition-all" />
                <button onClick={() => setMessage('')} className="p-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors"><MaterialIcon name="send" size={18} /></button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
              <MaterialIcon name="chat" size={48} className="mb-4 opacity-50" />
              <p className="text-sm">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
