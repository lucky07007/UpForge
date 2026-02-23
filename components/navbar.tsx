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

  // Detect scroll
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Startups", href: "/startup" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5"
            : "bg-white/80 backdrop-blur-md border-b border-black/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative transition-colors duration-200 ${
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

          {/* Desktop Actions */}
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

          {/* ✅ FIXED MOBILE HAMBURGER */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="
              md:hidden
              flex items-center justify-center
              h-11 w-11   /* Proper 44px touch target */
              rounded-lg
              transition-all duration-200
              hover:bg-black/5
              active:scale-95
            "
          >
            <Menu className="h-6 w-6 text-black" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* ✅ MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full bg-black text-white transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top Bar */}
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
              <span className="text-lg font-bold">UpForge</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center h-11 w-11 rounded-lg hover:bg-white/10 active:scale-95 transition"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col px-6 pt-12 space-y-8">
            {links.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold hover:text-[#c6a43f] transition-all duration-300"
                style={{
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom Buttons */}
          <div className="absolute bottom-8 left-6 right-6 space-y-4">
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
      </div>
    </>
  );
}
