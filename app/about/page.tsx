"use client"

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-[#F8F8F6] text-zinc-900 py-40 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-8">
            Upforge Registry
          </p>

          <h1 className="text-6xl md:text-7xl font-light leading-[1.05] tracking-tight">
            About
            <span className="block font-semibold">
              Upforge.
            </span>
          </h1>

          <p className="mt-12 text-lg text-zinc-600 leading-relaxed">
            Upforge is an independent founder registry built to document,
            structure, and elevate emerging Indian startups.
            It is not a media platform. It is not a marketplace.
            It is a public record of serious builders.
          </p>
        </div>

        {/* CORE PRINCIPLES */}
        <div className="grid md:grid-cols-2 gap-20">

          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Built for Builders
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              Every listed startup represents independent execution.
              We prioritize clarity, structured documentation,
              and long-term visibility over short-term hype.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Structured Credibility
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              Profiles are designed as institutional records —
              ensuring founders build digital credibility
              that compounds over time.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Independent First
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              We spotlight founders before headlines do.
              Discoverability is structured around substance,
              not social noise.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Long-Term Vision
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              Upforge aims to become India’s most trusted
              independent founder network —
              defined by quality, structure, and permanence.
            </p>
          </div>

        </div>

        {/* CLOSING STATEMENT */}
        <div className="mt-32 max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8">
            This is not a directory.
          </h3>

          <p className="text-zinc-600 leading-relaxed text-lg">
            It is a signal that serious founders are building.
            A structured record of India’s emerging companies.
            A quiet infrastructure layer beneath the ecosystem.
          </p>
        </div>

      </div>

      {/* FOOTER STRIP */}
      <div className="border-t border-zinc-200 py-16 text-center text-xs uppercase tracking-[0.35em] text-zinc-500 mt-40">
        Upforge · Independent Founder Registry · India
      </div>

    </section>
  )
}
