"use client"

import { useState, useEffect, useRef } from "react"
import { X, Send, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const suggestedQuestions = [
  "Recently added Indian startups?",
  "What qualifies as a startup on UpForge?",
  "How does listing work?",
  "Emerging sectors in India?",
  "How can a founder submit?"
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to UpForge Research Assistant. I help you explore India's emerging startup registry. How may I assist you?"
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
        "Unable to process the request at this time."

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply }
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please try again."
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="
              mb-4
              w-[95vw] max-w-[420px]
              h-[70vh] max-h-[620px]
              bg-white
              border border-gray-300
              shadow-lg
              flex flex-col
            "
          >

            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9">
                  <Image
                    src="/robot.jpg"
                    alt="UpForge Assistant"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-gray-900">
                    UpForge Assistant
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                    Public Startup Registry AI
                  </p>
                </div>
              </div>

              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-gray-500 hover:text-black transition" />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 p-5 overflow-y-auto space-y-4 bg-white"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed border ${
                      msg.role === "user"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-gray-50 text-gray-900 border-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex">
                  <div className="h-8 w-24 bg-gray-100 border border-gray-200 animate-pulse" />
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="
                      text-xs
                      border border-gray-300
                      px-3 py-1
                      hover:bg-gray-100
                      transition
                    "
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Search startup registry..."
                  className="
                    flex-1
                    bg-white
                    border border-gray-300
                    py-2.5 px-3
                    text-sm
                    text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none
                    focus:border-black
                  "
                />

                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="
                    h-10 w-10
                    border border-black
                    bg-black
                    text-white
                    flex items-center justify-center
                    hover:bg-gray-800
                    transition
                  "
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
        className="
          h-12 w-12
          border border-gray-400
          bg-white
          shadow-md
          flex items-center justify-center
          hover:bg-gray-50
          transition
        "
      >
        <div className="relative h-8 w-8">
          <Image
            src="/robot.jpg"
            alt="Assistant"
            fill
            className="object-contain rounded-full"
          />
        </div>
      </button>
    </div>
  )
}
