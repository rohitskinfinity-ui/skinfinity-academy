import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import UpcomingSchedule from "@/components/sections/UpcomingSchedule";
import FeaturedPrograms from "@/components/sections/FeaturedPrograms";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import LearningJourney from "@/components/sections/LearningJourney";
import LMSFeatures from "@/components/sections/LMSFeatures";
import StudentDashboardPreview from "@/components/sections/StudentDashboardPreview";
import Workshops from "@/components/sections/Workshops";
import Certifications from "@/components/sections/Certifications";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <FeaturedPrograms />
      <WhyChooseUs />
      <LearningJourney />
      <LMSFeatures />
      <StudentDashboardPreview />
      <Workshops />
      <Certifications />
      <Blog />
      <FAQ />
      <CTA />
    </>
  );
}
