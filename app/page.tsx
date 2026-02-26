// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 space-y-24">
      
      {/* SECTION 1 — HERO */}
      <section className="text-left py-12">
        <h1 className="font-serif">Discover India’s Emerging Founders.</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          UpForge is an open platform documenting early-stage startups and the founders building them.
        </p>
        
        <div className="relative max-w-xl mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search startups or founders..." 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-link text-base"
          />
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/startup" className="text-sm font-medium">Browse Startups</Link>
          <Button asChild variant="outline" className="border-link text-link rounded-[6px]">
            <Link href="/apply">Submit Startup</Link>
          </Button>
        </div>
      </section>

      {/* SECTION 2 — FEATURED STARTUPS */}
      <section>
        <h2 className="font-serif">Featured This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 border border-gray-200 rounded-sm bg-white hover:border-gray-300 transition-colors">
              <div className="w-8 h-8 bg-gray-100 rounded mb-4" />
              <Link href="#" className="font-bold text-lg block mb-1">Startup Name {i}</Link>
              <p className="text-sm text-muted-foreground mb-3">Neutral one-line description of the startup's primary function.</p>
              <span className="text-[12px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">Industry</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — FOUNDER SPOTLIGHT */}
      <section>
        <h2 className="font-serif">Founder Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-start">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
              <Link href="#" className="font-bold text-base">Founder Name</Link>
              <p className="text-sm text-gray-500 mb-2">Co-founder, Startup Name</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A neutral two-line intro about the founder's background and current focus within the Indian ecosystem.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — BROWSE BY INDUSTRY */}
      <section>
        <h2 className="font-serif">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4">
          {["SaaS", "FinTech", "EdTech", "AI", "D2C", "HealthTech", "Bootstrapped", "Student Startups"].map((cat) => (
            <Link key={cat} href="#" className="text-base">{cat}</Link>
          ))}
        </div>
      </section>

      {/* SECTION 5 — RECENTLY ADDED */}
      <section>
        <h2 className="font-serif">Recently Added Startups</h2>
        <ul className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="text-base list-disc list-inside">
              <Link href="#" className="font-medium">Startup Alpha</Link>
              <span className="text-gray-400 mx-2">—</span>
              <span className="text-gray-600">Bengaluru</span>
              <span className="text-gray-400 mx-2">—</span>
              <span className="text-gray-500 text-sm italic">Early Stage</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 6 — ABOUT */}
      <section className="bg-gray-50 p-8 border border-gray-200">
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl">
          UpForge exists to provide structured visibility to emerging founders and to help students discover new innovation-driven startups across India. Our goal is to maintain an open founder discovery archive for the ecosystem.
        </p>
      </section>

      {/* SECTION 7 — CTA */}
      <section className="border border-gray-200 rounded-md p-10 text-left">
        <h3 className="text-2xl font-serif mb-2">Are you building something new?</h3>
        <p className="text-muted-foreground mb-6">
          Submit your startup profile and become part of India’s open founder discovery archive.
        </p>
        <Button asChild variant="outline" className="border-link text-link rounded-[6px] px-8">
          <Link href="/apply">Submit Startup</Link>
        </Button>
      </section>
    </div>
  );
}
