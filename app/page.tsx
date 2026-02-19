import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { WhyUpforge } from "@/components/why-upforge"
import { Footer } from "@/components/footer"
import { StartupCard } from "@/components/startup-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

  // Fetch Top 3 Elite Startups (Elite Bento Grid)
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .limit(3)
    .order("created_at", { ascending: false })

  // Fetch next 6 standard startups for the "Recently Verified" section
  const { data: regular } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", false)
    .limit(6)
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* ELITE STARTUPS SECTION - Bento Style */}
        <section className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
                <Sparkles className="h-4 w-4" />
                Premium Selection
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                Elite Network
              </h2>
              <p className="text-slate-500 font-medium text-lg">
                The most influential startups currently verified in our institutional ecosystem.
              </p>
            </div>
            <Link 
              href="/startup" 
              className="group flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
            >
              EXPLORE DIRECTORY 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featured?.map((startup) => (
              <StartupCard key={startup.id} startup={startup} featured />
            ))}
          </div>
        </section>

        {/* WHY UPFORGE - Institutional Trust Section */}
        <div className="bg-slate-50/50">
          <WhyUpforge />
        </div>

        {/* RECENTLY VERIFIED SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
              Recently Verified
            </h2>
            <p className="text-slate-500 font-medium">
              New startups that have successfully completed the UpForge verification process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {regular?.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-6 p-12 rounded-[3rem] bg-slate-900 text-white w-full shadow-2xl shadow-slate-200">
              <h3 className="text-3xl font-black tracking-tight">
                Ready to explore the full ecosystem?
              </h3>
              <p className="text-slate-400 font-medium max-w-xl mx-auto">
                Access our complete institutional directory with advanced filters for category, 
                funding stage, and regional origin.
              </p>
              <Link href="/startup">
                <Button className="bg-white text-slate-900 hover:bg-blue-50 rounded-2xl px-10 py-7 text-base font-black shadow-xl">
                  Open Full Directory
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
