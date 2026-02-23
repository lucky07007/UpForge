import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Chatbot } from "@/components/chatbot";

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

export const metadata: Metadata = {
  title: "UpForge – Founder Registry",
  description: "India's definitive ecosystem for independent builders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body className="bg-white text-black antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        {/* Footer removed from global layout to prevent doubling */}
        <Chatbot />
      </body>
    </html>
  );
}
