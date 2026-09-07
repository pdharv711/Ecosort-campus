"use client";

import { useState, useRef } from "react";
import WasteInput from "@/components/WasteInput";
import ClassificationResultComponent from "@/components/ClassificationResult";
import ExampleItems from "@/components/ExampleItems";
import HowItWorks from "@/components/HowItWorks";
import SDGAlignment from "@/components/SDGAlignment";
import ResponsibleAI from "@/components/ResponsibleAI";
import { ClassificationResult } from "@/lib/wasteRules";

export default function Home() {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ClassificationResult[]>([]);
  const [inputValue, setInputValue] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const handleResult = (r: ClassificationResult) => {
    setResult(r);
    setHistory((prev) => [r, ...prev].slice(0, 5));
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleExampleSelect = (item: string) => {
    setInputValue(item);
    // Trigger analysis immediately
    setIsLoading(true);
    fetch("/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          handleResult(data as ClassificationResult);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const BIN_COLORS: Record<string, string> = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    black: "bg-stone-800",
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)" }}>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="bg-green-700 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">♻️</span>
            <div>
              <h1 className="font-black text-lg leading-tight">EcoSort Campus</h1>
              <p className="text-green-200 text-xs">Smart Waste Segregation</p>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium text-green-100">
            <a href="#classify" className="hover:text-white transition-colors hidden sm:block">Classify</a>
            <a href="#examples" className="hover:text-white transition-colors hidden sm:block">Examples</a>
            <a href="#how-it-works" className="hover:text-white transition-colors hidden sm:block">How It Works</a>
            <a href="#sdg" className="hover:text-white transition-colors hidden sm:block">SDGs</a>
            <a href="#responsible-ai" className="hover:text-white transition-colors hidden sm:block">Responsible AI</a>
            <span className="bg-green-600 border border-green-400 rounded-full px-2 py-0.5 text-xs text-green-100">
              1M1B • AICTE 2026
            </span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-20">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="text-center py-14 px-4" id="classify">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-green-200">
            🌱 AI for Sustainability · Program: AICTE · Cohort: July – September 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-800 leading-tight mb-3">
            EcoSort <span className="text-green-600">Campus</span>
          </h1>
          <p className="text-gray-600 text-lg font-medium mb-1">
            Smart Waste Segregation Assistant
          </p>
          <p className="text-green-700 font-semibold italic text-base mb-10">
            &ldquo;Know it. Sort it. Sustain it.&rdquo;
          </p>

          {/* 4 Bins Legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { color: "bg-green-600", label: "Green", desc: "Wet / Compost", emoji: "🌿" },
              { color: "bg-blue-600", label: "Blue", desc: "Dry / Recyclable", emoji: "♻️" },
              { color: "bg-red-600", label: "Red", desc: "E-Waste / Hazardous", emoji: "⚡" },
              { color: "bg-stone-800", label: "Black", desc: "Reject / Sanitary", emoji: "🚫" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 text-sm">
                <span className={`w-3 h-3 rounded-full ${b.color} inline-block`} />
                <span className="font-semibold text-gray-700">{b.emoji} {b.desc}</span>
              </div>
            ))}
          </div>

          {/* Main input */}
          <WasteInput
            onResult={handleResult}
            onLoading={setIsLoading}
            isLoading={isLoading}
          />
        </section>

        {/* ── RESULT ───────────────────────────────────────────── */}
        {(result || isLoading) && (
          <div ref={resultRef} className="mb-12 flex flex-col items-center gap-4 px-4">
            {isLoading && (
              <div className="w-full max-w-2xl bg-white rounded-2xl border-2 border-green-200 p-10 flex flex-col items-center gap-4 shadow-lg">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />
                  <span className="absolute inset-0 flex items-center justify-center text-2xl">🧠</span>
                </div>
                <p className="text-green-700 font-semibold text-base">IBM Granite AI is analysing your waste item…</p>
                <p className="text-gray-400 text-xs text-center">
                  Extracting material · Detecting substrate · Applying campus waste rules · Checking hazard guardrails
                </p>
              </div>
            )}
            {!isLoading && result && (
              <ClassificationResultComponent result={result} />
            )}
          </div>
        )}

        {/* ── HISTORY ──────────────────────────────────────────── */}
        {history.length > 1 && (
          <section className="mb-12 px-4">
            <h2 className="text-lg font-bold text-gray-700 mb-3 text-center">
              📜 Recent Analyses
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {history.slice(1).map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm text-sm"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${BIN_COLORS[h.bin] ?? "bg-gray-400"} inline-block`} />
                  <span className="text-gray-700 font-medium">{h.item}</span>
                  <span className="text-gray-400 text-xs">{h.category}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── DIVIDER ──────────────────────────────────────────── */}
        <div className="border-t border-green-100 my-4" />

        {/* ── EXAMPLE ITEMS ────────────────────────────────────── */}
        <ExampleItems onSelect={handleExampleSelect} isLoading={isLoading} />

        <div className="border-t border-green-100 my-4" />

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <HowItWorks />

        <div className="border-t border-green-100 my-4" />

        {/* ── SDG ALIGNMENT ────────────────────────────────────── */}
        <SDGAlignment />

        <div className="border-t border-green-100 my-4" />

        {/* ── RESPONSIBLE AI ───────────────────────────────────── */}
        <ResponsibleAI />

        <div className="border-t border-green-100 my-4" />

        {/* ── ABOUT ────────────────────────────────────────────── */}
        <section className="py-10 px-4 text-center" id="about">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Project</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-green-100 shadow-sm p-6 text-left flex flex-col gap-3">
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>EcoSort Campus</strong> is an AI-powered waste classification and decision-support
              assistant for university campuses. It was developed as part of the{" "}
              <strong>1M1B AI for Sustainability</strong> program (AICTE) during the
              July – September 2026 cohort.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              The system uses <strong>IBM Granite foundation models</strong> with a zero-shot
              prompt-engineering pipeline to classify campus waste into four bins. It is designed to
              help students, hostel mess staff, and sanitation workers make correct, safe disposal
              decisions at the point of waste generation.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                ["Primary SDG", "SDG 12 – Responsible Consumption"],
                ["Secondary SDG", "SDG 11 – Sustainable Cities"],
                ["AI Model", "IBM Granite (watsonx.ai)"],
                ["Technique", "Zero-shot Prompt Engineering"],
                ["Target Users", "Students, Staff, Sanitation Workers"],
                ["Program", "1M1B · AICTE · 2026"],
              ].map(([k, v]) => (
                <div key={k} className="bg-green-50 rounded-xl p-3 border border-green-100">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{k}</p>
                  <p className="text-gray-800 font-semibold text-sm mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-green-800 text-green-100 py-8 px-6 text-center">
        <p className="font-bold text-base mb-1">♻️ EcoSort Campus</p>
        <p className="text-xs opacity-70 mb-3">
          1M1B AI for Sustainability · AICTE · July – September 2026
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs opacity-60 mb-3">
          <span>SDG 12 – Responsible Consumption</span>
          <span>·</span>
          <span>SDG 11 – Sustainable Cities</span>
          <span>·</span>
          <span>Powered by IBM Granite AI</span>
        </div>
        <p className="text-xs opacity-50">
          This tool provides general campus waste guidance. Always follow your institution&apos;s specific rules.
          No personal data is collected or stored.
        </p>
      </footer>
    </div>
  );
}
