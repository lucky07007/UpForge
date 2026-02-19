import Link from "next/link"
import { ArrowRight, Globe } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-32 pt-24 border-b border-slate-50">
      {/* Subtle Grid Pattern for Trust */}
      <div className="absolute inset-0 z-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none">
        <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-10 inline-flex items-center gap-3 rounded-full bg-slate-50 border border-slate-100 px-5 py-2">
            <Globe className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
              India&apos;s Independent Founder Network
            </span>
          </div>

          <h1 className="text-balance text-6xl font-black leading-[1.1] tracking-tighter text-slate-900 md:text-8xl">
            Forge Your <span className="text-blue-600">Rise.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 font-medium">
            The premier recognition platform for India&apos;s next generation of builders. 
            We verify, showcase, and connect the most ambitious independent startups.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/startup"
              className="inline-flex h-16 items-center gap-3 rounded-2xl bg-slate-900 px-10 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200"
            >
              Explore the Directory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
