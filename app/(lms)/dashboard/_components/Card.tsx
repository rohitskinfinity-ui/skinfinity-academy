export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-3xl p-5 shadow-soft border border-slate-50 ${className}`}>
      {children}
    </div>
  );
}
