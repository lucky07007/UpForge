// components/chatbot.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Loader2, Minus, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── RICH TEXT ────────────────────────────────────────────────────────────────

function RichText({ text }: { text: string }) {
  const lines = text.split("\n").reduce<string[]>((acc, line, i, arr) => {
    if (line.trim() === "" && i > 0 && arr[i - 1].trim() === "") return acc;
    acc.push(line);
    return acc;
  }, []);

  const inline = (str: string): React.ReactNode[] =>
    str.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**"))
        return <strong key={i} className="font-semibold text-[#111]">{p.slice(2, -2)}</strong>;
      if (p.startsWith("*") && p.endsWith("*"))
        return <em key={i} className="italic">{p.slice(1, -1)}</em>;
      if (p.startsWith("`") && p.endsWith("`"))
        return <code key={i} className="bg-[#F0EDE8] px-1 text-[10px] font-mono rounded-sm">{p.slice(1, -1)}</code>;
      return <span key={i}>{p}</span>;
    });

  const els: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (!t) { els.push(<div key={`s${i}`} className="h-1.5" />); i++; continue; }

    // Numbered list
    if (/^(\d+)[.)]\s/.test(t)) {
      const items: { n: string; text: string }[] = [];
      while (i < lines.length) {
        const m = lines[i].trim().match(/^(\d+)[.)]\s+(.+)$/);
        if (!m) break;
        items.push({ n: m[1], text: m[2] }); i++;
      }
      els.push(
        <ol key={`ol${i}`} className="space-y-1.5 my-2">
          {items.map((it, ix) => (
            <li key={ix} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-4 h-4 bg-[#1C1C1C] text-[#E8C547] text-[7px] font-black flex items-center justify-center mt-[2px]"
                style={{ fontFamily: "system-ui" }}>{it.n}</span>
              <span className="flex-1 text-[12px] leading-relaxed">{inline(it.text)}</span>
            </li>
          ))}
        </ol>
      ); continue;
    }

    // Bullet
    if (/^[-•]\s/.test(t)) {
      const items: string[] = [];
      while (i < lines.length) {
        const m = lines[i].trim().match(/^[-•]\s+(.+)$/);
        if (!m) break;
        items.push(m[1]); i++;
      }
      els.push(
        <ul key={`ul${i}`} className="space-y-1 my-2">
          {items.map((b, ix) => (
            <li key={ix} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#E8C547] mt-[6px]" />
              <span className="flex-1 text-[12px] leading-relaxed">{inline(b)}</span>
            </li>
          ))}
        </ul>
      ); continue;
    }

    // Heading
    const hm = t.match(/^(#{1,3})\s+(.+)$/);
    if (hm) {
      els.push(
        <p key={`h${i}`}
          className={`font-semibold text-[#111] mt-2 mb-0.5 ${hm[1].length === 1 ? "text-[13px]" : "text-[12px]"}`}
          style={{ fontFamily: "'Georgia', serif" }}>
          {inline(hm[2])}
        </p>
      );
      i++; continue;
    }

    if (t === "---") { els.push(<div key={`hr${i}`} className="border-t border-[#EEEAE3] my-2" />); i++; continue; }

    els.push(<p key={`p${i}`} className="text-[12px] leading-relaxed text-[#1C1C1C]">{inline(t)}</p>);
    i++;
  }
  return <div className="space-y-[2px]">{els}</div>;
}

// ─── TYPING DOTS ──────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2.5">
      {[0, 1, 2].map(i => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#C8C3BC]"
          style={{ animation: `tBounce 1.1s ${i * 0.16}s ease-in-out infinite` }} />
      ))}
    </div>
  );
}

// ─── BUBBLE ───────────────────────────────────────────────────────────────────

function Bubble({ msg, isNew }: { msg: Message; isNew: boolean }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}
    >
      {!isUser && (
        <div className="w-6 h-6 flex-shrink-0 overflow-hidden bg-[#1C1C1C] mb-0.5">
          <Image src="/robot.jpg" alt="Forge" width={24} height={24} className="w-full h-full object-cover" />
        </div>
      )}
      <div className={`max-w-[82%] px-3 py-2 ${isUser
        ? "bg-[#1C1C1C] text-white"
        : "bg-white border border-[#E8E4DC]"
      }`}>
        {isUser
          ? <span className="text-[12px] leading-relaxed" style={{ fontFamily: "system-ui" }}>{msg.content}</span>
          : <RichText text={msg.content} />
        }
      </div>
    </motion.div>
  );
}

// ─── QUICK PROMPTS ────────────────────────────────────────────────────────────

