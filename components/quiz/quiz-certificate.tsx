"use client";

import React, { useRef, useState } from "react";
import { Award, Download } from "lucide-react";
import { toPng } from "html-to-image";

interface Props {
  userName: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  certificateId: string;
  credentialTier?: string;
}

export default function QuizCertificate({
  userName,
  quizTitle,
  category,
  score,
  totalQuestions,
  percentage,
  certificateId,
  credentialTier = "UpForge Credential",
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
        backgroundColor: "#FFFDF5",
      });

      const link = document.createElement("a");
      link.download = `${certificateId}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-amber-100 bg-white p-4 shadow-sm sm:p-6">
      <div
        ref={certificateRef}
        className="relative mx-auto w-full overflow-hidden rounded-2xl border-[10px] border-[#F4C542] bg-[#FFFDF5] p-7 text-center sm:p-12"
      >
        <div className="pointer-events-none absolute inset-3 rounded-xl border border-amber-300" />

        <div className="relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Award className="h-7 w-7" />
          </div>

          <p className="mt-5 text-[11px] font-black uppercase tracking-[0.3em] text-amber-700">
            UpForge Assessment
          </p>

          <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Certificate of Completion
          </h3>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            This certifies that
          </p>

          <p className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
            {userName}
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            has successfully completed the{" "}
            <span className="font-black text-slate-900">{quizTitle}</span>{" "}
            challenge.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Score", `${score}/${totalQuestions}`],
              ["Result", `${percentage}%`],
              ["Level", credentialTier],
              ["Category", category],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-amber-100 bg-white/80 p-3"
              >
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  {label}
                </p>
                <p className="mt-1 text-xs font-black text-slate-900">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold text-slate-500">
            <span>Certificate ID: {certificateId}</span>
            <span>•</span>
            <span>Issued by UpForge</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={downloadCertificate}
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {downloading ? "Preparing…" : "Download certificate"}
        </button>
      </div>
    </section>
  );
}
