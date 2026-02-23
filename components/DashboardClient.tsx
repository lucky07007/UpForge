// components/DashboardClient.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutGrid, ShieldCheck, ExternalLink, ChevronRight } from "lucide-react"

interface Startup {
  id: string
  name: string
  slug: string
  logo_url?: string
  website?: string
}

export default function DashboardClient({
  latestStartup,
}: {
  latestStartup: Startup | null
  comments: any[]
  teamCount: number
}) {
  const router = useRouter()
  const [activeUrl, setActiveUrl] = useState<string>("https://internadda.com")

  const featuredStartups = [
    { name: "Internadda", url: "https://internadda.com" },
    { name: "Brand Wala", url: "https://brandwala.com" },
    { name: "Skillpoint", url: "https://skillpoint.in" },
    { name: "Hozaak", url: "https://hozaak.com" },
    { name: "IFL Institute", url: "https://iflinstitute.com" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
      {/* Container with reduced height for desktop (450px) and auto for mobile */}
      <div className="flex flex-col md:flex-row h-auto md:h-[450px]">
        
        {/* SIDEBAR / TOP MENU */}
        <div className="w-full md:w-[220px] bg-gray-50/50 border-b md:border-b-0 md:border-r border-black/5 flex flex-col">
          <div className="p-4 flex items-center justify-between md:block">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0 md:mb-4 flex items-center gap-2">
              <LayoutGrid className="w-3 h-3" /> Featured
            </h2>
            
            {/* Mobile Horizontal Scroll for Startups */}
            <div className="flex md:hidden gap-2 overflow-x-auto pb-1 no-scrollbar">
              {featuredStartups.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setActiveUrl(s.url)}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                    activeUrl === s.url ? 'bg-black text-white' : 'bg-black/5 text-gray-600'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Vertical Menu */}
          <div className="hidden md:block flex-1 px-3 space-y-1">
            {featuredStartups.map((startup) => (
              <button
                key={startup.name}
                onClick={() => setActiveUrl(startup.url)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition-all flex items-center justify-between group ${
                  activeUrl === startup.url 
                  ? 'bg-white border border-black/5 shadow-sm font-bold text-black' 
                  : 'text-gray-500 hover:bg-black/5'
                }`}
              >
                {startup.name}
                <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${activeUrl === startup.url ? 'opacity-100' : ''}`} />
              </button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="p-3 mt-auto border-t border-black/5 flex md:flex-col gap-2">
            <button 
              onClick={() => router.push('/startup')}
              className="flex-1 text-[11px] font-bold py-2 px-3 rounded-lg border border-black/10 hover:bg-black hover:text-white transition-colors text-center"
            >
              Explore More
            </button>
            <button 
              onClick={() => router.push('/admin')}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-bold hover:bg-blue-100 transition-colors"
            >
              <ShieldCheck className="w-3 h-3" /> Admin
            </button>
          </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="flex-1 bg-gray-100 relative min-h-[300px] md:min-h-0">
          {/* Top Address Bar Look */}
          <div className="absolute top-0 left-0 w-full h-8 bg-white/80 backdrop-blur-sm border-b border-black/5 flex items-center px-4 justify-between z-10">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="text-[9px] text-gray-400 font-mono truncate">{activeUrl}</span>
            </div>
            <a href={activeUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black">
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <iframe 
            src={activeUrl}
            className="w-full h-full pt-8 border-none"
            title="Startup Workspace"
          />
        </div>
      </div>
    </div>
  )
}
