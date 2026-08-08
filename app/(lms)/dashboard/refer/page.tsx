"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import StatusBadge from "../_components/StatusBadge";

const referrals = [
  { name: "Dr. Vivek Sharma", date: "Aug 10", status: "Enrolled", reward: "₹2,000", avatar: "VS" },
  { name: "Dr. Priya Desai", date: "Aug 12", status: "Pending", reward: "--", avatar: "PD" },
  { name: "Dr. Rahul Mehta", date: "Jul 28", status: "Enrolled", reward: "₹2,000", avatar: "RM" },
  { name: "Dr. Sneha Patil", date: "Jul 15", status: "Enrolled", reward: "₹2,000", avatar: "SP" },
];

export default function ReferPage() {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);
  const referralCode = "ARJUN2K";
  const referralLink = `https://skinfinity.edu/join/${referralCode.toLowerCase()}`;

  const copy = async (value: string, kind: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Refer & Earn"
        subtitle="Invite colleagues and earn cashback when they enroll."
      />

      <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-5 text-white sm:p-6">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <MaterialIcon name="redeem" size={22} />
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Give ₹2,000, Get ₹2,000
            </h3>
          </div>
          <p className="mb-5 max-w-md text-sm text-teal-100">
            Your friend gets ₹2,000 off their course fee, and you earn ₹2,000
            cashback when they enroll.
          </p>

          <div className="mb-3 rounded-xl bg-white/15 p-4 backdrop-blur">
            <p className="mb-1.5 text-xs text-teal-200">Your Referral Link</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate text-sm font-mono">{referralLink}</code>
              <button
                onClick={() => copy(referralLink, "link")}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-teal-700 transition-colors hover:bg-teal-50"
              >
                {copied === "link" ? (
                  <>
                    <MaterialIcon name="check" size={14} /> Copied
                  </>
                ) : (
                  <>
                    <MaterialIcon name="content_copy" size={14} /> Copy link
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mb-4 rounded-xl bg-white/15 p-4 backdrop-blur">
            <p className="mb-1.5 text-xs text-teal-200">Your Referral Code</p>
            <div className="flex items-center justify-between">
              <code className="text-lg font-bold tracking-wider font-mono">
                {referralCode}
              </code>
              <button
                onClick={() => copy(referralCode, "code")}
                className="rounded-lg bg-white/20 p-2 transition-colors hover:bg-white/30"
                aria-label="Copy code"
              >
                <MaterialIcon
                  name={copied === "code" ? "check" : "content_copy"}
                  size={15}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-teal-200">Share via</span>
            {[
              { icon: "chat", label: "WhatsApp" },
              { icon: "mail", label: "Email" },
              { icon: "share", label: "More" },
            ].map((s) => (
              <button
                key={s.label}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/25"
              >
                <MaterialIcon name={s.icon} size={14} /> {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            step: "1",
            title: "Share Your Link",
            desc: "Send your referral link to fellow doctors.",
          },
          {
            step: "2",
            title: "Friend Enrolls",
            desc: "They get ₹2,000 off at checkout.",
          },
          {
            step: "3",
            title: "You Earn ₹2,000",
            desc: "Cashback credited after enrollment.",
          },
        ].map((s) => (
          <Card key={s.step}>
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-950 text-sm font-bold text-teal-700 dark:text-teal-300">
              {s.step}
            </div>
            <h4 className="mb-1 text-sm font-bold text-slate-800 dark:text-white">{s.title}</h4>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{s.desc}</p>
          </Card>
        ))}
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Your Referrals</h3>
        </div>
        <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
          {referrals.map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-950 text-xs font-bold text-teal-700 dark:text-teal-300">
                  {r.avatar}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                    {r.name}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Invited {r.date}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge
                  status={r.status === "Enrolled" ? "completed" : "pending"}
                  label={r.status}
                />
                <span className="w-14 text-right text-sm font-bold text-teal-600 dark:text-teal-400">
                  {r.reward}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
