"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import StatusBadge from "../_components/StatusBadge";
import EmptyState from "../_components/EmptyState";
import ReferSkeleton from "../_components/ReferSkeleton";
import { ApiError } from "@/lib/api/client";
import {
  fetchStudentReferrals,
  type StudentReferralDashboard,
  type StudentReferralItem,
} from "@/lib/api/student-client";
import { formatInrAmount } from "@/lib/referrals";

function initials(name: string | null | undefined) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function formatInviteDate(value: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

function statusLabel(status: StudentReferralItem["status"]) {
  if (status === "enrolled" || status === "rewarded") return "Enrolled";
  if (status === "expired") return "Expired";
  return "Pending";
}

function statusKey(status: StudentReferralItem["status"]) {
  if (status === "enrolled" || status === "rewarded") return "completed";
  if (status === "expired") return "overdue";
  return "pending";
}

export default function ReferPage() {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StudentReferralDashboard | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchStudentReferrals();
        if (!cancelled) setData(res);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load referrals",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const wallet = data?.wallet;
  const availableBalance = Number(
    wallet?.available ?? data?.available_balance ?? 0,
  );
  const rewardLabel = useMemo(() => {
    if (!data) return "₹2,000";
    return formatInrAmount(data.reward_amount, data.currency);
  }, [data]);

  const discountLabel = useMemo(() => {
    if (!data) return "₹2,000";
    return formatInrAmount(data.friend_discount, data.currency);
  }, [data]);

  const copy = async (value: string, kind: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* ignore */
    }
    setCopied(kind);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareText = data
    ? `Join Skinfinity Academy with my code ${data.code} and get ${discountLabel} off. ${data.link}`
    : "";

  function shareWhatsApp() {
    if (!data) return;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function shareEmail() {
    if (!data) return;
    const subject = encodeURIComponent("₹2,000 off Skinfinity Academy");
    const body = encodeURIComponent(shareText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  async function shareMore() {
    if (!data) return;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Skinfinity Academy referral",
          text: shareText,
          url: data.link,
        });
        return;
      } catch {
        /* cancelled */
      }
    }
    await copy(data.link, "link");
  }

  if (loading) {
    return <ReferSkeleton />;
  }

  if (error || !data) {
    return (
      <EmptyState
        icon="error"
        title="Couldn’t load referrals"
        description={error || "Please try again."}
      />
    );
  }

  return (
    <div>
      <SectionHeader
        title="Refer & Earn"
        subtitle="Invite colleagues and earn cashback when they enroll."
      />

      <Card className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-teal-700 dark:text-teal-300">
              Available balance
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
              {formatInrAmount(availableBalance, data.currency)}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Earned {formatInrAmount(Number(wallet?.earned ?? 0), data.currency)}
              {wallet?.redeemed
                ? ` · Used ${formatInrAmount(Number(wallet.redeemed), data.currency)}`
                : ""}
            </p>
          </div>
          <Link
            href="/enroll?credit=1"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-700"
          >
            <MaterialIcon name="school" size={16} />
            Use on a new course
          </Link>
        </div>
      </Card>

      <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-5 text-white sm:p-6">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <MaterialIcon name="redeem" size={22} />
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Give {discountLabel}, Get {rewardLabel}
            </h3>
          </div>
          <p className="mb-5 max-w-md text-sm text-teal-100">
            Your friend gets {discountLabel} off their course fee, and you earn{" "}
            {rewardLabel} cashback when they enroll.
          </p>

          <div className="mb-3 rounded-xl bg-white/15 p-4 backdrop-blur">
            <p className="mb-1.5 text-xs text-teal-200">Your Referral Link</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate text-sm font-mono">{data.link}</code>
              <button
                type="button"
                onClick={() => void copy(data.link, "link")}
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
                {data.code}
              </code>
              <button
                type="button"
                onClick={() => void copy(data.code, "code")}
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
            <button
              type="button"
              onClick={shareWhatsApp}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/25"
            >
              <MaterialIcon name="chat" size={14} /> WhatsApp
            </button>
            <button
              type="button"
              onClick={shareEmail}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/25"
            >
              <MaterialIcon name="mail" size={14} /> Email
            </button>
            <button
              type="button"
              onClick={() => void shareMore()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/25"
            >
              <MaterialIcon name="share" size={14} /> More
            </button>
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
            desc: `They get ${discountLabel} off at checkout.`,
          },
          {
            step: "3",
            title: `You Earn ${rewardLabel}`,
            desc: "Cashback credited after enrollment.",
          },
        ].map((s) => (
          <Card key={s.step}>
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-950 text-sm font-bold text-teal-700 dark:text-teal-300">
              {s.step}
            </div>
            <h4 className="mb-1 text-sm font-bold text-slate-800 dark:text-white">
              {s.title}
            </h4>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {s.desc}
            </p>
          </Card>
        ))}
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Your Referrals
          </h3>
        </div>
        {data.referrals.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            No referrals yet. Share your link to get started.
          </p>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {data.referrals.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-950 text-xs font-bold text-teal-700 dark:text-teal-300">
                    {initials(r.invitee_name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {r.invitee_name || r.invitee_email || "Invitee"}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Invited {formatInviteDate(r.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <StatusBadge
                    status={statusKey(r.status)}
                    label={statusLabel(r.status)}
                  />
                  <span className="w-16 text-right text-sm font-bold text-teal-600 dark:text-teal-400">
                    {r.reward_amount != null
                      ? formatInrAmount(r.reward_amount, r.currency)
                      : "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
