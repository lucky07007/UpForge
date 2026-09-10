"use client";

import { useState, useEffect } from "react";
import { auth, googleProvider, db } from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  quiz: {
    id?: string;
    title: string;
    slug: string;
    description?: string;
    questions: Question[];
  };
}

export default function QuizDetailClient({ quiz }: QuizProps) {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [savingScore, setSavingScore] = useState(false);

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch leaderboard for this quiz
  const fetchLeaderboard = async () => {
    try {
      const q = query(
        collection(db, "quiz_leaderboard"),
        where("quizSlug", "==", quiz.slug),
        orderBy("score", "desc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setLeaderboard(list);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [quiz.slug]);

  // Google Sign In
  const handleGoogleLogin = async () => {
    try {
      setAuthError("");
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setAuthError(err.message || "Failed to sign in with Google");
    }
  };

  // Email Sign In / Sign Up
  const handleEmailAuth = async (isSignUp: boolean) => {
    try {
      setAuthError("");
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    }
  };

  const currentQ = quiz.questions?.[currentIndex];

  const handleNext = () => {
    if (selectedOption === null) return;
    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < (quiz.questions?.length || 0)) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      submitScore(score + (selectedOption === currentQ.correctAnswer ? 1 : 0));
    }
  };

  const submitScore = async (finalScore: number) => {
    setSavingScore(true);
    try {
      await addDoc(collection(db, "quiz_leaderboard"), {
        quizSlug: quiz.slug,
        userName: user?.displayName || user?.email?.split("@")[0] || "Anonymous Founder",
        userEmail: user?.email || "",
        score: finalScore,
        totalQuestions: quiz.questions.length,
        createdAt: serverTimestamp(),
      });
      await fetchLeaderboard();
    } catch (err) {
      console.error("Error saving score:", err);
    } finally {
      setSavingScore(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Quiz Card */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">{quiz.title}</CardTitle>
          {quiz.description && (
            <CardDescription className="text-sm text-muted-foreground">
              {quiz.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {!isFinished ? (
            currentQ ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span>
                    Question {currentIndex + 1} of {quiz.questions.length}
                  </span>
                  <span>Score: {score}</span>
                </div>

                <h3 className="text-lg font-medium">{currentQ.question}</h3>

                <div className="grid grid-cols-1 gap-3">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
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
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="gap-2"
                  >
                    {currentIndex + 1 === quiz.questions.length ? "Finish Quiz" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No questions found.</p>
            )
          ) : (
            <div className="text-center py-6 space-y-4">
              <Trophy className="w-12 h-12 mx-auto text-amber-500 animate-bounce" />
              <h3 className="text-2xl font-bold">Quiz Completed!</h3>
              <p className="text-muted-foreground text-sm">
                You scored <span className="font-bold text-foreground">{score}</span> out of{" "}
                {quiz.questions.length}
              </p>

              {!user && (
                <div className="p-4 border rounded-xl bg-muted/20 max-w-sm mx-auto space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Save your score to the official Leaderboard
                  </p>
                  <Button onClick={handleGoogleLogin} variant="outline" className="w-full text-xs">
                    Sign in with Google
                  </Button>
                  {authError && <p className="text-xs text-red-500">{authError}</p>}
                </div>
              )}

              <Button onClick={handleRestart} variant="secondary" className="gap-2 mt-4">
                <RotateCcw className="w-4 h-4" /> Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Leaderboard Section */}
      <Card className="border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard
            </CardTitle>
            <CardDescription className="text-xs">Top scores for {quiz.title}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {leaderboard.length === 0 ? (
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
                    {item.score} / {item.totalQuestions || quiz.questions.length}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
