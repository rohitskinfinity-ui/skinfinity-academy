"use client";

import { useEffect, useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import StatusBadge from "../_components/StatusBadge";
import StatTile from "../_components/StatTile";
import EmptyState from "../_components/EmptyState";
import { ApiError } from "@/lib/api/client";
import {
  fetchStudentPayments,
  type StudentPaymentsPayload,
} from "@/lib/api/student-client";
import { formatInrAmount } from "@/lib/referrals";

function formatCompactInr(amount: number, currency = "INR") {
  const n = Number(amount) || 0;
  if (currency !== "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);
  }
  if (n >= 100000) {
    const lakhs = n / 100000;
    const label = Number.isInteger(lakhs)
      ? String(lakhs)
      : lakhs.toFixed(1).replace(/\.0$/, "");
    return `₹${label}L`;
  }
  if (n >= 1000) {
    const thousands = n / 1000;
    const label = Number.isInteger(thousands)
      ? String(thousands)
      : thousands.toFixed(1).replace(/\.0$/, "");
    return `₹${label}K`;
  }
  return formatInrAmount(n, currency);
}

function formatPaymentDate(value: string | null | undefined) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusLabel(status: string) {
  const key = status.toLowerCase();
  if (key === "paid") return "Paid";
  if (key === "pending") return "Pending";
  if (key === "partial") return "Partial";
  if (key === "failed") return "Failed";
  if (key === "refunded") return "Refunded";
  return status.replace(/_/g, " ");
}

function PaymentsSkeleton() {
  return (
    <div>
      <div className="mb-6 space-y-2">
        <div className="h-8 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-64 max-w-full animate-pulse rounded-lg bg-slate-200/60 dark:bg-slate-800/60" />
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-3 h-10 w-10 animate-pulse rounded-xl bg-teal-500/20" />
            <div className="h-7 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-200/60 dark:bg-slate-800/60" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 h-5 w-40 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="h-4 w-48 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-40 max-w-full animate-pulse rounded bg-slate-200/60 dark:bg-slate-800/60" />
              </div>
              <div className="h-8 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const [data, setData] = useState<StudentPaymentsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchStudentPayments();
        if (!cancelled) setData(res);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load payments",
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

  if (loading) return <PaymentsSkeleton />;
  if (error) {
    return (
      <div>
        <SectionHeader
          title="Payments"
          subtitle="Review your transactions and spend summary."
        />
        <EmptyState
          icon="error"
          title="Couldn’t load payments"
          description={error}
        />
      </div>
    );
  }

  const summary = data?.summary;
  const items = data?.items ?? [];
  const currency = summary?.currency || "INR";

  return (
    <div>
      <SectionHeader
        title="Payments"
        subtitle="Review your transactions and spend summary."
      />
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <StatTile
          icon="currency_rupee"
          label="Total Spent"
          value={formatCompactInr(summary?.total_spent ?? 0, currency)}
          color="from-teal-500 to-teal-700"
        />
        <StatTile
          icon="schedule"
          label="Pending"
          value={formatCompactInr(summary?.pending ?? 0, currency)}
          color="from-amber-500 to-orange-600"
        />
        <StatTile
          icon="menu_book"
          label="Courses Purchased"
          value={String(summary?.courses_purchased ?? 0)}
          color="from-cyan-500 to-blue-600"
        />
      </div>

      <Card>
        <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
          Transaction History
        </h3>
        {items.length === 0 ? (
          <EmptyState
            icon="receipt_long"
            title="No payments yet"
            description="When you purchase a course, your transactions will show up here."
          />
        ) : (
          <div className="space-y-1">
            {items.map((t) => {
              const paid = t.status.toLowerCase() === "paid";
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 sm:gap-4"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      paid
                        ? "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-500 dark:bg-amber-950/60 dark:text-amber-400"
                    }`}
                  >
                    <MaterialIcon
                      name={paid ? "check_circle" : "schedule"}
                      size={20}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {t.course}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {t.txn_code} · {formatPaymentDate(t.paid_at || t.created_at)}{" "}
                      · {t.method}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {formatInrAmount(t.amount, t.currency || currency)}
                    </p>
                    <StatusBadge
                      status={paid ? "paid" : t.status.toLowerCase()}
                      label={statusLabel(t.status)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
