export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
