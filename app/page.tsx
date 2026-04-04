// components/founder-chronicle-client.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  TrendingUp, 
  Users, 
  Award, 
  Zap, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  Star,
  BookOpen,
  Shield,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  ExternalLink
} from "lucide-react"

interface Founder {
  slug: string
  name: string
  role: string
  company: string
  shortBio: string
  image: string
  category?: string[]
  funding?: string
  valuation?: string
}

interface LinkItem {
  l: string
  h: string
  desc?: string
}

interface FounderChronicleClientProps {
  founders: Founder[]
  featuredFounder: Founder
  remainingFounders: Founder[]
  startupCount: number
  isOrg: boolean
  internalLinks: LinkItem[]
  footerLinks: LinkItem[]
}

// Trust metrics bar component
const TrustBar = ({ startupCount, isOrg }: { startupCount: number; isOrg: boolean }) => (
  <div className="bg-gradient-to-r from-gray-50 to-white border-y border-gray-100 py-3">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600">Manual verification</span>
          <CheckCircle className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-gray-900">{startupCount.toLocaleString()}+</span>
          <span className="text-gray-600">verified startups</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600">Global registry</span>
          {isOrg && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">UFRN</span>}
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600">Trusted by researchers</span>
        </div>
      </div>
    </div>
  </div>
)

// Category chip component
const CategoryChip = ({ category }: { category: string }) => {
  const colors: Record<string, string> = {
    "Unicorn": "bg-purple-100 text-purple-700",
    "Fintech": "bg-blue-100 text-blue-700",
    "D2C": "bg-pink-100 text-pink-700",
    "SaaS": "bg-indigo-100 text-indigo-700",
    "Edtech": "bg-orange-100 text-orange-700",
    "Logistics": "bg-cyan-100 text-cyan-700",
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[category] || "bg-gray-100 text-gray-600"}`}>
      {category}
    </span>
  )
}

// Magazine-style featured story card
const FeaturedStory = ({ founder }: { founder: Founder }) => (
  <motion.article 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl mb-12"
  >
    <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500 rounded-full -translate-x-16 -translate-y-16 opacity-20" />
    <div className="relative z-10 grid md:grid-cols-2 gap-8 p-6 md:p-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Featured Story</span>
          <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-400 text-sm">The Founder Chronicle</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {founder.name}
        </h2>
        <p className="text-xl text-emerald-400 font-medium">
          {founder.role} at {founder.company}
        </p>
        <p className="text-gray-300 leading-relaxed">
          {founder.shortBio}
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          {founder.funding && (
            <div className="flex items-center gap-1 text-gray-300 text-sm">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>{founder.funding}</span>
            </div>
          )}
          {founder.valuation && (
            <div className="flex items-center gap-1 text-gray-300 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{founder.valuation}</span>
            </div>
          )}
        </div>
        <Link 
          href={`/startup/${founder.slug}`}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 group"
        >
          Read full story
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
        {founder.image && (
          <Image
            src={founder.image}
            alt={founder.name}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
      </div>
    </div>
  </motion.article>
)

// Magazine grid card (clean, editorial)
const MagazineCard = ({ founder, index }: { founder: Founder; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
  >
    <Link href={`/startup/${founder.slug}`} className="block">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {founder.image && (
          <Image
            src={founder.image}
            alt={founder.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 right-3 flex gap-1">
          {founder.category?.slice(0, 2).map((cat) => (
            <CategoryChip key={cat} category={cat} />
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors">
              {founder.name}
            </h3>
            <p className="text-sm text-gray-500">{founder.role}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{founder.shortBio}</p>
        <p className="text-sm font-medium text-emerald-600">{founder.company}</p>
      </div>
    </Link>
  </motion.article>
)

// Why Trust UpForge section (engagement hook)
const TrustSection = () => (
  <section className="bg-gray-50 rounded-2xl p-8 my-12">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Why trust UpForge?</h3>
      <p className="text-gray-600">The independent global standard for startup verification</p>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="text-center p-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
        </div>
        <h4 className="font-semibold mb-1">Manual verification</h4>
        <p className="text-sm text-gray-500">Every startup reviewed by real people, not bots</p>
      </div>
      <div className="text-center p-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Shield className="w-6 h-6 text-emerald-600" />
        </div>
        <h4 className="font-semibold mb-1">UFRN system</h4>
        <p className="text-sm text-gray-500">Unique permanent identifier for each startup</p>
      </div>
      <div className="text-center p-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Globe className="w-6 h-6 text-emerald-600" />
        </div>
        <h4 className="font-semibold mb-1">Open data</h4>
        <p className="text-sm text-gray-500">Free access for researchers & investors</p>
      </div>
    </div>
  </section>
)

// Sticky CTA for submission
const StickyCTA = () => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 1 }}
    className="fixed bottom-6 right-6 z-40"
  >
    <Link
      href="/submit"
      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-200 group"
    >
      <Zap className="w-4 h-4" />
      <span className="font-medium">List your startup</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </motion.div>
)

export function FounderChronicleClient({ 
  founders, 
  featuredFounder, 
  remainingFounders,
  startupCount,
  isOrg,
  internalLinks, 
  footerLinks 
}: FounderChronicleClientProps) {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Header with magazine styling */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                UpForge
              </Link>
              <p className="text-xs text-gray-400 mt-0.5">
                {isOrg ? "Global Startup Registry" : "The Founder Chronicle"}
              </p>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {internalLinks.slice(0, 3).map((link) => (
                <Link key={link.h} href={link.h} className="text-gray-600 hover:text-emerald-700 text-sm font-medium transition-colors">
                  {link.l}
                </Link>
              ))}
            </nav>
            <Link 
              href="/submit" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Submit startup
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trust bar - social proof */}
        <TrustBar startupCount={startupCount} isOrg={isOrg} />

        {/* Magazine hero / featured story */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">The Founder Chronicle 2026</span>
          </div>
          <FeaturedStory founder={featuredFounder} />
        </div>

        {/* Magazine grid: "More from the Chronicle" */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">More from the Chronicle</h2>
              <p className="text-gray-500 text-sm mt-1">Verified founder stories from India's startup ecosystem</p>
            </div>
            <Link href="/startup" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingFounders.map((founder, idx) => (
              <MagazineCard key={founder.slug} founder={founder} index={idx} />
            ))}
          </div>
        </section>

        {/* Trust section - engagement hook */}
        <TrustSection />

        {/* Category quick links - helps SEO and user discovery */}
        <section className="my-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore by category</h3>
          <div className="flex flex-wrap gap-3">
            {["Fintech", "Unicorn", "D2C", "SaaS", "Edtech", "Logistics", "AI", "Healthtech"].map((cat) => (
              <Link
                key={cat}
                href={`/startups/${cat.toLowerCase()}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-3">UpForge</h4>
              <p className="text-gray-400 text-sm">
                {isOrg 
                  ? "The independent global registry for verified startups."
                  : "India's trusted startup registry and founder chronicle."}
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Explore</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                {footerLinks.map((link) => (
                  <li key={link.h}>
                    <Link href={link.h} className="hover:text-emerald-400 transition-colors">
                      {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Resources</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/ufrn" className="hover:text-emerald-400">UFRN Lookup</Link></li>
                <li><Link href="/api" className="hover:text-emerald-400">API Access</Link></li>
                <li><Link href="/press" className="hover:text-emerald-400">Press Kit</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Verified by</h5>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-gray-300">Manual review board</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                © 2026 UpForge. Open data under CC BY 4.0
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <StickyCTA />
    </div>
  )
}
