"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ShieldCheck, Fingerprint } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto"
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "The Registry", href: "/startup" },
    { name: "Sponsorship", href: "/sponsor" },
    { name: "Intelligence", href: "/about" },
    { name: "Verification", href: "/docs" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 z-[60] w-full transition-all duration-700 ${
          isScrolled
            ? "bg-[#FDFCFB]/90 backdrop-blur-xl border-b border-[#1e3a5f]/5 py-4 shadow-[0_10px_40px_-15px_rgba(30,58,95,0.05)]"
            : "bg-transparent py-8"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8">

          {/* LOGO: Institutional Badge Style */}
          <Link href="/" className="group flex items-center gap-5">
            <div className="relative h-12 w-12 overflow-hidden border border-[#1e3a5f]/10 bg-white p-2 transition-transform duration-500 group-hover:rotate-[360deg]">
              <Image
                src="/logo.jpg"
                alt="UpForge Logo"
                fill
                className="object-contain p-1 grayscale group-hover:grayscale-0 transition-all"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-display font-bold tracking-tight text-[#0F172A] uppercase">
                UPFORGE
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#C6A43F] animate-pulse" />
                <span className="text-[8px] uppercase tracking-[0.4em] text-[#4a4a4a] font-black">
                  Official Ledger
                </span>
              </div>
            </div>
          </Link>

          {/* DESKTOP: Minimalist Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 ${
                      isActive ? "text-[#0F172A]" : "text-[#4a4a4a] hover:text-[#C6A43F]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#C6A43F]" />
                    )}
                  </Link>
                )
              })}
            </div>

            <Link href="/apply">
              <Button className="h-12 px-8 bg-[#0F172A] hover:bg-[#C6A43F] text-white rounded-none text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-xl border border-[#0F172A]">
                Join Registry
              </Button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-3 text-[#0F172A] border border-[#0F172A]/10 rounded-none bg-white/50 backdrop-blur-sm"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* MOBILE OVERLAY: Editorial Style */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#FDFCFB] animate-in fade-in duration-500">
          <div className="flex justify-between items-center p-8 border-b border-[#1e3a5f]/5">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#C6A43F]">Menu Selection</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-[#0F172A] text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col justify-center h-[75vh] px-12">
            <div className="space-y-12">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group block"
                >
                  <span className="text-[10px] font-mono text-[#C6A43F] block mb-2">0{i + 1} //</span>
                  <span className="text-5xl font-display font-light text-[#0F172A] group-hover:italic transition-all duration-500">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-20 pt-10 border-t border-[#1e3a5f]/10">
              <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full h-20 bg-[#0F172A] text-white rounded-none text-xs font-bold uppercase tracking-[0.3em]">
                  Submit Application
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
