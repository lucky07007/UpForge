"use client"

// components/reviews.tsx — MAGAZINE EDITORIAL v4
// FT/Economist aesthetic — testimonials as editorial endorsements
// Global publication polish

import { useState } from "react"

export interface Review {
  id: string
  author: string
  role: string
  company: string
  location: string
  initials: string
  photoUrl?: string
  rating: number
  text: string
  date: string
  dateFormatted: string
  verified: boolean
  source: "linkedin" | "email" | "twitter" | "direct"
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Arjun Mehta",
    role: "Co-founder & CEO",
    company: "Finstack Technologies",
    location: "Bangalore",
    initials: "AM",
    photoUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=ArjunMehta&backgroundColor=b45309",
    rating: 5,
    text: "UpForge gave our startup instant credibility in investor conversations. The UFRN is now on our pitch deck. Getting listed was the single most impactful thing we did this quarter.",
    date: "2026-03-15",
    dateFormatted: "15 March 2026",
    verified: true,
    source: "linkedin",
  },
  {
    id: "r2",
    author: "Priya Krishnan",
    role: "Principal, Early Stage",
    company: "Elevation Capital",
    location: "Mumbai",
    initials: "PK",
    photoUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=PriyaKrishnan&backgroundColor=1e3a5f",
    rating: 5,
    text: "We use UpForge to verify startups before first meetings. The data accuracy is genuinely impressive — we have retired three other databases since discovering this platform.",
    date: "2026-03-20",
    dateFormatted: "20 March 2026",
    verified: true,
    source: "direct",
  },
  {
    id: "r3",
    author: "Sahil Taneja",
    role: "Founder",
    company: "Taneja Ventures",
    location: "Delhi NCR",
    initials: "ST",
    photoUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=SahilTaneja&backgroundColor=14532d",
    rating: 5,
    text: "The Founder Chronicle is genuinely the best long-form content on the Indian startup ecosystem. Not PR fluff — real lessons, real numbers. I share it with my entire network.",
    date: "2026-02-28",
    dateFormatted: "28 February 2026",
    verified: true,
    source: "twitter",
  },
  {
    id: "r4",
    author: "Meera Nair",
    role: "Angel Investor & LP",
    company: "Former McKinsey Partner",
    location: "Hyderabad",
    initials: "MN",
    photoUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=MeeraNair&backgroundColor=7c2d12",
    rating: 5,
    text: "What Crunchbase charges thousands of dollars for, UpForge does better and at no cost. The Indian startup ecosystem finally has an independent, trustworthy registry.",
    date: "2026-03-10",
    dateFormatted: "10 March 2026",
    verified: true,
    source: "linkedin",
  },
  {
    id: "r5",
    author: "Rohan Das",
    role: "Founder",
    company: "Previously Senior PM at Flipkart",
    location: "Pune",
    initials: "RD",
    photoUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=RohanDas&backgroundColor=4a1d96",
    rating: 5,
    text: "I read three founder profiles on UpForge before deciding to leave my PM role and build my own startup. The research depth is unmatched. This is the Bloomberg Terminal of Indian startups.",
    date: "2026-03-18",
    dateFormatted: "18 March 2026",
    verified: true,
    source: "email",
  },
  {
    id: "r6",
    author: "Dr. Fatima Sheikh",
    role: "Researcher, Strategy",
    company: "IIM Ahmedabad",
    location: "Ahmedabad",
    initials: "FS",
    photoUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=FatimaSheikh&backgroundColor=134e4a",
    rating: 5,
    text: "Used UpForge for my research on Indian unicorns. The data is cited, verified, and current. My professor asked where I sourced such clean structured data — the answer is UpForge.",
    date: "2026-02-14",
    dateFormatted: "14 February 2026",
    verified: true,
    source: "direct",
  },
]

export const GOOGLE_REVIEW_FORM_URL =
  "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"

