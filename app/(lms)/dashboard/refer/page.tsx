"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";

export default function ReferPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'ARJUN2K';
  const referralLink = `https://skinfinity.edu/join/${referralCode.toLowerCase()}`;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    { name: 'Dr. Vivek Sharma', date: 'Aug 10', status: 'Enrolled', reward: '₹2,000', avatar: 'VS' },
    { name: 'Dr. Priya Desai', date: 'Aug 12', status: 'Pending', reward: '--', avatar: 'PD' },
    { name: 'Dr. Rahul Mehta', date: 'Jul 28', status: 'Enrolled', reward: '₹2,000', avatar: 'RM' },
    { name: 'Dr. Sneha Patil', date: 'Jul 15', status: 'Enrolled', reward: '₹2,000', avatar: 'SP' },
  ];

  return (
    <>
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <MaterialIcon name="redeem" size={22} />
            <h3 className="font-bold text-lg" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>Give ₹2,000, Get ₹2,000</h3>
          </div>
          <p className="text-sm text-teal-100 mb-5 max-w-md">Your friend gets ₹2,000 off their course fee, and you earn ₹2,000 cashback when they enroll. Win-win!</p>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-4">
            <p className="text-xs text-teal-200 mb-1.5">Your Referral Link</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm font-mono truncate">{referralLink}</code>
              <button onClick={copyCode} className="px-3 py-2 bg-white text-teal-700 text-xs font-bold rounded-xl hover:bg-teal-50 transition-colors flex items-center gap-1.5 flex-shrink-0">
                {copied ? <><MaterialIcon name="check" size={14} /> Copied!</> : <><MaterialIcon name="content_copy" size={14} /> Copy</>}
              </button>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-4">
            <p className="text-xs text-teal-200 mb-1.5">Your Referral Code</p>
            <div className="flex items-center justify-between">
              <code className="text-lg font-mono font-bold tracking-wider">{referralCode}</code>
              <button onClick={copyCode} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <MaterialIcon name="content_copy" size={15} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="text-xs text-teal-200 font-semibold">Share via:</span>
            {[
              { icon: 'chat', label: 'WhatsApp' },
              { icon: 'public', label: 'Twitter' },
              { icon: 'share', label: 'Facebook' },
              { icon: 'share', label: 'LinkedIn' },
            ].map(s => (
              <button key={s.label} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center hover:bg-white/25 transition-colors">
                <MaterialIcon name={s.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { step: '1', title: 'Share Your Link', desc: 'Send your referral link to fellow doctors via WhatsApp, email, or social media.' },
          { step: '2', title: 'Friend Enrolls', desc: 'Your friend uses your link and gets ₹2,000 off their course fee at checkout.' },
          { step: '3', title: 'You Earn ₹2,000', desc: 'Once they complete enrollment, ₹2,000 cashback is credited to your wallet.' },
        ].map(s => (
          <div key={s.step} className="bg-white rounded-2xl p-5 shadow-soft border border-slate-50">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center mb-3">{s.step}</div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{s.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-slate-50 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Your Referrals</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {referrals.map(r => (
            <div key={r.name} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">{r.avatar}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                  <p className="text-xs text-slate-400">Invited {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {r.status}
                </span>
                <span className="text-sm font-bold text-teal-600 w-16 text-right">{r.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
