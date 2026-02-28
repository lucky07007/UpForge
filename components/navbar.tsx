"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Registry", href: "/startups" },
    { name: "Industries", href: "/industries" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="UpForge"
            width={28}
            height={28}
            className="rounded-sm"
          />
          <span className="font-serif text-[20px] tracking-tight">
            UpForge
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/submit"
            className="px-5 py-2 border border-foreground text-sm hover:bg-foreground hover:text-white transition-colors"
          >
            Submit Startup
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col gap-6 text-base">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/submit"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-foreground text-center"
            >
              Submit Startup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
