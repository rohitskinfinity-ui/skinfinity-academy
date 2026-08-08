import MaterialIcon from "@/components/shared/MaterialIcon";

export default function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
  fullPage = false,
}: {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  /** Center in the available viewport (loading / error screens). */
  fullPage?: boolean;
}) {
  return (
    <div
      className={
        fullPage
          ? "flex min-h-screen w-full items-center justify-center px-4"
          : undefined
      }
    >
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-14 text-center transition-colors dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
          <MaterialIcon name={icon} size={24} />
        </div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </p>
        {description ? (
          <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        ) : null}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  );
}
