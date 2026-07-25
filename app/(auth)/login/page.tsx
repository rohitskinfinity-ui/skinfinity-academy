"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-900 select-none">
      {/* Background Image */}
      <img
        src="/login.png"
        alt="Skinfinity Academy Spa Clinic Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/15" />

      {/* Main Centered Floating Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10 my-auto">
        <div className="relative bg-[#f0f9f8]/95 backdrop-blur-md rounded-3xl border border-teal-200/80 shadow-2xl p-8 sm:p-10 w-full max-w-md text-center pt-20 mt-12">
          {/* Top Centered Circular Badge Logo */}
          <div className="absolute -top-22 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-white border-4 border-teal-600/30 p-2 shadow-xl flex items-center justify-center">
            <img
              src="/logo.svg"
              alt="Skinfinity Academy Crest"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <h1
            className="text-xl sm:text-2xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Academy Login
          </h1>

          {/* Single Google Login Action Button */}
          <div className="space-y-5">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#0f766e] hover:bg-[#115e59] text-white text-base font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-75 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-white p-1 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24">
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
                </div>
              )}
              <span>{loading ? "Authenticating..." : "Login with Google"}</span>
            </button>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-900 transition-colors"
              >
                <MaterialIcon name="arrow_back" size={16} />
                Return to Home Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      
    </div>
  );
}
