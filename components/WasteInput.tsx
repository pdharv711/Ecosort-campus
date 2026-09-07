"use client";

import { useState } from "react";
import { ClassificationResult } from "@/lib/wasteRules";

interface WasteInputProps {
  onResult: (result: ClassificationResult) => void;
  onLoading: (loading: boolean) => void;
  isLoading: boolean;
}

const EXAMPLE_ITEMS = [
  "Oily samosa wrapper",
  "Crushed PET soft drink bottle",
  "Electronics lab 9V dead battery",
  "Broken glass chemistry beaker",
  "Wet chai cup",
  "Clean cardboard box",
  "Old mobile phone charger",
  "Soiled sanitary pad",
];

export default function WasteInput({ onResult, onLoading, isLoading }: WasteInputProps) {
  const [item, setItem] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter a waste item before analysing.");
      return;
    }
    setError("");
    onLoading(true);

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Classification failed. Please try again.");
        return;
      }

      onResult(data as ClassificationResult);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      onLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(item);
  };

  const handleExample = (example: string) => {
    setItem(example);
    setError("");
    handleSubmit(example);
  };

  return (
    <section className="w-full max-w-2xl mx-auto">
      {/* AI Badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
          Powered by IBM Granite AI
        </span>
      </div>

      {/* Input form */}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <label htmlFor="waste-input" className="sr-only">
          Describe your waste item
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl select-none pointer-events-none">
            🗑️
          </span>
          <input
            id="waste-input"
            type="text"
            value={item}
            onChange={(e) => {
              setItem(e.target.value);
              if (error) setError("");
            }}
            placeholder="e.g. Oily samosa wrapper, PET bottle, dead battery…"
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-green-200 bg-white text-gray-800 placeholder-gray-400 text-base focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-sm transition-all"
            disabled={isLoading}
            maxLength={500}
            aria-describedby={error ? "input-error" : undefined}
            aria-invalid={!!error}
          />
        </div>

        {error && (
          <p id="input-error" role="alert" className="text-red-600 text-sm font-medium px-1">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading || !item.trim()}
          className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-base transition-all shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label="Analyse waste item"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              IBM Granite AI is analysing…
            </span>
          ) : (
            "🔍 Analyse Waste"
          )}
        </button>
      </form>

      {/* Quick Examples */}
      <div className="mt-5">
        <p className="text-center text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">
          Quick examples — click to try
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {EXAMPLE_ITEMS.map((ex) => (
            <button
              key={ex}
              onClick={() => handleExample(ex)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full bg-white border border-green-200 text-green-800 hover:bg-green-50 hover:border-green-400 transition-all disabled:opacity-50 shadow-sm"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
