"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CourseCard, { type CourseCardData } from "@/components/shared/CourseCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
import GradientText from "@/components/shared/GradientText";

const courses: CourseCardData[] = [
  {
    title: "Fellowship in Aesthetic Dermatology",
    desc: "Comprehensive 6-month fellowship covering advanced aesthetic procedures, injectables, lasers, and clinical practice.",
    image:
      "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "6 Months",
    lessons: 48,
    certificate: "Fellowship Certificate",
    faculty: "Dr. Aisha Sharma",
    facultyAvatar:
      "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=200",
    price: "₹1,20,000",
    rating: 4.9,
    // progress: 0,
    bestseller: true,
    href: "/courses/fellowship-aesthetic-dermatology",
  },
  {
    title: "Certificate in Clinical Cosmetology",
    desc: "Master the fundamentals of clinical cosmetology with hands-on training in aesthetic procedures.",
    image:
      "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "3 Months",
    lessons: 32,
    certificate: "CIBTAC Certificate",
    faculty: "Dr. Rajesh Kumar",
    facultyAvatar:
      "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=200",
    price: "₹65,000",
    rating: 4.8,
    tag: "Best Value",
    href: "/courses/certificate-clinical-cosmetology",
  },
  {
    title: "Advanced Injectables & Dermal Fillers",
    desc: "Specialized training in botulinum toxin, dermal fillers, and advanced injection techniques.",
    image:
      "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "2 Weeks",
    lessons: 16,
    certificate: "Workshop Certificate",
    faculty: "Dr. Priya Menon",
    facultyAvatar:
      "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=200",
    price: "₹45,000",
    rating: 5.0,
    tag: "New",
    href: "/courses/advanced-injectables-fillers",
  },
  {
    title: "Trichology & Hair Sciences",
    desc: "Complete program in trichology, hair transplant fundamentals, and scalp disorder treatments.",
    image:
      "https://images.pexels.com/photos/3992854/pexels-photo-3992854.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "4 Months",
    lessons: 28,
    certificate: "Certificate of Completion",
    faculty: "Dr. Vikram Singh",
    facultyAvatar:
      "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=200",
    price: "₹38,000",
    rating: 4.7,
    href: "/courses/trichology-hair-sciences",
  },
  {
    title: "Laser & Energy-Based Devices",
    desc: "Master laser physics, safety protocols, and advanced energy-based treatment modalities.",
    image:
      "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "1 Month",
    lessons: 20,
    certificate: "Certificate of Completion",
    faculty: "Dr. Neha Gupta",
    facultyAvatar:
      "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=200",
    price: "₹28,000",
    rating: 4.8,
    href: "/courses/laser-energy-devices",
  },
  {
    title: "Chemical Peels & Skin Rejuvenation",
    desc: "Deep dive into chemical peel formulations, protocols, and skin rejuvenation techniques.",
    image:
      "https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "2 Weeks",
    lessons: 12,
    certificate: "Workshop Certificate",
    faculty: "Dr. Arjun Reddy",
    facultyAvatar:
      "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=200",
    price: "₹22,000",
    rating: 4.9,
    href: "/courses/chemical-peels-rejuvenation",
  },
];

export default function FeaturedPrograms() {
  return (
    <section id="courses" className="bg-[#F8FAFC] px-4 pb-8 pt-8 sm:px-6 sm:pb-8 sm:pt-10 lg:px-8 lg:pt-12">
      <div className="container-max">
        <SectionHeader
          tag="Featured Programs"
          title={
            <>
              Curated courses for{" "}
              <GradientText>medical excellence</GradientText>
            </>
          }
          subtitle="Explore flagship programs designed by leading dermatologists and aesthetic medicine experts."
        />

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <StaggerItem key={course.title}>
              <CourseCard course={course} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-6 flex justify-center">
          <Link
            href="/courses"
            className="btn-secondary group"
          >
            View all programs
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
