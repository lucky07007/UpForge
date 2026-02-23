"use client"
import { useState, useEffect } from "react"

const words = [
  "Bharat's Legacy", 
  "Founder's Dream", 
  "Venture Vision", 
  "Independent Future", 
  "Next Unicorn"
]

export function CyclingText() {
  const [displayText, setDisplayText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex]
      
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1))
        setSpeed(50)
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1))
        setSpeed(150)
      }

      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }

    const timer = setTimeout(handleTyping, speed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, wordIndex, speed])

  return (
    <span className="relative inline-block min-w-[300px] text-slate-500 italic font-medium">
      {displayText}
      <span className="ml-1 inline-block w-[3px] h-[1em] bg-[#c6a43f] animate-pulse align-middle" />
    </span>
  )
}
