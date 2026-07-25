import Link from "next/link";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  breadcrumb?: string;
  children?: ReactNode;
}

export default function PageHeader({
  title = "",
  highlight = "",
  subtitle = "",
  breadcrumb = "",
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-10 pb-8 sm:pt-12 sm:pb-8 bg-white border-b border-slate-200/80 text-slate-900 select-none">
      {/* Ambient gradient blobs for depth */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-500/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-0 h-64 w-64 rounded-full bg-amber-400/[0.08] blur-3xl" />

      {/* Luxury Clinical Academy Crest & Refined Brand Watermark */}
      <div
        className="absolute right-4 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 select-none pointer-events-none flex items-center gap-6 z-0 opacity-90"
        aria-hidden="true"
      >
        {/* Medical Academy Circular Crest Seal */}
        <div className="hidden md:block w-36 h-36 lg:w-44 lg:h-44 text-teal-800/[0.07] flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M50 38 L54 46 L62 50 L54 54 L50 62 L46 54 L38 50 L46 46 Z" />
          </svg>
        </div>

        {/* Executive Branding Text with Refined ACADEMY Proportions */}
        <div className="text-right flex flex-col items-end">
          <div
            className="text-[34px] sm:text-[54px] md:text-[70px] lg:text-[84px] font-extrabold uppercase tracking-[0.16em] leading-none text-transparent bg-clip-text bg-gradient-to-r from-teal-800/[0.09] via-slate-900/[0.07] to-amber-700/[0.09]"
            style={{ WebkitTextStroke: "1px rgba(13, 148, 136, 0.12)" }}
          >
            SKINFINITY
          </div>
          
          {/* Subtle Accent Line */}
          <div className="w-full h-px bg-gradient-to-l from-teal-600/20 via-teal-600/10 to-transparent my-1 sm:my-1.5" />

          <div
            className="text-[18px] sm:text-[28px] md:text-[36px] lg:text-[44px] font-extrabold uppercase tracking-[0.34em] text-teal-700/[0.1] leading-none"
            style={{ WebkitTextStroke: "0.5px rgba(13, 148, 136, 0.15)" }}
          >
            ACADEMY
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow Navigation Tag */}
        <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest mb-3 animate-in fade-in slide-in-from-bottom-1 duration-500">
          <span className="w-8 h-0.5 rounded-full bg-gradient-to-r from-teal-600 to-teal-400" />
          <Link
            href="/"
            className="hover:text-teal-600 transition-colors underline-offset-4 decoration-teal-500/40 hover:underline"
          >
            HOME
          </Link>
          {breadcrumb && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-teal-600">{breadcrumb.toUpperCase()}</span>
            </>
          )}
        </div>

        {/* Large Editorial Headline */}
        {(title || highlight) && (
          <h1
            className="relative text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-3 max-w-4xl animate-in fade-in slide-in-from-bottom-2 duration-700"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {title}{" "}
            {highlight && (
              <span className="relative inline-block italic font-serif font-normal bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                {highlight}
                <svg
                  className="absolute left-0 -bottom-1.5 w-full h-2.5 text-amber-400/70"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 8 C 40 2, 60 2, 100 6 C 140 10, 160 10, 200 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            )}
          </h1>
        )}

        {/* Subtitle Paragraph with Left Vertical Accent Line */}
        {subtitle && (
          <div className="relative max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-700">
            <div className="border-l-2 border-teal-500/70 pl-5 py-0.5">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>
        )}

        {children}
      </div>
    </section>
  );
}