"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import StatusBadge from "../_components/StatusBadge";
import StatTile from "../_components/StatTile";

const transactions = [
  {
    id: "TXN-001",
    course: "Fellowship in Aesthetic Dermatology",
    amount: 120000,
    date: "Jan 15, 2025",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "TXN-002",
    course: "Certificate in Clinical Cosmetology",
    amount: 65000,
    date: "Mar 10, 2025",
    status: "paid",
    method: "UPI",
  },
  {
    id: "TXN-003",
    course: "Advanced Injectables Workshop",
    amount: 45000,
    date: "May 5, 2025",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "TXN-004",
    course: "Laser & Energy Devices",
    amount: 28000,
    date: "Aug 1, 2025",
    status: "pending",
    method: "Bank Transfer",
  },
];

export default function PaymentsPage() {
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
          value="₹2.3L"
          color="from-teal-500 to-teal-700"
        />
        <StatTile
          icon="schedule"
          label="Pending"
          value="₹28K"
          color="from-amber-500 to-orange-600"
        />
        <StatTile
          icon="menu_book"
          label="Courses Purchased"
          value="4"
          color="from-cyan-500 to-blue-600"
        />
      </div>

      <Card>
        <h3 className="mb-4 font-bold text-slate-900">Transaction History</h3>
        <div className="space-y-1">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 sm:gap-4"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  t.status === "paid"
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-amber-50 text-amber-500"
                }`}
              >
                <MaterialIcon
                  name={t.status === "paid" ? "check_circle" : "schedule"}
                  size={20}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {t.course}
                </p>
                <p className="text-xs text-slate-400">
                  {t.id} · {t.date} · {t.method}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">
                  ₹{t.amount.toLocaleString()}
                </p>
                <StatusBadge
                  status={t.status}
                  label={t.status === "paid" ? "Paid" : "Pending"}
                />
              </div>
              <button
                className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 sm:block"
                aria-label="Download receipt"
              >
                <MaterialIcon name="download" size={16} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
