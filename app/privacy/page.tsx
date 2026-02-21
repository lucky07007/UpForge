import { Shield, Mail } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | UpForge",
  description: "UpForge's privacy policy – how we handle your data as part of India's independent founder registry.",
}

export default function PrivacyPage() {
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
            <Shield className="h-4 w-4 text-[#c6a43f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f]">
              Privacy Policy
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Your Data,<br />
            <span className="font-semibold text-[#1e3a5f]">Your Control.</span>
          </h1>
          <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
            Last updated: February 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-[#1e3a5f]/10 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">1. Information We Collect</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              As part of the UpForge registry, we collect information that you voluntarily provide to us when you apply for listing, update your profile, or communicate with us. This includes:
            </p>
            <ul className="list-disc pl-6 text-[#4a4a4a] space-y-2">
              <li>Founder name, email, phone number, and professional profiles (LinkedIn, Twitter, etc.).</li>
              <li>Startup details: name, logo, description, website, incorporation documents, traction metrics.</li>
              <li>Any other information you choose to share with us during the verification process.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">2. How We Use Your Information</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              Your information is used to:
            </p>
            <ul className="list-disc pl-6 text-[#4a4a4a] space-y-2">
              <li>Create and maintain your startup’s public profile on the UpForge registry.</li>
              <li>Verify the authenticity of your startup and founder credentials.</li>
              <li>Communicate with you about your application, updates, or opportunities.</li>
              <li>Improve our services and ensure the integrity of the registry.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">3. Data Sharing & Disclosure</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              We do not sell your personal information. Information you choose to make public on your startup profile (e.g., name, description, logo) is visible to all visitors of the UpForge website. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-[#4a4a4a] space-y-2">
              <li>Verification partners who assist in validating your credentials.</li>
              <li>Legal authorities if required by law or to protect our rights.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">4. Data Retention</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              We retain your information for as long as your startup profile is active or as needed to provide you services. If you wish to delete your profile, please contact us, and we will remove your publicly visible information, though we may retain certain records for legal or operational purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">5. Your Rights</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              You have the right to access, correct, or delete your personal information. To exercise these rights, please email us at <a href="mailto:privacy@upforge.in" className="text-[#c6a43f] hover:underline">privacy@upforge.in</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">6. Security</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">7. Changes to This Policy</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1e1b1b]">8. Contact Us</h2>
            <p className="text-[#4a4a4a] leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-[#fbf9f6] p-6 rounded-2xl border border-[#1e3a5f]/10 mt-4">
              <p className="flex items-center gap-2 text-[#1e1b1b]">
                <Mail className="h-4 w-4 text-[#c6a43f]" />
                <a href="mailto:privacy@upforge.in" className="hover:text-[#c6a43f] transition-colors">privacy@upforge.in</a>
              </p>
              <p className="text-sm text-[#4a4a4a] mt-2">
                UpForge Registry<br />
                Mumbai, India
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
