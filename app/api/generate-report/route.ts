// app/api/generate-report/route.ts
import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const TIMEOUT_MS = 30000;

export async function POST(req: NextRequest) {
  // 1. Validate API key
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY not configured");
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  // 2. Parse body
  let form: Record<string, string>;
  try {
    form = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const prompt = `You are a top-tier startup analyst. Analyse the following Indian startup and return a comprehensive JSON report. Use real Indian market data, sector benchmarks, and 2026 ecosystem knowledge.

STARTUP DATA:
- Name: ${form.startupName}
- Founder: ${form.founderName}${form.coFounders ? `, Co-founders: ${form.coFounders}` : ""}
- Founded: ${form.foundedYear}
- Industry: ${form.industry}
- City: ${form.city || "India"}
- Website: ${form.website || "Not provided"}
- Description: ${form.description}
- Problem Solved: ${form.problemSolved || "Not specified"}
- Target Market: ${form.targetMarket || "Not specified"}
- Business Model: ${form.businessModel || "Not specified"}
- Current Revenue: ${form.currentRevenue || "Pre-revenue"}
- Team Size: ${form.teamSize || "Not specified"}
- Funding Stage: ${form.fundingStage || "Not specified"}
- Funding Raised: ${form.fundingRaised || "None"}
- Key Competitors: ${form.keyCompetitors || "Not specified"}
- Unique Advantage: ${form.uniqueAdvantage || "Not specified"}
- Social Media: ${form.socialMedia || "Not provided"}

Return ONLY valid JSON — no markdown, no code blocks, no explanation. Exactly this structure:
{
  "reportId": "random 8-char alphanumeric string",
  "executiveSummary": "3-4 sentence executive summary like a Goldman Sachs analyst note — specific, confident, data-backed",
  "valuationRange": {
    "low": "floor valuation in rupees crore or USD millions",
    "midpoint": "most likely valuation",
    "high": "optimistic valuation",
    "methodology": "explain method: multiples used, comparables, adjustments"
  },
  "scores": {
    "overall": 72,
    "market": 75,
    "team": 68,
    "product": 70,
    "traction": 65,
    "moat": 62,
    "financials": 60
  },
  "strengths": [
    {"title": "strength title", "detail": "2-3 sentence explanation with data and reasoning"},
    {"title": "strength 2", "detail": "explanation"},
    {"title": "strength 3", "detail": "explanation"},
    {"title": "strength 4", "detail": "explanation"}
  ],
  "risks": [
    {"level": "high", "title": "risk title", "detail": "specific description", "mitigation": "concrete strategy"},
    {"level": "medium", "title": "risk 2", "detail": "description", "mitigation": "strategy"},
    {"level": "medium", "title": "risk 3", "detail": "description", "mitigation": "strategy"},
    {"level": "low", "title": "risk 4", "detail": "description", "mitigation": "strategy"}
  ],
  "competitorAnalysis": [
    {"name": "competitor", "threat": "high", "difference": "differentiation"},
    {"name": "competitor 2", "threat": "medium", "difference": "differentiation"},
    {"name": "competitor 3", "threat": "medium", "difference": "differentiation"},
    {"name": "competitor 4", "threat": "low", "difference": "differentiation"}
  ],
  "marketOpportunity": {
    "tam": "total addressable market figure",
    "sam": "serviceable addressable market",
    "som": "realistic 3-year obtainable market",
    "insight": "2-3 sentence market intelligence with growth rates and India-specific trends"
  },
  "growthLevers": [
    {"lever": "lever name", "impact": "quantified impact", "timeline": "timeframe"},
    {"lever": "lever 2", "impact": "impact", "timeline": "timeframe"},
    {"lever": "lever 3", "impact": "impact", "timeline": "timeframe"},
    {"lever": "lever 4", "impact": "impact", "timeline": "timeframe"},
    {"lever": "lever 5", "impact": "impact", "timeline": "timeframe"}
  ],
  "focusAreas": [
    {"area": "area name", "priority": "critical", "action": "specific actionable recommendation"},
    {"area": "area 2", "priority": "high", "action": "recommendation"},
    {"area": "area 3", "priority": "high", "action": "recommendation"},
    {"area": "area 4", "priority": "medium", "action": "recommendation"},
    {"area": "area 5", "priority": "medium", "action": "recommendation"}
  ],
  "investorReadiness": {
    "score": 65,
    "verdict": "one line verdict like Seed Ready or Pre-Seed stage",
    "improvements": ["improvement 1", "improvement 2", "improvement 3", "improvement 4", "improvement 5"]
  },
  "roadmap": [
    {"phase": "Phase 1: Foundation", "timeline": "0-90 days", "goals": ["goal 1", "goal 2", "goal 3", "goal 4"]},
    {"phase": "Phase 2: Traction", "timeline": "90 days - 1 year", "goals": ["goal 1", "goal 2", "goal 3", "goal 4"]},
    {"phase": "Phase 3: Scale", "timeline": "1-3 years", "goals": ["goal 1", "goal 2", "goal 3", "goal 4"]}
  ],
  "benchmarks": [
    {"metric": "metric name", "startup": "startup value", "industry": "industry average", "verdict": "above"},
    {"metric": "metric 2", "startup": "value", "industry": "average", "verdict": "on-par"},
    {"metric": "metric 3", "startup": "value", "industry": "average", "verdict": "below"},
    {"metric": "metric 4", "startup": "value", "industry": "average", "verdict": "above"},
    {"metric": "metric 5", "startup": "value", "industry": "average", "verdict": "on-par"}
  ],
  "verdict": "2-3 sentence final verdict as a Sequoia partner would say — name the startup, reference the sector, give a clear honest directional opinion"
}

Rules:
- All numbers realistic for India 2026 startup ecosystem
- Valuation: SaaS ARR multiples 8-25x, marketplace GMV 0.5-3x, D2C revenue 1-5x, pre-revenue use cost-to-build
- scores must be integers between 0 and 100
- level in risks must be exactly: "high", "medium", or "low"
- threat in competitorAnalysis must be exactly: "high", "medium", or "low"
- verdict in benchmarks must be exactly: "above", "below", or "on-par"
- Return pure JSON only — no text before or after the JSON object`;

  // 3. Fetch with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a world-class startup analyst for India. Return ONLY a valid JSON object — no markdown code fences, no explanation, no text before or after. Start your response with { and end with }.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 4000,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 4. Handle HTTP errors
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("GROQ error:", response.status, errData);

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit hit — please wait a moment and try again." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "AI service error — please try again." },
        { status: 503 }
      );
    }

    // 5. Parse response safely
    const data = await response.json();
    const raw: string = data.choices?.[0]?.message?.content ?? "";

    if (!raw) {
      console.error("Empty GROQ response:", data);
      return NextResponse.json({ error: "Empty response from AI" }, { status: 502 });
    }

    // Strip markdown fences if model includes them despite instructions
    const cleaned = raw
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let report: Record<string, unknown>;
    try {
      report = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse failed. Raw:\n", cleaned.substring(0, 500));
      return NextResponse.json(
        { error: "Report generation failed — invalid response format." },
        { status: 502 }
      );
    }

    return NextResponse.json(report);

  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Analysis timed out — please try again." },
        { status: 504 }
      );
    }

    console.error("generate-report error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
