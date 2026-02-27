// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Body sans font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Serif font for headings (Linux Libertine / Georgia fallback)
const linuxLibertine = localFont({
  src: [
    {
      path: "../public/fonts/LinLibertine_R.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LinLibertine_RB.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/LinLibertine_RI.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/LinLibertine_RBI.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  title: "UpForge — Public Startup Registry of India",
  description:
    "A structured, publicly accessible database documenting emerging Indian startups, founders, and early-stage ventures for students, researchers, and the startup ecosystem.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${linuxLibertine.variable}`}>
      <body className="bg-white text-[#111111] flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
