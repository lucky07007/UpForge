"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Startups", href: "/startup" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo & Name */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.jpg" alt="Logo" width={32} height={32} className="rounded-sm" />
          <span className="font-serif text-xl font-bold text-[#1A1A1A]">UpForge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-gray-600 hover:text-[#0645AD]">
              {link.name}
            </Link>
          ))}
          <Button asChild variant="outline" className="h-9 px-5">
            <Link href="/apply">Submit Startup</Link>
          </Button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 p-6 flex flex-col gap-4 shadow-xl">
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-gray-50 pb-2">
              {link.name}
            </Link>
          ))}
          <Button asChild variant="outline" className="w-full h-12">
            <Link href="/apply">Submit Startup</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
