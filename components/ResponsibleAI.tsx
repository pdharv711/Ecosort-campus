export default function ResponsibleAI() {
  const principles = [
    {
      icon: "⚖️",
      title: "Fairness & Inclusion",
      desc: "EcoSort is trained on Indian campus context — street-food packaging like samosa wrappers, chai cups, kulhad, and steel thali parchment — ensuring the system is not biased toward only Western commercial products.",
    },
    {
      icon: "🔍",
      title: "Transparency & Explainability",
      desc: "Every classification includes a human-readable explanation of why the bin was chosen. The AI never just outputs a bin colour — it educates the user about the reasoning behind each decision.",
    },
    {
      icon: "🔒",
      title: "Privacy & Zero Data Retention",
      desc: "EcoSort does not store or log student roll numbers, device telemetry, camera feeds, or personal identifiers. Only the waste description text is processed — and only for the duration of the API call.",
    },
    {
      icon: "🦺",
      title: "Frontline Worker Safety",
      desc: "The system proactively identifies dangerous materials — broken glass, batteries, sharp objects, lab chemicals — and displays explicit safety warnings to protect sanitation workers from occupational hazards.",
    },
    {
      icon: "🏛️",
      title: "Institutional Precedence",
      desc: "EcoSort provides general guidance aligned with national solid-waste management norms. Your institution's specific waste-management rules and local municipal regulations always take precedence.",
    },
    {
      icon: "🎓",
      title: "Education Over Automation",
      desc: "Rather than just telling users what bin to use, EcoSort explains why — building sustainable habits through understanding, not dependency. The goal is informed humans, not passive users.",
    },
  ];

  return (
    <section className="py-10 px-4" id="responsible-ai">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Responsible AI
      </h2>
      <p className="text-center text-gray-500 text-sm mb-8 max-w-xl mx-auto">
        EcoSort Campus is built with responsible AI principles at its core — not as an afterthought.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {principles.map((p) => (
          <div
            key={p.title}
            className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow"
          >
            <div className="text-2xl">{p.icon}</div>
            <h3 className="font-bold text-gray-800 text-sm">{p.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* IBM Granite note */}
      <div className="max-w-2xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
        <p className="text-blue-800 text-sm font-semibold mb-1">
          🤖 AI Technology — IBM Granite Foundation Models
        </p>
        <p className="text-blue-700 text-xs leading-relaxed">
          This prototype uses IBM Granite foundation models via zero-shot prompt engineering and
          entity extraction. The system prompt encodes campus waste-management rules and hazard
          guardrails. API credentials are server-side only — never exposed to the browser.
        </p>
      </div>
    </section>
  );
}
