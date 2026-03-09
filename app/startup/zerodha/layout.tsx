// app/startup/zerodha/layout.tsx
// SERVER COMPONENT — metadata lives here, NOT in page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nithin Kamath — Zerodha Founder | India's $8.2B Bootstrapped Fintech | UpForge",
  description:
    "Nithin Kamath built Zerodha into India's largest stockbroker without raising a single rupee of VC funding. Zerodha serves 1.5 crore active investors at ₹20 flat brokerage. Full founder story, valuation, and bootstrapped strategy on UpForge.",
  keywords: [
    "Nithin Kamath", "Zerodha founder", "Zerodha valuation",
    "Zerodha bootstrapped", "India largest stockbroker",
    "Zerodha Kite trading platform", "Nithin Kamath net worth",
    "Varsity Zerodha", "Rainmatter fintech", "bootstrapped unicorn India",
    "Zerodha ₹20 brokerage", "fintech India 2025", "UpForge startup profile"
  ],
  alternates: { canonical: "https://upforge.in/startup/zerodha" },
  openGraph: {
    title: "Zerodha — Nithin Kamath | India's $8.2B Bootstrapped Fintech Unicorn | UpForge",
    description: "He dropped out at 17 to trade stocks. Never took a rupee of VC. Zerodha is India's largest stockbroker — worth $8.2 billion. Nithin Kamath's full story on UpForge.",
    url: "https://upforge.in/startup/zerodha",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og/zerodha.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zerodha — Built to $8.2B Without VC | Nithin Kamath | UpForge",
    description: "The definitive antidote to the idea that fundraising equals success. Fifteen years of being genuinely useful — full profile on UpForge.",
    images: ["https://upforge.in/og/zerodha.png"],
  },
}

export default function ZerodhaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
