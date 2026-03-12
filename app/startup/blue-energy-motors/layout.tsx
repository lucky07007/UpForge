// app/startup/blue-energy-motors/layout.tsx
// SERVER COMPONENT — metadata lives here, NOT in page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Anirudh Batra — Blue Energy Motors Founder | India's LNG Truck Pioneer | UpForge",
  description:
    "Blue Energy Motors was founded by Anirudh Batra to decarbonise India's long-haul trucking with LNG-powered heavy commercial vehicles. Backed by SAIC and leading Indian VCs — read the full founder story on UpForge.",
  keywords: [
    "Blue Energy Motors founder", "Anirudh Batra", "Blue Energy Motors India",
    "LNG trucks India", "green logistics India startup",
    "Blue Energy Motors funding", "CNG LNG heavy trucks India",
    "decarbonise trucking India", "sustainable logistics India",
    "SAIC India startup", "climate tech India startup",
    "clean energy trucks India", "EV commercial vehicles India",
    "UpForge startup profile"
  ],
  alternates: { canonical: "https://upforge.in/startup/blue-energy-motors" },
  openGraph: {
    title: "Blue Energy Motors — Anirudh Batra | India's LNG Truck Pioneer | UpForge",
    description: "Building India's green highway — LNG-powered trucks that cut emissions without compromising performance. Blue Energy Motors founder story & insights on UpForge.",
    url: "https://upforge.in/startup/blue-energy-motors",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og/blue-energy-motors.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Energy Motors — Decarbonising India's Roads One LNG Truck at a Time | UpForge",
    description: "India's first LNG-powered heavy truck startup. SAIC-backed. Solving the hardest part of India's climate puzzle — long-haul freight. On UpForge.",
    images: ["https://upforge.in/og/blue-energy-motors.png"],
  },
}

export default function BlueEnergyMotorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
