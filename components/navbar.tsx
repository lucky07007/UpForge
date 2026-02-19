"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BusinessForm } from "./business-form"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Startups", href: "/#startups" },
    { name: "About Us", href: "/#about" },
  ]

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-3 group z-[110]">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-primary/20 bg-white shadow-inner">
            <Image src="/logo.jpg" alt="Logo" fill className="object-cover transition-transform group-hover:scale-110" />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            <span className="text-foreground">UP</span>
            <span className="bg-gradient-to-r from-muted-foreground/60 to-muted-foreground/30 bg-clip-text text-transparent">FORGE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-muted-foreground transition-all hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-white/10" />
          <BusinessForm />
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 md:hidden"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Premium Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[105] bg-background/98 backdrop-blur-3xl md:hidden"
            >
              <div className="flex h-full flex-col justify-between px-8 py-24">
                <div className="space-y-8">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-5xl font-black tracking-tighter text-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6 border-t border-white/5 pt-8"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Founder Portal</p>
                  <BusinessForm />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
