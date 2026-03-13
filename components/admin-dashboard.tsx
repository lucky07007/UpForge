"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Startup } from "@/types/startup"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Plus, Pencil, Trash2, LogOut, X, Star, Check } from "lucide-react"

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

// Gold checkbox replacing Switch
function GoldCheckbox({
  checked,
  onCheckedChange,
}: {
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      aria-checked={checked}
      role="checkbox"
      style={{
        width: 24,
        height: 24,
        border: checked ? "2px solid #D4AF37" : "2px solid #333",
        background: checked
          ? "linear-gradient(135deg,#D4AF37 0%,#b8962a 100%)"
          : "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: checked ? "0 0 12px rgba(212,175,55,0.35)" : "none",
        flexShrink: 0,
        outline: "none",
      }}
    >
      {checked && (
        <Check
          size={13}
          style={{ color: "#0a0a0a", strokeWidth: 3, transition: "opacity 0.15s" }}
        />
      )}
    </button>
  )
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
    name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

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
      founded_year: form.founded_year ? parseInt(form.founded_year) : null,
      category: form.category || null,
      is_featured: form.is_featured ?? false,
      updated_at: new Date().toISOString(),
    }

    try {
      const { error } = editingId
        ? await supabase.from("startups").update(payload).eq("id", editingId)
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=Geist:wght@300;400;500;600&display=swap');

        .dash-root {
          min-height: 100svh;
          background: #0a0a0a;
          font-family: 'Geist', sans-serif;
          color: #e0dcd0;
        }

        /* HEADER */
        .dash-header {
          background: #0d0d0d;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        @media (min-width: 640px) {
          .dash-header { padding: 1.25rem 2rem; }
        }

        .dash-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .dash-logo-mark {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 0.85rem;
          color: #0a0a0a;
          flex-shrink: 0;
        }

        .dash-header-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #e0dcd0;
          letter-spacing: -0.01em;
        }

        .dash-header-email {
          font-size: 0.7rem;
          color: #444;
          font-family: 'DM Mono', monospace;
          margin-top: 1px;
        }

        .sign-out-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.75rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: #666;
          font-size: 0.75rem;
          cursor: pointer;
          font-family: 'Geist', sans-serif;
          letter-spacing: 0.02em;
          transition: border-color 0.2s, color 0.2s;
        }
        .sign-out-btn:hover {
          border-color: rgba(255,255,255,0.18);
          color: #aaa;
        }

        /* MAIN */
        .dash-main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.25rem;
        }

        @media (min-width: 640px) {
          .dash-main { padding: 2.5rem 2rem; }
        }

        .dash-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .dash-section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          color: #e8e4d8;
          letter-spacing: -0.02em;
        }

        .count-badge {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: #555;
          margin-left: 0.5rem;
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1rem;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962a 100%);
          border: none;
          color: #0a0a0a;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Geist', sans-serif;
          transition: opacity 0.2s, transform 0.15s;
        }
        .add-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        /* FORM PANEL */
        .form-panel {
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 2rem 1.5rem;
          margin-bottom: 2rem;
          position: relative;
          animation: slideDown 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }

        @media (min-width: 640px) {
          .form-panel { padding: 2rem; }
        }

        /* Gold top accent on form */
        .form-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #D4AF37, transparent);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-close {
          position: absolute;
          top: 1rem; right: 1rem;
          background: none;
          border: none;
          color: #444;
          cursor: pointer;
          padding: 0.25rem;
          transition: color 0.15s;
        }
        .form-close:hover { color: #888; }

        .form-grid-2 {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
          margin-bottom: 1.25rem;
        }

        @media (min-width: 540px) {
          .form-grid-2 { grid-template-columns: 1fr 1fr; }
        }

        .form-field { display: flex; flex-direction: column; gap: 0.4rem; }

        .form-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #555;
          font-family: 'DM Mono', monospace;
        }

        /* Override shadcn inputs for dark theme */
        .dash-root input,
        .dash-root textarea {
          background: #0a0a0a !important;
          border-color: rgba(255,255,255,0.08) !important;
          color: #e0dcd0 !important;
          font-family: 'Geist', sans-serif !important;
          font-size: 0.85rem !important;
          border-radius: 0 !important;
        }
        .dash-root input:focus,
        .dash-root textarea:focus {
          border-color: rgba(212,175,55,0.4) !important;
          outline: none !important;
          box-shadow: none !important;
          ring: none !important;
        }
        .dash-root input::placeholder,
        .dash-root textarea::placeholder { color: #333 !important; }

        .dash-root label { color: #555 !important; font-size: 0.7rem !important; }

        /* Featured feature box */
        .featured-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(255,255,255,0.06);
          background: #111;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          user-select: none;
          width: fit-content;
        }

        .featured-box.active {
          border-color: rgba(212,175,55,0.35);
          background: rgba(212,175,55,0.05);
          box-shadow: 0 0 20px rgba(212,175,55,0.08);
        }

        .featured-box-label {
          font-size: 0.75rem;
          color: #555;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: color 0.25s;
        }
        .featured-box.active .featured-box-label { color: #D4AF37; }

        .save-btn {
          padding: 0.65rem 1.5rem;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962a 100%);
          border: none;
          color: #0a0a0a;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Geist', sans-serif;
          transition: opacity 0.2s;
        }
        .save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .save-btn:hover:not(:disabled) { opacity: 0.88; }

        /* TABLE */
        .table-wrap {
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          overflow-x: auto;
        }

        table { width: 100%; border-collapse: collapse; min-width: 500px; }

        thead {
          background: #111;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        th {
          padding: 0.75rem 1.25rem;
          font-size: 0.6rem;
          font-family: 'DM Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #555;
          text-align: left;
          font-weight: 400;
          white-space: nowrap;
        }

        tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: rgba(255,255,255,0.02); }

        td {
          padding: 0.875rem 1.25rem;
          font-size: 0.82rem;
          color: #888;
          vertical-align: middle;
        }

        .startup-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: #e0dcd0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .logo-img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          border: 1px solid rgba(255,255,255,0.07);
          background: #111;
          flex-shrink: 0;
        }

        .category-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 0.65rem;
          font-family: 'DM Mono', monospace;
          color: #666;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .action-btn {
          padding: 0.4rem;
          background: none;
          border: 1px solid transparent;
          color: #444;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
          display: inline-flex;
          align-items: center;
        }
        .action-btn:hover { color: #999; border-color: rgba(255,255,255,0.1); }
        .action-btn.danger:hover { color: #f87171; border-color: rgba(248,113,113,0.2); }

        .empty-state {
          text-align: center;
          padding: 4rem 1rem;
          color: #333;
          font-size: 0.8rem;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.06em;
        }
      `}</style>

      <div className="dash-root">
        {/* HEADER */}
        <header className="dash-header">
          <div className="dash-logo">
            <div className="dash-logo-mark">UF</div>
            <div>
              <div className="dash-header-title">UpForge Admin</div>
              <div className="dash-header-email">{userEmail}</div>
            </div>
          </div>
          <button className="sign-out-btn" onClick={handleSignOut}>
            <LogOut size={13} />
            Sign Out
          </button>
        </header>

        <div className="dash-main">
          {/* Top Bar */}
          <div className="dash-topbar">
            <h2 className="dash-section-title">
              Startups
              <span className="count-badge">({startups.length})</span>
            </h2>
            <button className="add-btn" onClick={handleAdd}>
              <Plus size={13} />
              Add Startup
            </button>
          </div>

          {/* FORM */}
          {showForm && (
            <div className="form-panel">
              <button className="form-close" onClick={() => setShowForm(false)}>
                <X size={15} />
              </button>

              <form onSubmit={handleSubmit}>
                <div className="form-grid-2">
                  <div className="form-field">
                    <Label className="form-label">Name</Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                          slug: editingId ? form.slug : generateSlug(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="form-field">
                    <Label className="form-label">Slug</Label>
                    <Input
                      required
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field" style={{ marginBottom: "1.25rem" }}>
                  <Label className="form-label">Description</Label>
                  <Textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <Label className="form-label">Logo URL</Label>
                    <Input
                      value={form.logo_url}
                      onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <Label className="form-label">Category</Label>
                    <Input
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2" style={{ marginTop: "1.25rem" }}>
                  <div className="form-field">
                    <Label className="form-label">Founders</Label>
                    <Input
                      required
                      value={form.founders}
                      onChange={(e) => setForm({ ...form, founders: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <Label className="form-label">Website</Label>
                    <Input
                      type="url"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2" style={{ marginTop: "1.25rem", alignItems: "end" }}>
                  <div className="form-field">
                    <Label className="form-label">Founded Year</Label>
                    <Input
                      type="number"
                      value={form.founded_year}
                      onChange={(e) => setForm({ ...form, founded_year: e.target.value })}
                    />
                  </div>

                  {/* Featured box — black → golden */}
                  <div style={{ paddingBottom: "2px" }}>
                    <div
                      className={`featured-box${form.is_featured ? " active" : ""}`}
                      onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
                    >
                      <GoldCheckbox
                        checked={form.is_featured}
                        onCheckedChange={(v) => setForm({ ...form, is_featured: v })}
                      />
                      <span className="featured-box-label">Featured</span>
                      {form.is_featured && (
                        <Star size={12} style={{ color: "#D4AF37", marginLeft: 2 }} />
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.75rem" }}>
                  <button type="submit" disabled={isSubmitting} className="save-btn">
                    {isSubmitting ? "Saving..." : editingId ? "Update Startup" : "Add Startup"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TABLE */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Startup</th>
                  <th>Category</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {startups.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {s.logo_url && (
                          <img src={s.logo_url} className="logo-img" alt="" />
                        )}
                        <div>
                          <div className="startup-name">
                            {s.name}
                            {s.is_featured && (
                              <Star
                                size={11}
                                style={{ color: "#D4AF37", fill: "#D4AF37" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {s.category ? (
                        <span className="category-badge">{s.category}</span>
                      ) : (
                        <span style={{ color: "#333" }}>—</span>
                      )}
                    </td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <button
                        className="action-btn"
                        onClick={() => handleEdit(s)}
                        style={{ marginRight: "0.25rem" }}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="action-btn danger"
                        onClick={() => handleDelete(s.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {startups.length === 0 && (
              <div className="empty-state">No startups yet · Add one above</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
