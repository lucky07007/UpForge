"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { Startup } from "@/types/startup"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Plus, Pencil, Trash2, LogOut, X, Star } from "lucide-react"

interface AdminDashboardProps {
  startups: Startup[]
  userEmail: string
}

interface StartupForm {
  name: string
  slug: string
  description: string
  website: string
  logo_url: string
  founders: string
  founded_year: string
  category: string
  is_featured: boolean
}

const emptyForm: StartupForm = {
  name: "",
  slug: "",
  description: "",
  website: "",
  logo_url: "",
  founders: "",
  founded_year: "",
  category: "",
  is_featured: false,
}

export function AdminDashboard({ startups, userEmail }: AdminDashboardProps) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<StartupForm>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const handleAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const handleEdit = (startup: Startup) => {
    setEditingId(startup.id)

    setForm({
      name: startup.name || "",
      slug: startup.slug || "",
      description: startup.description || "",
      website: startup.website || "",
      logo_url: startup.logo_url || "",
      founders: Array.isArray(startup.founders)
        ? startup.founders.join(", ")
        : startup.founders || "",
      founded_year: startup.founded_year?.toString() || "",
      category: startup.category || "",
      is_featured: startup.is_featured ?? false,
    })

    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this startup?")) return
    await supabase.from("startups").delete().eq("id", id)
    router.refresh()
  }

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      name: form.name,
      slug: form.slug || generateSlug(form.name),
      description: form.description,
      website: form.website || null,
      logo_url: form.logo_url || null,
      founders: form.founders || null,
      founded_year: form.founded_year
        ? parseInt(form.founded_year)
        : null,
      category: form.category || null,
      is_featured: form.is_featured ?? false,
      updated_at: new Date().toISOString(),
    }

    try {
      const { error } = editingId
        ? await supabase
            .from("startups")
            .update(payload)
            .eq("id", editingId)
        : await supabase.from("startups").insert([payload])

      if (error) throw error

      setShowForm(false)
      setForm(emptyForm)
      setEditingId(null)
      router.refresh()
    } catch (err: any) {
      alert("Error saving: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* HEADER */}
      <header className="border-b bg-white px-8 py-5 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            UpForge Admin
          </h1>
          <p className="text-xs text-zinc-500 mt-1">{userEmail}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </header>

      <div className="mx-auto max-w-6xl px-8 py-10">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">
            Startups ({startups.length})
          </h2>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Startup
          </Button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="mb-10 bg-white border rounded-xl p-8 shadow-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700"
            >
              <X className="h-4 w-4" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                        slug: editingId
                          ? form.slug
                          : generateSlug(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Slug</Label>
                  <Input
                    required
                    value={form.slug}
                    onChange={(e) =>
                      setForm({ ...form, slug: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label>Logo URL</Label>
                  <Input
                    value={form.logo_url}
                    onChange={(e) =>
                      setForm({ ...form, logo_url: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Input
                    required
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label>Founders</Label>
                  <Input
                    required
                    value={form.founders}
                    onChange={(e) =>
                      setForm({ ...form, founders: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Website</Label>
                  <Input
                    type="url"
                    value={form.website}
                    onChange={(e) =>
                      setForm({ ...form, website: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 items-center">
                <div>
                  <Label>Founded Year</Label>
                  <Input
                    type="number"
                    value={form.founded_year}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        founded_year: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <Switch
                    checked={form.is_featured}
                    onCheckedChange={(c) =>
                      setForm({ ...form, is_featured: c })
                    }
                  />
                  <Label>Featured</Label>
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : editingId
                  ? "Update Startup"
                  : "Add Startup"}
              </Button>
            </form>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-zinc-100 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                  Startup
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {startups.map((s) => (
                <tr
                  key={s.id}
                  className="border-b last:border-0 hover:bg-zinc-50 transition"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    {s.logo_url && (
                      <img
                        src={s.logo_url}
                        className="h-9 w-9 rounded object-contain border bg-white"
                        alt=""
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium flex items-center gap-2">
                        {s.name}
                        {s.is_featured && (
                          <Star className="h-3.5 w-3.5 text-amber-500" />
                        )}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {s.category || "—"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(s)}
                      className="p-2 hover:bg-zinc-100 rounded mr-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {startups.length === 0 && (
            <div className="text-center py-16 text-zinc-400">
              No startups yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
