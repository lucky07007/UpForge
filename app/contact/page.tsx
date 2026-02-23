// app/contact/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  CONTACT · UPFORGE
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Let’s talk about <br />
                <span className="text-gray-500 italic font-medium">the next big thing.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl">
                Have questions about the registry? Want to partner with us? Or just want to share what you're building? We're all ears.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 sm:p-8"
              >
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                        Full Name
                      </label>
                      <Input
                        placeholder="John Doe"
                        className="h-12 border-black/10 focus:border-[#1e3a5f] rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                        Work Email
                      </label>
                      <Input
                        placeholder="john@startup.com"
                        type="email"
                        className="h-12 border-black/10 focus:border-[#1e3a5f] rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                      Subject
                    </label>
                    <Input
                      placeholder="Listing Inquiry / Partnership / Feedback"
                      className="h-12 border-black/10 focus:border-[#1e3a5f] rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us more..."
                      className="min-h-[150px] border-black/10 focus:border-[#1e3a5f] rounded-xl resize-none p-4 text-sm"
                    />
                  </div>

                  <Button className="w-full h-14 bg-[#1e3a5f] hover:bg-[#14304a] text-white rounded-full uppercase text-[10px] font-black tracking-[0.3em] transition-all mt-2">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Email */}
                <div className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 flex gap-6 hover:shadow-lg transition">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-[#1e3a5f]/10 border border-black/5 flex items-center justify-center text-[#1e3a5f]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Email us</h4>
                    <p className="text-gray-400 text-sm mb-2">Our team usually responds within 24 hours.</p>
                    <a
                      href="mailto:info@upforge.in"
                      className="text-lg font-medium text-black hover:text-[#1e3a5f] transition-colors"
                    >
                      info@upforge.in
                    </a>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 flex gap-6 hover:shadow-lg transition">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-[#1e3a5f]/10 border border-black/5 flex items-center justify-center text-[#1e3a5f]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Founder Support</h4>
                    <p className="text-gray-400 text-sm mb-2">
                      Are you a registered founder? Reach out via our priority line.
                    </p>
                    <span className="text-black font-medium">Available 10 AM — 6 PM IST</span>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 flex gap-6 hover:shadow-lg transition">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-[#1e3a5f]/10 border border-black/5 flex items-center justify-center text-[#1e3a5f]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Headquarters</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Delhi, India
                    </p>
                  </div>
                </div>

                {/* Quiet Branding */}
                <div className="pt-8 border-t border-black/5">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">
                    Upforge India · Building in Public
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
