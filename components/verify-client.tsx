"use client"
// components/verify-client.tsx
// Fixed: UFRN format UF-2026-IND-XXXXX, Navbar/Footer included, editorial cream design

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

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

interface VerifyClientProps {
  totalCount: number
  isOrg: boolean
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export function VerifyClient({ totalCount, isOrg }: VerifyClientProps) {
  const [input, setInput]   = useState("")
  const [phase, setPhase]   = useState<Phase>("idle")
  const [result, setResult] = useState<StartupRecord | null>(null)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // ── Normalize UFRN input ──────────────────────────────────────────────────
  // Accepts: "00013", "IND-00013", "2026-IND-00013", "UF-2026-IND-00013"
  function normalizeUFRN(raw: string): string {
    const s = raw.trim().toUpperCase()
    // Already fully formed
    if (/^UF-\d{4}-[A-Z]{3}-\d+$/.test(s)) return s
    // Strip any leading "UF-" if present but malformed
    const stripped = s.replace(/^UF-/, "")
    // If it's just digits, pad and prepend
    if (/^\d+$/.test(stripped)) {
      return `UF-2026-IND-${stripped.padStart(5, "0")}`
    }
    // If YEAR-CC-NUM
    if (/^\d{4}-[A-Z]{3}-\d+$/.test(stripped)) {
      return `UF-${stripped}`
    }
    // CC-NUM format
    if (/^[A-Z]{3}-\d+$/.test(stripped)) {
      return `UF-2026-${stripped}`
    }
    // Fallback: return as-is with UF- prefix
    return s.startsWith("UF-") ? s : `UF-${s}`
  }

  // ── UFRN Lookup ───────────────────────────────────────────────────────────
  const handleVerify = useCallback(async () => {
    const raw = input.trim()
    if (!raw) return

    const ufrn = normalizeUFRN(raw)
    setPhase("searching")
    setResult(null)

    try {
      const sb = createClient()
      const { data, error } = await sb
        .from("startups")
        .select("id,name,slug,ufrn,description,founders,founded_year,category,city,country_code,status,logo_url,website,funding_stage,funding_amount,is_featured,created_at,updated_at")
        .eq("ufrn", ufrn)
        .eq("status", "approved")
        .single()

      // Min animation time
      await new Promise(r => setTimeout(r, 1200))

      if (error || !data) {
        setPhase("notfound")
      } else {
        setResult(data as StartupRecord)
        setPhase("found")
      }
    } catch {
      setPhase("error")
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleVerify()
  }

  const handleReset = () => {
    setPhase("idle")
    setResult(null)
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
    if (amt >= 1_000_000)     return `$${(amt / 1_000_000).toFixed(1)}M`
    if (amt >= 1_000)         return `$${(amt / 1_000).toFixed(0)}K`
    return `$${amt}`
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        :root {
          --cream:   #F2EFE6;
          --cream2:  #EDE9DC;
          --cream3:  #FAF8F3;
          --ink:     #1A1208;
          --ink2:    #3D2E18;
          --ink3:    #6B5C40;
          --ink4:    #9C8B72;
          --rule:    #D5CEBC;
          --rule2:   #EAE4D4;
          --saffron: #E8933A;
          --gold:    #C9A84C;
          --white:   #FDFCF8;
          --emerald: #15803D;
          --red:     #DC2626;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: var(--cream); }

        .vp-wrap {
          min-height: 100vh;
          background: var(--cream);
          font-family: 'EB Garamond', Georgia, serif;
          color: var(--ink);
        }

        /* ── BREADCRUMB ── */
        .vp-bc { border-bottom: 1px solid var(--rule); background: var(--white); }
        .vp-bc-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 clamp(16px,4vw,48px);
          display: flex; align-items: center; gap: 6px; height: 34px;
          font-family: system-ui,sans-serif; font-size: 10px; letter-spacing: .04em;
          color: var(--ink4); list-style: none;
        }
        .vp-bc-inner a { color: var(--ink4); text-decoration: none; transition: color .15s; }
        .vp-bc-inner a:hover { color: var(--ink); }
        .vp-bc-sep { color: var(--rule); }

        /* ── MASTHEAD ── */
        .vp-mast { border-bottom: 3px solid var(--ink); background: var(--cream); }
        .vp-mast-inner {
          max-width: 1280px; margin: 0 auto;
          padding: clamp(40px,6vw,72px) clamp(16px,4vw,48px) clamp(32px,5vw,56px);
          text-align: center;
        }
        .vp-edition {
          font-family: system-ui,sans-serif; font-size: 9px; font-weight: 700;
          letter-spacing: .42em; text-transform: uppercase; color: var(--ink4);
          margin-bottom: 18px; display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .vp-edition-line { height: 1px; width: 60px; background: var(--rule); }
        .vp-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem,5.5vw,4.8rem); font-weight: 900;
          letter-spacing: -.025em; color: var(--ink); line-height: 1.05; margin-bottom: 14px;
        }
        .vp-h1 em { font-style: italic; color: var(--ink2); }
        .vp-sub {
          font-size: clamp(13px,1.6vw,15px); color: var(--ink3); font-style: italic;
          line-height: 1.7; max-width: 560px; margin: 0 auto 28px;
        }
        .vp-divider {
          display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 36px;
        }
        .vp-div-line { height: 1px; width: 80px; background: var(--rule); }
        .vp-div-dot { color: var(--rule); font-size: 12px; }

        /* ── STATS ROW ── */
        .vp-stats {
          display: flex; align-items: center; justify-content: center; gap: 0;
          border: 1px solid var(--rule); background: var(--ink);
          max-width: 560px; margin: 0 auto;
        }
        .vp-stat { flex: 1; padding: 14px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,.08); }
        .vp-stat:last-child { border-right: none; }
        .vp-stat-v {
          font-family: 'Playfair Display', serif; font-size: clamp(1.2rem,2.4vw,1.7rem);
          font-weight: 900; color: #fff; line-height: 1; margin-bottom: 3px;
        }
        .vp-stat-l {
          font-family: system-ui,sans-serif; font-size: 7.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: .2em; color: rgba(255,255,255,.38);
        }
        @media(max-width:480px) {
          .vp-stats { flex-direction: column; }
          .vp-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,.08); }
          .vp-stat:last-child { border-bottom: none; }
        }

