"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Registry", href: "/startup" },
    { name: "Sponsor", href: "/sponsor" },
    { name: "Verification", href: "/docs" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0c0e]/80 backdrop-blur-xl py-3 shadow-2xl shadow-black/50 border-b border-white/10"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-2 backdrop-blur-sm group-hover:border-[#c6a43f]/50 transition-all duration-300">
            <Image
              src="/logo.jpg"
              alt="UpForge"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-[#c6a43f] transition-colors">
            UpForge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#c6a43f]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c6a43f] to-[#1e3a5f] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/apply">
            <Button className="group relative rounded-full px-6 h-10 bg-gradient-to-r from-[#c6a43f] to-[#b08c2e] text-black hover:from-[#b08c2e] hover:to-[#9e7a29] text-xs font-bold uppercase tracking-wider border-0 overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Apply for Registry
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-white hover:text-[#c6a43f] transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0c0e] animate-in fade-in slide-in-from-right duration-500">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <span className="text-xs font-medium tracking-widest text-gray-400">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white hover:text-[#c6a43f] transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-[70vh] space-y-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-display font-light text-white hover:text-[#c6a43f] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
