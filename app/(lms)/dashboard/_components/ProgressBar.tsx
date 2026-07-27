export default function ProgressBar({
  value,
  className = "",
  trackClassName = "bg-slate-100",
  barClassName = "bg-gradient-to-r from-teal-500 to-teal-600",
}: {
  value: number;
  className?: string;
  trackClassName?: string;
  barClassName?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full ${trackClassName} ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${barClassName}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
