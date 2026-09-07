export default function SDGAlignment() {
  return (
    <section className="py-10 px-4 bg-white" id="sdg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        SDG Alignment
      </h2>
      <p className="text-center text-gray-500 text-sm mb-8 max-w-xl mx-auto">
        EcoSort Campus directly supports two United Nations Sustainable Development Goals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* SDG 12 */}
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center text-white font-black text-xl shadow">
              12
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Primary SDG</p>
              <p className="text-amber-800 font-semibold text-base">
                Responsible Consumption & Production
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            <strong>Target 12.5</strong> — Substantially reduce waste generation through prevention,
            reduction, recycling, and reuse. EcoSort helps campuses divert recyclable materials from
            landfills by enabling correct waste segregation at source.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {[
              ["82%", "Cafeteria plastics segregated"],
              ["76%", "Hostel dry paper & boxes"],
              ["68%", "Mess food waste composted"],
              ["55%", "Departmental e-waste"],
            ].map(([pct, label]) => (
              <div key={label} className="bg-white rounded-xl p-3 text-center border border-amber-100">
                <p className="text-amber-600 font-black text-lg">{pct}</p>
                <p className="text-gray-500 text-xs">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 italic">
            * Projected pilot figures for a 3,000-student campus — not measured deployment results.
          </p>
        </div>

        {/* SDG 11 */}
        <div className="rounded-2xl border-2 border-orange-300 bg-orange-50 p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-xl shadow">
              11
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Secondary SDG</p>
              <p className="text-orange-800 font-semibold text-base">
                Sustainable Cities & Communities
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            University campuses function as micro-cities. EcoSort reduces the institutional
            environmental footprint by improving sanitation worker safety, reducing landfill pressure,
            and building a culture of responsible waste disposal that students carry beyond campus.
          </p>
          <div className="bg-white rounded-xl p-4 border border-orange-100 mt-1">
            <p className="text-orange-600 font-black text-2xl text-center">70.2%</p>
            <p className="text-gray-500 text-xs text-center">
              Projected overall waste diversion from landfills within 60 days of pilot deployment
            </p>
          </div>
          <p className="text-xs text-gray-400 italic">
            * Projected estimate from project concept — not a measured result.
          </p>
        </div>
      </div>
    </section>
  );
}
