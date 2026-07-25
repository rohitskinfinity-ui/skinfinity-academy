"use client";

import { useState, useEffect, useCallback } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";

const stats = [
  { icon: "group", value: "12,000+", label: "Students Trained" },
  { icon: "menu_book", value: "45+", label: "Courses & Programs" },
  { icon: "military_tech", value: "80+", label: "Expert Faculty" },
  { icon: "language", value: "24+", label: "Countries" },
];

const banners = [
  {
    image: "/banner2.png",
    eyebrow: "Clinical Programs",
    title: "Master Aesthetic Dermatology",
    subtitle:
      "Advanced clinical training designed for doctors and dermatologists seeking excellence.",
    cta: "Explore Courses",
    href: "/courses",
  },
  {
    image: "/banner-bg16-ilamed2026.jpeg",
    eyebrow: "Clinical Programs",
    title: "Master Aesthetic Dermatology",
    subtitle:
      "Advanced clinical training designed for doctors and dermatologists seeking excellence.",
    cta: "Explore Courses",
    href: "/courses",
  },
];

function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % banners.length),
    []
  );
  const prev = () =>
    setCurrent((c) => (c - 1 + banners.length) % banners.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <div
      className="relative w-full overflow-hidden group grid"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {banners.map((b, i) => (
        <div
          key={i}
          className={`col-start-1 row-start-1 transition-opacity duration-1000 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
        >
          <img
            src={b.image}
            alt={b.title}
            className="w-full h-auto block"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/25 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous banner"
      >
        <MaterialIcon name="chevron_left" size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/25 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next banner"
      >
        <MaterialIcon name="chevron_right" size={24} />
      </button>

    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative">
      <BannerCarousel />
    </section>
  );
}
