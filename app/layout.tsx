import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Chatbot } from "@/components/chatbot"; // New AI Integration
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: {
    default: "UpForge | India's Verified Startup & Founder Registry",
    template: "%s | UpForge India"
  },
  description: "The definitive high-trust database for Indian founders. Discover verified startups, access elite networking, and scale your reputation.",
  keywords: ["Startup Directory India", "Sponsor Startup", "Verified Founders", "VC Database India", "UpForge Registry"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://upforge.in",
    siteName: "UpForge Intelligence",
    images: [{ url: "/og-main.jpg", width: 1200, height: 630, alt: "UpForge Elite Registry" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${bricolage.variable} antialiased font-sans bg-background text-foreground bg-grid-pattern`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col relative">
            {/* Premium Subtle Grid Overlay */}
            <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none bg-[url('/grid.svg')] bg-repeat" />
            
            <Navbar />
            <main className="flex-1 animate-page-in">{children}</main>
            <Footer />
            <Chatbot /> 
          </div>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
