"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Download,
  Loader2,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import * as QuizModule from "@/lib/quizData";

export default function QuizPage() {
  const activeQuiz = useMemo(() => {
    const reg = (QuizModule as Record<string, any>).QUIZ_REGISTRY;
    if (reg) {
      if (Array.isArray(reg)) return { questions: reg };
      const firstKey = Object.keys(reg)[0];
      if (firstKey && reg[firstKey]) {
        return reg[firstKey].questions ? reg[firstKey] : { questions: reg[firstKey] };
      }
    }
    return {
      questions: [
        {
          question: "Which metric is most crucial for early-stage AI startup product-market fit?",
          options: [
            "Gross Margin",
            "Net Retention Rate (NRR) & DAU/MAU",
            "Total Vanity Impressions",
            "Raw Seed Capital",
          ],
          correctAnswer: 1,
        },
        {
          question: "Under standard ESOP vesting schedules in Indian startup ecosystems, what is the customary cliff period?",
          options: ["6 Months", "1 Year (12 Months)", "2 Years", "No Cliff"],
          correctAnswer: 1,
        },
        {
          question: "What distinguishes a verified UFRN registry entry from self-reported startup claims?",
          options: [
            "Independent verification of MCA, GSTIN & domain provenance",
            "Social media follower count",
            "Paid advertisement badge",
            "Office square footage",
          ],
          correctAnswer: 0,
        },
        {
          question: "When deploying LLMs to edge or browser environments, which format optimizes memory footprint?",
          options: [
            "Unquantized FP32",
            "GGUF / Int4 Quantization",
            "Raw PyTorch Checkpoint",
            "Uncompressed CSV",
          ],
          correctAnswer: 1,
        },
        {
          question: "What is the primary role of the InternAdda technical assessment bridge for UpForge?",
          options: [
            "Selling generic test packs",
            "Qualifying verified technical talent for top startup teams",
            "Hosting casual games",
            "Tracking social media metrics",
          ],
          correctAnswer: 1,
        },
      ],
    };
  }, []);

  const questions = activeQuiz.questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: index,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setNameSubmitted(false);
    setStudentName("");
  };

  const score = Object.entries(selectedAnswers).reduce((total, [qIdx, ansIdx]) => {
    const q = questions[Number(qIdx)];
    const correct = q?.correctAnswer ?? q?.answer ?? 0;
    return total + (correct === ansIdx ? 1 : 0);
  }, 0);

  const totalQuestions = questions.length || 5;
  const passed = score >= Math.ceil(totalQuestions * 0.6);

  const handleDownloadCertificate = async () => {
    setIsGeneratingCert(true);
    try {
      const canvas = document.createElement("canvas");
      const scale = 2;
      const width = 1123 * scale;
      const height = 794 * scale;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const certId = `UF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const candidate = studentName.trim() || "Candidate Name";

      // 1. Clean White Minimal Background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // 2. Pure Slate/Black Outer Border Matching Reference (No Gold)
      ctx.strokeStyle = "#0F172A";
      ctx.lineWidth = 4 * scale;
      ctx.strokeRect(36 * scale, 36 * scale, width - 72 * scale, height - 72 * scale);

      // 3. Current Live Date (Top-Left 3-line Stack)
      const now = new Date();
      const monthNames = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"
      ];
      const liveMonth = monthNames[now.getMonth()];
      const liveDay = `${String(now.getDate()).padStart(2, "0")},`;
      const liveYear = `${now.getFullYear()}`;

      ctx.textAlign = "left";
      ctx.fillStyle = "#0F172A";
      ctx.font = `900 ${22 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${2 * scale}px`;
      ctx.fillText(liveMonth, 65 * scale, 90 * scale);
      ctx.fillText(liveDay, 65 * scale, 118 * scale);
      ctx.fillText(liveYear, 65 * scale, 146 * scale);

      // 4. Logo Header (/logo.jpg)
      try {
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = "/logo.jpg";
        await new Promise<void>((resolve) => {
          logo.onload = () => resolve();
          logo.onerror = () => resolve();
        });

        if (logo.complete && logo.naturalWidth > 0) {
          const logoW = 110 * scale;
          const logoH = (logo.naturalHeight / logo.naturalWidth) * logoW;
          ctx.drawImage(logo, width / 2 - logoW / 2, 54 * scale, logoW, logoH);
        } else {
          ctx.fillStyle = "#0F172A";
          ctx.font = `bold ${24 * scale}px system-ui, -apple-system, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText("UPFORGE", width / 2, 80 * scale);
        }
      } catch {
        ctx.fillStyle = "#0F172A";
        ctx.font = `bold ${24 * scale}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("UPFORGE", width / 2, 80 * scale);
      }

      // 5. Titles (Matching Reference Document)
      ctx.textAlign = "center";
      ctx.fillStyle = "#0F172A";
      ctx.font = `900 ${32 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${3 * scale}px`;
      ctx.fillText("CERTIFICATE", width / 2, 160 * scale);

      ctx.font = `800 ${20 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${4 * scale}px`;
      ctx.fillStyle = "#334155";
      ctx.fillText("OF QUALIFICATION", width / 2, 194 * scale);

      ctx.font = `700 ${11 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${2 * scale}px`;
      ctx.fillStyle = "#475569";
      ctx.fillText("WE ARE PROUDLY PRESENT THIS TO", width / 2, 240 * scale);

      // 6. Student Name
      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${40 * scale}px "Times New Roman", Times, serif`;
      ctx.letterSpacing = "normal";
      ctx.fillText(candidate, width / 2, 298 * scale);

      // 7. Reference Body Paragraph
      ctx.fillStyle = "#1E293B";
      ctx.font = `700 ${11.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${0.6 * scale}px`;
      ctx.fillText(
        "FOR SUCCESSFULLY QUALIFYING IN THE UPFORGE TECHNICAL",
        width / 2,
        352 * scale
      );
      ctx.fillText(
        "ASSESSMENT, CONDUCTED THROUGH THE INTERNADDA ASSESSMENT",
        width / 2,
        372 * scale
      );
      ctx.fillText("PLATFORM.", width / 2, 392 * scale);

      // 8. Bottom-Left Badge
      const badgeX = 65 * scale;
      const badgeY = height - 190 * scale;

      ctx.textAlign = "left";
      ctx.fillStyle = "#10B981";
      ctx.font = `800 ${15 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("Qualified ★", badgeX, badgeY);

      ctx.fillStyle = "#0F172A";
      ctx.font = `900 ${22 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${1 * scale}px`;
      ctx.fillText("UPFORGE", badgeX, badgeY + 28 * scale);

      ctx.font = `700 ${14 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillStyle = "#334155";
      ctx.fillText("AI/ML Intern", badgeX, badgeY + 49 * scale);

      ctx.font = `800 ${9.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${2 * scale}px`;
      ctx.fillStyle = "#64748B";
      ctx.fillText("FOUNDERS NETWORK", badgeX, badgeY + 68 * scale);

      // 9. Bottom-Right Signature Block
      const signX = width - 65 * scale;
      ctx.textAlign = "right";

      ctx.fillStyle = "#0F172A";
      ctx.font = `italic bold ${26 * scale}px "Brush Script MT", cursive, serif`;
      ctx.fillText("Lucky", signX - 10 * scale, badgeY + 30 * scale);

      ctx.strokeStyle = "#94A3B8";
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(signX - 140 * scale, badgeY + 38 * scale);
      ctx.lineTo(signX, badgeY + 38 * scale);
      ctx.stroke();

      ctx.fillStyle = "#475569";
      ctx.font = `bold ${12 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("UpForge Global", signX, badgeY + 56 * scale);

      // 10. Direct Verification Link
      const verifyY = height - 55 * scale;
      ctx.textAlign = "center";
      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${11 * scale}px system-ui, -apple-system, monospace`;
      ctx.letterSpacing = `${0.5 * scale}px`;
      ctx.fillText(`Verify at: https://verify.upforge.org/${certId}`, width / 2, verifyY);

      // Download action
      const imgUri = canvas.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.href = imgUri;
      anchor.download = `${candidate.replace(/\s+/g, "_")}_UpForge_Certificate.png`;
      anchor.click();
    } catch (err) {
      console.error("Certificate download error:", err);
    } finally {
      setIsGeneratingCert(false);
    }
  };

  const currentDateDisplay = useMemo(() => {
    const d = new Date();
    const m = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    return {
      month: m,
      day: `${String(d.getDate()).padStart(2, "0")},`,
      year: `${d.getFullYear()}`,
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {!isCompleted ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  UpForge Technical Assessment
                </span>
              </div>
              <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>

            {currentQuestion ? (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-relaxed">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option: string, idx: number) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-sm sm:text-base flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-500/10 border-emerald-500/80 text-white shadow-lg shadow-emerald-500/5"
                            : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                        }`}
                      >
                        <span>{option}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-500 text-slate-950"
                              : "border-slate-600"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 bg-slate-950 rounded-full" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    {currentQuestionIndex === questions.length - 1
                      ? "Submit Assessment"
                      : "Next Question"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Assessment Completed
            </h1>
            <p className="text-sm text-slate-400 mb-6">
              You scored <span className="text-white font-bold">{score}</span> out of{" "}
              <span className="text-white font-bold">{totalQuestions}</span>
            </p>

            {passed ? (
              <div className="max-w-md mx-auto">
                {!nameSubmitted ? (
                  <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl mb-6 text-left">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Enter Your Full Name for Certificate
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ankit Kumar"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all mb-4 text-sm"
                    />
                    <button
                      onClick={() => {
                        if (studentName.trim()) setNameSubmitted(true);
                      }}
                      disabled={!studentName.trim()}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm transition-all"
                    >
                      Issue Official Credential
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {/* Visual Card Preview Matching Reference */}
                    <div className="bg-white text-slate-950 p-6 rounded-2xl border-2 border-slate-800 shadow-xl text-left relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                        <div className="text-[10px] font-black tracking-widest text-slate-900 leading-tight">
                          {currentDateDisplay.month}<br />
                          {currentDateDisplay.day}<br />
                          {currentDateDisplay.year}
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                          Qualified ★
                        </span>
                      </div>

                      <div className="text-center my-3">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          CERTIFICATE OF QUALIFICATION
                        </p>
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                          {studentName}
                        </h3>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed px-2 font-medium">
                          FOR SUCCESSFULLY QUALIFYING IN THE UPFORGE TECHNICAL ASSESSMENT, CONDUCTED THROUGH THE INTERNADDA ASSESSMENT PLATFORM.
                        </p>
                      </div>

                      <div className="flex items-end justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs">UPFORGE</div>
                          <div className="text-[10px] text-slate-600">AI/ML Intern • Founders Network</div>
                        </div>
                        <div className="text-right">
                          <div className="font-serif italic font-bold text-slate-900">Lucky</div>
                          <div className="text-[10px] text-slate-600">UpForge Global</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleDownloadCertificate}
                      disabled={isGeneratingCert}
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.99] text-sm disabled:opacity-70"
                    >
                      {isGeneratingCert ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Rendering High-Res Certificate...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Official Certificate (PNG / Print-Ready)
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ready to share on LinkedIn, Resume & Portfolio</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl mb-6 max-w-md mx-auto">
                <p className="text-red-400 text-sm">
                  You need at least 60% to qualify for the certificate. You can retry the assessment anytime.
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
              <Link
                href="/registry"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
              >
                Explore Directory
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
