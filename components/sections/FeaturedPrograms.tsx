"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CourseCard, { type CourseCardData } from "@/components/shared/CourseCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
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
              <span className="text-teal-700">medical excellence</span>
            </>
          }
          subtitle="Explore flagship programs designed by leading dermatologists and aesthetic medicine experts."
        />

        {/* Horizontal snap-scroll on mobile, grid from `sm` up */}
        <Stagger className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-2 scrollbar-hide sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:px-0 sm:py-0 lg:grid-cols-3">
          {courses.map((course) => (
            <StaggerItem
              key={course.title}
              className="w-[80vw] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <CourseCard course={course} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400 sm:hidden">
          <ArrowRight className="size-3.5" aria-hidden />
          Swipe to explore more programs
        </p>

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
