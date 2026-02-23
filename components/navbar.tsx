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
    { name: "Startups", href: "/startup" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5"
          : "bg-white/80 backdrop-blur-md border-b border-black/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo + Text */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 w-10 overflow-hidden transition-transform duration-500 group-hover:scale-110">
            <Image
              src="/logo.jpg"
              alt="UpForge Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold text-black">UpForge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-[#1e3a5f]"
                    : "text-black hover:text-[#1e3a5f]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-black hover:text-[#1e3a5f] transition-colors"
          >
            Log in
          </Link>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-[#1e3a5f] hover:bg-[#14304a] px-5 text-white"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-black hover:text-[#1e3a5f] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col overflow-y-auto">
          {/* Top section with logo + close */}
          <div className="flex justify-between items-center p-6 border-b border-white/20">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.jpg"
                  alt="UpForge Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">UpForge</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white hover:text-[#c6a43f] transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu links */}
          <div className="flex flex-col px-6 pt-10 space-y-6">
            {links.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold text-white hover:text-[#c6a43f] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom actions */}
          <div className="mt-auto p-6 space-y-3">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button
                variant="outline"
                className="w-full rounded-full h-14 border-white/20 text-white hover:bg-white/5"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full h-14 bg-[#c6a43f] hover:bg-[#b08c2e] text-black">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
