import { cn } from "@/lib/utils";

interface MaterialIconProps {
  name: string;
  size?: number;
  className?: string;
  filled?: boolean;
}

export default function MaterialIcon({
  name,
  size = 24,
  className,
  filled = false,
}: MaterialIconProps) {
  return (
    <span
      className={cn("material-symbols-outlined select-none", className)}
      style={{
        fontSize: size,
        fontVariationSettings: filled
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : undefined,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
