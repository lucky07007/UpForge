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
import { QUIZ_REGISTRY } from "@/lib/quizData";

// Local types to fix Cloudflare build error
type QuizCategory = string;

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty?: string;
  readMoreLink?: string;
}

export default function QuizDashboard() {
  const registry = QUIZ_REGISTRY as Record<string, { title: string; questions: QuizQuestion[] }>;
  const defaultCategory = Object.keys(registry)[0] || "technical-assessment";

  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(defaultCategory);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeQuiz = registry[selectedCategory] || Object.values(registry)[0];
  const currentQuestion: QuizQuestion = activeQuiz?.questions?.[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < (activeQuiz?.questions?.length || 0) - 1) {
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
  };

  const handleCategoryChange = (cat: QuizCategory) => {
    setSelectedCategory(cat);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const totalQuestions = activeQuiz?.questions?.length || 0;
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qIdx, aIdx]) => {
    return acc + (activeQuiz?.questions?.[Number(qIdx)]?.correctAnswer === aIdx ? 1 : 0);
  }, 0);
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

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
          {Object.entries(registry).map(([catKey, quiz]) => {
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => handleCategoryChange(catKey)}
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
        {!isCompleted && currentQuestion ? (
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
                {currentQuestion.difficulty || "Intermediate"}
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
          /* Completion View */
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
                  ? `Congratulations! You qualified in the ${activeQuiz?.title || "Assessment"} benchmark.`
                  : "Keep honing your technical knowledge! You need 60% or higher to generate your verified certificate of qualification."}
              </p>
            </div>

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
