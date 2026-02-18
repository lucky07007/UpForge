import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            UPFORGE
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/#startups"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Startups
          </Link>
          <Link
            href="/#why-upforge"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Why UPFORGE
          </Link>
          <Link
            href="/#startups"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
