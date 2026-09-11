"use client";

import React, { useRef, useState } from "react";
import { CheckCircle2, Download, Share2 } from "lucide-react";
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

function formatDate(value?: string) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "September 2026";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
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
  const issueDate = formatDate(issuedAt);
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

  const saveBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${safeFileName}.png`;
    link.href = url;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1200);
  };

  const downloadCertificate = async () => {
    setBusy("download");
    try {
      const blob = await renderCertificate();
      if (!blob) throw new Error("Could not prepare certificate.");
      saveBlob(blob);
    } finally {
      setBusy("");
    }
  };

  const shareCertificate = async () => {
    setBusy("share");
    try {
      const blob = await renderCertificate();
      if (!blob) throw new Error("Could not prepare certificate.");
      const file = new File([blob], `${safeFileName}.png`, { type: "image/png" });

      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({
          title: `${userName} — UpForge certificate`,
          text: `I completed ${quizTitle} on UpForge with a score of ${percentage}%.`,
          files: [file],
        });
        return;
      }

      saveBlob(blob);
    } finally {
      setBusy("");
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      <div
        ref={certificateRef}
        className="relative mx-auto aspect-[16/10] w-full max-w-[1200px] overflow-hidden bg-white text-slate-950"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="absolute inset-0 border-[10px] border-[#173B72]" />
        <div className="absolute inset-[18px] border border-[#D9E3F2]" />
        <div className="absolute left-0 top-0 h-2 w-2/5 bg-[#2E6CB5]" />
        <div className="absolute bottom-0 right-0 h-2 w-2/5 bg-[#2E6CB5]" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[18px] border-[#F0F5FB]" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[16px] border-[#F5F8FC]" />

        <div className="relative flex h-full flex-col px-[7.5%] py-[5.8%]">
          <div className="flex items-center justify-between gap-8 border-b border-[#D9E3F2] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#D9E3F2] bg-white p-2">
                <img src="/icon.svg" alt="UpForge" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="text-[14px] font-black tracking-[0.2em] text-[#173B72]">UPFORGE</div>
                <div className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Startup intelligence & credentials
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">Credential</div>
              <div className="mt-1 text-[11px] font-black text-[#173B72]">{credentialTier}</div>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center text-center">
            <div className="text-[9px] font-black uppercase tracking-[0.36em] text-[#2E6CB5]">
              Certificate of completion
            </div>
            <div className="mt-3 text-[clamp(27px,4vw,55px)] font-semibold tracking-[-0.04em] text-[#102B50]">
              {userName}
            </div>
            <div className="mx-auto mt-3 h-px w-28 bg-[#2E6CB5]" />
            <p className="mx-auto mt-4 max-w-[760px] text-[clamp(10px,1.05vw,15px)] leading-[1.55] text-slate-600">
              has successfully completed <span className="font-bold text-slate-900">{quizTitle}</span>,
              demonstrating practical knowledge in {category.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-4 border-y border-[#D9E3F2] py-3">
            <div className="text-center">
              <div className="text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">Score</div>
              <div className="mt-1 text-[16px] font-black text-[#102B50]">{score}/{totalQuestions}</div>
            </div>
            <div className="border-l border-[#D9E3F2] text-center">
              <div className="text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">Result</div>
              <div className="mt-1 text-[16px] font-black text-[#102B50]">{percentage}%</div>
            </div>
            <div className="border-l border-[#D9E3F2] text-center">
              <div className="text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">Issued</div>
              <div className="mt-1 truncate px-2 text-[11px] font-bold text-[#102B50]">{issueDate}</div>
            </div>
            <div className="border-l border-[#D9E3F2] text-center">
              <div className="text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">Status</div>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-black text-[#17633A]">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-end justify-between gap-6">
            <div>
              <div className="text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">Certificate ID</div>
              <div className="mt-1 text-[9px] font-bold tracking-[0.06em] text-slate-600">{certificateId}</div>
            </div>
            <div className="text-right">
              <div className="text-[12px] font-black tracking-[0.1em] text-[#173B72]">UPFORGE</div>
              <div className="mt-0.5 text-[7px] font-black uppercase tracking-[0.16em] text-slate-400">Issued by UpForge</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col justify-center gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={downloadCertificate}
          disabled={!!busy}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173B72] px-5 py-3 text-sm font-black text-white transition hover:bg-[#102B50] disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {busy === "download" ? "Preparing…" : "Download certificate"}
        </button>
        <button
          type="button"
          onClick={shareCertificate}
          disabled={!!busy}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#B9CBE2] bg-white px-5 py-3 text-sm font-black text-[#173B72] transition hover:bg-[#F5F8FC] disabled:opacity-50"
        >
          <Share2 className="h-4 w-4" />
          {busy === "share" ? "Preparing…" : "Share"}
        </button>
      </div>
    </section>
  );
}
