/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import { Download, ShieldCheck } from "lucide-react";
import { toPng } from "html-to-image";

interface Props {
  name: string;
  quizTitle: string;
  category: string;
  score: number;
  total: number;
  percentage: number;
  certificateId: string;
}

export default function QuizCertificate({
  name,
  quizTitle,
  category,
  score,
  total,
  percentage,
  certificateId,
}: Props) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    setDownloading(true);

    try {
      const dataUrl = await toPng(certificateRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#fffdf5",
      });

      const link = document.createElement("a");
      link.download = `UpForge_Certificate_${name.replace(/[^a-z0-9]+/gi, "_") || "Builder"}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-amber-700">
            Your certificate
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Completion certificate generated from this quiz result.
          </p>
        </div>

        <button
          type="button"
          onClick={downloadCertificate}
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {downloading ? "Preparing…" : "Download certificate"}
        </button>
      </div>

      <div
        ref={certificateRef}
        className="relative mx-auto aspect-[3500/2475] w-full max-w-5xl overflow-hidden border-[3px] border-[#D5A928] bg-[#FFFDF5] p-[3.2%] text-slate-900 shadow-[0_20px_60px_rgba(120,90,20,0.12)]"
      >
        <div className="absolute inset-[2.2%] border border-[#E7D8A3]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#D5A928]/[0.04]" />

        <div className="relative flex h-full flex-col items-center justify-between px-[5%] py-[4%] text-center">
          <header className="flex w-full items-center justify-between gap-4 border-b border-[#E7D8A3] pb-[2.5%]">
            <div className="text-left">
              <div className="text-[clamp(18px,2.4vw,42px)] font-black tracking-tight">
                UpForge
              </div>
              <div className="text-[clamp(7px,0.8vw,18px)] font-bold uppercase tracking-[0.22em] text-slate-500">
                Startup Readiness Platform
              </div>
            </div>
            <div className="rounded-full border border-[#D5A928] bg-[#F4C542]/15 px-[2.5%] py-[1%] text-[clamp(7px,0.85vw,18px)] font-black tracking-[0.16em] text-amber-900">
              CERTIFICATE OF COMPLETION
            </div>
          </header>

          <div className="w-full">
            <div className="text-[clamp(8px,1vw,20px)] font-bold uppercase tracking-[0.28em] text-slate-500">
              This is to certify that
            </div>

            <div className="mt-[1.2%] text-[clamp(24px,4.5vw,82px)] font-black tracking-tight text-slate-950">
              {name}
            </div>

            <div className="mx-auto mt-[1.4%] h-px w-[46%] bg-[#D5A928]" />

            <p className="mx-auto mt-[2%] max-w-[82%] text-[clamp(9px,1.2vw,25px)] leading-relaxed text-slate-600">
              has successfully completed the{" "}
              <span className="font-black text-slate-900">{quizTitle}</span>{" "}
              assessment on UpForge and demonstrated practical knowledge across
              the {category} challenge.
            </p>
          </div>

          <div className="grid w-full grid-cols-3 gap-[3%]">
            <div className="rounded-[14px] border border-[#E7D8A3] bg-white/70 px-2 py-[3%]">
              <div className="text-[clamp(7px,0.75vw,16px)] font-black uppercase tracking-wider text-slate-500">
                Score
              </div>
              <div className="mt-1 text-[clamp(16px,2vw,36px)] font-black">
                {score}/{total}
              </div>
            </div>
            <div className="rounded-[14px] border border-[#E7D8A3] bg-[#F4C542]/10 px-2 py-[3%]">
              <div className="text-[clamp(7px,0.75vw,16px)] font-black uppercase tracking-wider text-slate-500">
                Accuracy
              </div>
              <div className="mt-1 text-[clamp(16px,2vw,36px)] font-black text-amber-900">
                {percentage}%
              </div>
            </div>
            <div className="rounded-[14px] border border-[#E7D8A3] bg-white/70 px-2 py-[3%]">
              <div className="text-[clamp(7px,0.75vw,16px)] font-black uppercase tracking-wider text-slate-500">
                Credential
              </div>
              <div className="mt-1 text-[clamp(11px,1.15vw,23px)] font-black">
                UpForge
              </div>
            </div>
          </div>

          <footer className="flex w-full items-end justify-between gap-5 border-t border-[#E7D8A3] pt-[2.5%] text-left">
            <div>
              <div className="text-[clamp(7px,0.75vw,16px)] font-black uppercase tracking-wider text-slate-500">
                Certificate ID
              </div>
              <div className="mt-1 text-[clamp(8px,0.9vw,18px)] font-bold">
                {certificateId}
              </div>
              <div className="mt-1 text-[clamp(6px,0.65vw,13px)] text-slate-500">
                Issued by UpForge · upforge.org
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#D5A928] bg-white px-3 py-2 text-[clamp(7px,0.75vw,16px)] font-black text-amber-900">
              <ShieldCheck className="h-[1.1em] w-[1.1em]" />
              Completion recorded
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
