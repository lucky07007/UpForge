"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/startup" },
    { name: "About Us", href: "/about" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6" aria-label="Main navigation">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-transform group-hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="Upforge"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              UPFORGE
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-indigo-400 font-bold">
              Founder Registry
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-wider font-medium transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-400 rounded-full" />
                  )}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-400 rounded-full scale-x-0 transition-transform group-hover:scale-x-100" />
                </Link>
              )
            })}
          </div>

          <div className="h-5 w-px bg-white/10" />

          <Link href="/apply">
            <Button className="h-10 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20">
              Join the Ecosystem
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-xl md:hidden">
            <div className="flex flex-col items-center gap-8 py-12 px-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xl uppercase tracking-wider font-medium transition-colors ${
                      isActive ? "text-indigo-400" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <div className="h-px w-16 bg-white/20" />
              <Link href="/apply" className="w-full max-w-xs">
                <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-semibold uppercase tracking-wider">
                  Join the Ecosystem
                </Button>
              </Link>
              {/* Original mobile link preserved as a secondary option */}
              <Link
                href="/apply"
                className="text-xs uppercase tracking-[0.2em] text-indigo-400 border-b border-indigo-400 pb-0.5"
              >
                Connect then Grow
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
