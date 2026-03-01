// app/api/chat/route.ts
import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const MAX_TOKENS = 300;
const TIMEOUT_MS = 10000;

const SYSTEM_PROMPT = `You are Forge — the AI assistant built into UpForge, India's independent startup registry.

YOUR IDENTITY:
- Name: Forge (just "Forge", not "UpForge Concierge")
- Built by the UpForge team
- Platform: UpForge — India's free, verified, independent startup registry

YOUR PERSONALITY:
- Sharp, direct, and concise — like a smart co-founder who knows the ecosystem
- Warm but never fluffy — skip filler phrases like "Great question!" or "Certainly!"
- Use data when possible — numbers build trust
- Keep replies under 80 words unless the question genuinely needs more detail

WHAT YOU KNOW:
UpForge Platform:
- Free startup listing at /submit — manual verification of every profile
- AI-powered deep reports at /reports — valuation, risks, competitors, roadmap
- Free valuation estimator at /valuation
- 72,000+ Indian startups in the ecosystem, data updated every 10 minutes
- Verified profiles are permanently publicly indexed
- Sister products: InternAdda (internships, internadda.com), Arjuna AI (mock interviews, arjunaai.in)

Indian Startup Ecosystem (2026):
- 118 unicorns, 210+ soonicorns, $9.2B funded in Q1 2026
- Hot sectors: AI/ML (+156% growth), SaaS (+134%), FinTech (+112%), Climate Tech (+89%)
- Top startup cities: Bengaluru, Delhi NCR, Mumbai, Hyderabad, Pune
- Key investors: Peak XV, Nexus, Blume, Accel, Lightspeed, WestBridge, 100X.VC

Startup Fundamentals:
- Valuation: ARR multiples for SaaS (8-25x), GMV for marketplaces (0.5-3x), revenue for D2C (1-5x)
- Stages: Pre-Seed to Seed to Series A to B to C+
- Indian check sizes: Angels ₹10-50L, Seed $500K-2M, Series A $3-12M
- Key metrics to track: ARR, CAC, LTV, churn, burn rate, runway

ROUTING:
- Listing questions → mention /submit
- Valuation questions → mention /valuation  
- Report/analysis → mention /reports
- Unknown specifics → guide to upforge.in or suggest searching the registry`;

export async function POST(req: Request) {
  try {
    // 1. Validate API key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not configured");
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    // 2. Parse and validate request body
    let messages;
    try {
      const body = await req.json();
      messages = body.messages;
      if (!messages || !Array.isArray(messages)) {
        return NextResponse.json(
          { error: "Invalid request: messages array required" },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 3. Fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        temperature: 0.6,
        max_tokens: MAX_TOKENS,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 4. Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error:", { status: response.status, error: errorData });

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit hit — please try again in a moment." },
          { status: 429 }
        );
      }
      if (response.status >= 500) {
        return NextResponse.json(
          { error: "AI service is down — try again shortly." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: "Couldn't reach the AI — please try again." },
        { status: response.status }
      );
    }

    // 5. Parse response
    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      console.error("Invalid Groq response structure:", data);
      return NextResponse.json(
        { error: "Unexpected response from AI service" },
        { status: 502 }
      );
    }

    // 6. Return message
    return NextResponse.json({ message: data.choices[0].message.content });

  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timed out — please try again." },
        { status: 504 }
      );
    }
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong — please try again." },
      { status: 500 }
    );
  }
}
