// app/startup/boat/layout.tsx
// SERVER COMPONENT — metadata lives here, NOT in page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aman Gupta & Sameer Mehta — boAt Founders | India's No.1 Audio Brand | UpForge",
  description:
    "boAt was co-founded in 2016 by Aman Gupta and Sameer Mehta to make India's youth plug into Nirvana. From a Delhi garage to a $1.3B unicorn — read the full founder story, funding journey and IPO plans on UpForge.",
  keywords: [
    "boAt founder", "Aman Gupta", "Sameer Mehta", "boAt lifestyle",
    "India audio brand", "boAt valuation", "boAt IPO 2025", "boAt funding",
    "Indian consumer electronics startup", "boAt unicorn India",
    "Shark Tank India judge", "earphones India startup",
    "wearables India unicorn", "UpForge startup profile"
  ],
  alternates: { canonical: "https://upforge.in/startup/boat" },
  openGraph: {
    title: "boAt — Aman Gupta & Sameer Mehta | India's Audio Unicorn | UpForge",
    description: "From a Delhi café to India's No.1 earwear brand and world's 5th-largest wearable company. boAt founder story, funding, IPO & insights on UpForge.",
    url: "https://upforge.in/startup/boat",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og/boat.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "boAt — Aman Gupta's Mission to Make India Plug Into Nirvana | UpForge",
    description: "India's No.1 earwear brand. $171M raised, $1.3B valuation, IPO-bound. Full founder story on UpForge.",
    images: ["https://upforge.in/og/boat.png"],
  },
}

export default function BoatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
