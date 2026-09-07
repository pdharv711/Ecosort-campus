import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(BASE_DIR, "docs")
SCREENSHOTS_DIR = os.path.join(DOCS_DIR, "screenshots")
PDF_PATH = os.path.join(DOCS_DIR, "EcoSort_Campus_Prototype_Documentation.pdf")

# Color palette
PRIMARY_GREEN = colors.HexColor("#16a34a")
DARK_GREEN = colors.HexColor("#14532d")
BG_LIGHT_GREEN = colors.HexColor("#f0fdf4")
BLUE_ACCENT = colors.HexColor("#2563eb")
RED_ACCENT = colors.HexColor("#dc2626")
BLACK_ACCENT = colors.HexColor("#1c1917")
GRAY_TEXT = colors.HexColor("#4b5563")
LIGHT_GRAY_BORDER = colors.HexColor("#e5e7eb")

class NumberedCanvas(canvas.Canvas):
    """Canvas that performs a two-pass operation to draw running header & 'Page X of Y' footer."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            # Suppress header and footer on cover page
            return

        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#6b7280"))

        # Running Header
        self.drawString(54, 750, "EcoSort Campus: Smart Waste Segregation — Prototype Documentation")
        self.drawRightString(612 - 54, 750, "AI for Sustainability | AICTE 2026")
        self.setStrokeColor(LIGHT_GRAY_BORDER)
        self.setLineWidth(0.75)
        self.line(54, 742, 612 - 54, 742)

        # Running Footer
        self.line(54, 45, 612 - 54, 45)
        self.drawString(54, 32, "Primary SDG 12 | Secondary SDG 11 | IBM Granite Foundation Models")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 54, 32, page_str)
        self.restoreState()

def create_documentation_pdf():
    doc = SimpleDocTemplate(
        PDF_PATH,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=DARK_GREEN,
        alignment=1
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=15,
        leading=20,
        textColor=PRIMARY_GREEN,
        alignment=1
    )
    
    tagline_style = ParagraphStyle(
        'CoverTagline',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor("#047857"),
        alignment=1
    )
    
    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=DARK_GREEN,
        spaceAfter=10
    )
    
    h2_style = ParagraphStyle(
        'Header2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=PRIMARY_GREEN,
        spaceBefore=10,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1f2937"),
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#374151"),
        leftIndent=15,
        spaceAfter=4
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#1e3a8a")
    )

    caption_style = ParagraphStyle(
        'Caption',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#4b5563"),
        alignment=1,
        spaceAfter=10
    )

    table_text = ParagraphStyle(
        'TableContent',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#1f2937")
    )
    
    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    story = []

    # =========================================================================
    # PAGE 1: COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 40))
    # Program Badge
    prog_badge = Table([[
        Paragraph("<font color='#166534'><b>AI for Sustainability Virtual Internship 2026</b></font><br/><font color='#15803d' size='8'>AICTE / 1M1B / IBM SkillsBuild — Cohort: July – September 2026</font>", ParagraphStyle('Prog', alignment=1, leading=12))
    ]], colWidths=[480])
    prog_badge.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#dcfce7")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#86efac")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('ROUNDEDCORNERS', [8, 8, 8, 8]),
    ]))
    story.append(prog_badge)
    story.append(Spacer(1, 35))

    story.append(Paragraph("EcoSort Campus", title_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Smart Waste Segregation Assistant", subtitle_style))
    story.append(Spacer(1, 10))
    story.append(Paragraph('"Know it. Sort it. Sustain it."', tagline_style))
    story.append(Spacer(1, 20))

    # Cover graphic / screenshot preview if exists
    hero_img_path = os.path.join(SCREENSHOTS_DIR, "01_homepage.png")
    if os.path.exists(hero_img_path):
        story.append(Image(hero_img_path, width=460, height=220))
        story.append(Spacer(1, 15))

    # Metadata Box
    meta_data = [
        [Paragraph("<b>Project Domain:</b>", table_text), Paragraph("AI & Environmental Sustainability", table_text)],
        [Paragraph("<b>Primary SDG:</b>", table_text), Paragraph("SDG 12 — Responsible Consumption & Production (Target 12.5)", table_text)],
        [Paragraph("<b>Secondary SDG:</b>", table_text), Paragraph("SDG 11 — Sustainable Cities & Communities", table_text)],
        [Paragraph("<b>AI Architecture:</b>", table_text), Paragraph("IBM Granite watsonx.ai Integration + Deterministic Rule-Based Fallback", table_text)],
        [Paragraph("<b>Implementation:</b>", table_text), Paragraph("Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4", table_text)],
        [Paragraph("<b>GitHub Repository:</b>", table_text), Paragraph("<font color='#2563eb'>https://github.com/pdharv711/Ecosort-campus</font>", table_text)],
        [Paragraph("<b>Documentation Type:</b>", table_text), Paragraph("Working Prototype Technical Report & Evaluation Evidence", table_text)],
    ]
    meta_table = Table(meta_data, colWidths=[140, 340])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(meta_table)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: PROBLEM STATEMENT
    # =========================================================================
    story.append(Paragraph("1. Campus Waste Crisis & Problem Definition", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "University campuses are dynamic ecosystems functioning as micro-cities. With hundreds or thousands of students, "
        "faculty, and campus mess workers interacting daily, substantial waste is generated across academic blocks, "
        "hostels, chemistry laboratories, and cafeterias. However, high-traffic disposal stations suffer from acute "
        "segregation breakdown.",
        body_style
    ))

    # Callout for baseline problem assumption
    prob_box = Table([[
        Paragraph(
            "<b>Project Baseline Observation (from Project PPT):</b><br/>"
            "<i>'Over 60% of recyclable materials on campus end up in landfills due to cross-contamination in high-traffic bins.'</i><br/>"
            "<font size='8' color='#475569'>* Note: Presented as an educational baseline problem statement from the initial campus survey and project PPT concept, rather than an experimentally measured municipal statistic.</font>",
            callout_style
        )
    ]], colWidths=[490])
    prob_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#eff6ff")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#bfdbfe")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(prob_box)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Key Campus Inefficiencies & Pain Points:", h2_style))
    story.append(Paragraph("• <b>Convenience Disposal:</b> In crowded cafeterias and lecture halls, individuals discard unsegregated mixed trash into whichever receptacle is closest.", bullet_style))
    story.append(Paragraph("• <b>Batch Contamination by Greasy Items:</b> A single unwashed disposable food tray or oily samosa butter-paper placed in a dry recycling bin ruins whole batches of clean paper pulp.", bullet_style))
    story.append(Paragraph("• <b>Static Signage Failure:</b> Printed posters affixed over dustbins cannot answer dynamic, context-specific questions (e.g., 'Is a greasy parcel recyclable?' or 'Where do tape-sealed 9V cells go?').", bullet_style))
    story.append(Paragraph("• <b>Frontline Sanitation Risks:</b> Housekeeping and sanitation workers routinely suffer lacerations and chemical exposures from unsegregated broken beaker glassware and dead batteries.", bullet_style))

    story.append(Spacer(1, 8))
    story.append(Paragraph("Alignment with United Nations Sustainable Development Goals:", h2_style))
    
    sdg_table_data = [
        [Paragraph("<b>UN SDG</b>", table_header), Paragraph("<b>Target & Relevance to EcoSort Campus</b>", table_header)],
        [
            Paragraph("<b>SDG 12: Responsible Consumption and Production</b><br/><font color='#16a34a' size='7.5'>(Primary Focus)</font>", table_text),
            Paragraph("Directly addresses <b>Target 12.5</b>: By substantially reducing waste generation through prevention, reduction, recycling, and reuse. By providing decision-support at source, recyclables are preserved in uncontaminated states.", table_text)
        ],
        [
            Paragraph("<b>SDG 11: Sustainable Cities and Communities</b><br/><font color='#2563eb' size='7.5'>(Secondary Focus)</font>", table_text),
            Paragraph("Addresses institutional sustainability footprints. Efficient campus waste segregation reduces municipal landfill burden and builds lifelong environmental consciousness in future professionals.", table_text)
        ]
    ]
    sdg_table = Table(sdg_table_data, colWidths=[160, 330])
    sdg_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_GREEN),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(sdg_table)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: PROPOSED AI SOLUTION
    # =========================================================================
    story.append(Paragraph("2. Proposed AI Solution & Technical Concept", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "<b>EcoSort Campus</b> is an interactive, web-based decision-support assistant designed to leverage natural language "
        "processing (NLP) and zero-shot entity extraction with <b>IBM Granite foundation models</b>. Rather than relying on "
        "rigid keyword lookup or static posters, the user inputs natural descriptions of ambiguous waste items, and the system "
        "resolves the material substrate, evaluates contamination potential, applies campus-specific norms, and enforces safety guardrails.",
        body_style
    ))

    story.append(Paragraph("End-to-End Decision Support Pipeline:", h2_style))
    pipeline_data = [
        [Paragraph("<b>Step</b>", table_header), Paragraph("<b>Pipeline Stage</b>", table_header), Paragraph("<b>Function in EcoSort Campus</b>", table_header)],
        [Paragraph("1", table_text), Paragraph("User Input", table_text), Paragraph("Free-form text describing waste item and condition (e.g., 'oily samosa wrapper')", table_text)],
        [Paragraph("2", table_text), Paragraph("Prompt Pipeline", table_text), Paragraph("Contextualized system prompt framing Indian campus norms, safety rules & JSON schema", table_text)],
        [Paragraph("3", table_text), Paragraph("Entity Extraction", table_text), Paragraph("Decomposes item into physical substrate (PET, Borosilicate, Alkaline, Grease-paper)", table_text)],
        [Paragraph("4", table_text), Paragraph("Bin Classification", table_text), Paragraph("Maps substrate to one of 4 campus bins: Green, Blue, Red, or Black", table_text)],
        [Paragraph("5", table_text), Paragraph("Hazard Guardrails", table_text), Paragraph("Screens for toxic chemicals, fire risks, biological waste, or sharp hazards", table_text)],
        [Paragraph("6", table_text), Paragraph("Actionable Guidance", table_text), Paragraph("Delivers concrete preparation instructions, safety warnings & transparent reasoning", table_text)]
    ]
    pipeline_table = Table(pipeline_data, colWidths=[35, 120, 335])
    pipeline_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_GREEN),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(pipeline_table)
    story.append(Spacer(1, 12))

    story.append(Paragraph("AI Architecture & Dual-Mode Reliability Strategy:", h2_style))
    story.append(Paragraph(
        "A critical engineering requirement for campus utilities is fault tolerance. EcoSort Campus implements a "
        "<b>hybrid backend pipeline</b> in <code>lib/ai.ts</code> and <code>app/api/classify/route.ts</code>:",
        body_style
    ))
    story.append(Paragraph(
        "• <b>Live IBM Granite Engine (watsonx.ai):</b> When <code>GRANITE_API_KEY</code> and <code>GRANITE_API_URL</code> "
        "are configured in <code>.env.local</code>, the server dispatches a structured chat completion request to IBM's "
        "<code>ibm/granite-3-3-8b-instruct</code> model with temperature 0.1 for high-precision JSON compliance.",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>Deterministic Rule-Based Fallback Engine:</b> To guarantee uninterrupted demonstration, offline resilience, "
        "and evaluation reliability without external API dependencies, the system seamlessly fails over to an internal "
        "deterministic classification engine (<code>lib/wasteRules.ts</code>) that mirrors the identical JSON contract without exposing errors.",
        bullet_style
    ))
    story.append(Paragraph(
        "• <b>Zero-Secrets Client Contract:</b> All AI communication occurs exclusively server-side via Next.js App Router API routes; "
        "no API keys or credentials ever reach the client's browser bundle.",
        bullet_style
    ))

    # Item 1 Requirement Note
    story.append(Spacer(1, 4))
    arch_note_box = Table([[
        Paragraph(
            "<b>Implementation Note on AI Execution:</b><br/>"
            "The prototype includes IBM Granite watsonx.ai integration, with a deterministic rule-based fallback available for demonstration and offline operation. The documented benchmark results were verified using the available prototype classification pipeline.",
            callout_style
        )
    ]], colWidths=[490])
    arch_note_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#86efac")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(arch_note_box)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: HOW THE WORKING PROTOTYPE WORKS
    # =========================================================================
    story.append(Paragraph("3. Working Prototype: User Journey & Interfaces", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "The EcoSort Campus web application is built with a responsive mobile-first architecture. Below is the documented "
        "user flow as tested in the running prototype environment:",
        body_style
    ))

    # User steps
    story.append(Paragraph("<b>Step 1: Item Entry & Suggestion Discovery</b>", h2_style))
    story.append(Paragraph(
        "The user lands on the hero section displaying the institutional badge, the four-bin color code, and a text input. "
        "Users can either type custom descriptions or click any of the 8 quick-chips (e.g., 'Oily samosa wrapper', 'Wet chai cup', 'Clean cardboard box').",
        body_style
    ))

    hero_bins_img = os.path.join(SCREENSHOTS_DIR, "02_hero_bins.png")
    if os.path.exists(hero_bins_img):
        story.append(Image(hero_bins_img, width=470, height=190))
        story.append(Paragraph("Figure 1: EcoSort Campus Main Hero Interface with Campus Bin Legend & Input Form", caption_style))

    story.append(Paragraph("<b>Step 2: Prototype Classification & Structured Response</b>", h2_style))
    story.append(Paragraph(
        "Upon clicking '🔍 Analyse Waste', an animated loading state appears while the backend processes the item. "
        "The UI then auto-scrolls to display the color-coded result card containing material diagnosis, bin destination, "
        "preparation steps, safety warnings, and contextual reasoning.",
        body_style
    ))

    result_pet_img = os.path.join(SCREENSHOTS_DIR, "03_result_pet_bottle.png")
    if os.path.exists(result_pet_img):
        story.append(Image(result_pet_img, width=470, height=220))
        story.append(Paragraph("Figure 2: Verified Prototype Classification Result for 'Crushed PET soft drink bottle' (Blue Bin / Dry Recyclable)", caption_style))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 5: SYSTEM ARCHITECTURE & AI WORKFLOW
    # =========================================================================
    story.append(Paragraph("4. Technical System Architecture", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "The architecture is intentionally lightweight, performant, and secure. Built using the modern <b>Next.js 16</b> "
        "App Router with React 19, TypeScript, and Tailwind CSS v4, the system achieves sub-second local rendering.",
        body_style
    ))

    # Architecture Diagram Table
    arch_flow = [
        [Paragraph("<b>Layer</b>", table_header), Paragraph("<b>Component / File</b>", table_header), Paragraph("<b>Role & Technical Execution</b>", table_header)],
        [
            Paragraph("Presentation", table_text),
            Paragraph("<code>app/page.tsx</code><br/><code>components/WasteInput.tsx</code><br/><code>components/ClassificationResult.tsx</code>", table_text),
            Paragraph("Client-side React 19 UI with dynamic theme colors, form validation, error handling, quick examples, and recent history tracker.", table_text)
        ],
        [
            Paragraph("API Gateway", table_text),
            Paragraph("<code>app/api/classify/route.ts</code>", table_text),
            Paragraph("Server-side Next.js HTTP POST handler. Validates payload length (&lt;500 chars), sanitizes input, and routes to AI client.", table_text)
        ],
        [
            Paragraph("AI Integration", table_text),
            Paragraph("<code>lib/ai.ts</code>", table_text),
            Paragraph("Orchestrates IBM Granite API calls via watsonx.ai REST interface. Handles token authorization, JSON regex extraction, and fallback triggers.", table_text)
        ],
        [
            Paragraph("Knowledge Base & Fallback", table_text),
            Paragraph("<code>lib/wasteRules.ts</code>", table_text),
            Paragraph("Defines TypeScript interfaces, color hex mappings, campus category definitions, and fallback rule matrix covering common campus waste.", table_text)
        ],
        [
            Paragraph("Security & Config", table_text),
            Paragraph("<code>.env.example</code><br/><code>.gitignore</code>", table_text),
            Paragraph("Encapsulates <code>GRANITE_API_URL</code>, <code>GRANITE_API_KEY</code>, and <code>GRANITE_MODEL</code>. Prevents key exposure to git.", table_text)
        ]
    ]
    arch_table = Table(arch_flow, colWidths=[80, 150, 260])
    arch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_GREEN),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(arch_table)
    story.append(Spacer(1, 12))

    story.append(Paragraph("JSON Schema Specification Returned by Classification Pipeline:", h2_style))
    json_spec = """{
  "item": "Crushed PET soft drink bottle",
  "material": "PET Plastic #1",
  "category": "Dry / Recyclable",
  "bin": "blue",
  "preparation": "Empty all liquid completely. Squash the bottle flat to save bin volume.",
  "warning": "None. Ensure the bottle is completely empty before recycling.",
  "explanation": "PET (Polyethylene Terephthalate) plastic #1 is one of the most widely recycled plastics..."
}"""
    story.append(Paragraph(f"<font face='Courier' size='8' color='#1e293b'>{json_spec.replace(chr(10), '<br/>&nbsp;&nbsp;')}</font>", ParagraphStyle('CodeBlock', parent=styles['Normal'], backColor=colors.HexColor("#f1f5f9"), borderPadding=8, spaceAfter=10)))

    how_works_img = os.path.join(SCREENSHOTS_DIR, "08_how_it_works.png")
    if os.path.exists(how_works_img):
        story.append(Image(how_works_img, width=470, height=190))
        story.append(Paragraph("Figure 3: Interactive 'How EcoSort Works' Workflow Pipeline rendered on the live UI", caption_style))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 6: CAMPUS BIN CLASSIFICATION (Item 6 Correction)
    # =========================================================================
    story.append(Paragraph("5. Campus Bin Classification System", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "EcoSort Campus categorizes all institutional waste streams into four distinct color-coded receptacles "
        "aligned with the project's defined campus waste-management categories and operational requirements:",
        body_style
    ))

    bin_data = [
        [Paragraph("<b>Bin Receptacle</b>", table_header), Paragraph("<b>Category</b>", table_header), Paragraph("<b>Target Materials & Examples</b>", table_header), Paragraph("<b>Handling & Preparation Instructions</b>", table_header)],
        [
            Paragraph("<font color='#16a34a'><b>GREEN BIN</b></font><br/>🌿 #16a34a", table_text),
            Paragraph("<b>Wet / Compost</b>", table_text),
            Paragraph("Food scraps, peelings, tea bags, clay kulhad cups, greasy food parcels, soiled butter-paper, oily samosa wrappers.", table_text),
            Paragraph("Tear off clean dry paper borders for recycling. Place food residue and grease-soaked paper into composting stream.", table_text)
        ],
        [
            Paragraph("<font color='#2563eb'><b>BLUE BIN</b></font><br/>♻️ #2563eb", table_text),
            Paragraph("<b>Dry / Recyclable</b>", table_text),
            Paragraph("Clean PET bottles (#1), HDPE containers, aluminium beverage cans, clean corrugated cardboard, notebooks, paper reams.", table_text),
            Paragraph("Empty all residual liquids completely. Squash bottles flat and flatten cardboard cartons to preserve bin volume.", table_text)
        ],
        [
            Paragraph("<font color='#dc2626'><b>RED BIN</b></font><br/>⚡ #dc2626", table_text),
            Paragraph("<b>E-Waste / Hazardous</b>", table_text),
            Paragraph("9V/AA/AAA alkaline cells, lithium batteries, dead cables, PCB boards, chemistry lab reagents, fluorescent tubes.", table_text),
            Paragraph("Tape battery terminals with cello-tape to prevent short-circuits. Keep separate in designated e-waste drop boxes.", table_text)
        ],
        [
            Paragraph("<font color='#1c1917'><b>BLACK BIN</b></font><br/>🚫 #1c1917", table_text),
            Paragraph("<b>Reject / Sanitary</b>", table_text),
            Paragraph("Broken glass beakers, test tubes, thermocol (expanded polystyrene), sanitary pads, bandages, unrecyclable laminates.", table_text),
            Paragraph("Wrap broken glass securely in thick newspaper/cardboard and label clearly to protect frontline workers.", table_text)
        ]
    ]

    bin_table = Table(bin_data, colWidths=[90, 95, 155, 150])
    bin_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_GREEN),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#f0fdf4")),
        ('BACKGROUND', (0,2), (-1,2), colors.HexColor("#eff6ff")),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor("#fef2f2")),
        ('BACKGROUND', (0,4), (-1,4), colors.HexColor("#f5f5f4")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(bin_table)
    story.append(Spacer(1, 14))

    story.append(Paragraph("Contamination Prevention Logic:", h2_style))
    story.append(Paragraph(
        "A cornerstone of the EcoSort prompt logic is enforcing that <b>grease invalidates recyclability</b>. "
        "While clean paper belongs in the Blue Bin, food oil irreversibly contaminates recycling slurry. Thus, "
        "oil-stained papers are strictly redirected to the Green Compost Bin.",
        body_style
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 7: PROTOTYPE EVALUATION & BENCHMARK TEST CASES (Item 2 Correction)
    # =========================================================================
    story.append(Paragraph("6. Prototype Evaluation & Benchmark Test Cases", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "Four reference test cases defined in the original project presentation were executed against the working "
        "EcoSort Campus prototype to verify classification, bin assignment, and safety guidance:",
        body_style
    ))

    test_cases_summary = [
        [Paragraph("<b>#</b>", table_header), Paragraph("<b>Test Case Input</b>", table_header), Paragraph("<b>Material Detected</b>", table_header), Paragraph("<b>Assigned Bin</b>", table_header), Paragraph("<b>Safety / Contamination Warning</b>", table_header)],
        [
            Paragraph("1", table_text),
            Paragraph("<b>Oily samosa wrapper</b>", table_text),
            Paragraph("Soiled Paper / Food Waste", table_text),
            Paragraph("<font color='#16a34a'><b>GREEN</b> (Wet/Compost)</font>", table_text),
            Paragraph("Food oil contaminates paper recycling streams — do NOT place greasy items in blue dry bin.", table_text)
        ],
        [
            Paragraph("2", table_text),
            Paragraph("<b>Crushed PET soft drink bottle</b>", table_text),
            Paragraph("PET Plastic #1", table_text),
            Paragraph("<font color='#2563eb'><b>BLUE</b> (Dry/Recycle)</font>", table_text),
            Paragraph("None. Ensure bottle is completely empty before recycling.", table_text)
        ],
        [
            Paragraph("3", table_text),
            Paragraph("<b>Electronics lab 9V dead battery</b>", table_text),
            Paragraph("Alkaline / Zinc Battery", table_text),
            Paragraph("<font color='#dc2626'><b>RED</b> (Hazardous E-Waste)</font>", table_text),
            Paragraph("⚠️ HAZARDOUS: Chemical leak and fire risk. Tape terminals with cello-tape.", table_text)
        ],
        [
            Paragraph("4", table_text),
            Paragraph("<b>Broken glass chemistry beaker</b>", table_text),
            Paragraph("Borosilicate Glass / Broken Glass", table_text),
            Paragraph("<font color='#1c1917'><b>BLACK</b> (Sanitary/Reject)</font>", table_text),
            Paragraph("⚠️ SHARP HAZARD: Poses severe cut risk to sanitation workers. Wrap securely.", table_text)
        ]
    ]

    tc_table = Table(test_cases_summary, colWidths=[20, 120, 110, 100, 140])
    tc_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_GREEN),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(tc_table)
    story.append(Spacer(1, 10))

    # Show live screenshots of Hazardous Battery and Broken Glass
    img_battery = os.path.join(SCREENSHOTS_DIR, "04_result_battery_hazardous.png")
    if os.path.exists(img_battery):
        story.append(Image(img_battery, width=470, height=200))
        story.append(Paragraph("Figure 4: Verified Prototype Output for '9V dead battery' featuring explicit hazard warnings & terminal taping instructions", caption_style))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 8: RESPONSIBLE AI
    # =========================================================================
    story.append(Paragraph("7. Responsible AI Framework & Ethics", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "Responsible AI is not an auxiliary feature of EcoSort Campus — it is the architectural foundation. "
        "In sustainability applications, AI recommendations directly affect community health and worker safety. "
        "The prototype adheres to six foundational principles:",
        body_style
    ))

    resp_principles = [
        [
            Paragraph("⚖️ <b>Fairness & Regional Inclusion:</b>", table_text),
            Paragraph("Designed around Indian university and street-food realities (samosa wrappers, chai cups, clay kulhad, steel thali paper) rather than exclusively Western packaging.", table_text)
        ],
        [
            Paragraph("🔍 <b>Transparency & Reasoning:</b>", table_text),
            Paragraph("The system rejects black-box classification. Every decision is paired with an educational explanation explaining <i>why</i> the material is designated to that specific bin.", table_text)
        ],
        [
            Paragraph("🔒 <b>Privacy & Zero Data Retention:</b>", table_text),
            Paragraph("Zero personal data is harvested. No student IDs, names, telemetry, or camera feeds are captured or retained. Text items are analyzed ephemerally in memory.", table_text)
        ],
        [
            Paragraph("🦺 <b>Frontline Worker Safety:</b>", table_text),
            Paragraph("Proactive safety guardrails detect sharps, biohazards, and chemical risks, mandating wrapping and tape-sealing to protect vulnerable campus sanitation personnel.", table_text)
        ],
        [
            Paragraph("🏛️ <b>Institutional Precedence:</b>", table_text),
            Paragraph("A persistent system disclaimer reinforces that local municipal and university environmental policies supersede general algorithmic suggestions.", table_text)
        ],
        [
            Paragraph("🎓 <b>Education Over Automation:</b>", table_text),
            Paragraph("Builds lifelong sorting intuition by teaching users how to handle edge cases rather than creating passive dependency.", table_text)
        ]
    ]

    resp_table = Table(resp_principles, colWidths=[150, 340])
    resp_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(resp_table)
    story.append(Spacer(1, 10))

    resp_ai_img = os.path.join(SCREENSHOTS_DIR, "09_responsible_ai.png")
    if os.path.exists(resp_ai_img):
        story.append(Image(resp_ai_img, width=470, height=200))
        story.append(Paragraph("Figure 5: Responsible AI Section rendered directly in the EcoSort Campus application", caption_style))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 9: PROTOTYPE SCREENSHOTS (GALLERY OF REAL UI)
    # =========================================================================
    story.append(Paragraph("8. Prototype Interface Verification Gallery", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "The following screenshots were captured automatically via automated headless browser interaction "
        "with the running EcoSort Campus web prototype (Node.js/Next.js on localhost:3000):",
        body_style
    ))

    img_glass = os.path.join(SCREENSHOTS_DIR, "05_result_broken_glass_black.png")
    if os.path.exists(img_glass):
        story.append(Image(img_glass, width=470, height=210))
        story.append(Paragraph("Figure 6: Verified Prototype Output for 'Broken glass chemistry beaker' with Sharp Hazard Worker Warning & Black Bin Assignment", caption_style))

    story.append(Spacer(1, 6))

    img_samosa = os.path.join(SCREENSHOTS_DIR, "06_result_samosa_green.png")
    if os.path.exists(img_samosa):
        story.append(Image(img_samosa, width=470, height=210))
        story.append(Paragraph("Figure 7: Verified Prototype Output for 'Oily samosa wrapper' redirecting grease-contaminated paper to Green Compost Bin", caption_style))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 10: TESTING & RESULTS (Items 1, 3, 4 Corrections)
    # =========================================================================
    story.append(Paragraph("9. Verification & Testing Matrix", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "Prototype verification testing was conducted against the Next.js API endpoint (<code>/api/classify</code>) "
        "and client UI form controls. Below is the verified test log:",
        body_style
    ))

    test_matrix = [
        [Paragraph("<b>Test Case</b>", table_header), Paragraph("<b>Input String</b>", table_header), Paragraph("<b>Expected Category & Bin</b>", table_header), Paragraph("<b>Actual Output Bin</b>", table_header), Paragraph("<b>Warning Output</b>", table_header), Paragraph("<b>Status</b>", table_header)],
        [
            Paragraph("TC-01", table_text),
            Paragraph("Oily samosa wrapper", table_text),
            Paragraph("Wet / Compost (Green)", table_text),
            Paragraph("Green (#16a34a)", table_text),
            Paragraph("Food oil contamination warning", table_text),
            Paragraph("<font color='#16a34a'><b>PASS</b></font>", table_text)
        ],
        [
            Paragraph("TC-02", table_text),
            Paragraph("Crushed PET soft drink bottle", table_text),
            Paragraph("Dry / Recyclable (Blue)", table_text),
            Paragraph("Blue (#2563eb)", table_text),
            Paragraph("None (Safe normal recycling)", table_text),
            Paragraph("<font color='#16a34a'><b>PASS</b></font>", table_text)
        ],
        [
            Paragraph("TC-03", table_text),
            Paragraph("Electronics lab 9V dead battery", table_text),
            Paragraph("Hazardous E-Waste (Red)", table_text),
            Paragraph("Red (#dc2626)", table_text),
            Paragraph("Chemical leak & fire hazard", table_text),
            Paragraph("<font color='#16a34a'><b>PASS</b></font>", table_text)
        ],
        [
            Paragraph("TC-04", table_text),
            Paragraph("Broken glass chemistry beaker", table_text),
            Paragraph("Sanitary / Reject (Black)", table_text),
            Paragraph("Black (#1c1917)", table_text),
            Paragraph("Sharp cut hazard for workers", table_text),
            Paragraph("<font color='#16a34a'><b>PASS</b></font>", table_text)
        ],
        [
            Paragraph("TC-05", table_text),
            Paragraph("<i>[Empty Input Submission]</i>", table_text),
            Paragraph("Validation Error Prompt", table_text),
            Paragraph("Blocked (400 Bad Request)", table_text),
            Paragraph("'Please enter a waste item'", table_text),
            Paragraph("<font color='#16a34a'><b>PASS</b></font>", table_text)
        ],
        [
            Paragraph("TC-06", table_text),
            Paragraph("<i>[Exceeding 500 characters]</i>", table_text),
            Paragraph("Input Length Guardrail", table_text),
            Paragraph("Blocked (400 Bad Request)", table_text),
            Paragraph("Length limit error triggered", table_text),
            Paragraph("<font color='#16a34a'><b>PASS</b></font>", table_text)
        ]
    ]

    tm_table = Table(test_matrix, colWidths=[35, 110, 115, 80, 110, 40])
    tm_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_GREEN),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(tm_table)
    story.append(Spacer(1, 8))

    # Item 4: Testing limitation note
    story.append(Paragraph(
        "<b>Note:</b> These tests verify prototype behavior against selected reference inputs and do not represent a statistically significant accuracy evaluation or production-scale validation.",
        ParagraphStyle('TestLimitation', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=8, leading=11, textColor=colors.HexColor("#4b5563"))
    ))
    story.append(Spacer(1, 6))

    img_examples = os.path.join(SCREENSHOTS_DIR, "07_examples_section.png")
    if os.path.exists(img_examples):
        story.append(Image(img_examples, width=470, height=180))
        story.append(Paragraph("Figure 8: Interactive Benchmark Test Cases Section allowing one-click evaluation of all four categories", caption_style))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 11: EXPECTED IMPACT (Item 5 Corrections)
    # =========================================================================
    story.append(Paragraph("10. Projected / Estimated Impact & Campus Value", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "The long-term objective of EcoSort Campus is to transition university waste operations from reactive landfill disposal "
        "to proactive source segregation. The project slide deck establishes conceptual pilot projections for campus deployment:",
        body_style
    ))

    # Impact Highlight Box
    impact_box_data = [[
        Paragraph(
            "<font size='11' color='#065f46'><b>Projected / Estimated Impact (From Project Concept):</b></font><br/>"
            "<i>'A pilot projection across a 3,000-student university campus indicates an estimated <b>70.2% overall diversion</b> "
            "of municipal solid waste away from local landfills within 60 days of deployment.'</i><br/><br/>"
            "<font size='8' color='#475569'><b>Important Note on Methodology:</b> The 70.2% figure represents a conceptual model projection "
            "from the project ideation phase and has not been validated through a physical campus deployment. It is not an experimentally measured result.</font>",
            callout_style
        )
    ]]
    impact_box = Table(impact_box_data, colWidths=[490])
    impact_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#ecfdf5")),
        ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor("#a7f3d0")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(impact_box)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Illustrative Stream-Specific Pilot Projections (3,000-Student Pilot):", h2_style))
    stream_data = [
        [Paragraph("<b>Campus Waste Stream</b>", table_header), Paragraph("<b>Projected Segregation</b>", table_header), Paragraph("<b>Operational Focus</b>", table_header)],
        [
            Paragraph("<b>Campus Cafeteria Plastics</b>", table_text),
            Paragraph("<font color='#16a34a'><b>82% Segregated (Projected)</b></font>", table_text),
            Paragraph("Reduction in food grease cross-contamination; PET bottles compressed and clean.", table_text)
        ],
        [
            Paragraph("<b>Hostel Dry Paper & Boxes</b>", table_text),
            Paragraph("<font color='#2563eb'><b>76% Segregated (Projected)</b></font>", table_text),
            Paragraph("E-commerce delivery cardboard flattened and preserved in dry state for recycling.", table_text)
        ],
        [
            Paragraph("<b>Mess Food Waste</b>", table_text),
            Paragraph("<font color='#ca8a04'><b>68% Composted (Projected)</b></font>", table_text),
            Paragraph("Organic scraps systematically routed to campus aerobic compost pits.", table_text)
        ],
        [
            Paragraph("<b>Departmental & Lab E-Waste</b>", table_text),
            Paragraph("<font color='#dc2626'><b>55% Segregated (Projected)</b></font>", table_text),
            Paragraph("Dead batteries and components diverted to authorized e-waste dismantling facilities.", table_text)
        ]
    ]
    stream_table = Table(stream_data, colWidths=[150, 110, 230])
    stream_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_GREEN),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(stream_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "<b>Important Note:</b> These values are conceptual projections from the project ideation phase and have not been validated through a physical campus deployment.",
        ParagraphStyle('ImpactDisclaimer', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=8, leading=11, textColor=colors.HexColor("#4b5563"))
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 12: CONCLUSION & FUTURE SCOPE
    # =========================================================================
    story.append(Paragraph("11. Conclusion & Future Roadmap", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceAfter=12))

    story.append(Paragraph(
        "<b>Conclusion:</b> EcoSort Campus demonstrates that purposeful, lightweight AI workflows can transform "
        "everyday student habits into measurable environmental progress. By combining <b>IBM Granite foundation models</b>, "
        "prompt engineering, entity extraction, and strict responsible AI principles, the prototype successfully bridges "
        "the gap between static signage and dynamic real-world disposal dilemmas.",
        body_style
    ))

    story.append(Paragraph("Planned Future Enhancements (Future Scope):", h2_style))
    story.append(Paragraph("• <b>Multimodal Computer Vision:</b> Integrating IBM Granite Vision or camera-based image classification to allow students to snap pictures of unidentifiable items directly at bin stations.", bullet_style))
    story.append(Paragraph("• <b>Multilingual Campus Localization:</b> Extending natural language prompts into Hindi, Tamil, Telugu, and other regional languages to accommodate diverse student and contractor demographics.", bullet_style))
    story.append(Paragraph("• <b>IoT Bin-Level Telemetry:</b> Integrating ultrasonic fill-level sensors inside physical bins to alert sanitation crews when recyclables reach 80% capacity.", bullet_style))
    story.append(Paragraph("• <b>Campus Analytics Dashboard:</b> Providing campus estate officers with aggregated heatmaps of contamination hot-spots across academic vs. residential zones.", bullet_style))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Repository & Prototype Resources:", h2_style))

    resource_data = [
        [Paragraph("<b>Resource</b>", table_header), Paragraph("<b>Link / Location</b>", table_header)],
        [Paragraph("<b>GitHub Repository:</b>", table_text), Paragraph("<font color='#2563eb'>https://github.com/pdharv711/Ecosort-campus</font>", table_text)],
        [Paragraph("<b>Documentation PDF:</b>", table_text), Paragraph("<code>docs/EcoSort_Campus_Prototype_Documentation.pdf</code>", table_text)],
        [Paragraph("<b>Local Execution:</b>", table_text), Paragraph("<code>git clone https://github.com/pdharv711/Ecosort-campus.git && npm install && npm run dev</code>", table_text)],
        [Paragraph("<b>Primary Contact / Author:</b>", table_text), Paragraph("Patel Dharv (GitHub: pdharv711)", table_text)],
        [Paragraph("<b>Internship Program:</b>", table_text), Paragraph("AI for Sustainability Virtual Internship 2026 (AICTE / 1M1B / IBM)", table_text)]
    ]
    res_table = Table(resource_data, colWidths=[150, 340])
    res_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_GREEN),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(res_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[SUCCESS] Generated PDF documentation: {PDF_PATH}")

if __name__ == "__main__":
    create_documentation_pdf()
