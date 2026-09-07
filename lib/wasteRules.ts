// lib/wasteRules.ts
// Campus waste classification types and rule-based fallback logic

export type BinColor = "green" | "blue" | "red" | "black";

export interface ClassificationResult {
  item: string;
  material: string;
  category: string;
  bin: BinColor;
  preparation: string;
  warning: string;
  explanation: string;
}

export interface BinInfo {
  color: BinColor;
  label: string;
  description: string;
  hex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  binClass: string;
}

export const BIN_INFO: Record<BinColor, BinInfo> = {
  green: {
    color: "green",
    label: "GREEN BIN",
    description: "Wet / Compost",
    hex: "#16a34a",
    bgClass: "bin-green-bg",
    borderClass: "bin-green-border",
    textClass: "bin-green-text",
    binClass: "bin-green",
  },
  blue: {
    color: "blue",
    label: "BLUE BIN",
    description: "Dry / Recyclable",
    hex: "#2563eb",
    bgClass: "bin-blue-bg",
    borderClass: "bin-blue-border",
    textClass: "bin-blue-text",
    binClass: "bin-blue",
  },
  red: {
    color: "red",
    label: "RED BIN",
    description: "E-Waste / Hazardous",
    hex: "#dc2626",
    bgClass: "bin-red-bg",
    borderClass: "bin-red-border",
    textClass: "bin-red-text",
    binClass: "bin-red",
  },
  black: {
    color: "black",
    label: "BLACK BIN",
    description: "Reject / Sanitary",
    hex: "#1c1917",
    bgClass: "bin-black-bg",
    borderClass: "bin-black-border",
    textClass: "bin-black-text",
    binClass: "bin-black",
  },
};

// Rule-based fallback used when AI is not configured (demo mode)
interface FallbackRule {
  keywords: string[];
  result: Omit<ClassificationResult, "item">;
}

