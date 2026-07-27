import MaterialIcon from "@/components/shared/MaterialIcon";

export default function StatTile({
  icon,
  label,
  value,
  hint,
  color = "from-teal-500 to-teal-700",
}: {
  icon: string;
  label: string;
  value: string;
  hint?: string;
  color?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,118,110,0.1)]">
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-sm`}
      >
        <MaterialIcon name={icon} size={18} />
      </div>
      <p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-slate-600">{label}</p>
      {hint && (
        <p className="mt-1 text-[10px] font-medium text-teal-600">{hint}</p>
      )}
    </div>
  );
}
