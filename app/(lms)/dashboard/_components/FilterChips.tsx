export default function FilterChips({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              active
                ? "bg-teal-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:text-teal-700"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
