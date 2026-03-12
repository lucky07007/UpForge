// app/startup/ather-energy-ev/layout.tsx
// SERVER COMPONENT — metadata lives here, NOT in page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tarun Mehta & Swapnil Jain — Ather Energy Founders | India's Smart EV Pioneer | UpForge",
  description:
    "Ather Energy was co-founded in 2013 by Tarun Mehta and Swapnil Jain at IIT Madras to build India's most intelligent electric scooter. From a college dorm to India's IPO of the year — read the full founder story on UpForge.",
  keywords: [
    "Ather Energy founder", "Tarun Mehta", "Swapnil Jain",
    "Ather Energy IPO 2024", "Ather 450X", "Ather Energy valuation",
    "electric scooter India", "EV startup India",
    "IIT Madras startup", "Hero MotoCorp investment Ather",
    "India EV unicorn", "smart electric scooter India",
    "Ather Grid charging network", "UpForge startup profile"
  ],
  alternates: { canonical: "https://upforge.in/startup/ather-energy-ev" },
  openGraph: {
    title: "Ather Energy — Tarun Mehta & Swapnil Jain | India's Smart EV Pioneer | UpForge",
    description: "From IIT Madras to India's most-loved electric scooter brand and a landmark IPO. Ather Energy founder story, funding, 450X & the road ahead on UpForge.",
    url: "https://upforge.in/startup/ather-energy-ev",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og/ather-energy-ev.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ather Energy — Tarun Mehta's Mission to Build India's Smartest EV | UpForge",
    description: "India's most intelligent electric scooter. IIT Madras founded. Hero MotoCorp backed. Listed on NSE/BSE. Full founder story on UpForge.",
    images: ["https://upforge.in/og/ather-energy-ev.png"],
  },
}

export default function AtherEnergyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
