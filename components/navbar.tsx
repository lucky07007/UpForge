"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ShieldCheck } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Handle scroll effect for glassmorphism
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Scroll lock when menu is open
  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto"
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "Registry", href: "/startup" },
    { name: "Sponsorship", href: "/sponsor" },
    { name: "The Network", href: "/about" },
    { name: "Docs", href: "/docs" },
  ]

  return (
    <>
      <header 
        className={`fixed top-0 z-[60] w-full transition-all duration-500 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]" 
            : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          
          {/* BRAND: ARCHITECTURAL LOGO */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-primary/10 bg-white p-1 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="UpForge"
                fill
                className="object-cover p-1.5"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-primary uppercase">
                UPFORGE
              </span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-2.5 w-2.5 text-gold" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                  Official Registry
                </span>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[11px] uppercase tracking-[0.15em] font-bold transition-all hover:text-primary ${
                      isActive ? "text-primary border-b-2 border-gold pb-1" : "text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>

            <Link href="/apply">
              <Button className="h-11 px-8 bg-primary hover:bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-primary/10 transition-all hover:-translate-y-0.5">
                Join Network
              </Button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-primary hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* FULLSCREEN ELITE MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-in fade-in slide-in-from-bottom-5 duration-500">
          {/* Header in Mobile Menu */}
          <div className="flex justify-between items-center p-6 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                 <span className="text-white text-[10px] font-bold">UF</span>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">Navigation</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-50 text-primary transition-transform active:scale-90"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col justify-center h-[70vh] px-10">
            <div className="space-y-8">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block group"
                >
                  <span className="text-[10px] text-gold font-bold tracking-[0.4em] uppercase mb-2 block opacity-0 animate-in fade-in slide-in-from-left-2 duration-500 fill-mode-forwards" style={{ animationDelay: `${i * 100}ms` }}>
                    0{i + 1}
                  </span>
                  <span className="text-4xl font-serif italic text-primary group-hover:pl-4 transition-all duration-300">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-20 pt-10 border-t border-gray-50">
              <Link href="/apply">
                <Button className="w-full h-16 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest">
                  Apply for Listing
                </Button>
              </Link>
              <p className="text-center mt-6 text-[10px] text-gray-400 tracking-[0.3em] uppercase">
                UpForge · Est. 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
