import { createClient } from "@/lib/supabase/server"
import { SearchBar } from "@/components/search-bar"
import { Metadata } from "next"

/**
 * SEO METADATA
 * Using a server-side export for improved search rankings and dynamic social previews.
 */
export const metadata: Metadata = {
  title: "Explore Indian Startups | UpForge",
  description: "Discover verified Indian startups, founders and emerging companies on UpForge's comprehensive institutional directory.",
  openGraph: {
    title: "Explore Indian Startups | UpForge",
    description: "Discover verified Indian startups, founders and emerging companies.",
    url: "https://upforge.in/startups",
    type: "website",
  },
}

export default async function StartupsPage() {
  const supabase = await createClient()

  // Initial data fetch from Server Component for SEO and faster initial load
  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .order("name", { ascending: true })

  return (
    <div className="min-h-screen bg-slate-50/30 py-20 px-6">
      {/* Subtle background pattern for premium feel */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="mb-20 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
              Verified Institutional Database
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-none">
            The Directory
          </h1>
          
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Access our complete network of verified independent startups. 
            <span className="block text-sm text-slate-400 mt-2">Every profile is rigorously vetted for quality and impact.</span>
          </p>
        </div>

        {/* SEARCH & FILTER COMPONENT 
            The SearchBar handles client-side filtering, search, and category selection.
        */}
        <SearchBar initialData={startups || []} />
      </div>

      {/* FOOTER CALLOUT */}
      <div className="mt-32 border-t border-slate-100 bg-white/50 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-sm">
          <div className="flex items-center gap-2 text-slate-600 font-bold">
            <div className="h-4 w-4 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-[8px] text-white">✓</span>
            </div>
            <span>New startups authenticated weekly</span>
          </div>
          <div className="flex items-center gap-8 grayscale opacity-40">
            <span className="font-mono text-xs font-black">SEQUOIA</span>
            <span className="font-mono text-xs font-black">ACCEL</span>
            <span className="font-mono text-xs font-black">BLUME</span>
          </div>
        </div>
      </div>
    </div>
  )
}
