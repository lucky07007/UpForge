"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Startups", href: "/startup" },
    { name: "Sponsors", href: "/sponsor" },
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
            <span className="text-xl font-bold text-black tracking-tight">UpForge</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative pb-1 transition-all duration-300 uppercase tracking-widest text-[10px] font-black ${
                    isActive
                      ? "text-black"
                      : "text-slate-400 hover:text-black"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#c6a43f] rounded-full shadow-[0_0_8px_rgba(198,164,63,0.6)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action */}
          <div className="hidden md:flex items-center">
            <Button
              asChild
              size="sm"
              className="rounded-full bg-black hover:bg-slate-800 px-6 text-white text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg gap-2"
            >
              <Link href="/apply">
                Join the Forge
                <Zap className="h-3 w-3 fill-[#c6a43f] text-[#c6a43f]" />
              </Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center justify-center h-11 w-11 rounded-lg hover:bg-black/5 active:scale-95 transition"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-black" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full bg-black text-white transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.jpg"
                  alt="UpForge Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight">UpForge</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center h-11 w-11 rounded-lg hover:bg-white/10 active:scale-95 transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col px-6 pt-12 space-y-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`relative text-4xl font-black transition-all duration-300 uppercase tracking-tighter ${
                    isActive
                      ? "text-[#c6a43f]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 -bottom-2 w-20 h-[4px] bg-[#c6a43f] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Action */}
          <div className="absolute bottom-10 left-6 right-6">
            <Link href="/apply" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-2xl h-16 bg-[#c6a43f] hover:bg-[#b08c2e] text-black text-xs font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-2">
                Join the Forge
                <Zap className="h-4 w-4 fill-black" />
              </Button>
            </Link>
            <p className="text-center text-white/20 text-[9px] font-bold uppercase tracking-[0.4em] mt-6">
              Institutional Grade Registry · 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
