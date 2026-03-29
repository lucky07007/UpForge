"use client"
// components/verify-client.tsx
// Full client-side UFRN verification experience
// Animated world map → lookup → result card → certificate

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface StartupRecord {
  id: string
  name: string
  slug: string
  ufrn: string
  description?: string | null
  founders?: string | null
  founded_year?: number | null
  category?: string | null
  city?: string | null
  country_code?: string | null
  status: string
  logo_url?: string | null
  website?: string | null
  funding_stage?: string | null
  funding_amount?: number | null
  is_featured?: boolean
  created_at?: string
  updated_at?: string
}

type Phase = "idle" | "searching" | "found" | "notfound" | "error"

// ─── PROPS ───────────────────────────────────────────────────────────────────
interface VerifyClientProps {
  totalCount: number
  isOrg: boolean
}

// ─── PARTICLE DOTS for world map feel ────────────────────────────────────────
const DOTS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}))

// Rough world landmass dots (normalized 0–100)
const LANDMASS_DOTS = [
  // North America
  { x: 14, y: 28 }, { x: 18, y: 32 }, { x: 22, y: 30 }, { x: 16, y: 38 }, { x: 20, y: 42 },
  { x: 25, y: 35 }, { x: 28, y: 40 }, { x: 22, y: 48 }, { x: 19, y: 52 }, { x: 24, y: 55 },
  // South America
  { x: 26, y: 58 }, { x: 28, y: 62 }, { x: 30, y: 68 }, { x: 27, y: 72 }, { x: 29, y: 76 },
  { x: 31, y: 65 }, { x: 25, y: 64 },
  // Europe
  { x: 46, y: 24 }, { x: 50, y: 26 }, { x: 48, y: 30 }, { x: 52, y: 28 }, { x: 54, y: 32 },
  { x: 56, y: 27 }, { x: 44, y: 28 }, { x: 58, y: 30 },
  // Africa
  { x: 48, y: 42 }, { x: 50, y: 48 }, { x: 52, y: 54 }, { x: 48, y: 58 }, { x: 50, y: 64 },
  { x: 46, y: 50 }, { x: 54, y: 46 }, { x: 52, y: 62 },
  // Asia
  { x: 64, y: 26 }, { x: 68, y: 28 }, { x: 72, y: 32 }, { x: 76, y: 30 }, { x: 80, y: 34 },
  { x: 66, y: 38 }, { x: 70, y: 42 }, { x: 74, y: 38 }, { x: 78, y: 26 }, { x: 82, y: 28 },
  { x: 68, y: 34 }, { x: 72, y: 40 }, { x: 76, y: 44 }, { x: 80, y: 40 },
  // India
  { x: 70, y: 46 }, { x: 72, y: 50 }, { x: 68, y: 52 }, { x: 70, y: 56 },
  // Southeast Asia
  { x: 78, y: 48 }, { x: 80, y: 52 }, { x: 82, y: 48 }, { x: 84, y: 44 },
  // Australia
  { x: 82, y: 62 }, { x: 86, y: 64 }, { x: 84, y: 68 }, { x: 80, y: 66 }, { x: 88, y: 60 },
  // Russia
  { x: 62, y: 20 }, { x: 68, y: 18 }, { x: 74, y: 20 }, { x: 80, y: 18 }, { x: 86, y: 22 },
]

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export function VerifyClient({ totalCount, isOrg }: VerifyClientProps) {
  const [input, setInput]         = useState("")
  const [phase, setPhase]         = useState<Phase>("idle")
  const [result, setResult]       = useState<StartupRecord | null>(null)
  const [ping, setPing]           = useState<{ x: number; y: number } | null>(null)
  const [scanLines, setScanLines] = useState<number[]>([])
  const [copied, setCopied]       = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // ── Animate scan lines on searching ──────────────────────────────────────
  useEffect(() => {
    if (phase !== "searching") { setScanLines([]); return }
    let frame = 0
    const interval = setInterval(() => {
      frame++
      setScanLines(prev => {
        const next = [...prev, Math.random() * 100]
        return next.slice(-6)
      })
    }, 180)
    return () => clearInterval(interval)
  }, [phase])

  // ── UFRN Lookup ───────────────────────────────────────────────────────────
  const handleVerify = useCallback(async () => {
    const raw = input.trim().toUpperCase()
    if (!raw) return

    // Accept with or without "UFRN-" prefix
    const ufrn = raw.startsWith("UFRN-") ? raw : `UFRN-${raw}`

    setPhase("searching")
    setResult(null)
    setPing(null)

    // Animate ping to a "random" location after 1.2s
    setTimeout(() => {
      setPing({ x: 55 + Math.random() * 30, y: 30 + Math.random() * 30 })
    }, 1200)

    try {
      const sb = createClient()
      const { data, error } = await sb
        .from("startups")
        .select("id,name,slug,ufrn,description,founders,founded_year,category,city,country_code,status,logo_url,website,funding_stage,funding_amount,is_featured,created_at,updated_at")
        .eq("ufrn", ufrn)
        .eq("status", "approved")
        .single()

      await new Promise(r => setTimeout(r, 1800)) // min animation time

      if (error || !data) {
        setPhase("notfound")
        setPing(null)
      } else {
        setResult(data as StartupRecord)
        setPhase("found")
      }
    } catch {
      setPhase("error")
      setPing(null)
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleVerify()
  }

  const handleReset = () => {
    setPhase("idle")
    setResult(null)
    setPing(null)
    setInput("")
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(`https://www.upforge.org/verify?ufrn=${result.ufrn}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatFunding = (amt: number | null | undefined) => {
    if (!amt) return null
    if (amt >= 1_000_000_000) return `$${(amt / 1_000_000_000).toFixed(1)}B`
    if (amt >= 1_000_000) return `$${(amt / 1_000_000).toFixed(1)}M`
    if (amt >= 1_000) return `$${(amt / 1_000).toFixed(0)}K`
    return `$${amt}`
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --ink: #0A0E1A;
          --ink2: #111827;
          --gold: #F59E0B;
          --gold2: #D97706;
          --emerald: #10B981;
          --red: #EF4444;
          --blue: #3B82F6;
          --parch: #FDFAF5;
          --rule: rgba(255,255,255,0.08);
          --rule2: rgba(255,255,255,0.14);
          --muted: rgba(255,255,255,0.45);
          --saffron: #FF9933;
          --green-in: #138808;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .vp-root {
          min-height: 100vh;
          background: var(--ink);
          font-family: 'Space Mono', monospace;
          position: relative;
          overflow-x: hidden;
        }

        /* ── GRAIN OVERLAY ── */
        .vp-root::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }

        /* ── TOP STRIPE ── */
        .vp-stripe {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%);
          z-index: 10;
        }

        /* ── NAVBAR ── */
        .vp-nav {
          position: relative; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 32px; border-bottom: 1px solid var(--rule);
        }
        .vp-nav-logo {
          font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900;
          color: white; text-decoration: none; letter-spacing: -0.02em;
        }
        .vp-nav-logo span { color: var(--gold); }
        .vp-nav-links { display: flex; gap: 24px; align-items: center; }
        .vp-nav-link {
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--muted); text-decoration: none; transition: color 0.2s;
        }
        .vp-nav-link:hover { color: white; }
        .vp-nav-link.active { color: var(--gold); }
        .vp-nav-submit {
          font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink); background: var(--gold); padding: 8px 16px; border-radius: 6px;
          text-decoration: none; transition: background 0.2s;
        }
        .vp-nav-submit:hover { background: #FBBF24; }

        /* ── HERO SECTION ── */
        .vp-hero {
          position: relative; z-index: 5;
          display: flex; flex-direction: column; align-items: center;
          padding: 64px 24px 48px;
          text-align: center;
        }
        .vp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 8px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 20px;
          border: 1px solid rgba(245,158,11,0.3); padding: 6px 16px; border-radius: 100px;
          background: rgba(245,158,11,0.06);
        }
        .vp-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--gold);
          animation: pulse2 2s infinite;
        }
        @keyframes pulse2 {
          0%   { box-shadow: 0 0 0 0 rgba(245,158,11,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(245,158,11,0); }
          100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
        }
        .vp-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 6vw, 72px); font-weight: 900;
          color: white; line-height: 1.05; letter-spacing: -0.03em;
          margin-bottom: 16px; max-width: 760px;
        }
        .vp-h1 em { color: var(--gold); font-style: italic; }
        .vp-sub {
          font-size: 13px; color: var(--muted); line-height: 1.7;
          max-width: 520px; margin-bottom: 48px;
        }

        /* ── WORLD MAP CONTAINER ── */
        .vp-map-wrap {
          position: relative; width: 100%; max-width: 900px;
          margin: 0 auto 48px; border-radius: 20px;
          border: 1px solid var(--rule2);
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          overflow: hidden;
          padding: 32px 24px 24px;
        }
        .vp-map-inner {
          position: relative; width: 100%; aspect-ratio: 2/1;
          min-height: 260px;
        }

        /* Dot grid */
        .vp-dot {
          position: absolute; border-radius: 50%;
          background: rgba(255,255,255,0.18);
          transition: all 0.3s ease;
        }
        .vp-dot.active {
          background: var(--gold);
          box-shadow: 0 0 8px var(--gold);
        }
        .vp-dot.scanning {
          animation: dotPulse 0.4s ease infinite alternate;
        }
        @keyframes dotPulse {
          from { background: rgba(245,158,11,0.3); transform: scale(1); }
          to   { background: var(--gold); transform: scale(1.4); box-shadow: 0 0 12px var(--gold); }
        }

        /* Scan lines */
        .vp-scanline {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent);
          pointer-events: none;
          animation: scanSlide 0.6s linear forwards;
        }
        @keyframes scanSlide {
          from { opacity: 0.8; }
          to   { opacity: 0; transform: scaleX(1.5); }
        }

        /* Ping animation */
        .vp-ping {
          position: absolute; transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .vp-ping-ring {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%; border: 2px solid var(--emerald);
          animation: pingExpand 1.5s ease-out infinite;
        }
        @keyframes pingExpand {
          0%  { width: 8px; height: 8px; opacity: 1; }
          100% { width: 60px; height: 60px; opacity: 0; }
        }
        .vp-ping-core {
          width: 12px; height: 12px; border-radius: 50%;
          background: var(--emerald);
          box-shadow: 0 0 20px var(--emerald);
          animation: pingPulse 1s ease-in-out infinite;
        }
        @keyframes pingPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.3); }
        }

        /* Grid lines on map */
        .vp-gridline-h, .vp-gridline-v {
          position: absolute; background: rgba(255,255,255,0.04); pointer-events: none;
        }
        .vp-gridline-h { left: 0; right: 0; height: 1px; }
        .vp-gridline-v { top: 0; bottom: 0; width: 1px; }

        /* Map overlay text */
        .vp-map-label {
          position: absolute; font-size: 7px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.2);
        }
        .vp-map-status {
          position: absolute; bottom: 0; left: 0; right: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 4px 0;
        }
        .vp-map-stat {
          font-size: 8px; color: rgba(255,255,255,0.25); letter-spacing: 0.15em; text-transform: uppercase;
        }
        .vp-map-stat span { color: rgba(255,255,255,0.55); }

        /* ── SEARCH BOX ── */
        .vp-search-wrap {
          width: 100%; max-width: 600px; margin: 0 auto;
        }
        .vp-search-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 12px; display: block; text-align: left;
        }
        .vp-search-row {
          display: flex; gap: 0; border: 1px solid var(--rule2);
          border-radius: 12px; overflow: hidden;
          background: rgba(255,255,255,0.04);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vp-search-row:focus-within {
          border-color: rgba(245,158,11,0.5);
          box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
        }
        .vp-prefix {
          display: flex; align-items: center; padding: 0 16px;
          font-size: 11px; font-weight: 700; color: var(--gold);
          border-right: 1px solid var(--rule2); white-space: nowrap;
          background: rgba(245,158,11,0.05);
        }
        .vp-input {
          flex: 1; background: transparent; border: none; outline: none;
          padding: 18px 20px; font-size: 15px; font-family: 'Space Mono', monospace;
          font-weight: 700; color: white; letter-spacing: 0.08em;
        }
        .vp-input::placeholder { color: rgba(255,255,255,0.18); font-weight: 400; letter-spacing: 0; }
        .vp-verify-btn {
          padding: 0 28px; background: var(--gold); border: none; cursor: pointer;
          font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink);
          transition: background 0.2s; flex-shrink: 0; white-space: nowrap;
        }
        .vp-verify-btn:hover:not(:disabled) { background: #FBBF24; }
        .vp-verify-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .vp-verify-btn.loading { background: rgba(245,158,11,0.2); color: var(--gold); }

        .vp-hint {
          margin-top: 10px; font-size: 10px; color: rgba(255,255,255,0.2);
          text-align: left;
        }
        .vp-hint a { color: rgba(255,255,255,0.35); text-decoration: underline; }

        /* ── LOADING STATE ── */
        .vp-loading {
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          padding: 48px 32px; animation: fadeIn 0.4s ease;
        }
        .vp-loader-ring {
          width: 56px; height: 56px; border-radius: 50%;
          border: 2px solid rgba(245,158,11,0.15);
          border-top-color: var(--gold);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .vp-loading-text {
          font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--gold);
        }
        .vp-loading-sub { font-size: 10px; color: var(--muted); }

        /* ── RESULT CARD ── */
        .vp-result {
          width: 100%; max-width: 700px; margin: 0 auto;
          animation: riseIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: none; }
        }

        .vp-result-header {
          border-radius: 16px 16px 0 0;
          background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 100%);
          border: 1px solid rgba(16,185,129,0.3); border-bottom: none;
          padding: 24px 28px; display: flex; align-items: flex-start; gap: 16px;
        }
        .vp-verified-icon {
          width: 48px; height: 48px; border-radius: 50%;
          background: linear-gradient(135deg, var(--emerald), #059669);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; box-shadow: 0 0 24px rgba(16,185,129,0.4);
        }
        .vp-verified-icon svg { width: 24px; height: 24px; }
        .vp-verified-title {
          font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--emerald); margin-bottom: 4px;
        }
        .vp-verified-h2 {
          font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 900;
          color: white; line-height: 1.2;
        }
        .vp-ufrn-badge {
          margin-left: auto; flex-shrink: 0;
          font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700;
          color: var(--gold); background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.3); padding: 6px 14px; border-radius: 6px;
          letter-spacing: 0.05em;
        }

        .vp-result-body {
          background: rgba(255,255,255,0.03); border: 1px solid var(--rule2); border-top: none;
          padding: 28px;
        }

        .vp-logo-row {
          display: flex; align-items: center; gap: 20px; margin-bottom: 24px;
          padding-bottom: 24px; border-bottom: 1px solid var(--rule);
        }
        .vp-logo {
          width: 72px; height: 72px; border-radius: 16px; border: 1px solid var(--rule2);
          background: rgba(255,255,255,0.06); object-fit: cover; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.25);
          overflow: hidden;
        }
        .vp-logo img { width: 100%; height: 100%; object-fit: cover; }
        .vp-logo-info { flex: 1; min-width: 0; }
        .vp-cat-badge {
          display: inline-block; font-size: 8px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--gold); background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2);
          padding: 3px 10px; border-radius: 4px; margin-bottom: 8px;
        }
        .vp-company-name {
          font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700;
          color: white; line-height: 1.2; margin-bottom: 4px;
        }
        .vp-founders { font-size: 11px; color: var(--muted); }

        .vp-fields {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;
        }
        @media (max-width: 560px) { .vp-fields { grid-template-columns: 1fr; } }
        .vp-field { display: flex; flex-direction: column; gap: 4px; }
        .vp-field-label {
          font-size: 8px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }
        .vp-field-val { font-size: 13px; color: white; font-weight: 700; }
        .vp-field-val.mono { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--gold); }
        .vp-field-val.green { color: var(--emerald); }
        .vp-field-val.muted { color: var(--muted); font-weight: 400; font-size: 12px; }

        .vp-desc {
          font-size: 12px; color: rgba(255,255,255,0.5); font-style: italic; line-height: 1.7;
          margin-bottom: 24px; padding: 16px; background: rgba(255,255,255,0.03);
          border-radius: 10px; border-left: 2px solid rgba(245,158,11,0.3);
        }

        .vp-actions {
          display: flex; gap: 12px; flex-wrap: wrap;
        }
        .vp-action-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 20px; border-radius: 10px; font-family: 'Space Mono', monospace;
          font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; text-decoration: none; border: 1px solid transparent;
        }
        .vp-action-primary {
          background: var(--emerald); color: white;
        }
        .vp-action-primary:hover { background: #059669; transform: translateY(-1px); }
        .vp-action-secondary {
          background: transparent; border-color: var(--rule2); color: var(--muted);
        }
        .vp-action-secondary:hover { border-color: white; color: white; }
        .vp-action-ghost {
          background: transparent; border-color: rgba(245,158,11,0.3); color: var(--gold);
        }
        .vp-action-ghost:hover { background: rgba(245,158,11,0.08); }

        /* ── CERTIFICATE STRIP ── */
        .vp-cert {
          border-radius: 0 0 16px 16px;
          background: linear-gradient(90deg, rgba(245,158,11,0.08), rgba(245,158,11,0.03));
          border: 1px solid rgba(245,158,11,0.2); border-top: none;
          padding: 16px 28px; display: flex; align-items: center; gap: 14px;
          flex-wrap: wrap;
        }
        .vp-cert-icon { font-size: 20px; flex-shrink: 0; }
        .vp-cert-text { flex: 1; }
        .vp-cert-title { font-size: 10px; font-weight: 700; color: var(--gold); margin-bottom: 2px; }
        .vp-cert-sub { font-size: 9px; color: rgba(255,255,255,0.3); }
        .vp-cert-hash { font-family: 'Space Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.2); }

        /* ── NOT FOUND ── */
        .vp-notfound {
          width: 100%; max-width: 580px; margin: 0 auto; text-align: center;
          padding: 48px 32px; border: 1px solid rgba(239,68,68,0.2); border-radius: 16px;
          background: rgba(239,68,68,0.04);
          animation: riseIn 0.4s ease both;
        }
        .vp-notfound-icon { font-size: 48px; margin-bottom: 16px; }
        .vp-notfound-h { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: white; margin-bottom: 8px; }
        .vp-notfound-p { font-size: 12px; color: var(--muted); line-height: 1.7; margin-bottom: 24px; }
        .vp-notfound-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 10px; background: transparent;
          border: 1px solid var(--rule2); color: var(--muted);
          font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer;
          transition: all 0.2s;
        }
        .vp-notfound-btn:hover { border-color: white; color: white; }

        /* ── STATS ROW ── */
        .vp-stats {
          display: flex; justify-content: center; gap: 48px; margin-top: 64px;
          padding-top: 64px; border-top: 1px solid var(--rule); flex-wrap: wrap;
        }
        .vp-stat { text-align: center; }
        .vp-stat-num {
          font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900;
          color: white; line-height: 1; margin-bottom: 6px;
        }
        .vp-stat-num span { color: var(--gold); }
        .vp-stat-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* ── HOWTO SECTION ── */
        .vp-howto {
          max-width: 900px; margin: 0 auto;
          padding: 64px 32px;
        }
        .vp-section-eyebrow {
          font-size: 9px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 16px; display: block;
        }
        .vp-section-h {
          font-family: 'Playfair Display', serif; font-size: clamp(26px, 4vw, 40px);
          font-weight: 900; color: white; margin-bottom: 12px; line-height: 1.1;
        }
        .vp-section-p { font-size: 13px; color: var(--muted); line-height: 1.7; margin-bottom: 40px; max-width: 520px; }

        .vp-steps {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
        }
        @media (max-width: 680px) { .vp-steps { grid-template-columns: 1fr; } }
        .vp-step {
          padding: 24px; border-radius: 14px;
          border: 1px solid var(--rule2); background: rgba(255,255,255,0.02);
          transition: border-color 0.2s, background 0.2s;
        }
        .vp-step:hover { border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.03); }
        .vp-step-num {
          font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 900;
          color: rgba(255,255,255,0.06); line-height: 1; margin-bottom: 12px;
        }
        .vp-step-h { font-size: 13px; font-weight: 700; color: white; margin-bottom: 8px; }
        .vp-step-p { font-size: 11px; color: var(--muted); line-height: 1.7; }

        /* ── FAQ ── */
        .vp-faq {
          max-width: 900px; margin: 0 auto;
          padding: 0 32px 80px;
        }
        .vp-faq-list { display: flex; flex-direction: column; gap: 1px; }
        .vp-faq-item {
          border-bottom: 1px solid var(--rule);
        }
        .vp-faq-q {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 0; gap: 16px; text-align: left;
        }
        .vp-faq-q-text { font-size: 13px; font-weight: 700; color: white; line-height: 1.4; }
        .vp-faq-q-icon {
          width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--rule2);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          color: var(--muted); font-size: 16px; transition: all 0.2s;
        }
        .vp-faq-item.open .vp-faq-q-icon { transform: rotate(45deg); border-color: var(--gold); color: var(--gold); }
        .vp-faq-a {
          font-size: 12px; color: var(--muted); line-height: 1.8;
          max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.2s;
        }
        .vp-faq-item.open .vp-faq-a { max-height: 300px; padding-bottom: 20px; }

        /* ── FOOTER ── */
        .vp-footer {
          border-top: 1px solid var(--rule);
          padding: 32px;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
          max-width: 1200px; margin: 0 auto;
        }
        .vp-footer-brand {
          font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700;
          color: white;
        }
        .vp-footer-brand span { color: var(--gold); }
        .vp-footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
        .vp-footer-link {
          font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); text-decoration: none; transition: color 0.2s;
        }
        .vp-footer-link:hover { color: white; }

        @media (max-width: 768px) {
          .vp-nav { padding: 16px 20px; }
          .vp-nav-links { display: none; }
          .vp-hero { padding: 48px 20px 32px; }
          .vp-map-wrap { padding: 20px 16px 16px; }
          .vp-howto, .vp-faq { padding-left: 20px; padding-right: 20px; }
          .vp-result-header { flex-direction: column; gap: 12px; }
          .vp-ufrn-badge { margin-left: 0; }
          .vp-result-body { padding: 20px; }
          .vp-cert { padding: 14px 20px; }
          .vp-stats { gap: 32px; }
        }
      `}</style>

      <div className="vp-root">
        <div className="vp-stripe" />

        {/* NAV */}
        <nav className="vp-nav">
          <Link href="/" className="vp-nav-logo">Up<span>Forge</span></Link>
          <div className="vp-nav-links">
            <Link href="/startup" className="vp-nav-link">Registry</Link>
            <Link href="/verify" className="vp-nav-link active">Verify UFRN</Link>
            <Link href="/blog" className="vp-nav-link">Blog</Link>
            <Link href="/about" className="vp-nav-link">About</Link>
            <Link href="/submit" className="vp-nav-submit">Submit Startup →</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="vp-hero">
          <div className="vp-eyebrow">
            <div className="vp-eyebrow-dot" />
            Official Verification Tool
          </div>
          <h1 className="vp-h1">
            Verify Any Startup's<br /><em>UFRN</em> Instantly
          </h1>
          <p className="vp-sub">
            The world's only independent startup identity system. Enter a UFRN to view
            the official registry record — founders, funding, category, and verification status.
          </p>

          {/* WORLD MAP */}
          <div className="vp-map-wrap">
            <div className="vp-map-inner">
              {/* Grid lines */}
              {[20, 40, 60, 80].map(y => (
                <div key={`h${y}`} className="vp-gridline-h" style={{ top: `${y}%` }} />
              ))}
              {[20, 40, 60, 80].map(x => (
                <div key={`v${x}`} className="vp-gridline-v" style={{ left: `${x}%` }} />
              ))}

              {/* Scan lines */}
              {scanLines.map((y, i) => (
                <div key={i} className="vp-scanline" style={{ top: `${y}%` }} />
              ))}

              {/* Landmass dots */}
              {LANDMASS_DOTS.map((d, i) => (
                <div
                  key={i}
                  className={`vp-dot${phase === "searching" ? " scanning" : ""}`}
                  style={{
                    left: `${d.x}%`, top: `${d.y}%`,
                    width: 4, height: 4,
                    animationDelay: phase === "searching" ? `${(i * 37) % 400}ms` : "0ms",
                    animationDuration: phase === "searching" ? `${0.3 + (i % 5) * 0.07}s` : "0s",
                  }}
                />
              ))}

              {/* Ping location marker */}
              {ping && (
                <div className="vp-ping" style={{ left: `${ping.x}%`, top: `${ping.y}%` }}>
                  <div className="vp-ping-ring" />
                  <div className="vp-ping-ring" style={{ animationDelay: "0.5s" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                    <div className="vp-ping-core" />
                  </div>
                </div>
              )}

              {/* Map region labels */}
              <span className="vp-map-label" style={{ left: "12%", top: "28%" }}>N. AMERICA</span>
              <span className="vp-map-label" style={{ left: "44%", top: "20%" }}>EUROPE</span>
              <span className="vp-map-label" style={{ left: "64%", top: "16%" }}>ASIA</span>
              <span className="vp-map-label" style={{ left: "44%", top: "40%" }}>AFRICA</span>
              <span className="vp-map-label" style={{ left: "80%", top: "60%" }}>AUSTRALIA</span>
            </div>

            {/* Map status bar */}
            <div className="vp-map-status">
              <span className="vp-map-stat">
                {phase === "searching" ? "🔍 Scanning registry…" : `✓ Registry Online · `}
                {phase !== "searching" && <span>{totalCount.toLocaleString()}+ Entries</span>}
              </span>
              <span className="vp-map-stat">upforge.org · <span>Global Registry</span></span>
            </div>
          </div>

          {/* SEARCH BOX */}
          <div className="vp-search-wrap">
            <label className="vp-search-label" htmlFor="ufrn-input">
              Enter UFRN to verify
            </label>
            <div className="vp-search-row">
              <span className="vp-prefix">UFRN —</span>
              <input
                ref={inputRef}
                id="ufrn-input"
                className="vp-input"
                type="text"
                placeholder="e.g. UFRN-001234"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={phase === "searching"}
                autoComplete="off"
                spellCheck={false}
                aria-label="UFRN Lookup Input"
              />
              <button
                className={`vp-verify-btn${phase === "searching" ? " loading" : ""}`}
                onClick={handleVerify}
                disabled={!input.trim() || phase === "searching"}
                aria-label="Verify UFRN"
              >
                {phase === "searching" ? "Scanning…" : "Verify →"}
              </button>
            </div>
            <p className="vp-hint">
              Don't have a UFRN?{" "}
              <a href="/submit">Submit your startup</a> to get one free.
            </p>
          </div>
        </section>

        {/* ── RESULTS AREA ─────────────────────────────────────────────────── */}
        <div style={{ padding: "0 24px 64px", position: "relative", zIndex: 5 }}>

          {/* LOADING */}
          {phase === "searching" && (
            <div className="vp-loading">
              <div className="vp-loader-ring" />
              <p className="vp-loading-text">Querying Registry</p>
              <p className="vp-loading-sub">Cross-referencing {totalCount.toLocaleString()}+ verified entries…</p>
            </div>
          )}

          {/* FOUND */}
          {phase === "found" && result && (
            <div className="vp-result">
              {/* Header */}
              <div className="vp-result-header">
                <div className="vp-verified-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                </div>
                <div>
                  <p className="vp-verified-title">✓ Registry Verified</p>
                  <h2 className="vp-verified-h2">{result.name}</h2>
                </div>
                <div className="vp-ufrn-badge">{result.ufrn}</div>
              </div>

              {/* Body */}
              <div className="vp-result-body">
                {/* Logo + name row */}
                <div className="vp-logo-row">
                  <div className="vp-logo">
                    {result.logo_url
                      ? <img src={result.logo_url} alt={result.name} />
                      : result.name.charAt(0)
                    }
                  </div>
                  <div className="vp-logo-info">
                    {result.category && <span className="vp-cat-badge">{result.category}</span>}
                    <div className="vp-company-name">{result.name}</div>
                    {result.founders && <div className="vp-founders">Founded by {result.founders}</div>}
                  </div>
                </div>

                {/* Fields grid */}
                <div className="vp-fields">
                  <div className="vp-field">
                    <span className="vp-field-label">Registry Status</span>
                    <span className="vp-field-val green">✓ Approved & Verified</span>
                  </div>
                  <div className="vp-field">
                    <span className="vp-field-label">UFRN</span>
                    <span className="vp-field-val mono">{result.ufrn}</span>
                  </div>
                  {result.founded_year && (
                    <div className="vp-field">
                      <span className="vp-field-label">Founded</span>
                      <span className="vp-field-val">{result.founded_year}</span>
                    </div>
                  )}
                  {result.city && (
                    <div className="vp-field">
                      <span className="vp-field-label">Headquarters</span>
                      <span className="vp-field-val">{result.city}{result.country_code ? `, ${result.country_code}` : ""}</span>
                    </div>
                  )}
                  {result.funding_stage && (
                    <div className="vp-field">
                      <span className="vp-field-label">Funding Stage</span>
                      <span className="vp-field-val">{result.funding_stage}</span>
                    </div>
                  )}
                  {result.funding_amount && (
                    <div className="vp-field">
                      <span className="vp-field-label">Total Raised</span>
                      <span className="vp-field-val">{formatFunding(result.funding_amount)}</span>
                    </div>
                  )}
                  {result.updated_at && (
                    <div className="vp-field">
                      <span className="vp-field-label">Last Verified</span>
                      <span className="vp-field-val muted">{new Date(result.updated_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                  )}
                  <div className="vp-field">
                    <span className="vp-field-label">Registry</span>
                    <span className="vp-field-val muted">UpForge Global Registry</span>
                  </div>
                </div>

                {/* Description */}
                {result.description && (
                  <p className="vp-desc">{result.description}</p>
                )}

                {/* Actions */}
                <div className="vp-actions">
                  <Link href={`/startup/${result.slug}`} className="vp-action-btn vp-action-primary">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M8 2L14 8L8 14"/><path d="M2 8h12"/>
                    </svg>
                    View Full Profile
                  </Link>
                  <button className="vp-action-btn vp-action-ghost" onClick={handleCopy}>
                    {copied ? "✓ Copied!" : "📎 Share Verification"}
                  </button>
                  <button className="vp-action-btn vp-action-secondary" onClick={handleReset}>
                    Search Again
                  </button>
                </div>
              </div>

              {/* Certificate strip */}
              <div className="vp-cert">
                <span className="vp-cert-icon">🏅</span>
                <div className="vp-cert-text">
                  <div className="vp-cert-title">UpForge Verification Certificate</div>
                  <div className="vp-cert-sub">This startup has been manually verified by the UpForge editorial team.</div>
                </div>
                <span className="vp-cert-hash">#{result.id?.slice(0,8).toUpperCase()}</span>
              </div>
            </div>
          )}

          {/* NOT FOUND */}
          {phase === "notfound" && (
            <div className="vp-notfound">
              <div className="vp-notfound-icon">🔍</div>
              <h2 className="vp-notfound-h">UFRN Not Found</h2>
              <p className="vp-notfound-p">
                No approved startup was found with that UFRN in the UpForge global registry.
                Double-check the number — or this startup may not be registered yet.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="vp-notfound-btn" onClick={handleReset}>Try Again</button>
                <Link href="/submit" className="vp-action-btn vp-action-ghost" style={{ fontSize: "9px" }}>
                  Register a Startup →
                </Link>
              </div>
            </div>
          )}

          {/* ERROR */}
          {phase === "error" && (
            <div className="vp-notfound" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
              <div className="vp-notfound-icon">⚠️</div>
              <h2 className="vp-notfound-h">Registry Unavailable</h2>
              <p className="vp-notfound-p">We couldn't connect to the registry. Please try again in a moment.</p>
              <button className="vp-notfound-btn" onClick={handleReset}>Try Again</button>
            </div>
          )}
        </div>

        {/* ── STATS ─────────────────────────────────────────────────────────── */}
        <div style={{ padding: "0 32px", position: "relative", zIndex: 5 }}>
          <div className="vp-stats">
            <div className="vp-stat">
              <div className="vp-stat-num">{(totalCount / 1000).toFixed(0)}K<span>+</span></div>
              <div className="vp-stat-label">Verified Startups</div>
            </div>
            <div className="vp-stat">
              <div className="vp-stat-num">50<span>+</span></div>
              <div className="vp-stat-label">Countries</div>
            </div>
            <div className="vp-stat">
              <div className="vp-stat-num">100<span>%</span></div>
              <div className="vp-stat-label">Manual Verification</div>
            </div>
            <div className="vp-stat">
              <div className="vp-stat-num">Free<span>.</span></div>
              <div className="vp-stat-label">Always & Forever</div>
            </div>
          </div>
        </div>

        {/* ── HOW TO ────────────────────────────────────────────────────────── */}
        <section className="vp-howto">
          <span className="vp-section-eyebrow">How it works</span>
          <h2 className="vp-section-h">Verify a startup in<br />under 10 seconds</h2>
          <p className="vp-section-p">
            The UFRN system gives every startup a permanent, searchable identity.
            Investors, journalists, and partners use it for instant due diligence.
          </p>
          <div className="vp-steps">
            {[
              { n: "01", h: "Get the UFRN", p: "Ask the startup for their UpForge Registry Number. It looks like UFRN-XXXXXX and appears on their website, deck, or card." },
              { n: "02", h: "Enter it above", p: "Type or paste the UFRN into the search box at the top of this page and hit Verify." },
              { n: "03", h: "View registry record", p: "See the official record — company name, founders, sector, city, founding year, funding, and live verification status." },
              { n: "04", h: "Share or download", p: "Copy the verification link or download the certificate to share as proof in a deal, press piece, or due diligence report." },
            ].map(s => (
              <div key={s.n} className="vp-step">
                <div className="vp-step-num">{s.n}</div>
                <div className="vp-step-h">{s.h}</div>
                <p className="vp-step-p">{s.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="vp-faq">
          <span className="vp-section-eyebrow">FAQ</span>
          <h2 className="vp-section-h">Common questions</h2>
          <FAQ />
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid var(--rule)", padding: "32px", position: "relative", zIndex: 5 }}>
          <div className="vp-footer">
            <span className="vp-footer-brand">Up<span>Forge</span> · Global Registry</span>
            <div className="vp-footer-links">
              <Link href="/"        className="vp-footer-link">Home</Link>
              <Link href="/startup" className="vp-footer-link">Registry</Link>
              <Link href="/verify"  className="vp-footer-link">Verify UFRN</Link>
              <Link href="/submit"  className="vp-footer-link">Submit Startup</Link>
              <Link href="/blog"    className="vp-footer-link">Blog</Link>
              <Link href="/about"   className="vp-footer-link">About</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// ─── FAQ SUB-COMPONENT ────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "What is a UFRN?", a: "A UFRN (UpForge Registry Number) is a unique permanent identifier assigned to every verified startup in the UpForge global registry. It's the world's first startup-specific identity number — like a passport number for companies." },
  { q: "Is UFRN verification free?", a: "Yes, completely free. No account required. Unlimited lookups. The registry is funded by UpForge and will remain free forever." },
  { q: "What does 'Verified' actually mean?", a: "Verified means the UpForge editorial team has manually reviewed the startup — confirmed it's active, has real founders, and submitted accurate information. It's not just a database entry; it's a human-reviewed record." },
  { q: "My startup isn't in the registry — how do I get a UFRN?", a: "Submit your startup at upforge.org/submit (or upforge.in/submit for India). The process is free and the team reviews within a few days." },
  { q: "Can investors trust UFRN verification for due diligence?", a: "UFRN verification provides a verified baseline — official company name, founders, sector, and existence. It should be used as a starting point alongside standard due diligence, not a replacement for it." },
  { q: "What if the UFRN I entered isn't found?", a: "Either the UFRN is wrong (check for typos), the startup hasn't been approved yet, or it hasn't been submitted. Contact the startup directly or ask them to submit at upforge.org/submit." },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="vp-faq-list">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className={`vp-faq-item${open === i ? " open" : ""}`}>
          <button className="vp-faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span className="vp-faq-q-text">{item.q}</span>
            <span className="vp-faq-q-icon">+</span>
          </button>
          <div className="vp-faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  )
}
