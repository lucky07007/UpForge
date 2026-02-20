"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { StartupDirectoryItem } from "@/types/startup"

interface SearchBarProps {
  initialData: StartupDirectoryItem[]
}

export function SearchBar({ initialData }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const filteredStartups = useMemo(() => {
    if (!query) return initialData

    return initialData.filter((startup) =>
      startup.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, initialData])

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search startups..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Results */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredStartups.map((startup) => (
          <Link
            key={startup.id}
            href={`/startup/${startup.slug}`}
            className="p-4 rounded-xl border bg-white hover:shadow-lg transition relative"
          >
            {startup.is_sponsored && (
              <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">
                Sponsored
              </span>
            )}

            <div className="flex items-center gap-3">
              {startup.logo_url && (
                <img
                  src={startup.logo_url}
                  alt={startup.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
              )}
              <h3 className="font-semibold text-lg">{startup.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      {filteredStartups.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No startups found.
        </p>
      )}
    </div>
  )
}
