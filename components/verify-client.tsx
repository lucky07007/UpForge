"use client"
// components/verify-client.tsx
// UFRN format: UF-2026-AUS-00011 (UF-YEAR-COUNTRYCODE-SEQNUM)
// Minimal editorial design — dot map animation + clean search

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface StartupRecord {
  id: string; name: string; slug: string; ufrn: string
  description?: string | null; founders?: string | null
  founded_year?: number | null; category?: string | null
  city?: string | null; country_code?: string | null; country_name?: string | null
  status: string; logo_url?: string | null; website?: string | null
  funding_stage?: string | null; funding_amount?: number | null
  created_at?: string; updated_at?: string
}

type Phase = "idle" | "searching" | "found" | "notfound" | "error"
interface Props { totalCount: number; isOrg: boolean }

// Landmass dot positions [x%, y%] in a 100×50 viewBox
const DOTS: [number, number][] = [
  [13,28],[17,32],[21,30],[15,38],[20,42],[25,35],[28,40],[22,48],[19,52],[24,55],[27,36],[23,44],
  [26,58],[28,62],[30,68],[27,72],[29,76],[31,65],[25,64],[27,60],[29,70],
  [46,24],[50,26],[48,30],[52,28],[54,32],[56,27],[44,28],[58,30],[47,26],[53,24],[49,28],
  [48,42],[50,48],[52,54],[48,58],[50,64],[46,50],[54,46],[52,62],[50,55],[47,46],
  [64,26],[68,28],[72,32],[76,30],[80,34],[66,38],[70,42],[74,38],[78,26],[82,28],
  [68,34],[72,40],[76,44],[80,40],[62,30],[65,22],[70,20],[75,18],[84,30],[86,26],
  [70,46],[72,50],[68,52],[70,56],[69,48],[71,54],
  [78,48],[80,52],[82,48],[84,44],[79,50],[83,46],
  [82,62],[86,64],[84,68],[80,66],[88,60],[85,66],[83,64],
  [84,32],[86,34],[85,30],[44,22],[45,24],[24,12],[26,14],[28,12],
]