export const FALLBACK_RULES: FallbackRule[] = [
  {
    keywords: ["samosa", "butter paper", "oily", "greasy", "food", "tea", "chai", "snack", "parcel", "wrapper", "napkin", "compost", "vegetable", "fruit", "peel", "leftovers", "kulhad", "thali"],
    result: {
      material: "Soiled Paper / Food Waste",
      category: "Wet / Compost",
      bin: "green",
      preparation: "Tear off any clean dry margins for recycling. Place the oily/food-soiled portion in the green compost bin.",
      warning: "Food oil contaminates paper recycling streams — do NOT place greasy items in the blue dry bin.",
      explanation: "Food-soiled paper cannot be recycled because grease disrupts the paper-pulp recycling process. Composting is the correct disposal route for wet, food-contaminated organic waste.",
    },
  },
  {
    keywords: ["pet bottle", "plastic bottle", "soft drink", "soda bottle", "mineral water bottle", "pet", "plastic #1", "squash", "crushed bottle"],
    result: {
      material: "PET Plastic #1",
      category: "Dry / Recyclable",
      bin: "blue",
      preparation: "Empty all liquid completely. Squash the bottle flat to save bin volume. Replace the cap before placing in the blue bin.",
      warning: "None. Ensure the bottle is completely empty before recycling.",
      explanation: "PET (Polyethylene Terephthalate) plastic #1 is one of the most widely recycled plastics. Clean, empty PET bottles have strong market value and can be recycled into fibres and new containers.",
    },
  },
  {
    keywords: ["battery", "9v", "aa", "aaa", "alkaline", "zinc", "lithium", "dead battery", "cell", "button cell"],
    result: {
      material: "Alkaline / Zinc Battery",
      category: "Hazardous E-Waste",
      bin: "red",
      preparation: "Tape both terminals with insulating tape or cello tape. Place in the designated e-waste collection box — never in general bins.",
      warning: "⚠️ HAZARDOUS: Batteries contain toxic chemicals (zinc, manganese, lithium). Risk of chemical leak, corrosion, and fire if punctured. Handle with care and never incinerate.",
      explanation: "Batteries are classified as hazardous e-waste because they contain heavy metals and chemical electrolytes that are toxic to soil and groundwater. They require specialised recycling facilities.",
    },
  },
  {
    keywords: ["glass", "beaker", "flask", "broken glass", "borosilicate", "chemistry", "lab glass", "test tube", "vial", "mirror"],
    result: {
      material: "Borosilicate Glass / Broken Glass",
      category: "Sanitary / Reject",
      bin: "black",
      preparation: "Wrap carefully in several layers of thick newspaper or cardboard. Secure with tape and label 'BROKEN GLASS'. Place in the black reject bin.",
      warning: "⚠️ SHARP HAZARD: Broken glass poses severe cut risk to sanitation workers. Always wrap securely before disposal. Do NOT place loose broken glass in any bin.",
      explanation: "Broken laboratory glassware (borosilicate) is placed in the black reject bin because it cannot be recycled with regular glass, poses a sharp-edge injury risk to waste handlers, and may be chemically contaminated.",
    },
  },
  {
    keywords: ["paper", "newspaper", "cardboard", "box", "carton", "magazine", "book", "notebook", "dry paper"],
    result: {
      material: "Clean Paper / Cardboard",
      category: "Dry / Recyclable",
      bin: "blue",
      preparation: "Flatten cardboard boxes. Ensure paper is dry and free of food contamination. Bundle loosely and place in the blue bin.",
      warning: "Wet or food-stained paper cannot be recycled. Move soiled paper to the green compost bin instead.",
      explanation: "Clean, dry paper and cardboard are valuable recyclable materials. Recycling one tonne of paper saves approximately 17 trees and 26,000 litres of water.",
    },
  },
  {
    keywords: ["aluminium", "aluminum", "can", "tin can", "foil", "metal can", "beverage can"],
    result: {
      material: "Aluminium / Metal",
      category: "Dry / Recyclable",
      bin: "blue",
      preparation: "Rinse the can or foil to remove food residue. Crush flat to save space. Place in the blue recycling bin.",
      warning: "Aluminium foil soiled with food residue should be cleaned first, or composted if heavily soiled.",
      explanation: "Aluminium is infinitely recyclable and recycling it uses only 5% of the energy needed to produce new aluminium. Clean aluminium cans and foil have high recycling value.",
    },
  },
  {
    keywords: ["electronic", "phone", "charger", "cable", "laptop", "computer", "circuit", "pcb", "motherboard", "e-waste", "ewaste", "gadget"],
    result: {
      material: "Electronic Waste",
      category: "Hazardous E-Waste",
      bin: "red",
      preparation: "Do not dismantle. Remove personal data from devices if possible. Take to the campus e-waste collection point or authorised recycler.",
      warning: "⚠️ HAZARDOUS: Electronics contain lead, mercury, cadmium and other toxic materials. Never dispose of in regular bins or incinerate.",
      explanation: "Electronic waste contains precious metals and hazardous substances. Proper e-waste recycling recovers valuable materials while preventing toxic contamination of soil and groundwater.",
    },
  },
  {
    keywords: ["sanitary", "pad", "diaper", "nappy", "bandage", "medical waste", "syringe", "needle", "mask", "glove", "contaminated"],
    result: {
      material: "Sanitary / Medical Waste",
      category: "Sanitary / Reject",
      bin: "black",
      preparation: "Wrap securely in a plastic bag before disposal. Place in the black reject bin. Do not mix with dry recyclables.",
      warning: "⚠️ BIOHAZARD: Sanitary and medical waste may carry pathogens. Handle with gloves. Keep segregated from all other waste streams.",
      explanation: "Sanitary and medical waste is classified as reject/sanitary waste because it is non-recyclable and may present biohazard risks to waste handlers and the environment.",
    },
  },
  {
    keywords: ["thermocol", "styrofoam", "polystyrene", "foam", "bubble wrap"],
    result: {
      material: "Thermocol / EPS Plastic",
      category: "Reject / Sanitary",
      bin: "black",
      preparation: "Break into smaller pieces if possible. Seal in a bag. Place in the black reject bin — thermocol is not accepted in campus recycling.",
      warning: "Thermocol (EPS) is not recyclable in standard campus recycling streams and must not be incinerated as it releases toxic fumes.",
      explanation: "Expanded Polystyrene (EPS/thermocol) has very low recycling rates because it is mostly air by volume, making transport uneconomical. It goes to the black reject bin at most campuses.",
    },
  },
];

export function classifyByRules(item: string): ClassificationResult {
  const lower = item.toLowerCase();
  for (const rule of FALLBACK_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return { item, ...rule.result };
    }
  }
  // Default fallback
  return {
    item,
    material: "Unknown Material",
    category: "Reject / Sanitary",
    bin: "black",
    preparation: "When unsure, place in the black reject bin to avoid contaminating other waste streams. Ask your campus waste management team for guidance.",
    warning: "Classification is uncertain. When in doubt, use the black bin to prevent cross-contamination.",
    explanation: `The item "${item}" could not be automatically classified. This may be an unusual waste item or require physical inspection. Please consult your campus waste management guidelines or ask a sanitation supervisor.`,
  };
}
