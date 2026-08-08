import MaterialIcon from "@/components/shared/MaterialIcon";

export default function StatTile({
  icon,
  label,
  value,
  hint,
}: {
  icon: string;
  label: string;
  value: string;
  hint?: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 ring-1 ring-teal-100 dark:ring-teal-900/50">
        <MaterialIcon name={icon} size={18} />
      </div>
      <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</p>
      {hint && (
        <p className="mt-1 text-[10px] font-medium text-slate-400 dark:text-slate-500">{hint}</p>
      )}
    </div>
  );
}

