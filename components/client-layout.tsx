// components/client-layout.tsx
"use client"

import { usePathname } from "next/navigation"
import { createContext, useContext, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import type { DomainContext } from "@/lib/domain"

// ─── Domain Context ───────────────────────────────────────────────────────────
// Provides the domain context ('in' | 'org') to ALL client components in the tree.
// This avoids every client component having to call getDomainContextClient()
// independently (which re-reads window.location each time).
//
// Usage in any client component:
//   import { useDomain } from "@/components/client-layout"
//   const { domainContext, isIndia, isGlobal } = useDomain()

interface DomainContextValue {
  domainContext: DomainContext
  isIndia: boolean
  isGlobal: boolean
  baseUrl: string
  alternateUrl: string
}

const DomainCtx = createContext<DomainContextValue>({
  domainContext: 'in',
  isIndia: true,
  isGlobal: false,
  baseUrl: 'https://www.upforge.in',
  alternateUrl: 'https://www.upforge.org',
})

/**
 * useDomain()
 *
 * React hook — returns the current domain context for client components.
 *
 * @example
 * const { domainContext, isIndia } = useDomain()
 * const registryUrl = isIndia
 *   ? "https://www.upforge.org/registry"
 *   : "/registry"
 */
export function useDomain(): DomainContextValue {
  return useContext(DomainCtx)
}

// ─── ClientLayout ─────────────────────────────────────────────────────────────

interface ClientLayoutProps {
  children: React.ReactNode
  /**
   * Passed from RootLayout (a Server Component) via getDomainContext().
   * This is the authoritative domain value for the request — no client-side
   * hostname parsing needed.
   */
  domainContext: DomainContext
}

export function ClientLayout({ children, domainContext }: ClientLayoutProps) {
  const pathname = usePathname()
  const isReportPage = pathname === "/reports"

  // Derive all domain values once — memoized so context doesn't re-render
  // on every navigation (domainContext never changes within a session).
  const domainValue = useMemo<DomainContextValue>(() => ({
    domainContext,
    isIndia:      domainContext === 'in',
    isGlobal:     domainContext === 'org',
    baseUrl:      domainContext === 'in'
                    ? 'https://www.upforge.in'
                    : 'https://www.upforge.org',
    alternateUrl: domainContext === 'in'
                    ? 'https://www.upforge.org'
                    : 'https://www.upforge.in',
  }), [domainContext])

  return (
    <DomainCtx.Provider value={domainValue}>
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
      {!isReportPage && <Chatbot />}
    </DomainCtx.Provider>
  )
}