const PROMPTS = [
  "How to list my startup free?",
  "Hottest sectors in India 2026?",
  "SaaS valuation methods?",
  "What's a soonicorn?",
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [badge, setBadge] = useState(0);
  const [msgs, setMsgs] = useState<Message[]>([{
    role: "assistant",
    content: "Hey — I'm **Forge**, UpForge's AI analyst.\n\nAsk me anything about:\n- Indian startup funding & valuations\n- Hot sectors & market trends\n- How to list your startup free\n- Investor landscape\n\nWhat would you like to know?",
  }]);
  const [justAdded, setJustAdded] = useState<Set<number>>(new Set());

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, loading]);

  useEffect(() => {
    if (isOpen && !minimized) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen, minimized]);

  useEffect(() => { if (isOpen) setBadge(0); }, [isOpen]);

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    const userMsg: Message = { role: "user", content: msg };
    const nextIdx = msgs.length + 1;
    setMsgs(p => [...p, userMsg]);
    setJustAdded(p => new Set(p).add(msgs.length));
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      });
      const data = await res.json();
      const reply = data.message ?? data.error ?? "Couldn't process that — please try again.";
      setMsgs(p => [...p, { role: "assistant", content: reply }]);
      setJustAdded(p => new Set(p).add(nextIdx));
      if (!isOpen) setBadge(c => c + 1);
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: "Network issue — please try again." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, msgs, isOpen]);

  const reset = () => {
    setMsgs([{
      role: "assistant",
      content: "Hey — I'm **Forge**, UpForge's AI analyst.\n\nAsk me anything about:\n- Indian startup funding & valuations\n- Hot sectors & market trends\n- How to list your startup free\n- Investor landscape\n\nWhat would you like to know?",
    }]);
    setJustAdded(new Set());
    setInput("");
  };

  return (
    <>
      <style>{`
        @keyframes tBounce { 0%,60%,100%{transform:translateY(0);opacity:.3} 30%{transform:translateY(-4px);opacity:1} }
        @keyframes forgeRing { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes forgePulse { 0%,100%{opacity:.12;transform:scale(1)} 50%{opacity:.3;transform:scale(1.1)} }
        .forge-scroll::-webkit-scrollbar{width:2px}
        .forge-scroll::-webkit-scrollbar-thumb{background:#DDD8D2}
        .pchip:hover{background:#1C1C1C!important;color:#fff!important;border-color:#1C1C1C!important}
        .pchip:hover .chip-arr{opacity:1!important;color:#E8C547!important}
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

        {/* ── CHAT WINDOW ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="dialog" aria-modal="true" aria-label="Forge AI — UpForge Startup Assistant"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 w-[92vw] max-w-[360px] bg-white border border-[#D5D0C8] flex flex-col overflow-hidden"
              style={{
                height: minimized ? "auto" : "min(580px, 78vh)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
              }}
            >

              {/* HEADER */}
              <div className="flex-shrink-0 bg-[#1C1C1C]">
                {/* Gold accent top line */}
                <div className="h-[2px] bg-gradient-to-r from-[#B8941E] via-[#E8C547] to-[#D4A820]" />

                <div className="flex items-center justify-between px-3.5 py-2.5">
                  {/* Left: avatar + name */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 overflow-hidden bg-[#E8C547] border border-[#C8A830]">
                        <Image
                          src="/robot.jpg"
                          alt="Forge AI"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                      {/* Online dot */}
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border border-[#1C1C1C] rounded-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-bold text-white leading-none"
                          style={{ fontFamily: "'Georgia', serif" }}>Forge</span>
                        <span className="text-[6px] bg-[#E8C547] text-[#111] px-1 py-0.5 font-black uppercase tracking-[0.15em] leading-none"
                          style={{ fontFamily: "system-ui" }}>AI</span>
                      </div>
                      <div className="text-[8px] text-white/30 uppercase tracking-[0.18em] mt-0.5 leading-none"
                        style={{ fontFamily: "system-ui" }}>UpForge · India Startup Expert</div>
                    </div>
                  </div>

                  {/* Right: controls */}
                  <div className="flex items-center">
                    <button onClick={reset} aria-label="New conversation"
                      className="p-1.5 text-white/25 hover:text-white/60 transition-colors">
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <button onClick={() => setMinimized(v => !v)} aria-label={minimized ? "Expand" : "Minimize"}
                      className="p-1.5 text-white/25 hover:text-white/60 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <button onClick={() => setIsOpen(false)} aria-label="Close"
                      className="p-1.5 text-white/25 hover:text-white/60 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* BODY */}
              <AnimatePresence initial={false}>
                {!minimized && (
                  <motion.div key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col flex-1 overflow-hidden"
                  >

                    {/* Messages */}
                    <div ref={scrollRef} aria-live="polite"
                      className="flex-1 overflow-y-auto px-3.5 py-3.5 space-y-3 forge-scroll bg-[#F7F5F0]">
                      {msgs.map((m, idx) => (
                        <Bubble key={idx} msg={m} isNew={justAdded.has(idx)} />
                      ))}
                      {loading && (
                        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                          className="flex items-end gap-2">
                          <div className="w-6 h-6 flex-shrink-0 overflow-hidden bg-[#1C1C1C]">
                            <Image src="/robot.jpg" alt="" width={24} height={24} className="w-full h-full object-cover" />
                          </div>
                          <div className="bg-white border border-[#E8E4DC]"><TypingDots /></div>
                        </motion.div>
                      )}
                    </div>

                    {/* Quick prompts — first message only */}
                    {msgs.length === 1 && (
                      <div className="px-3.5 pt-2.5 pb-2.5 border-t border-[#EEEAE3] bg-[#FAFAF8] flex-shrink-0">
                        <p className="text-[7.5px] text-[#BBBBB5] uppercase tracking-[0.22em] mb-1.5 font-bold"
                          style={{ fontFamily: "system-ui" }}>Try asking</p>
                        <div className="grid gap-1">
                          {PROMPTS.map((q, idx) => (
                            <button key={idx} onClick={() => send(q)}
                              className="pchip text-left text-[10.5px] border border-[#E2DDD5] bg-white px-2.5 py-1.5 text-[#555] transition-all duration-120 flex items-center justify-between"
                              style={{ fontFamily: "system-ui" }}>
                              <span>{q}</span>
                              <span className="chip-arr opacity-0 text-[11px] font-bold transition-opacity ml-2 flex-shrink-0">→</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Input */}
                    <div className="px-3.5 py-2.5 border-t border-[#E2DDD5] bg-white flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <input
                          ref={inputRef} value={input} disabled={loading}
                          onChange={e => setInput(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                          placeholder="Ask about Indian startups…"
                          aria-label="Message Forge"
                          className="flex-1 bg-[#F7F5F0] border border-[#DDD8D2] py-2 px-2.5 text-[11.5px] text-[#1C1C1C] placeholder-[#C0BAB4] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                          style={{ fontFamily: "system-ui" }}
                        />
                        <button onClick={() => send()} disabled={loading || !input.trim()} aria-label="Send"
                          className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all bg-[#1C1C1C] text-white hover:bg-[#E8C547] hover:text-[#111] disabled:bg-[#EEEAE3] disabled:text-[#CCC] disabled:cursor-not-allowed">
                          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[7.5px] text-[#C8C3BC]" style={{ fontFamily: "system-ui" }}>
                          Forge · UpForge AI
                        </span>
                        <span className="text-[7.5px] text-[#C8C3BC]" style={{ fontFamily: "system-ui" }}>
                          ⏎ to send
                        </span>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TOOLTIP — appears after 2s if chat never opened ────────────────── */}
        <AnimatePresence>
          {!isOpen && msgs.length === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.94 }}
              transition={{ delay: 2.5, duration: 0.22 }}
              className="absolute right-[58px] bottom-[14px] pointer-events-none"
            >
              <div className="relative bg-[#1C1C1C] px-3 py-2 shadow-lg whitespace-nowrap overflow-hidden">
                <div className="h-[1.5px] absolute top-0 left-0 right-0 bg-gradient-to-r from-[#C8A830] via-[#E8C547] to-[#C8A830]" />
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 overflow-hidden flex-shrink-0">
                    <Image src="/robot.jpg" alt="Forge" width={20} height={20} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white leading-none" style={{ fontFamily: "'Georgia', serif" }}>
                      Ask <span className="text-[#E8C547]">Forge</span>
                    </p>
                    <p className="text-[7.5px] text-white/30 mt-0.5" style={{ fontFamily: "system-ui" }}>
                      India Startup AI
                    </p>
                  </div>
                </div>
                {/* Arrow */}
                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0
                  border-t-[4px] border-b-[4px] border-l-[5px]
                  border-t-transparent border-b-transparent border-l-[#1C1C1C]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FLOATING BUTTON ────────────────────────────────────────────────── */}
        <button
          onClick={() => { setIsOpen(v => !v); setMinimized(false); }}
          aria-label="Open Forge — UpForge AI startup assistant"
          className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C547]"
          style={{ width: 52, height: 52 }}
        >
          {/* Slow gold ring */}
          <span className="absolute inset-0 border border-[#E8C547]/25"
            style={{ animation: "forgeRing 12s linear infinite" }} />
          {/* Pulse halo */}
          <span className="absolute inset-[-5px] border border-[#E8C547]/10"
            style={{ animation: "forgePulse 3s ease-in-out infinite" }} />

          {/* Button face */}
          <div className="absolute inset-0 z-10 overflow-hidden bg-[#1C1C1C]"
            style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.32)" }}>
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="x"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.14 }}
                  className="w-full h-full flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </motion.div>
              ) : (
                <motion.div key="img"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.14 }}
                  className="w-full h-full flex flex-col">
                  {/* Image fills top portion */}
                  <div className="flex-1 overflow-hidden">
                    <Image
                      src="/robot.jpg"
                      alt="Forge AI"
                      width={52}
                      height={44}
                      className="w-full h-full object-cover object-top"
                      priority
                    />
                  </div>
                  {/* Gold label strip */}
                  <div className="flex-shrink-0 h-[13px] bg-[#E8C547] flex items-center justify-center">
                    <span className="text-[6.5px] font-black text-[#111] uppercase tracking-[0.2em] leading-none"
                      style={{ fontFamily: "system-ui" }}>FORGE</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Unread badge */}
          <AnimatePresence>
            {!isOpen && badge > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-emerald-500 text-white text-[7px] font-black px-1 flex items-center justify-center rounded-full z-20 border border-white"
                style={{ fontFamily: "system-ui" }}>
                {badge > 9 ? "9+" : badge}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

      </div>
    </>
  );
}
