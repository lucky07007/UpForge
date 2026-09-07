"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ShieldCheck, 
  BrainCircuit, 
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  Download,
  Loader2
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
    if (selectedAnswers[currentQuestionIndex] !== undefined) return;
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

  // Results calculation
  const totalQuestions = activeQuiz.questions.length;
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qIdx, aIdx]) => {
    return acc + (activeQuiz.questions[Number(qIdx)].correctAnswer === aIdx ? 1 : 0);
  }, 0);
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // Live Current Date
  const currentDate = useMemo(() => {
    const d = new Date();
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"
    ];
    return {
      month: months[d.getMonth()],
      day: `${String(d.getDate()).padStart(2, "0")},`,
      year: `${d.getFullYear()}`,
      fullText: `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()}`
    };
  }, []);

  // Premium Canvas Certificate Generator
  const handleDownloadCertificate = async () => {
    if (!candidateName.trim() || typeof window === "undefined") return;
    setIsDownloading(true);

    try {
      const canvas = document.createElement("canvas");
      const scale = 2; // 2x Retina Print Resolution
      const width = 1123 * scale;
      const height = 794 * scale;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const certId = `UF-${currentDate.year}-${Math.floor(1000 + Math.random() * 9000)}`;
      const candidate = candidateName.trim();
      const categoryTitle = activeQuiz.title || "Technical Assessment";

      // 1. Clean Crisp Background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Subtle Executive Radial Glow
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 100 * scale,
        width / 2, height / 2, 580 * scale
      );
      bgGrad.addColorStop(0, "#FCFDFF");
      bgGrad.addColorStop(1, "#F8FAFC");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Double Security Frame (Clean Monochrome)
      ctx.strokeStyle = "#0F172A";
      ctx.lineWidth = 4.5 * scale;
      ctx.strokeRect(34 * scale, 34 * scale, width - 68 * scale, height - 68 * scale);

      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(42 * scale, 42 * scale, width - 84 * scale, height - 84 * scale);

      // 3. Top-Left Live 3-line Date Stack
      ctx.textAlign = "left";
      ctx.fillStyle = "#0F172A";
      ctx.font = `900 ${22 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${2 * scale}px`;
      ctx.fillText(currentDate.month, 65 * scale, 90 * scale);
      ctx.fillText(currentDate.day, 65 * scale, 118 * scale);
      ctx.fillText(currentDate.year, 65 * scale, 146 * scale);

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
          ctx.font = `900 ${26 * scale}px system-ui, -apple-system, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText("UPFORGE", width / 2, 80 * scale);
        }
      } catch {
        ctx.fillStyle = "#0F172A";
        ctx.font = `900 ${26 * scale}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("UPFORGE", width / 2, 80 * scale);
      }

      // 5. Header Titles
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
      ctx.fillStyle = "#64748B";
      ctx.fillText("WE ARE PROUDLY PRESENT THIS TO", width / 2, 240 * scale);

      // 6. Student Name
      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${40 * scale}px "Times New Roman", Times, Georgia, serif`;
      ctx.letterSpacing = "normal";
      ctx.fillText(candidate, width / 2, 298 * scale);

      // 7. Dynamic Paragraph Based on Quiz Taken
      ctx.fillStyle = "#1E293B";
      ctx.font = `700 ${11.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${0.6 * scale}px`;
      ctx.fillText(
        `FOR SUCCESSFULLY QUALIFYING IN THE ${categoryTitle.toUpperCase()}`,
        width / 2,
        352 * scale
      );
      ctx.fillText(
        `WITH A SCORE OF ${scorePercent}%, DEMONSTRATING TECHNICAL COMPETENCE`,
        width / 2,
        372 * scale
      );
      ctx.fillText(
        "THROUGH THE UPFORGE & INTERNADDA ASSESSMENT PLATFORM.",
        width / 2,
        392 * scale
      );

      // 8. Bottom-Left Badge (Track & Category Specific)
      const badgeX = 65 * scale;
      const badgeY = height - 190 * scale;

      ctx.textAlign = "left";
      ctx.fillStyle = "#10B981"; // Emerald green
      ctx.font = `800 ${15 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("Qualified ★", badgeX, badgeY);

      ctx.fillStyle = "#0F172A";
      ctx.font = `900 ${22 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${1 * scale}px`;
      ctx.fillText("UPFORGE", badgeX, badgeY + 28 * scale);

      ctx.font = `700 ${14 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillStyle = "#334155";
      ctx.fillText(categoryTitle, badgeX, badgeY + 49 * scale);

      ctx.font = `800 ${9.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${2 * scale}px`;
      ctx.fillStyle = "#64748B";
      ctx.fillText("FOUNDERS & TALENT NETWORK", badgeX, badgeY + 68 * scale);

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

      // 10. Verification Link
      const verifyY = height - 55 * scale;
      ctx.textAlign = "center";
      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${11 * scale}px system-ui, -apple-system, monospace`;
      ctx.letterSpacing = `${0.5 * scale}px`;
      ctx.fillText(`Verify at: https://verify.upforge.org/${certId}`, width / 2, verifyY);

      // Trigger Direct Download
      const imgUri = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imgUri;
      a.download = `${candidate.replace(/\s+/g, "_")}_${categoryTitle.replace(/\s+/g, "_")}_Certificate.png`;
      a.click();
    } catch (e) {
      console.error("Certificate generation error:", e);
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
                  ? `Congratulations! You qualified in the ${activeQuiz.title} assessment benchmark.`
                  : "Keep honing your technical knowledge! You need 60% or higher to generate your verified certificate of qualification."}
              </p>
            </div>

            {/* Name Input & Download Action if Qualified */}
            {scorePercent >= 60 && (
              <div className="max-w-md mx-auto space-y-4 pt-2">
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

                {/* Live Preview Matching Reference */}
                {candidateName.trim() && (
                  <div className="bg-white text-slate-950 p-6 rounded-2xl border-2 border-slate-800 shadow-xl text-left relative overflow-hidden transition-all">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                      <div className="text-[10px] font-black tracking-widest text-slate-900 leading-tight">
                        {currentDate.month}<br />
                        {currentDate.day}<br />
                        {currentDate.year}
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
                        {candidateName}
                      </h3>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed px-2 font-medium">
                        FOR SUCCESSFULLY QUALIFYING IN THE {activeQuiz.title.toUpperCase()} WITH A SCORE OF {scorePercent}%, DEMONSTRATING TECHNICAL APTITUDE.
                      </p>
                    </div>

                    <div className="flex items-end justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                      <div>
                        <div className="font-extrabold text-slate-900 text-xs">UPFORGE</div>
                        <div className="text-[10px] text-slate-600">{activeQuiz.title} • Founders Network</div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif italic font-bold text-slate-900">Lucky</div>
                        <div className="text-[10px] text-slate-600">UpForge Global</div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleDownloadCertificate}
                  disabled={isDownloading || !candidateName.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95 text-sm"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Rendering High-Res Certificate...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download Official Certificate
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400">
                  Ready to share on LinkedIn, Resume & Portfolio. Verification link embedded.
                </p>
              </div>
            )}

            {/* Control Actions */}
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
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
