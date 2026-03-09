// app/startup/zepto/layout.tsx
// SERVER COMPONENT — metadata lives here, NOT in page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aadit Palicha & Kaivalya Vohra — Zepto Founders | India's $5.9B Quick Commerce Unicorn | UpForge",
  description:
    "Zepto co-founders Aadit Palicha and Kaivalya Vohra dropped out of Stanford at 19 to build India's fastest unicorn. Zepto delivers groceries in under 10 minutes across 350+ dark stores. Full founder story, funding, and valuation on UpForge.",
  keywords: [
    "Zepto founder", "Aadit Palicha", "Kaivalya Vohra", "Zepto unicorn",
    "quick commerce India", "10 minute delivery India", "Zepto funding $5.9 billion",
    "India quick commerce", "Zepto dark stores", "Stanford dropout founders India",
    "fastest unicorn India", "UpForge startup profile"
  ],
  alternates: { canonical: "https://upforge.in/startup/zepto" },
  openGraph: {
    title: "Zepto — Aadit Palicha & Kaivalya Vohra | India's $5.9B Quick Commerce Giant | UpForge",
    description: "Two Stanford dropouts built India's fastest unicorn by failing first, then solving the logistics math nobody else wanted to. Zepto founder story on UpForge.",
    url: "https://upforge.in/startup/zepto",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og/zepto.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zepto — Two Stanford Dropouts Built a $5.9B Quick Commerce Giant | UpForge",
    description: "They failed first with KiranaKart. Then Zepto became India's fastest unicorn. Full story on UpForge.",
    images: ["https://upforge.in/og/zepto.png"],
  },
}

export default function ZeptoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
