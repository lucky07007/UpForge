import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Startup } from "@/types/startup"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StartupDetail } from "@/components/startup-detail"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: startup } = await supabase
    .from("startups")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!startup) {
    return { title: "Startup Not Found - UPFORGE" }
  }

  return {
    title: `${startup.name} - UPFORGE`,
    description: startup.description,
  }
}

export default async function StartupPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: startup } = await supabase
    .from("startups")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!startup) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <StartupDetail startup={startup as Startup} />
      </main>
      <Footer />
    </div>
  )
}
