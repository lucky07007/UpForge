"use client"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Shield, Eye, EyeOff, Lock } from "lucide-react"

const TYPEWRITER_TEXT = "Entering UpForge Startup Database..."

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const router = useRouter()
  const typeIndexRef = useRef(0)
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTypewriter = () => {
    setIsTyping(true)
    setTypedText("")
    typeIndexRef.current = 0
    typeIntervalRef.current = setInterval(() => {
      typeIndexRef.current++
      setTypedText(TYPEWRITER_TEXT.slice(0, typeIndexRef.current))
      if (typeIndexRef.current >= TYPEWRITER_TEXT.length) {
        clearInterval(typeIntervalRef.current!)
      }
    }, 42)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    startTypewriter()
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      setLoginSuccess(true)
      setTimeout(() => router.push("/admin"), 1400)
    } catch (error: unknown) {
      setIsTyping(false)
      setTypedText("")
      clearInterval(typeIntervalRef.current!)
      setError(error instanceof Error ? error.message : "Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    return () => { if (typeIntervalRef.current) clearInterval(typeIntervalRef.current) }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        .uf-login-root {
          min-height: 100svh;
          background: #F3EFE5;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          font-family: 'DM Sans', system-ui, sans-serif;
          position: relative;
        }

        /* Faint ruled-paper lines matching site texture */
        .uf-login-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 47px,
            rgba(26,18,8,0.035) 47px,
            rgba(26,18,8,0.035) 48px
          );
          pointer-events: none;
          z-index: 0;
        }

        .uf-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          background: #FFFFFF;
          border: 1.5px solid #C8C2B4;
          border-top: 3px solid #1A1208;
          padding: 2.5rem 2rem 2rem;
          animation: ufCardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
          box-shadow: 0 2px 24px rgba(26,18,8,0.07);
        }
        @media (min-width: 480px) {
          .uf-card { padding: 3rem 2.5rem 2.5rem; }
        }
        @keyframes ufCardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .uf-card.success { border-top-color: #7A6A3A; }

        /* Masthead section */
        .uf-masthead {
          text-align: center;
          padding-bottom: 1.5rem;
          margin-bottom: 1.75rem;
          border-bottom: 1px solid #D8D2C4;
        }

        .uf-logo-mark {
          width: 44px;
          height: 44px;
          background: #1A1208;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1rem;
          font-weight: 900;
          color: #F3EFE5;
          margin-bottom: 1rem;
        }

        .uf-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .uf-ornament-line { height: 1px; width: 36px; background: #C8C2B4; }
        .uf-ornament-mark { color: #C8C2B4; font-size: 11px; }

        .uf-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.65rem, 5vw, 2rem);
          font-weight: 900;
          color: #1A1208;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.35rem;
        }

        .uf-subtitle {
          font-size: 0.8rem;
          color: #8A7A68;
          font-style: italic;
          font-family: Georgia, serif;
        }

        .uf-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.75rem;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #B0A898;
        }

        /* Fields */
        .uf-field { margin-bottom: 1.25rem; }

        .uf-label {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #8A7A68;
          margin-bottom: 0.45rem;
          font-weight: 600;
        }

        .uf-input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          background: #FAFAF8;
          border: 1px solid #D8D2C4;
          color: #1A1208;
          font-size: 0.875rem;
          font-family: 'DM Sans', system-ui, sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
          border-radius: 0;
        }
        .uf-input::placeholder { color: #C0B8AC; }
        .uf-input:focus {
          border-color: #1A1208;
          background: #FFFFFF;
          box-shadow: 0 0 0 2px rgba(26,18,8,0.06);
        }

        .uf-pw-wrap { position: relative; }
        .uf-pw-wrap .uf-input { padding-right: 2.75rem; }

        .uf-eye-btn {
          position: absolute;
          right: 0.7rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #B0A898;
          cursor: pointer;
          padding: 0.2rem;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .uf-eye-btn:hover { color: #5A4A30; }

        /* Typewriter */
        .uf-typewriter-wrap {
          height: 1.75rem;
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        .uf-typewriter-text {
          font-family: 'DM Mono', monospace;
          font-size: 0.67rem;
          color: #5A4A30;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .uf-cursor {
          display: inline-block;
          width: 6px;
          height: 11px;
          background: #1A1208;
          animation: ufBlink 0.85s step-end infinite;
          vertical-align: middle;
          flex-shrink: 0;
        }
        @keyframes ufBlink { 50% { opacity: 0; } }

        /* Error */
        .uf-error {
          padding: 0.65rem 0.9rem;
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
          margin-bottom: 1.25rem;
          font-size: 0.78rem;
          color: #B91C1C;
          animation: ufShake 0.35s cubic-bezier(0.36,0.07,0.19,0.97);
        }
        @keyframes ufShake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(3px); }
          30%, 50%, 70% { transform: translateX(-3px); }
          40%, 60% { transform: translateX(3px); }
        }

        /* Submit */
        .uf-submit {
          width: 100%;
          padding: 0.8rem 1rem;
          background: #1A1208;
          border: none;
          color: #F3EFE5;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'DM Sans', system-ui, sans-serif;
          transition: background 0.2s, transform 0.15s;
          border-radius: 0;
        }
        .uf-submit:hover:not(:disabled) {
          background: #2C1F0F;
          transform: translateY(-1px);
        }
        .uf-submit:active:not(:disabled) { transform: translateY(0); }
        .uf-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .uf-bottom-rule { height: 1px; background: #D8D2C4; margin: 1.5rem 0 0; }

        .uf-footer-note {
          text-align: center;
          font-size: 0.6rem;
          color: #B5ADA3;
          margin-top: 1rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="uf-login-root">
        <div className={`uf-card${loginSuccess ? " success" : ""}`}>

          <div className="uf-masthead">
            <div className="uf-logo-mark">UF</div>

            <div className="uf-ornament">
              <div className="uf-ornament-line" />
              <span className="uf-ornament-mark">✦</span>
              <div className="uf-ornament-line" />
            </div>

            <h1 className="uf-title">Admin Access</h1>
            <p className="uf-subtitle">Sign in to manage the startup registry</p>

            <div className="uf-badge">
              <Shield size={10} />
              Secure · Authorized only
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="uf-field">
              <label htmlFor="email" className="uf-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@upforge.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="uf-input"
              />
            </div>

            <div className="uf-field">
              <label htmlFor="password" className="uf-label">Password</label>
              <div className="uf-pw-wrap">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="uf-input"
                />
                <button
                  type="button"
                  className="uf-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Typewriter animation strip */}
            <div className="uf-typewriter-wrap">
              {isTyping && (
                <span className="uf-typewriter-text">
                  <Lock size={10} style={{ opacity: 0.55, flexShrink: 0 }} />
                  {typedText}
                  <span className="uf-cursor" />
                </span>
              )}
            </div>

            {error && <div className="uf-error">{error}</div>}

            <button type="submit" disabled={isLoading || loginSuccess} className="uf-submit">
              {loginSuccess ? "Access Granted  ✦" : isLoading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <div className="uf-bottom-rule" />
          <p className="uf-footer-note">Authorized Personnel Only · UpForge Registry</p>
        </div>
      </div>
    </>
  )
}
