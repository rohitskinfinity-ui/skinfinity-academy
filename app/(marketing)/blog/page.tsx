import PageHeader from "@/components/shared/PageHeader";
import Blog from "@/components/sections/Blog";

export default function BlogPage() {
  return (
    <div>
      <PageHeader
        title="Blog &"
        highlight="Insights"
        subtitle="Stay updated with the latest research, case studies, and medical advances in dermatology."
        breadcrumb="Blog"
      />
      <Blog />
    </div>
  );
}