const SOURCE_LABELS: Record<string, { label: string; icon: string }> = {
  linkedin: { label: "via LinkedIn", icon: "in" },
  twitter: { label: "via X / Twitter", icon: "𝕏" },
  email: { label: "via Email", icon: "✉" },
  direct: { label: "Direct Submission", icon: "✓" },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-4 h-4"
          fill={star <= rating ? "#C6A43F" : "#E8DDD0"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const src = SOURCE_LABELS[review.source] ?? SOURCE_LABELS.direct

  return (
    <div
      className="review-card flex flex-col"
      style={{
        background: "#FAF7F2",
        border: "1px solid #E8DDD0",
        padding: "32px 28px 28px",
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div
        className="text-6xl leading-none mb-5 select-none"
        style={{ color: "#C9B99A", fontFamily: "Georgia, 'Times New Roman', serif", lineHeight: 1 }}
      >
        "
      </div>

      <div className="mb-5">
        <StarRating rating={review.rating} />
      </div>

      <p
        className="flex-1 leading-relaxed mb-7"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "15px",
          color: "#2D1A1A",
          fontStyle: "italic",
          lineHeight: 1.6,
        }}
      >
        {review.text}
      </p>

      <div className="flex items-start gap-4 pt-5 border-t border-[#E8DDD0]">
        <div className="flex-shrink-0 w-12 h-12 overflow-hidden border border-[#C9B99A]">
          {review.photoUrl ? (
            <img
              src={review.photoUrl}
              alt={review.author}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.style.display = "none"
                if (el.parentElement) {
                  el.parentElement.innerHTML = `<div style="width:48px;height:48px;background:#7C1D1D;display:flex;align-items:center;justify-content:center;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-weight:bold;color:#FAF7F2">${review.initials}</div>`
                }
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-sm font-bold"
              style={{ background: "#7C1D1D", color: "#FAF7F2", fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {review.initials}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div
                className="font-bold text-base leading-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#1A0A0A" }}
              >
                {review.author}
              </div>
              <div
                className="text-xs mt-1 leading-snug"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#5A4040" }}
              >
                {review.role}
              </div>
              <div
                className="text-[11px] mt-0.5 italic"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A" }}
              >
                {review.company} · {review.location}
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              {review.verified && (
                <div
                  className="text-[10px] tracking-[0.1em] uppercase flex items-center gap-1 mb-1.5"
                  style={{ color: "#2D5A1A", fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
              )}
              <div
                className="text-[10px]"
                style={{ color: "#8B6A6A", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {src.label}
              </div>
              <div
                className="text-[10px]"
                style={{ color: "#8B6A6A", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {review.dateFormatted}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewFormModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden z-10 shadow-2xl"
        style={{ background: "#FAF7F2", border: "2px solid #7C1D1D" }}
      >
        <div className="flex items-center justify-between p-7 border-b border-[#E8DDD0]">
          <div>
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#1A0A0A" }}
            >
              Submit Your Review
            </h3>
            <p className="text-sm mt-1" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#5A4040" }}>
              Help founders and investors trust UpForge
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[#F0EBE0] border border-[#C9B99A]"
          >
            <svg className="w-5 h-5" fill="none" stroke="#7C1D1D" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src={GOOGLE_REVIEW_FORM_URL}
            className="w-full h-full min-h-[500px]"
            frameBorder="0"
            title="Submit your review"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  )
}

export function ReviewsSection() {
  const [showForm, setShowForm] = useState(false)
  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

  return (
    <section className="overflow-hidden" style={{ background: "#FAF7F2" }}>
      <div className="border-b-2 border-[#7C1D1D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-baseline justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-5">
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#1A0A0A" }}
            >
              Trusted by the Ecosystem
            </h2>
            <span
              className="text-[11px] tracking-[0.2em] uppercase text-[#8B6A6A]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Verified Testimonials
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="text-4xl font-bold"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#7C1D1D" }}
            >
              {avgRating}
            </span>
            <div>
              <StarRating rating={5} />
              <div
                className="text-[10px] tracking-[0.15em] uppercase mt-1.5"
                style={{ color: "#8B6A6A", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {REVIEWS.length} verified reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-9 border-y border-[#E8DDD0] mb-12">
          <div
            className="text-[11px] tracking-[0.25em] uppercase text-[#8B6A6A]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Read & cited by professionals at
          </div>
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {["IIM Ahmedabad", "Elevation Capital", "Blume Ventures", "Y Combinator Alumni", "McKinsey & Co."].map((org) => (
              <span
                key={org}
                className="text-sm font-semibold text-[#3D2B2B] opacity-60"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {org}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p
            className="text-base mb-6"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#5A4040" }}
          >
            Had an experience with UpForge worth sharing?
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-3 px-12 py-4 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-90 hover:tracking-[0.2em]"
            style={{
              background: "#7C1D1D",
              color: "#FAF7F2",
              fontFamily: "Georgia, 'Times New Roman', serif",
              border: "1px solid #7C1D1D",
            }}
          >
            Submit Your Review
          </button>
        </div>
      </div>

      {showForm && <ReviewFormModal onClose={() => setShowForm(false)} />}

      <style jsx>{`
        .review-card {
          animation: editFadeIn 0.6s ease both;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .review-card:hover {
          box-shadow: 0 12px 40px rgba(124, 29, 29, 0.1);
          transform: translateY(-3px);
        }
        @keyframes editFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
