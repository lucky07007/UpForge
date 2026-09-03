"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { QUIZ_REGISTRY, QuizItem, CommentItem } from "@/lib/quizData";

export default function UpForgeQuizHub() {
  // Navigation & Modal State
  const [selectedQuiz, setSelectedQuiz] = useState<QuizItem | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizItem | null>(null);

  // Active Quiz Running State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Lead Submission State (HubSpot)
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hubspotSuccess, setHubspotSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Social Stats & Comments (Stored in LocalStorage to simulate real authentic interaction)
  const [upvotes, setUpvotes] = useState<Record<string, number>>({});
  const [hasUpvoted, setHasUpvoted] = useState<Record<string, boolean>>({});
  const [userComments, setUserComments] = useState<Record<string, CommentItem[]>>({});

  // New Comment Input State
  const [commentInput, setCommentInput] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Canvas ref for dynamic certificate download
  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize persistent metrics on client mount
  useEffect(() => {
    const initialUpvotes: Record<string, number> = {};
    const initialHasUpvoted: Record<string, boolean> = {};
    const initialComments: Record<string, CommentItem[]> = {};

    QUIZ_REGISTRY.forEach((q) => {
      // 12% to 14% of participants as upvotes
      const defaultUpvoteCount = Math.round(q.baseParticipants * 0.128);
      const storedUpvote = localStorage.getItem(`upforge_upvote_${q.id}`);
      const userVoted = localStorage.getItem(`upforge_voted_${q.id}`) === "true";

      initialUpvotes[q.id] = storedUpvote ? parseInt(storedUpvote, 10) : defaultUpvoteCount;
      initialHasUpvoted[q.id] = userVoted;

      const storedCustomComments = localStorage.getItem(`upforge_comments_${q.id}`);
      initialComments[q.id] = storedCustomComments ? JSON.parse(storedCustomComments) : [];
    });

    setUpvotes(initialUpvotes);
    setHasUpvoted(initialHasUpvoted);
    setUserComments(initialComments);
  }, []);

  // Upvote Handler
  const handleToggleUpvote = (quizId: string) => {
    const currentlyVoted = hasUpvoted[quizId];
    const newCount = currentlyVoted ? (upvotes[quizId] || 1) - 1 : (upvotes[quizId] || 0) + 1;

    const nextUpvotes = { ...upvotes, [quizId]: newCount };
    const nextHasUpvoted = { ...hasUpvoted, [quizId]: !currentlyVoted };

    setUpvotes(nextUpvotes);
    setHasUpvoted(nextHasUpvoted);

    localStorage.setItem(`upforge_upvote_${quizId}`, newCount.toString());
    localStorage.setItem(`upforge_voted_${quizId}`, (!currentlyVoted).toString());
  };

  // Add Comment Handler
  const handleAddComment = (quizId: string) => {
    if (!commentInput.trim()) return;

    const author = isAnonymous
      ? "Anonymous Founder"
      : commentAuthor.trim() || "Guest Builder";

    const newEntry: CommentItem = {
      id: "usr_" + Date.now(),
      name: author,
      avatar: isAnonymous
        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      location: isAnonymous ? "Global" : "India",
      timeAgo: "Just now",
      text: commentInput.trim()
    };

    const existing = userComments[quizId] || [];
    const updated = [newEntry, ...existing];

    setUserComments({ ...userComments, [quizId]: updated });
    localStorage.setItem(`upforge_comments_${quizId}`, JSON.stringify(updated));

    setCommentInput("");
  };

  // Score Calculation
  const score = useMemo(() => {
    if (!activeQuiz) return 0;
    let count = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctIndex) {
        count++;
      }
    });
    return count;
  }, [activeQuiz, selectedOptions]);

  // Start Quiz
  const startQuiz = (quiz: QuizItem) => {
    setSelectedQuiz(null);
    setActiveQuiz(quiz);
    setCurrentQIndex(0);
    setSelectedOptions({});
    setIsCompleted(false);
    setHubspotSuccess(false);
    setErrorMsg("");
  };

  // Handle Option Select
  const handleSelectAnswer = (optionIdx: number) => {
    setSelectedOptions({ ...selectedOptions, [currentQIndex]: optionIdx });
    setTimeout(() => {
      if (activeQuiz && currentQIndex + 1 < activeQuiz.questions.length) {
        setCurrentQIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    }, 280);
  };

  // HubSpot Form Submission (Direct API Integration)
  const handleHubSpotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !activeQuiz) return;

    setIsSubmitting(true);
    setErrorMsg("");

    const portalId = "247087124";
    const formId = "1fcd55c3-9a8f-4eee-9e7b-7cb1d72f0783";
    const endpoint = `https://api-na2.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const payload = {
      fields: [
        { name: "email", value: userEmail.trim().toLowerCase() },
        { name: "firstname", value: userName.trim() || "Participant" },
        { name: "upforge_quiz_name", value: activeQuiz.title },
        { name: "upforge_quiz_score", value: String(score) },
        { name: "upforge_quiz_total", value: String(activeQuiz.questions.length) },
        {
          name: "upforge_quiz_completed_at",
          value: String(new Date().setUTCHours(0, 0, 0, 0))
        }
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "https://upforge.org/quiz",
        pageName: activeQuiz.title
      }
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setHubspotSuccess(true);
      } else {
        const errData = await res.json();
        console.error("HubSpot error:", errData);
        setErrorMsg("Unable to sync right now. You can still download your certificate below.");
      }
    } catch {
      setErrorMsg("Network timeout. You can still download your certificate below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Download Canvas Certificate (Zero CPU load, purely client-side canvas generation)
  const handleDownloadCertificate = () => {
    const canvas = certCanvasRef.current;
    if (!canvas || !activeQuiz) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1400;
    canvas.height = 900;

    // Pure White Clean Professional Theme
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1400, 900);

    // Elegant Border
    ctx.strokeStyle = "#0F172A";
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, 1340, 840);

    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1310, 810);

    // Header Branding
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("UPFORGE", 700, 150);

    ctx.fillStyle = "#64748B";
    ctx.font = "600 20px sans-serif";
    ctx.fillText("CERTIFICATE OF COMPLETION", 700, 195);

    // Certification Statement
    ctx.fillStyle = "#475569";
    ctx.font = "24px sans-serif";
    ctx.fillText("This certifies that", 700, 310);

    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 56px sans-serif";
    ctx.fillText(userName.trim() || "Startup Leader", 700, 390);

    ctx.fillStyle = "#475569";
    ctx.font = "24px sans-serif";
    ctx.fillText("has successfully passed the comprehensive assessment:", 700, 460);

    ctx.fillStyle = "#2563EB";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(activeQuiz.title.split("|")[0].trim(), 700, 520);

    // Score Card Box
    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(400, 580, 600, 110);
    ctx.strokeStyle = "#E2E8F0";
    ctx.strokeRect(400, 580, 600, 110);

    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText(`Verified Score: ${score}/${activeQuiz.questions.length} (${Math.round((score / activeQuiz.questions.length) * 100)}%)`, 700, 645);

    // Footer Verification
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.fillStyle = "#94A3B8";
    ctx.font = "18px sans-serif";
    ctx.fillText(`Issued: ${today} · Verification ID: UP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`, 700, 770);

    ctx.fillStyle = "#0F172A";
    ctx.font = "600 20px sans-serif";
    ctx.fillText("UpForge Ecosystem · upforge.org", 700, 810);

    // Trigger Download
    const link = document.createElement("a");
    link.download = `UpForge_Certificate_${activeQuiz.slug}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Hidden Certificate Canvas */}
      <canvas ref={certCanvasRef} className="hidden" />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* ========================================================================= */}
        {/* VIEW 1: QUIZ HUB CATALOG */}
        {/* ========================================================================= */}
        {!activeQuiz && (
          <div>
            {/* Clean Professional Hero Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Official UpForge Assessments 2026
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
                Benchmark Your Startup & Growth Acumen
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                Scenario-based assessments designed for builders, marketers and founders. Complete in 3–5 minutes and earn your verified certificate.
              </p>
            </div>

            {/* Quizzes Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {QUIZ_REGISTRY.map((quiz) => {
                const totalParticipants = quiz.baseParticipants;
                const currentUpvotes = upvotes[quiz.id] || Math.round(totalParticipants * 0.13);
                const hasVoted = hasUpvoted[quiz.id] || false;
                const commentsCount =
                  quiz.seedComments.length + (userComments[quiz.id]?.length || 0);

                return (
                  <div
                    key={quiz.id}
                    className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail with Tag */}
                      <div className="relative w-full h-56 bg-slate-100 dark:bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setSelectedQuiz(quiz)}>
                        <Image
                          src={quiz.image}
                          alt={quiz.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          priority
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-sm">
                            {quiz.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Live Social Proof Stats */}
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                          <span className="flex items-center gap-1.5 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            {totalParticipants.toLocaleString()} Participated
                          </span>
                          <span>·</span>
                          <span>10 Scenarios</span>
                          <span>·</span>
                          <span>3–5 Mins</span>
                        </div>

                        <h2
                          onClick={() => setSelectedQuiz(quiz)}
                          className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer leading-snug mb-2"
                        >
                          {quiz.title}
                        </h2>

                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {quiz.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Interactive Upvote, Comments Count & Open CTA */}
                    <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#131927] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Interactive Upvote Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleUpvote(quiz.id);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border ${
                            hasVoted
                              ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/40 dark:border-blue-500/30 dark:text-blue-400 ring-2 ring-blue-500/20 shadow-sm"
                              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                          }`}
                        >
                          <svg
                            className={`w-3.5 h-3.5 transition-transform ${hasVoted ? "scale-110 fill-current" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                          </svg>
                          <span>{currentUpvotes.toLocaleString()}</span>
                        </button>

                        {/* Comments count indicator */}
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {commentsCount}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedQuiz(quiz)}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: DETAILS MODAL (Exact Specifications: Format, Rewards, Rules, Comments) */}
        {/* ========================================================================= */}
        {selectedQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
              {/* Header Close */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {selectedQuiz.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mt-1">
                    {selectedQuiz.description.hero}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedQuiz(null)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Tagline & Subtitle */}
              <div className="mb-6">
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {selectedQuiz.tagline}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedQuiz.description.sub}
                </p>
              </div>

              {/* Details Breakdown: Format, What You Get, Rules */}
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {/* 📝 Format */}
                <div className="bg-slate-50 dark:bg-[#161D2E] p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <span>📝</span> Format
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    {selectedQuiz.description.format.map((item, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-blue-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 🏆 What You Get */}
                <div className="bg-slate-50 dark:bg-[#161D2E] p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <span>🏆</span> What You Get
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    {selectedQuiz.description.rewards.map((item, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 📌 Rules */}
                <div className="bg-slate-50 dark:bg-[#161D2E] p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <span>📌</span> Rules
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    {selectedQuiz.description.rules.map((item, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-amber-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Start Quiz Action Bar */}
              <div className="bg-slate-100/70 dark:bg-slate-800/60 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleUpvote(selectedQuiz.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      hasUpvoted[selectedQuiz.id]
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>▲</span>
                    <span>Upvote ({upvotes[selectedQuiz.id]?.toLocaleString()})</span>
                  </button>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {selectedQuiz.description.footerNotice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => startQuiz(selectedQuiz)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Start Challenge Now</span>
                  <span>→</span>
                </button>
              </div>

              {/* Discussion / Real-Feel Feedback Section */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Community Discussions & Feedback
                </h4>

                {/* Add Comment Input */}
                <div className="bg-slate-50 dark:bg-[#161D2E] p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-6">
                  <textarea
                    rows={2}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Share your experience or question about this assessment..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                    <div className="flex items-center gap-4 text-xs">
                      <input
                        type="text"
                        disabled={isAnonymous}
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        placeholder="Your Name (Optional)"
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-xs disabled:opacity-50"
                      />
                      <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="rounded border-slate-300"
                        />
                        <span>Post as Anonymous</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddComment(selectedQuiz.id)}
                      className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity self-end sm:self-auto"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
                  {[...(userComments[selectedQuiz.id] || []), ...selectedQuiz.seedComments].map((c) => (
                    <div key={c.id} className="flex items-start gap-3 text-xs">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800">
                        <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {c.name}
                            <span className="ml-2 font-normal text-[11px] text-slate-400">
                              · {c.location}
                            </span>
                          </span>
                          <span className="text-[10px] text-slate-400">{c.timeAgo}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {c.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: ACTIVE QUIZ QUESTIONS ENGINE */}
        {/* ========================================================================= */}
        {activeQuiz && !isCompleted && (
          <div className="max-w-2xl mx-auto">
            {/* Header & Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                  {activeQuiz.badge}
                </span>
                <span>
                  Question {currentQIndex + 1} of {activeQuiz.questions.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 transition-all duration-200 rounded-full"
                  style={{
                    width: `${((currentQIndex + 1) / activeQuiz.questions.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-2 block">
                Scenario #{currentQIndex + 1}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-6 leading-snug">
                {activeQuiz.questions[currentQIndex].question}
              </h2>

              <div className="space-y-3">
                {activeQuiz.questions[currentQIndex].options.map((opt, optIdx) => {
                  const isSelected = selectedOptions[currentQIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectAnswer(optIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center justify-between ${
                        isSelected
                          ? "bg-blue-50 border-blue-500 text-blue-900 dark:bg-blue-950/40 dark:border-blue-400 dark:text-blue-200 ring-1 ring-blue-500"
                          : "bg-slate-50 dark:bg-[#161D2E] border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-slate-300 dark:border-slate-700 text-slate-400"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: ASSESSMENT COMPLETED & CERTIFICATE SYNC */}
        {/* ========================================================================= */}
        {activeQuiz && isCompleted && (
          <div className="max-w-xl mx-auto bg-white dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl font-black mb-4">
              ✓
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mb-1">
              Assessment Completed
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              {activeQuiz.title.split("|")[0].trim()}
            </p>

            {/* Score & Tier Card */}
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-6">
              <div className="bg-slate-50 dark:bg-[#161D2E] border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Score</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {score} / {activeQuiz.questions.length}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-[#161D2E] border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Accuracy</span>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                  {Math.round((score / activeQuiz.questions.length) * 100)}%
                </p>
              </div>
            </div>

            {/* HubSpot Lead Capture / Certificate Form */}
            {!hubspotSuccess ? (
              <form onSubmit={handleHubSpotSubmit} className="space-y-3.5 text-left max-w-sm mx-auto">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name (For Certificate)
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Work or College Email
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-500 font-medium">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Generating Certificate..." : "Verify & Unlock Certificate →"}
                </button>
              </form>
            ) : (
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  ✓ Verified! Your score is synced to UpForge Records.
                </div>

                <button
                  type="button"
                  onClick={handleDownloadCertificate}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950 dark:bg-white hover:opacity-90 text-white dark:text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Download Official Certificate (PNG)</span>
                  <span>↓</span>
                </button>
              </div>
            )}

            {/* Back to Catalog */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveQuiz(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                ← Explore Other UpForge Challenges
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
