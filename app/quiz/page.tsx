"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { QUIZ_REGISTRY, QuizItem, CommentItem, getSeededQuizComments } from "@/lib/quizData";

// View Navigation State Machine
type PageView = "CATALOG" | "COURSE_DETAIL" | "QUIZ_ACTIVE" | "RESULT_SCREEN";

export default function UpForgeCoursePlatform() {
  const [currentView, setCurrentView] = useState<PageView>("CATALOG");
  const [selectedQuiz, setSelectedQuiz] = useState<QuizItem>(QUIZ_REGISTRY[0]);

  // Active Assessment Engine
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  
  // Lead & Verification State
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Social Proof & Discussion Engine
  const [upvotes, setUpvotes] = useState<Record<string, number>>({});
  const [hasUpvoted, setHasUpvoted] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, CommentItem[]>>({});
  
  // New Comment Input
  const [commentInput, setCommentInput] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // High-Resolution Certificate Canvas
  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize Persistent Social Proof
  useEffect(() => {
    const loadedUpvotes: Record<string, number> = {};
    const loadedHasVoted: Record<string, boolean> = {};
    const loadedComments: Record<string, CommentItem[]> = {};

    QUIZ_REGISTRY.forEach((q) => {
      // 12.5% to 14% upvote ratio of participants
      const baseUpvote = Math.round(q.baseParticipants * 0.132);
      const savedCount = localStorage.getItem(`upf_upvotes_${q.id}`);
      const savedVoted = localStorage.getItem(`upf_voted_${q.id}`) === "true";

      loadedUpvotes[q.id] = savedCount ? parseInt(savedCount, 10) : baseUpvote;
      loadedHasVoted[q.id] = savedVoted;

      // Seed comments merged with user's local stored comments
      const seeded = getSeededQuizComments(q.id, 8);
      const userCustom = localStorage.getItem(`upf_comments_${q.id}`);
      const parsedCustom: CommentItem[] = userCustom ? JSON.parse(userCustom) : [];
      loadedComments[q.id] = [...parsedCustom, ...seeded];
    });

    setUpvotes(loadedUpvotes);
    setHasUpvoted(loadedHasVoted);
    setCommentsMap(loadedComments);
  }, []);

  // Upvote Action Handler
  const handleToggleUpvote = (quizId: string) => {
    const voted = hasUpvoted[quizId];
    const updatedCount = voted ? (upvotes[quizId] || 1) - 1 : (upvotes[quizId] || 0) + 1;

    setUpvotes({ ...upvotes, [quizId]: updatedCount });
    setHasUpvoted({ ...hasUpvoted, [quizId]: !voted });

    localStorage.setItem(`upf_upvotes_${quizId}`, updatedCount.toString());
    localStorage.setItem(`upf_voted_${quizId}`, (!voted).toString());
  };

  // User Comment Submission
  const handleAddComment = (quizId: string) => {
    if (!commentInput.trim()) return;

    const author = isAnonymous ? "Anonymous Operator" : commentAuthor.trim() || "UpForge Builder";
    const newEntry: CommentItem = {
      id: "usr_" + Date.now(),
      name: author,
      avatar: isAnonymous
        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
      role: isAnonymous ? "Verified Candidate" : "Founder / Practitioner",
      location: isAnonymous ? "Global" : "India",
      timeAgo: "Just now",
      text: commentInput.trim()
    };

    const currentList = commentsMap[quizId] || [];
    const updated = [newEntry, ...currentList];
    setCommentsMap({ ...commentsMap, [quizId]: updated });

    // Store custom comments array
    const userCustomOnly = updated.filter((c) => c.id.startsWith("usr_"));
    localStorage.setItem(`upf_comments_${quizId}`, JSON.stringify(userCustomOnly));

    setCommentInput("");
  };

  // Calculate Verified Score
  const currentScore = useMemo(() => {
    let score = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  }, [selectedQuiz, selectedOptions]);

  // Start Assessment Flow
  const handleStartQuizFlow = (quiz: QuizItem) => {
    setSelectedQuiz(quiz);
    setCurrentQIndex(0);
    setSelectedOptions({});
    setIsSynced(false);
    setErrorMsg("");
    setCurrentView("QUIZ_ACTIVE");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Option Click Handler
  const handleSelectOption = (idx: number) => {
    setSelectedOptions({ ...selectedOptions, [currentQIndex]: idx });
    setTimeout(() => {
      if (currentQIndex + 1 < selectedQuiz.questions.length) {
        setCurrentQIndex((prev) => prev + 1);
      } else {
        setCurrentView("RESULT_SCREEN");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 250);
  };

  // HubSpot Submissions (Direct na2 Endpoint)
  const handleHubspotSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    setIsSubmitting(true);
    setErrorMsg("");

    const portalId = "247087124";
    const formId = "1fcd55c3-9a8f-4eee-9e7b-7cb1d72f0783";
    const endpoint = `https://api-na2.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const payload = {
      fields: [
        { name: "email", value: userEmail.trim().toLowerCase() },
        { name: "firstname", value: userName.trim() || "UpForge Leader" },
        { name: "upforge_quiz_name", value: selectedQuiz.title },
        { name: "upforge_quiz_score", value: String(currentScore) },
        { name: "upforge_quiz_total", value: String(selectedQuiz.questions.length) },
        {
          name: "upforge_quiz_completed_at",
          value: String(new Date().setUTCHours(0, 0, 0, 0))
        }
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "https://upforge.org/quiz",
        pageName: selectedQuiz.title
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
        setErrorMsg("HubSpot verification delayed. You can still download your executive certificate below.");
      }
    } catch {
      setErrorMsg("Network timeout. You can still download your executive certificate below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Executive High-Res Certificate Generation (Canvas)
  const handleDownloadExecutiveCert = () => {
    const canvas = certCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High definition 1800x1200 resolution
    canvas.width = 1800;
    canvas.height = 1200;

    // 1. Solid Ivory White Luxury Base
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1800, 1200);

    // 2. Subtle Warm Gradient Inner Vignette
    const grad = ctx.createRadialGradient(900, 600, 200, 900, 600, 900);
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(1, "#FAF7F2"); // Subtle warm orange-ivory glow
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1800, 1200);

    // 3. Double Gold & Charcoal Executive Borders
    ctx.strokeStyle = "#1E293B"; // Charcoal slate
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, 1720, 1120);

    ctx.strokeStyle = "#D97706"; // Amber-Gold Accent
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, 1680, 1080);

    // Corner Geometric Flourishes
    const drawCornerFlourish = (x: number, y: number) => {
      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, 2 * Math.PI);
      ctx.stroke();
    };
    drawCornerFlourish(80, 80);
    drawCornerFlourish(1720, 80);
    drawCornerFlourish(80, 1120);
    drawCornerFlourish(1720, 1120);

    // 4. Header Titles
    ctx.textAlign = "center";
    ctx.fillStyle = "#0F172A";
    ctx.font = "800 46px system-ui, -apple-system, sans-serif";
    ctx.fillText("UPFORGE ACADEMY", 900, 170);

    ctx.fillStyle = "#D97706";
    ctx.font = "700 19px system-ui, -apple-system, sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("EXECUTIVE CERTIFICATE OF EXCELLENCE", 900, 215);

    ctx.fillStyle = "#64748B";
    ctx.font = "italic 24px Georgia, serif";
    ctx.letterSpacing = "0px";
    ctx.fillText("This is to formally certify that", 900, 340);

    // 5. Candidate Name
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 60px system-ui, -apple-system, sans-serif";
    ctx.fillText(userName.trim() || "Distinguished Founder", 900, 425);

    // Underline beneath name
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(500, 450);
    ctx.lineTo(1300, 450);
    ctx.stroke();

    // 6. Statement & Course Title
    ctx.fillStyle = "#475569";
    ctx.font = "24px system-ui, -apple-system, sans-serif";
    ctx.fillText("has successfully passed the comprehensive evaluation criteria for", 900, 520);

    ctx.fillStyle = "#B45309";
    ctx.font = "bold 36px system-ui, -apple-system, sans-serif";
    ctx.fillText(selectedQuiz.title.split("|")[0].trim(), 900, 580);

    // 7. Verified Metrics Plaque
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(520, 640, 760, 120);
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(520, 640, 760, 120);

    const accuracyPct = Math.round((currentScore / selectedQuiz.questions.length) * 100);
    const tierName =
      accuracyPct >= 80 ? "Founder Mindset" : accuracyPct >= 50 ? "Startup Builder" : "Startup Explorer";

    ctx.fillStyle = "#0F172A";
    ctx.font = "700 28px system-ui, -apple-system, sans-serif";
    ctx.fillText(`Verified Score: ${currentScore} / ${selectedQuiz.questions.length} (${accuracyPct}%)`, 900, 695);

    ctx.fillStyle = "#64748B";
    ctx.font = "600 20px system-ui, -apple-system, sans-serif";
    ctx.fillText(`Evaluation Tier: ${tierName}`, 900, 735);

    // 8. Signatures & Verification Details
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const verificationHash = "UPF-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    // Verification ID Box (Left)
    ctx.textAlign = "left";
    ctx.fillStyle = "#64748B";
    ctx.font = "17px monospace";
    ctx.fillText(`ID: ${verificationHash}`, 180, 950);
    ctx.fillText(`Issued: ${today}`, 180, 980);
    ctx.fillText("Credential URL: upforge.org/verify", 180, 1010);

    // Signature (Right)
    ctx.textAlign = "right";
    ctx.fillStyle = "#0F172A";
    ctx.font = "italic 32px 'Brush Script MT', cursive, Georgia";
    ctx.fillText("UpForge Committee", 1620, 955);

    ctx.strokeStyle = "#94A3B8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(1380, 975);
    ctx.lineTo(1620, 975);
    ctx.stroke();

    ctx.fillStyle = "#64748B";
    ctx.font = "600 16px system-ui, sans-serif";
    ctx.fillText("Academic & Venture Registry Board", 1620, 1000);

    // 9. Load & Stamp Brand Logo and Official Gold Seal
    const sealImg = new window.Image();
    sealImg.crossOrigin = "anonymous";
    sealImg.src = "https://images.upforge.org/seal.jpg";

    const logoImg = new window.Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = "https://images.upforge.org/logo.jpg";

    let loadedCount = 0;
    const finalizeDownload = () => {
      const link = document.createElement("a");
      link.download = `UpForge_Executive_Certificate_${userName.replace(/\s+/g, "_") || "Leader"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    const onImageLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        // Stamp Logo at Top Left
        try {
          ctx.drawImage(logoImg, 160, 120, 90, 90);
        } catch {
          // Fallback if CORS blocked
        }

        // Stamp Official Gold Seal at Center Bottom
        try {
          ctx.drawImage(sealImg, 830, 870, 140, 140);
        } catch {
          // Fallback if CORS blocked
        }

        finalizeDownload();
      }
    };

    sealImg.onload = onImageLoaded;
    sealImg.onerror = () => {
      loadedCount++;
      if (loadedCount === 2) finalizeDownload();
    };

    logoImg.onload = onImageLoaded;
    logoImg.onerror = () => {
      loadedCount++;
      if (loadedCount === 2) finalizeDownload();
    };
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0D14] text-slate-900 dark:text-slate-100 selection:bg-amber-500/20 selection:text-amber-800 dark:selection:text-amber-200">
      {/* Hidden 1800x1200 Canvas for Executive PNG Generation */}
      <canvas ref={certCanvasRef} className="hidden" />

      {/* ========================================================================= */}
      {/* VIEW 1: CATALOG OVERVIEW */}
      {/* ========================================================================= */}
      {currentView === "CATALOG" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              UpForge Executive Assessment Track 2026
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
              Master the Rules of High-Growth Startups
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              Scenario-based challenges designed to test tactical execution, unit metrics, customer psychology and venture fundamentals.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {QUIZ_REGISTRY.map((quiz) => {
              const quizUpvotes = upvotes[quiz.id] || Math.round(quiz.baseParticipants * 0.132);
              const isVoted = hasUpvoted[quiz.id];
              const totalComments = commentsMap[quiz.id]?.length || 8;

              return (
                <div
                  key={quiz.id}
                  className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Course Card Hero Image */}
                    <div
                      className="relative w-full h-56 bg-slate-100 dark:bg-slate-900 cursor-pointer overflow-hidden group"
                      onClick={() => {
                        setSelectedQuiz(quiz);
                        setCurrentView("COURSE_DETAIL");
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
                      <div className="absolute top-4 left-4">
                        <span className="bg-slate-950/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-sm">
                          {quiz.badge}
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">{quiz.duration}</span>
                        <span>•</span>
                        <span>{quiz.level}</span>
                        <span>•</span>
                        <span>{quiz.baseParticipants.toLocaleString()} enrolled</span>
                      </div>

                      <h2
                        onClick={() => {
                          setSelectedQuiz(quiz);
                          setCurrentView("COURSE_DETAIL");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-xl font-bold text-slate-950 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer leading-snug mb-2"
                      >
                        {quiz.title}
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {quiz.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#131927] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Upvote Pill */}
                      <button
                        type="button"
                        onClick={() => handleToggleUpvote(quiz.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isVoted
                            ? "bg-amber-500/10 border-amber-500/40 text-amber-700 dark:text-amber-400 font-bold ring-2 ring-amber-500/20"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xs">▲</span>
                        <span>{quizUpvotes.toLocaleString()}</span>
                      </button>

                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        💬 {totalComments} discussions
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedQuiz(quiz);
                        setCurrentView("COURSE_DETAIL");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-xs font-bold text-slate-950 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
                    >
                      <span>Explore Curriculum</span>
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
      {/* VIEW 2: COURSERA-STYLE FULL-PAGE DETAIL (No Popups!) */}
      {/* ========================================================================= */}
      {currentView === "COURSE_DETAIL" && (
        <div className="w-full">
          {/* Top Banner Navigation */}
          <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] sticky top-0 z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentView("CATALOG")}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white flex items-center gap-2"
              >
                <span>←</span>
                <span>Back to Assessment Catalog</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-400">
                  {selectedQuiz.baseParticipants.toLocaleString()} Verified Participants
                </span>
                <button
                  type="button"
                  onClick={() => handleStartQuizFlow(selectedQuiz)}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-sm"
                >
                  Start Assessment Now
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Course Content (Left 2 Columns) */}
              <div className="lg:col-span-2 space-y-10">
                {/* Hero Title Block */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-3">
                    {selectedQuiz.badge} • UpForge Certified
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight mb-3">
                    {selectedQuiz.overview.heading}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedQuiz.overview.subheading}
                  </p>
                </div>

                {/* What You Will Learn (Coursera Style Grid) */}
                <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-5 flex items-center gap-2">
                    <span className="text-amber-500">✓</span> What You Will Be Evaluated On
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedQuiz.overview.whatYouLearn.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <span className="text-emerald-500 font-bold mt-0.5">✔</span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curriculum & Structure */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    Assessment Format & Integrity Guidelines
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-[#111622] p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Format
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {selectedQuiz.overview.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-[#111622] p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Evaluation Rules
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {selectedQuiz.overview.criteria.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dynamic Community Discussion Section */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      Cohort Discussion ({commentsMap[selectedQuiz.id]?.length || 0})
                    </h3>
                    <span className="text-xs text-slate-400">
                      Active participants across India, US, China & Europe
                    </span>
                  </div>

                  {/* Add Comment Box */}
                  <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 mb-6">
                    <textarea
                      rows={3}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Share your feedback, score experience, or questions with the cohort..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                      <div className="flex items-center gap-4 text-xs">
                        <input
                          type="text"
                          disabled={isAnonymous}
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          placeholder="Your Name (Optional)"
                          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs disabled:opacity-50"
                        />
                        <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="rounded border-slate-300"
                          />
                          <span>Post anonymously</span>
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddComment(selectedQuiz.id)}
                        className="px-5 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-lg hover:opacity-90 transition-all self-end sm:self-auto"
                      >
                        Publish Comment
                      </button>
                    </div>
                  </div>

                  {/* Comments Feed */}
                  <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
                    {(commentsMap[selectedQuiz.id] || []).map((c) => (
                      <div
                        key={c.id}
                        className="bg-white dark:bg-[#111622] rounded-xl border border-slate-200/80 dark:border-slate-800/80 p-4 text-xs"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-slate-200">
                              <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-950 dark:text-white">
                                {c.name}
                                <span className="ml-2 font-normal text-[11px] text-slate-400">
                                  • {c.role} ({c.location})
                                </span>
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400">{c.timeAgo}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-11">
                          {c.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coursera-Style Sticky Sidebar (Right Column) */}
              <div>
                <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-20 space-y-6">
                  {/* Hero Thumbnail Preview */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <Image src={selectedQuiz.image} alt="Course Preview" fill className="object-cover" />
                  </div>

                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                      Standard Credential Track
                    </span>
                    <h4 className="text-lg font-bold text-slate-950 dark:text-white mt-1">
                      Free Online Assessment
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Instant scoring & downloadable LinkedIn-ready verification certificate.
                    </p>
                  </div>

                  {/* Primary CTA */}
                  <button
                    type="button"
                    onClick={() => handleStartQuizFlow(selectedQuiz)}
                    className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Enroll & Start Test</span>
                    <span>→</span>
                  </button>

                  {/* Upvote in Sidebar */}
                  <button
                    type="button"
                    onClick={() => handleToggleUpvote(selectedQuiz.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      hasUpvoted[selectedQuiz.id]
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20"
                        : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>▲ Upvote Challenge</span>
                    <span>({(upvotes[selectedQuiz.id] || 0).toLocaleString()})</span>
                  </button>

                  {/* Course Details Highlights */}
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{selectedQuiz.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Assessment Type</span>
                      <span className="font-semibold text-slate-900 dark:text-white">10 MCQs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Credential</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Verified Certificate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Access</span>
                      <span className="font-semibold text-slate-900 dark:text-white">Lifetime Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: ACTIVE QUIZ QUESTIONS VIEW */}
      {/* ========================================================================= */}
      {currentView === "QUIZ_ACTIVE" && (
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Header Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                {selectedQuiz.badge}
              </span>
              <span>
                Scenario {currentQIndex + 1} of {selectedQuiz.questions.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-2 transition-all duration-250 rounded-full"
                style={{
                  width: `${((currentQIndex + 1) / selectedQuiz.questions.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-2 block">
              Decision Scenario #{currentQIndex + 1}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-6 leading-snug">
              {selectedQuiz.questions[currentQIndex].question}
            </h2>

            <div className="space-y-3">
              {selectedQuiz.questions[currentQIndex].options.map((opt, optIdx) => {
                const isSelected = selectedOptions[currentQIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center justify-between ${
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
      {/* VIEW 4: ASSESSMENT COMPLETED & LINKEDIN EXECUTIVE CERTIFICATE */}
      {/* ========================================================================= */}
      {currentView === "RESULT_SCREEN" && (
        <div className="max-w-xl mx-auto px-4 py-12 text-center">
          <div className="bg-white dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl font-black mb-4">
              ✓
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mb-1">
              Assessment Verified!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              {selectedQuiz.title.split("|")[0].trim()}
            </p>

            {/* Score Summary */}
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-6">
              <div className="bg-slate-50 dark:bg-[#161D2E] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Score</span>
                <p className="text-2xl font-black text-slate-950 dark:text-white mt-0.5">
                  {currentScore} / {selectedQuiz.questions.length}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-[#161D2E] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Accuracy</span>
                <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                  {Math.round((currentScore / selectedQuiz.questions.length) * 100)}%
                </p>
              </div>
            </div>

            {/* Form & Verification */}
            {!isSynced ? (
              <form onSubmit={handleHubspotSync} className="space-y-3.5 text-left max-w-sm mx-auto">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Legal / Professional Name (For Certificate)
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Work or Primary Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {errorMsg && <p className="text-xs text-rose-500 font-medium">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Issuing Official Certificate..." : "Generate & Verify Certificate →"}
                </button>
              </form>
            ) : (
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  ✓ Verified by UpForge Academy! Your certificate is prepared with official Gold Seal & Verification ID.
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

            {/* Navigation back */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentView("CATALOG")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                ← Return to Academy Catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
