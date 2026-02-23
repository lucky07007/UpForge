// app/reports/page.tsx
import { Button } from "@/components/ui/button";
import { Mail, Phone, FileText, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Market Reports | UpForge Intelligence",
  description:
    "Request on‑demand market reports, founder trends, and ecosystem data from UpForge. Tailored insights for serious builders and investors.",
};

export default function ReportsPage() {
  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  MARKET INTELLIGENCE
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Insights <span className="text-gray-500 italic font-medium">on Demand.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Get access to exclusive market reports, founder trends, and ecosystem data tailored to your needs.
                Our team prepares detailed reports on emerging sectors, investor activity, and startup landscapes.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                {
                  icon: FileText,
                  title: "Sector Deep Dives",
                  desc: "Comprehensive analysis of emerging sectors like ClimateTech, SaaS, D2C, and more.",
                },
                {
                  icon: TrendingUp,
                  title: "Founder Trends",
                  desc: "Data‑driven insights on fundraising, team building, and growth patterns.",
                },
                {
                  icon: (props: any) => (
                    <svg
                      {...props}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  ),
                  title: "Investor Activity",
                  desc: "Track who is investing where, deal flow, and emerging funds.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="h-14 w-14 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 group-hover:text-[#c6a43f] transition-colors">
                    <item.icon className="h-6 w-6 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-black/5 rounded-2xl p-8 md:p-12 shadow-sm">
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-center mb-4">
                  Request a <span className="text-gray-500 italic font-medium">Custom Report</span>
                </h2>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                  Our reports are prepared on demand. Reach out to our intelligence team, and we’ll get back to you within 24 hours.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Phone Card */}
                  <div className="bg-white border border-black/5 rounded-2xl p-8 text-center hover:shadow-lg transition-all group">
                    <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c6a43f]/10 transition-colors">
                      <Phone className="h-8 w-8 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Call or WhatsApp</h3>
                    <p className="text-gray-400 mb-4">Speak directly with our team.</p>
                    <a
                      href="tel:+919217713161"
                      className="inline-block text-2xl font-bold text-[#1e3a5f] hover:text-[#c6a43f] transition-colors"
                    >
                      +91 92177 13161
                    </a>
                  </div>

                  {/* Email Card */}
                  <div className="bg-white border border-black/5 rounded-2xl p-8 text-center hover:shadow-lg transition-all group">
                    <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c6a43f]/10 transition-colors">
                      <Mail className="h-8 w-8 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-gray-400 mb-4">Send your requirements.</p>
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
                  <p className="text-sm text-gray-400 mb-6">
                    Typical turnaround: 3–5 business days for custom reports.
                  </p>
                  <Link href="/contact">
                    <Button className="h-14 px-12 rounded-full bg-[#1e3a5f] hover:bg-[#14304a] text-white text-xs uppercase tracking-[0.2em] shadow-lg">
                      Contact Intelligence Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
