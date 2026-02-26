// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap' 
});

export const metadata: Metadata = {
  title: "UpForge — Open Founder Discovery Platform",
  description: "An open platform documenting early-stage startups and the founders building them in India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-white text-[#1A1A1A] flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
