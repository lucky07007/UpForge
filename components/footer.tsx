export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              UPFORGE
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              {"India's Independent Founder Network"}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            {"\u00A9"} {new Date().getFullYear()} UPFORGE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
