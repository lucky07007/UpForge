// app/docs/page.tsx
import { Button } from "@/components/ui/button"
import { Mail, Phone, Code, Shield, Zap, BarChart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "API Access | UpForge Developer Platform",
  description: "Integrate verified startup data into your applications. Request API access for real‑time founder registry data.",
}

export default function DocsPage() {
  return (
    <div className="relative bg-[#fbf9f6] min-h-screen text-[#1e1b1b] antialiased">
      {/* Subtle diagonal pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        {/* ================= HERO ================= */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1e3a5f]/10 mb-6">
            <Code className="h-4 w-4 text-[#c6a43f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f]">
              Developer API
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Integrate <span className="font-semibold text-[#1e3a5f]">Verified Data.</span>
          </h1>
          <p className="text-lg text-[#4a4a4a] leading-relaxed">
            Access the UpForge registry programmatically. Build applications, run analysis, or embed startup data with our REST API.
          </p>
        </div>

        {/* ================= BENEFITS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all group">
            <div className="h-14 w-14 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 transition-colors">
              <Zap className="h-6 w-6 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real‑time Data</h3>
            <p className="text-[#4a4a4a] text-sm">Always up‑to‑date startup profiles, verification status, and sponsor information.</p>
          </div>
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all group">
            <div className="h-14 w-14 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 transition-colors">
              <Shield className="h-6 w-6 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Only</h3>
            <p className="text-[#4a4a4a] text-sm">All startups in our API are manually verified – no unvetted listings.</p>
          </div>
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all group">
            <div className="h-14 w-14 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 transition-colors">
              <BarChart className="h-6 w-6 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rich Insights</h3>
            <p className="text-[#4a4a4a] text-sm">Access traction metrics, founder profiles, and market categories.</p>
          </div>
        </div>

        {/* ================= ACCESS DETAILS ================= */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white border border-[#1e3a5f]/10 rounded-3xl p-12 md:p-16 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-light text-center mb-8">
              API Access is <span className="font-semibold text-[#1e3a5f]">On Demand</span>
            </h2>
            <p className="text-center text-[#4a4a4a] mb-12 max-w-2xl mx-auto">
              We provide API keys to trusted partners and serious developers. Tell us about your use case, and we’ll set you up with documentation and access.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone Card */}
              <div className="bg-[#fbf9f6] border border-[#1e3a5f]/10 rounded-2xl p-8 text-center hover:border-[#c6a43f]/30 transition-all group">
                <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c6a43f]/10 transition-colors">
                  <Phone className="h-8 w-8 text-[#c6a43f]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call or WhatsApp</h3>
                <p className="text-[#4a4a4a] mb-4">Speak with our developer relations team.</p>
                <a
                  href="tel:+919217713161"
                  className="inline-block text-2xl font-bold text-[#1e3a5f] hover:text-[#c6a43f] transition-colors"
                >
                  +91 92177 13161
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-[#fbf9f6] border border-[#1e3a5f]/10 rounded-2xl p-8 text-center hover:border-[#c6a43f]/30 transition-all group">
                <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c6a43f]/10 transition-colors">
                  <Mail className="h-8 w-8 text-[#c6a43f]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-[#4a4a4a] mb-4">Send your project details.</p>
                <div className="space-y-2">
                  <a
                    href="mailto:info@upforge.in"
                    className="block text-lg font-medium text-[#1e3a5f] hover:text-[#c6a43f] transition-colors"
                  >
                    info@upforge.in
                  </a>

                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-[#4a4a4a] mb-6">
                All API plans include comprehensive documentation and developer support.
              </p>
              <Link href="/contact">
                <Button className="h-14 px-12 rounded-full bg-[#1e3a5f] hover:bg-[#14304a] text-white text-xs uppercase tracking-[0.2em] shadow-lg">
                  Request API Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#4a4a4a]">
            UpForge · Independent Founder Registry
          </p>
        </div>
      </div>
    </div>
  )
}
