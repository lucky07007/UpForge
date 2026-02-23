"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Send, Sparkles, Loader2, MessageSquareText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const suggestedQuestions = [
  "How to join the Registry?",
  "Sponsorship Tiers?",
  "What is UpForge?",
  "Founder Benefits?",
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to UpForge. I am Forge AI. How can I assist your institutional growth today?" }
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Nudge logic - appears after 30s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNudge(true)
        setTimeout(() => setShowNudge(false), 6000)
      }
    }, 30000)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isLoading])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isLoading) return

    const userMessage = { role: "user", content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })
      const data = await res.json()
      const reply = data.message || data.error || "Registry communication error. Please retry."
      setMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection to Forge Network failed." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Nudge Bubble */}
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="mb-4 mr-2 bg-slate-900 border border-[#c6a43f]/30 rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-[280px]"
          >
            <div className="relative h-10 w-10 shrink-0 border border-[#c6a43f]/20 rounded-full overflow-hidden bg-white">
              <Image src="/robot.jpg" alt="Forge AI" fill className="object-cover" />
            </div>
            <p className="text-xs font-bold text-white leading-relaxed">
              Need help navigating the <span className="text-[#c6a43f]">Registry</span>? Forge AI is active.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="mb-6 w-[380px] sm:w-[400px] h-[600px] bg-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-slate-950 text-white flex items-center justify-between relative">
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative h-12 w-12 rounded-xl bg-white border border-[#c6a43f]/30 flex items-center justify-center overflow-hidden">
                  <Image src="/robot.jpg" alt="Forge AI" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">Forge AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black">
                      Network Active
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sparkles size={60} />
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  {msg.role === "assistant" && (
                    <div className="h-6 w-6 rounded-lg bg-white border border-slate-200 flex-shrink-0 overflow-hidden shadow-sm">
                      <Image src="/logo.jpg" alt="UA" fill className="object-contain p-0.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-4 text-xs font-bold leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white rounded-2xl rounded-br-none"
                        : "bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-2 items-center">
                  <div className="h-6 w-6 rounded-lg bg-white border border-slate-200 animate-pulse" />
                  <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-bl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions Area */}
            <div className="px-6 py-2 bg-slate-50/50">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 hover:border-[#c6a43f] hover:text-[#c6a43f] rounded-full px-3 py-1.5 text-slate-500 transition-all shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about the ecosystem..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#c6a43f]/20 focus:border-[#c6a43f] outline-none transition-all"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-slate-950 hover:bg-slate-800 text-white shadow-lg transition-all shrink-0"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-[8px] text-center text-slate-300 font-bold uppercase tracking-[0.3em] mt-4">
                Institutional Intel · Forge AI v1.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-16 w-16 rounded-2xl shadow-2xl transition-all duration-300 border relative overflow-hidden group ${
          isOpen 
            ? "bg-white border-slate-200 hover:bg-slate-50" 
            : "bg-slate-950 border-[#c6a43f]/30 hover:scale-105 active:scale-95"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-slate-900" />
        ) : (
          <div className="relative h-full w-full flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#c6a43f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <Image src="/robot.jpg" alt="Forge AI" fill className="object-cover p-0.5 rounded-2xl" />
          </div>
        )}
      </Button>
    </div>
  )
}
