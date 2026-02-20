"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Flame, Globe2, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-32 px-6 min-h-screen">

      {/* Background Effects */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-indigo-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-300px] right-[-200px] w-[700px] h-[700px] bg-purple-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <p className="text-xs font-black uppercase tracking-[0.5em] text-indigo-600 mb-6">
            Our Identity
          </p>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Forging India’s{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Next Generation
            </span>{" "}
            of Builders
          </h1>

          <p className="mt-8 text-slate-600 text-lg leading-relaxed">
            UpForge is not a media company. Not a listing website.
            It is a verified ecosystem where independent founders,
            operators, and emerging startups build visibility,
            trust, and long-term momentum.
          </p>
        </motion.div>

        {/* CORE PILLARS */}
        <div className="grid md:grid-cols-2 gap-10">

          {[
            {
              icon: Flame,
              title: "Built for Builders",
              desc: "Every startup listed here is independently driven. We prioritize clarity, founder transparency, and real-world execution over hype.",
              color: "text-indigo-600"
            },
            {
              icon: ShieldCheck,
              title: "Verified Network",
              desc: "Profiles are structured for authenticity — helping founders build digital credibility and long-term brand equity.",
              color: "text-emerald-600"
            },
            {
              icon: Users,
              title: "Independent First",
              desc: "We spotlight founders before they become headlines — empowering early-stage teams with discoverability and organic distribution.",
              color: "text-purple-600"
            },
            {
              icon: Globe2,
              title: "Long-Term Vision",
              desc: "UpForge aims to become India’s most trusted independent founder network — not through noise, but through signal.",
              color: "text-indigo-500"
            }
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group backdrop-blur-xl bg-white/70 rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <Icon className={`h-8 w-8 mb-6 ${item.color}`} />
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}

        </div>

        {/* FINAL STATEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-6">
            This is not a directory.
            <span className="block text-indigo-600 mt-2">
              It is a signal.
            </span>
          </h3>

          <p className="text-slate-600 leading-relaxed text-lg">
            A signal that serious founders are building.
            A signal that India’s startup ecosystem is evolving.
            A signal that credibility matters more than noise.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
