"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ArrowRight } from "lucide-react"
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

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
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
              className="text-sm font-semibold text-muted-foreground transition-all hover:text-primary hover:tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-border/60" />
          <BusinessForm />
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Premium Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-0 z-40 h-screen bg-background/95 backdrop-blur-2xl px-6 pt-24"
            >
              <div className="flex flex-col gap-8">
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
                      className="text-4xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6 border-t border-border"
                >
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
