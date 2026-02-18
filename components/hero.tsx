import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary pb-24 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.4_0.08_240)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
              {"India's Independent Founder Network"}
            </span>
          </div>

          <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
            Forge Your Rise.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/70">
            The premier recognition platform for Indian startups. If your
            startup is listed here, you have arrived.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="#startups"
              className="inline-flex items-center gap-2 rounded-md bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/90"
            >
              Explore Startups
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
