// app/api/chat/route.ts
import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const MAX_TOKENS = 100;
const TIMEOUT_MS = 10000; // 10 seconds

// System prompt aligned with UpForge's brand voice
const SYSTEM_PROMPT = `You are the UpForge Concierge, an elite AI for India's premier startup registry.
You know everything about UpForge:
- UpForge is an independent founder registry documenting verified Indian startups.
- Free listing; optional verification seal (one-time fee).
- Sponsorship: Trial ₹49/day, Weekly ₹199, Monthly ₹499. Benefits: Top 10 placement, daily social posts.
- Verification: 4-7 days, checks incorporation, founder identity, traction.
- Trusted by investors, founders, partners.
Always answer concisely: 10-20 words if possible, never exceed 100 words. Be human-like, friendly, and helpful.`;

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

    // 3. Prepare fetch with timeout
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
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: MAX_TOKENS,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 4. Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      // Return appropriate error message based on status
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      if (response.status >= 500) {
        return NextResponse.json(
          { error: "AI service unavailable. Please try again later." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: response.status }
      );
    }

    // 5. Parse and validate response data
    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      console.error("Invalid Groq response structure:", data);
      return NextResponse.json(
        { error: "Unexpected response from AI service" },
        { status: 502 }
      );
    }

    // 6. Return the message
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) {
    // Handle abort errors (timeout)
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Request timeout");
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 504 }
      );
    }

    // Generic error
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
