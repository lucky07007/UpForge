"use client";

import { useState, useEffect } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  Trophy,
  MessageSquare,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  ThumbsUp,
  RotateCcw,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer?: number;
}

interface QuizData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: string;
  time: string;
  questionsCount?: number;
  image: string;
  questions: QuizQuestion[];
}

export function QuizDetailClient({
  quiz,
  autoStart,
}: {
  quiz: QuizData;
  autoStart: boolean;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Flow views: 'overview' | 'auth' | 'playing' | 'result'
  const [view, setView] = useState<"overview" | "auth" | "playing" | "result">("overview");

  // Registration / Sign In State
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // In-Game Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [submittingResult, setSubmittingResult] = useState(false);

  // Result State
  const [completionData, setCompletionData] = useState<{
    score: number;
    totalQuestions: number;
    percentage: number;
    passed: boolean;
    xpAwarded: number;
    isFirstAttempt: boolean;
    certId: string | null;
  } | null>(null);

  // Discussion & Leaderboard State
  const [activeTab, setActiveTab] = useState<"leaderboard" | "discussions">("leaderboard");
  const [leaderboardType, setLeaderboardType] = useState<"quiz" | "weekly" | "monthly" | "global">("quiz");
  const [leaderboardEntries, setLeaderboardEntries] = useState<any[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  // Discussion State
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      setCurrentUser(usr);
      if (usr && (autoStart || view === "auth")) {
        startQuizSession();
      }
    });
    return () => unsub();
  }, [autoStart]);

  useEffect(() => {
    if (activeTab === "leaderboard") {
      fetchLeaderboard(leaderboardType);
    } else {
      fetchComments();
    }
  }, [activeTab, leaderboardType]);

  const fetchLeaderboard = async (type: string) => {
    setLoadingLeaderboard(true);
    try {
      const res = await fetch(`/api/quiz/leaderboard?type=${type}&quizId=${quiz.id}&limit=10`);
      const data = await res.json();
      if (data.success) {
        setLeaderboardEntries(data.entries || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/quiz/comments?quizId=${quiz.id}&limit=20`);
      const data = await res.json();
      if (data.success) {
        setComments(data.comments || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setAuthSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      startQuizSession();
    } catch (err: any) {
      setAuthError(err.message || "Failed to sign in with Google");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    try {
      if (authMode === "signup") {
        if (!fullName.trim()) {
          throw new Error("Full name is required");
        }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: fullName.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      startQuizSession();
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const startQuizSession = () => {
    setCurrentQIndex(0);
    setUserAnswers(new Array(quiz.questions.length).fill(-1));
    setStartTime(Date.now());
    setView("playing");
  };

  const selectAnswer = (ansIdx: number) => {
    const updated = [...userAnswers];
    updated[currentQIndex] = ansIdx;
    setUserAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setSubmittingResult(true);
    try {
      const timeTaken = Math.round((Date.now() - startTime) / 1000);
      const token = currentUser ? await currentUser.getIdToken() : "";

      const res = await fetch("/api/quiz/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizId: quiz.id,
          answers: userAnswers,
          timeTaken,
          fullName: currentUser?.displayName || fullName,
          email: currentUser?.email || email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCompletionData(data);
        setView("result");
      } else {
        alert(data.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error submitting quiz");
    } finally {
      setSubmittingResult(false);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setView("auth");
      return;
    }
    if (!commentText.trim()) return;

    setCommentSubmitting(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch("/api/quiz/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizId: quiz.id,
          text: commentText,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCommentText("");
        fetchComments();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCommentSubmitting(false);
    }
  };

  const submitReply = async (parentId: string) => {
    if (!currentUser) {
      setView("auth");
      return;
    }
    if (!replyText.trim()) return;

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch("/api/quiz/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizId: quiz.id,
          parentId,
          text: replyText,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReplyParentId(null);
        setReplyText("");
        fetchComments();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLike = async (commentId: string) => {
    if (!currentUser) {
      setView("auth");
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      await fetch("/api/quiz/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizId: quiz.id,
          commentId,
          action: "toggleLike",
        }),
      });
      fetchComments();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-12">
      {view === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-6 space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="text-lg font-bold text-white font-serif">Assessment Framework</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Objective scoring modeled on top accelerator screening benchmarks. Questions cover practical legal, cap-table, and go-to-market calculations.
              </p>
            </div>
            <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-6 space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <h3 className="text-lg font-bold text-white font-serif">Founder XP & Rank</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Earn 10 XP for every correct response on your first verified attempt. Higher subsequent scores update your leaderboard standing.
              </p>
            </div>
            <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-6 space-y-3">
              <Award className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-white font-serif">Verifiable Credential</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Achieve &ge;70% to generate a permanent, shareable UpForge verification ID cryptographically checked at `/verify`.
              </p>
            </div>
          </div>

          <div className="bg-[#0D121F] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-xl font-bold text-white font-serif">Ready to Begin Assessment?</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                You will need to be logged in with your verified founder identity.
              </p>
            </div>
            <button
              onClick={() => (currentUser ? startQuizSession() : setView("auth"))}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] to-[#B38F27] hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentUser ? "Start Benchmark Now" : "Sign In & Start"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {view === "auth" && (
        <div className="max-w-md mx-auto bg-[#0B0F17] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-serif font-bold text-white">
              {authMode === "signup" ? "Create Founder Account" : "Sign In to UpForge"}
            </h3>
            <p className="text-xs text-slate-400">
              Required to record your verified score, award XP, and issue your certificate.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-xs text-red-300">
              {authError}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={authSubmitting}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-3 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 text-xs text-slate-500 uppercase">
            <div className="h-px flex-1 bg-white/10" />
            <span>or use email</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {authMode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vikram Sharma"
                  className="w-full px-3.5 py-2.5 bg-[#06080E] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@startup.com"
                className="w-full px-3.5 py-2.5 bg-[#06080E] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#06080E] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <button
              type="submit"
              disabled={authSubmitting}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#B38F27] text-[#0B0F17] rounded-xl text-sm font-bold transition-colors disabled:opacity-50 cursor-pointer"
            >
              {authSubmitting ? "Authenticating..." : authMode === "signup" ? "Create Account & Start" : "Sign In & Start"}
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === "signup" ? "signin" : "signup")}
              className="text-xs text-slate-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              {authMode === "signup" ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </div>
        </div>
      )}

      {view === "playing" && (
        <div className="max-w-3xl mx-auto bg-[#0B0F17] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Question {currentQIndex + 1} of {quiz.questions.length}
            </span>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <Clock className="w-3.5 h-3.5" />
              <span>Standard Assessment</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-medium text-white leading-relaxed font-serif">
              {quiz.questions[currentQIndex].question}
            </h3>

            <div className="space-y-3 pt-2">
              {quiz.questions[currentQIndex].options.map((option, idx) => {
                const isSelected = userAnswers[currentQIndex] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all flex items-center justify-between border ${
                      isSelected
                        ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                        : "bg-[#06080E]/60 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <span>{option}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                        isSelected ? "border-[#D4AF37] bg-[#D4AF37] text-[#0B0F17]" : "border-white/20 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex((i) => i - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={userAnswers[currentQIndex] === -1 || submittingResult}
              onClick={nextQuestion}
              className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#B38F27] text-[#0B0F17] rounded-xl text-xs font-bold transition-all disabled:opacity-40 cursor-pointer shadow-md shadow-[#D4AF37]/10"
            >
              {submittingResult
                ? "Calculating..."
                : currentQIndex === quiz.questions.length - 1
                ? "Finish & Submit"
                : "Next Question"}
            </button>
          </div>
        </div>
      )}

      {view === "result" && completionData && (
        <div className="max-w-2xl mx-auto bg-[#0B0F17] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl text-center">
          <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10">
            {completionData.passed ? (
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            ) : (
              <XCircle className="w-12 h-12 text-rose-400" />
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-serif font-bold text-white">
              {completionData.passed ? "Certification Benchmark Passed!" : "Assessment Concluded"}
            </h3>
            <p className="text-sm text-slate-400">
              {completionData.passed
                ? "You scored in the top tier of startup founders for this domain."
                : "You did not meet the 70% requirement. Review the answers and retry."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
            <div>
              <p className="text-xs text-slate-400">Score</p>
              <p className="text-2xl font-bold text-white mt-1">
                {completionData.score}/{completionData.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Accuracy</p>
              <p className="text-2xl font-bold text-white mt-1">{completionData.percentage}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Awarded XP</p>
              <p className="text-2xl font-bold text-amber-400 mt-1">+{completionData.xpAwarded}</p>
            </div>
          </div>

          {completionData.passed && completionData.certId && (
            <div className="bg-[#0D121F] border border-[#D4AF37]/30 rounded-xl p-5 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase">Verified Credential Issued</span>
                <Award className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <p className="text-xs font-mono text-slate-300 bg-black/40 p-2.5 rounded-lg border border-white/5 select-all">
                {completionData.certId}
              </p>
              <div className="flex gap-3 pt-1">
                <a
                  href={`/verify?id=${completionData.certId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-2 px-3 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Verify Online
                </a>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={startQuizSession}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Benchmark</span>
            </button>
            <button
              onClick={() => setView("overview")}
              className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B0F17] text-xs font-bold hover:bg-[#B38F27] transition-all cursor-pointer"
            >
              View Leaderboards & Discussion
            </button>
          </div>
        </div>
      )}

      <div className="border border-white/10 rounded-2xl bg-[#0B0F17] overflow-hidden shadow-2xl">
        <div className="flex border-b border-white/10 bg-[#0D121F]">
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`flex-1 py-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === "leaderboard" ? "border-b-2 border-[#D4AF37] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4 text-[#D4AF37]" />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={() => setActiveTab("discussions")}
            className={`flex-1 py-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === "discussions" ? "border-b-2 border-[#D4AF37] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
            <span>Peer Discussion</span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === "leaderboard" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { key: "quiz", label: "This Quiz" },
                  { key: "weekly", label: "Weekly Top (IST)" },
                  { key: "monthly", label: "Monthly Top (IST)" },
                  { key: "global", label: "All-Time XP" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setLeaderboardType(tab.key as any)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      leaderboardType === tab.key
                        ? "bg-[#D4AF37] text-[#0B0F17] font-semibold"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {loadingLeaderboard ? (
                <div className="text-center py-12 text-slate-500 text-xs">Loading standings...</div>
              ) : leaderboardEntries.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No verified completions recorded for this timeframe yet. Be the first to establish the benchmark!
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {leaderboardEntries.map((entry, index) => {
                    const isTop3 = index < 3;
                    return (
                      <div
                        key={entry.uid}
                        className={`flex items-center justify-between py-3.5 px-3 rounded-xl ${
                          isTop3 ? "bg-white/[0.02]" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 text-center text-xs font-bold ${
                              index === 0
                                ? "text-amber-400"
                                : index === 1
                                ? "text-slate-300"
                                : index === 2
                                ? "text-amber-600"
                                : "text-slate-500"
                            }`}
                          >
                            #{index + 1}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-[#1E2538] border border-white/10 flex items-center justify-center text-xs font-bold text-[#D4AF37]">
                            {entry.displayName?.charAt(0)?.toUpperCase() || "F"}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-white">{entry.displayName}</p>
                            {entry.secondary && (
                              <p className="text-[10px] text-slate-400">{entry.secondary}</p>
                            )}
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm font-mono font-bold text-white">
                          {entry.scoreOrXp} {leaderboardType === "quiz" ? "pts" : "XP"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "discussions" && (
            <div className="space-y-6">
              <form onSubmit={submitComment} className="space-y-3">
                <textarea
                  rows={2}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={currentUser ? "Share insights or ask a question about this benchmark..." : "Sign in to post a question or reflection..."}
                  className="w-full px-4 py-3 bg-[#06080E] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={commentSubmitting || !commentText.trim()}
                    className="px-5 py-2 bg-[#D4AF37] hover:bg-[#B38F27] text-[#0B0F17] rounded-xl text-xs font-bold transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    {commentSubmitting ? "Posting..." : "Post Reflection"}
                  </button>
                </div>
              </form>

              {loadingComments ? (
                <div className="text-center py-12 text-slate-500 text-xs">Loading community insights...</div>
              ) : comments.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No comments yet. Start the conversation!
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-white/5">
                  {comments.map((c) => (
                    <div key={c.id} className="pt-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{c.displayName || "Founder"}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(c.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{c.text}</p>
                      <div className="flex items-center gap-4 text-slate-400 pt-1">
                        <button
                          type="button"
                          onClick={() => toggleLike(c.id)}
                          className="flex items-center gap-1.5 hover:text-white cursor-pointer"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{c.likesCount || 0}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setReplyParentId(replyParentId === c.id ? null : c.id)}
                          className="hover:text-white cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>

                      {replyParentId === c.id && (
                        <div className="pl-4 pt-2 flex gap-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a response..."
                            className="flex-1 px-3 py-1.5 bg-[#06080E] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                          <button
                            type="button"
                            onClick={() => submitReply(c.id)}
                            className="px-3 py-1.5 bg-[#D4AF37] text-[#0B0F17] rounded-lg text-xs font-bold"
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
