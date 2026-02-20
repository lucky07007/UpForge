"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function AuthView() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/apply`,
      },
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Magic link sent! Check your email inbox.")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-sm mx-auto py-10">
      <div className="text-center mb-10">
        <div className="h-16 w-16 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-center mx-auto mb-6">
          <Mail className="h-6 w-6 text-zinc-400" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-zinc-900">Founder Login</h2>
        <p className="text-sm text-zinc-500">We&apos;ll send a magic link to your work email.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input 
          type="email" 
          placeholder="name@company.com" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-xl border-zinc-200"
        />
        <Button 
          disabled={loading}
          className="w-full h-12 bg-black text-white rounded-xl uppercase text-[10px] tracking-widest hover:bg-zinc-800 transition-all"
        >
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Send Magic Link"}
        </Button>
      </form>
    </div>
  )
}
