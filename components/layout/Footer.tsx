"use client";

import { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/shared/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  About: [
    { label: "Our Story", href: "/about" },
    { label: "Vision & Mission", href: "/about" },
    { label: "Leadership", href: "/about" },
    { label: "Accreditation", href: "/about" },
  ],
  Courses: [
    { label: "Certificate Course in Aesthetic Dermatology", href: "/courses" },
    { label: "Certificate in Clinical Cosmetology", href: "/courses" },
    { label: "Advanced Injectables", href: "/courses" },
    { label: "Trichology & Hair Sciences", href: "/courses" },
    { label: "Laser & Energy Devices", href: "/courses" },
  ],
  Admissions: [
    { label: "How to Apply", href: "/contact" },
    { label: "Eligibility Criteria", href: "/courses" },
    { label: "Course Fees", href: "/courses" },
    { label: "Scholarships", href: "/about" },
    { label: "Refund Policy", href: "/about" },
  ],
};

const contactInfo = [
  { icon: "mail", text: "support@skinfinityacademy.com" },
  { icon: "phone", text: "+91 98765 43210" },
  { icon: "location_on", text: "MG Road, Bengaluru, India" },
];

const socials = [
  { icon: "public", label: "Facebook" },
  { icon: "public", label: "Twitter" },
  { icon: "photo_camera", label: "Instagram" },
  { icon: "work", label: "LinkedIn" },
  { icon: "play_circle", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-600/20 blur-[120px] rounded-full" />

      <div className="container-max px-4 sm:px-6 lg:px-8 relative">
        {/* Newsletter */}
        {/* <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-[2rem] p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/20 blur-3xl rounded-full" />
          <div className="grid lg:grid-cols-2 gap-8 items-center relative">
            <div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Stay Ahead in Dermatology
              </h3>
              <p className="text-teal-100 text-sm">
                Get the latest course updates, workshop announcements, and
                medical insights delivered weekly.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-teal-200/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm h-auto"
                required
              />
              <Button
                type="submit"
                className="px-6 py-3.5 bg-white text-teal-700 font-semibold rounded-2xl hover:bg-teal-50 transition-all hover:scale-105 flex items-center gap-2 text-sm whitespace-nowrap h-auto"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
                {!subscribed && (
                  <MaterialIcon name="arrow_forward" size={16} />
                )}
              </Button>
            </form>
          </div>
        </div> */}

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/logo.svg" alt="Skinfinity Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p
                  className="font-bold text-white text-base"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Skinfinity
                </p>
                <p className="text-[10px] text-teal-400 font-semibold tracking-widest uppercase">
                  Academy
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-xs">
              International-quality dermatology education empowering healthcare
              professionals worldwide through clinical excellence.
            </p>
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-all hover:-translate-y-0.5"
                  aria-label={s.label}
                >
                  <MaterialIcon
                    name={s.icon}
                    size={16}
                    className="text-slate-300"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-white font-semibold text-sm mb-4"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-6 mb-8">
          {contactInfo.map((item) => (
            <div
              key={item.icon}
              className="flex items-center gap-2 text-sm text-slate-400"
            >
              <MaterialIcon
                name={item.icon}
                size={16}
                className="text-teal-400"
              />
              {item.text}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2025 Skinfinity Academy of Cosmetology. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-teal-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
