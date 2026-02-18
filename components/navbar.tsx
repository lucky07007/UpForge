"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { BusinessForm } from "./business-form"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const NavItems = () => (
    <>
      <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        Home
      </Link>
      <Link href="/#startups" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        Startups
      </Link>
      <Link href="/#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        About Us
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand/Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-border bg-white">
            <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tighter">
            <span className="text-foreground">UP</span>
            <span className="text-muted-foreground/60">FORGE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <NavItems />
          <BusinessForm />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-12">
              <SheetTitle className="text-left">Navigation</SheetTitle>
              <nav className="flex flex-col gap-4">
                <NavItems />
              </nav>
              <div className="mt-auto">
                <BusinessForm />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
