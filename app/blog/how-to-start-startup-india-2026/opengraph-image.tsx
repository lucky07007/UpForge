// app/blog/how-to-start-startup-india-2026/opengraph-image.tsx
// ─────────────────────────────────────────────────────────────────────────────
// OG image for /blog/how-to-start-startup-india-2026
// Design: UpForge brand — parchment + amber step badge + editorial layout
// ─────────────────────────────────────────────────────────────────────────────
import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt     = "How to Start a Startup in India 2026 — UpForge"
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
        <div style={{ height: 6, background: "linear-gradient(90deg,#92400E,#D97706,#E8C547,#D97706,#92400E)", flexShrink: 0 }} />

        {/* Background grid — step numbers */}
        <div style={{ position: "absolute", right: 60, top: 40, opacity: 0.04, display: "flex", flexDirection: "column", gap: 8 }}>
          {["01","02","03","04","05","06"].map(n => (
            <span key={n} style={{ fontSize: 72, fontWeight: 900, color: "#1A1208", lineHeight: 1 }}>{n}</span>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 72px 0", position: "relative" }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ background: "#D97706", padding: "6px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", color: "#1A1208", fontFamily: "system-ui" }}>
                Founder Playbook
              </span>
            </div>
            <div style={{ height: 1, flex: 1, background: "#C8C2B4" }} />
            <span style={{ fontSize: 13, color: "#8C7D65", fontFamily: "system-ui", letterSpacing: "0.1em" }}>UpForge · 2026</span>
          </div>

          {/* Title */}
          <div style={{ fontSize: 66, fontWeight: 900, color: "#1A1208", lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: 20, maxWidth: 800 }}>
            How to Start a
            <span style={{ display: "block", color: "#D97706" }}>Startup in India</span>
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: 26, color: "#5A4A30", fontStyle: "italic", lineHeight: 1.4, maxWidth: 680, marginBottom: 36 }}>
            Step-by-Step Guide 2026 — Idea to Funding, the complete playbook
          </div>

          {/* Step pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              "Find Idea", "Validate", "Build MVP",
              "Register", "First 100 Users", "Raise Funding",
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #C8C2B4",
                  padding: "7px 14px",
                  display: "flex", alignItems: "center", gap: 8,
                  background: "#FDFCF9",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 900, color: "#D97706", fontFamily: "system-ui" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1208", fontFamily: "system-ui", letterSpacing: "0.08em" }}>
                  {s}
                </span>
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
            upforge.in/blog/how-to-start-startup-india-2026
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
