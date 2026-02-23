// components/DashboardClient.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

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
  
  // Defaulting the view to Internadda
  const [activeUrl, setActiveUrl] = useState<string>("https://internadda.com")

  // The simplified list of 5-6 startups as requested
  const featuredStartups = [
    { name: "Internadda", url: "https://internadda.com" },
    { name: "Brand Wala", url: "https://brandwala.com" },
    { name: "Skillpoint", url: "https://skillpoint.in" },
    { name: "Hozaak", url: "https://hozaak.com" },
    { name: "IFL Institute", url: "https://iflinstitute.com" },
  ]

  return (
    <div className="flex h-[600px] w-full bg-white text-xs overflow-hidden border border-black/5 rounded-xl">
      {/* LEFT SIDEBAR: Simplified to Startups & Admin only */}
      <div className="w-[240px] bg-gray-50/80 border-r border-black/5 flex flex-col">
        <div className="p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
            Featured Startups
          </h2>
          
          <div className="space-y-2">
            {featuredStartups.map((startup) => (
              <button
                key={startup.name}
                onClick={() => setActiveUrl(startup.url)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all border ${
                  activeUrl === startup.url 
                  ? 'bg-white border-black/10 shadow-sm font-bold text-black' 
                  : 'border-transparent hover:bg-black/5 text-gray-500'
                }`}
              >
                {startup.name}
              </button>
            ))}

            <button 
              onClick={() => router.push('/startup')}
              className="w-full text-center p-3 mt-4 text-[#1e3a5f] font-bold hover:underline border border-dashed border-[#1e3a5f]/20 rounded-xl"
            >
              More Startups →
            </button>
          </div>
        </div>

        {/* BOTTOM SECTION: Admin only */}
        <div className="mt-auto p-6 border-t border-black/5">
          <button 
            onClick={() => router.push('/admin')}
            className="flex items-center gap-3 w-full p-2 hover:bg-black/5 rounded-lg transition"
          >
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-[10px]">
              A
            </div>
            <span className="font-bold text-gray-700">Admin Panel</span>
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Full Website Workspace */}
      <div className="flex-1 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <iframe 
          src={activeUrl}
          className="w-full h-full border-none shadow-inner"
          title="Startup Preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  )
}
