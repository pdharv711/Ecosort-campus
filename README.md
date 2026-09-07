# EcoSort Campus 🌿♻️

**Smart Waste Segregation Assistant powered by IBM Granite AI**

> *Know it. Sort it. Sustain it.*

---

## 📌 Project Overview

**EcoSort Campus** is an AI-powered waste classification and decision-support assistant for university campuses. It helps students, faculty, hostel/mess staff, and sanitation workers correctly segregate waste at source and reduce recyclable waste going to landfills.

**Program:** 1M1B AI for Sustainability (AICTE)  
**Cohort:** July – September 2026

---

## 📄 Prototype Documentation

Comprehensive technical documentation and academic project reports for the working prototype are available in the [`docs/`](./docs) directory:

- 📕 **[EcoSort Campus Prototype Documentation (PDF)](./docs/EcoSort_Campus_Prototype_Documentation.pdf)** — Full 12-page technical report containing problem definition, system architecture, campus bin logic, real UI screenshots, evaluation test matrix, responsible AI framework, and projected impact analysis.
- 📘 **[EcoSort Campus Prototype Documentation (DOCX)](./docs/EcoSort_Campus_Prototype_Documentation.docx)** — Editable companion document.
- 📸 **[Live Interface Screenshots](./docs/screenshots/)** — High-resolution captures of the live web application and test case results.

---

## 🚨 Problem Statement

Over **60% of recyclable materials** on campus end up in landfills due to cross-contamination in high-traffic bins. Students and hostel residents regularly struggle with everyday packaging such as:
- Greasy butter paper and samosa wrappers
- Lined chai cups and snack parcels
- Used batteries from electronics labs
- Broken laboratory glassware

Static bin-side posters cannot answer dynamic questions — EcoSort bridges this gap with AI.

---

## ✅ Solution

EcoSort Campus uses **IBM Granite foundation models** with a zero-shot prompt-engineering pipeline to:

1. Accept natural-language waste item descriptions
2. Extract material/substrate and physical condition
3. Classify waste into the correct campus bin
4. Return preparation instructions and safety warnings
5. Explain the reasoning behind each classification

---

## 👥 Target Users

| User | Context |
|---|---|
| Students & Faculty | Canteens, labs, academic blocks |
| Hostel Mess Staff | Bulk food waste, oily containers |
| Sanitation Workers | Need safety warnings for hazardous items |
| Campus Administration | Waste management oversight |

---

## 🎯 SDG Alignment

| SDG | Goal | Link |
|---|---|---|
| **SDG 12** (Primary) | Responsible Consumption & Production | Target 12.5 — reduce waste via recycling |
| **SDG 11** (Secondary) | Sustainable Cities & Communities | Reduce institutional environmental footprint |

---

## 🤖 AI Technologies

- **IBM Granite** foundation models (via watsonx.ai)
- **Zero-shot prompt engineering** — no fine-tuning required
- **Entity extraction** — material, substrate, condition detection
- **Hazard guardrails** — proactive safety warning system
- **Structured JSON output** — reliable frontend parsing

---

## 🏗️ System Architecture

```
Browser (Next.js / React / TypeScript)
        │
        │  POST /api/classify  { item: string }
        ▼
Next.js API Route (server-side)
        │
        │  HTTPS + Bearer token (server-only)
        ▼
IBM Granite via watsonx.ai REST API
        │
        │  Structured JSON response
        ▼
ClassificationResult displayed to user
```

**Key security note:** API credentials live only in server-side environment variables — never exposed to the browser.

---

## 📁 Project Structure

