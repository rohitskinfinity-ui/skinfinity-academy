"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";

const navItems = [
  { id: "dashboard", href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "courses", href: "/dashboard/courses", label: "My Courses", icon: "book" },
  { id: "live", href: "/dashboard/live", label: "Live Classes", icon: "play_circle" },
  { id: "assignments", href: "/dashboard/assignments", label: "Assignments", icon: "description" },
  { id: "downloads", href: "/dashboard/downloads", label: "Downloads", icon: "download" },
  { id: "notes", href: "/dashboard/notes", label: "Notes", icon: "note" },
  { id: "bookmarks", href: "/dashboard/bookmarks", label: "Bookmarks", icon: "bookmark" },
  { id: "certificates", href: "/dashboard/certificates", label: "Certificates", icon: "military_tech" },
  { id: "leaderboard", href: "/dashboard/leaderboard", label: "Leaderboard", icon: "emoji_events" },
  { id: "calendar", href: "/dashboard/calendar", label: "Calendar", icon: "calendar_month" },
  { id: "messages", href: "/dashboard/messages", label: "Messages", icon: "forum" },
  { id: "notifications", href: "/dashboard/notifications", label: "Notifications", icon: "notifications" },
  { id: "payments", href: "/dashboard/payments", label: "Payments", icon: "credit_card" },
  { id: "settings", href: "/dashboard/settings", label: "Settings", icon: "settings" },
  { id: "profile", href: "/dashboard/profile", label: "Profile", icon: "person" },
  { id: "refer", href: "/dashboard/refer", label: "Refer & Earn", icon: "redeem" },
];

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-100 z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center p-1.5">
              <img src="/logo.svg" alt="Skinfinity Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p
                className="font-bold text-slate-900 text-sm"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Skinfinity
              </p>
              <p className="text-[9px] text-teal-600 font-semibold tracking-widest uppercase">
                LMS Portal
              </p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100"
          >
            <MaterialIcon name="close" size={18} />
          </button>
        </div>

        <nav className="p-3 overflow-y-auto h-[calc(100vh-140px)] scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <MaterialIcon name={item.icon} size={18} />
                {item.label}
                {item.id === "notifications" && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-teal-500" />
                )}
                {item.id === "messages" && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-teal-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-100 bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <MaterialIcon name="logout" size={18} />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100">
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100"
              >
                <MaterialIcon name="menu" size={20} />
              </button>
              <div className="relative hidden sm:block">
                <MaterialIcon
                  name="search"
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search courses, lessons..."
                  className="w-64 pl-9 pr-4 py-2 text-sm bg-slate-50 rounded-xl border border-transparent focus:border-teal-300 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <MaterialIcon name="notifications" size={18} className="text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500" />
              </button>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 rounded-xl p-1 pr-3 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-xs">
                  DA
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-slate-900">Dr. Arjun</p>
                  <p className="text-[10px] text-slate-400">Fellowship Program</p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-6 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
