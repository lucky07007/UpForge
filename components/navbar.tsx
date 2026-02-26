// components/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Startups", href: "/startup" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold text-black">
          UpForge
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium ${
                pathname === link.href ? "text-black font-bold" : "text-gray-600 hover:text-link"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action */}
        <Button
          asChild
          variant="outline"
          className="border-link text-link hover:bg-link/5 rounded-[6px] px-5 h-9 text-sm font-medium transition-all"
        >
          <Link href="/apply">Submit Startup</Link>
        </Button>
      </div>
    </header>
  );
}
