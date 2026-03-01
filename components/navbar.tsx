"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Pathname check karne ke liye
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // Current URL lane ke liye

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Registry", href: "/startup" },
    { name: "Reports", href: "/reports" },
    { name: "Valuation", href: "/valuation" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-background border-b border-border"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Brand with Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-sm">
            <Image
              src="/logo.jpg" // Aapka logo path
              alt="UpForge Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-serif text-xl tracking-tight group-hover:text-gray-600 transition-colors">
            UpForge
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((link) => {
            const isActive = pathname === link.href; // Active page logic
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors py-2 border-b-2 ${
                  isActive 
                    ? "text-foreground border-foreground font-medium" // Active state underline
                    : "text-muted-foreground border-transparent hover:border-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="/submit"
            className="px-5 py-2 border border-foreground text-sm hover:bg-foreground hover:text-white transition-colors ml-4"
          >
            Submit Startup
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-6 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-2 ${pathname === link.href ? "text-foreground font-bold" : "text-muted-foreground"}`}
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
