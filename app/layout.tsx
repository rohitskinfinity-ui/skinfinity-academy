import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skinfinity Academy of Cosmetology | Premium Dermatology Education",
  description:
    "International-quality dermatology and cosmetology education designed for doctors, dermatologists, aesthetic physicians, and healthcare professionals.",
  openGraph: {
    title: "Skinfinity Academy of Cosmetology",
    description:
      "Advance your career with professional dermatology education.",
    type: "website",
    siteName: "Skinfinity Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skinfinity Academy of Cosmetology",
    description:
      "Advance your career with professional dermatology education.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Skinfinity Academy of Cosmetology",
              description:
                "Premium dermatology and aesthetic medicine education for medical professionals.",
              url: "https://skinfinityacademy.com",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
