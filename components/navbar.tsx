"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsResourcesOpen(false)
  }, [pathname])

  // Scroll lock when mobile menu open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/startup" },
    { name: "Sponsor", href: "/sponsor" },
    { name: "About Us", href: "/about" },
  ]

  const resourceLinks = [
    { name: "Reports", href: "/reports" },
    { name: "FAQ", href: "/faq" },
    { name: "API Docs", href: "/docs" },
    { name: "Trust & Safety", href: "/trust" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0f1e2f]/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

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
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c6a43f] font-bold">
              Founder Registry
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-wider font-medium transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c6a43f] rounded-full" />
                  )}
                </Link>
              )
            })}

            {/* Resources Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className={`flex items-center gap-1 text-xs uppercase tracking-wider font-medium transition-colors hover:text-white ${
                  resourceLinks.some((link) => pathname === link.href)
                    ? "text-white"
                    : "text-zinc-300"
                }`}
              >
                Resources
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    isResourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-[#0c1622] border border-white/10 shadow-2xl py-2">
                  {resourceLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`block px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors hover:bg-white/5 ${
                          isActive ? "text-[#c6a43f]" : "text-zinc-300 hover:text-white"
                        }`}
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="h-5 w-px bg-white/10" />

          <Link href="/apply">
            <Button className="h-10 px-6 bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] rounded-full text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#c6a43f]/20">
              Join the Ecosystem
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2.5 text-white bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 transition-all active:scale-95 flex items-center justify-center"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-[#c6a43f]" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            
            {/* Dark Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="relative mt-20 min-h-[calc(100vh-5rem)] bg-[#0c1622] border-t border-white/10">
              <div className="flex flex-col items-center gap-8 py-16 px-6">
                
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-2xl uppercase tracking-[0.2em] font-black transition-colors ${
                        isActive ? "text-[#c6a43f]" : "text-white hover:text-[#c6a43f]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}

                <div className="w-full max-w-xs">
                  <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#c6a43f] mb-4">
                    Resources
                  </p>
                  <div className="flex flex-col gap-4">
                    {resourceLinks.map((link) => {
                      const isActive = pathname === link.href
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`text-center text-lg uppercase tracking-wider font-medium transition-colors ${
                            isActive ? "text-[#c6a43f]" : "text-white/70 hover:text-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>

                <div className="h-px w-24 bg-white/10 my-4" />

                <Link href="/apply" className="w-full max-w-xs">
                  <Button className="w-full h-14 bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] rounded-xl text-sm font-bold uppercase tracking-widest shadow-xl shadow-[#c6a43f]/20">
                    Join the Ecosystem
                  </Button>
                </Link>

                <Link
                  href="/apply"
                  className="text-[10px] uppercase tracking-[0.3em] text-[#c6a43f]/80 font-bold border-b border-[#c6a43f]/30 pb-1"
                >
                  Connect then Grow
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
