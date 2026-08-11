"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShieldCheck, Info, X, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { VerificationDetails } from "@/types/startup";

interface TrustScoreBadgeProps {
  verification?: VerificationDetails;
}

export function TrustScoreBadge({ verification }: TrustScoreBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!verification) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border/80 text-muted-foreground text-xs font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" />
        <span>Unverified Record</span>
      </div>
    );
  }

  const score = verification.score;
  const status = verification.status;
  const isCapped = verification.is_self_reported_capped;

  // Determine badge theme
  let badgeColor = "bg-green-500/10 text-green-500 border-green-500/30";
  let gaugeColor = "text-green-500 border-green-500/40 bg-green-500/10";
  if (status === "partially_verified") {
    badgeColor = "bg-blue-500/10 text-blue-500 border-blue-500/30";
    gaugeColor = "text-blue-500 border-blue-500/40 bg-blue-500/10";
  } else if (status === "self_reported" || isCapped) {
    badgeColor = "bg-amber-500/10 text-amber-500 border-amber-500/30";
    gaugeColor = "text-amber-500 border-amber-500/40 bg-amber-500/10";
  } else if (status === "unverified" || score < 30) {
    badgeColor = "bg-gray-500/10 text-gray-400 border-gray-500/30";
    gaugeColor = "text-gray-400 border-gray-500/40 bg-gray-500/10";
  }

  const breakdownLabels: Record<keyof typeof verification.breakdown, string> = {
    website_reachable: "Website Active & SSL Valid",
    domain_validity: "Domain Ownership & Registration",
    company_identity_signal: "Corporate Identity Corroboration",
    founder_identity_signal: "Founder Identity & Professional Signal",
    social_presence: "Verified Social & Media Channels",
    product_evidence: "Public Product / Service Evidence",
    registration_evidence: "Registry / Incorporation Proof",
    recent_activity: "Recent Activity & Ecosystem Signals",
  };

  const modalContent = isOpen && (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div
        className="relative w-full max-w-lg bg-card border border-[var(--glass-border)] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-6 relative z-10 pb-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-2xl border shadow-inner ${gaugeColor}`}>
              {score}
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold">
                Official UpForge Audit
              </span>
              <h3 className="text-xl font-bold text-foreground tracking-tight">
                Trust Score Audit Ledger
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Status: <span className="font-mono font-bold uppercase text-foreground">{status.replace("_", " ")}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto pr-1 space-y-4 relative z-10 custom-scrollbar flex-1">
          {isCapped && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-xs text-amber-500 font-sans">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-1">Self-Reported Submission Notice:</strong>
                <p className="text-xs leading-relaxed text-amber-400">
                  This profile score is structurally capped at 54 points maximum pending independent corroboration by the UpForge Editorial Board.
                </p>
              </div>
            </div>
          )}

          {/* Verification Audit Checklist */}
          <div className="space-y-2.5 font-sans">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">
              Audit Metric Breakdown ({score} / 100 PTS)
            </span>

            {Object.entries(verification.breakdown).map(([key, points]) => {
              const maxVal = key.includes("social") || key.includes("product") || key.includes("registration") || key.includes("recent") ? 10 : 15;
              const label = breakdownLabels[key as keyof typeof verification.breakdown] || key;
              const isEarned = points > 0;

              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3.5 bg-muted/30 rounded-xl border border-[var(--glass-border)] transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${isEarned ? "text-green-500" : "text-muted-foreground/30"}`} />
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </div>
                  <span className={`font-mono text-xs font-bold ${isEarned ? "text-accent-gold" : "text-muted-foreground/50"}`}>
                    +{points}/{maxVal}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-6 border-t border-border flex items-center justify-between gap-4 text-xs font-mono relative z-10 shrink-0">
          <span className="text-muted-foreground text-[11px]">
            Verified: {verification.last_verified}
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-accent-primary hover:bg-blue-600 text-white font-sans font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-colors cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.4)]"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border ${badgeColor} font-mono text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-xs`}
        aria-label="View Trust Score Audit"
      >
        <ShieldCheck className="w-4 h-4" />
        <span>Trust Score: {score}/100</span>
        <span className="uppercase tracking-wider text-[10px] opacity-80">({status.replace("_", " ")})</span>
        <Info className="w-3.5 h-3.5 ml-1 opacity-70" />
      </button>

      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
