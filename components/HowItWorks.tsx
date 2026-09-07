export default function HowItWorks() {
  const steps = [
    {
      icon: "✍️",
      step: "1",
      title: "Describe Your Waste",
      desc: "Type a natural-language description of the waste item — e.g. 'oily samosa wrapper', 'dead 9V battery', 'crushed PET bottle'.",
    },
    {
      icon: "🧠",
      step: "2",
      title: "IBM Granite AI Analyses",
      desc: "The system sends your input to IBM Granite through a prompt-engineered pipeline that extracts material, substrate, and condition information.",
    },
    {
      icon: "🏷️",
      step: "3",
      title: "Waste is Classified",
      desc: "The AI maps the detected material to campus waste categories (Wet/Dry/E-Waste/Reject) and selects the correct bin colour.",
    },
    {
      icon: "📋",
      step: "4",
      title: "You Get Actionable Guidance",
      desc: "EcoSort returns the bin colour, preparation steps, safety warnings, and a transparent explanation so you understand the reasoning.",
    },
  ];

  return (
    <section className="py-10 px-4" id="how-it-works">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        How EcoSort Works
      </h2>
      <p className="text-center text-gray-500 text-sm mb-8 max-w-xl mx-auto">
        An AI-powered prompt pipeline built on IBM Granite foundation models, designed for campus solid-waste management.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {steps.map((s) => (
          <div
            key={s.step}
            className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 flex flex-col items-center text-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-sm shadow">
              {s.step}
            </div>
            <div className="text-3xl">{s.icon}</div>
            <h3 className="font-bold text-gray-800 text-sm">{s.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Workflow diagram */}
      <div className="mt-8 max-w-3xl mx-auto bg-white rounded-2xl border border-green-100 shadow-sm p-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
          AI Classification Pipeline
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1 text-xs font-medium text-gray-600">
          {[
            "User Input",
            "→",
            "IBM Granite Prompt",
            "→",
            "Entity Extraction",
            "→",
            "Material Detection",
            "→",
            "Waste Classification",
            "→",
            "Bin Recommendation",
            "→",
            "Safety Guardrails",
            "→",
            "Result",
          ].map((node, i) =>
            node === "→" ? (
              <span key={i} className="text-green-400 text-base">
                {node}
              </span>
            ) : (
              <span
                key={i}
                className="bg-green-50 border border-green-200 rounded-lg px-2 py-1 text-green-800"
              >
                {node}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
