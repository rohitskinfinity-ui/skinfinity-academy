"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";

export default function PaymentsPage() {
  const transactions = [
    { id: 'TXN-001', course: 'Fellowship in Aesthetic Dermatology', amount: 120000, date: 'Jan 15, 2025', status: 'paid', method: 'Credit Card' },
    { id: 'TXN-002', course: 'Certificate in Clinical Cosmetology', amount: 65000, date: 'Mar 10, 2025', status: 'paid', method: 'UPI' },
    { id: 'TXN-003', course: 'Advanced Injectables Workshop', amount: 45000, date: 'May 5, 2025', status: 'paid', method: 'Credit Card' },
    { id: 'TXN-004', course: 'Laser & Energy Devices', amount: 28000, date: 'Aug 1, 2025', status: 'pending', method: 'Bank Transfer' },
  ];

  return (
    <>
      <SectionHeader title="Payments" subtitle="Manage your transactions and payment methods." />
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Spent', value: '₹2,30,000', icon: 'currency_rupee', color: 'bg-teal-50 text-teal-600' },
          { label: 'Pending', value: '₹28,000', icon: 'error', color: 'bg-amber-50 text-amber-600' },
          { label: 'Courses Purchased', value: '4', icon: 'menu_book', color: 'bg-blue-50 text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-soft border border-slate-50">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}><MaterialIcon name={s.icon} size={20} /></div>
            <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>
      <Card>
        <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>Transaction History</h3>
        <div className="space-y-2">
          {transactions.map(t => (
            <div key={t.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${t.status === 'paid' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                {t.status === 'paid' ? <MaterialIcon name="check_circle" size={20} /> : <MaterialIcon name="schedule" size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{t.course}</p>
                <p className="text-xs text-slate-400">{t.id} • {t.date} • {t.method}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">₹{t.amount.toLocaleString()}</p>
                <span className={`text-xs font-semibold ${t.status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{t.status === 'paid' ? 'Paid' : 'Pending'}</span>
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><MaterialIcon name="download" size={16} /></button>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mt-5">
        <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>Payment Methods</h3>
        <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center"><MaterialIcon name="credit_card" size={22} className="text-white" /></div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">•••• •••• •••• 4242</p>
            <p className="text-xs text-slate-400">Visa • Expires 12/27</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">Default</span>
        </div>
        <button className="w-full mt-3 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-sm font-semibold text-slate-500 hover:border-teal-300 hover:text-teal-600 transition-all flex items-center justify-center gap-2">
          <MaterialIcon name="credit_card" size={18} /> Add Payment Method
        </button>
      </Card>
    </>
  );
}
