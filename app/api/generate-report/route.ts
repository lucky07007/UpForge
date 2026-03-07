// app/api/generate-report/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.json();

  const year      = parseInt(form.foundedYear) || new Date().getFullYear();
  const ageYears  = new Date().getFullYear() - year;
  const ageMos    = Math.round(ageYears * 12);
  const hasRev    = form.currentRevenue &&
                    !form.currentRevenue.toLowerCase().includes("pre") &&
                    form.currentRevenue !== "₹0" &&
                    form.currentRevenue !== "0";
  const team      = parseInt(form.teamSize) || 2;
  const reportId  = Math.random().toString(36).substring(2, 10).toUpperCase();
  const today     = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

  // ── STEP 1: Web search for public data ────────────────────────────────────
  let webContext = "";
  let dataSourcesFound: string[] = [];
  let publicDataNote = "";

  try {
    const searchRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "interleaved-thinking-2025-05-14",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [
          {
            role: "user",
            content: `Search for public information about the Indian startup "${form.startupName}"${form.founderName ? ` founded by ${form.founderName}` : ""}${form.website ? ` (website: ${form.website})` : ""}. Find: (1) any news coverage, (2) funding announcements, (3) founder background, (4) product launches, (5) valuation mentions. Summarise in 150 words. If nothing found, say "No public data found."`,
          },
        ],
      }),
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const textBlocks = searchData.content?.filter((b: any) => b.type === "text") || [];
      webContext = textBlocks.map((b: any) => b.text).join(" ").substring(0, 800);

      if (!webContext.includes("No public data found") && webContext.length > 50) {
        dataSourcesFound = ["Web Search", "News Sources"];
        if (webContext.toLowerCase().includes("crunchbase")) dataSourcesFound.push("Crunchbase");
        if (webContext.toLowerCase().includes("inc42")) dataSourcesFound.push("Inc42");
        if (webContext.toLowerCase().includes("yourstory")) dataSourcesFound.push("YourStory");
        publicDataNote = "Live data retrieved — analysis reflects latest available information.";
      } else {
        webContext = "";
        publicDataNote = "No public data found. Analysis based entirely on provided information.";
      }
    }
  } catch {
    webContext = "";
    publicDataNote = "Web search unavailable. Analysis based on provided information.";
  }

  // ── STEP 2: Deep analysis with Groq ───────────────────────────────────────
  const systemPrompt = `You are a brutally honest, senior Indian startup analyst. Today: ${today}. Report ID: ${reportId}.

CRITICAL VALUATION RULES — NEVER VIOLATE:
1. Startups < 1 year old with ZERO revenue: Max valuation ₹20L–₹80L. NEVER say "₹1Cr+" for a brand new startup with no proof.
2. Startups 1–2 years old, pre-revenue: ₹50L–₹2Cr max, only if team is exceptional or market is red-hot.
3. Revenue-based valuation ONLY if revenue is confirmed: Use 3–8x ARR for Indian early-stage SaaS, 1–3x for other sectors.
4. ALWAYS state confidence level: "low" if no revenue, "medium" if revenue but unverified, "high" only if public data confirms.
5. If you are inflating numbers to please the founder, you are doing them harm. Be a doctor, not a cheerleader.

RISK RULES:
- Risks must be REAL and SPECIFIC to this startup's situation (age, team, revenue, competitors)
- Every risk needs a concrete, actionable mitigation — not generic advice
- For <1yr startups: "Idea-stage survival risk" is ALWAYS high
- For pre-revenue: "Zero revenue validation" is ALWAYS high risk

HONESTY RULES:
- If the startup is brand new with no traction, say so clearly. A founder who understands their real position makes better decisions.
- Do NOT use corporate-speak or consultant jargon. Write like a senior Indian investor giving honest feedback over chai.
- Web search data (if provided) takes priority over guesswork.

Public data found via web search:
${webContext || "None — no public information found for this startup."}

Return ONLY valid JSON matching this exact structure:
{
  "dataSourcesFound": ["string"],
  "publicDataNote": "string",
  "executiveSummary": "3-4 sentences, honest, specific to this startup",
  "valuationRange": {
    "low": "₹XX or $XX",
    "high": "₹XX or $XX",
    "midpoint": "₹XX or $XX",
    "methodology": "Explain exact method used — DCF, revenue multiple, Berkus, comparable rounds",
    "confidence": "low|medium|high",
    "confidenceNote": "Why this confidence level — be specific about what data is missing or present"
  },
  "scores": {
    "overall": 0-100,
    "market": 0-100,
    "team": 0-100,
    "product": 0-100,
    "traction": 0-100,
    "moat": 0-100,
    "financials": 0-100
  },
  "strengths": [
    {"title": "string", "detail": "2 sentences, specific to this startup"}
  ],
  "risks": [
    {"level": "high|medium|low", "title": "string", "detail": "specific risk for THIS startup", "mitigation": "concrete action, not generic advice"}
  ],
  "competitorAnalysis": [
    {"name": "string", "threat": "high|medium|low", "difference": "specific differentiation or lack thereof"}
  ],
  "marketOpportunity": {
    "tam": "₹XX or $XX — India-specific where possible",
    "sam": "₹XX or $XX",
    "som": "₹XX or $XX — realistic 12-18 month target",
    "insight": "2 sentences with India-specific market context"
  },
  "growthLevers": [
    {"lever": "string", "impact": "quantified if possible", "timeline": "specific weeks/months"}
  ],
  "focusAreas": [
    {"area": "string", "priority": "critical|high|medium", "action": "specific action in 1 sentence"}
  ],
  "investorReadiness": {
    "score": 0-100,
    "verdict": "Not Ready / Pre-Seed Stage / Seed Ready / Series A Ready",
    "improvements": ["specific improvement with context"]
  },
  "roadmap": [
    {"phase": "string", "timeline": "string", "goals": ["string"]}
  ],
  "benchmarks": [
    {"metric": "string", "startup": "string", "industry": "string", "verdict": "above|below|on-par"}
  ],
  "verdict": "3-4 sentences. Honest. Specific. What the founder most needs to hear right now.",
  "reportId": "${reportId}",
  "disclaimer": "This report is AI-generated using provided information and public data. Valuations are estimates only and not financial advice. Consult a qualified CA or financial advisor before making investment decisions."
}

ARRAY REQUIREMENTS: strengths=4 items, risks=4 items, competitorAnalysis=3-5 items, growthLevers=5 items, focusAreas=4 items, roadmap=3 phases, benchmarks=5 items.`;

  const userPrompt = `Startup: ${form.startupName}
Founder: ${form.founderName}
Founded: ${form.foundedYear} (${ageYears < 1 ? "less than 1 year ago" : `${ageYears} year(s) ago`})
Industry: ${form.industry}
City: ${form.city || "Not specified"}
Website: ${form.website || "Not provided"}
Description: ${form.description}
Target Market: ${form.targetMarket || "Not specified"}
Business Model: ${form.businessModel || "Not specified"}
Unique Advantage/Moat: ${form.uniqueAdvantage || "Not specified"}
Current Annual Revenue: ${form.currentRevenue || "Pre-revenue / Not specified"}
Team Size: ${team} people
Funding Stage: ${form.fundingStage || "Not specified"}
Total Funding Raised: ${form.fundingRaised || "None / Not specified"}
Key Competitors: ${form.keyCompetitors || "Not specified"}

${webContext ? `PUBLIC DATA FOUND:\n${webContext}` : "NO PUBLIC DATA FOUND — base analysis on provided info only."}

Generate a brutally honest, accurate analysis. Age of startup: ${ageYears < 1 ? "LESS THAN 1 YEAR — treat as idea stage" : `${ageYears} years`}. Revenue confirmed: ${hasRev ? "YES — use revenue multiples" : "NO — do not inflate valuation"}.`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 3500,
        response_format: { type: "json_object" },
      }),
    });

    if (!groqRes.ok) throw new Error(`Groq error: ${groqRes.status}`);
    const groqData = await groqRes.json();
    const raw      = groqData.choices?.[0]?.message?.content || "";
    const clean    = raw.replace(/```json|```/g, "").trim();
    const parsed   = JSON.parse(clean);

    // Inject web search data if AI didn't include it
    if (!parsed.dataSourcesFound?.length) parsed.dataSourcesFound = dataSourcesFound;
    if (!parsed.publicDataNote) parsed.publicDataNote = publicDataNote;
    if (!parsed.reportId) parsed.reportId = reportId;

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Report generation error:", err);
    return NextResponse.json({ error: "generation_failed" }, { status: 500 });
  }
}
