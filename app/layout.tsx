// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Chatbot } from "@/components/chatbot";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap' 
});

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"], 
  variable: "--font-display",
  display: 'swap'
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://upforge.in"),
  title: {
    default: "UpForge – India's Founder Registry",
    template: "%s | UpForge",
  },
  description: "A premium directory for verified Indian startups.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://upforge.in",
    siteName: "UpForge",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${bricolage.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="flex min-h-screen flex-col relative bg-[#fafafa]">
            {/* Extremely subtle grain overlay for premium texture */}
            <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <Navbar />
            <main className="flex-1">{children}</main>
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
