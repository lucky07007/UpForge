"use client" 

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export function HubSpotCareersForm() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if script is already injected
    const scriptId = "hubspot-careers-form-script"
    let script = document.getElementById(scriptId) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement("script")
      script.id = scriptId
      script.src = "https://js-na2.hsforms.net/forms/embed/247087124.js"
      script.defer = true
      script.async = true
      script.onload = () => {
        setIsLoaded(true)
      }
      document.head.appendChild(script)
    } else {
      setIsLoaded(true)
    }
  }, [])

  return (
    <div className="relative min-h-[420px] w-full rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-sm">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/90 backdrop-blur-xs rounded-2xl z-10">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Loading Application Form...
          </p>
        </div>
      )}
      <div
        className="hs-form-frame w-full min-h-[380px]"
        data-region="na2"
        data-form-id="60df60f0-0e69-4a09-a854-b167021d1fbf"
        data-portal-id="247087124"
      />
    </div>
  )
}
