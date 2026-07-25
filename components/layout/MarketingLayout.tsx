"use client";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F8FAFC]">
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