```
ecosort-campus/
├── app/
│   ├── page.tsx              ← Main page (all sections)
│   ├── layout.tsx            ← Root layout + metadata
│   ├── globals.css           ← Tailwind + bin colour utilities
│   └── api/
│       └── classify/
│           └── route.ts      ← AI classification endpoint
│
├── components/
│   ├── WasteInput.tsx        ← Text input + Analyse button
│   ├── ClassificationResult.tsx  ← Result card
│   ├── ExampleItems.tsx      ← PPT reference examples
│   ├── HowItWorks.tsx        ← AI pipeline explanation
│   ├── SDGAlignment.tsx      ← SDG 12 & 11 cards
│   └── ResponsibleAI.tsx     ← Responsible AI principles
│
├── lib/
│   ├── ai.ts                 ← IBM Granite API client
│   └── wasteRules.ts         ← Types + rule-based fallback
│
├── .env.example              ← Credential template
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description | Example |
|---|---|---|
| `GRANITE_API_URL` | IBM watsonx.ai base URL | `https://us-south.ml.cloud.ibm.com` |
| `GRANITE_API_KEY` | IBM Cloud IAM API key | `abc123...` |
| `GRANITE_MODEL` | Granite model ID | `ibm/granite-3-3-8b-instruct` |

> **Demo Mode:** If `GRANITE_API_KEY` is not set, the app uses a rule-based classifier so you can still see the full UI and test all examples without AI credentials.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18 or later
- npm 9 or later

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd ecosort-campus

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your IBM Granite credentials

# 4. Start the development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

---

## 🧪 Test Cases

These four examples from the project PPT demonstrate all four bin categories:

| # | Input | Material | Category | Bin |
|---|---|---|---|---|
| 1 | Oily samosa wrapper | Soiled Paper / Grease | Wet / Compost | 🟢 Green |
| 2 | Crushed PET soft drink bottle | PET Plastic #1 | Dry / Recyclable | 🔵 Blue |
| 3 | Electronics lab 9V dead battery | Alkaline / Zinc Battery | Hazardous E-Waste | 🔴 Red |
| 4 | Broken glass chemistry beaker | Borosilicate Glass | Sanitary / Reject | ⚫ Black |

---

## ♻️ Campus Bin System

| Bin | Colour | Category | Examples |
|---|---|---|---|
| 🟢 | Green | Wet / Compost | Food waste, soiled paper, organic matter |
| 🔵 | Blue | Dry / Recyclable | Clean PET, aluminium cans, dry cardboard |
| 🔴 | Red | E-Waste / Hazardous | Batteries, electronics, lab chemicals |
| ⚫ | Black | Reject / Sanitary | Broken glass, sanitary waste, thermocol |

---

## 🛡️ Responsible AI Principles

| Principle | Implementation |
|---|---|
| **Fairness** | Indian campus context — chai cups, kulhad, samosa wrappers, etc. |
| **Transparency** | Every result includes AI explanation, not just a bin colour |
| **Privacy** | No student IDs, camera feeds, or personal data stored |
| **Worker Safety** | Explicit hazard warnings for batteries, glass, sharp objects |
| **Institutional Precedence** | Disclaimer that local rules always take precedence |
| **Education** | Teaches *why*, not just *where* |

---

## 📈 Projected Impact

Pilot projection for a 3,000-student campus (60-day deployment):

| Waste Stream | Projected Segregation |
|---|---|
| Campus cafeteria plastics | 82% |
| Hostel dry paper & boxes | 76% |
| Mess food waste composting | 68% |
| Departmental e-waste & labs | 55% |
| **Overall landfill diversion** | **70.2%** |

> ⚠️ These are **projected estimates** from the project concept — not measured results from a deployed system.

---

## 🔮 Future Improvements

- **Image Upload** — Analyse waste via photo using IBM Granite Vision
- **Multilingual Support** — Hindi, Tamil, Telugu interfaces for wider campus reach
- **Campus Dashboard** — Aggregated anonymised segregation analytics
- **Mobile App** — Progressive Web App for hostel/canteen quick access
- **QR Code Bins** — Scan bin-side QR code to get item-specific guidance
- **Offline Mode** — Rule-based classifier for low-connectivity campus areas

---

## 👨‍💻 Demo Instructions

1. Open `http://localhost:3000`
2. Type a waste item in the input box, or click any example card
3. Click **"🔍 Analyse Waste"**
4. View the AI classification result with bin, material, instructions, and reasoning
5. Try all four PPT test cases to see the full bin spectrum

---

*Built with ❤️ for a cleaner, greener campus — EcoSort Campus · 1M1B AI for Sustainability · AICTE 2026*
