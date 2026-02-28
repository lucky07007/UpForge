// app/layout.tsx
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://upforge.in"),
  title: {
    default: "UpForge — Public Registry of Emerging Indian Startups",
    template: "%s | UpForge",
  },
  description:
    "UpForge is India’s structured public registry documenting emerging startups, founders, and early-stage ventures.",
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
      <body className="bg-background text-foreground flex flex-col min-h-screen antialiased">

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
