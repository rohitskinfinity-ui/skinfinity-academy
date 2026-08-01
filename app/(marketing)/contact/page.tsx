"use client";

import { useState, type FormEvent } from "react";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";
import Link from "next/link";
import { submitContact } from "@/lib/api/public";

const inputClass =
  "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      await submitContact({
        first_name: form.first_name,
        last_name: form.last_name || null,
        email: form.email,
        phone: form.phone || null,
        topic: form.topic || null,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white select-none">
      <PageHeader
        title="Get in"
        highlight="Touch"
        subtitle="Whether it's a course inquiry, campus visit booking, or admissions question — our team is ready to help."
        breadcrumb="Contact Us"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
              <MaterialIcon name="call" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                CALL US
              </p>
              <p className="text-sm font-bold text-slate-900">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
              <MaterialIcon name="mail" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                EMAIL US
              </p>
              <p className="text-sm font-bold text-slate-900">
                support@skinfinity.edu
              </p>
            </div>
          </div>
        </div>
      </PageHeader>

      <section className="py-10 bg-white border-b border-slate-200">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">
                  SEND US A MESSAGE
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  We&apos;d love to{" "}
                  <span className="italic font-serif text-teal-600 font-normal">
                    hear
                  </span>{" "}
                  from you
                </h2>
              </div>

              {submitted ? (
                <div className="p-8 rounded-3xl bg-teal-50 border border-teal-200 text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MaterialIcon name="check" size={32} />
                  </div>
                  <h3
                    className="text-2xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    Thank You! Message Sent
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Our admissions advisory team will contact you within 24 hours
                    with course information.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        FIRST NAME *
                      </label>
                      <input
                        type="text"
                        placeholder="Priya"
                        required
                        value={form.first_name}
                        onChange={(e) => update("first_name", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        LAST NAME *
                      </label>
                      <input
                        type="text"
                        placeholder="Sharma"
                        required
                        value={form.last_name}
                        onChange={(e) => update("last_name", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      placeholder="priya@example.com"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      INQUIRY TOPIC *
                    </label>
                    <select
                      required
                      value={form.topic}
                      onChange={(e) => update("topic", e.target.value)}
                      className={`${inputClass} text-slate-700`}
                    >
                      <option value="">Select a topic</option>
                      <option value="cosmetology">
                        Clinical Cosmetology Courses
                      </option>
                      <option value="injectables">
                        Aesthetic Injectables & Fillers
                      </option>
                      <option value="lasers">Laser & Energy Devices</option>
                      <option value="trichology">Trichology & PRP Courses</option>
                      <option value="custom">Custom 1:1 Doctor Mentorship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your medical background or course inquiry..."
                      required
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {error ? (
                    <p className="text-sm text-red-600">{error}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? "SENDING…" : "SEND MESSAGE >"}
                  </button>

                  <p className="text-[11px] text-slate-500 italic mt-2">
                    We typically respond within 24 hours. For urgent inquiries,
                    please call us directly.
                  </p>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 bg-[#fcfaf7] border border-amber-900/10 rounded-3xl p-8 space-y-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700">
                  HOURS
                </span>
                <h3
                  className="text-2xl font-bold text-slate-900 mt-1 mb-4"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  When We&apos;re{" "}
                  <span className="italic font-serif text-teal-600 font-normal">
                    Open
                  </span>
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      MON - FRI
                    </p>
                    <p className="font-bold text-slate-800 mt-0.5">
                      10:00 AM - 6:00 PM
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      SATURDAY
                    </p>
                    <p className="font-bold text-slate-800 mt-0.5">
                      10:00 AM - 4:00 PM
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      SUNDAY
                    </p>
                    <p className="font-bold text-slate-800 mt-0.5">
                      By Appointment
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      ONLINE LMS
                    </p>
                    <p className="font-bold text-teal-700 mt-0.5">24 / 7 Access</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-amber-900/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700">
                  COMMUNITY
                </span>
                <h3
                  className="text-2xl font-bold text-slate-900 mt-1 mb-2"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Follow Our{" "}
                  <span className="italic font-serif text-teal-600 font-normal">
                    Journey
                  </span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Stay updated with expert clinical tips, new course
                  announcements, and behind-the-scenes from our dermatology
                  faculty team.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800"
                >
                  Browse courses <MaterialIcon name="arrow_forward" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
