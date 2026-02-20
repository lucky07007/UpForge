"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, MapPin, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <div className="bg-[#F8F8F6] min-h-screen text-zinc-900 antialiased pt-44 pb-36 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-24">
          <div className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-6">
            Contact · Upforge
          </div>
          <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight">
            Let’s talk about 
            <span className="block font-semibold italic">the next big thing.</span>
          </h1>
          <p className="mt-8 text-lg text-zinc-600 leading-relaxed">
            Have questions about the registry? Want to partner with us? 
            Or just want to share what you're building? We're all ears.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 ml-1">Full Name</label>
                  <Input placeholder="John Doe" className="bg-zinc-50 border-zinc-200 h-12 rounded-xl focus-visible:ring-zinc-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 ml-1">Work Email</label>
                  <Input placeholder="john@startup.com" type="email" className="bg-zinc-50 border-zinc-200 h-12 rounded-xl focus-visible:ring-zinc-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 ml-1">Subject</label>
                <Input placeholder="Listing Inquiry / Partnership / Feedback" className="bg-zinc-50 border-zinc-200 h-12 rounded-xl focus-visible:ring-zinc-400" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 ml-1">Message</label>
                <Textarea 
                  placeholder="Tell us more..." 
                  className="bg-zinc-50 border-zinc-200 min-h-[150px] rounded-xl focus-visible:ring-zinc-400 resize-none" 
                />
              </div>

              <Button className="w-full h-14 bg-black hover:bg-zinc-800 text-white rounded-full text-xs uppercase tracking-[0.2em] transition-all">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>

          {/* Right Side: Contact Info & Details */}
          <div className="flex flex-col justify-between py-4">
            <div className="space-y-12">
              
              {/* Email Box */}
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-zinc-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-1">Email us</h4>
                  <p className="text-zinc-500 mb-2 text-sm">Our team usually responds within 24 hours.</p>
                  <a href="mailto:hello@upforge.in" className="text-lg font-medium hover:text-indigo-600 transition-colors">
                    hello@upforge.in
                  </a>
                </div>
              </div>

              {/* Support Box */}
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5 text-zinc-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-1">Founder Support</h4>
                  <p className="text-zinc-500 mb-2 text-sm">Are you a registered founder? Reach out via our priority line.</p>
                  <span className="text-zinc-900 font-medium">Available 10 AM — 6 PM IST</span>
                </div>
              </div>

              {/* Location Box */}
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-zinc-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-1">Headquarters</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Indiranagar, Bangalore<br />
                    Karnataka, India
                  </p>
                </div>
              </div>

            </div>

            {/* Quiet Branding */}
            <div className="mt-20 pt-10 border-t border-zinc-200">
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
                Upforge India · Building in Public
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
