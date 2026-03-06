// components/chatbot.tsx
"use client";

/**
 * Forge — UpForge AI Chatbot
 * 
 * SEO / Structured Data notes:
 *  • The floating button has aria-label, role, and title for screen readers
 *  • The chat window uses role="dialog", aria-modal, aria-label for a11y
 *  • SpeakableSpecification JSON-LD is injected so Google can index AI answers
 *  • All images have explicit alt text
 */

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Loader2, ChevronDown, Minimize2, Zap, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── Rich Text Renderer ───────────────────────────────────────────────────────
// Turns markdown-lite into styled React — bold, numbered lists, bullets,
// headings, dividers, with every element on its own line.

function RichText({ text }: { text: string }) {
  const lines = text.split("\n").reduce<string[]>((acc, line, i, arr) => {
    if (line.trim() === "" && i > 0 && arr[i - 1].trim() === "") return acc;
    acc.push(line);
    return acc;
  }, []);

  const renderInline = (str: string): React.ReactNode[] => {
    const parts = str.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i} className="font-bold text-[#1C1C1C]">{part.slice(2, -2)}</strong>;
      if (part.startsWith("*") && part.endsWith("*"))
        return <em key={i} className="italic text-[#555]">{part.slice(1, -1)}</em>;
      if (part.startsWith("`") && part.endsWith("`"))
        return (
          <code key={i} className="bg-[#EEEAE3] text-[#1C1C1C] px-1 py-0.5 text-[10px] font-mono rounded-sm">
            {part.slice(1, -1)}
          </code>
        );
      return <span key={i}>{part}</span>;
    });
  };

  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty → spacer
    if (trimmed === "") {
      elements.push(<div key={`sp-${i}`} className="h-2" />);
      i++; continue;
    }

    // Numbered list  "1. …" or "1) …"
    if (/^(\d+)[.)]\s/.test(trimmed)) {
      const items: { n: string; t: string }[] = [];
      while (i < lines.length) {
        const m = lines[i].trim().match(/^(\d+)[.)]\s+(.+)$/);
        if (!m) break;
        items.push({ n: m[1], t: m[2] });
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 my-2.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span
                className="flex-shrink-0 w-[18px] h-[18px] bg-[#1C1C1C] text-[#E8C547] text-[8px] font-black flex items-center justify-center mt-[2px]"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {item.n}
              </span>
              <span className="flex-1 text-[12.5px] leading-relaxed text-[#1C1C1C]">
                {renderInline(item.t)}
              </span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Bullet  "- …" or "• …"
    if (/^[-•]\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length) {
        const m = lines[i].trim().match(/^[-•]\s+(.+)$/);
        if (!m) break;
        items.push(m[1]);
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-2.5">
          {items.map((b, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#E8C547] mt-[5px]" />
              <span className="flex-1 text-[12.5px] leading-relaxed text-[#1C1C1C]">
                {renderInline(b)}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Heading  "### …"
    const hm = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (hm) {
      const lvl = hm[1].length;
      elements.push(
        <p
          key={`h-${i}`}
          className={`font-bold text-[#1C1C1C] mt-3 mb-1 ${lvl === 1 ? "text-[14px]" : lvl === 2 ? "text-[13px]" : "text-[12px]"}`}
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.015em" }}
        >
          {renderInline(hm[2])}
        </p>
      );
      i++; continue;
    }

    // Divider  "---"
    if (trimmed === "---") {
      elements.push(<div key={`hr-${i}`} className="border-t border-[#E2DDD5] my-2" />);
      i++; continue;
    }

    // Paragraph
    elements.push(
      <p key={`p-${i}`} className="text-[12.5px] leading-relaxed text-[#1C1C1C]">
        {renderInline(trimmed)}
      </p>
    );
    i++;
  }

  return <div className="space-y-[2px]">{elements}</div>;
}

// ─── Typing dots ──────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#C8C3BC]"
          style={{ animation: `tBounce 1.2s ${i * 0.18}s ease-in-out infinite` }}
        />
      ))}
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function Bubble({ msg, isNew }: { msg: Message; isNew: boolean }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}
    >
      {/* AI avatar — robot image */}
      {!isUser && (
        <div className="w-7 h-7 flex-shrink-0 mb-0.5 overflow-hidden bg-[#1C1C1C] border border-[#333] flex items-center justify-center">
          <Image
            src="/robot.png"
            alt="Forge AI assistant"
            width={28}
            height={28}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(5deg)" }}
          />
        </div>
      )}

      <div
        className={`max-w-[84%] px-3.5 py-2.5 ${
          isUser
            ? "bg-[#1C1C1C] text-white"
            : "bg-white border border-[#E2DDD5]"
        }`}
      >
        {isUser ? (
          <span
            className="text-[12.5px] leading-relaxed text-white"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {msg.content}
          </span>
        ) : (
          <RichText text={msg.content} />
        )}
      </div>
    </motion.div>
  );
}

