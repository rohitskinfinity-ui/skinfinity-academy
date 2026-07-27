const styles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  submitted: "bg-sky-50 text-sky-700",
  graded: "bg-emerald-50 text-emerald-700",
  completed: "bg-emerald-50 text-emerald-700",
  "in-progress": "bg-teal-50 text-teal-700",
  live: "bg-red-50 text-red-600",
  upcoming: "bg-slate-100 text-slate-600",
  unread: "bg-teal-50 text-teal-700",
  paid: "bg-emerald-50 text-emerald-700",
  overdue: "bg-red-50 text-red-600",
};

export default function StatusBadge({
  status,
  label,
}: {
  status: string;
  label?: string;
}) {
  const key = status.toLowerCase().replace(/\s+/g, "-");
  const className = styles[key] ?? "bg-slate-100 text-slate-600";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${className}`}
    >
      {label ?? status}
    </span>
  );
}
