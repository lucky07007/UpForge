// app/startup/nykaa/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Falguni Nayar — Nykaa Founder | India's First Woman-Led IPO | UpForge",
  description: "Falguni Nayar left Kotak Mahindra at 50 to build Nykaa — India's first profitable unicorn and first woman-founded IPO. Full founder story, valuation, and IPO journey on UpForge.",
  keywords: ['Falguni Nayar', 'Nykaa founder', 'Nykaa IPO', 'India first woman led IPO', 'Nykaa valuation', 'D2C beauty India', 'bootstrapped to IPO', 'UpForge startup profile'],
  alternates: { canonical: "https://upforge.in/startup/nykaa" },
  openGraph: {
    title: "Nykaa — Falguni Nayar | UpForge",
    description: "Falguni Nayar left Kotak Mahindra at 50 to build Nykaa — India's first profitable unicorn and first woman-founded IPO. Full founder story, valuation, and IPO journey on UpForge.",
    url: "https://upforge.in/startup/nykaa",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og/nykaa.png", width: 1200, height: 630 }],
    locale: "en_IN", type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nykaa — Falguni Nayar | UpForge",
    description: "Falguni Nayar left Kotak Mahindra at 50 to build Nykaa — India's first profitable unicorn and first woman-founded IPO. Full founder story, valuation, and IPO journey on UpForge.",
    images: ["https://upforge.in/og/nykaa.png"],
  },
}

export default function NykaaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
