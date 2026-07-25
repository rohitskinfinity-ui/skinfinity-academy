import { cn } from "@/lib/utils";
import FadeIn from "@/components/motion/FadeIn";

type SectionHeaderProps = {
  tag?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  tag,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <FadeIn
      className={cn(
        "mb-6 sm:mb-8",
        align === "center" && "text-center mx-auto",
        className
      )}
    >
      {tag && (
        <span className="section-tag mb-2 inline-flex">{tag}</span>
      )}
      <h2 className="section-title mt-2 mb-2">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "section-subtitle",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
