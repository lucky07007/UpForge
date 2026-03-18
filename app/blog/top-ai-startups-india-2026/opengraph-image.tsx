// app/blog/top-ai-startups-india-2026/opengraph-image.tsx
// ─────────────────────────────────────────────────────────────────────────────
// OG image for /blog/top-ai-startups-india-2026
// Design: UpForge brand — #F5F1E8 parchment, #1A1208 ink, Playfair serif
// Replaces the plain black template from the brief with editorial branding
// ─────────────────────────────────────────────────────────────────────────────
import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt     = "Top AI Startups in India 2026 — UpForge"
export const size    = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%",
          background: "#F5F1E8",
          display: "flex", flexDirection: "column",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 6, background: "linear-gradient(90deg,#92400E,#D97706,#2563EB,#D97706,#92400E)", flexShrink: 0 }} />

        {/* Background dot grid */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexWrap: "wrap", gap: 44, padding: 22, opacity: 0.12 }}>
          {Array.from({ length: 300 }).map((_, i) => (
            <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "#2563EB" }} />
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 72px 0", position: "relative" }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#1A1208", padding: "6px 16px" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#93C5FD" }} />
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", fontFamily: "system-ui" }}>
                AI & Deep Tech
              </span>
            </div>
            <div style={{ height: 1, flex: 1, background: "#C8C2B4" }} />
            <span style={{ fontSize: 13, color: "#8C7D65", fontFamily: "system-ui", letterSpacing: "0.1em" }}>UpForge · March 2026</span>
          </div>

          {/* Title */}
          <div style={{ fontSize: 72, fontWeight: 900, color: "#1A1208", lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: 24, maxWidth: 860 }}>
            Top AI Startups
            <span style={{ display: "block", color: "#2563EB" }}>in India</span>
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: 28, color: "#5A4A30", fontStyle: "italic", lineHeight: 1.4, maxWidth: 700, marginBottom: 40 }}>
            2026 Updated List — Sarvam, Krutrim, Darwinbox, Qure.ai & more
          </div>

          {/* Stat pills */}
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { v: "3,000+", l: "AI Startups" },
              { v: "₹10,000Cr", l: "Govt AI Investment" },
              { v: "12+", l: "Verified Profiles" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#1A1208", padding: "10px 20px", display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#93C5FD", fontFamily: "Georgia,serif" }}>{s.v}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "0.18em", fontFamily: "system-ui" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ background: "#1A1208", padding: "14px 72px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, marginTop: 32 }}>
          <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", fontFamily: "system-ui" }}>
            UPFORGE
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "system-ui", letterSpacing: "0.1em" }}>
            upforge.in/blog/top-ai-startups-india-2026
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
