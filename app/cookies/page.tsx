"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Cookie, BarChart3, EyeOff, Settings2, Info } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 pt-10 pb-24">
        
        {/* HEADER */}
        <section className="max-w-[1300px] mx-auto w-full mt-5 pb-6 flex flex-col items-center text-center">
          <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
            <h1
              className="mast-h1 text-3xl md:text-[44px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Cookie Policy
            </h1>

            <p className="mast-tagline font-serif italic text-base md:text-[17px] text-muted-foreground max-w-lg mb-2 leading-relaxed">
              Transparent session management and telemetry standards for the UpForge Global Registry.
            </p>
          </div>
        </section>


        {/* Narrative Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[17px] leading-[1.8] font-serif my-10">

          <section className="border border-border/80 bg-card/90 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col items-center text-center md:items-start md:text-left">

            <div className="flex items-center gap-3 mb-4">
              <EyeOff className="text-amber-500" size={20} />

              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
                01. Core Intent
              </h2>
            </div>

            <p className="text-foreground italic">
              Cookies on UpForge are utilized solely to facilitate secure session management and improve retrieval speed. We do not engage in behavioral advertising or cross-site tracking.
            </p>

          </section>


          <section className="border border-border/80 bg-card/90 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col items-center text-center md:items-start md:text-left">

            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="text-amber-500" size={20} />

              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
                02. Telemetry
              </h2>
            </div>

            <p className="text-foreground italic">
              We use anonymized telemetry to monitor the health of our intelligence datasets. This data is non-personally identifiable and encrypted at the source.
            </p>

          </section>

        </div>


        {/* Technical Breakdown */}
        <div className="mb-12">

          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-6 flex items-center justify-center md:justify-start gap-2 text-amber-600 dark:text-amber-400">
            <Info size={14} className="text-amber-500" />
            Disclosure Table
          </h3>

          <div className="border border-border/80 bg-card/90 rounded-3xl shadow-xs overflow-hidden">

            <table className="w-full text-center md:text-left border-collapse font-serif min-w-[500px]">

              <thead>
                <tr className="bg-muted/60 text-foreground text-[11px] font-mono uppercase tracking-widest border-b border-border/60">

                  <th className="p-4 border-r border-border/60 text-center md:text-left">
                    Category
                  </th>

                  <th className="p-4 border-r border-border/60 text-center md:text-left">
                    Purpose
                  </th>

                  <th className="p-4 text-center">
                    Duration
                  </th>

                </tr>
              </thead>


              <tbody className="text-sm">

                <tr className="border-b border-border/60">

                  <td className="p-4 border-r border-border/60 font-bold font-mono text-xs">
                    Authentication
                  </td>

                  <td className="p-4 border-r border-border/60 text-muted-foreground italic">
                    Securing UFRN administrative access.
                  </td>

                  <td className="p-4 uppercase text-[10px] font-mono font-bold text-center">
                    Session
                  </td>

                </tr>


                <tr className="border-b border-border/60">

                  <td className="p-4 border-r border-border/60 font-bold font-mono text-xs">
                    Preferences
                  </td>

                  <td className="p-4 border-r border-border/60 text-muted-foreground italic">
                    Remembering registry filter settings.
                  </td>

                  <td className="p-4 uppercase text-[10px] font-mono font-bold text-center">
                    30 Days
                  </td>

                </tr>


                <tr>

                  <td className="p-4 border-r border-border/60 font-bold font-mono text-xs">
                    Performance
                  </td>

                  <td className="p-4 border-r border-border/60 text-muted-foreground italic">
                    CDN optimization for startup logos.
                  </td>

                  <td className="p-4 uppercase text-[10px] font-mono font-bold text-center">
                    Persistent
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>


        {/* User Control Box */}
        <div className="p-8 md:p-10 border border-border/80 bg-card/90 rounded-3xl shadow-sm flex flex-col items-center md:flex-row gap-8 text-center md:text-left">

          <div className="shrink-0 bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl">
            <Settings2 className="text-amber-500" size={32} />
          </div>

          <div className="max-w-xl">

            <h3 className="text-base font-mono font-bold uppercase tracking-widest mb-2 text-foreground">
              User Sovereignty
            </h3>

            <p className="text-sm text-muted-foreground font-serif leading-relaxed italic">
              You maintain total control. By modifying your browser settings, you can decline all non-essential tracking. Note that registry features requiring <strong>UFRN Verification</strong> may be functionally limited without session persistence.
            </p>

          </div>

        </div>


        {/* Final Official Stamp */}
        <div className="mt-24 text-center">

          <img
            src="/seal.jpg"
            alt="Official Seal"
            className="w-24 mx-auto mb-4 grayscale opacity-40 hover:opacity-100 transition-opacity"
          />

          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
            UpForge Data Integrity Office
          </p>

        </div>

      </div>
    </div>
  );
}
