import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import SectionSkeleton from "@/components/shared/SectionSkeleton";

const Stats = dynamic(() => import("@/components/sections/Stats"), {
  loading: () => <SectionSkeleton cards={5} />,
});
const AboutAcademy = dynamic(
  () => import("@/components/sections/AboutAcademy"),
  { loading: () => <SectionSkeleton cards={2} /> }
);
const FeaturedPrograms = dynamic(
  () => import("@/components/sections/FeaturedPrograms"),
  { loading: () => <SectionSkeleton cards={6} /> }
);
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"), {
  loading: () => <SectionSkeleton cards={4} />,
});
const LearningJourney = dynamic(
  () => import("@/components/sections/LearningJourney"),
  { loading: () => <SectionSkeleton cards={6} /> }
);
const StudentDashboardPreview = dynamic(
  () => import("@/components/sections/StudentDashboardPreview"),
  { loading: () => <SectionSkeleton cards={1} /> }
);
const StudentSuccess = dynamic(
  () => import("@/components/sections/StudentSuccess"),
  { loading: () => <SectionSkeleton cards={3} /> }
);
const Certifications = dynamic(
  () => import("@/components/sections/Certifications"),
  { loading: () => <SectionSkeleton cards={2} /> }
);
const Blog = dynamic(() => import("@/components/sections/Blog"), {
  loading: () => <SectionSkeleton cards={3} />,
});
const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  loading: () => <SectionSkeleton cards={1} />,
});
const CTA = dynamic(() => import("@/components/sections/CTA"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      {/* <Stats /> */}
      <AboutAcademy />
      <Certifications />
      <FeaturedPrograms />
      <WhyChooseUs />
      <LearningJourney />
      {/* <StudentDashboardPreview /> */}
      <StudentSuccess />
      <Blog />
      <FAQ />
      {/* <CTA /> */}
    </>
  );
}
