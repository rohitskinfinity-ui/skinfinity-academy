"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import MaterialIcon from "@/components/shared/MaterialIcon";

const highlights = [
  { icon: "verified", label: "Accredited certificates" },
  { icon: "videocam", label: "Live clinical workshops" },
  { icon: "devices", label: "Learn on any device" },
];

const stats = [
  { value: "12k+", label: "Doctors trained" },
  { value: "45+", label: "Programs" },
  { value: "4.9", label: "Avg. rating" },
];

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 lg:grid lg:grid-cols-2">
      {/* ── Brand panel ── */}
      <aside className="relative hidden min-h-screen flex-col overflow-hidden lg:flex">
        <Image
          src="/login.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="50vw"
        />
        {/* Softer overlay — image stays visible, text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-900/55 to-teal-900/30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.55),transparent_45%)]" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-12">
          {/* Logo */}
          <Link href="/" className="inline-flex w-fit items-center gap-3 rounded-2xl bg-white/10 px-4 py-2.5 ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/15">
            <Image
              src="/logo.svg"
              alt="Skinfinity Academy"
              width={40}
              height={40}
              className="size-10 object-contain"
            />
            <div>
              <p
                className="text-base font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Skinfinity Academy
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-200">
                Student Portal
              </p>
            </div>
          </Link>

          {/* Main content card */}
          <div className="my-8 w-full max-w-md">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[28px] bg-white/10 p-7 ring-1 ring-white/15 backdrop-blur-md xl:p-8"
            >
              <p className="mb-2 inline-flex rounded-full bg-teal-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-100">
                Welcome back
              </p>
              <h1
                className="text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Continue your{" "}
                <span className="text-teal-300">clinical journey</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Access your courses, workshops, certificates, and personalized
                dashboard — all in one place.
              </p>

              <ul className="mt-6 space-y-2.5">
                {highlights.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.12 + i * 0.07,
                      duration: 0.35,
                    }}
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-sm text-white/90 ring-1 ring-white/10"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
                      <MaterialIcon name={item.icon} size={16} />
                    </span>
                    {item.label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Stats + footer */}
          <div className="space-y-5">
            <div className="flex max-w-md divide-x divide-white/15 rounded-2xl bg-white/10 ring-1 ring-white/10 backdrop-blur-md">
              {stats.map((stat) => (
                <div key={stat.label} className="flex-1 px-4 py-3.5 text-center">
                  <p
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium text-teal-100/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/45">
              © {new Date().getFullYear()} Skinfinity Academy. All rights reserved.
            </p>
          </div>
        </div>
      </aside>

      {/* ── Auth panel ── */}
      <main className="relative flex min-h-screen flex-col bg-[#f8fafc]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />
        </div>

        <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
          <Link href="/" className="inline-flex items-center gap-2.5 lg:hidden">
            <Image
              src="/logo.svg"
              alt="Skinfinity Academy"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span
              className="text-sm font-bold text-slate-900"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Skinfinity Academy
            </span>
          </Link>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-teal-700"
          >
            <MaterialIcon name="arrow_back" size={16} />
            Back to home
          </Link>
        </header>

        <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px]"
          >
            <div className="mb-8">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-[0_12px_28px_rgba(15,118,110,0.28)]">
                <MaterialIcon name="lock" size={22} />
              </div>
              <h2
                className="text-3xl font-bold tracking-tight text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Sign in
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Use the Google account linked to your enrollment email to access
                your student dashboard.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                aria-busy={loading}
                aria-label="Sign in with Google"
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(15,118,110,0.28)] transition-all duration-300 hover:from-teal-700 hover:to-teal-800 hover:shadow-[0_16px_36px_rgba(15,118,110,0.35)] disabled:cursor-wait disabled:opacity-80"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {loading ? (
                  <span
                    className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                    <GoogleIcon />
                  </span>
                )}
                <span>{loading ? "Signing you in…" : "Continue with Google"}</span>
              </button>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Secure access
                </span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <ul className="space-y-3">
                {[
                  {
                    icon: "mail",
                    text: "Use the same email you registered with during enrollment",
                  },
                  {
                    icon: "shield",
                    text: "Encrypted Google OAuth — we never see your password",
                  },
                ].map((tip) => (
                  <li
                    key={tip.icon}
                    className="flex items-start gap-3 text-xs leading-relaxed text-slate-500"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <MaterialIcon name={tip.icon} size={14} />
                    </span>
                    {tip.text}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              New to Skinfinity?{" "}
              <Link
                href="/enroll"
                className="font-bold text-teal-700 transition-colors hover:text-teal-800"
              >
                Enroll in a program
              </Link>
            </p>

            {/* Mobile trust strip */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6 lg:hidden">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-lg font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
