// components/navbar.tsx
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
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "The Registry", href: "/startup" },
    { name: "Sponsorship", href: "/sponsor" },
    { name: "Verification", href: "/docs" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 z-[60] w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#FDFCFB]/90 backdrop-blur-xl border-b border-[#1e3a5f]/5 py-4 shadow-sm"
            : "bg-transparent py-8"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8">
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative h-11 w-11 overflow-hidden border border-[#0F172A]/10 bg-white p-2 transition-all group-hover:shadow-lg">
              <Image
                src="/logo.jpg"
                alt="UpForge"
                fill
                className="object-contain p-1 grayscale group-hover:grayscale-0"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold tracking-tight text-[#0F172A] uppercase">
                UPFORGE
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-[#C6A43F] font-black">
                Official Ledger
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 ${
                      isActive ? "text-[#0F172A]" : "text-[#4a4a4a] hover:text-[#0F172A]"
                    }`}
                  >
                    {link.name}
                    {isActive && <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#C6A43F]" />}
                  </Link>
                )
              })}
            </div>

            <Link href="/apply">
              <Button className="h-11 px-8 bg-[#0F172A] hover:bg-[#1e3a5f] text-white rounded-none text-[10px] font-bold uppercase tracking-[0.2em] transition-all">
                Join Registry
              </Button>
            </Link>
          </div>

          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-[#0F172A]">
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#FDFCFB] animate-in fade-in duration-300">
          <div className="flex justify-between items-center p-8 border-b border-[#1e3a5f]/5">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#C6A43F]">UPFORGE MENU</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#0F172A]">
              <X className="h-8 w-8" />
            </button>
          </div>
          <div className="flex flex-col justify-center h-[70vh] px-12 space-y-10">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-4xl font-display font-light text-[#0F172A] hover:italic hover:pl-4 transition-all duration-300">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
