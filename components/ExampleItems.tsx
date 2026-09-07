"use client";

interface Props {
  onSelect: (item: string) => void;
  isLoading: boolean;
}

const EXAMPLES = [
  {
    item: "Oily samosa wrapper",
    material: "Soiled Paper / Grease",
    bin: "green" as const,
    emoji: "🥐",
    label: "GREEN",
  },
  {
    item: "Crushed PET soft drink bottle",
    material: "PET Plastic #1",
    bin: "blue" as const,
    emoji: "🍶",
    label: "BLUE",
  },
  {
    item: "Electronics lab 9V dead battery",
    material: "Alkaline / Zinc Battery",
    bin: "red" as const,
    emoji: "🔋",
    label: "RED",
  },
  {
    item: "Broken glass chemistry beaker",
    material: "Borosilicate Glass",
    bin: "black" as const,
    emoji: "🧪",
    label: "BLACK",
  },
];

const BIN_STYLES = {
  green: { bg: "bg-green-50", border: "border-green-300", text: "text-green-700", badge: "bg-green-600" },
  blue:  { bg: "bg-blue-50",  border: "border-blue-300",  text: "text-blue-700",  badge: "bg-blue-600"  },
  red:   { bg: "bg-red-50",   border: "border-red-300",   text: "text-red-700",   badge: "bg-red-600"   },
  black: { bg: "bg-stone-50", border: "border-stone-400", text: "text-stone-700", badge: "bg-stone-800" },
};

export default function ExampleItems({ onSelect, isLoading }: Props) {
  return (
    <section className="py-10 px-4 bg-white" id="examples">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Campus Waste Examples
      </h2>
      <p className="text-center text-gray-500 text-sm mb-8 max-w-xl mx-auto">
        These four PPT reference examples demonstrate EcoSort&apos;s classification across all four campus bin categories.
        Click any card to analyse it instantly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {EXAMPLES.map((ex) => {
          const style = BIN_STYLES[ex.bin];
          return (
            <button
              key={ex.item}
              onClick={() => onSelect(ex.item)}
              disabled={isLoading}
              className={`${style.bg} ${style.border} border-2 rounded-2xl p-5 text-left flex flex-col gap-3 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer`}
              aria-label={`Analyse: ${ex.item}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{ex.emoji}</span>
                <span className={`${style.badge} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                  {ex.label}
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{ex.item}</p>
                <p className={`text-xs font-medium mt-0.5 ${style.text}`}>{ex.material}</p>
              </div>
              <p className={`text-xs font-semibold ${style.text} mt-auto`}>
                Click to analyse →
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
