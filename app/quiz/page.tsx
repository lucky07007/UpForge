'use client';

import React, { useState } from 'react';
import { QUIZ_REGISTRY, Quiz } from '@/lib/quizData';

export default function QuizPage() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({
    type: null,
    msg: ''
  });

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQIndex(0);
    setScore(0);
    setIsCompleted(false);
    setEmail('');
    setSyncStatus({ type: null, msg: '' });
  };

  const handleAnswer = (optionIndex: number) => {
    if (!activeQuiz) return;

    if (optionIndex === activeQuiz.questions[currentQIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }

    if (currentQIndex + 1 < activeQuiz.questions.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleHubSpotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !activeQuiz) return;

    setIsSubmitting(true);
    setSyncStatus({ type: null, msg: '' });

    try {
      const payload = {
        email,
        upforge_quiz_name: activeQuiz.name,
        upforge_quiz_score: score,
        upforge_quiz_total: activeQuiz.questions.length,
        upforge_quiz_completed_at: new Date().toISOString()
      };

      const res = await fetch('/api/quiz-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSyncStatus({
          type: 'success',
          msg: 'Scorecard HubSpot par successfully sync ho gaya hai!'
        });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: any) {
      setSyncStatus({
        type: 'error',
        msg: 'HubSpot update me error aayi. Kripya backend token check karein.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] w-full py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl">

        {/* 1. LOBBY VIEW (Select Quiz) */}
        {!activeQuiz && (
          <div>
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
                UpForge Assessments
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                Skill & Growth Checkup
              </h1>
              <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
                Test complete kijiye aur apna personalized score seedhe email par paaiye.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {QUIZ_REGISTRY.map((quiz) => (
                <div
                  key={quiz.id}
                  onClick={() => handleStartQuiz(quiz)}
                  className="bg-gray-900/70 border border-gray-800 hover:border-indigo-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1 backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {quiz.badge}
                      </span>
                      <span className="text-xs text-gray-500">{quiz.questions.length} Questions</span>
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2">{quiz.name}</h2>
                    <p className="text-xs text-gray-400 leading-relaxed">{quiz.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400">
                    <span>Start Test</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. ACTIVE QUIZ QUESTIONS VIEW */}
        {activeQuiz && !isCompleted && (
          <div>
            {/* Progress Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-2">
                <span className="text-indigo-400 font-bold uppercase">{activeQuiz.name}</span>
                <span>Question {currentQIndex + 1} of {activeQuiz.questions.length}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-500 h-2 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQIndex + 1) / activeQuiz.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                {activeQuiz.questions[currentQIndex].question}
              </h3>

              <div className="space-y-3">
                {activeQuiz.questions[currentQIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 rounded-xl border border-gray-800 bg-gray-950/60 hover:bg-gray-800 hover:border-indigo-500/40 text-gray-200 text-sm font-medium transition flex items-center justify-between group"
                  >
                    <span>{opt}</span>
                    <span className="w-6 h-6 rounded-full border border-gray-700 group-hover:border-indigo-400 flex items-center justify-center text-[10px] text-gray-400 group-hover:text-indigo-400 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. RESULT & HUBSPOT SUBMISSION VIEW */}
        {activeQuiz && isCompleted && (
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-md shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 text-3xl font-black border border-indigo-500/20">
              🎯
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Quiz Completed!</h2>
            <p className="text-gray-400 text-sm mt-1">{activeQuiz.name}</p>

            <div className="bg-gray-950/70 rounded-xl p-5 border border-gray-800 max-w-xs mx-auto my-6">
              <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">Aapka Final Score</p>
              <div className="text-4xl font-black text-white mt-1">
                <span className="text-indigo-400">{score}</span> / {activeQuiz.questions.length}
              </div>
              <p className="text-xs text-emerald-400 font-medium mt-1">
                {Math.round((score / activeQuiz.questions.length) * 100)}% Accuracy
              </p>
            </div>

            {/* HubSpot Form */}
            <form onSubmit={handleHubSpotSubmit} className="max-w-md mx-auto space-y-4 text-left">
              <label className="block text-xs font-semibold text-gray-300">
                Score aur report save karne ke liye apna email enter karein:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? <span>Saving to HubSpot...</span> : <span>Save & Sync to HubSpot</span>}
              </button>
            </form>

            {/* Success / Error Notification */}
            {syncStatus.msg && (
              <div
                className={`mt-4 text-xs font-medium p-3 rounded-xl max-w-md mx-auto ${
                  syncStatus.type === 'success'
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                }`}
              >
                {syncStatus.msg}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-800">
              <button
                onClick={() => setActiveQuiz(null)}
                className="text-xs text-gray-400 hover:text-white transition font-medium"
              >
                ← Dusra Quiz Try Karein
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
