import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import MaterialIcon from "@/components/shared/MaterialIcon";

export default function CourseDetailPage() {
  return (
    <div>
      <PageHeader
        title="Fellowship in Aesthetic"
        highlight="Dermatology"
        subtitle="Comprehensive 6-month fellowship covering advanced aesthetic procedures, injectables, lasers, and clinical practice."
        breadcrumb="Course Details"
      />

      <section className="py-12 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div>
                <h2
                  className="text-2xl font-bold text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Program Overview
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Our flagship Fellowship in Aesthetic Dermatology is designed for qualified medical practitioners seeking to master advanced non-surgical aesthetic procedures. Through intensive hands-on clinical training, live patient demonstrations, and 1:1 doctor mentorship, you will gain the expertise and confidence needed to build a successful aesthetic practice.
                </p>
              </div>

              {/* Curriculum */}
              <div>
                <h3
                  className="text-xl font-bold text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  Curriculum Modules
                </h3>
                <div className="space-y-3">
                  {[
                    "Module 1: Facial Anatomy & Injectables (Botox & Fillers)",
                    "Module 2: Laser Physics, EBDs & Energy Devices",
                    "Module 3: Chemical Peels & Medical Microneedling",
                    "Module 4: Trichology, Scalp PRP & Hair Restoration",
                    "Module 5: Complication Management & Vascular Safety",
                    "Module 6: Clinical Practice Setup & Medico-Legal Protocols",
                  ].map((m, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                    >
                      <span className="text-sm font-semibold text-slate-800">{m}</span>
                      <span className="text-xs text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                        Module {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-3xl border-2 border-teal-100 p-6 shadow-card sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-xs text-slate-400 mb-1">Course Fee</p>
                  <p
                    className="text-4xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    ₹1,20,000
                  </p>
                  <p className="text-xs text-teal-600 font-bold mt-1">EMI options from ₹10,000/month</p>
                </div>

                <Link
                  href="/enroll?program=Fellowship%20in%20Aesthetic%20Dermatology"
                  className="btn-primary w-full justify-center mb-3 cursor-pointer"
                >
                  Enroll Now
                </Link>
                <Link
                  href="/enroll?program=Fellowship%20in%20Aesthetic%20Dermatology"
                  className="btn-secondary w-full justify-center cursor-pointer"
                >
                  Download Brochure &amp; Syllabus
                </Link>

                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                  {[
                    { icon: "schedule", label: "Duration", value: "6 Months" },
                    { icon: "desktop_windows", label: "Mode", value: "Hands-On Hybrid" },
                    { icon: "workspace_premium", label: "Certificate", value: "Skinfinity Board Certified" },
                    { icon: "person", label: "Faculty Lead", value: "Dr. Aisha Sharma (MD)" },
                    { icon: "star", label: "Rating", value: "4.9 / 5.0" },
                    { icon: "group", label: "Alumni Doctors", value: "3,200+" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-500">
                        <MaterialIcon name={item.icon} size={16} className="text-teal-500" />
                        {item.label}
                      </span>
                      <span className="font-semibold text-slate-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
