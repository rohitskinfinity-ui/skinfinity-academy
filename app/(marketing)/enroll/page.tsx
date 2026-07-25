"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

function EnrollFormContent() {
  const searchParams = useSearchParams();
  const initialProgram = searchParams.get("program") || searchParams.get("title") || "Certificate in Clinical Cosmetology";

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "MBBS Doctor",
    regNumber: "",
    program: initialProgram,
    campus: "Bengaluru Clinical Campus (MG Road)",
    trainingMode: "Hands-On Practical",
    batch: "August 2025 Upcoming Batch",
    paymentOption: "deposit",
  });

  useEffect(() => {
    if (initialProgram) {
      setFormData((prev) => ({ ...prev, program: initialProgram }));
    }
  }, [initialProgram]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card className="rounded-3xl border-slate-200/80 shadow-soft overflow-hidden bg-white">
      <CardHeader className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 uppercase text-[10px] tracking-widest">
            Admissions Application Form
          </Badge>
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 uppercase text-[10px] tracking-widest">
            Batch 2025-2026
          </Badge>
        </div>

        <CardTitle className="text-2xl sm:text-3xl font-extrabold text-white">
          Skinfinity Academy Enrollment Form
        </CardTitle>
        <CardDescription className="text-slate-300 text-sm">
          Complete your application directly below to reserve your 1:1 doctor-supervised clinical seat.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 sm:p-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Doctor / Applicant Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900">Doctor &amp; Applicant Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">FULL NAME (WITH PREFIX) *</label>
                  <Input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Priya Sharma"
                    className="rounded-xl bg-slate-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">EMAIL ADDRESS *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="doctor@example.com"
                    className="rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">PHONE / WHATSAPP NUMBER *</label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="rounded-xl bg-slate-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">QUALIFICATION / SPECIALIZATION *</label>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500"
                  >
                    <option value="MBBS Doctor">MBBS Doctor</option>
                    <option value="MD Dermatology / DVD">MD Dermatology / DVD</option>
                    <option value="BDS / MDS Dental Surgeon">BDS / MDS Dental Surgeon</option>
                    <option value="BAMS / BHMS Physician">BAMS / BHMS Physician</option>
                    <option value="Certified Cosmetologist">Certified Cosmetologist</option>
                    <option value="Other Medical Specialist">Other Medical Specialist</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">MEDICAL COUNCIL REGISTRATION NO. (OPTIONAL)</label>
                <Input
                  type="text"
                  value={formData.regNumber}
                  onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                  placeholder="e.g. KMC/12345/2020"
                  className="rounded-xl bg-slate-50"
                />
              </div>
            </div>

            {/* Section 2: Program & Campus Preferences */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900">Program &amp; Campus Preferences</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">SELECTED PROGRAM / COURSE *</label>
                <Input
                  type="text"
                  required
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  placeholder="e.g. Certificate in Clinical Cosmetology"
                  className="rounded-xl bg-slate-50 font-bold text-teal-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">PREFERRED CAMPUS LOCATION *</label>
                  <select
                    value={formData.campus}
                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500"
                  >
                    <option value="Bengaluru Clinical Campus (MG Road)">Bengaluru Clinical Campus (MG Road)</option>
                    <option value="Mumbai Clinical Campus (Bandra West)">Mumbai Campus (Bandra West)</option>
                    <option value="Delhi NCR Campus (Sarita Vihar)">Delhi NCR Campus (Sarita Vihar)</option>
                    <option value="Hyderabad Campus (Jubilee Hills)">Hyderabad Campus (Jubilee Hills)</option>
                    <option value="Online Live Hybrid HD Zoom">Online HD Zoom Stream</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">UPCOMING BATCH *</label>
                  <select
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500"
                  >
                    <option value="August 2025 Upcoming Batch">August 2025 Upcoming Batch</option>
                    <option value="September 2025 Batch">September 2025 Batch</option>
                    <option value="October 2025 Batch">October 2025 Batch</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Reservation Payment Options */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900">Seat Reservation Choice</h3>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setFormData({ ...formData, paymentOption: "deposit" })}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentOption === "deposit"
                      ? "border-teal-500 bg-teal-50/50 ring-1 ring-teal-500"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900">Pay Seat Reservation Deposit (₹5,000)</p>
                    <p className="text-xs text-slate-500">Lock your seat today; balance payable at campus onset.</p>
                  </div>
                  <Badge className="bg-teal-600 text-white font-bold text-xs">₹5,000</Badge>
                </label>

                <label
                  onClick={() => setFormData({ ...formData, paymentOption: "full" })}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentOption === "full"
                      ? "border-teal-500 bg-teal-50/50 ring-1 ring-teal-500"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900">Pay Full Program Fee</p>
                    <p className="text-xs text-slate-500">Includes instant online LMS portal &amp; video vault access.</p>
                  </div>
                  <Badge variant="outline" className="font-bold text-xs">Full Fee</Badge>
                </label>

                <label
                  onClick={() => setFormData({ ...formData, paymentOption: "callback" })}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentOption === "callback"
                      ? "border-teal-500 bg-teal-50/50 ring-1 ring-teal-500"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900">Request 1:1 Doctor Admissions Counseling Call</p>
                    <p className="text-xs text-slate-500">Free call with an academic advisor to discuss curriculum &amp; dates.</p>
                  </div>
                  <Badge variant="outline" className="font-bold text-xs">FREE</Badge>
                </label>
              </div>
            </div>

            {/* Submit CTA Button */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 italic">
                * All doctor applications are reviewed by our academic board within 24 hours.
              </p>
              <Button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-teal flex items-center justify-center gap-2 cursor-pointer"
              >
                SUBMIT ENROLLMENT APPLICATION &gt;
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto shadow-md">
              <MaterialIcon name="check_circle" size={48} />
            </div>

            <Badge className="bg-teal-600 text-white font-extrabold px-4 py-1 rounded-full text-xs">
              Application Submitted Successfully!
            </Badge>

            <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
              Welcome to Skinfinity Academy
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{formData.fullName || "Doctor"}</strong>! Your reference code is <span className="font-mono font-bold text-teal-700">#SA-ENROLL-9041</span> for the <strong>{formData.program}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left max-w-md mx-auto space-y-1.5">
              <p className="flex justify-between">
                <span className="text-slate-500">Applicant Email:</span>
                <span className="font-bold text-slate-800">{formData.email || "doctor@example.com"}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Selected Campus:</span>
                <span className="font-bold text-slate-800">{formData.campus}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Academic Advisor Lead:</span>
                <span className="font-bold text-teal-700">Dr. Rajesh Kumar (MD)</span>
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <Link href="/courses">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl px-8 py-3">
                  Back to All Courses
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function EnrollPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen">
      <PageHeader
        title="Student Admissions &"
        highlight="Enrollment Form"
        subtitle="Complete your doctor registration application directly on this page for hands-on clinical courses and workshops."
        breadcrumb="Enrollment"
      />

      <section className="py-10">
        <div className="container-max px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold">Loading enrollment form...</div>}>
            <EnrollFormContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
