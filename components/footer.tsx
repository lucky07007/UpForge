"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0c0e] border-t border-white/10 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c6a43f]/5 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-xl border border-white/20 bg-white/5 p-2 backdrop-blur-sm">
                <Image
                  src="/logo.jpg"
                  alt="UpForge"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-display font-bold text-white">
                UpForge
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              India's independent founder registry. Verified, curated, permanent.
            </p>
          </div>

          {/* Directory Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c6a43f] mb-4">
              Directory
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/startup"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Browse Startups
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsor"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Sponsorship
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Verification
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c6a43f] mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  About
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Privacy
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Terms
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {year} UpForge. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a
              href="#"
              className="text-gray-500 hover:text-[#c6a43f] transition-colors"
            >
              X
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#c6a43f] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#c6a43f] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
