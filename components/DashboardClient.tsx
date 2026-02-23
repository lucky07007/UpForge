// components/DashboardClient.tsx
"use client"

import { useState } from "react"
import { Clock, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
  teamCount,
}: {
  latestStartup: Startup | null
  comments: Comment[]
  teamCount: number
}) {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)

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

  return (
    <>
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
            <Link href="/more" className="block px-2 py-1.5 text-gray-400 hover:text-black">
              More &gt;
            </Link>
          </div>
          <div className="pt-4 border-t border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-black/10"></div>
              <span className="font-mono">Admin</span>
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="bg-white p-4 space-y-4 overflow-y-auto">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="h-3 w-3" />
            <span>9:00 AM - IST</span>
          </div>

          {latestStartup && (
            <button
              onClick={() => setSelectedStartup(latestStartup)}
              className="w-full text-left bg-blue-50 p-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition"
            >
              <div className="font-medium">New Startup Added: {latestStartup.name}</div>
              <div className="text-sm">{latestStartup.short_description || "Check out this innovative startup."}</div>
            </button>
          )}

          <div className="space-y-3">
            {comments.slice(0, 2).map((comment, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="flex-1 bg-gray-100 p-2 rounded">
                  <span className="font-medium">{comment.author.split(" ")[0]}:</span> {comment.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
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
            <div className="font-bold">Team</div>
            <div className="text-gray-500 text-[10px]">Discover our startup ecosystem contributors.</div>
            <div className="flex items-center gap-2 mt-2">
              <span>{teamCount}</span> <Plus className="h-3 w-3" /> <span>members</span>
            </div>
            <div className="mt-2 space-y-1">
              <Link href="/onboarding" className="block hover:underline">
                Onboarding Guide
              </Link>
              <Link href="/team" className="block hover:underline">
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedStartup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStartup(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedStartup.logo_url || "/placeholder-logo.svg"}
                alt={selectedStartup.name}
                className="w-16 h-16 object-contain rounded-lg bg-gray-50 p-2"
              />
              <div>
                <h3 className="text-xl font-bold">{selectedStartup.name}</h3>
                {selectedStartup.website && (
                  <a
                    href={selectedStartup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Visit website
                  </a>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {selectedStartup.short_description || "No description available."}
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedStartup(null)}
                className="rounded-full"
              >
                Close
              </Button>
              <Button asChild size="sm" className="rounded-full bg-[#1e3a5f]">
                <Link href={`/startup/${selectedStartup.slug}`}>View full profile</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
