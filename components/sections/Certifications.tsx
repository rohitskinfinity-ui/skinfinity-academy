"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, Expand, FileText, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHeader from "@/components/shared/SectionHeader";
import CertificateViewer from "@/components/shared/CertificateViewer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const officialCertificates = [
  {
    badge: "ISO 9001",
    title: "ISO 9001 Certified",
    subtitle: "Quality Management System",
    desc: "Skinfinity Academy is ISO 9001 certified — meeting international standards for quality management in education and clinical training.",
    viewUrl: "/api/certificates/iso-9001",
    color: "from-teal-600 to-teal-800",
  },
  {
    badge: "IEB",
    title: "International Education Board",
    subtitle: "Department of Aesthetic Medicine and Surgery",
    desc: "Accredited by the International Education Board (IEB) for clinical cosmetology and aesthetic medicine programs.",
    viewUrl: "/api/certificates/ieb",
    color: "from-cyan-600 to-teal-700",
    logo: "/ieb-logo.avif",
  },
];

const affiliations = [
  {
    name: "IEB",
    desc: "International Education Board — Affiliated certification authority",
    color: "from-teal-500 to-teal-700",
  },
  {
    name: "DMHCA",
    desc: "Unit of New Delhi Medical Healthcare Pvt. Ltd. — Clinical education partner",
    color: "from-cyan-500 to-teal-700",
  },
];

type Certificate = (typeof officialCertificates)[number];

export default function Certifications() {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section className="section-padding relative overflow-hidden bg-[#F8FAFC]">
      <div className="absolute inset-0 pattern-dots opacity-30" aria-hidden />

      <div className="container-max relative">
        <SectionHeader
          tag="Accreditation & Quality"
          title={
            <>
              ISO certified &{" "}
              <span className="text-teal-700">internationally accredited</span>
            </>
          }
          subtitle="Skinfinity Academy is ISO 9001 certified and accredited by the International Education Board (IEB). View our official certificates below."
        />

        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          {officialCertificates.map((cert, i) => (
            <FadeIn key={cert.badge} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
                <button
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  className="relative min-h-[420px] overflow-hidden border-b border-slate-100 bg-slate-100 text-left sm:min-h-[480px]"
                  aria-label={`View full ${cert.title} certificate`}
                >
                  <CertificateViewer
                    src={cert.viewUrl}
                    title={`${cert.title} certificate preview`}
                    className="pointer-events-none absolute inset-0 h-full w-full border-0"
                    interactive={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-colors group-hover:bg-slate-900/10">
                    <span className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-teal-800 opacity-0 shadow-lg ring-1 ring-slate-200 transition-opacity group-hover:opacity-100">
                      <Expand className="size-4" aria-hidden />
                      View full certificate
                    </span>
                  </div>
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start gap-3">
                    {cert.logo ? (
                      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-slate-200">
                        <Image
                          src={cert.logo}
                          alt=""
                          width={48}
                          height={48}
                          className="size-full object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cert.color} text-white`}
                      >
                        <ShieldCheck className="size-6" aria-hidden />
                      </div>
                    )}
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700">
                          {cert.badge}
                        </span>
                        <BadgeCheck className="size-4 text-teal-500" aria-hidden />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-medium text-teal-700">
                        {cert.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-500">
                    {cert.desc}
                  </p>

                  <Button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className="w-fit rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
                  >
                    <FileText className="size-4" aria-hidden />
                    View Full Certificate
                  </Button>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* <Stagger className="grid gap-4 sm:grid-cols-2">
          {affiliations.map((a) => (
            <StaggerItem key={a.name}>
              <div className="flex items-center gap-4 rounded-[24px] border border-slate-100 bg-white p-5">
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${a.color} text-white`}
                >
                  <ShieldCheck className="size-5" aria-hidden />
                </div>
                <div>
                  <div className="mb-0.5 flex items-center gap-2">
                    <h4 className="font-bold text-slate-900">{a.name}</h4>
                    <BadgeCheck className="size-4 text-teal-500" aria-hidden />
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {a.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger> */}
      </div>

      <Dialog
        open={activeCert !== null}
        onOpenChange={(open) => {
          if (!open) setActiveCert(null);
        }}
      >
        <DialogContent
          className="flex h-[88vh] max-h-[88vh] w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl lg:max-w-4xl"
          showCloseButton
        >
          {activeCert && (
            <>
              <DialogHeader className="shrink-0 border-b border-slate-200 px-5 py-4">
                <DialogTitle className="text-lg font-bold text-slate-900">
                  {activeCert.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-teal-700">
                  {activeCert.subtitle}
                </DialogDescription>
              </DialogHeader>

              <div className="min-h-0 flex-1 bg-slate-100">
                <CertificateViewer
                  src={activeCert.viewUrl}
                  title={`${activeCert.title} full certificate`}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
