// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://upforge.in"),
  title: {
    default: "UpForge — Public Registry of Emerging Indian Startups",
    template: "%s | UpForge Registry",
  },
  description:
    "UpForge is India's structured public registry documenting emerging startups, founders, and early-stage ventures. Built for students, researchers, and the broader startup ecosystem.",
  keywords: [
    "Indian startups",
    "startup registry",
    "emerging startups India",
    "startup database",
    "public startup information",
  ],
  openGraph: {
    title: "UpForge — Public Startup Registry of India",
    description:
      "A structured, publicly accessible database of emerging Indian startups and founders.",
    url: "https://upforge.in",
    siteName: "UpForge",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-neutral-50 text-[#111111] flex flex-col min-h-screen antialiased selection:bg-black selection:text-white">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow w-full">
          <div className="pt-16 md:pt-20">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
