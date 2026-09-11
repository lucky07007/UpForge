"use client";

import React, { useRef, useState } from "react";
import { Award, CheckCircle2, Download, Share2 } from "lucide-react";
import { toBlob } from "html-to-image";

interface Props {
  userName: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  certificateId: string;
  issuedAt?: string;
  credentialTier?: string;
}

function formatIssueDate(value?: string) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "Issued September 2026";
  return `Issued ${new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)}`;
}

export default function QuizCertificate({
  userName,
  quizTitle,
  category,
  score,
  totalQuestions,
  percentage,
  certificateId,
  issuedAt,
  credentialTier = "UpForge Credential",
}: Props) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<"download" | "share" | "">("");
  const issueDate = formatIssueDate(issuedAt);
  const safeFileName = certificateId.replace(/[^a-z0-9_-]/gi, "_");

  const renderCertificate = async () => {
    if (!certificateRef.current) throw new Error("Certificate is not ready.");
    return toBlob(certificateRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
      canvasWidth: 1800,
      canvasHeight: 1125,
    });
  };

  const downloadCertificate = async () => {
    setBusy("download");
    try {
      const blob = await renderCertificate();
      if (!blob) throw new Error("Could not prepare certificate.");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${safeFileName}.png`;
      link.href = url;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      setBusy("");
    }
  };

  const shareCertificate = async () => {
    setBusy("share");
    try {
      const blob = await renderCertificate();
      if (!blob) throw new Error("Could not prepare certificate.");

      const file = new File([blob], `${safeFileName}.png`, {
        type: "image/png",
      });

      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({
          title: `${userName} — UpForge Certificate`,
          text: `I completed ${quizTitle} on UpForge with a score of ${percentage}%.`,
          files: [file],
        });
        return;
      }

      // Desktop browsers without file sharing still get the certificate downloaded.
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${safeFileName}.png`;
      link.href = url;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      setBusy("");
    }
  };

  return (
    <section className="rounded-3xl border border-amber-100 bg-white p-3 shadow-sm sm:p-5 lg:p-7">
      <div
        ref={certificateRef}
        className="relative mx-auto aspect-[16/10] w-full max-w-[1200px] overflow-hidden bg-white text-slate-950"
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, rgba(244,197,66,.18), transparent 28%), radial-gradient(circle at 10% 90%, rgba(244,197,66,.10), transparent 25%)",
        }}
      >
        <div className="absolute inset-0 border-[14px] border-[#F4C542]" />
        <div className="absolute inset-[28px] border border-slate-200" />
        <div className="absolute left-[44px] top-[44px] h-24 w-24 rounded-full border border-amber-200 opacity-40" />
        <div className="absolute bottom-[42px] right-[44px] h-32 w-32 rounded-full border border-amber-200 opacity-40" />

        <div className="relative flex h-full flex-col px-[8%] py-[6.5%]">
          <div className="flex items-start justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
                <img src="/icon.svg" alt="UpForge" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-[13px] font-black uppercase tracking-[0.24em] text-slate-950">
                  UPFORGE
                </p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-amber-700">
                  Startup intelligence platform
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-400">
                {credentialTier}
              </p>
              <p className="mt-1 text-[10px] font-bold text-slate-600">{issueDate}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.42em] text-amber-700">
              Verified certificate of achievement
            </p>
            <h2 className="mt-3 text-[clamp(32px,4.6vw,62px)] font-black tracking-[-0.04em] text-slate-950">
              Certificate of Completion
            </h2>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              This certificate is proudly awarded to
            </p>
            <p className="mt-2 break-words text-[clamp(28px,4vw,52px)] font-black tracking-[-0.03em] text-slate-950">
              {userName}
            </p>
            <div className="mx-auto mt-3 h-px w-28 bg-[#F4C542]" />
            <p className="mx-auto mt-4 max-w-3xl text-[clamp(12px,1.2vw,16px)] leading-relaxed text-slate-600">
              for successfully completing the <span className="font-black text-slate-950">{quizTitle}</span> challenge,
              demonstrating practical knowledge in {category.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 border-y border-slate-200 py-4">
            <div className="text-center">
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-400">Score</p>
              <p className="mt-1 text-lg font-black text-slate-950">{score}/{totalQuestions}</p>
            </div>
            <div className="border-l border-slate-200 text-center">
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-400">Result</p>
              <p className="mt-1 text-lg font-black text-slate-950">{percentage}%</p>
            </div>
            <div className="border-l border-slate-200 text-center">
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-400">Credential</p>
              <p className="mt-1 truncate px-2 text-sm font-black text-slate-950">{credentialTier}</p>
            </div>
            <div className="border-l border-slate-200 text-center">
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-400">Status</p>
              <p className="mt-1 inline-flex items-center gap-1 text-sm font-black text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> Verified
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-6">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">Certificate ID</p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.08em] text-slate-700">{certificateId}</p>
            </div>
            <div className="text-right">
              <p className="font-serif text-lg italic text-slate-800">UpForge</p>
              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">Issued by UpForge</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={downloadCertificate}
          disabled={!!busy}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {busy === "download" ? "Preparing…" : "Download certificate"}
        </button>
        <button
          type="button"
          onClick={shareCertificate}
          disabled={!!busy}
          className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-5 py-3 text-xs font-black text-amber-950 transition hover:bg-amber-100 disabled:opacity-50"
        >
          <Share2 className="h-4 w-4" />
          {busy === "share" ? "Preparing…" : "Share certificate"}
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] font-semibold text-slate-400">
        Designed for professional sharing on LinkedIn, WhatsApp and social profiles.
      </p>
    </section>
  );
}
