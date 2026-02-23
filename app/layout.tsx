// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Chatbot } from "@/components/chatbot";
import { GlobalHero } from "@/components/global-hero"; // Import the new component

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
        
        {/* Added wrapper to handle fixed Navbar offset and the Hero */}
        <div className="pt-16"> 
          <GlobalHero />
        </div>

        <main className="flex-grow">
          {children}
        </main>
        
        <Chatbot />
      </body>
    </html>
  );
}
