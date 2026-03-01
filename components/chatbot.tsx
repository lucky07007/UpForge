"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Loader2, Sparkles, ChevronDown, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#AAA]"
          style={{ animation: `typingBounce 1.2s ${i * 0.2}s ease-in-out infinite` }}
        />
      ))}
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function Bubble({ msg, isNew }: { msg: Message; isNew: boolean }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div
          className="w-5 h-5 bg-[#E8C547] text-[#1C1C1C] flex items-center justify-center text-[7px] font-bold flex-shrink-0 mt-auto mb-0.5 mr-2"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          F
        </div>
      )}
      <div
        className={`max-w-[82%] px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
          isUser
            ? "bg-[#1C1C1C] text-white"
            : "bg-white border border-[#E2DDD5] text-[#1C1C1C]"
        }`}
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

// ─── Main Chatbot ─────────────────────────────────────────────────────────────

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
        "Hey! I'm Forge — UpForge's AI. I know India's startup ecosystem inside out: funding rounds, sectors, valuations, how to list your startup, and more. What would you like to know?",
    },
  ]);
  const [justAdded, setJustAdded] = useState<Set<number>>(new Set());

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  // Clear badge on open
  useEffect(() => {
    if (isOpen) setNewMsgCount(0);
  }, [isOpen]);

  const send = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || isLoading) return;

    const userMsg: Message = { role: "user", content: messageText };
    const newIndex = messages.length + 1;

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
      const reply = data.message || data.error || "I couldn't process that — please try again.";

      setMessages((p) => [...p, { role: "assistant", content: reply }]);
      setJustAdded((p) => new Set(p).add(newIndex));

      if (!isOpen) setNewMsgCount((c) => c + 1);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "Network issue — please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes floatPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
          50% { box-shadow: 0 8px 32px rgba(0,0,0,0.22); }
        }
        .forge-btn { animation: floatPulse 3s ease-in-out infinite; }
      `}</style>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">

        {/* ── CHAT WINDOW ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-3 w-[94vw] max-w-[380px] bg-[#F7F5F0] border border-[#D5D0C8] shadow-2xl flex flex-col overflow-hidden"
              style={{ height: isMinimized ? "auto" : "min(600px, 78vh)" }}
            >

              {/* ── HEADER ── */}
              <div
                className="px-4 py-3 border-b border-[#D5D0C8] flex items-center justify-between flex-shrink-0"
                style={{ background: "#1C1C1C" }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className="w-8 h-8 bg-[#E8C547] text-[#1C1C1C] flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      F
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#1C1C1C]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3
                        className="text-sm font-semibold text-white"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        Forge
                      </h3>
                      <span
                        className="text-[8px] bg-[#E8C547]/20 text-[#E8C547] px-1.5 py-0.5 font-bold uppercase tracking-wider"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        AI
                      </span>
                    </div>
                    <p
                      className="text-[9px] text-white/40 tracking-wider uppercase"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      UpForge Intelligence
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 text-white/40 hover:text-white/80 transition-colors"
                    title={isMinimized ? "Expand" : "Minimize"}
                  >
                    {isMinimized ? (
                      <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                    ) : (
                      <Minimize2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-white/40 hover:text-white/80 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ── BODY (hidden when minimized) ── */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col flex-1 overflow-hidden"
                  >

                    {/* ── MESSAGES ── */}
                    <div
                      ref={scrollRef}
                      className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#D5D0C8 transparent",
                        background: "#F7F5F0",
                      }}
                    >
                      {messages.map((msg, i) => (
                        <Bubble
                          key={i}
                          msg={msg}
                          isNew={justAdded.has(i)}
                        />
                      ))}

                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-end gap-2"
                        >
                          <div className="w-5 h-5 bg-[#E8C547] text-[#1C1C1C] flex items-center justify-center text-[7px] font-bold flex-shrink-0">
                            F
                          </div>
                          <div className="bg-white border border-[#E2DDD5]">
                            <TypingDots />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* ── CONTEXT CHIPS (only on first message) ── */}
                    {messages.length === 1 && (
                      <div
                        className="px-4 pb-3 border-t border-[#E8E4DC] pt-3"
                        style={{ background: "#F7F5F0" }}
                      >
                        <p
                          className="text-[9px] text-[#AAA] uppercase tracking-widest mb-2 font-bold"
                          style={{ fontFamily: "system-ui, sans-serif" }}
                        >
                          Try asking
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            "How do I list my startup?",
                            "What sectors are hot in India?",
                            "How is valuation calculated?",
                            "What's UpForge?",
                          ].map((q, i) => (
                            <button
                              key={i}
                              onClick={() => send(q)}
                              className="text-[10px] border border-[#D5D0C8] bg-white px-2.5 py-1 text-[#555] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors"
                              style={{ fontFamily: "system-ui, sans-serif" }}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── INPUT ── */}
                    <div
                      className="px-4 py-3 border-t border-[#D5D0C8] flex-shrink-0"
                      style={{ background: "white" }}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKey}
                          placeholder="Ask Forge anything…"
                          className="flex-1 bg-[#F7F5F0] border border-[#D5D0C8] py-2.5 px-3 text-[12px] text-[#1C1C1C] placeholder-[#BBB] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                          style={{ fontFamily: "system-ui, sans-serif" }}
                          disabled={isLoading}
                        />
                        <button
                          onClick={() => send()}
                          disabled={isLoading || !input.trim()}
                          className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${
                            input.trim() && !isLoading
                              ? "bg-[#1C1C1C] text-white hover:bg-[#333]"
                              : "bg-[#EEEAE3] text-[#BBB] cursor-not-allowed"
                          }`}
                        >
                          {isLoading ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <p
                        className="text-[9px] text-[#CCC] mt-2 text-center"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        Forge · UpForge AI · Powered by Mixtral
                      </p>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FLOATING BUTTON ── */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className="forge-btn relative w-13 h-13 flex items-center justify-center transition-colors"
          style={{
            width: "52px",
            height: "52px",
            background: isOpen ? "#333" : "#1C1C1C",
          }}
          aria-label="Open Forge AI"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col items-center"
              >
                <span
                  className="text-[#E8C547] font-bold text-sm leading-none"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  F
                </span>
                <Sparkles className="w-2.5 h-2.5 text-white/40 mt-0.5" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          {!isOpen && newMsgCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[8px] font-bold flex items-center justify-center rounded-full"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {newMsgCount}
            </motion.span>
          )}

          {/* Live pulse ring */}
          <span className="absolute inset-0 rounded-none pointer-events-none">
            <span
              className="absolute inset-0 border border-[#E8C547]/30"
              style={{ animation: "floatPulse 3s ease-in-out infinite" }}
            />
          </span>
        </button>

        {/* Label tooltip on first load */}
        <AnimatePresence>
          {!isOpen && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className="absolute right-16 bottom-3 pointer-events-none"
            >
              <div
                className="bg-[#1C1C1C] text-white px-3 py-2 text-[11px] whitespace-nowrap shadow-lg"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                <span className="text-[#E8C547] font-bold">Forge</span> — Ask me anything
                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-[#1C1C1C]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
