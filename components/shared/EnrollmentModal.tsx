"use client";

import { useState } from "react";
import MaterialIcon from "@/components/shared/MaterialIcon";

export interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "course" | "workshop";
  itemTitle?: string;
  itemPrice?: string;
  itemDate?: string;
  itemCategory?: string;
}

export default function EnrollmentModal({
  isOpen,
  onClose,
  type = "course",
  itemTitle = "Certificate in Clinical Cosmetology & Aesthetic Medicine",
  itemPrice = "₹65,000",
  itemDate = "August 2025 Batch",
  itemCategory = "Hands-On Clinical Masterclass",
}: EnrollmentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "MBBS Doctor",
    regNumber: "",
    preferredCampus: "Bengaluru (MG Road Campus)",
    trainingMode: "Hands-On Practical",
    preferredBatch: itemDate,
    paymentOption: "deposit", // deposit vs full vs callback
  });

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      // Complete enrollment
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col select-none">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8 relative flex-shrink-0">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <MaterialIcon name="close" size={20} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
              {type === "workshop" ? "Workshop Seat Reservation" : "Course Admissions Application"}
            </span>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              Limited Seats
            </span>
          </div>

          <h2
            className="text-xl sm:text-2xl font-extrabold text-white leading-snug max-w-lg"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {itemTitle}
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <MaterialIcon name="sell" size={14} className="text-teal-400" />
              Fee: <strong className="text-white font-bold">{itemPrice}</strong>
            </span>
            <span className="flex items-center gap-1">
              <MaterialIcon name="event" size={14} className="text-teal-400" />
              {itemDate}
            </span>
          </div>

          {/* Form Step Progress Indicator Bar */}
          {step <= 3 && (
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800">
              {[
                { num: 1, label: "Applicant Information" },
                { num: 2, label: "Batch & Campus" },
                { num: 3, label: "Confirm & Pay" },
              ].map((s) => (
                <div key={s.num} className="flex flex-col gap-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s.num ? "bg-teal-400" : "bg-slate-800"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold truncate ${
                      step >= s.num ? "text-teal-300" : "text-slate-500"
                    }`}
                  >
                    Step {s.num}: {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body / Form Steps */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 1: Doctor / Applicant Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    FULL NAME (WITH PREFIX) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Ananya R. Sharma"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="doctor@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    MOBILE / WHATSAPP NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    QUALIFICATION / BACKGROUND *
                  </label>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  >
                    <option value="MBBS Doctor">MBBS Doctor</option>
                    <option value="MD Dermatology / DVD">MD Dermatology / DVD</option>
                    <option value="BDS / MDS Surgeon">BDS / MDS Dental Surgeon</option>
                    <option value="BAMS / BHMS Physician">BAMS / BHMS Physician</option>
                    <option value="Clinical Cosmetologist">Certified Cosmetologist</option>
                    <option value="Other Medical Specialist">Other Medical Specialist</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  MEDICAL COUNCIL REGISTRATION NO. (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={formData.regNumber}
                  onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                  placeholder="e.g. KMC/12345/2020"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-teal flex items-center gap-2"
                >
                  Proceed to Step 2
                  <MaterialIcon name="arrow_forward" size={16} />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 2: Campus Location & Training Schedule
              </h3>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  PREFERRED CAMPUS LOCATION *
                </label>
                <select
                  value={formData.preferredCampus}
                  onChange={(e) => setFormData({ ...formData, preferredCampus: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                >
                  <option value="Bengaluru (MG Road Campus)">Bengaluru Clinical Campus (MG Road)</option>
                  <option value="Mumbai (Bandra West Campus)">Mumbai Clinical Campus (Bandra West)</option>
                  <option value="Delhi NCR (Sarita Vihar Campus)">Delhi NCR Clinical Campus (Sarita Vihar)</option>
                  <option value="Hyderabad (Jubilee Hills Campus)">Hyderabad Campus (Jubilee Hills)</option>
                  <option value="Online Live Hybrid LMS">Online Live Interactive HD Zoom</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    TRAINING MODE *
                  </label>
                  <select
                    value={formData.trainingMode}
                    onChange={(e) => setFormData({ ...formData, trainingMode: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  >
                    <option value="Hands-On Practical">1:1 Doctor Hands-On Supervised</option>
                    <option value="Observer Only">Clinical Live Observer</option>
                    <option value="Online HD Hybrid">Online Interactive Webinar & Theory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    PREFERRED BATCH *
                  </label>
                  <select
                    value={formData.preferredBatch}
                    onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  >
                    <option value="August 2025 Batch">August 2025 Upcoming Batch</option>
                    <option value="September 2025 Batch">September 2025 Batch</option>
                    <option value="October 2025 Batch">October 2025 Batch</option>
                  </select>
                </div>
              </div>

              {/* Note Banner */}
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 text-xs text-teal-800 flex items-start gap-3">
                <MaterialIcon name="verified_user" size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Doctor Supervised Hands-On Training</p>
                  <p className="text-slate-600 mt-0.5">
                    All practical sessions feature live patient demonstrations and 1:1 mentorship by Senior MD Dermatologists.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1"
                >
                  <MaterialIcon name="arrow_back" size={16} />
                  Back to Step 1
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-teal flex items-center gap-2"
                >
                  Proceed to Payment
                  <MaterialIcon name="arrow_forward" size={16} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-5">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Step 3: Review Application & Payment Confirmation
              </h3>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Applicant Name:</span>
                  <span className="font-bold text-slate-900">{formData.fullName || "Dr. Applicant"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Program & Batch:</span>
                  <span className="font-bold text-teal-700">{itemTitle} ({formData.preferredBatch})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Campus & Mode:</span>
                  <span className="font-bold text-slate-900">{formData.preferredCampus}</span>
                </div>
              </div>

              {/* Select Payment Option */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  CHOOSE RESERVATION PAYMENT OPTION *
                </label>
                <div className="space-y-2">
                  <label
                    onClick={() => setFormData({ ...formData, paymentOption: "deposit" })}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      formData.paymentOption === "deposit"
                        ? "border-teal-500 bg-teal-50/60 ring-1 ring-teal-500"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.paymentOption === "deposit" ? "border-teal-600 bg-teal-600" : "border-slate-300"}`}>
                        {formData.paymentOption === "deposit" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Pay Seat Reservation Deposit (₹5,000)</p>
                        <p className="text-[11px] text-slate-500">Lock your clinical seat today; balance payable on day 1 of training.</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-full">₹5,000</span>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, paymentOption: "full" })}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      formData.paymentOption === "full"
                        ? "border-teal-500 bg-teal-50/60 ring-1 ring-teal-500"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.paymentOption === "full" ? "border-teal-600 bg-teal-600" : "border-slate-300"}`}>
                        {formData.paymentOption === "full" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Pay Full Course Fee ({itemPrice})</p>
                        <p className="text-[11px] text-slate-500">Get immediate access to online LMS modules & prep materials.</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full">{itemPrice}</span>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, paymentOption: "callback" })}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      formData.paymentOption === "callback"
                        ? "border-teal-500 bg-teal-50/60 ring-1 ring-teal-500"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.paymentOption === "callback" ? "border-teal-600 bg-teal-600" : "border-slate-300"}`}>
                        {formData.paymentOption === "callback" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Request 1:1 Doctor Admissions Callback</p>
                        <p className="text-[11px] text-slate-500">Our faculty counselor will call you within 2 hours to address syllabus queries.</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">FREE</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1"
                >
                  <MaterialIcon name="arrow_back" size={16} />
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-teal flex items-center gap-2"
                >
                  Confirm Registration &gt;
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto shadow-lg">
                <MaterialIcon name="check_circle" size={48} />
              </div>

              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100 inline-block">
                Seat Reserved Successfully!
              </span>

              <h3
                className="text-2xl font-extrabold text-slate-900"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Welcome to Skinfinity Academy
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName || "Doctor"}</strong>! Your registration ID is <span className="font-mono font-bold text-teal-700">#SA-2025-8942</span> for the <strong className="text-slate-900">{itemTitle}</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left max-w-md mx-auto space-y-1.5">
                <p className="flex justify-between">
                  <span className="text-slate-500">Confirmation Sent To:</span>
                  <span className="font-bold text-slate-800">{formData.email || "doctor@example.com"}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-500">Campus Selected:</span>
                  <span className="font-bold text-slate-800">{formData.preferredCampus}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-500">Admissions Advisor:</span>
                  <span className="font-bold text-teal-700">Dr. Rajesh Kumar (Academic Lead)</span>
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  Done &amp; Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
