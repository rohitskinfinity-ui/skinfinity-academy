"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";

const learnItems = [
  { id: "dashboard", href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "courses", href: "/dashboard/courses", label: "My Courses", icon: "book" },
  { id: "live", href: "/dashboard/live", label: "Live Classes", icon: "play_circle" },
  { id: "assignments", href: "/dashboard/assignments", label: "Assignments", icon: "description" },
  { id: "bookmarks", href: "/dashboard/bookmarks", label: "Bookmarks", icon: "bookmark" },
  { id: "certificates", href: "/dashboard/certificates", label: "Certificates", icon: "military_tech" },
];

const accountItems = [
  { id: "notifications", href: "/dashboard/notifications", label: "Notifications", icon: "notifications" },
  { id: "payments", href: "/dashboard/payments", label: "Payments", icon: "credit_card" },
  { id: "profile", href: "/dashboard/profile", label: "Profile", icon: "person" },
  { id: "refer", href: "/dashboard/refer", label: "Refer & Earn", icon: "redeem" },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: { id: string; href: string; label: string; icon: string };
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`mb-0.5 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
        active
          ? "bg-teal-600 text-white shadow-[0_6px_16px_rgba(13,148,136,0.28)]"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      }`}
    >
      <MaterialIcon name={item.icon} size={18} />
      <span className="flex-1">{item.label}</span>
      {item.id === "notifications" && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active ? "bg-white" : "bg-teal-500"
          }`}
        />
      )}
    </Link>
  );
}

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const isCoursePlayer = pathname.startsWith("/course");

  if (isCoursePlayer) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    router.push("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 lg:sticky ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={closeSidebar}>
            <Image
              src="/logo.svg"
              alt="Skinfinity Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">Skinfinity</p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-teal-600">
                LMS
              </p>
            </div>
          </Link>
          <button
            onClick={closeSidebar}
            className="rounded-lg p-1.5 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <MaterialIcon name="close" size={18} />
          </button>
        </div>

        <nav className="scrollbar-hide flex-1 overflow-y-auto px-2.5 pb-3">
          <p className="mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Learn
          </p>
          {learnItems.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              pathname={pathname}
              onNavigate={closeSidebar}
            />
          ))}

          <p className="mb-1.5 mt-5 px-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Account
          </p>
          {accountItems.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              pathname={pathname}
              onNavigate={closeSidebar}
            />
          ))}
        </nav>

        <div className="border-t border-slate-100 p-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-xs font-bold text-white">
              DA
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-900">
                Dr. Arjun
              </p>
              <p className="truncate text-[10px] text-slate-400">Fellowship</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Logout"
              title="Logout"
            >
              <MaterialIcon name="logout" size={16} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
                aria-label="Open sidebar"
              >
                <MaterialIcon name="menu" size={20} />
              </button>
              <div className="relative w-full max-w-md">
                <MaterialIcon
                  name="search"
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses, lessons..."
                  className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-2 pl-9 pr-3 text-sm transition-all placeholder:text-slate-400 focus:border-teal-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10"
                />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/dashboard/live"
                className="mr-1 hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 transition-colors hover:bg-emerald-100 md:flex"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[11px] font-semibold text-emerald-700">
                  Live at 3:00 PM
                </span>
              </Link>
              <Link
                href="/dashboard/notifications"
                className="relative rounded-xl p-2 transition-colors hover:bg-slate-100"
                aria-label="Notifications"
              >
                <MaterialIcon
                  name="notifications"
                  size={18}
                  className="text-slate-600"
                />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-teal-500 ring-2 ring-white" />
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white p-1 pr-2.5 transition-all hover:border-teal-200"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-800 text-[11px] font-bold text-white">
                  DA
                </div>
                <span className="hidden text-xs font-semibold text-slate-800 sm:block">
                  Dr. Arjun
                </span>
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
