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
import { QUIZ_REGISTRY } from "@/lib/quizData";

export default function QuizPage() {
  // Extract questions dynamically from QUIZ_REGISTRY
  const defaultQuestions = useMemo(() => {
    if (!QUIZ_REGISTRY) return [];
    if (Array.isArray(QUIZ_REGISTRY)) return QUIZ_REGISTRY;
    
    // If QUIZ_REGISTRY is a category map (e.g. { ai: [...], frontend: [...] })
    const registryObj = QUIZ_REGISTRY as Record<string, any>;
    const keys = Object.keys(registryObj);
    if (keys.length > 0) {
      const firstVal = registryObj[keys[0]];
      if (Array.isArray(firstVal)) return firstVal;
      if (firstVal && Array.isArray(firstVal.questions)) return firstVal.questions;
    }
    return [];
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);

  const questions = defaultQuestions;
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

  // Score calculation
  const score = Object.entries(selectedAnswers).reduce((total, [qIdx, ansIdx]) => {
    const q = questions[Number(qIdx)];
    const correct = q?.correctAnswer ?? q?.answer ?? 0;
    return total + (correct === ansIdx ? 1 : 0);
  }, 0);

  const totalQuestions = questions.length || 5;
  const passed = score >= Math.ceil(totalQuestions * 0.6);

  // Certificate Generator
  const handleDownloadCertificate = async () => {
    setIsGeneratingCert(true);
    try {
      const canvas = document.createElement("canvas");
      const scale = 2; // 2x Retina resolution
      const width = 1123 * scale;
      const height = 794 * scale;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const certId = `UF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const candidate = studentName.trim() || "Candidate";
      const roleText = "AI/ML Intern";

      // 1. Premium Background with Soft Radial Glow
      ctx.fillStyle = "#FAFBFD";
      ctx.fillRect(0, 0, width, height);

      const radialGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        120 * scale,
        width / 2,
        height / 2,
        600 * scale
      );
      radialGrad.addColorStop(0, "rgba(238, 244, 255, 0.75)");
      radialGrad.addColorStop(1, "#FAFBFD");
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. High-End Frame & Gold Accents
      ctx.strokeStyle = "#0F172A";
      ctx.lineWidth = 5 * scale;
      ctx.strokeRect(32 * scale, 32 * scale, width - 64 * scale, height - 64 * scale);

      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(40 * scale, 40 * scale, width - 80 * scale, height - 80 * scale);

      const drawCorner = (x: number, y: number) => {
        ctx.fillStyle = "#D97706";
        ctx.beginPath();
        ctx.arc(x, y, 4 * scale, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCorner(48 * scale, 48 * scale);
      drawCorner(width - 48 * scale, 48 * scale);
      drawCorner(48 * scale, height - 48 * scale);
      drawCorner(width - 48 * scale, height - 48 * scale);

      // 3. Official Logo (/logo.jpg)[cite: 2]
      try {
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = "/logo.jpg";
        await new Promise<void>((resolve) => {
          logo.onload = () => resolve();
          logo.onerror = () => resolve();
        });

        if (logo.complete && logo.naturalWidth > 0) {
          const logoW = 130 * scale;
          const logoH = (logo.naturalHeight / logo.naturalWidth) * logoW;
          ctx.drawImage(logo, width / 2 - logoW / 2, 58 * scale, logoW, logoH);
        } else {
          ctx.fillStyle = "#0F172A";
          ctx.font = `bold ${26 * scale}px system-ui, -apple-system, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText("UPFORGE", width / 2, 85 * scale);
        }
      } catch {
        ctx.fillStyle = "#0F172A";
        ctx.font = `bold ${26 * scale}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("UPFORGE", width / 2, 85 * scale);
      }

      // 4. Header Titles
      ctx.textAlign = "center";
      ctx.fillStyle = "#D97706";
      ctx.font = `600 ${11 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${3 * scale}px`;
      ctx.fillText("UPFORGE GLOBAL FOUNDERS NETWORK", width / 2, 145 * scale);

      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${28 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${1 * scale}px`;
      ctx.fillText("CERTIFICATE OF QUALIFICATION", width / 2, 185 * scale);

      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 180 * scale, 202 * scale);
      ctx.lineTo(width / 2 + 180 * scale, 202 * scale);
      ctx.stroke();

      // 5. Presentational Subtitle
      ctx.fillStyle = "#475569";
      ctx.font = `500 ${11 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${2 * scale}px`;
      ctx.fillText("WE PROUDLY PRESENT THIS TO", width / 2, 230 * scale);

      // 6. Student Candidate Name (Luxury Serif Style)
      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${36 * scale}px "Times New Roman", Times, serif`;
      ctx.letterSpacing = "normal";
      ctx.fillText(candidate, width / 2, 280 * scale);

      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 140 * scale, 292 * scale);
      ctx.lineTo(width / 2 + 140 * scale, 292 * scale);
      ctx.stroke();

      // 7. Assessment Body Text
      ctx.fillStyle = "#334155";
      ctx.font = `400 ${12 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = "normal";
      ctx.fillText(
        "FOR SUCCESSFULLY QUALIFYING IN THE UPFORGE TECHNICAL ASSESSMENT,",
        width / 2,
        330 * scale
      );
      ctx.fillText(
        "CONDUCTED THROUGH THE INTERNADDA ASSESSMENT PLATFORM.",
        width / 2,
        348 * scale
      );

      // 8. Qualified Badge Chip
      const badgeW = 210 * scale;
      const badgeH = 32 * scale;
      const badgeX = width / 2 - badgeW / 2;
      const badgeY = 375 * scale;

      ctx.fillStyle = "#F0FDF4";
      ctx.strokeStyle = "#86EFAC";
      ctx.lineWidth = 1.2 * scale;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 16 * scale);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#15803D";
      ctx.font = `bold ${11 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText(`QUALIFIED ★ ${roleText.toUpperCase()}`, width / 2, badgeY + 20 * scale);

      // 9. Footer Details & Verification[cite: 1]
      const footerY = height - 100 * scale;
      const now = new Date();
      const monthNames = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"
      ];
      const formattedDate = `${monthNames[now.getMonth()]} ${String(now.getDate()).padStart(2, "0")}, ${now.getFullYear()}`;

      // Left: Date
      ctx.textAlign = "left";
      ctx.fillStyle = "#64748B";
      ctx.font = `600 ${9 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("DATE OF ISSUANCE", 70 * scale, footerY);
      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${13 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText(formattedDate, 70 * scale, footerY + 20 * scale);
      ctx.fillStyle = "#94A3B8";
      ctx.font = `400 ${8.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("Certified Registry Record", 70 * scale, footerY + 34 * scale);

      // Center: Verification Link & ID
      ctx.textAlign = "center";
      ctx.fillStyle = "#64748B";
      ctx.font = `600 ${9 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("CREDENTIAL VERIFICATION", width / 2, footerY);

      const verifyUrl = `https://verify.upforge.org/${certId}`;
      ctx.fillStyle = "#0284C7";
      ctx.font = `bold ${10.5 * scale}px monospace`;
      ctx.fillText(verifyUrl, width / 2, footerY + 20 * scale);

      ctx.fillStyle = "#64748B";
      ctx.font = `500 ${8.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText(`Verify at: ${verifyUrl}`, width / 2, footerY + 34 * scale);

      // Right: Lucky Tiwari Signature
      ctx.textAlign = "right";
      ctx.fillStyle = "#0F172A";
      ctx.font = `italic bold ${18 * scale}px "Brush Script MT", cursive, serif`;
      ctx.fillText("Lucky Tiwari", width - 70 * scale, footerY + 6 * scale);

      ctx.strokeStyle = "#CBD5E1";
      ctx.lineWidth = 1.2 * scale;
      ctx.beginPath();
      ctx.moveTo(width - 210 * scale, footerY + 12 * scale);
      ctx.lineTo(width - 70 * scale, footerY + 12 * scale);
      ctx.stroke();

      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${10.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("Founder & Director", width - 70 * scale, footerY + 26 * scale);

      ctx.fillStyle = "#64748B";
      ctx.font = `400 ${8.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("UpForge Global Ecosystem", width - 70 * scale, footerY + 38 * scale);

      // 10. Download
      const imgUri = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imgUri;
      a.download = `${candidate.replace(/\s+/g, "_")}_UpForge_Certificate.png`;
      a.click();
    } catch (e) {
      console.error("Certificate generation error:", e);
    } finally {
      setIsGeneratingCert(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {!isCompleted ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {/* Header / Tracker */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Technical Assessment
                </span>
              </div>
              <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                Question {currentQuestionIndex + 1} of {questions.length || 1}
              </span>
            </div>

            {/* Question Body */}
            {currentQuestion ? (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-relaxed">
                  {currentQuestion.question || currentQuestion.title}
                </h2>

                <div className="space-y-3 mb-8">
                  {(currentQuestion.options || []).map((option: string, idx: number) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-sm sm:text-base flex items-center justify-between ${
                          isSelected
                            ? "bg-amber-500/10 border-amber-500/80 text-white shadow-lg shadow-amber-500/5"
                            : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                        }`}
                      >
                        <span>{option}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-amber-500 bg-amber-500 text-slate-950"
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
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    {currentQuestionIndex === questions.length - 1
                      ? "Submit Assessment"
                      : "Next Question"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">No questions available in this assessment.</p>
                <button
                  onClick={() => setIsCompleted(true)}
                  className="bg-amber-500 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm"
                >
                  View Result
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Result & Certificate Section */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-400 shadow-inner">
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
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all mb-4 text-sm"
                    />
                    <button
                      onClick={() => {
                        if (studentName.trim()) setNameSubmitted(true);
                      }}
                      disabled={!studentName.trim()}
                      className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm transition-all"
                    >
                      Generate Official Certificate
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {/* Certificate Preview Card */}
                    <div className="bg-white text-slate-950 p-6 rounded-2xl border-2 border-amber-500/50 shadow-xl text-left relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-amber-600" />
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            UpForge Credential
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          Qualified ★
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        This certifies that
                      </p>
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1 mb-2">
                        {studentName}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Has successfully qualified in the <strong>UpForge Technical Assessment</strong>,
                        conducted through the InternAdda Assessment Platform.
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                        <span>Issued by: UpForge Global</span>
                        <span className="font-mono text-slate-700">Signed: Lucky Tiwari</span>
                      </div>
                    </div>

                    <button
                      onClick={handleDownloadCertificate}
                      disabled={isGeneratingCert}
                      className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.99] text-sm disabled:opacity-70"
                    >
                      {isGeneratingCert ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Rendering High-Res Certificate...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Official Certificate (PNG/Print Ready)
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
                  You need at least 60% to qualify for the official certificate. You can retry the assessment anytime.
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
                Explore Startups
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
