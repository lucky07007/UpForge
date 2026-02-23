// app/terms/page.tsx
import { Scale, Mail } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Terms of Service | UpForge",
  description: "Terms and conditions for using UpForge, India's independent founder registry.",
};

export default function TermsPage() {
  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  TERMS OF SERVICE
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Our Agreement,{" "}
                <span className="text-gray-500 italic font-medium">Your Commitment.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400">
                Last updated: February 2026
              </p>
            </div>

            {/* Content Card */}
            <div className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 sm:p-8 md:p-12 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">1. Acceptance of Terms</h2>
                <p className="text-gray-500 leading-relaxed">
                  By accessing or using the UpForge website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">2. Description of Service</h2>
                <p className="text-gray-500 leading-relaxed">
                  UpForge provides a public registry of verified Indian startups. We offer startup profiles, verification services, and sponsored visibility options. All information displayed is provided by the startups themselves and verified to the best of our ability.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">3. User Responsibilities</h2>
                <p className="text-gray-500 leading-relaxed">
                  As a user (founder or visitor), you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-500 space-y-2">
                  <li>Provide accurate and complete information when applying or updating your profile.</li>
                  <li>Not impersonate any person or entity or misrepresent your affiliation.</li>
                  <li>Not use the service for any illegal or unauthorized purpose.</li>
                  <li>Respect the intellectual property rights of UpForge and other users.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">4. Verification and Sponsorship</h2>
                <p className="text-gray-500 leading-relaxed">
                  Verification is a manual process and does not guarantee any particular outcome or investment. Sponsored listings are clearly marked and provide enhanced visibility but do not imply endorsement by UpForge.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">5. Intellectual Property</h2>
                <p className="text-gray-500 leading-relaxed">
                  All content on the UpForge website, including logos, text, graphics, and software, is the property of UpForge or its licensors and is protected by Indian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written consent.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">6. Limitation of Liability</h2>
                <p className="text-gray-500 leading-relaxed">
                  UpForge is not liable for any indirect, incidental, or consequential damages arising from your use of the service. We do not guarantee the accuracy or completeness of any information on the registry.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">7. Termination</h2>
                <p className="text-gray-500 leading-relaxed">
                  We reserve the right to suspend or terminate access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or the registry.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">8. Governing Law</h2>
                <p className="text-gray-500 leading-relaxed">
                  These Terms shall be governed by the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">9. Changes to Terms</h2>
                <p className="text-gray-500 leading-relaxed">
                  We may modify these Terms at any time. Your continued use of the service after any changes indicates your acceptance of the new Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">10. Contact</h2>
                <div className="bg-white border border-black/5 rounded-xl p-6">
                  <p className="flex items-center gap-2 text-black">
                    <Mail className="h-4 w-4 text-[#c6a43f]" />
                    <a
                      href="mailto:legal@upforge.in"
                      className="hover:text-[#c6a43f] transition-colors"
                    >
                      legal@upforge.in
                    </a>
                  </p>
                </div>
              </section>
            </div>

            {/* Footer strip (already in Footer component, but if you want a separator) */}
            <div className="text-center mt-12">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">
                UpForge · Independent Founder Registry
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
