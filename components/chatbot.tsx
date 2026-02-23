"use client"

import { useState, useEffect, useRef } from "react"
import { X, Send, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const suggestedQuestions = [
  "Top Indian startups this month?",
  "How does UpForge verification work?",
  "Startup sponsorship insights?",
  "High-growth sectors in India?",
  "How can I get featured?"
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Forge AI — your startup intelligence layer. How can I assist you today?"
    }
  ])

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isLoading) return

    const userMessage = { role: "user", content: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })

      const data = await res.json()
      const reply =
        data.message ||
        data.error ||
        "Sorry, I couldn't process that request."

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply }
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again."
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="mb-5 w-[360px] h-[560px] bg-white rounded-3xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden"
          >

            {/* Header */}
            <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/robot.jpg"
                    alt="Forge AI"
                    fill
                    className="object-contain p-2 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-base tracking-tight">
                    Forge AI
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    Startup Intelligence Layer
                  </p>
                </div>
              </div>

              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-neutral-400 hover:text-white transition" />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 p-5 overflow-y-auto space-y-5 bg-neutral-50"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed rounded-2xl ${
                      msg.role === "user"
                        ? "bg-neutral-900 text-white rounded-br-none"
                        : "bg-white border border-neutral-200 text-neutral-900 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex">
                  <div className="h-10 w-20 bg-white border border-neutral-200 rounded-2xl animate-pulse" />
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-5 pb-2 flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-white border border-neutral-200 hover:border-neutral-400 rounded-full px-3 py-1.5 text-neutral-700 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about India's startup ecosystem..."
                  className="flex-1 bg-neutral-100 border border-neutral-200 rounded-xl py-3 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-300 outline-none transition"
                />

                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="h-11 w-11 rounded-xl bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition bg-neutral-900 border border-neutral-800 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative h-9 w-9">
            <Image
              src="/robot.jpg"
              alt="Forge AI"
              fill
              className="object-contain rounded-full"
            />
          </div>
        )}
      </button>
    </div>
  )
}
