"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  { id: "notifications", href: "/dashboard/notifications", label: "Notifications", icon: "notifications" },
  { id: "payments", href: "/dashboard/payments", label: "Payments", icon: "credit_card" },
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
    <div className="flex min-h-screen bg-[#F4F7F9]">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-slate-200/80 bg-white/90 shadow-[4px_0_24px_rgba(15,23,42,0.03)] backdrop-blur-xl transition-transform duration-300 lg:sticky ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="Skinfinity Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">Skinfinity</p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-teal-600">
                LMS Portal
              </p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-1.5 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <MaterialIcon name="close" size={18} />
          </button>
        </div>

        <nav className="scrollbar-hide flex-1 overflow-y-auto p-3 pb-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Learn
          </p>
          {navItems.slice(0, 8).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`mb-0.5 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-[0_8px_20px_rgba(15,118,110,0.25)]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <MaterialIcon name={item.icon} size={18} />
                {item.label}
              </Link>
            );
          })}

          <p className="mb-2 mt-4 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Account
          </p>
          {navItems.slice(8).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`mb-0.5 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-[0_8px_20px_rgba(15,118,110,0.25)]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <MaterialIcon name={item.icon} size={18} />
                {item.label}
                {item.id === "notifications" && (
                  <span
                    className={`ml-auto h-2 w-2 rounded-full ${
                      isActive ? "bg-white" : "bg-teal-500"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-red-50 hover:text-red-600"
          >
            <MaterialIcon name="logout" size={18} />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
                aria-label="Open sidebar"
              >
                <MaterialIcon name="menu" size={20} />
              </button>
              <div className="relative hidden sm:block">
                <MaterialIcon
                  name="search"
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search courses, lessons..."
                  className="w-72 rounded-2xl border border-slate-200/80 bg-slate-50 py-2.5 pl-10 pr-4 text-sm transition-all focus:border-teal-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="mr-1 hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 md:flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[11px] font-semibold text-emerald-700">
                  Live at 3:00 PM
                </span>
              </div>
              <Link
                href="/dashboard/notifications"
                className="relative rounded-xl p-2.5 transition-colors hover:bg-slate-100"
                aria-label="Notifications"
              >
                <MaterialIcon
                  name="notifications"
                  size={18}
                  className="text-slate-600"
                />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white" />
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-1 pr-3 shadow-soft transition-all hover:border-teal-200 hover:shadow-card"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-xs font-bold text-white">
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

        <main className="mx-auto w-full max-w-6xl flex-1 p-5 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
