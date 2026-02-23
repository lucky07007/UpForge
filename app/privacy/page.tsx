// app/privacy/page.tsx
import { Shield, Mail } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Privacy Policy | UpForge",
  description: "UpForge's privacy policy – how we handle your data as part of India's independent founder registry.",
};

export default function PrivacyPage() {
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
                  PRIVACY POLICY
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Your Data,{" "}
                <span className="text-gray-500 italic font-medium">Your Control.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400">
                Last updated: February 2026
              </p>
            </div>

            {/* Content Card */}
            <div className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 sm:p-8 md:p-12 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">1. Information We Collect</h2>
                <p className="text-gray-500 leading-relaxed">
                  As part of the UpForge registry, we collect information that you voluntarily provide to us when you apply for listing, update your profile, or communicate with us. This includes:
                </p>
                <ul className="list-disc pl-6 text-gray-500 space-y-2">
                  <li>Founder name, email, phone number, and professional profiles (LinkedIn, Twitter, etc.).</li>
                  <li>Startup details: name, logo, description, website, incorporation documents, traction metrics.</li>
                  <li>Any other information you choose to share with us during the verification process.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">2. How We Use Your Information</h2>
                <p className="text-gray-500 leading-relaxed">Your information is used to:</p>
                <ul className="list-disc pl-6 text-gray-500 space-y-2">
                  <li>Create and maintain your startup’s public profile on the UpForge registry.</li>
                  <li>Verify the authenticity of your startup and founder credentials.</li>
                  <li>Communicate with you about your application, updates, or opportunities.</li>
                  <li>Improve our services and ensure the integrity of the registry.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">3. Data Sharing & Disclosure</h2>
                <p className="text-gray-500 leading-relaxed">
                  We do not sell your personal information. Information you choose to make public on your startup profile (e.g., name, description, logo) is visible to all visitors of the UpForge website. We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-gray-500 space-y-2">
                  <li>Verification partners who assist in validating your credentials.</li>
                  <li>Legal authorities if required by law or to protect our rights.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">4. Data Retention</h2>
                <p className="text-gray-500 leading-relaxed">
                  We retain your information for as long as your startup profile is active or as needed to provide you services. If you wish to delete your profile, please contact us, and we will remove your publicly visible information, though we may retain certain records for legal or operational purposes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">5. Your Rights</h2>
                <p className="text-gray-500 leading-relaxed">
                  You have the right to access, correct, or delete your personal information. To exercise these rights, please email us at{" "}
                  <a href="mailto:privacy@upforge.in" className="text-[#1e3a5f] hover:text-[#c6a43f] transition-colors">
                    privacy@upforge.in
                  </a>.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">6. Security</h2>
                <p className="text-gray-500 leading-relaxed">
                  We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">7. Changes to This Policy</h2>
                <p className="text-gray-500 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">8. Contact Us</h2>
                <p className="text-gray-500 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-white border border-black/5 rounded-xl p-6 mt-4">
                  <p className="flex items-center gap-2 text-black">
                    <Mail className="h-4 w-4 text-[#c6a43f]" />
                    <a href="mailto:privacy@upforge.in" className="hover:text-[#c6a43f] transition-colors">
                      privacy@upforge.in
                    </a>
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    UpForge Registry<br />
                    Mumbai, India
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