export function VerifyClient({ totalCount, isOrg }: Props) {
  const [input, setInput]           = useState("")
  const [phase, setPhase]           = useState<Phase>("idle")
  const [result, setResult]         = useState<StartupRecord | null>(null)
  const [copied, setCopied]         = useState(false)
  const [activeDots, setActiveDots] = useState<Set<number>>(new Set())
  const inputRef  = useRef<HTMLInputElement>(null)
  const scanTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  function normalizeUFRN(raw: string): string {
    const s = raw.trim().toUpperCase().replace(/\s/g, "")
    if (/^UF-\d{4}-[A-Z]{2,4}-\d+$/.test(s)) return s
    const stripped = s.startsWith("UF-") ? s.slice(3) : s
    if (/^\d{4}-[A-Z]{2,4}-\d+$/.test(stripped)) return `UF-${stripped}`
    if (/^[A-Z]{2,4}-\d+$/.test(stripped))       return `UF-2026-${stripped}`
    return s.startsWith("UF-") ? s : `UF-${s}`
  }

  function startScan() {
    scanTimer.current = setInterval(() => {
      const set = new Set<number>()
      while (set.size < 10) set.add(Math.floor(Math.random() * DOTS.length))
      setActiveDots(set)
    }, 130)
  }
  function stopScan() {
    if (scanTimer.current) clearInterval(scanTimer.current)
    setActiveDots(new Set())
  }

  const handleVerify = useCallback(async () => {
    const raw = input.trim()
    if (!raw) return
    const ufrn = normalizeUFRN(raw)
    setPhase("searching"); setResult(null); startScan()
    try {
      const sb = createClient()
      const { data, error } = await sb
        .from("startups")
        .select("id,name,slug,ufrn,description,founders,founded_year,category,city,country_code,country_name,status,logo_url,website,funding_stage,funding_amount,created_at,updated_at")
        .eq("ufrn", ufrn)
        .eq("status", "approved")
        .single()
      await new Promise(r => setTimeout(r, 1400))
      stopScan()
      if (error || !data) setPhase("notfound")
      else { setResult(data as StartupRecord); setPhase("found") }
    } catch { stopScan(); setPhase("error") }
  }, [input])

  const handleReset = () => {
    setPhase("idle"); setResult(null); setInput("")
    setTimeout(() => inputRef.current?.focus(), 80)
  }
  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(`https://www.upforge.org/verify?ufrn=${result.ufrn}`)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  const fmt = (amt?: number | null) => {
    if (!amt) return null
    if (amt >= 1e9) return `$${(amt/1e9).toFixed(1)}B`
    if (amt >= 1e6) return `$${(amt/1e6).toFixed(1)}M`
    if (amt >= 1e3) return `$${(amt/1e3).toFixed(0)}K`
    return `$${amt}`
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        :root {
          --cream:#F2EFE6; --cream2:#EDE9DC; --cream3:#FAF8F3;
          --ink:#1A1208; --ink2:#3D2E18; --ink3:#6B5C40; --ink4:#9C8B72;
          --rule:#D5CEBC; --rule2:#EAE4D4;
          --saff:#E8933A; --gold:#C9A84C; --white:#FDFCF8; --em:#15803D;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:var(--cream)}

        .vp{min-height:100vh;background:var(--cream);font-family:'EB Garamond',Georgia,serif;color:var(--ink)}

        /* breadcrumb */
        .vp-bc{border-bottom:1px solid var(--rule);background:var(--white)}
        .vp-bc ol{max-width:1280px;margin:0 auto;padding:0 clamp(16px,4vw,48px);display:flex;align-items:center;gap:6px;height:34px;font-family:system-ui,sans-serif;font-size:10px;letter-spacing:.04em;color:var(--ink4);list-style:none}
        .vp-bc a{color:var(--ink4);text-decoration:none}
        .vp-bc a:hover{color:var(--ink)}
        .vp-bc-sep{color:var(--rule)}

        /* hero / masthead */
        .vp-hero{border-bottom:3px solid var(--ink);background:var(--cream)}
        .vp-hero-inner{max-width:1280px;margin:0 auto;padding:clamp(40px,6vw,80px) clamp(16px,4vw,48px) 0}

        .vp-edition{font-family:system-ui,sans-serif;font-size:9px;font-weight:700;letter-spacing:.4em;text-transform:uppercase;color:var(--ink4);display:flex;align-items:center;gap:12px;margin-bottom:20px}
        .vp-edition-line{height:1px;width:48px;background:var(--rule)}

        .vp-h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2rem,5vw,4.4rem);font-weight:900;letter-spacing:-.025em;color:var(--ink);line-height:1.05;margin-bottom:12px}
        .vp-h1 em{font-style:italic}

        .vp-sub{font-size:clamp(12px,1.4vw,14px);color:var(--ink3);font-style:italic;line-height:1.7;max-width:460px;margin-bottom:32px}

        /* search */
        .vp-search-row{display:flex;border:2px solid var(--ink);background:var(--white);max-width:640px}
        .vp-prefix{display:flex;align-items:center;padding:0 18px;font-family:system-ui,sans-serif;font-size:9px;font-weight:900;letter-spacing:.24em;text-transform:uppercase;color:var(--ink4);border-right:1px solid var(--rule);white-space:nowrap;height:52px;flex-shrink:0}
        .vp-inp{flex:1;height:52px;border:none;background:transparent;padding:0 16px;font-family:'EB Garamond',serif;font-size:16px;font-style:italic;color:var(--ink);outline:none;min-width:0}
        .vp-inp::placeholder{color:var(--ink4)}
        .vp-btn{height:52px;padding:0 28px;background:var(--ink);color:#fff;border:none;font-family:system-ui,sans-serif;font-size:9px;font-weight:900;letter-spacing:.22em;text-transform:uppercase;cursor:pointer;flex-shrink:0;transition:background .15s;white-space:nowrap}
        .vp-btn:hover:not(:disabled){background:var(--saff)}
        .vp-btn:disabled{opacity:.4;cursor:not-allowed}
        .vp-hint{font-size:11px;color:var(--ink4);font-style:italic;margin-top:8px}
        .vp-hint a{color:var(--ink3);text-decoration:underline}

        /* dot map */
        .vp-map-wrap{position:relative;margin-top:36px;border-top:1px solid var(--rule);overflow:hidden}
        .vp-map-svg{display:block;width:100%;height:clamp(140px,18vw,240px)}
        .vp-scan-line{position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(232,147,58,.09),transparent);animation:scanSlide 1.5s linear infinite;pointer-events:none}
        @keyframes scanSlide{to{left:140%}}
        .vp-map-bar{position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:7px clamp(16px,4vw,48px);border-top:1px solid var(--rule2);background:rgba(242,239,230,.92);backdrop-filter:blur(4px)}
        .vp-map-stat{font-family:system-ui,sans-serif;font-size:8px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ink4);display:flex;align-items:center;gap:8px}
        .vp-live{width:6px;height:6px;border-radius:50%;background:var(--em);animation:livePulse 2s infinite;flex-shrink:0}
        @keyframes livePulse{0%,100%{opacity:1}50%{opacity:.3}}

        /* results */
        .vp-results{max-width:1280px;margin:0 auto;padding:clamp(24px,4vw,48px) clamp(16px,4vw,48px)}

        /* loader */
        .vp-loader{display:flex;align-items:center;gap:14px;padding:20px 0}
        .vp-spin{width:22px;height:22px;border-radius:50%;border:2px solid var(--rule);border-top-color:var(--saff);animation:spin .7s linear infinite;flex-shrink:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        .vp-loader-txt{font-family:system-ui,sans-serif;font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ink4)}

        /* found card */
        .vp-card{border:1px solid var(--rule);background:var(--white);animation:riseUp .4s cubic-bezier(.16,1,.3,1) both}
        @keyframes riseUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .vp-card-head{background:var(--ink);padding:20px 24px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
        .vp-check{width:30px;height:30px;border-radius:50%;background:var(--em);display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .vp-check svg{width:15px;height:15px}
        .vp-card-lbl{font-family:system-ui,sans-serif;font-size:8px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:3px}
        .vp-card-nm{font-family:'Playfair Display',serif;font-size:clamp(1rem,1.8vw,1.35rem);font-weight:700;color:#fff;line-height:1.2}
        .vp-ufrn-pill{margin-left:auto;flex-shrink:0;font-family:system-ui,monospace;font-size:9px;font-weight:700;letter-spacing:.04em;color:var(--saff);border:1px solid rgba(232,147,58,.3);padding:5px 12px;background:rgba(232,147,58,.06);white-space:nowrap}
        .vp-card-body{padding:24px}
        .vp-logo-row{display:flex;align-items:center;gap:16px;padding-bottom:20px;border-bottom:1px solid var(--rule2);margin-bottom:20px}
        .vp-logo{width:54px;height:54px;border:1px solid var(--rule);background:var(--cream2);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--ink4);overflow:hidden;flex-shrink:0}
        .vp-logo img{width:100%;height:100%;object-fit:cover}
        .vp-cat{font-family:system-ui,sans-serif;font-size:8px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--saff);background:rgba(232,147,58,.07);border:1px solid rgba(232,147,58,.2);padding:2px 8px;display:inline-block;margin-bottom:6px}
        .vp-co-nm{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--ink);margin-bottom:3px}
        .vp-co-fd{font-size:12px;color:var(--ink3);font-style:italic}

        .vp-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px}
        @media(max-width:640px){.vp-fields{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:380px){.vp-fields{grid-template-columns:1fr}}
        .vf-l{font-family:system-ui,sans-serif;font-size:8px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ink4);margin-bottom:4px}
        .vf-v{font-size:13px;color:var(--ink)}
        .vf-v.green{color:var(--em);font-weight:600}
        .vf-v.mono{font-family:monospace;font-size:11px;color:var(--saff);font-weight:700}
        .vf-v.muted{color:var(--ink3);font-size:12px;font-style:italic}

        .vp-desc{font-size:13px;color:var(--ink3);font-style:italic;line-height:1.7;padding:14px 16px;border-left:2px solid var(--saff);background:var(--cream3);margin-bottom:20px}

        .vp-actions{display:flex;gap:10px;flex-wrap:wrap}
        .vp-act-p{display:inline-flex;align-items:center;gap:7px;background:var(--ink);color:#fff;padding:11px 22px;font-family:system-ui,sans-serif;font-size:9px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;transition:background .15s;border:none;cursor:pointer}
        .vp-act-p:hover{background:var(--saff)}
        .vp-act-g{display:inline-flex;align-items:center;gap:7px;background:transparent;color:var(--ink3);border:1px solid var(--rule);padding:11px 20px;font-family:system-ui,sans-serif;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .15s}
        .vp-act-g:hover{border-color:var(--ink);color:var(--ink)}

        .vp-cert{padding:14px 24px;background:var(--cream2);border-top:1px solid var(--rule2);display:flex;align-items:center;gap:12px;flex-wrap:wrap}
        .vp-cert-lbl{font-family:system-ui,sans-serif;font-size:8.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
        .vp-cert-sub{font-size:11px;color:var(--ink4);font-style:italic;margin-top:1px}
        .vp-cert-hash{margin-left:auto;font-family:monospace;font-size:9px;color:var(--ink4)}

        /* not found */
        .vp-nf{border:1px solid var(--rule);background:var(--white);padding:36px;text-align:center;animation:riseUp .3s ease both}
        .vp-nf-icon{font-size:32px;margin-bottom:12px}
        .vp-nf-h{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--ink);margin-bottom:8px}
        .vp-nf-p{font-size:13px;color:var(--ink3);font-style:italic;line-height:1.7;margin-bottom:20px;max-width:460px;margin-left:auto;margin-right:auto}
        code.vc{font-family:monospace;font-size:12px;color:var(--saff);background:var(--cream2);padding:1px 6px;font-style:normal}

        /* how it works */
        .vp-how{border-top:1px solid var(--rule);background:var(--white)}
        .vp-how-inner{max-width:1280px;margin:0 auto;padding:48px clamp(16px,4vw,48px)}
        .vp-sec-hd{display:flex;align-items:center;gap:12px;margin-bottom:28px}
        .vp-sec-lbl{font-family:system-ui,sans-serif;font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:.32em;color:var(--ink4);white-space:nowrap}
        .vp-sec-rule{flex:1;height:1px;background:var(--rule)}
        .vp-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--rule);background:var(--rule2)}
        @media(max-width:860px){.vp-steps{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:480px){.vp-steps{grid-template-columns:1fr}}
        .vp-step{background:var(--white);padding:24px 20px;border-right:1px solid var(--rule2);border-bottom:1px solid var(--rule2)}
        .vp-step:nth-child(4n){border-right:none}
        .vp-step-n{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:900;color:var(--rule2);line-height:1;margin-bottom:10px}
        .vp-step-h{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:var(--ink);margin-bottom:7px}
        .vp-step-p{font-size:12px;color:var(--ink3);font-style:italic;line-height:1.65}

        /* faq */
        .vp-faq-sec{border-top:1px solid var(--rule)}
        .vp-faq-inner{max-width:1280px;margin:0 auto;padding:48px clamp(16px,4vw,48px) 64px}
        .vp-faq-list{border:1px solid var(--rule)}
        .vp-faq-item{border-bottom:1px solid var(--rule2)}
        .vp-faq-item:last-child{border-bottom:none}
        .vp-faq-btn{width:100%;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:18px 22px;gap:16px;text-align:left}
        .vp-faq-q{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:var(--ink);line-height:1.3}
        .vp-faq-icon{width:22px;height:22px;border:1px solid var(--rule);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--ink4);font-size:16px;transition:all .2s}
        .vp-faq-item.open .vp-faq-icon{transform:rotate(45deg);border-color:var(--saff);color:var(--saff)}
        .vp-faq-a{font-size:13.5px;color:var(--ink3);font-style:italic;line-height:1.75;max-height:0;overflow:hidden;transition:max-height .3s ease,padding .2s;padding:0 22px}
        .vp-faq-item.open .vp-faq-a{max-height:300px;padding:0 22px 18px}
      `}</style>

      <div className="vp">
        <Navbar />

        {/* BREADCRUMB */}
        <div className="vp-bc">
          <ol>
            <li><a href="/">Home</a></li>
            <li><span className="vp-bc-sep">/</span></li>
            <li><a href="/startup">Registry</a></li>
            <li><span className="vp-bc-sep">/</span></li>
            <li style={{ color: "var(--ink)", fontWeight: 600 }}>Verify UFRN</li>
          </ol>
        </div>

        {/* HERO */}
        <section className="vp-hero">
          <div className="vp-hero-inner">
            <div className="vp-edition">
              <span className="vp-edition-line" />
              UpForge · Official Verification Tool
              <span className="vp-edition-line" />
            </div>
            <h1 className="vp-h1">
              Verify Any Startup's<br /><em>Registry Number</em>
            </h1>
            <p className="vp-sub">
              Enter a UFRN to access the official record — founders, funding, sector, and verification status. Instant. Free. Always.
            </p>

            <div className="vp-search-row">
              <span className="vp-prefix">UFRN</span>
              <input
                ref={inputRef}
                className="vp-inp"
                type="text"
                placeholder="e.g. UF-2026-AUS-00011 or just 11"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleVerify()}
                disabled={phase === "searching"}
                autoComplete="off"
                spellCheck={false}
              />
              <button
                className="vp-btn"
                onClick={handleVerify}
                disabled={!input.trim() || phase === "searching"}
              >
                {phase === "searching" ? "Scanning…" : "Verify →"}
              </button>
            </div>
            <p className="vp-hint">
              No UFRN yet? <a href="/submit">Submit your startup free</a> to receive one.
            </p>

            {/* ANIMATED DOT MAP */}
            <div className="vp-map-wrap">
              {phase === "searching" && <div className="vp-scan-line" />}
              <svg
                className="vp-map-svg"
                viewBox="0 0 100 50"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {DOTS.map(([x, y], i) => {
                  const isActive = activeDots.has(i)
                  return (
                    <circle
                      key={i}
                      cx={x} cy={y}
                      r={isActive ? 0.85 : 0.55}
                      fill={isActive ? "var(--saff)" : "var(--ink4)"}
                      opacity={isActive ? 1 : 0.3}
                      style={{ transition: "fill .1s, r .1s, opacity .1s" }}
                    />
                  )
                })}
              </svg>
              <div className="vp-map-bar">
                <div className="vp-map-stat">
                  <span className="vp-live" />
                  {phase === "searching" ? "Scanning global registry…" : `Registry Online · ${totalCount.toLocaleString()}+ verified entries`}
                </div>
                <div className="vp-map-stat">upforge.org · Global</div>
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <div className="vp-results">

          {phase === "searching" && (
            <div className="vp-loader">
              <div className="vp-spin" />
              <span className="vp-loader-txt">Cross-referencing {totalCount.toLocaleString()}+ registry entries…</span>
            </div>
          )}

          {phase === "found" && result && (
            <div className="vp-card">
              <div className="vp-card-head">
                <div className="vp-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                </div>
                <div>
                  <div className="vp-card-lbl">✓ Verified in Registry</div>
                  <div className="vp-card-nm">{result.name}</div>
                </div>
                <div className="vp-ufrn-pill">{result.ufrn}</div>
              </div>

              <div className="vp-card-body">
                <div className="vp-logo-row">
                  <div className="vp-logo">
                    {result.logo_url ? <img src={result.logo_url} alt={result.name} /> : result.name.charAt(0)}
                  </div>
                  <div>
                    {result.category && <span className="vp-cat">{result.category}</span>}
                    <div className="vp-co-nm">{result.name}</div>
                    {result.founders && <div className="vp-co-fd">Founded by {result.founders}</div>}
                  </div>
                </div>

                <div className="vp-fields">
                  <div><div className="vf-l">Status</div><div className="vf-v green">✓ Approved & Verified</div></div>
                  <div><div className="vf-l">UFRN</div><div className="vf-v mono">{result.ufrn}</div></div>
                  {result.founded_year && <div><div className="vf-l">Founded</div><div className="vf-v">{result.founded_year}</div></div>}
                  {(result.city || result.country_name) && (
                    <div><div className="vf-l">Location</div><div className="vf-v">{[result.city, result.country_name].filter(Boolean).join(", ")}</div></div>
                  )}
                  {result.funding_stage && <div><div className="vf-l">Stage</div><div className="vf-v">{result.funding_stage}</div></div>}
                  {fmt(result.funding_amount) && <div><div className="vf-l">Raised</div><div className="vf-v">{fmt(result.funding_amount)}</div></div>}
                  {result.updated_at && (
                    <div><div className="vf-l">Last Verified</div><div className="vf-v muted">{new Date(result.updated_at).toLocaleDateString("en-IN",{year:"numeric",month:"short",day:"numeric"})}</div></div>
                  )}
                  <div><div className="vf-l">Registry</div><div className="vf-v muted">UpForge Global</div></div>
                </div>

                {result.description && <div className="vp-desc">{result.description}</div>}

                <div className="vp-actions">
                  <a href={`/startup/${result.slug}`} className="vp-act-p">View Full Profile →</a>
                  <button className="vp-act-g" onClick={handleCopy}>{copied ? "✓ Copied" : "Share Link"}</button>
                  <button className="vp-act-g" onClick={handleReset}>New Search</button>
                </div>
              </div>

              <div className="vp-cert">
                <div>
                  <div className="vp-cert-lbl">UpForge Verification Certificate</div>
                  <div className="vp-cert-sub">Manually reviewed by the UpForge editorial team</div>
                </div>
                <span className="vp-cert-hash">#{result.id?.slice(0, 8).toUpperCase()}</span>
              </div>
            </div>
          )}

          {phase === "notfound" && (
            <div className="vp-nf">
              <div className="vp-nf-icon">◎</div>
              <h2 className="vp-nf-h">No Record Found</h2>
              <p className="vp-nf-p">
                No approved startup matched that UFRN. Ensure the format is correct:<br />
                <code className="vc">UF-2026-AUS-00011</code> or just the number <code className="vc">11</code>.<br /><br />
                The startup may not have been submitted or approved yet.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="vp-act-g" onClick={handleReset}>Try Again</button>
                <a href="/submit" className="vp-act-p">Submit a Startup →</a>
              </div>
            </div>
          )}

          {phase === "error" && (
            <div className="vp-nf">
              <div className="vp-nf-icon">△</div>
              <h2 className="vp-nf-h">Registry Unavailable</h2>
              <p className="vp-nf-p">Could not connect to the registry. Please try again.</p>
              <button className="vp-act-g" onClick={handleReset}>Try Again</button>
            </div>
          )}
        </div>

        {/* HOW IT WORKS */}
        <section className="vp-how">
          <div className="vp-how-inner">
            <div className="vp-sec-hd">
              <span className="vp-sec-lbl">How Verification Works</span>
              <span className="vp-sec-rule" />
            </div>
            <div className="vp-steps">
              {[
                { n: "01", h: "Obtain the UFRN", p: "Get the number from the startup's website or deck. Format: UF-YEAR-CC-XXXXX. Short form (e.g. 11) also accepted." },
                { n: "02", h: "Enter & Verify",  p: "Type or paste the UFRN in the search box above and press Verify. Results in under 2 seconds." },
                { n: "03", h: "View the Record", p: "See the official registry entry — founders, sector, location, funding, and live verification status." },
                { n: "04", h: "Share Certificate", p: "Copy the link or share the certificate as proof in a deal, press feature, or due diligence report." },
              ].map(s => (
                <div key={s.n} className="vp-step">
                  <div className="vp-step-n">{s.n}</div>
                  <div className="vp-step-h">{s.h}</div>
                  <p className="vp-step-p">{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="vp-faq-sec">
          <div className="vp-faq-inner">
            <div className="vp-sec-hd">
              <span className="vp-sec-lbl">Frequently Asked Questions</span>
              <span className="vp-sec-rule" />
            </div>
            <FAQAccordion />
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

const FAQ_ITEMS = [
  { q: "What is the UFRN format?", a: "UFRN = UpForge Registry Number. Format: UF-YEAR-COUNTRYCODE-SEQNUM. Example: UF-2026-AUS-00011 or UF-2026-IND-00013. You can also enter just the number (e.g. 11) and the tool auto-resolves it." },
  { q: "Why is my UFRN showing 'Not Found'?", a: "Common reasons: (1) Wrong country code — e.g. AUS for Australia, IND for India. (2) The startup hasn't been approved yet. (3) Typo in the number. Try entering just the numeric portion." },
  { q: "Is verification free?", a: "Yes — completely free, no account required, unlimited lookups. The UpForge registry is maintained independently and will always remain free." },
  { q: "What does 'Verified' mean?", a: "Every UFRN is assigned after the UpForge editorial team manually reviews the startup — confirming it's active, has real founders, and submitted accurate information." },
  { q: "How do I get a UFRN for my startup?", a: "Submit for free at upforge.in/submit. The team reviews and assigns a permanent UFRN upon approval, typically within a few business days." },
  { q: "How is UFRN different from company registration (CIN/ASIC)?", a: "Company registration verifies legal incorporation. UFRN verifies active startup operations, real founders, and a real product. They are complementary, not replacements." },
]

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="vp-faq-list">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className={`vp-faq-item${open === i ? " open" : ""}`}>
          <button className="vp-faq-btn" onClick={() => setOpen(open === i ? null : i)}>
            <span className="vp-faq-q">{item.q}</span>
            <span className="vp-faq-icon">+</span>
          </button>
          <div className="vp-faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  )
}
