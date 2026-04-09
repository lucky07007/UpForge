"use client"
// components/top-videos.tsx — MAGAZINE EDITORIAL v4
// FT/Economist aesthetic with refined typography and spacing
// Auto-fetches YouTube metadata via oEmbed API
// Global publication polish

import { useState, useEffect } from "react"

export const YOUTUBE_IDS: { id: string; tag: string; date: string }[] = [
  { id: "Tqke3h25UwI", tag: "Operations", date: "4 April 2026" },
  { id: "rUA5wMBsrfw", tag: "Growth", date: "15 March 2026" },
  { id: "QN7FRDlZhRg", tag: "Strategy", date: "22 March 2026" },
  { id: "PRltUBPyDm4", tag: "D2C", date: "15 March 2026" },
  { id: "UB9XT-St2sQ", tag: "Edtech", date: "8 March 2026" },
]

const TAG_COLORS: Record<string, string> = {
  Operations: "#7C1D1D",
  Growth: "#1A3D5C",
  Strategy: "#1D4A1D",
  D2C: "#5C3D1A",
  Edtech: "#3D1A5C",
  Commerce: "#5C4D1A",
}

interface VideoMeta {
  id: string
  title: string
  author: string
  thumbnail: string
  tag: string
  date: string
  loaded: boolean
  error: boolean
}

async function fetchYouTubeMeta(id: string): Promise<{ title: string; author: string; thumbnail: string }> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
    )
    if (!res.ok) throw new Error("oEmbed failed")
    const data = await res.json()
    return {
      title: data.title ?? "Untitled",
      author: data.author_name ?? "UpForge",
      thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    }
  } catch {
    return {
      title: "UpForge Video",
      author: "UpForge",
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    }
  }
}

function VideoSkeleton({ featured }: { featured?: boolean }) {
  if (featured) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-pulse bg-[#E8DDD0]" style={{ aspectRatio: "16/9" }} />
        <div className="flex flex-col gap-4 justify-center">
          <div className="h-7 bg-[#E8DDD0] animate-pulse w-3/4" />
          <div className="h-4 bg-[#E8DDD0] animate-pulse w-full" />
          <div className="h-4 bg-[#E8DDD0] animate-pulse w-5/6" />
        </div>
      </div>
    )
  }
  return (
    <div className="flex gap-4 py-6 border-b border-[#E8DDD0]">
      <div className="flex-shrink-0 animate-pulse bg-[#E8DDD0]" style={{ width: 140, aspectRatio: "16/9" }} />
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <div className="h-4 bg-[#E8DDD0] animate-pulse w-3/4" />
        <div className="h-3 bg-[#E8DDD0] animate-pulse w-1/2" />
      </div>
    </div>
  )
}

function FeaturedVideoCard({ video }: { video: VideoMeta }) {
  const [hovered, setHovered] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const tagColor = TAG_COLORS[video.tag] ?? "#7C1D1D"
  const href = `https://www.youtube.com/watch?v=${video.id}`

  if (!video.loaded) return <VideoSkeleton featured />

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block pb-10 mb-0 border-b-2 border-[#7C1D1D]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#1A0A0A" }}>
          {!imgFailed ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          )}

          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              background: `rgba(26,10,10,${hovered ? 0.35 : 0.22})`,
            }}
          >
            <div
              className="w-16 h-16 flex items-center justify-center border-2 transition-all duration-300"
              style={{
                background: hovered ? "#7C1D1D" : "rgba(250,247,242,0.95)",
                borderColor: hovered ? "#7C1D1D" : "rgba(250,247,242,0.95)",
              }}
            >
              <svg className="w-7 h-7 ml-1" fill={hovered ? "#FAF7F2" : "#7C1D1D"} viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div
            className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-bold"
            style={{ background: tagColor, color: "#FAF7F2", fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {video.tag}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h3
            className="leading-tight mb-5 group-hover:text-[#7C1D1D] transition-colors duration-300"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(20px, 2.8vw, 30px)",
              color: "#1A0A0A",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {video.title}
          </h3>

          <div className="flex items-center justify-between mt-3">
            <span
              className="text-xs tracking-wide"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A" }}
            >
              {video.author} · {video.date}
            </span>
            <span
              className="text-sm font-semibold flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#7C1D1D" }}
            >
              Watch <span className="text-lg leading-none">→</span>
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

function SecondaryVideoCard({ video, index }: { video: VideoMeta; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const tagColor = TAG_COLORS[video.tag] ?? "#7C1D1D"
  const href = `https://www.youtube.com/watch?v=${video.id}`

  if (!video.loaded) return <VideoSkeleton />

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-5 items-start py-6 border-b border-[#E8DDD0]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ width: 148, aspectRatio: "16/9", background: "#1A0A0A" }}
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          onError={(e) => {
            const el = e.target as HTMLImageElement
            el.src = `https://img.youtube.com/vi/${video.id}/default.jpg`
          }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ background: "rgba(26,10,10,0.28)", opacity: hovered ? 1 : 0.7 }}
        >
          <div className="w-8 h-8 flex items-center justify-center" style={{ background: "rgba(250,247,242,0.95)" }}>
            <svg className="w-4 h-4 ml-0.5" fill="#7C1D1D" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-2">
          <span
            className="text-[9px] tracking-[0.15em] uppercase font-bold px-2.5 py-0.5"
            style={{ background: tagColor, color: "#FAF7F2", fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {video.tag}
          </span>
        </div>
        <h3
          className="leading-snug mb-2 group-hover:text-[#7C1D1D] transition-colors line-clamp-2"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "15px",
            color: "#1A0A0A",
            fontWeight: 700,
          }}
        >
          {video.title}
        </h3>
        <div
          className="text-[11px] tracking-wide"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A" }}
        >
          {video.author} · {video.date}
        </div>
      </div>

      <div
        className="flex-shrink-0 text-4xl font-bold leading-none"
        style={{ color: "#D4C5B5", fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {String(index + 2).padStart(2, "0")}
      </div>
    </a>
  )
}

export function TopVideosSection() {
  const [videos, setVideos] = useState<VideoMeta[]>(
    YOUTUBE_IDS.map(({ id, tag, date }) => ({
      id, tag, date,
      title: "", author: "", thumbnail: "",
      loaded: false, error: false,
    }))
  )

  useEffect(() => {
    YOUTUBE_IDS.forEach(async ({ id }, i) => {
      try {
        const meta = await fetchYouTubeMeta(id)
        setVideos(prev => prev.map((v, vi) =>
          vi === i ? { ...v, ...meta, loaded: true } : v
        ))
      } catch {
        setVideos(prev => prev.map((v, vi) =>
          vi === i ? { ...v, loaded: true, error: true, title: "UpForge Video" } : v
        ))
      }
    })
  }, [])

  const featured = videos[0]
  const rest = videos.slice(1)

  return (
    <section className="overflow-hidden" style={{ background: "#F5F0E8" }}>
      <div className="border-b-2 border-[#7C1D1D]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex items-baseline justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-5">
            <svg className="w-5 h-5 flex-shrink-0" fill="#7C1D1D" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#1A0A0A" }}
            >
              Watch & Learn
            </h2>
            <span
              className="text-[11px] tracking-[0.2em] uppercase text-[#8B6A6A]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Deep-dive video analysis
            </span>
          </div>
          <a
            href="https://www.youtube.com/@upforge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:tracking-[0.2em]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#7C1D1D" }}
          >
            YouTube Channel →
          </a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="mb-12">
          <FeaturedVideoCard video={featured} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
          {rest.map((video, i) => (
            <SecondaryVideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
