import MarketingLayout from "@/components/layout/MarketingLayout";

export default function MarketingRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
