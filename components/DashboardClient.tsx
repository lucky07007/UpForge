// components/DashboardClient.tsx
"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Startup {
  id: string
  name: string
  slug: string
  logo_url?: string
  short_description?: string
  website?: string
}

interface Comment {
  author: string
  text: string
}

export default function DashboardClient({
  latestStartup,
  comments,
}: {
  latestStartup: Startup | null
  comments: Comment[]
  teamCount: number
}) {
  const router = useRouter()
  
  // State to handle the embedded website URL
  const [activeUrl, setActiveUrl] = useState<string>("https://internadda.com")

  const navItems = [
    "Startups",
    "Investments",
    "Sponsors",
    "Analytics",
    "Portfolio",
    "Insights",
    "News",
    "Resources",
  ]

  // Hardcoded Featured Startups for the list
  const featuredStartups = [
    { name: "Internadda", url: "https://internadda.com" },
    { name: "Brand Wala", url: "https://brandwala.com" }, // Updated per your preferences
    { name: "Skillpoint", url: "https://skillpoint.in" },
    { name: "Hozaak", url: "https://hozaak.com" },
    { name: "IFL Institute", url: "https://iflinstitute.com" },
  ]

  return (
    <div className="grid grid-cols-[220px_1fr_240px] h-[500px] text-xs">
      {/* Left Sidebar */}
      <div className="bg-gray-50/80 border-r border-black/5 p-4 space-y-6">
        <div className="font-bold text-lg">UpForge</div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block px-2 py-1.5 rounded hover:bg-black/5"
            >
              {item}
            </Link>
          ))}
          <Link href="/startup" className="block px-2 py-1.5 text-gray-400 hover:text-black">
            More &gt;
          </Link>
        </div>
        <div className="pt-4 border-t border-black/5">
          {/* Admin Redirection */}
          <button 
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            <div className="w-6 h-6 rounded-full bg-black/10"></div>
            <span className="font-mono">Admin</span>
          </button>
        </div>
      </div>

      {/* Center Main Feed - Now with Embed Container */}
      <div className="bg-white p-0 relative overflow-hidden flex flex-col">
        <div className="p-4 border-b border-black/5 bg-white/90 backdrop-blur z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="h-3 w-3" />
            <span>9:00 AM - IST</span>
          </div>
          {latestStartup && (
            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
              Latest: {latestStartup.name}
            </span>
          )}
        </div>
        
        {/* Iframe for Website Preview */}
        <div className="flex-1 w-full bg-gray-100">
          <iframe 
            src={activeUrl}
            className="w-full h-full border-none"
            title="Startup Website Preview"
          />
        </div>
      </div>

      {/* Right Sidebar - Replaced Team with Featured Startups */}
      <div className="bg-gray-50/80 border-l border-black/5 p-4 space-y-4 text-[11px]">
        <div className="space-y-2">
          <div className="font-bold">Mission & Vision</div>
          <div className="text-gray-500">Empower global startups</div>
          <div className="text-gray-500">Provide trusted sponsorship</div>
        </div>
        
        <div className="bg-white p-3 rounded border border-black/5">
          Welcome to UpForge! Explore startups, connect with founders, and sponsor innovation.
        </div>

        <div>
          <div className="font-bold mb-3 uppercase tracking-wider text-[10px] opacity-60">Featured Startups</div>
          <div className="space-y-2">
            {featuredStartups.map((startup) => (
              <button
                key={startup.name}
                onClick={() => setActiveUrl(startup.url)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                  activeUrl === startup.url 
                  ? 'bg-white border-black/10 shadow-sm font-bold' 
                  : 'border-transparent hover:bg-black/5 text-gray-600'
                }`}
              >
                {startup.name}
              </button>
            ))}
            
            <Link 
              href="/startup" 
              className="block text-center p-2 mt-2 text-blue-600 hover:underline font-medium border border-blue-100 rounded-lg bg-blue-50/50"
            >
              More Startups →
            </Link>
          </div>
        </div>

        {/* Testimonials section remains for social proof */}
        <div className="pt-4 border-t border-black/5 space-y-3">
          {comments.slice(0, 2).map((comment, idx) => (
            <div key={idx} className="bg-white/50 p-2 rounded italic text-[10px] text-gray-500">
              <span className="font-bold uppercase text-[9px] not-italic block mb-1">{comment.author.split(" ")[0]}</span>
              "{comment.text.substring(0, 60)}..."
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
