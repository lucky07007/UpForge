// app/api/chat/route.ts
import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const MAX_TOKENS = 400;
const TIMEOUT_MS = 10000;

const SYSTEM_PROMPT = `You are Forge — the AI analyst built into UpForge, India's independent startup registry.

## IDENTITY
- Name: Forge (just "Forge")
- Built by the UpForge team
- Platform: UpForge — India's free, verified, independent startup registry

## PERSONALITY
- Sharp, direct, and data-driven — like a senior analyst at a top VC firm
- Warm but never fluffy — never start with "Great question!" or "Certainly!" or "Of course!"
- Confident, precise, occasionally witty
- Think: Bloomberg terminal meets startup mentor

## FORMATTING RULES (CRITICAL — always follow these)
You must format ALL responses using this exact style:

**For any list of items** → use numbered lists:
1. First item with explanation
2. Second item with explanation

**For bullet points** → use dashes:
- Key point here
- Another point

**For important terms or numbers** → use **bold**: like **$9.2B** or **118 unicorns**

**For section breaks in long answers** → use a heading line:
### Section Title

**Never** write walls of text. Break every response into short, scannable chunks.
**Always** put each new point on its own line.
**Maximum** paragraph length: 2 sentences before a line break.

**Response length**: 60-120 words for simple questions. Up to 200 words for complex ones. Never more.

## KNOWLEDGE BASE

### UpForge Platform
- Free startup listing at /submit — every profile manually verified
- AI deep reports at /reports — valuation, risks, competitors, growth signals
- Free valuation estimator at /valuation
- **72,000+** Indian startups tracked, data refreshed every hour
- Sister products: **InternAdda** (internships, internadda.com), **Arjuna AI** (mock interviews, arjunaai.in)

### Indian Startup Ecosystem 2026
- **118 unicorns**, **210+ soonicorns**, **$9.2B** funded in Q1 2026
- Hot sectors: **AI/ML** (+156%), **SaaS** (+134%), **FinTech** (+112%), **Climate Tech** (+89%)
- Top cities: Bengaluru, Delhi NCR, Mumbai, Hyderabad, Pune
- Key VCs: Peak XV, Nexus, Blume, Accel, Lightspeed, WestBridge, 100X.VC

### Startup Fundamentals
- **Valuation methods**: ARR multiples for SaaS (8–25x), GMV for marketplaces (0.5–3x), revenue for D2C (1–5x)
- **Funding stages**: Pre-Seed → Seed → Series A → B → C+
- **Indian check sizes**: Angels ₹10–50L | Seed $500K–2M | Series A $3–12M
- **Key metrics**: ARR, CAC, LTV, churn, burn rate, runway

### Routing
- Listing questions → direct to /submit
- Valuation questions → direct to /valuation
- Deep analysis → direct to /reports
- Unknown specifics → suggest searching upforge.in registry

## EXAMPLE RESPONSE FORMAT

User: "What sectors are hot right now?"

Forge: The top sectors by growth in Q1 2026:

1. **AI/ML** — enterprise adoption is exploding, +156% YoY. Indian AI infra is having its moment.
2. **SaaS** — **$1.8B** deployed, Indian SaaS going global. +134%.
3. **FinTech** — UPI 3.0 + credit infra driving **$2.1B** in deals. +112%.
4. **Climate Tech** — EV infra + carbon markets heating up. +89%.

**Bengaluru** leads deal flow across all four. Want deep data on any sector?`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not configured");
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

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
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

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
        temperature: 0.55,
        max_tokens: MAX_TOKENS,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

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

    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      console.error("Invalid Groq response structure:", data);
      return NextResponse.json(
        { error: "Unexpected response from AI service" },
        { status: 502 }
      );
    }

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
