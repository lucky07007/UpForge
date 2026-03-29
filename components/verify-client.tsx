"use client"
/**
 * components/verify-client.tsx
 * UFRN Verification — Premium Editorial Design
 * Optimized visual layout with global radar scanning and professional typography.
 */

import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle2, Search, Share2, RotateCcw, ShieldCheck, MapPin, Calendar, Layers, Globe } from "lucide-react"

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

// Landmass dot positions [x%, y%] for the world map visualization
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
    if (/^\d+$/.test(stripped)) {
        const country = isOrg ? "AUS" : "IND";
        return `UF-2026-${country}-${stripped.padStart(5, '0')}`;
    }
    return s.startsWith("UF-") ? s : `UF-${s}`
  }

  function startScan() {
    scanTimer.current = setInterval(() => {
      const set = new Set<number>()
      while (set.size < 12) set.add(Math.floor(Math.random() * DOTS.length))
      setActiveDots(set)
    }, 100)
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
        .select("*")
        .eq("ufrn", ufrn)
        .eq("status", "approved")
        .single()
      
      await new Promise(r => setTimeout(r, 1800))
      stopScan()
      
      if (error || !data) setPhase("notfound")
      else { setResult(data as StartupRecord); setPhase("found") }
    } catch { stopScan(); setPhase("error") }
  }, [input, isOrg])

  const handleReset = () => {
    setPhase("idle"); setResult(null); setInput("")
    setTimeout(() => inputRef.current?.focus(), 80)
  }

  const handleCopy = () => {
    if (!result) return
    const url = isOrg ? "upforge.org" : "upforge.in"
    navigator.clipboard.writeText(`https://www.${url}/verify?ufrn=${result.ufrn}`)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const fmt = (amt?: number | null) => {
    if (!amt) return null
    if (amt >= 1e9) return `$${(amt/1e9).toFixed(1)}B`
    if (amt >= 1e6) return `$${(amt/1e6).toFixed(1)}M`
    return `$${amt.toLocaleString()}`
  }

  return (
    <>
      <style>{`
        .vp-search-box { 
          max-width: 680px; margin: 0 auto 60px; position: relative;
          background: #FFF; border: 2px solid #111; display: flex;
          box-shadow: 10px 10px 0px rgba(17, 17, 17, 0.05); transition: all 0.2s ease;
        }
        .vp-search-box:focus-within { transform: translate(-2px, -2px); box-shadow: 14px 14px 0px rgba(197, 154, 46, 0.15); }
        .vp-input { flex: 1; padding: 22px 28px; border: none; font-size: 1.15rem; font-weight: 600; outline: none; letter-spacing: 0.02em; }
        .vp-submit { background: #111; color: #FFF; border: none; padding: 0 36px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; cursor: pointer; transition: 0.2s; }
        .vp-submit:hover:not(:disabled) { background: #C59A2E; }
        
        .vp-map-container { max-width: 1000px; margin: 0 auto; position: relative; border-top: 1px solid #EEE; overflow: hidden; padding: 60px 0; }
        .vp-dot-map { width: 100%; height: 240px; opacity: 0.9; }
        .vp-map-label { position: absolute; bottom: 30px; width: 100%; display: flex; justify-content: space-around; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.25em; color: #BBB; }

        .vp-certificate { 
          max-width: 850px; margin: 0 auto 100px; background: #FFF; border: 1px solid #D8D2C8; 
          text-align: left; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.03);
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        
        .vp-cert-top { background: #111; color: #FFF; padding: 36px 44px; display: flex; justify-content: space-between; align-items: center; }
        .vp-cert-body { padding: 48px 54px; }
        .vp-field-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 40px; border-top: 1px solid #F0F0F0; padding-top: 40px; }
        
        .vp-how-section { padding: 100px 24px; border-top: 1px solid #EEE; text-align: center; }
        .vp-step-grid { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1100px; margin: 60px auto 0; gap: 48px; }
        @media (max-width: 850px) { .vp-step-grid { grid-template-columns: 1fr; } .vp-field-grid { grid-template-columns: 1fr; } .vp-cert-body { padding: 30px; } }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Masthead */}
        <header className="pt-16 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] text-white text-[9px] font-black tracking-[0.25em] uppercase mb-8">
            <ShieldCheck size={12} /> UpForge Verified Registry
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#111] mb-6">
            Registry Lookup
          </h1>
          <p className="text-[#777] text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Confirm operational status, verified founders, and official records of any entity within the UpForge Global Index.
          </p>

          <div className="vp-search-box">
            <input 
              ref={inputRef}
              className="vp-input"
              placeholder="Enter UFRN (e.g. 00013)"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleVerify()}
              disabled={phase === "searching"}
            />
            <button 
              className="vp-submit"
              onClick={handleVerify}
              disabled={!input || phase === "searching"}
            >
              {phase === "searching" ? "Scanning" : "Verify Number"}
            </button>
          </div>
        </header>

        {/* Interactive Radar Scanning Map */}
        <section className="vp-map-container">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C59A2E]/5 to-transparent w-1/3 animate-[scan_2.5s_linear_infinite]" />
          <style>{`@keyframes scan { from { left: -30%; } to { left: 130%; } }`}</style>
          <svg className="vp-dot-map" viewBox="0 0 100 50">
            {DOTS.map(([x, y], i) => (
              <circle 
                key={i} cx={x} cy={y} 
                r={activeDots.has(i) ? 1 : 0.55} 
                fill={activeDots.has(i) ? "#C59A2E" : "#D8D2C8"}
                style={{ transition: 'all 0.15s ease', opacity: activeDots.has(i) ? 1 : 0.35 }}
              />
            ))}
          </svg>
          <div className="vp-map-label">
            <span>Global Node Audit Active</span>
            <span>{totalCount.toLocaleString()}+ Verified Entities</span>
            <span>Real-time Registry Index</span>
          </div>
        </section>

        {/* Search Results */}
        <section className="mt-12">
          {phase === "searching" && (
            <div className="py-24 animate-pulse">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#AAA] mb-2">Secure Connection Established</div>
              <div className="text-xs font-bold text-[#111]">Cross-Referencing Global Database...</div>
            </div>
          )}

          {phase === "found" && result && (
            <div className="vp-certificate">
              <div className="vp-cert-top">
                <div className="flex items-center gap-5">
                  <div className="bg-emerald-500 p-2.5 rounded-full shadow-lg shadow-emerald-500/20"><CheckCircle2 className="text-white" size={22}/></div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-50">Identity Verified</div>
                    <div className="text-2xl font-bold tracking-tight uppercase">{result.name}</div>
                  </div>
                </div>
                <div className="text-right border-l border-white/20 pl-8">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-50">UFRN Number</div>
                  <div className="font-mono text-lg text-[#C59A2E] font-black tracking-tighter">{result.ufrn}</div>
                </div>
              </div>

              <div className="vp-cert-body">
                 <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-28 h-28 bg-[#FBFBFB] border border-[#EEE] flex items-center justify-center shrink-0 shadow-sm">
                       {result.logo_url ? <img src={result.logo_url} className="w-full h-full object-cover" alt=""/> : <span className="text-5xl font-black text-[#DDD]">{result.name[0]}</span>}
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-[10px] font-black uppercase tracking-widest border border-amber-100 mb-3">
                         Sector: {result.category}
                      </span>
                      <h3 className="text-3xl font-bold text-[#111] mb-2 tracking-tight">{result.name}</h3>
                      <p className="text-base font-medium text-[#777]">Managed by {result.founders}</p>
                    </div>
                 </div>

                 <div className="vp-field-grid">
                    <Field icon={ShieldCheck} label="Audit Status" value="Editorial Board Verified" />
                    <Field icon={MapPin} label="Official HQ" value={`${result.city || 'Global'}, ${result.country_code}`} />
                    <Field icon={Layers} label="Investment Stage" value={result.funding_stage || 'Private'} />
                    <Field icon={Calendar} label="Registered Since" value={result.founded_year?.toString() || '2026'} />
                    <Field icon={RotateCcw} label="Last Updated" value={new Date(result.updated_at || "").toLocaleDateString()} />
                    <Field icon={Search} label="Ledger Index" value={`#${result.id.slice(0,8).toUpperCase()}`} />
                 </div>

                 <div className="mt-12 flex flex-wrap gap-5">
                    <Link href={`/startup/${result.slug}`} className="bg-[#111] text-white px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-[#C59A2E] transition-all shadow-xl shadow-black/5">
                      Full Registry Dossier
                    </Link>
                    <button onClick={handleCopy} className="border-2 border-[#111] px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-[#F6F3ED] flex items-center gap-2 transition-colors">
                      <Share2 size={14}/> {copied ? "Verified Link Copied" : "Share Record"}
                    </button>
                    <button onClick={handleReset} className="ml-auto text-[#AAA] hover:text-[#111] text-[10px] font-black uppercase tracking-widest transition-colors">
                      New Search
                    </button>
                 </div>
              </div>
            </div>
          )}

          {phase === "notfound" && (
            <div className="max-w-[550px] mx-auto py-24 border-2 border-dashed border-[#DDD] bg-[#FDFCF8] mb-20">
              <div className="text-[#CCC] mb-6 flex justify-center"><Search size={50}/></div>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-[#111] mb-3">Record Not Located</h3>
              <p className="text-[#888] font-medium mb-10 px-12 leading-relaxed">The Registry Number <span className="font-mono font-black text-[#111]">"{normalizeUFRN(input)}"</span> does not match an approved entity in our global index.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={handleReset} className="text-[10px] font-black uppercase tracking-[0.2em] border-2 border-[#111] px-8 py-3 hover:bg-[#111] hover:text-white transition-all">Try Another</button>
                <Link href="/submit" className="text-[10px] font-black uppercase tracking-[0.2em] bg-[#111] text-white px-8 py-3 hover:bg-[#C59A2E] transition-all">Submit Entity</Link>
              </div>
            </div>
          )}
        </section>

        {/* System Architecture / How it Works */}
        <section className="vp-how-section">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C59A2E] mb-4 block">System Architecture</span>
           <h2 className="text-4xl font-bold tracking-tight text-[#111]">Registry Workflow</h2>
           <div className="vp-step-grid">
              <Step num="01" title="Data Ingestion" desc="Entities submit operational data through secure encrypted gateways." />
              <Step num="02" title="Manual Audit" desc="Our editorial board performs manual due diligence on founders and status." />
              <Step num="03" title="UFRN Cryptography" desc="Upon approval, a unique sequential Registry Number is issued." />
              <Step num="04" title="Public Ledger" desc="The record is added to the global searchable index for verification." />
           </div>
        </section>
      </div>
    </>
  )
}

function Field({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div>
            <div className="flex items-center gap-2 text-[#AAA] mb-2">
                <Icon size={12} className="text-[#C59A2E]"/>
                <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <div className="text-[15px] font-bold text-[#111] tracking-tight">{value}</div>
        </div>
    )
}

function Step({ num, title, desc }: { num: string, title: string, desc: string }) {
    return (
        <div className="text-left border-l-2 border-[#111] pl-8 py-2">
            <div className="text-5xl font-black text-[#F0F0F0] mb-4 leading-none">{num}</div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-3 text-[#111]">{title}</h4>
            <p className="text-[13px] font-medium text-[#777] leading-relaxed">{desc}</p>
        </div>
    )
}