        /* ── MAIN CONTENT AREA ── */
        .vp-main {
          max-width: 1280px; margin: 0 auto;
          padding: clamp(28px,5vw,56px) clamp(16px,4vw,48px) 72px;
          display: grid; grid-template-columns: 1fr 340px; gap: 48px; align-items: start;
        }
        @media(max-width:1024px) { .vp-main { grid-template-columns: 1fr; } .vp-aside { display: none; } }

        /* ── SEARCH PANEL ── */
        .vp-search-panel {
          background: var(--ink); padding: clamp(28px,4vw,48px); border: none;
        }
        .vp-panel-ey {
          font-family: system-ui,sans-serif; font-size: 8px; font-weight: 700;
          text-transform: uppercase; letter-spacing: .3em; color: var(--saffron); margin-bottom: 14px;
        }
        .vp-panel-h {
          font-family: 'Playfair Display', serif; font-size: clamp(1.2rem,2.2vw,1.6rem);
          font-weight: 700; color: #fff; line-height: 1.25; margin-bottom: 8px;
        }
        .vp-panel-p {
          font-size: 12.5px; color: rgba(255,255,255,.45); font-style: italic;
          line-height: 1.7; margin-bottom: 28px;
        }

        .vp-search-label {
          font-family: system-ui,sans-serif; font-size: 8px; font-weight: 700;
          letter-spacing: .25em; text-transform: uppercase; color: rgba(255,255,255,.35);
          display: block; margin-bottom: 10px;
        }
        .vp-search-row {
          display: flex; border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.04);
        }
        .vp-search-row:focus-within { border-color: var(--saffron); }
        .vp-prefix {
          display: flex; align-items: center; padding: 0 16px;
          font-family: system-ui,sans-serif; font-size: 10px; font-weight: 900;
          color: var(--saffron); border-right: 1px solid rgba(255,255,255,.1);
          white-space: nowrap; background: rgba(232,147,58,.07); letter-spacing: .04em;
        }
        .vp-input {
          flex: 1; background: transparent; border: none; outline: none;
          padding: 16px 18px; font-size: 15px; font-family: 'EB Garamond', serif;
          font-style: italic; color: #fff; letter-spacing: .04em; min-width: 0;
        }
        .vp-input::placeholder { color: rgba(255,255,255,.2); font-size: 14px; }
        .vp-verify-btn {
          padding: 0 28px; background: var(--saffron); border: none; cursor: pointer;
          font-family: system-ui,sans-serif; font-size: 9px; font-weight: 900;
          letter-spacing: .2em; text-transform: uppercase; color: #fff;
          transition: background .2s; flex-shrink: 0; white-space: nowrap;
        }
        .vp-verify-btn:hover:not(:disabled) { background: var(--gold); }
        .vp-verify-btn:disabled { opacity: .45; cursor: not-allowed; }

        .vp-hint {
          margin-top: 10px; font-size: 11px; color: rgba(255,255,255,.22);
          font-style: italic;
        }
        .vp-hint a { color: rgba(255,255,255,.4); text-decoration: underline; }

        /* ── SAMPLE UFRNs ── */
        .vp-samples {
          margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.08);
        }
        .vp-samples-label {
          font-family: system-ui,sans-serif; font-size: 8px; font-weight: 700;
          text-transform: uppercase; letter-spacing: .24em; color: rgba(255,255,255,.28);
          margin-bottom: 10px;
        }
        .vp-sample-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .vp-chip {
          font-family: system-ui,sans-serif; font-size: 9px; font-weight: 700;
          letter-spacing: .06em; color: rgba(255,255,255,.45);
          border: 1px solid rgba(255,255,255,.12); padding: 5px 12px;
          cursor: pointer; transition: all .15s; background: transparent;
        }
        .vp-chip:hover { border-color: var(--saffron); color: var(--saffron); background: rgba(232,147,58,.06); }

        /* ── RESULT STATES ── */
        .vp-result-area { margin-top: 28px; }

        /* Loading */
        .vp-loading {
          display: flex; align-items: center; gap: 16px; padding: 24px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
          animation: fadeUp .3s ease both;
        }
        .vp-loader-ring {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
          border: 2px solid rgba(232,147,58,.15); border-top-color: var(--saffron);
          animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
        .vp-loading-text {
          font-family: system-ui,sans-serif; font-size: 9px; font-weight: 700;
          letter-spacing: .22em; text-transform: uppercase; color: var(--saffron);
        }
        .vp-loading-sub { font-size: 11px; color: rgba(255,255,255,.3); font-style: italic; margin-top: 3px; }

        /* Found */
        .vp-found { border: 1px solid rgba(21,128,61,.35); animation: fadeUp .4s ease both; }
        .vp-found-head {
          background: rgba(21,128,61,.08); border-bottom: 1px solid rgba(21,128,61,.2);
          padding: 18px 22px; display: flex; align-items: center; gap: 12px;
        }
        .vp-check-icon {
          width: 36px; height: 36px; border-radius: 50%; background: var(--emerald);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 0 0 16px rgba(21,128,61,.4);
        }
        .vp-check-icon svg { width: 18px; height: 18px; }
        .vp-found-title {
          font-family: system-ui,sans-serif; font-size: 8px; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase; color: var(--emerald); margin-bottom: 3px;
        }
        .vp-found-name {
          font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #fff; line-height: 1.2;
        }
        .vp-ufrn-tag {
          margin-left: auto; flex-shrink: 0;
          font-family: system-ui,sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .04em;
          color: var(--saffron); background: rgba(232,147,58,.08);
          border: 1px solid rgba(232,147,58,.25); padding: 5px 12px;
        }

        .vp-found-body { padding: 22px; background: rgba(255,255,255,.02); }
        .vp-logo-row {
          display: flex; align-items: center; gap: 16px; margin-bottom: 20px;
          padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .vp-logo {
          width: 60px; height: 60px; border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.06); display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700;
          color: rgba(255,255,255,.25); overflow: hidden; flex-shrink: 0;
        }
        .vp-logo img { width: 100%; height: 100%; object-fit: cover; }
        .vp-cat-tag {
          display: inline-block; font-family: system-ui,sans-serif; font-size: 8px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase; color: var(--saffron);
          background: rgba(232,147,58,.08); border: 1px solid rgba(232,147,58,.2);
          padding: 2px 8px; margin-bottom: 6px;
        }
        .vp-company-big {
          font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 3px;
        }
        .vp-founders-sm { font-size: 12px; color: rgba(255,255,255,.4); font-style: italic; }

        .vp-fields {
          display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-bottom: 20px;
        }
        @media(max-width:560px) { .vp-fields { grid-template-columns: 1fr; } }
        .vp-field-label {
          font-family: system-ui,sans-serif; font-size: 8px; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.22); margin-bottom: 3px;
        }
        .vp-field-val { font-size: 13px; color: #fff; font-weight: 600; }
        .vp-field-val.mono { font-family: system-ui,monospace; font-size: 11px; color: var(--saffron); font-weight: 700; }
        .vp-field-val.green { color: #4ade80; }
        .vp-field-val.muted { color: rgba(255,255,255,.4); font-size: 12px; font-weight: 400; font-style: italic; }

        .vp-desc-box {
          font-size: 12px; color: rgba(255,255,255,.45); font-style: italic; line-height: 1.7;
          padding: 14px 16px; background: rgba(255,255,255,.03);
          border-left: 2px solid rgba(232,147,58,.3); margin-bottom: 20px;
        }

        .vp-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .vp-btn-primary {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--emerald); color: #fff; padding: 11px 20px;
          font-family: system-ui,sans-serif; font-size: 9px; font-weight: 900;
          letter-spacing: .18em; text-transform: uppercase; text-decoration: none;
          transition: background .15s; border: none; cursor: pointer;
        }
        .vp-btn-primary:hover { background: #166534; }
        .vp-btn-ghost {
          display: inline-flex; align-items: center; gap: 7px;
          background: transparent; color: rgba(255,255,255,.5);
          border: 1px solid rgba(255,255,255,.14); padding: 11px 20px;
          font-family: system-ui,sans-serif; font-size: 9px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase; cursor: pointer; transition: all .15s;
        }
        .vp-btn-ghost:hover { border-color: rgba(255,255,255,.4); color: #fff; }

        /* Not Found / Error */
        .vp-notfound {
          padding: 32px; border: 1px solid rgba(220,38,38,.25); background: rgba(220,38,38,.03);
          text-align: center; animation: fadeUp .3s ease both;
        }
        .vp-notfound-icon { font-size: 36px; margin-bottom: 12px; }
        .vp-notfound-h {
          font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700;
          color: #fff; margin-bottom: 8px;
        }
        .vp-notfound-p { font-size: 12px; color: rgba(255,255,255,.4); font-style: italic; line-height: 1.7; margin-bottom: 20px; }

        /* Certificate footer strip */
        .vp-cert {
          padding: 14px 22px; background: rgba(232,147,58,.05); border-top: 1px solid rgba(232,147,58,.15);
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .vp-cert-title { font-family: system-ui,sans-serif; font-size: 8.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--saffron); }
        .vp-cert-sub { font-size: 10px; color: rgba(255,255,255,.25); font-style: italic; margin-top: 1px; }
        .vp-cert-hash { margin-left: auto; font-family: monospace; font-size: 9px; color: rgba(255,255,255,.18); }

        /* ── SIDEBAR ── */
        .vp-aside { display: flex; flex-direction: column; gap: 20px; }
        .aside-block { border: 1px solid var(--rule); background: var(--white); padding: 22px; }
        .aside-ey { font-family: system-ui,sans-serif; font-size: 8.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .28em; color: var(--ink4); margin-bottom: 12px; }
        .aside-h { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .aside-p { font-size: 12.5px; color: var(--ink3); font-style: italic; line-height: 1.65; margin-bottom: 14px; }
        .aside-list { list-style: none; padding: 0; }
        .aside-list li { border-bottom: 1px solid var(--rule2); }
        .aside-list li:last-child { border-bottom: none; }
        .aside-list a { display: flex; align-items: center; justify-content: space-between; padding: 9px 0; font-size: 13px; color: var(--ink3); text-decoration: none; font-style: italic; transition: color .15s; }
        .aside-list a:hover { color: var(--ink); }

        /* ── HOW TO SECTION ── */
        .vp-howto { max-width: 1280px; margin: 0 auto; padding: 0 clamp(16px,4vw,48px) 64px; }
        .sec-hd2 { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
        .sec-hd2-label { font-family: system-ui,sans-serif; font-size: 8.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .32em; color: var(--ink4); white-space: nowrap; }
        .sec-hd2-rule { flex: 1; height: 1px; background: var(--rule); }
        .vp-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; background: var(--rule2); border: 1px solid var(--rule); }
        @media(max-width:900px) { .vp-steps { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:520px) { .vp-steps { grid-template-columns: 1fr; } }
        .vp-step {
          background: var(--white); padding: 24px 20px; border-right: 1px solid var(--rule2);
          border-bottom: 1px solid var(--rule2);
        }
        .vp-step:last-child { border-right: none; }
        .vp-step-num { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900; color: var(--rule2); line-height: 1; margin-bottom: 12px; }
        .vp-step-h { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .vp-step-p { font-size: 12px; color: var(--ink3); font-style: italic; line-height: 1.65; }

        /* ── FAQ ── */
        .vp-faq-wrap { max-width: 1280px; margin: 0 auto; padding: 0 clamp(16px,4vw,48px) 72px; }
        .vp-faq-list { border: 1px solid var(--rule); background: var(--white); }
        .vp-faq-item { border-bottom: 1px solid var(--rule2); }
        .vp-faq-item:last-child { border-bottom: none; }
        .vp-faq-q {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 24px; gap: 16px; text-align: left;
        }
        .vp-faq-q-text { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: var(--ink); line-height: 1.3; }
        .vp-faq-q-icon {
          width: 22px; height: 22px; border: 1px solid var(--rule); display: flex;
          align-items: center; justify-content: center; flex-shrink: 0;
          color: var(--ink4); font-size: 16px; transition: all .2s;
        }
        .vp-faq-item.open .vp-faq-q-icon { transform: rotate(45deg); border-color: var(--saffron); color: var(--saffron); }
        .vp-faq-a {
          font-size: 13.5px; color: var(--ink3); font-style: italic; line-height: 1.75;
          max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .2s;
          padding: 0 24px;
        }
        .vp-faq-item.open .vp-faq-a { max-height: 400px; padding: 0 24px 20px; }

        /* ── PROMISE BAR ── */
        .promise-bar { display: flex; flex-wrap: wrap; background: var(--white); border: 1px solid var(--rule); margin-bottom: 40px; }
        .promise-item { flex: 1; min-width: 180px; padding: 16px 20px; border-right: 1px solid var(--rule); display: flex; align-items: flex-start; gap: 10px; }
        .promise-item:last-child { border-right: none; }
        .promise-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        .promise-label { font-family: system-ui,sans-serif; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: .16em; color: var(--ink); margin-bottom: 2px; }
        .promise-desc { font-size: 11.5px; color: var(--ink3); font-style: italic; line-height: 1.5; }
        @media(max-width:640px) {
          .promise-item { border-right: none !important; border-bottom: 1px solid var(--rule); flex: 0 0 100%; }
          .promise-item:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="vp-wrap">
        <Navbar />

        {/* BREADCRUMB */}
        <div className="vp-bc">
          <ol className="vp-bc-inner">
            <li><a href="/">Home</a></li>
            <li className="vp-bc-sep">/</li>
            <li><a href="/startup">Startup Registry</a></li>
            <li className="vp-bc-sep">/</li>
            <li style={{ color: "var(--ink)", fontWeight: 600 }}>Verify UFRN</li>
          </ol>
        </div>

        {/* MASTHEAD */}
        <header className="vp-mast">
          <div className="vp-mast-inner">
            <div className="vp-edition">
              <span className="vp-edition-line" />
              UpForge · Official Verification Tool
              <span className="vp-edition-line" />
            </div>
            <h1 className="vp-h1">
              Verify Any Startup's<br />
              <em>Registry Number</em>
            </h1>
            <p className="vp-sub">
              Enter a UFRN to instantly access the official registry record —
              founders, funding, category, verification status, and more.
              India's only independent startup identity system.
            </p>
            <div className="vp-divider">
              <span className="vp-div-line" />
              <span className="vp-div-dot">✦</span>
              <span className="vp-div-line" />
            </div>
            <div className="vp-stats">
              {[
                { v: `${(totalCount / 1000).toFixed(1)}K+`, l: "Verified Startups" },
                { v: "100%", l: "Manual Review" },
                { v: "Free", l: "Always" },
              ].map((s, i) => (
                <div key={i} className="vp-stat">
                  <div className="vp-stat-v">{s.v}</div>
                  <div className="vp-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main>
          <div className="vp-main">

            {/* LEFT — SEARCH + RESULT */}
            <div>
              {/* Search panel */}
              <div className="vp-search-panel">
                <div className="vp-panel-ey">UFRN Verification</div>
                <div className="vp-panel-h">Enter a Registry Number</div>
                <p className="vp-panel-p">
                  Type or paste the startup's UFRN below. Accepts full format
                  (UF-2026-IND-00013) or just the number (00013).
                </p>

                <label className="vp-search-label" htmlFor="ufrn-input">UFRN — UpForge Registry Number</label>
                <div className="vp-search-row">
                  <span className="vp-prefix">UFRN</span>
                  <input
                    ref={inputRef}
                    id="ufrn-input"
                    className="vp-input"
                    type="text"
                    placeholder="e.g. UF-2026-IND-00013 or just 00013"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={phase === "searching"}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="UFRN Lookup Input"
                  />
                  <button
                    className="vp-verify-btn"
                    onClick={handleVerify}
                    disabled={!input.trim() || phase === "searching"}
                    aria-label="Verify UFRN"
                  >
                    {phase === "searching" ? "Scanning…" : "Verify →"}
                  </button>
                </div>
                <p className="vp-hint">
                  No UFRN? <a href="/submit">Submit your startup free</a> to receive one.
                </p>

                {/* Sample numbers */}
                <div className="vp-samples">
                  <p className="vp-samples-label">Try a sample UFRN format:</p>
                  <div className="vp-sample-chips">
                    {["UF-2026-IND-00001", "UF-2026-IND-00013", "UF-2026-IND-00100"].map(s => (
                      <button key={s} className="vp-chip" onClick={() => setInput(s)}>{s}</button>
                    ))}
                  </div>
                </div>

                {/* Result area */}
                <div className="vp-result-area">

                  {/* Searching */}
                  {phase === "searching" && (
                    <div className="vp-loading">
                      <div className="vp-loader-ring" />
                      <div>
                        <div className="vp-loading-text">Querying Registry</div>
                        <div className="vp-loading-sub">Cross-referencing {totalCount.toLocaleString()}+ entries…</div>
                      </div>
                    </div>
                  )}

                  {/* Found */}
                  {phase === "found" && result && (
                    <div className="vp-found">
                      <div className="vp-found-head">
                        <div className="vp-check-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17L4 12" />
                          </svg>
                        </div>
                        <div>
                          <div className="vp-found-title">✓ Verified in Registry</div>
                          <div className="vp-found-name">{result.name}</div>
                        </div>
                        <div className="vp-ufrn-tag">{result.ufrn}</div>
                      </div>

                      <div className="vp-found-body">
                        {/* Logo + info */}
                        <div className="vp-logo-row">
                          <div className="vp-logo">
                            {result.logo_url
                              ? <img src={result.logo_url} alt={result.name} />
                              : result.name.charAt(0)
                            }
                          </div>
                          <div>
                            {result.category && <span className="vp-cat-tag">{result.category}</span>}
                            <div className="vp-company-big">{result.name}</div>
                            {result.founders && <div className="vp-founders-sm">Founded by {result.founders}</div>}
                          </div>
                        </div>

                        {/* Fields */}
                        <div className="vp-fields">
                          <div>
                            <div className="vp-field-label">Registry Status</div>
                            <div className="vp-field-val green">✓ Approved & Verified</div>
                          </div>
                          <div>
                            <div className="vp-field-label">UFRN</div>
                            <div className="vp-field-val mono">{result.ufrn}</div>
                          </div>
                          {result.founded_year && (
                            <div>
                              <div className="vp-field-label">Founded</div>
                              <div className="vp-field-val">{result.founded_year}</div>
                            </div>
                          )}
                          {result.city && (
                            <div>
                              <div className="vp-field-label">Headquarters</div>
                              <div className="vp-field-val">{result.city}{result.country_code ? `, ${result.country_code}` : ""}</div>
                            </div>
                          )}
                          {result.funding_stage && (
                            <div>
                              <div className="vp-field-label">Funding Stage</div>
                              <div className="vp-field-val">{result.funding_stage}</div>
                            </div>
                          )}
                          {formatFunding(result.funding_amount) && (
                            <div>
                              <div className="vp-field-label">Total Raised</div>
                              <div className="vp-field-val">{formatFunding(result.funding_amount)}</div>
                            </div>
                          )}
                          {result.updated_at && (
                            <div>
                              <div className="vp-field-label">Last Verified</div>
                              <div className="vp-field-val muted">{new Date(result.updated_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</div>
                            </div>
                          )}
                          <div>
                            <div className="vp-field-label">Registry</div>
                            <div className="vp-field-val muted">UpForge Global Registry</div>
                          </div>
                        </div>

                        {result.description && (
                          <div className="vp-desc-box">{result.description}</div>
                        )}

                        <div className="vp-actions">
                          <Link href={`/startup/${result.slug}`} className="vp-btn-primary">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                              <path d="M8 2L14 8L8 14"/><path d="M2 8h12"/>
                            </svg>
                            View Full Profile
                          </Link>
                          <button className="vp-btn-ghost" onClick={handleCopy}>
                            {copied ? "✓ Copied!" : "Share Verification"}
                          </button>
                          <button className="vp-btn-ghost" onClick={handleReset}>
                            New Search
                          </button>
                        </div>
                      </div>

                      {/* Certificate strip */}
                      <div className="vp-cert">
                        <div>
                          <div className="vp-cert-title">🏅 UpForge Verification Certificate</div>
                          <div className="vp-cert-sub">Manually reviewed by the UpForge editorial team</div>
                        </div>
                        <span className="vp-cert-hash">#{result.id?.slice(0, 8).toUpperCase()}</span>
                      </div>
                    </div>
                  )}

                  {/* Not Found */}
                  {phase === "notfound" && (
                    <div className="vp-notfound">
                      <div className="vp-notfound-icon">🔍</div>
                      <h2 className="vp-notfound-h">UFRN Not Found</h2>
                      <p className="vp-notfound-p">
                        No approved startup was found with that UFRN in the UpForge registry.
                        Double-check the number — format should be <strong style={{ color: "rgba(255,255,255,.6)", fontStyle: "normal" }}>UF-2026-IND-XXXXX</strong>.
                        The startup may not have been submitted or approved yet.
                      </p>
                      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="vp-btn-ghost" onClick={handleReset}>Try Again</button>
                        <Link href="/submit" className="vp-btn-primary">Register Startup →</Link>
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {phase === "error" && (
                    <div className="vp-notfound">
                      <div className="vp-notfound-icon">⚠️</div>
                      <h2 className="vp-notfound-h">Registry Unavailable</h2>
                      <p className="vp-notfound-p">Could not connect to the registry. Please try again in a moment.</p>
                      <button className="vp-btn-ghost" onClick={handleReset}>Try Again</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="vp-aside" style={{ position: "sticky", top: 80 }}>
              <div className="aside-block">
                <div className="aside-ey">What is UFRN?</div>
                <div className="aside-h">UpForge Registry Number</div>
                <p className="aside-p">
                  A unique permanent identifier assigned to every verified startup.
                  Format: <strong style={{ fontStyle: "normal", color: "var(--ink)" }}>UF-YEAR-CC-NUMBER</strong>
                  <br /><br />
                  Example: <code style={{ fontFamily: "monospace", fontSize: 12, color: "var(--saffron)", background: "var(--cream2)", padding: "2px 6px" }}>UF-2026-IND-00013</code>
                </p>
              </div>

              <div className="aside-block">
                <div className="aside-ey">UFRN Format Guide</div>
                <ul className="aside-list">
                  {[
                    { l: "UF", d: "UpForge prefix" },
                    { l: "2026", d: "Year of registration" },
                    { l: "IND", d: "Country code (India)" },
                    { l: "00013", d: "Sequential registry number" },
                  ].map(item => (
                    <li key={item.l}>
                      <a href="#" onClick={e => e.preventDefault()}>
                        <span>
                          <code style={{ fontFamily: "monospace", fontSize: 11, color: "var(--saffron)", fontStyle: "normal" }}>{item.l}</code>
                          {" "}<span style={{ color: "var(--ink4)", fontSize: 11, fontStyle: "italic" }}>— {item.d}</span>
                        </span>
                        <span style={{ color: "var(--rule)" }}>→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="aside-block" style={{ background: "var(--ink)", border: "none" }}>
                <div className="aside-ey" style={{ color: "rgba(232,147,58,.8)" }}>No UFRN yet?</div>
                <div className="aside-h" style={{ color: "#fff" }}>Get your startup listed free</div>
                <p className="aside-p" style={{ color: "rgba(255,255,255,.4)" }}>
                  Join {totalCount.toLocaleString()}+ verified startups. Free forever, manually verified.
                </p>
                <a href="/submit" style={{ display: "block", textAlign: "center", background: "var(--saffron)", color: "#fff", padding: "12px", fontFamily: "system-ui,sans-serif", fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".18em", textDecoration: "none", transition: "background .15s" }}>
                  Submit Your Startup →
                </a>
              </div>
            </aside>
          </div>

          {/* PROMISE BAR */}
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,4vw,48px)", marginBottom: 48 }}>
            <div className="promise-bar">
              {[
                { label: "Manually Verified", desc: "Every UFRN assigned after editorial review", color: "#15803D" },
                { label: "Permanent Record",  desc: "UFRNs never expire or get reassigned",       color: "#2563EB" },
                { label: "Free Lookup",        desc: "Unlimited verifications, no account needed", color: "#7C3AED" },
                { label: "Trusted by Investors", desc: "Used for startup due diligence in India",  color: "#E8933A" },
              ].map((item, i) => (
                <div key={i} className="promise-item">
                  <div className="promise-dot" style={{ background: item.color }} />
                  <div>
                    <div className="promise-label">{item.label}</div>
                    <div className="promise-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOW TO */}
          <div className="vp-howto">
            <div className="sec-hd2">
              <span className="sec-hd2-label">How Verification Works</span>
              <span className="sec-hd2-rule" />
            </div>
            <div className="vp-steps">
              {[
                { n: "01", h: "Get the UFRN", p: "Ask the startup for their UpForge Registry Number. Format: UF-YEAR-CC-XXXXX. Found on their website, deck, or profile page." },
                { n: "02", h: "Enter It Above", p: "Type or paste the UFRN in the search box. Short form (just the number) works too — we auto-format." },
                { n: "03", h: "View the Record", p: "See the official registry entry — name, founders, sector, city, funding, and live verification status." },
                { n: "04", h: "Share or Download", p: "Copy the verification link or share the certificate as proof in a deal, pitch, or press piece." },
              ].map(s => (
                <div key={s.n} className="vp-step">
                  <div className="vp-step-num">{s.n}</div>
                  <div className="vp-step-h">{s.h}</div>
                  <p className="vp-step-p">{s.p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="vp-faq-wrap">
            <div className="sec-hd2" style={{ marginBottom: 20 }}>
              <span className="sec-hd2-label">Frequently Asked Questions</span>
              <span className="sec-hd2-rule" />
            </div>
            <FAQAccordion />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "What is a UFRN and what does it look like?", a: "A UFRN (UpForge Registry Number) is a unique permanent identifier assigned to every verified startup. Format: UF-YEAR-COUNTRYCODE-NUMBER, e.g. UF-2026-IND-00013. It acts as a startup's official proof of existence in the UpForge global registry." },
  { q: "Why does the verification say 'Not Found'?", a: "This usually means (a) the UFRN was entered incorrectly — double-check the format UF-2026-IND-XXXXX, (b) the startup hasn't been approved yet, or (c) the startup hasn't been submitted. You can also try entering just the numeric portion (e.g. '13' or '00013') and we'll auto-format it." },
  { q: "Is UFRN verification free?", a: "Yes, completely free. No account required, no limits. The registry is maintained by UpForge and will remain free forever for lookups." },
  { q: "What does 'Verified' actually mean?", a: "Verified means the UpForge editorial team has manually reviewed the startup — confirmed it's active, has real founders, and submitted accurate information. It's not just a database entry; it's a human-reviewed record." },
  { q: "How is UFRN different from company registration (like MCA/CIN)?", a: "Company registration (CIN, MCA) verifies legal incorporation. UFRN verifies that a startup is actively building, has a real product and real founders. It's the world's first startup-specific identity system — complementary to, not a replacement for, legal registration." },
  { q: "How do I get a UFRN for my startup?", a: "Submit your startup for free at upforge.in/submit. The editorial team reviews each application and assigns a permanent UFRN upon approval, typically within a few days." },
]

function FAQAccordion() {
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
