import { Scale, Mail } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Terms of Service | UpForge",
  description: "Terms and conditions for using UpForge, India's independent founder registry.",
}

export default function TermsPage() {
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
            <Scale className="h-4 w-4 text-[#c6a43f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f]">
              Terms of Service
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Our Agreement,<br />
            <span className="font-semibold text-[#1e3a5f]">Your Commitment.</span>
          </h1>
          <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
            Last updated: February 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-[#1e3a5f]/10 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">1. Acceptance of Terms</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              By accessing or using the UpForge website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">2. Description of Service</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              UpForge provides a public registry of verified Indian startups. We offer startup profiles, verification services, and sponsored visibility options. All information displayed is provided by the startups themselves and verified to the best of our ability.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">3. User Responsibilities</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              As a user (founder or visitor), you agree to:
            </p>
            <ul className="list-disc pl-6 text-[#4a4a4a] space-y-2">
              <li>Provide accurate and complete information when applying or updating your profile.</li>
              <li>Not impersonate any person or entity or misrepresent your affiliation.</li>
              <li>Not use the service for any illegal or unauthorized purpose.</li>
              <li>Respect the intellectual property rights of UpForge and other users.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">4. Verification and Sponsorship</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              Verification is a manual process and does not guarantee any particular outcome or investment. Sponsored listings are clearly marked and provide enhanced visibility but do not imply endorsement by UpForge.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">5. Intellectual Property</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              All content on the UpForge website, including logos, text, graphics, and software, is the property of UpForge or its licensors and is protected by Indian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">6. Limitation of Liability</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              UpForge is not liable for any indirect, incidental, or consequential damages arising from your use of the service. We do not guarantee the accuracy or completeness of any information on the registry.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">7. Termination</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              We reserve the right to suspend or terminate access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or the registry.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">8. Governing Law</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              These Terms shall be governed by the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">9. Changes to Terms</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              We may modify these Terms at any time. Your continued use of the service after any changes indicates your acceptance of the new Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">10. Contact</h2>
            <div className="bg-[#fbf9f6] p-6 rounded-2xl border border-[#1e3a5f]/10">
              <p className="flex items-center gap-2 text-[#1e1b1b]">
                <Mail className="h-4 w-4 text-[#c6a43f]" />
                <a href="mailto:legal@upforge.in" className="hover:text-[#c6a43f] transition-colors">legal@upforge.in</a>
              </p>
            </div>
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
