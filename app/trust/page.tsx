import { ShieldCheck, Users, FileCheck, Eye, Mail } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Trust & Safety | UpForge",
  description: "How UpForge ensures a trusted environment for founders, investors, and partners.",
}

export default function TrustPage() {
  return (
    <div className="relative bg-[#fbf9f6] min-h-screen text-[#1e1b1b] antialiased">
      {/* Subtle diagonal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 py-32 md:py-40">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1e3a5f]/10 mb-6">
            <ShieldCheck className="h-4 w-4 text-[#c6a43f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f]">
              Trust & Safety
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Built on<br />
            <span className="font-semibold text-[#1e3a5f]">Integrity.</span>
          </h1>
          <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
            We take the responsibility of hosting your startup's reputation seriously. Here's how we maintain a safe and trustworthy environment.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all">
            <div className="h-12 w-12 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Founder Verification</h3>
            <p className="text-[#4a4a4a] leading-relaxed">
              Every founder undergoes manual identity verification. We cross-check with public records, professional networks, and incorporation documents.
            </p>
          </div>

          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all">
            <div className="h-12 w-12 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6">
              <FileCheck className="h-6 w-6 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Startup Vetting</h3>
            <p className="text-[#4a4a4a] leading-relaxed">
              We verify business registration, operational history, and traction metrics. Only genuine, active startups receive the UpForge Seal.
            </p>
          </div>

          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all">
            <div className="h-12 w-12 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6">
              <Eye className="h-6 w-6 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Transparency</h3>
            <p className="text-[#4a4a4a] leading-relaxed">
              Each profile shows verification status and the date of verification. Sponsored listings are clearly marked.
            </p>
          </div>

          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all">
            <div className="h-12 w-12 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6">
              <ShieldCheck className="h-6 w-6 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Data Protection</h3>
            <p className="text-[#4a4a4a] leading-relaxed">
              We adhere to strict data handling practices. Your personal information is never sold or misused.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white border border-[#1e3a5f]/10 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#1e1b1b] mb-4">Our Verification Process</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              The UpForge verification process is rigorous and multi-step. We review:
            </p>
            <ul className="list-disc pl-6 text-[#4a4a4a] mt-4 space-y-2">
              <li>Certificate of Incorporation or equivalent registration.</li>
              <li>Founder identity via government ID and professional profiles.</li>
              <li>Operational history (e.g., website, product, customer traction).</li>
              <li>Public records and any relevant news or mentions.</li>
            </ul>
            <p className="text-[#4a4a4a] mt-4">
              Only after passing these checks does a startup receive the verified seal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1e1b1b] mb-4">Reporting Concerns</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              If you believe a listing is inaccurate or fraudulent, please report it immediately. We investigate all reports within 48 hours.
            </p>
            <div className="bg-[#fbf9f6] p-6 rounded-2xl border border-[#1e3a5f]/10 mt-4">
              <p className="flex items-center gap-2 text-[#1e1b1b]">
                <Mail className="h-4 w-4 text-[#c6a43f]" />
                <a href="mailto:safety@upforge.in" className="hover:text-[#c6a43f] transition-colors">safety@upforge.in</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1e1b1b] mb-4">Commitment to Quality</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              We continuously monitor the registry and remove startups that no longer meet our standards or that engage in misleading practices. Our goal is to maintain a high-quality, trustworthy directory for the entire ecosystem.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#4a4a4a]">
            UpForge · Independent Founder Registry
          </p>
        </div>
      </div>
    </div>
  )
}
