// app/api/generate-report/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.json();

  const prompt = `You are a top-tier startup analyst and investor. Analyse the following startup and return a comprehensive, data-rich JSON report. Use real Indian market data, sector benchmarks, and startup ecosystem knowledge.

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

Return ONLY this JSON (no markdown, no explanation):
{
  "reportId": "random 8-char alphanumeric",
  "executiveSummary": "3-4 sentence powerful executive summary that reads like a Goldman Sachs analyst note — specific, confident, data-backed",
  
  "valuationRange": {
    "low": "valuation in ₹Cr or $M (use appropriate based on stage)",
    "midpoint": "most likely valuation",
    "high": "optimistic valuation",
    "methodology": "explain the valuation method used: multiples used, comparable deals referenced, adjustments made"
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
    {"title": "strength title", "detail": "2-3 sentence specific explanation with data/reasoning"}
  ],
  
  "risks": [
    {"level": "high/medium/low", "title": "risk title", "detail": "specific risk description", "mitigation": "concrete mitigation strategy"}
  ],
  
  "competitorAnalysis": [
    {"name": "competitor name", "threat": "high/medium/low", "difference": "how this startup differentiates"}
  ],
  
  "marketOpportunity": {
    "tam": "Total Addressable Market in $B or ₹Cr",
    "sam": "Serviceable Addressable Market",
    "som": "Serviceable Obtainable Market (3-year realistic)",
    "insight": "2-3 sentence market intelligence paragraph with growth rates and trends"
  },
  
  "growthLevers": [
    {"lever": "specific growth lever", "impact": "quantified expected impact", "timeline": "realistic timeline"}
  ],
  
  "focusAreas": [
    {"area": "focus area name", "priority": "critical/high/medium", "action": "specific actionable recommendation"}
  ],
  
  "investorReadiness": {
    "score": 0-100,
    "verdict": "1 line verdict like 'Seed Ready' or 'Pre-Seed with 3-month runway needed'",
    "improvements": ["specific improvement action 1", "improvement 2", "improvement 3", "improvement 4", "improvement 5"]
  },
  
  "roadmap": [
    {"phase": "Phase 1: [Name]", "timeline": "0-90 days", "goals": ["goal 1", "goal 2", "goal 3", "goal 4"]},
    {"phase": "Phase 2: [Name]", "timeline": "90 days - 1 year", "goals": ["goal 1", "goal 2", "goal 3", "goal 4"]},
    {"phase": "Phase 3: [Name]", "timeline": "1-3 years", "goals": ["goal 1", "goal 2", "goal 3", "goal 4"]}
  ],
  
  "benchmarks": [
    {"metric": "metric name", "startup": "this startup's position", "industry": "industry average", "verdict": "above/below/on-par"}
  ],
  
  "verdict": "2-3 sentence final verdict — specific, honest, forward-looking. This is what a Sequoia partner would say in a partner meeting. Name the startup, reference the sector, give a clear directional opinion."
}

Requirements:
- Make all numbers realistic for Indian startup ecosystem in 2026
- Reference actual sector trends (AI, FinTech, D2C etc as applicable)
- Valuation must use proper methodologies: ARR multiples for SaaS (8-25x), GMV multiples for marketplaces (0.5-3x), revenue multiples for D2C (1-5x), cost-to-build for pre-revenue
- Give 4 strengths, 4 risks, 3-5 competitors (infer from industry if not provided), 5 growth levers, 5 focus areas, 5 investor readiness improvements, 5 benchmarks
- Make the language sharp, specific, and valuable — not generic`;

  try {
    const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          { role: "system", content: "You are a world-class startup analyst. Return only valid JSON, no markdown, no code blocks." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 4000,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    const report = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
