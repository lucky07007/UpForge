// components/footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded border border-primary/10 bg-white p-1.5">
                <Image src="/logo.jpg" alt="UpForge" fill className="object-contain" />
              </div>
              <span className="text-lg font-display font-semibold text-primary">UpForge</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              India's independent founder registry. Verified, curated, permanent.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Directory</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/startup" className="text-primary hover:underline">Browse Startups</Link></li>
              <li><Link href="/sponsor" className="text-primary hover:underline">Sponsorship</Link></li>
              <li><Link href="/docs" className="text-primary hover:underline">Verification</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-primary hover:underline">About</Link></li>
              <li><Link href="/privacy" className="text-primary hover:underline">Privacy</Link></li>
              <li><Link href="/terms" className="text-primary hover:underline">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© {year} UpForge. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary">X</a>
            <a href="#" className="hover:text-primary">LinkedIn</a>
            <a href="#" className="hover:text-primary">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
