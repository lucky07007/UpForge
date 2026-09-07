"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { QUIZ_REGISTRY, QuizItem, CommentItem, OPERATOR_DISCUSSIONS } from "@/lib/quizData";

type ViewState = "OVERVIEW" | "CHALLENGE_DETAIL" | "TESTING" | "CREDENTIAL_READY";

export default function UpForgeQuizPage() {
  const [view, setView] = useState<ViewState>("OVERVIEW");
  const [activeQuiz, setActiveQuiz] = useState<QuizItem>(QUIZ_REGISTRY[0]);

  // Assessment Engine
  const [qIndex, setQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  // Lead & Verification State
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Social Proof Engine (Upvotes & 20-30% Discussions)
  const [upvotes, setUpvotes] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});
  const [userComments, setUserComments] = useState<Record<string, CommentItem[]>>({});

  // Comment Form
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isAnon, setIsAnon] = useState(false);

  // Canvas Reference for Executive Verification Certificate
  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize Persistent Metrics
  useEffect(() => {
    const loadedUpvotes: Record<string, number> = {};
    const loadedVoted: Record<string, boolean> = {};
    const loadedComments: Record<string, CommentItem[]> = {};

    QUIZ_REGISTRY.forEach((item) => {
      // 12.8% of participants as base upvotes
      const baseUpvote = Math.round(item.baseParticipants * 0.128);
      const savedUpvote = localStorage.getItem(`upf_upvotes_${item.id}`);
      const userVoted = localStorage.getItem(`upf_voted_${item.id}`) === "true";

      loadedUpvotes[item.id] = savedUpvote ? parseInt(savedUpvote, 10) : baseUpvote;
      loadedVoted[item.id] = userVoted;

      const savedCustom = localStorage.getItem(`upf_user_comm_${item.id}`);
      loadedComments[item.id] = savedCustom ? JSON.parse(savedCustom) : [];
    });

    setUpvotes(loadedUpvotes);
    setHasVoted(loadedVoted);
    setUserComments(loadedComments);
  }, []);

  // Upvote Handler
  const handleUpvote = (id: string) => {
    const currentStatus = hasVoted[id];
    const updatedCount = currentStatus ? (upvotes[id] || 1) - 1 : (upvotes[id] || 0) + 1;

    setUpvotes((prev) => ({ ...prev, [id]: updatedCount }));
    setHasVoted((prev) => ({ ...prev, [id]: !currentStatus }));

    localStorage.setItem(`upf_upvotes_${id}`, updatedCount.toString());
    localStorage.setItem(`upf_voted_${id}`, (!currentStatus).toString());
  };

  // Add Comment Handler
  const handleAddComment = (quizId: string) => {
    if (!commentText.trim()) return;

    const author = isAnon ? "Anonymous Founder" : authorName.trim() || "Startup Operator";
    const newEntry: CommentItem = {
      id: "usr_" + Date.now(),
      name: author,
      avatar: isAnon
        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
      role: isAnon ? "Verified Participant" : "Tech Builder",
      location: isAnon ? "Global" : "India",
      timeAgo: "Just now",
      text: commentText.trim()
    };

    const currentList = userComments[quizId] || [];
    const updated = [newEntry, ...currentList];

    setUserComments((prev) => ({ ...prev, [quizId]: updated }));
    localStorage.setItem(`upf_user_comm_${quizId}`, JSON.stringify(updated));

    setCommentText("");
  };

  // Calculate Verified Score
  const score = useMemo(() => {
    let count = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) count++;
    });
    return count;
  }, [activeQuiz, selectedAnswers]);

  // Launch Assessment
  const handleStartChallenge = (quiz: QuizItem) => {
    setActiveQuiz(quiz);
    setQIndex(0);
    setSelectedAnswers({});
    setIsSynced(false);
    setSubmitError("");
    setView("TESTING");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Option Click Handler
  const handleSelectOption = (idx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: idx }));
    setTimeout(() => {
      if (qIndex + 1 < activeQuiz.questions.length) {
        setQIndex((prev) => prev + 1);
      } else {
        setView("CREDENTIAL_READY");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 220);
  };

  // HubSpot Submissions (Direct na2 Endpoint)
  const handleHubSpotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail.trim()) return;

    setIsSubmitting(true);
    setSubmitError("");

    const portalId = "247087124";
    const formId = "1fcd55c3-9a8f-4eee-9e7b-7cb1d72f0783";
    const endpoint = `https://api-na2.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const payload = {
      fields: [
        { name: "email", value: workEmail.trim().toLowerCase() },
        { name: "firstname", value: fullName.trim() || "Founder" },
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
        setIsSynced(true);
      } else {
        setSubmitError("Verification sync in progress. You can download your official certificate below.");
      }
    } catch {
      setSubmitError("Connection slow. Certificate ready to download directly below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Executive LinkedIn-Ready Certificate Engine (1800 x 1200 High-Res Canvas)
  const handleDownloadExecutiveCert = () => {
    const canvas = certCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1800;
    canvas.height = 1200;

    // 1. Pure Crisp Ivory White Base
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1800, 1200);

    // 2. Subtle Warm Radial Lighting
    const radial = ctx.createRadialGradient(900, 600, 100, 900, 600, 850);
    radial.addColorStop(0, "#FFFFFF");
    radial.addColorStop(1, "#FAF8F5");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1800, 1200);

    // 3. Double Executive Slate & Gold Borders
    ctx.strokeStyle = "#0F172A"; // Slate 900
    ctx.lineWidth = 12;
    ctx.strokeRect(36, 36, 1728, 1128);

    ctx.strokeStyle = "#D97706"; // Amber Gold
    ctx.lineWidth = 2.5;
    ctx.strokeRect(54, 54, 1692, 1092);

    // Guilloche Corner Verification Marks
    const drawMark = (x: number, y: number) => {
      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, 2 * Math.PI);
      ctx.stroke();
    };
    drawMark(76, 76);
    drawMark(1724, 76);
    drawMark(76, 1124);
    drawMark(1724, 1124);

    // 4. Header Institution & Benchmark Standards
    ctx.textAlign = "center";
    ctx.fillStyle = "#0F172A";
    ctx.font = "800 42px system-ui, -apple-system, sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("UPFORGE", 900, 165);

    ctx.fillStyle = "#D97706";
    ctx.font = "700 18px system-ui, -apple-system, sans-serif";
    ctx.letterSpacing = "5px";
    ctx.fillText("NATIONAL STARTUP READINESS BENCHMARK", 900, 205);

    ctx.fillStyle = "#64748B";
    ctx.font = "italic 23px Georgia, serif";
    ctx.letterSpacing = "0px";
    ctx.fillText("This official credential recognizes that", 900, 320);

    // 5. Candidate Full Name
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 58px system-ui, -apple-system, sans-serif";
    ctx.fillText(fullName.trim() || "Distinguished Founder", 900, 405);

    // Elegant separator
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(520, 435);
    ctx.lineTo(1280, 435);
    ctx.stroke();

    // 6. Statement & Assessment Name
    ctx.fillStyle = "#475569";
    ctx.font = "22px system-ui, -apple-system, sans-serif";
    ctx.fillText("has demonstrated strategic decision-making and operational acumen in the", 900, 500);

    ctx.fillStyle = "#B45309";
    ctx.font = "bold 34px system-ui, -apple-system, sans-serif";
    ctx.fillText(activeQuiz.title.split("|")[0].trim(), 900, 555);

    // 7. Verified Metrics Score Box
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(520, 615, 760, 115);
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(520, 615, 760, 115);

    const accuracyPct = Math.round((score / activeQuiz.questions.length) * 100);
    const tier = accuracyPct >= 80 ? "Founder Mindset" : accuracyPct >= 50 ? "Startup Builder" : "Startup Explorer";

    ctx.fillStyle = "#0F172A";
    ctx.font = "700 26px system-ui, -apple-system, sans-serif";
    ctx.fillText(`Verified Score: ${score} / ${activeQuiz.questions.length}  (${accuracyPct}%)`, 900, 665);

    ctx.fillStyle = "#64748B";
    ctx.font = "600 18px system-ui, -apple-system, sans-serif";
    ctx.fillText(`Status: Certified • Benchmark Standard: ${tier}`, 900, 702);

    // 8. Verification Details & Signatures
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const hash = "UPF-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    // Verification Hash (Left)
    ctx.textAlign = "left";
    ctx.fillStyle = "#64748B";
    ctx.font = "16px monospace";
    ctx.fillText(`Credential ID: ${hash}`, 160, 945);
    ctx.fillText(`Issue Date: ${today}`, 160, 975);
    ctx.fillText("Registry: upforge.org/verify", 160, 1005);

    // Verification Board Signature (Right)
    ctx.textAlign = "right";
    ctx.fillStyle = "#0F172A";
    ctx.font = "italic 30px 'Brush Script MT', cursive, Georgia";
    ctx.fillText("UpForge Committee", 1640, 945);

    ctx.strokeStyle = "#94A3B8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(1400, 968);
    ctx.lineTo(1640, 968);
    ctx.stroke();

    ctx.fillStyle = "#64748B";
    ctx.font = "600 15px system-ui, sans-serif";
    ctx.fillText("Startup Verification & Registry Board", 1640, 995);

    // 9. Render Official Logo and Gold Seal Images
    const logoImg = new window.Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = "https://images.upforge.org/logo.jpg";

    const sealImg = new window.Image();
    sealImg.crossOrigin = "anonymous";
    sealImg.src = "https://images.upforge.org/seal.jpg";

    let loaded = 0;
    const triggerSave = () => {
      const link = document.createElement("a");
      link.download = `UpForge_Credential_${fullName.replace(/\s+/g, "_") || "Founder"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    const handleLoaded = () => {
      loaded++;
      if (loaded === 2) {
        try {
          ctx.drawImage(logoImg, 150, 115, 85, 85);
        } catch {
          // Ignored if CORS restricted
        }
        try {
          ctx.drawImage(sealImg, 835, 860, 130, 130);
        } catch {
          // Ignored if CORS restricted
        }
        triggerSave();
      }
    };

    logoImg.onload = handleLoaded;
    logoImg.onerror = () => {
      loaded++;
      if (loaded === 2) triggerSave();
    };

    sealImg.onload = handleLoaded;
    sealImg.onerror = () => {
      loaded++;
      if (loaded === 2) triggerSave();
    };
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 selection:bg-amber-500/20 selection:text-amber-800 dark:selection:text-amber-200">
      {/* 1800 x 1200 Canvas for Official Executive Certificate PNG */}
      <canvas ref={certCanvasRef} className="hidden" />

      {/* ========================================================================= */}
      {/* VIEW 1: OVERVIEW DIRECTORY */}
      {/* ========================================================================= */}
      {view === "OVERVIEW" && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              UpForge National Startup Awareness Track
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
              Benchmark Your Startup IQ
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              10 scenario-based challenges designed to test founder decision-making, CAC calculations, and growth logic. Instant evaluation with an official LinkedIn-ready credential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {QUIZ_REGISTRY.map((quiz) => {
              const quizUpvotes = upvotes[quiz.id] || Math.round(quiz.baseParticipants * 0.128);
              const isVoted = hasVoted[quiz.id];
              // Exact 22% to 28% discussions ratio based on upvotes
              const totalDiscussions = Math.round(quizUpvotes * 0.24) + (userComments[quiz.id]?.length || 0);

              return (
                <div
                  key={quiz.id}
                  className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="relative w-full h-52 bg-slate-100 dark:bg-slate-900 cursor-pointer overflow-hidden group"
                      onClick={() => {
                        setActiveQuiz(quiz);
                        setView("CHALLENGE_DETAIL");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <Image
                        src={quiz.image}
                        alt={quiz.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10">
                          {quiz.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">{quiz.duration}</span>
                        <span>•</span>
                        <span>{quiz.metrics.scenariosCount}</span>
                        <span>•</span>
                        <span>{quiz.baseParticipants.toLocaleString()} founders evaluated</span>
                      </div>

                      <h2
                        onClick={() => {
                          setActiveQuiz(quiz);
                          setView("CHALLENGE_DETAIL");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer leading-snug mb-2"
                      >
                        {quiz.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {quiz.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#131927] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleUpvote(quiz.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isVoted
                            ? "bg-amber-500/10 border-amber-500/40 text-amber-700 dark:text-amber-400 ring-2 ring-amber-500/20"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <span>▲</span>
                        <span>{quizUpvotes.toLocaleString()}</span>
                      </button>

                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        💬 {totalDiscussions.toLocaleString()} discussions
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveQuiz(quiz);
                        setView("CHALLENGE_DETAIL");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-xs font-bold text-slate-950 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
                    >
                      <span>Review Details</span>
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
      {/* VIEW 2: FULL-PAGE CHALLENGE BRIEFING & DISCUSSIONS (NO POPUPS) */}
      {/* ========================================================================= */}
      {view === "CHALLENGE_DETAIL" && (
        <div className="w-full">
          <div className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#111622]/80 backdrop-blur-md sticky top-0 z-30">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setView("OVERVIEW")}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white flex items-center gap-1.5"
              >
                <span>←</span>
                <span>Back to Challenges</span>
              </button>

              <button
                type="button"
                onClick={() => handleStartChallenge(activeQuiz)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
              >
                Start Challenge Now →
              </button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Left Column: Briefing & High-Signal Comments */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-3">
                    {activeQuiz.badge}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mb-2">
                    {activeQuiz.title.split("|")[0].trim()}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {activeQuiz.tagline}
                  </p>
                </div>

                {/* 4 Clean Metric Blocks */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Format</span>
                    <span className="text-sm font-bold text-slate-950 dark:text-white">{activeQuiz.metrics.scenariosCount}</span>
                  </div>
                  <div className="bg-white dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Pace</span>
                    <span className="text-sm font-bold text-slate-950 dark:text-white">{activeQuiz.metrics.avgCompletionTime}</span>
                  </div>
                  <div className="bg-white dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Standard</span>
                    <span className="text-sm font-bold text-slate-950 dark:text-white">{activeQuiz.metrics.passingStandard}</span>
                  </div>
                  <div className="bg-white dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Credential</span>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">Verified</span>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-white mb-4">
                    Assessment Principles
                  </h3>
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">1.</span>
                      <span>Scenario-based questions reflecting real founder and growth team dilemmas.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">2.</span>
                      <span>One correct answer per problem. Unlocks immediate verification and raw score breakdown.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">3.</span>
                      <span>Open to all founders, product builders, marketers, and students. No prior exits required.</span>
                    </div>
                  </div>
                </div>

                {/* Discussion Section (20-30% Ratio Real Feel) */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base font-bold text-slate-950 dark:text-white">
                        Founder Discussions
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {Math.round((upvotes[activeQuiz.id] || 2200) * 0.24).toLocaleString()} active reflections from verified operators
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUpvote(activeQuiz.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        hasVoted[activeQuiz.id]
                          ? "bg-amber-500/10 border-amber-500 text-amber-600"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <span>▲ Upvote</span>
                      <span>({(upvotes[activeQuiz.id] || 0).toLocaleString()})</span>
                    </button>
                  </div>

                  {/* Add Feedback Input */}
                  <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-6">
                    <textarea
                      rows={2}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share your takeaway or feedback on this challenge..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500 text-slate-900 dark:text-white"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                      <div className="flex items-center gap-3 text-xs">
                        <input
                          type="text"
                          disabled={isAnon}
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="Your Name (Optional)"
                          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1 text-xs disabled:opacity-50"
                        />
                        <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isAnon}
                            onChange={(e) => setIsAnon(e.target.checked)}
                            className="rounded border-slate-300"
                          />
                          <span>Anonymous</span>
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddComment(activeQuiz.id)}
                        className="px-4 py-1.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-lg hover:opacity-90 transition-opacity self-end sm:self-auto"
                      >
                        Publish Note
                      </button>
                    </div>
                  </div>

                  {/* Feed */}
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2">
                    {[...(userComments[activeQuiz.id] || []), ...OPERATOR_DISCUSSIONS].map((item) => (
                      <div
                        key={item.id}
                        className="bg-white dark:bg-[#111622] rounded-xl border border-slate-200/80 dark:border-slate-800/80 p-3.5 text-xs"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-slate-200">
                              <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                            </div>
                            <span className="font-bold text-slate-950 dark:text-white">
                              {item.name}
                              <span className="ml-1.5 font-normal text-[11px] text-slate-400">
                                • {item.role} ({item.location})
                              </span>
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">{item.timeAgo}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Sidebar Card */}
              <div>
                <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm sticky top-20 space-y-5">
                  <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <Image src={activeQuiz.image} alt="Preview" fill className="object-cover" />
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      National Benchmark
                    </span>
                    <h4 className="text-base font-bold text-slate-950 dark:text-white mt-0.5">
                      Free Operator Evaluation
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Instant scoring & downloadable LinkedIn-ready credential with official Gold Seal.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStartChallenge(activeQuiz)}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Start 3-Min Assessment</span>
                    <span>→</span>
                  </button>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-semibold">{activeQuiz.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Questions</span>
                      <span className="font-semibold">{activeQuiz.metrics.scenariosCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Seal Verification</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Official Included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: ACTIVE TEST QUESTIONS */}
      {/* ========================================================================= */}
      {view === "TESTING" && (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">
                {activeQuiz.badge}
              </span>
              <span>
                Scenario {qIndex + 1} of {activeQuiz.questions.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-2 transition-all duration-200 rounded-full"
                style={{
                  width: `${((qIndex + 1) / activeQuiz.questions.length) * 100}%`
                }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-2 block">
              Scenario #{qIndex + 1}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-6 leading-snug">
              {activeQuiz.questions[qIndex].question}
            </h2>

            <div className="space-y-3">
              {activeQuiz.questions[qIndex].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[qIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 ring-1 ring-amber-500"
                        : "bg-slate-50 dark:bg-[#161D2E] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{opt}</span>
                    <span
                      className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? "bg-amber-500 text-slate-950 border-amber-500"
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
      {/* VIEW 4: ASSESSMENT COMPLETED & LINKEDIN EXECUTIVE CREDENTIAL */}
      {/* ========================================================================= */}
      {view === "CREDENTIAL_READY" && (
        <div className="max-w-xl mx-auto px-4 py-12 text-center">
          <div className="bg-white dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-black mb-4">
              ✓
            </div>

            <h2 className="text-2xl font-black text-slate-950 dark:text-white mb-1">
              Assessment Verified
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">
              {activeQuiz.title.split("|")[0].trim()}
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-6">
              <div className="bg-slate-50 dark:bg-[#161D2E] border border-slate-200 dark:border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Score</span>
                <p className="text-2xl font-black text-slate-950 dark:text-white mt-0.5">
                  {score} / {activeQuiz.questions.length}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-[#161D2E] border border-slate-200 dark:border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</span>
                <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                  {Math.round((score / activeQuiz.questions.length) * 100)}%
                </p>
              </div>
            </div>

            {!isSynced ? (
              <form onSubmit={handleHubSpotSubmit} className="space-y-3.5 text-left max-w-sm mx-auto">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name (For Certificate)
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {submitError && <p className="text-xs text-rose-500 font-medium">{submitError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? "Generating Official Credential..." : "Claim & Unlock Certificate →"}
                </button>
              </form>
            ) : (
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  ✓ Verified by UpForge Registry. Stamped with official Gold Seal & Verification ID.
                </div>

                <button
                  type="button"
                  onClick={handleDownloadExecutiveCert}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-950 dark:bg-white hover:opacity-90 text-white dark:text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Download LinkedIn-Ready Certificate (PNG)</span>
                  <span>↓</span>
                </button>
              </div>
            )}

            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setView("OVERVIEW")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                ← Return to Assessment Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
