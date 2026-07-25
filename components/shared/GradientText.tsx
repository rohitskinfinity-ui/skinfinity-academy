import { cn } from "@/lib/utils";

export default function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-teal-700 via-teal-500 to-violet-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
