import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import type { Startup } from "@/types/startup"

export const metadata = {
  title: "Admin - UPFORGE",
}

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })

  return <AdminDashboard startups={(startups as Startup[]) || []} userEmail={user.email || ""} />
}