// ─── Animated floating button ─────────────────────────────────────────────────

function ForgeButton({
  isOpen,
  newMsgCount,
  onClick,
}: {
  isOpen: boolean;
  newMsgCount: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Open Forge — UpForge AI startup assistant"
      title="Ask Forge anything about Indian startups"
      className="relative flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C547]"
      style={{ width: 58, height: 58 }}
    >
      {/* Slow-rotating outer square ring */}
      <span
        className="absolute inset-0 border border-[#E8C547]/35"
        style={{ animation: "spinRing 10s linear infinite" }}
      />
      {/* Counter-rotating inner ring */}
      <span
        className="absolute inset-[5px] border border-[#E8C547]/15"
        style={{ animation: "spinRing 6s linear infinite reverse" }}
      />
      {/* Pulse halo */}
      <span
        className="absolute inset-[-6px] border border-[#E8C547]/10 rounded-none"
        style={{ animation: "pulseHalo 3s ease-in-out infinite" }}
      />

      {/* Core */}
      <motion.div
        animate={{ backgroundColor: isOpen ? "#2a2a2a" : "#1C1C1C" }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
        style={{ boxShadow: "0 6px 28px rgba(0,0,0,0.32), 0 2px 6px rgba(0,0,0,0.2)" }}
      >
        {/* Shimmer sweep on hover */}
        <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(232,197,71,0.08) 50%, transparent 60%)" }}
        />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.16 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="robot"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="flex flex-col items-center gap-[1px]"
            >
              <div className="w-[28px] h-[28px] overflow-hidden flex items-center justify-center">
                <Image
                  src="/robot.png"
                  alt="Forge AI"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                  style={{ filter: "brightness(0) invert(1) sepia(1) saturate(4) hue-rotate(3deg)" }}
                  priority
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Unread badge */}
      <AnimatePresence>
        {!isOpen && newMsgCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-emerald-500 text-white text-[8px] font-black px-1 flex items-center justify-center rounded-full z-20 border-2 border-[#F7F5F0]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {newMsgCount > 9 ? "9+" : newMsgCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function ForgeTooltip({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 14, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 14, scale: 0.94 }}
          transition={{ delay: 2, duration: 0.28, ease: "easeOut" }}
          className="absolute right-[72px] bottom-[14px] pointer-events-none"
        >
          <div className="relative bg-[#111] text-white shadow-2xl whitespace-nowrap overflow-hidden">
            {/* Gold top bar */}
            <div className="h-[2px] bg-gradient-to-r from-[#E8C547] via-[#F5D55A] to-[#C8A83A]" />
            <div className="px-4 py-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 flex-shrink-0 overflow-hidden bg-[#1C1C1C] border border-[#2a2a2a] flex items-center justify-center">
                <Image
                  src="/robot.png"
                  alt="Forge AI"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                  style={{ filter: "brightness(0) invert(1) sepia(1) saturate(4) hue-rotate(3deg)" }}
                />
              </div>
              <div>
                <div className="text-[11px] font-bold text-white leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                  Ask <span className="text-[#E8C547]">Forge</span>
                </div>
                <div className="text-[9px] text-white/35 leading-tight" style={{ fontFamily: "system-ui, sans-serif" }}>
                  India Startup AI · Always on
                </div>
              </div>
              <Zap className="w-3 h-3 text-[#E8C547] flex-shrink-0" />
            </div>
            {/* Arrow */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-l-[7px] border-transparent border-l-[#111]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Quick prompts ────────────────────────────────────────────────────────────

const QUICK_PROMPTS = [
  { label: "How to list my startup free?", icon: "→" },
  { label: "Hottest sectors in India 2026?", icon: "→" },
  { label: "How is SaaS valuation calculated?", icon: "→" },
  { label: "What's a soonicorn?", icon: "→" },
];

// ─── Main Chatbot component ───────────────────────────────────────────────────

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newMsgCount, setNewMsgCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey — I'm **Forge**, UpForge's AI analyst.\n\nI know India's startup ecosystem inside out:\n- Funding rounds & valuations\n- Hot sectors & market trends\n- How to list your startup free\n- Investor landscape & deal flow\n\nWhat would you like to know?",
    },
  ]);
  const [justAdded, setJustAdded] = useState<Set<number>>(new Set());

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const showTooltip = !isOpen && messages.length === 1;

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  // Focus on open
  useEffect(() => {
    if (isOpen && !isMinimized)
      setTimeout(() => inputRef.current?.focus(), 160);
  }, [isOpen, isMinimized]);

  // Clear badge
  useEffect(() => {
    if (isOpen) setNewMsgCount(0);
  }, [isOpen]);

  const send = useCallback(
    async (text?: string) => {
      const msg = (text ?? input).trim();
      if (!msg || isLoading) return;

      const userMsg: Message = { role: "user", content: msg };
      const nextIdx = messages.length + 1;

      setMessages((p) => [...p, userMsg]);
      setJustAdded((p) => new Set(p).add(messages.length));
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, userMsg] }),
        });
        const data = await res.json();
        const reply = data.message ?? data.error ?? "I couldn't process that — please try again.";

        setMessages((p) => [...p, { role: "assistant", content: reply }]);
        setJustAdded((p) => new Set(p).add(nextIdx));
        if (!isOpen) setNewMsgCount((c) => c + 1);
      } catch {
        setMessages((p) => [
          ...p,
          { role: "assistant", content: "Network issue — please try again in a moment." },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages, isOpen]
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const reset = () => {
    setMessages([{
      role: "assistant",
      content: "Hey — I'm **Forge**, UpForge's AI analyst.\n\nI know India's startup ecosystem inside out:\n- Funding rounds & valuations\n- Hot sectors & market trends\n- How to list your startup free\n- Investor landscape & deal flow\n\nWhat would you like to know?",
    }]);
    setJustAdded(new Set());
    setInput("");
  };

  return (
    <>
      {/* ── SEO: SpeakableSpecification so Google can surface AI answers ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPageElement",
            "cssSelector": "#forge-chatbot",
            "speakable": { "@type": "SpeakableSpecification", "cssSelector": "#forge-chatbot" },
            "name": "Forge — UpForge AI Startup Assistant",
            "description": "AI-powered startup assistant for India's startup ecosystem. Ask about funding, valuations, sectors, and how to list your startup on UpForge.",
            "isPartOf": { "@type": "WebSite", "name": "UpForge", "url": "https://upforge.in" },
          }),
        }}
      />

      <style>{`
        @keyframes tBounce {
          0%,60%,100%{transform:translateY(0);opacity:.35}
          30%{transform:translateY(-5px);opacity:1}
        }
        @keyframes spinRing {
          0%{transform:rotate(0deg)}
          100%{transform:rotate(360deg)}
        }
        @keyframes pulseHalo {
          0%,100%{opacity:.08;transform:scale(1)}
          50%{opacity:.22;transform:scale(1.06)}
        }
        @keyframes scanBar {
          0%{transform:translateY(-100%)}
          100%{transform:translateY(400%)}
        }
        @keyframes slideUp {
          from{transform:translateY(6px);opacity:0}
          to{transform:translateY(0);opacity:1}
        }
        .forge-scroll::-webkit-scrollbar{width:3px}
        .forge-scroll::-webkit-scrollbar-track{background:transparent}
        .forge-scroll::-webkit-scrollbar-thumb{background:#D5D0C8;border-radius:2px}
        .prompt-chip:hover{background:#1C1C1C;color:white;border-color:#1C1C1C}
        .prompt-chip:hover .chip-arr{opacity:1;color:#E8C547}
        .send-btn:not(:disabled):hover{background:#E8C547;color:#1C1C1C}
      `}</style>

      <div id="forge-chatbot" className="fixed bottom-5 right-5 z-50 flex flex-col items-end">

        {/* ── CHAT WINDOW ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Forge — UpForge AI Startup Assistant"
              initial={{ opacity: 0, y: 22, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.95 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 w-[94vw] max-w-[400px] bg-[#F7F5F0] border border-[#C8C3BC] flex flex-col overflow-hidden"
              style={{
                height: isMinimized ? "auto" : "min(640px, 82vh)",
                boxShadow: "0 28px 72px rgba(0,0,0,0.22), 0 4px 18px rgba(0,0,0,0.12)",
              }}
            >

              {/* ── HEADER ── */}
              <div className="flex-shrink-0 relative bg-[#111] overflow-hidden">
                {/* Gold gradient top bar */}
                <div className="h-[2.5px] w-full bg-gradient-to-r from-[#C8A83A] via-[#E8C547] to-[#F5D55A]" />

                {/* Slow scan line */}
                <div
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8C547]/18 to-transparent pointer-events-none"
                  style={{ animation: "scanBar 6s linear infinite" }}
                />

                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Robot avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-[#E8C547] flex items-center justify-center overflow-hidden border-2 border-[#C8A83A]">
                        <Image
                          src="/robot.png"
                          alt="Forge — UpForge AI assistant robot"
                          width={36}
                          height={36}
                          className="w-[32px] h-[32px] object-contain"
                          priority
                        />
                      </div>
                      {/* Online dot */}
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#111] rounded-full" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[15px] font-bold text-white tracking-tight leading-none"
                          style={{ fontFamily: "'Georgia', serif" }}
                        >
                          Forge
                        </span>
                        <span
                          className="text-[7px] bg-[#E8C547] text-[#111] px-1.5 py-0.5 font-black uppercase tracking-[0.18em] leading-none"
                          style={{ fontFamily: "system-ui, sans-serif" }}
                        >
                          AI
                        </span>
                      </div>
                      <div
                        className="text-[9px] text-white/30 uppercase tracking-[0.22em] mt-0.5 leading-none"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        UpForge Intelligence
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={reset}
                      title="New conversation"
                      aria-label="Reset conversation"
                      className="p-2 text-white/25 hover:text-white/70 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsMinimized(!isMinimized)}
                      title={isMinimized ? "Expand" : "Minimize"}
                      aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                      className="p-2 text-white/25 hover:text-white/70 transition-colors"
                    >
                      {isMinimized
                        ? <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                        : <Minimize2 className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Close Forge chat"
                      className="p-2 text-white/25 hover:text-white/70 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Status strip */}
                <div className="px-4 pb-2.5 flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"
                    style={{ animation: "pulseHalo 2s ease-in-out infinite" }}
                  />
                  <span
                    className="text-[8.5px] text-white/22 uppercase tracking-[0.2em]"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Online · India Startup Expert · Llama 3.3
                  </span>
                </div>
              </div>

              {/* ── COLLAPSIBLE BODY ── */}
              <AnimatePresence initial={false}>
                {!isMinimized && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex flex-col flex-1 overflow-hidden"
                  >

                    {/* Messages */}
                    <div
                      ref={scrollRef}
                      className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 forge-scroll"
                      style={{ background: "#F7F5F0" }}
                      aria-live="polite"
                      aria-label="Conversation with Forge AI"
                    >
                      {messages.map((msg, idx) => (
                        <Bubble key={idx} msg={msg} isNew={justAdded.has(idx)} />
                      ))}

                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-end gap-2"
                        >
                          <div className="w-7 h-7 flex-shrink-0 overflow-hidden bg-[#1C1C1C] border border-[#333] flex items-center justify-center">
                            <Image
                              src="/robot.png"
                              alt="Forge is typing"
                              width={28}
                              height={28}
                              className="w-full h-full object-contain"
                              style={{ filter: "brightness(0) invert(1) sepia(1) saturate(4) hue-rotate(3deg)" }}
                            />
                          </div>
                          <div className="bg-white border border-[#E2DDD5]">
                            <TypingDots />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Quick prompts — shown only before first user message */}
                    {messages.length === 1 && (
                      <div
                        className="px-4 pt-3 pb-3 border-t border-[#E8E4DC] flex-shrink-0"
                        style={{ background: "#F7F5F0" }}
                      >
                        <p
                          className="text-[8px] text-[#C0BAB0] uppercase tracking-[0.24em] mb-2 font-bold"
                          style={{ fontFamily: "system-ui, sans-serif" }}
                        >
                          Try asking
                        </p>
                        <div className="grid grid-cols-1 gap-1.5">
                          {QUICK_PROMPTS.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => send(q.label)}
                              className="prompt-chip text-left text-[11px] border border-[#D5D0C8] bg-white px-3 py-2 text-[#555] transition-all duration-150 flex items-center justify-between group"
                              style={{ fontFamily: "system-ui, sans-serif" }}
                            >
                              <span>{q.label}</span>
                              <span className="chip-arr opacity-0 transition-opacity text-[12px] font-bold">{q.icon}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Input */}
                    <div
                      className="px-4 py-3 border-t border-[#D5D0C8] flex-shrink-0 bg-white"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKey}
                          placeholder="Ask about Indian startups, funding, sectors…"
                          aria-label="Message Forge AI"
                          className="flex-1 bg-[#F7F5F0] border border-[#D5D0C8] py-2.5 px-3 text-[12px] text-[#1C1C1C] placeholder-[#BBB] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                          style={{ fontFamily: "system-ui, sans-serif" }}
                          disabled={isLoading}
                        />
                        <button
                          onClick={() => send()}
                          disabled={isLoading || !input.trim()}
                          aria-label="Send message"
                          className="send-btn w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#1C1C1C] text-white transition-all duration-150 disabled:bg-[#EEEAE3] disabled:text-[#CCC] disabled:cursor-not-allowed"
                        >
                          {isLoading
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            : <Send className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 overflow-hidden flex items-center justify-center bg-[#1C1C1C]">
                            <Image
                              src="/robot.png"
                              alt="Forge"
                              width={16}
                              height={16}
                              className="w-full h-full object-contain"
                              style={{ filter: "brightness(0) invert(1) sepia(1) saturate(4) hue-rotate(3deg)" }}
                            />
                          </div>
                          <span className="text-[8px] text-[#C8C3BC]" style={{ fontFamily: "system-ui, sans-serif" }}>
                            Forge · UpForge AI
                          </span>
                        </div>
                        <span className="text-[8px] text-[#C8C3BC]" style={{ fontFamily: "system-ui, sans-serif" }}>
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

        {/* Tooltip */}
        <ForgeTooltip show={showTooltip} />

        {/* Floating button */}
        <ForgeButton
          isOpen={isOpen}
          newMsgCount={newMsgCount}
          onClick={() => {
            setIsOpen((v) => !v);
            setIsMinimized(false);
          }}
        />

      </div>
    </>
  );
}
