"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  TrendingUp, 
  ShieldCheck, 
  BrainCircuit, 
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  Share2,
  Download
} from "lucide-react";
import { QUIZ_REGISTRY, QuizCategory, QuizQuestion } from "@/lib/quizData";

export default function QuizDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>("technical-assessment");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Certificate Generation States
  const [candidateName, setCandidateName] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Fallback if category not found
  const activeQuiz = QUIZ_REGISTRY[selectedCategory] || QUIZ_REGISTRY["technical-assessment"];
  const currentQuestion: QuizQuestion = activeQuiz.questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) return; // Prevent changing answer
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setCandidateName("");
  };

  const handleCategoryChange = (cat: QuizCategory) => {
    setSelectedCategory(cat);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setCandidateName("");
  };

  // Calculate Results
  const totalQuestions = activeQuiz.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qIdx, aIdx]) => {
    return acc + (activeQuiz.questions[Number(qIdx)].correctAnswer === aIdx ? 1 : 0);
  }, 0);
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // New High-Quality Certificate Generation matching official reference
  const handleDownloadCertificate = async () => {
    if (!candidateName.trim()) return;
    setIsDownloading(true);

    try {
      const canvas = document.createElement("canvas");
      // 2x Retina Resolution for Ultra Crisp Quality (A4 Landscape: 1123 x 794)
      const scale = 2;
      const width = 1123 * scale;
      const height = 794 * scale;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const certId = `UF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const candidate = candidateName.trim();

      // 1. Premium Luxury Off-white Background
      ctx.fillStyle = "#FAFBFD";
      ctx.fillRect(0, 0, width, height);

      const radialGrad = ctx.createRadialGradient(
        width / 2, height / 2, 120 * scale,
        width / 2, height / 2, 600 * scale
      );
      radialGrad.addColorStop(0, "rgba(240, 246, 255, 0.7)");
      radialGrad.addColorStop(1, "#FAFBFD");
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Double Borders with Amber Gold
      ctx.strokeStyle = "#0F172A";
      ctx.lineWidth = 5 * scale;
      ctx.strokeRect(32 * scale, 32 * scale, width - 64 * scale, height - 64 * scale);

      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(40 * scale, 40 * scale, width - 80 * scale, height - 80 * scale);

      // Corner Accents
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

      // 3. Logo (/logo.jpg)
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

      // 6. Student Candidate Name
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
      ctx.fillText("QUALIFIED ★ AI/ML Intern", width / 2, badgeY + 20 * scale);

      // 9. Footer: Date, Verify URL & Lucky Tiwari Signature
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

      // Center: Credential Verification
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

      // 10. Download Output
      const imgUri = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imgUri;
      a.download = `${candidate.replace(/\s+/g, "_")}_UpForge_Certificate.png`;
      a.click();
    } catch (e) {
      console.error("Certificate download error:", e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 border-t border-slate-100 dark:bg-slate-950 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title & Intro */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            UpForge Founder & Ecosystem Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Startup & Technical Aptitude Quiz
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Test your understanding of valuation, equity, AI models, and regulatory compliance. Earn verified founder qualifications and credentials.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Object.entries(QUIZ_REGISTRY).map(([catKey, quiz]) => {
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => handleCategoryChange(catKey as QuizCategory)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {quiz.title}
              </button>
            );
          })}
        </div>

        {/* Quiz Flow Card */}
        {!isCompleted ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            {/* Question Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span className="capitalize px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {currentQuestion.difficulty}
              </span>
            </div>

            {/* Question Heading */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
                const isCorrect = currentQuestion.correctAnswer === idx;

                let btnStyles = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700";
                
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyles = "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300";
                  } else if (isSelected) {
                    btnStyles = "border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300";
                  } else {
                    btnStyles = "border-slate-100 dark:border-slate-800 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base font-medium transition-all flex items-center justify-between group ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {isAnswered && (
                      <span>
                        {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 ml-2" />}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Contextual Answer Explanation Box */}
            {showExplanation && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-6 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-semibold text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  <BrainCircuit className="w-4 h-4" />
                  Ecosystem Intelligence Explanation
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                {currentQuestion.readMoreLink && (
                  <Link 
                    href={currentQuestion.readMoreLink}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
                  >
                    Read related dossier
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restart Quiz
              </button>

              <button
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 font-bold px-5 py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-sm"
              >
                {currentQuestionIndex === totalQuestions - 1 ? "View Result" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion & Qualified Certificate View */
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-sm">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Assessment Completed!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You correctly answered <span className="font-bold text-slate-900 dark:text-white">{correctCount}</span> out of <span className="font-bold text-slate-900 dark:text-white">{totalQuestions}</span> questions ({scorePercent}%).
              </p>
            </div>

            {/* Performance Verdict */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Credential Status:</span>
                {scorePercent >= 60 ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    Qualified ★
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    Review Required
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {scorePercent >= 60 
                  ? "Congratulations! You have met the benchmark standard required by the UpForge Ecosystem & InternAdda Technical Board."
                  : "Keep honing your technical knowledge! You need 60% or higher to generate your verified certificate of qualification."}
              </p>
            </div>

            {/* Name Input & Download Action if Qualified */}
            {scorePercent >= 60 && (
              <div className="max-w-md mx-auto space-y-3 pt-2">
                <div className="text-left">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Candidate Full Name (For Certificate)
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Ankit Kumar"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  onClick={handleDownloadCertificate}
                  disabled={isDownloading || !candidateName.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95 text-sm"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? "Generating High-Res Certificate..." : "Download Official Certificate"}
                </button>
                <p className="text-[11px] text-slate-400">
                  Ready to share on LinkedIn, Resume, & Portfolios. Includes verification link.
                </p>
              </div>
            )}

            {/* Control Actions */}
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </button>
              <Link
                href="/registry"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors"
              >
                Explore Directory
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
