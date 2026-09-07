// lib/ai.ts
// IBM Granite AI client for waste classification

import { ClassificationResult, classifyByRules } from "./wasteRules";

const GRANITE_API_URL = process.env.GRANITE_API_URL || "";
const GRANITE_API_KEY = process.env.GRANITE_API_KEY || "";
const GRANITE_MODEL = process.env.GRANITE_MODEL || "ibm/granite-3-3-8b-instruct";

const SYSTEM_PROMPT = `You are EcoSort Campus, an AI waste classification assistant for university campuses in India.
Your role is to classify waste items into the correct campus bin based on institutional solid-waste management norms.

Campus Bin System:
- GREEN BIN: Wet / Compost — food waste, soiled paper, organic matter, tea/chai cups, food packaging contaminated with grease or food
- BLUE BIN: Dry / Recyclable — clean PET plastic, aluminium cans, clean cardboard, clean paper, glass bottles (unbroken)
- RED BIN: E-Waste / Hazardous — batteries (all types), electronic devices, lab chemicals, fluorescent tubes, CFL bulbs
- BLACK BIN: Reject / Sanitary — broken glass, sanitary waste, thermocol/styrofoam, soiled diapers/pads, unrecyclable multi-layer packaging, contaminated waste of uncertain category

You MUST return ONLY a valid JSON object with this exact structure and nothing else:
{
  "item": "<the waste item as described by the user>",
  "material": "<material or substrate detected, e.g. PET Plastic #1, Soiled Paper, Alkaline Battery>",
  "category": "<one of: Wet / Compost | Dry / Recyclable | Hazardous E-Waste | Sanitary / Reject>",
  "bin": "<one of: green | blue | red | black>",
  "preparation": "<specific disposal/preparation instructions for campus users>",
  "warning": "<safety or contamination warning, or 'None' if no hazard>",
  "explanation": "<2-3 sentence educational explanation of why this classification was made>"
}

Rules:
- Food-soiled paper (greasy wrappers, butter paper, oily napkins) → GREEN (compost), NOT blue
- Clean, dry paper/cardboard → BLUE
- ALL batteries including 9V, AA, AAA, lithium → RED (hazardous)
- Broken glass → BLACK (sharp hazard to sanitation workers)
- Unsorted or contaminated items → BLACK
- Always mention worker safety for sharp or chemical hazards
- Reference Indian campus context (samosa wrappers, chai cups, kulhad, etc.)
- Never collect personal information from users`;

function isValidResult(obj: unknown): obj is ClassificationResult {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.item === "string" &&
    typeof o.material === "string" &&
    typeof o.category === "string" &&
    ["green", "blue", "red", "black"].includes(o.bin as string) &&
    typeof o.preparation === "string" &&
    typeof o.warning === "string" &&
    typeof o.explanation === "string"
  );
}

export async function classifyWaste(item: string): Promise<ClassificationResult> {
  // If Granite credentials are not configured, use rule-based fallback (demo mode)
  if (!GRANITE_API_URL || !GRANITE_API_KEY) {
    console.info("[EcoSort] Granite API not configured — using rule-based demo mode.");
    return classifyByRules(item);
  }

  try {
    const response = await fetch(`${GRANITE_API_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GRANITE_API_KEY}`,
      },
      body: JSON.stringify({
        model: GRANITE_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Classify this campus waste item and return ONLY valid JSON: "${item}"`,
          },
        ],
        max_tokens: 500,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[EcoSort] Granite API error:", response.status, errText);
      // Fall back to rule-based on API error
      return classifyByRules(item);
    }

    const data = await response.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";

    // Extract JSON from the response (handle markdown code blocks)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn("[EcoSort] No JSON found in Granite response, using fallback.");
      return classifyByRules(item);
    }

    const parsed: unknown = JSON.parse(jsonMatch[0]);
    if (!isValidResult(parsed)) {
      console.warn("[EcoSort] Invalid JSON structure from Granite, using fallback.");
      return classifyByRules(item);
    }

    // Ensure item field matches user input
    parsed.item = item;
    return parsed;
  } catch (error) {
    console.error("[EcoSort] classifyWaste error:", error);
    return classifyByRules(item);
  }
}
