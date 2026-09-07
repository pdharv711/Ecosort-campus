"use client";

import type { ClassificationResult, BinColor } from "@/lib/wasteRules";
import { BIN_INFO } from "@/lib/wasteRules";

interface Props {
  result: ClassificationResult;
}

const BIN_EMOJI: Record<BinColor, string> = {
  green: "🟢",
  blue: "🔵",
  red: "🔴",
  black: "⚫",
};

const CATEGORY_ICON: Record<string, string> = {
  "Wet / Compost": "🌿",
  "Dry / Recyclable": "♻️",
  "Hazardous E-Waste": "⚡",
  "Sanitary / Reject": "🚫",
};

export default function ClassificationResult({ result }: Props) {
  const bin = BIN_INFO[result.bin];
  const isHazardous = result.bin === "red" || result.warning.toLowerCase().includes("hazard") || result.warning.toLowerCase().includes("sharp") || result.warning.toLowerCase().includes("⚠️");
  const categoryIcon = CATEGORY_ICON[result.category] ?? "🗑️";

  return (
    <section
      aria-label="AI Classification Result"
      className={`w-full max-w-2xl mx-auto rounded-2xl border-2 ${bin.borderClass} ${bin.bgClass} shadow-lg overflow-hidden`}
    >
      {/* Header */}
      <div className={`${bin.binClass} px-6 py-4 flex items-center justify-between`}>
        <div>
          <p className="text-white text-xs font-semibold uppercase tracking-widest opacity-80">
            AI Classification Result
          </p>
          <h2 className="text-white text-xl font-bold mt-0.5">
            {BIN_EMOJI[result.bin]} {bin.label}
          </h2>
          <p className="text-white text-sm opacity-90">{bin.description}</p>
        </div>
        <div className="text-5xl select-none" aria-hidden="true">
          {result.bin === "green" ? "🪣" : result.bin === "blue" ? "♻️" : result.bin === "red" ? "⚠️" : "🚫"}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-5">
        {/* Item */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            Waste Item
          </p>
          <p className="text-gray-800 font-medium text-base">{result.item}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Material */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              🧪 Material Detected
            </p>
            <p className={`font-bold text-base ${bin.textClass}`}>{result.material}</p>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              🏷️ Category
            </p>
            <p className={`font-bold text-base ${bin.textClass}`}>
              {categoryIcon} {result.category}
            </p>
          </div>
        </div>

        {/* Preparation */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            📋 What To Do — Preparation Instructions
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">{result.preparation}</p>
        </div>

        {/* Warning */}
        {result.warning && result.warning.toLowerCase() !== "none" ? (
          <div className={`rounded-xl p-4 border-2 ${isHazardous ? "bg-red-50 border-red-300" : "bg-amber-50 border-amber-300"}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isHazardous ? "text-red-700" : "text-amber-700"}`}>
              {isHazardous ? "🚨 Safety / Hazard Warning" : "⚠️ Contamination Warning"}
            </p>
            <p className={`text-sm font-medium leading-relaxed ${isHazardous ? "text-red-800" : "text-amber-800"}`}>
              {result.warning}
            </p>
          </div>
        ) : (
          <div className="rounded-xl p-4 border-2 bg-green-50 border-green-200">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-green-700">
              ✅ Safety / Contamination Warning
            </p>
            <p className="text-sm text-green-800">None — safe to dispose normally.</p>
          </div>
        )}

        {/* Explanation */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            🤖 Why This Classification? — AI Reasoning
          </p>
          <p className="text-gray-700 text-sm leading-relaxed italic">{result.explanation}</p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          💡 This guidance follows general campus waste norms. Your institution&apos;s specific waste management rules take precedence. When in doubt, consult your campus sanitation team.
        </p>
      </div>
    </section>
  );
}
