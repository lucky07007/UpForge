// components/chatbot.tsx
"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { X, Send, Loader2, Minus, RotateCcw, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant"
  content: string
}

// ─── RICH TEXT — Newspaper editorial style ────────────────────────────────────

function RichText({ text }: { text: string }) {
  const lines = text.split("\n").reduce<string[]>((acc, line, i, arr) => {
    if (line.trim() === "" && i > 0 && arr[i - 1].trim() === "") return acc
    acc.push(line)
    return acc
  }, [])

  const inline = (str: string): React.ReactNode[] =>
    str.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**"))
        return (
          <strong key={i} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: "#1A1208" }}>
            {p.slice(2, -2)}
          </strong>
        )
      if (p.startsWith("*") && p.endsWith("*"))
        return <em key={i} className="italic text-[#5A4A30]">{p.slice(1, -1)}</em>
      if (p.startsWith("`") && p.endsWith("`"))
        return (
          <code key={i} className="px-1 py-0.5 text-[10px] font-mono rounded-none"
            style={{ background: "#EDE9DF", color: "#1A1208", border: "1px solid #C8C2B4" }}>
            {p.slice(1, -1)}
          </code>
        )
      return <span key={i}>{p}</span>
    })

  const els: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const t = lines[i].trim()
    if (!t) { els.push(<div key={`s${i}`} className="h-2" />); i++; continue }

    // Numbered list
    if (/^(\d+)[.)]\s/.test(t)) {
      const items: { n: string; text: string }[] = []
      while (i < lines.length) {
        const m = lines[i].trim().match(/^(\d+)[.)]\s+(.+)$/)
        if (!m) break
        items.push({ n: m[1], text: m[2] }); i++
      }
      els.push(
        <ol key={`ol${i}`} className="space-y-2 my-2.5">
          {items.map((it, ix) => (
            <li key={ix} className="flex items-start gap-2.5">
              <span
                className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-white text-[8px] font-black mt-[1px]"
                style={{ background: "#1A1208", fontFamily: "system-ui" }}
              >
                {it.n}
              </span>
              <span className="flex-1 text-[11.5px] leading-relaxed text-[#2C2010]"
                style={{ fontFamily: "'Georgia', Times New Roman, serif" }}>
                {inline(it.text)}
              </span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Bullet list
    if (/^[-•]\s/.test(t)) {
      const items: string[] = []
      while (i < lines.length) {
        const m = lines[i].trim().match(/^[-•]\s+(.+)$/)
        if (!m) break
        items.push(m[1]); i++
      }
      els.push(
        <ul key={`ul${i}`} className="space-y-1.5 my-2.5">
          {items.map((b, ix) => (
            <li key={ix} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 mt-[7px]" style={{ width: 5, height: 5, background: "#D97706", transform: "rotate(45deg)", display: "inline-block" }} />
              <span className="flex-1 text-[11.5px] leading-relaxed text-[#2C2010]"
                style={{ fontFamily: "'Georgia', Times New Roman, serif" }}>
                {inline(b)}
              </span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Headings
    const hm = t.match(/^(#{1,3})\s+(.+)$/)
    if (hm) {
      els.push(
        <p key={`h${i}`}
          className="font-black text-[#1A1208] mt-3 mb-1 uppercase tracking-[0.1em]"
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: hm[1].length === 1 ? 10 : 9,
            borderBottom: "1px solid #C8C2B4",
            paddingBottom: 4,
          }}>
          {inline(hm[2])}
        </p>
      )
      i++; continue
    }

    // Horizontal rule
    if (t === "---") {
      els.push(
        <div key={`hr${i}`} className="flex items-center gap-2 my-3">
          <div className="flex-1 h-px" style={{ background: "#C8C2B4" }} />
          <span style={{ color: "#C8C2B4", fontSize: 8 }}>✦</span>
          <div className="flex-1 h-px" style={{ background: "#C8C2B4" }} />
        </div>
      )
      i++; continue
    }

    // Regular paragraph
    els.push(
      <p key={`p${i}`}
        className="text-[11.5px] leading-[1.85] text-[#2C2010]"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        {inline(t)}
      </p>
    )
    i++
  }

  return <div className="space-y-[3px]">{els}</div>
}

// ─── TYPING INDICATOR ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: 4,
            height: 4,
            background: "#C8C2B4",
            display: "inline-block",
            animation: `chronicleBounce 1.2s ${i * 0.18}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ─── MESSAGE BUBBLE ───────────────────────────────────────────────────────────

function Bubble({ msg, isNew }: { msg: Message; isNew: boolean }) {
  const isUser = msg.role === "user"

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 mb-0.5 overflow-hidden"
          style={{ width: 22, height: 22, background: "#1A1208" }}
        >
          <Image
            src="/robot.jpg"
            alt="Forge"
            width={22}
            height={22}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      {/* Bubble */}
      {isUser ? (
        <div
          className="max-w-[80%] px-3 py-2"
          style={{ background: "#1A1208", borderLeft: "2px solid #D97706" }}
        >
          <span
            className="text-[11.5px] leading-relaxed text-white"
            style={{ fontFamily: "'Georgia', Times New Roman, serif" }}
          >
            {msg.content}
          </span>
        </div>
      ) : (
        <div
          className="max-w-[82%] px-3 py-2.5"
          style={{
            background: "#FDFCF9",
            border: "1px solid #DDD8CE",
            borderLeft: "2px solid #D97706",
          }}
        >
          <RichText text={msg.content} />
        </div>
      )}
    </motion.div>
  )
}

// ─── QUICK PROMPTS ────────────────────────────────────────────────────────────

const PROMPTS = [
  { q: "How to list my startup free?", cat: "Registry" },
  { q: "Hottest sectors in India 2026?", cat: "Trends" },
  { q: "What makes a unicorn founder?", cat: "Founders" },
  { q: "SaaS valuation benchmarks?", cat: "Finance" },
]

// ─── EDITION HEADER ORNAMENT ──────────────────────────────────────────────────

function EditionRule() {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5" style={{ borderBottom: "1px solid #2E2410" }}>
      <div className="flex-1 h-px" style={{ background: "#2E2410" }} />
      <span style={{ color: "#D97706", fontSize: 7, letterSpacing: "0.3em", fontFamily: "system-ui" }}>✦ FORGE AI ✦</span>
      <div className="flex-1 h-px" style={{ background: "#2E2410" }} />
    </div>
  )
}

// ─── MAIN CHATBOT ─────────────────────────────────────────────────────────────

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [badge, setBadge] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const [msgs, setMsgs] = useState<Message[]>([{
    role: "assistant",
    content: "Good day — I'm **Forge**, UpForge's editorial AI.\n\nAsk me anything about:\n- Indian startup funding & valuations\n- Founder stories & hot sectors\n- How to list your startup free\n- Investor landscape & unicorn data\n\nWhat would you like to know?",
  }])
  const [justAdded, setJustAdded] = useState<Set<number>>(new Set())

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [msgs, loading])

  useEffect(() => {
    if (isOpen && !minimized) {
      setShowTooltip(false)
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [isOpen, minimized])

  useEffect(() => { if (isOpen) setBadge(0) }, [isOpen])

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    const userMsg: Message = { role: "user", content: msg }
    const nextIdx = msgs.length + 1
    setMsgs(p => [...p, userMsg])
    setJustAdded(p => new Set(p).add(msgs.length))
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      })
      const data = await res.json()
      const reply = data.message ?? data.error ?? "Couldn't process that — please try again."
      setMsgs(p => [...p, { role: "assistant", content: reply }])
      setJustAdded(p => new Set(p).add(nextIdx))
      if (!isOpen) setBadge(c => c + 1)
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: "Network issue — please try again." }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, msgs, isOpen])

  const reset = () => {
    setMsgs([{
      role: "assistant",
      content: "Good day — I'm **Forge**, UpForge's editorial AI.\n\nAsk me anything about:\n- Indian startup funding & valuations\n- Founder stories & hot sectors\n- How to list your startup free\n- Investor landscape & unicorn data\n\nWhat would you like to know?",
    }])
    setJustAdded(new Set())
    setInput("")
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        @keyframes chronicleBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-4px); opacity: 1; }
        }

        @keyframes inkPulse {
          0%, 100% { opacity: 0.06; transform: scale(1); }
          50% { opacity: 0.18; transform: scale(1.08); }
        }

        @keyframes pageIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes goldSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .chronicle-scroll::-webkit-scrollbar { width: 2px; }
        .chronicle-scroll::-webkit-scrollbar-thumb { background: #C8C2B4; }
        .chronicle-scroll::-webkit-scrollbar-track { background: transparent; }

        .prompt-chip:hover {
          background: #1A1208 !important;
          border-color: #1A1208 !important;
          color: white !important;
        }
        .prompt-chip:hover .chip-cat {
          color: #D97706 !important;
        }
        .prompt-chip:hover .chip-arrow {
          opacity: 1 !important;
          color: #D97706 !important;
        }

        .forge-input:focus {
          outline: none;
          border-color: #1A1208 !important;
          box-shadow: inset 0 0 0 1px #1A1208;
        }

        .send-btn:not([disabled]):hover {
          background: #D97706 !important;
          color: white !important;
        }

        .forge-fab-img {
          transition: transform 0.3s ease;
        }
        .forge-fab:hover .forge-fab-img {
          transform: scale(1.04);
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

        {/* ═══════════════════════════════════════════════════
            CHAT WINDOW — Broadsheet newspaper panel
        ═══════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Forge — UpForge AI startup analyst"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 flex flex-col overflow-hidden"
              style={{
                width: "min(92vw, 364px)",
                height: minimized ? "auto" : "min(580px, 80vh)",
                background: "#F3EFE5",
                border: "2px solid #1A1208",
                boxShadow: "6px 6px 0px #1A1208, 0 24px 64px rgba(0,0,0,0.22)",
              }}
            >

              {/* ── MASTHEAD ─────────────────────────────────────── */}
              <div style={{ background: "#1A1208", flexShrink: 0 }}>

                {/* Gold rule top */}
                <div style={{ height: 2, background: "linear-gradient(90deg, #8B6914, #D97706, #E8C547, #D97706, #8B6914)" }} />

                {/* Publication name row */}
                <div
                  className="flex items-center justify-between px-3.5 pt-2 pb-1"
                  style={{ borderBottom: "1px solid #2E2410" }}
                >
                  <div>
                    <p
                      className="text-white leading-none tracking-tight"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 900 }}
                    >
                      The Forge
                    </p>
                    <p
                      className="uppercase tracking-[0.28em] leading-none mt-0.5"
                      style={{ fontFamily: "system-ui", fontSize: 7, color: "#D97706" }}
                    >
                      AI Edition · UpForge
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-0">
                    <button
                      onClick={reset}
                      aria-label="New conversation"
                      className="p-1.5 transition-colors"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#D97706")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                    >
                      <RotateCcw style={{ width: 11, height: 11 }} />
                    </button>
                    <button
                      onClick={() => setMinimized(v => !v)}
                      aria-label={minimized ? "Expand" : "Minimise"}
                      className="p-1.5 transition-colors"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#D97706")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                    >
                      <Minus style={{ width: 11, height: 11 }} />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Close"
                      className="p-1.5 transition-colors"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#D97706")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                    >
                      <X style={{ width: 11, height: 11 }} />
                    </button>
                  </div>
                </div>

                {/* Byline / edition row */}
                <EditionRule />

                {/* Avatar + headline row */}
                <div className="flex items-center gap-3 px-3.5 py-2.5">
                  {/* Forge portrait */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="overflow-hidden"
                      style={{
                        width: 36,
                        height: 36,
                        border: "1.5px solid #D97706",
                        background: "#111",
                      }}
                    >
                      <Image
                        src="/robot.jpg"
                        alt="Forge AI"
                        width={36}
                        height={36}
                        className="w-full h-full object-cover object-top"
                        priority
                      />
                    </div>
                    {/* Online dot */}
                    <span
                      className="absolute -bottom-0.5 -right-0.5 rounded-full border"
                      style={{ width: 8, height: 8, background: "#22C55E", borderColor: "#1A1208", borderWidth: 1.5 }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-white leading-none"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 12, fontWeight: 700 }}
                    >
                      Forge — India Startup AI
                    </p>
                    <p
                      className="mt-0.5 leading-snug"
                      style={{ fontFamily: "system-ui", fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}
                    >
                      Startup analyst · Real-time insight · Free registry guide
                    </p>
                  </div>
                </div>

              </div>
              {/* end masthead */}

              {/* ── COLLAPSIBLE BODY ─────────────────────────────── */}
              <AnimatePresence initial={false}>
                {!minimized && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex flex-col flex-1 overflow-hidden"
                    style={{ minHeight: 0 }}
                  >

                    {/* ── MESSAGES ───────────────────────────────── */}
                    <div
                      ref={scrollRef}
                      aria-live="polite"
                      className="chronicle-scroll flex-1 overflow-y-auto px-3.5 py-4 space-y-3"
                      style={{ background: "#F3EFE5" }}
                    >
                      {/* Dateline decorative */}
                      <div
                        className="flex items-center justify-center mb-1"
                        style={{ fontFamily: "system-ui", fontSize: 8, color: "#BBB0A0", letterSpacing: "0.2em" }}
                      >
                        ──── MARCH 2026 · INDIA EDITION ────
                      </div>

                      {msgs.map((m, idx) => (
                        <Bubble key={idx} msg={m} isNew={justAdded.has(idx)} />
                      ))}

                      {loading && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-end gap-2"
                        >
                          <div
                            className="flex-shrink-0 overflow-hidden"
                            style={{ width: 22, height: 22, background: "#1A1208" }}
                          >
                            <Image src="/robot.jpg" alt="" width={22} height={22} className="w-full h-full object-cover object-top" />
                          </div>
                          <div
                            style={{
                              background: "#FDFCF9",
                              border: "1px solid #DDD8CE",
                              borderLeft: "2px solid #D97706",
                            }}
                          >
                            <TypingDots />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* ── QUICK PROMPTS (first message only) ─────── */}
                    {msgs.length === 1 && (
                      <div
                        className="px-3.5 pt-3 pb-3 flex-shrink-0"
                        style={{
                          borderTop: "1px solid #C8C2B4",
                          background: "#EDE9DF",
                        }}
                      >
                        {/* Column head */}
                        <p
                          className="uppercase tracking-[0.28em] mb-2"
                          style={{ fontFamily: "system-ui", fontSize: 8, color: "#AAA09A", fontWeight: 700 }}
                        >
                          Try asking Forge —
                        </p>

                        <div className="grid grid-cols-1 gap-1.5">
                          {PROMPTS.map((p, idx) => (
                            <button
                              key={idx}
                              onClick={() => send(p.q)}
                              className="prompt-chip text-left flex items-center justify-between px-2.5 py-2 transition-all duration-150"
                              style={{
                                background: "white",
                                border: "1px solid #D8D2C4",
                                fontFamily: "'Georgia', Times New Roman, serif",
                              }}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className="chip-cat flex-shrink-0 uppercase tracking-wider font-black"
                                  style={{ fontFamily: "system-ui", fontSize: 7, color: "#D97706" }}
                                >
                                  {p.cat}
                                </span>
                                <span
                                  className="text-[11px] text-[#2C2010] truncate"
                                  style={{ fontFamily: "'Georgia', serif" }}
                                >
                                  {p.q}
                                </span>
                              </div>
                              <ChevronRight
                                className="chip-arrow flex-shrink-0 opacity-0 transition-opacity"
                                style={{ width: 10, height: 10, color: "#D97706" }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── INPUT BAR ──────────────────────────────── */}
                    <div
                      className="px-3.5 py-3 flex-shrink-0"
                      style={{
                        borderTop: "2px solid #1A1208",
                        background: "#F3EFE5",
                      }}
                    >
                      {/* Column rule above input */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-px" style={{ background: "#C8C2B4" }} />
                        <span style={{ fontFamily: "system-ui", fontSize: 7, color: "#C8C2B4", letterSpacing: "0.2em" }}>
                          YOUR QUERY
                        </span>
                        <div className="flex-1 h-px" style={{ background: "#C8C2B4" }} />
                      </div>

                      <div className="flex items-stretch gap-2">
                        <input
                          ref={inputRef}
                          value={input}
                          disabled={loading}
                          onChange={e => setInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              send()
                            }
                          }}
                          placeholder="Ask about Indian startups…"
                          aria-label="Message Forge"
                          className="forge-input flex-1 px-3 py-2 text-[11.5px] text-[#1A1208] placeholder-[#BBB0A0] transition-all"
                          style={{
                            fontFamily: "'Georgia', Times New Roman, serif",
                            background: "white",
                            border: "1px solid #C8C2B4",
                            outline: "none",
                          }}
                        />
                        <button
                          onClick={() => send()}
                          disabled={loading || !input.trim()}
                          aria-label="Send message"
                          className="send-btn flex items-center justify-center flex-shrink-0 transition-all duration-150"
                          style={{
                            width: 36,
                            background: loading || !input.trim() ? "#EDE9DF" : "#1A1208",
                            color: loading || !input.trim() ? "#C8C2B4" : "white",
                            border: "1px solid",
                            borderColor: loading || !input.trim() ? "#D8D2C4" : "#1A1208",
                            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                          }}
                        >
                          {loading
                            ? <Loader2 style={{ width: 13, height: 13, animation: "spin 1s linear infinite" }} />
                            : <Send style={{ width: 13, height: 13 }} />
                          }
                        </button>
                      </div>

                      {/* Footer caption line */}
                      <div className="flex items-center justify-between mt-2">
                        <span
                          style={{ fontFamily: "system-ui", fontSize: 8, color: "#BBB0A0", letterSpacing: "0.1em" }}
                        >
                          Forge · UpForge AI · No paid placements
                        </span>
                        <span
                          style={{ fontFamily: "system-ui", fontSize: 8, color: "#BBB0A0" }}
                        >
                          ⏎ send
                        </span>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════
            TOOLTIP — editorial callout box
        ═══════════════════════════════════════════════════ */}
        <AnimatePresence>
          {!isOpen && showTooltip && msgs.length === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={{ right: 62, bottom: 12 }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  background: "#1A1208",
                  border: "1.5px solid #2E2410",
                  boxShadow: "3px 3px 0 #2E2410",
                  whiteSpace: "nowrap",
                  padding: "8px 12px",
                }}
              >
                {/* Gold top rule */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: 2, background: "linear-gradient(90deg, #8B6914, #E8C547, #8B6914)" }}
                />

                <div className="flex items-center gap-2.5 mt-0.5">
                  {/* Tiny avatar */}
                  <div
                    className="flex-shrink-0 overflow-hidden"
                    style={{ width: 20, height: 20, border: "1px solid #D97706", background: "#111" }}
                  >
                    <Image src="/robot.jpg" alt="Forge" width={20} height={20} className="w-full h-full object-cover object-top" />
                  </div>

                  <div>
                    <p
                      className="leading-none text-white"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 11, fontWeight: 700 }}
                    >
                      Ask <span style={{ color: "#E8C547" }}>Forge</span>
                    </p>
                    <p
                      className="mt-0.5 leading-none"
                      style={{ fontFamily: "system-ui", fontSize: 7.5, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}
                    >
                      India Startup AI · Free
                    </p>
                  </div>
                </div>

                {/* Arrow pointing right */}
                <div
                  className="absolute"
                  style={{
                    right: -6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "6px solid #1A1208",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════
            FAB — Broadsheet-inspired floating action button
        ═══════════════════════════════════════════════════ */}
        <button
          onClick={() => { setIsOpen(v => !v); setMinimized(false); setShowTooltip(false) }}
          aria-label="Open Forge — UpForge AI startup analyst"
          className="forge-fab relative focus:outline-none"
          style={{
            width: 54,
            height: 54,
          }}
        >
          {/* Outer gold border ring — slow rotate */}
          <span
            className="absolute inset-[-3px]"
            style={{
              border: "1px solid rgba(217,119,6,0.3)",
              animation: "goldSpin 16s linear infinite",
            }}
          />

          {/* Pulse halo */}
          <span
            className="absolute inset-[-8px]"
            style={{
              border: "1px solid rgba(217,119,6,0.12)",
              animation: "inkPulse 3.5s ease-in-out infinite",
            }}
          />

          {/* Button face */}
          <div
            className="absolute inset-0 z-10 overflow-hidden"
            style={{
              background: "#1A1208",
              border: "2px solid #1A1208",
              boxShadow: "3px 3px 0 #D97706, 0 8px 28px rgba(0,0,0,0.35)",
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.16 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <X style={{ width: 16, height: 16, color: "white" }} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.16 }}
                  className="w-full h-full flex flex-col"
                >
                  {/* Portrait fills top */}
                  <div className="flex-1 overflow-hidden forge-fab-img">
                    <Image
                      src="/robot.jpg"
                      alt="Forge AI"
                      width={54}
                      height={46}
                      className="w-full h-full object-cover object-top"
                      priority
                    />
                  </div>
                  {/* Gold label strip */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ height: 13, background: "#D97706" }}
                  >
                    <span
                      style={{
                        fontFamily: "system-ui",
                        fontSize: 6.5,
                        fontWeight: 900,
                        color: "#1A1208",
                        letterSpacing: "0.2em",
                      }}
                    >
                      FORGE
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Unread badge */}
          <AnimatePresence>
            {!isOpen && badge > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 z-20 flex items-center justify-center font-black"
                style={{
                  minWidth: 18,
                  height: 18,
                  background: "#D97706",
                  color: "#1A1208",
                  fontSize: 8,
                  fontFamily: "system-ui",
                  border: "1.5px solid #1A1208",
                  padding: "0 3px",
                }}
              >
                {badge > 9 ? "9+" : badge}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

      </div>
    </>
  )
}
