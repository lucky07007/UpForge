// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FCFCFC",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://upforge.in"),
  title: {
    default: "UpForge — Free Verified Startup Registry & Growth Reports",
    template: "%s | UpForge",
  },
  description:
    "Get your startup verified for free. Reach millions, receive AI‑powered analysis reports, and estimate your valuation. India’s independent startup registry.",
  keywords: [
    "startup registry",
    "India startups",
    "verified listing",
    "startup valuation",
    "competitor analysis",
    "growth report",
    "free startup directory",
  ],
  authors: [{ name: "UpForge" }],
  openGraph: {
    title: "UpForge — Free Verified Startup Registry",
    description:
      "List your startup for free, get verified, and receive detailed growth reports with competitor insights and valuation estimates.",
    url: "https://upforge.in",
    siteName: "UpForge",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "UpForge — Free Verified Startup Registry",
    description:
      "List your startup for free, get verified, and receive detailed growth reports with competitor insights and valuation estimates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://upforge.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground flex flex-col min-h-screen antialiased font-sans">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

        {/* Floating Assistant */}
        <Chatbot />

      </body>
    </html>
  );
}
