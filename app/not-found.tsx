"use client"

// app/not-found.tsx
// ─────────────────────────────────────────────────────────────────────────────
// UPFORGE 404 — Production-grade animated not-found page
//
// Design direction: "The Forge is cold here" — industrial, molten, authoritative.
// Uses the UpForge brand palette (#F3EFE5 bg, #0D9488 teal, #0F1A1C dark) with
// a custom SVG forge-anvil illustration that animates on mount.
//
// Animation stack (CSS-only, no JS libraries):
//   • Anvil SVG: fade-in + subtle float loop
//   • Sparks: 6 individual spark particles, staggered keyframe animations
//   • "404" numeral: clip-path reveal from bottom
//   • Subheading: fade-up with delay
//   • Body text: fade-in with longer delay
//   • Buttons: staggered slide-up
//   • Countdown: JS setInterval → redirects to "/" after 10s
//
// ACCESSIBILITY:
//   • prefers-reduced-motion: all animations disabled
//   • ARIA live region announces countdown
//   • Semantic h1 for 404, h2 for subheading
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from "react"
import Link from "next/link"

export default function NotFound() {
  const [seconds, setSeconds] = useState(10)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current!)
          window.location.href = "/"
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current!)
  }, [])

  return (
    <>
      <style>{`
        @keyframes floatAnvil {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes sparkA {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(-28px, -48px) scale(0); opacity: 0; }
        }
        @keyframes sparkB {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(18px, -52px) scale(0); opacity: 0; }
        }
        @keyframes sparkC {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(38px, -36px) scale(0); opacity: 0; }
        }
        @keyframes sparkD {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(-12px, -60px) scale(0); opacity: 0; }
        }
        @keyframes sparkE {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(48px, -44px) scale(0); opacity: 0; }
        }
        @keyframes sparkF {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(-44px, -32px) scale(0); opacity: 0; }
        }
        @keyframes revealUp {
          from { clip-path: inset(100% 0 0 0); opacity: 0; transform: translateY(16px); }
          to   { clip-path: inset(0% 0 0 0);   opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 6px #0D9488aa); }
          50%       { filter: drop-shadow(0 0 18px #0D9488ff); }
        }
        @keyframes progressBar {
          from { width: 100%; }
          to   { width: 0%; }
        }
        @keyframes orbitDot {
          from { transform: rotate(0deg) translateX(52px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
        }
        @keyframes orbitDot2 {
          from { transform: rotate(120deg) translateX(52px) rotate(-120deg); }
          to   { transform: rotate(480deg) translateX(52px) rotate(-480deg); }
        }
        @keyframes orbitDot3 {
          from { transform: rotate(240deg) translateX(52px) rotate(-240deg); }
          to   { transform: rotate(600deg) translateX(52px) rotate(-600deg); }
        }
        @keyframes ringPing {
          0%    { transform: scale(1); opacity: 0.5; }
          100%  { transform: scale(1.6); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .not-found-root *,
        .not-found-root *::before,
        .not-found-root *::after {
          box-sizing: border-box;
        }

        .not-found-root {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #F3EFE5;
          padding: 2rem 1.5rem;
          text-align: center;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* ── Ambient grain texture ─────────────────────────────────────── */
        .not-found-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }

        /* ── Illustration wrapper ──────────────────────────────────────── */
        .nf-illustration {
          position: relative;
          width: 200px;
          height: 200px;
          margin-bottom: 2rem;
          animation: fadeIn 0.6s ease both;
        }

        .nf-anvil-wrap {
          animation: floatAnvil 4s ease-in-out infinite;
          animation-delay: 0.8s;
          transform-origin: center;
        }

        /* ── Orbit ring ───────────────────────────────────────────────── */
        .nf-orbit-ring {
          position: absolute;
          inset: 24px;
          border-radius: 50%;
          border: 1.5px dashed #0D948840;
        }

        .nf-orbit-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0D9488;
          margin: -4px;
          animation: orbitDot 6s linear infinite;
        }
        .nf-orbit-dot:nth-child(2) {
          width: 5px; height: 5px;
          margin: -2.5px;
          background: #f97316;
          animation: orbitDot2 6s linear infinite;
        }
        .nf-orbit-dot:nth-child(3) {
          width: 6px; height: 6px;
          margin: -3px;
          background: #0F1A1C;
          animation: orbitDot3 6s linear infinite;
        }

        /* ── Ping ring ───────────────────────────────────────────────── */
        .nf-ping {
          position: absolute;
          inset: 30px;
          border-radius: 50%;
          border: 1.5px solid #0D9488;
          animation: ringPing 2.4s ease-out infinite;
        }
        .nf-ping:nth-child(2) {
          animation-delay: 0.8s;
          border-color: #0D948870;
        }

        /* ── Sparks ───────────────────────────────────────────────────── */
        .nf-spark {
          position: absolute;
          border-radius: 50%;
          animation-timing-function: ease-out;
          animation-iteration-count: infinite;
        }
        .nf-spark-a { width:5px; height:5px; background:#f97316; bottom:62px; left:88px; animation: sparkA 1.4s ease-out 0.3s infinite; }
        .nf-spark-b { width:4px; height:4px; background:#fbbf24; bottom:60px; left:100px; animation: sparkB 1.2s ease-out 0.6s infinite; }
        .nf-spark-c { width:3px; height:3px; background:#f97316; bottom:58px; left:116px; animation: sparkC 1.6s ease-out 0.1s infinite; }
        .nf-spark-d { width:4px; height:4px; background:#fbbf24; bottom:64px; left:108px; animation: sparkD 1.3s ease-out 0.9s infinite; }
        .nf-spark-e { width:3px; height:3px; background:#ef4444; bottom:60px; left:120px; animation: sparkE 1.1s ease-out 0.4s infinite; }
        .nf-spark-f { width:5px; height:5px; background:#f97316; bottom:56px; left:96px;  animation: sparkF 1.5s ease-out 0.7s infinite; }

        /* ── 404 numeral ─────────────────────────────────────────────── */
        .nf-404 {
          font-size: clamp(5rem, 18vw, 8rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #0F1A1C;
          font-family: 'Playfair Display', Georgia, serif;
          clip-path: inset(0);
          animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
          position: relative;
        }

        .nf-404-accent {
          color: #0D9488;
        }

        /* ── Heading ──────────────────────────────────────────────────── */
        .nf-h2 {
          font-size: clamp(1.125rem, 4vw, 1.375rem);
          font-weight: 700;
          color: #0D9488;
          margin-top: 0.5rem;
          letter-spacing: -0.01em;
          animation: fadeUp 0.6s ease 0.7s both;
        }

        /* ── Body ─────────────────────────────────────────────────────── */
        .nf-body {
          max-width: 380px;
          font-size: 0.9375rem;
          color: #4B5563;
          line-height: 1.7;
          margin-top: 1rem;
          animation: fadeUp 0.6s ease 0.9s both;
        }

        /* ── Buttons ──────────────────────────────────────────────────── */
        .nf-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 2rem;
          width: 100%;
          max-width: 360px;
        }
        @media (min-width: 480px) {
          .nf-actions { flex-direction: row; justify-content: center; }
        }

        .nf-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #0F1A1C;
          color: #F3EFE5;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.02em;
          padding: 0.75rem 1.75rem;
          border-radius: 999px;
          text-decoration: none;
          border: 2px solid #0F1A1C;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          animation: fadeUp 0.6s ease 1.1s both;
        }
        .nf-btn-primary:hover {
          background: #0D9488;
          border-color: #0D9488;
          transform: scale(1.04);
        }
        .nf-btn-primary:active { transform: scale(0.97); }

        .nf-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          color: #0F1A1C;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.02em;
          padding: 0.75rem 1.75rem;
          border-radius: 999px;
          text-decoration: none;
          border: 2px solid #0F1A1C;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          animation: fadeUp 0.6s ease 1.25s both;
        }
        .nf-btn-secondary:hover {
          background: #0F1A1C;
          color: #F3EFE5;
          transform: scale(1.04);
        }
        .nf-btn-secondary:active { transform: scale(0.97); }

        /* ── Progress bar ─────────────────────────────────────────────── */
        .nf-progress-wrap {
          margin-top: 2.5rem;
          width: 100%;
          max-width: 280px;
          animation: fadeIn 0.6s ease 1.4s both;
        }
        .nf-progress-label {
          font-size: 0.75rem;
          color: #9CA3AF;
          font-style: italic;
          margin-bottom: 0.5rem;
        }
        .nf-progress-track {
          height: 2px;
          background: #D1CFC9;
          border-radius: 999px;
          overflow: hidden;
        }
        .nf-progress-fill {
          height: 100%;
          background: #0D9488;
          border-radius: 999px;
          transition: width 1s linear;
        }

        /* ── Corner tag ────────────────────────────────────────────────── */
        .nf-tag {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0D9488;
          opacity: 0.5;
          animation: fadeIn 1s ease 1.6s both;
        }
      `}</style>

      <div className="not-found-root">
        <span className="nf-tag" aria-hidden="true">UpForge Registry</span>

        {/* ── Illustration ────────────────────────────────────────────── */}
        <div className="nf-illustration" aria-hidden="true">
          {/* Ping rings */}
          <div className="nf-ping" />
          <div className="nf-ping" />

          {/* Orbit ring + dots */}
          <div className="nf-orbit-ring">
            <div className="nf-orbit-dot" />
            <div className="nf-orbit-dot" />
            <div className="nf-orbit-dot" />
          </div>

          {/* Sparks */}
          <div className="nf-spark nf-spark-a" />
          <div className="nf-spark nf-spark-b" />
          <div className="nf-spark nf-spark-c" />
          <div className="nf-spark nf-spark-d" />
          <div className="nf-spark nf-spark-e" />
          <div className="nf-spark nf-spark-f" />

          {/* Anvil SVG — centered in the illustration area */}
          <div className="nf-anvil-wrap" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg
              width="120"
              height="110"
              viewBox="0 0 120 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Forge anvil illustration"
            >
              {/* Anvil body */}
              <rect x="18" y="38" width="84" height="36" rx="6" fill="#0F1A1C" />
              {/* Horn */}
              <path d="M18 54 L4 46 Q2 44 4 42 L18 44Z" fill="#0F1A1C" />
              {/* Top face — highlighted */}
              <rect x="22" y="32" width="72" height="10" rx="4" fill="#0D9488" />
              {/* Base */}
              <rect x="30" y="74" width="60" height="10" rx="4" fill="#1C3034" />
              <rect x="38" y="84" width="44" height="8" rx="4" fill="#0F1A1C" />
              {/* Highlight line on body */}
              <line x1="22" y1="46" x2="98" y2="46" stroke="#0D948860" strokeWidth="1.5" strokeLinecap="round" />
              {/* Strike mark (hammer dent) */}
              <path d="M52 36 L56 28 L60 36" stroke="#F3EFE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Glow dot at strike point */}
              <circle cx="56" cy="36" r="2.5" fill="#fbbf24" />
            </svg>
          </div>
        </div>

        {/* ── 404 ─────────────────────────────────────────────────────── */}
        <h1 className="nf-404" aria-label="404 — Page not found">
          4<span className="nf-404-accent">0</span>4
        </h1>

        <h2 className="nf-h2">This page is still in the forge</h2>

        <p className="nf-body">
          We&apos;re hammering out this part of the registry. The page you&apos;re looking for
          doesn&apos;t exist yet — or may have moved.
        </p>

        {/* ── Actions ─────────────────────────────────────────────────── */}
        <div className="nf-actions">
          <Link href="/" className="nf-btn-primary">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M7.5 1L1 7.5H3.5V14H6.5V10H8.5V14H11.5V7.5H14L7.5 1Z" fill="currentColor"/>
            </svg>
            Back to Home
          </Link>
          <Link href="/startup" className="nf-btn-secondary">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M6.5 2.5L2 7.5L6.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="2" y1="7.5" x2="13" y2="7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Browse Registry
          </Link>
        </div>

        {/* ── Countdown progress bar ────────────────────────────────── */}
        <div
          className="nf-progress-wrap"
          role="status"
          aria-live="polite"
          aria-label={`Redirecting to home in ${seconds} seconds`}
        >
          <p className="nf-progress-label">
            Redirecting to home in {seconds}s…
          </p>
          <div className="nf-progress-track">
            <div
              className="nf-progress-fill"
              style={{ width: `${(seconds / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
