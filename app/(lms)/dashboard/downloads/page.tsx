"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";

export default function DownloadsPage() {
  const downloads = [
    { name: 'Complication Management Protocol.pdf', course: 'Advanced Injectables', size: '2.4 MB', type: 'PDF' },
    { name: 'Injection Landmarks Chart.pdf', course: 'Advanced Injectables', size: '1.8 MB', type: 'PDF' },
    { name: 'Laser Safety Guidelines.pdf', course: 'Laser & Energy Devices', size: '3.1 MB', type: 'PDF' },
    { name: 'Chemical Peel Formulations.xlsx', course: 'Chemical Peels', size: '0.8 MB', type: 'XLSX' },
    { name: 'Trichology Reference Guide.pdf', course: 'Trichology', size: '4.2 MB', type: 'PDF' },
    { name: 'Facial Anatomy Atlas.pdf', course: 'Facial Anatomy', size: '6.5 MB', type: 'PDF' },
    { name: 'Patient Consent Templates.docx', course: 'Clinical Cosmetology', size: '0.3 MB', type: 'DOCX' },
    { name: 'Emergency Kit Checklist.pdf', course: 'Advanced Injectables', size: '0.5 MB', type: 'PDF' },
  ];

  return (
    <>
      <SectionHeader title="Downloads" subtitle="Access all your course materials and resources in one place." />
      <div className="grid sm:grid-cols-2 gap-4">
        {downloads.map((d) => (
          <div key={d.name} className="bg-white rounded-2xl p-4 shadow-soft border border-slate-50 hover:shadow-card-hover transition-all flex items-center gap-4 group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${d.type === 'PDF' ? 'bg-red-50 text-red-500' : d.type === 'XLSX' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}`}>
              <MaterialIcon name="description" size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{d.name}</p>
              <p className="text-xs text-slate-400">{d.course} • {d.size}</p>
            </div>
            <button className="p-2.5 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition-all">
              <MaterialIcon name="download" size={18} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
