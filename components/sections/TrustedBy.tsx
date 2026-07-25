import MaterialIcon from "@/components/shared/MaterialIcon";

const partners = [
  { icon: "shield", name: "CIBTAC" },
  { icon: "military_tech", name: "CIDESCO" },
  { icon: "apartment", name: "Apollo Hospitals" },
  { icon: "favorite", name: "Medanta" },
  { icon: "local_hospital", name: "Indian Medical Association" },
  { icon: "language", name: "AAD Partner" },
];

export default function TrustedBy() {
  return (
    <section className="py-12 border-y border-slate-100 bg-white">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase mb-8">
          Trusted by Leading Medical Institutions & Associations
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-teal-50 flex items-center justify-center transition-colors">
                <MaterialIcon
                  name={p.icon}
                  size={24}
                  className="text-slate-400 group-hover:text-teal-600 transition-colors"
                />
              </div>
              <p className="text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors text-center">
                {p.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
