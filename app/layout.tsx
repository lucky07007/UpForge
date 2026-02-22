import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Chatbot } from "@/components/chatbot";
import "./globals.css";

// Fonts: Sans for data/numbers, Display for the 'Legacy' feel
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"], 
  variable: "--font-display" 
});

// NEW: Separate Viewport Export (Required for modern Next.js)
export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Accessibility: Allow zooming on a directory
};

export const metadata: Metadata = {
  metadataBase: new URL("https://upforge.in"), // Crucial for absolute OG image paths
  title: {
    default: "UpForge | India's Independent Founder Registry",
    template: "%s | UpForge Legacy"
  },
  description: "The definitive high-trust database for Indian founders. Discover verified startups, access elite networking, and secure your place in India's startup history.",
  keywords: [
    "Startup Directory India", 
    "Sponsor Startup", 
    "Verified Founders India", 
    "Premium Startup Network", 
    "UpForge Registry",
    "Angel Investors India"
  ],
  authors: [{ name: "UpForge Team" }],
  creator: "UpForge",
  publisher: "UpForge Intelligence",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://upforge.in",
    siteName: "UpForge Registry",
    title: "UpForge | The Legacy Founder Network",
    description: "Where India's most ambitious builders are cataloged.",
    images: [
      { 
        url: "/og-main.jpg", 
        width: 1200, 
        height: 630, 
        alt: "UpForge: Forge Your Legacy" 
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    creator: "@upforge_in",
    title: "UpForge | India's Founder Registry",
    description: "The premium ledger for verified Indian startups.",
    images: ["/og-main.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body 
        className={`
          ${inter.variable} 
          ${bricolage.variable} 
          antialiased 
          font-sans 
          bg-[#fcfcfb] 
          text-[#1a1a1a] 
          selection:bg-[#1e3a5f]/10 
          selection:text-[#1e3a5f]
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="flex min-h-screen flex-col relative">
            
            {/* PREMIUM UI LAYER: 
                This creates a subtle architectural feel across every page.
            */}
            <div className="fixed inset-0 z-[-1] pointer-events-none">
              {/* Soft Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e3a5f08,transparent_50%)]" />
              {/* Subtle Grid - using CSS instead of an image for better performance */}
              <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* Navigation */}
            <Navbar />

            {/* Main Content with Page Transition Animation */}
            <main className="flex-1 animate-in fade-in duration-700 ease-out">
              {children}
            </main>

            {/* Global Components */}
            <Footer />
            <Chatbot /> 
            <Toaster />
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
