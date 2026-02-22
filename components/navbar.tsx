// components/navbar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { label: "Registry", href: "/registry" },
    { label: "About", href: "/about" },
  ]

  return (
    <header className="fixed top-0 w-full bg-[#0B1420]/95 backdrop-blur-sm z-50 border-b border-[#1E2A3A]">
      <nav className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link 
            href="/" 
            className="text-[#EAEAEA] text-xl font-medium tracking-tight"
          >
            UpForge
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm uppercase tracking-[0.1em] transition-colors ${
                  pathname === item.href
                    ? "text-[#BFA14A]"
                    : "text-[#9CA3AF] hover:text-[#EAEAEA]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/apply">
          <Button className="h-10 px-5 bg-transparent border border-[#BFA14A] text-[#BFA14A] hover:bg-[#BFA14A] hover:text-[#0B1420] transition-all duration-200 text-xs uppercase tracking-[0.1em] font-medium rounded-none">
            Apply for Verification
          </Button>
        </Link>
      </nav>
    </header>
  )
}
