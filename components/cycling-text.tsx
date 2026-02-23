"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const words = ["Legacy", "Founder Dream", "Venture Vision", "Digital Future"]

export function CyclingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="relative inline-block min-w-[280px] text-gray-500 italic font-medium text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
