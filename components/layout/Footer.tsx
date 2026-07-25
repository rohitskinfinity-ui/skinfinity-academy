"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SocialIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    Facebook: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
    Twitter: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    ),
    Instagram: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
    LinkedIn: (
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    ),
    YouTube: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}

const footerLinks = {
  About: [
    { label: "Our Story", href: "/about" },
    { label: "Vision & Mission", href: "/about" },
    { label: "Leadership", href: "/about" },
    { label: "Accreditation", href: "/about" },
  ],
  Courses: [
    { label: "Aesthetic Dermatology", href: "/courses" },
    { label: "Clinical Cosmetology", href: "/courses" },
    { label: "Advanced Injectables", href: "/courses" },
    { label: "Trichology", href: "/courses" },
    { label: "Laser Devices", href: "/courses" },
  ],
  Admissions: [
    { label: "How to Apply", href: "/contact" },
    { label: "Eligibility", href: "/courses" },
    { label: "Course Fees", href: "/courses" },
    { label: "Scholarships", href: "/about" },
    { label: "Refund Policy", href: "/about" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Workshops", href: "/workshops" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
};

const contactInfo = [
  { icon: Mail, text: "support@skinfinityacademy.com", href: "mailto:support@skinfinityacademy.com" },
  { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MapPin, text: "MG Road, Bengaluru, India", href: "#" },
];

const socials = [
  { name: "Facebook", label: "Facebook", href: "#" },
  { name: "Twitter", label: "Twitter", href: "#" },
  { name: "Instagram", label: "Instagram", href: "#" },
  { name: "LinkedIn", label: "LinkedIn", href: "#" },
  { name: "YouTube", label: "YouTube", href: "#" },
];

const badges = ["CIBTAC", "CIDESCO", "IMA", "AAD Partner"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 pt-14 pb-8 text-slate-300">
      <div className="absolute inset-0 pattern-grid opacity-20" aria-hidden />
      <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-teal-600/20 blur-[120px]" aria-hidden />

      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="relative mb-12 overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-700 to-teal-900 p-6 sm:p-10">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                Stay ahead in dermatology
              </h3>
              <p className="text-sm text-teal-100">
                Course updates, workshop announcements, and clinical insights —
                delivered weekly.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-3 sm:flex-row"
              aria-label="Newsletter signup"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-auto flex-1 rounded-2xl border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-teal-200/60 focus-visible:ring-white/30"
                required
                aria-label="Email address"
              />
              <Button
                type="submit"
                className="h-auto rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-teal-800 hover:bg-teal-50"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex size-12 items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Skinfinity Academy"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-base font-bold text-white">Skinfinity</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-400">
                  Academy
                </p>
              </div>
            </div>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-slate-400">
              International-quality dermatology education empowering healthcare
              professionals worldwide through clinical excellence.
            </p>
            <div className="mb-5 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-teal-300 ring-1 ring-slate-800"
                >
                  <BadgeCheck className="size-3" aria-hidden />
                  {b}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex size-9 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition-all hover:-translate-y-0.5 hover:bg-teal-700 hover:text-white"
                  aria-label={s.label}
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-400 transition-colors hover:text-teal-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap gap-6">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.text}
                href={item.href}
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-teal-400"
              >
                <Icon className="size-4 text-teal-400" aria-hidden />
                {item.text}
              </a>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 Skinfinity Academy of Cosmetology. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="transition-colors hover:text-teal-400">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-teal-400">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-teal-400">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
