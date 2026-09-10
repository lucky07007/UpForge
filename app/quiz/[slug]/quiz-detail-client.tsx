"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { auth, googleProvider, db } from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User,
  getIdToken,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, RotateCcw, Clock, AlertCircle, CheckCircle2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { QuizComments } from "@/components/quiz/quiz-comments";

export function QuizDetailClient({ quiz }: { quiz: any }) {
  // ============ Auth State ============
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // ============ Quiz State ============
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  // ============ Timer State (FIX #1: Time Tracking) ============
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ============ Leaderboard State ============
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [leaderboardError, setLeaderboardError] = useState<string>("");
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  // ============ Score Submission State ============
  const [savingScore, setSavingScore] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [quizResult, setQuizResult] = useState<any>(null);

  // ============ Quiz Initialization ============
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ============ Timer Management (FIX #1: Time Tracking) ============
  useEffect(() => {
    if (!isFinished && quiz?.slug) {
      if (!startTime) {
        setStartTime(Date.now());
      } else {
        timerIntervalRef.current = setInterval(() => {
          setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isFinished, quiz?.slug, startTime]);

  // ============ Format Time Display ============
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ============ Fetch Leaderboard with Error Handling (FIX #6: Error Display) ============
  const fetchLeaderboard = useCallback(async () => {
    setLeaderboardLoading(true);
    setLeaderboardError("");
    try {
      const q = query(
        collection(db, "quiz_leaderboard"),
        where("quizSlug", "==", quiz?.slug || ""),
        orderBy("score", "desc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setLeaderboard(list);
    } catch (err: any) {
      console.error("Leaderboard fetch error:", err);
      // FIX #2: Better error handling for missing Firestore composite index
      if (err.code === "failed-precondition") {
        setLeaderboardError("Leaderboard is being set up. Please refresh in a moment.");
      } else {
        setLeaderboardError("Could not load leaderboard. Retrying...");
      }
      // Auto-retry after 3 seconds
      setTimeout(() => fetchLeaderboard(), 3000);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [quiz?.slug]);

  useEffect(() => {
    if (quiz?.slug) {
      fetchLeaderboard();
    }
  }, [quiz?.slug, fetchLeaderboard]);

  // ============ Authentication Handlers ============
  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    try {
      setAuthError("");
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in successfully!");
    } catch (err: any) {
      const message = err.message || "Failed to sign in with Google";
      setAuthError(message);
      toast.error(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailAuth = async (isSignUp: boolean) => {
    setAuthLoading(true);
    try {
      setAuthError("");
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      toast.success(isSignUp ? "Account created!" : "Signed in!");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      const message = err.message || "Authentication failed";
      setAuthError(message);
      toast.error(message);
    } finally {
      setAuthLoading(false);
    }
  };

  // ============ Quiz Answer Validation (FIX #4: Consistent Answer Field) ============
  const getCorrectAnswerIndex = (q: any): number => {
    if (!q) return -1;
    // Standardized field: correctIndex
    if (typeof q.correctIndex === "number") return q.correctIndex;
    // Fallbacks for data compatibility
    if (typeof q.correctAnswer === "number") return q.correctAnswer;
    if (typeof q.answer === "number") return q.answer;
    if (typeof q.correctOption === "number") return q.correctOption;
    if (typeof q.correct === "number") return q.correct;
    // String-to-index conversion
    if (typeof q.answer === "string" && Array.isArray(q.options)) {
      return q.options.indexOf(q.answer);
    }
    console.warn("Question missing correct answer field:", q);
    return -1;
  };

  const questions: any[] = Array.isArray(quiz?.questions) ? quiz.questions : [];
  const currentQ = questions[currentIndex];

  // ============ Quiz Navigation ============
  const handleNext = () => {
    if (selectedOption === null || !currentQ) return;

    const correctIdx = getCorrectAnswerIndex(currentQ);
    const isCorrect = selectedOption === correctIdx;

    // Record answer
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = selectedOption;
    setSelectedAnswers(newAnswers);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      // Quiz finished
      setIsFinished(true);
      submitScore(isCorrect ? score + 1 : score);
    }
  };

  // ============ Score Submission (FIX #5: Use API Endpoint Instead of Direct Firestore Write) ============
  const submitScore = async (finalScore: number) => {
    setSavingScore(true);
    setSubmitError("");

    try {
      // FIX #7: Enforce Authentication Before Submission
      if (!user) {
        setSavingScore(false);
        toast.error("Please sign in to save your score");
        return;
      }

      // Get valid token
      const token = await getIdToken(user);

      // FIX #5: Call proper API endpoint with authentication
      const response = await fetch("/api/quiz/complete", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: quiz?.id || quiz?.slug,
          answers: selectedAnswers,
          timeTaken: elapsedSeconds,
          fullName: user.displayName || user.email?.split("@")[0] || "Founder",
          email: user.email,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit quiz");
      }

      // FIX #8: Use API Response Data (XP, Certificate, etc)
      const data = await response.json();
      setQuizResult(data);

      await fetchLeaderboard();

      toast.success(`Score saved! ${data.xpAwarded > 0 ? `+${data.xpAwarded} XP` : "Great effort!"}`);
    } catch (err: any) {
      const message = err.message || "Error saving score";
      setSubmitError(message);
      toast.error(message);
      console.error("Score submission error:", err);
    } finally {
      setSavingScore(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswers([]);
    setStartTime(null);
    setElapsedSeconds(0);
    setQuizResult(null);
    setSubmitError("");
  };

  const shareResult = () => {
    const text = `I scored ${score}/${questions.length} on ${quiz?.title}! 🎯`;
    if (navigator.share) {
      navigator.share({
        title: quiz?.title,
        text,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Result copied to clipboard!");
    }
  };

  const quizDesc = quiz?.description || quiz?.summary || quiz?.subtitle || "";
  const totalTime = quiz?.duration || "3-5";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* ============ Quiz Card ============ */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold tracking-tight">{quiz?.title}</CardTitle>
              {quizDesc ? (
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  {quizDesc}
                </CardDescription>
              ) : null}
            </div>
            {!isFinished && (
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4" />
                {formatTime(elapsedSeconds)}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isFinished ? (
            currentQ ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span>
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span>Score: {score}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-lg font-medium">{currentQ.question}</h3>

                <div className="grid grid-cols-1 gap-3">
                  {(currentQ.options || []).map((opt: string, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedOption(idx)}
                      className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 ${
                        selectedOption === idx
                          ? "border-primary bg-primary/10 font-medium text-foreground ring-1 ring-primary"
                          : "border-border/70 hover:bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="gap-2"
                  >
                    {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No questions found.</p>
            )
          ) : (
            // FIX #7: Results Section with Enhanced Feedback
            <div className="text-center py-6 space-y-6">
              <div className="space-y-3">
                <Trophy className="w-12 h-12 mx-auto text-amber-500 animate-bounce" />
                <h3 className="text-2xl font-bold">Quiz Completed!</h3>

                {quizResult?.passed ? (
                  <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    Passed! 🎉
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-amber-600 font-semibold">
                    <AlertCircle className="w-5 h-5" />
                    {quizResult?.passed === false ? "Keep Learning!" : ""}
                  </div>
                )}
              </div>

              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-muted-foreground">
                  You scored <span className="font-bold text-foreground text-lg">{score}</span> out of{" "}
                  <span className="font-bold text-foreground text-lg">{questions.length}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {quizResult?.percentage}% - {quizResult?.percentage >= 70 ? "Excellent!" : "Good effort!"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Completed in {formatTime(elapsedSeconds)}
                </p>

                {/* FIX #8: Display XP and Certificate */}
                {quizResult?.xpAwarded > 0 && (
                  <p className="text-sm font-semibold text-amber-600">
                    +{quizResult.xpAwarded} XP {quizResult.isFirstAttempt && "🌟 First Attempt Bonus!"}
                  </p>
                )}

                {quizResult?.certId && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs font-semibold text-green-700">
                      ✓ Certificate Earned: {quizResult.certId}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Share your achievement!
                    </p>
                  </div>
                )}
              </div>

              {/* Authentication Check Before Saving (FIX #7) */}
              {!user && (
                <div className="p-4 border rounded-xl bg-blue-50/50 border-blue-200 max-w-sm mx-auto space-y-3">
                  <p className="text-sm font-semibold text-blue-900">
                    Sign in to save your score to the leaderboard
                  </p>

                  <div className="space-y-2">
                    <Button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={authLoading}
                      variant="outline"
                      className="w-full text-sm"
                    >
                      {authLoading ? "Signing in..." : "Sign in with Google"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/30" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-blue-50 px-2 text-muted-foreground">or</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg"
                      />
                      <Button
                        type="button"
                        onClick={() => handleEmailAuth(true)}
                        disabled={authLoading || !email || !password}
                        variant="secondary"
                        className="w-full text-xs"
                      >
                        {authLoading ? "Creating..." : "Create Account"}
                      </Button>
                    </div>
                  </div>

                  {authError && <p className="text-xs text-red-600">{authError}</p>}
                </div>
              )}

              {/* FIX #6: Error Display for Score Submission */}
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{submitError}</p>
                  <Button
                    type="button"
                    onClick={() => submitScore(score)}
                    size="sm"
                    variant="outline"
                    className="mt-2 text-xs"
                  >
                    Retry
                  </Button>
                </div>
              )}

              <div className="flex gap-2 justify-center">
                <Button
                  type="button"
                  onClick={shareResult}
                  variant="outline"
                  className="gap-2 text-sm"
                  disabled={!user}
                >
                  <Share2 className="w-4 h-4" /> Share
                </Button>
                <Button
                  type="button"
                  onClick={handleRestart}
                  variant="secondary"
                  className="gap-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ============ Leaderboard Card with Error Handling ============ */}
      <Card className="border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard
            </CardTitle>
            <CardDescription className="text-xs">Top scores for {quiz?.title}</CardDescription>
          </div>
          {leaderboardLoading && (
            <span className="text-xs text-muted-foreground">Loading...</span>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboardError && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-amber-700">{leaderboardError}</p>
                <Button
                  type="button"
                  onClick={() => fetchLeaderboard()}
                  size="sm"
                  variant="outline"
                  className="mt-2 text-xs"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {leaderboard.length === 0 && !leaderboardError ? (
            <p className="text-xs text-muted-foreground py-4 text-center">
              No scores recorded yet. Be the first to top the chart!
            </p>
          ) : (
            <div className="divide-y divide-border/40">
              {leaderboard.map((item, i) => (
                <div key={item.id || i} className="py-2.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 text-center font-bold text-xs ${
                        i === 0
                          ? "text-amber-500"
                          : i === 1
                          ? "text-slate-400"
                          : i === 2
                          ? "text-amber-700"
                          : "text-muted-foreground"
                      }`}
                    >
                      #{i + 1}
                    </span>
                    <span className="font-medium text-foreground">{item.userName}</span>
                  </div>
                  <div className="font-bold text-xs px-2.5 py-1 rounded bg-muted">
                    {item.score} / {item.totalQuestions || questions.length}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ============ Comments Section (FIX #3: Add Comments UI) ============ */}
      {quiz?.id && (
        <QuizComments quizId={quiz.id} quizSlug={quiz.slug} isAuthenticated={!!user} />
      )}
    </div>
  );
}

export default QuizDetailClient;
