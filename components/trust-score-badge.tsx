"use client";

import React, { useState } from "react";
import { ShieldCheck, Info, X, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { VerificationDetails } from "@/types/startup";

interface TrustScoreBadgeProps {
  verification?: VerificationDetails;
}

export function TrustScoreBadge({ verification }: TrustScoreBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!verification) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border/80 text-muted-foreground text-xs font-mono">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Unverified Record</span>
      </div>
    );
  }

  const score = verification.score;
  const status = verification.status;
  const isCapped = verification.is_self_reported_capped;

  // Determine badge theme
  let badgeColor = "bg-green-500/10 text-green-600 border-green-500/30";
  let gaugeColor = "text-green-500";
  if (status === "partially_verified") {
    badgeColor = "bg-blue-500/10 text-blue-600 border-blue-500/30";
    gaugeColor = "text-blue-500";
  } else if (status === "self_reported" || isCapped) {
    badgeColor = "bg-amber-500/10 text-amber-600 border-amber-500/30";
    gaugeColor = "text-amber-500";
  } else if (status === "unverified" || score < 30) {
    badgeColor = "bg-gray-500/10 text-gray-600 border-gray-500/30";
    gaugeColor = "text-gray-500";
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

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border ${badgeColor} font-mono text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-xs`}
      >
        <ShieldCheck className="w-4 h-4" />
        <span>Trust Score: {score}/100</span>
        <span className="uppercase tracking-wider text-[10px] opacity-80">({status.replace("_", " ")})</span>
        <Info className="w-3.5 h-3.5 ml-1 opacity-70" />
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border border-border/80 max-w-lg w-full rounded-3xl p-6 md:p-8 shadow-2xl relative font-serif">
            
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-xl ${gaugeColor} bg-muted border border-border/80`}>
                {score}
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                  UpForge Trust Score Audit
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Verification Breakdown
                </h3>
              </div>
            </div>

            {isCapped && (
              <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-xs text-amber-700 dark:text-amber-300 font-sans">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Self-Reported Submission Notice:</strong>
                  <p className="mt-1 font-serif">
                    This profile score is structurally capped at 54 points maximum pending independent corroboration by the UpForge Editorial Board.
                  </p>
                </div>
              </div>
            )}

            {/* Breakdown List */}
            <div className="space-y-3 mb-6 font-sans">
              {Object.entries(verification.breakdown).map(([key, points]) => {
                const maxVal = key.includes("social") || key.includes("product") || key.includes("registration") || key.includes("recent") ? 10 : 15;
                const label = breakdownLabels[key as keyof typeof verification.breakdown] || key;
                const isEarned = points > 0;

                return (
                  <div key={key} className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border/60">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 ${isEarned ? "text-green-500" : "text-muted-foreground/40"}`} />
                      <span className="text-xs font-medium text-foreground">{label}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-foreground">
                      +{points}/{maxVal}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>Last Verified: {verification.last_verified}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-foreground text-background px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-black transition-colors"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
