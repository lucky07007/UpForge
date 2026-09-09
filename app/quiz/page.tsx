//app/quiz/page.tsx

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

  // Canvas Reference for Certificate
  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize Persistent Metrics
  useEffect(() => {
    const loadedUpvotes: Record<string, number> = {};
    const loadedVoted: Record<string, boolean> = {};
    const loadedComments: Record<string, CommentItem[]> = {};

    QUIZ_REGISTRY.forEach((item) => {
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

  // Stable per-completion certificate ID (kept in a ref so download & share use the same one)
  const certIdRef = useRef<string>("");
  useEffect(() => {
    if (view === "CREDENTIAL_READY" && !certIdRef.current) {
      certIdRef.current = "UPF-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    }
    if (view !== "CREDENTIAL_READY") certIdRef.current = "";
  }, [view]);

  // Share copy used across native share + social buttons
  const accuracyPct = Math.round((score / activeQuiz.questions.length) * 100);
  const shareUrl = "https://upforge.org/quiz";
  const shareText = `I scored ${score}/${activeQuiz.questions.length} (${accuracyPct}%) on the ${activeQuiz.title.split("|")[0].trim()} 🚀 Verified by UpForge. Test your own Startup IQ:`;
  const socialLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`
  };

  // Skill tags shown on the certificate, mapped per quiz so the credential reads
  // like a real competency-based certificate (Coursera/Google style) rather than a quiz result.
  const getSkillTags = (quiz: QuizItem): string[] => {
    switch (quiz.id) {
      case "startup-iq-2026":
        return ["Startup Strategy", "Unit Economics", "Customer Validation", "Growth Fundamentals"];
      case "marketing-iq-2026":
        return ["Marketing Strategy", "Conversion Optimization", "Brand Positioning", "Campaign Analytics"];
      case "career-iq-2026":
        return ["Career Planning", "Professional Networking", "Interview Readiness", "Negotiation"];
      case "fundraising-iq-2026":
        return ["Fundraising Strategy", "Cap Table & Equity", "Investor Relations", "Valuation Basics"];
      case "ai-iq-2026":
        return ["AI Literacy", "Prompt Engineering", "Responsible AI Use", "Automation Strategy"];
      default:
        return ["Strategic Thinking", "Applied Problem-Solving", "Decision-Making", "Domain Expertise"];
    }
  };

  // Wraps text across multiple centered lines on canvas (fillText has no native wrapping).
  const wrapCenteredText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    centerX: number,
    startY: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(" ");
    let line = "";
    let y = startY;
    let lines = 0;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      if (ctx.measureText(testLine).width > maxWidth && i > 0) {
        ctx.fillText(line.trim(), centerX, y);
        line = words[i] + " ";
        y += lineHeight;
        lines++;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), centerX, y);
    return lines + 1;
  };

  // Professional White & Blue Certificate Engine (3500 x 2475 — Coursera/Google-style credential)
  // Draws the full certificate onto the hidden canvas, then invokes onReady(canvas)
  // so the same render can be either downloaded or shared natively.
  const renderCertificate = (onReady: (canvas: HTMLCanvasElement) => void) => {
    const canvas = certCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 3500;
    const H = 2475;
    canvas.width = W;
    canvas.height = H;

    const INK = "#1F2937"; // gray-800 (primary text)
    const NAVY = "#0B2447"; // deep navy for the name
    const SUB = "#5F6B7A"; // muted gray for supporting text
    const LINE = "#DCE3EC";
    const BLUE = "#0056D2"; // Coursera/Google-style primary blue
    const BLUE_DARK = "#003D99";
    const BLUE_TINT = "#EEF4FF"; // light blue fill for header/tags
    const WHITE = "#FFFFFF";

    const certId = certIdRef.current || "UPF-CERTIFICATE";
    const displayName = fullName.trim() || "Distinguished Achiever";
    const quizTitle = activeQuiz.title.split("|")[0].trim();
    const skills = getSkillTags(activeQuiz);

    // ---- 1. Clean white base ----
    ctx.fillStyle = WHITE;
    ctx.fillRect(0, 0, W, H);

    // ---- 2. Border system: thin blue outer rule + hairline inner rule ----
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 6;
    ctx.strokeRect(50, 50, W - 100, H - 100);
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 80, W - 160, H - 160);

    // Thin blue accent bars top and bottom of the frame
    ctx.fillStyle = BLUE;
    ctx.fillRect(80, 80, W - 160, 8);
    ctx.fillRect(80, H - 88, W - 160, 8);

    // ---- 3. Header band: light blue wash with logo + wordmark ----
    ctx.fillStyle = BLUE_TINT;
    ctx.fillRect(130, 140, W - 260, 190);

    // Logo is mandatory — always loaded from the local public asset (/logo.jpg)
    const logoImg = new window.Image();
    let fallbackTried = false;

    // NOTE: `function drawBody() {...}` is used here (instead of `const drawBody = () => {...}`)
    // specifically because function declarations are hoisted. logoImg.onload/onerror below
    // reference drawBody before its definition further down this scope, which is fine at
    // runtime (callbacks fire later) but TypeScript's block-scope analysis flags a `const`
    // used-before-declaration as an error. Hoisting drawBody avoids that build failure.
    function drawBody() {
      // TypeScript narrowing from the outer `if (!ctx) return;` doesn't carry into this
      // nested function scope, so we re-assert it here. ctx is guaranteed non-null by the
      // time this runs (it only fires from logoImg.onload/onerror after renderCertificate's
      // own early-return check already passed).
      if (!ctx) return;

      // Logo (rounded square, white card so it reads clean on the blue tint)
      const logoBoxX = 190, logoBoxY = 175, logoBoxSize = 120;
      ctx.fillStyle = WHITE;
      ctx.strokeStyle = LINE;
      ctx.lineWidth = 2;
      const rr = 18;
      ctx.beginPath();
      ctx.moveTo(logoBoxX + rr, logoBoxY);
      ctx.arcTo(logoBoxX + logoBoxSize, logoBoxY, logoBoxX + logoBoxSize, logoBoxY + logoBoxSize, rr);
      ctx.arcTo(logoBoxX + logoBoxSize, logoBoxY + logoBoxSize, logoBoxX, logoBoxY + logoBoxSize, rr);
      ctx.arcTo(logoBoxX, logoBoxY + logoBoxSize, logoBoxX, logoBoxY, rr);
      ctx.arcTo(logoBoxX, logoBoxY, logoBoxX + logoBoxSize, logoBoxY, rr);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.clip();
      const pad = 10;
      try {
        if (logoImg.complete && logoImg.naturalWidth > 0) {
          ctx.drawImage(logoImg, logoBoxX + pad, logoBoxY + pad, logoBoxSize - pad * 2, logoBoxSize - pad * 2);
        } else {
          throw new Error("logo not ready");
        }
      } catch {
        ctx.fillStyle = BLUE;
        ctx.fillRect(logoBoxX, logoBoxY, logoBoxSize, logoBoxSize);
        ctx.fillStyle = WHITE;
        ctx.textAlign = "center";
        ctx.font = "800 56px system-ui, -apple-system, sans-serif";
        ctx.fillText("U", logoBoxX + logoBoxSize / 2, logoBoxY + logoBoxSize / 2 + 20);
      }
      ctx.restore();

      ctx.textAlign = "left";
      ctx.fillStyle = BLUE_DARK;
      ctx.font = "800 52px system-ui, -apple-system, sans-serif";
      ctx.fillText("UpForge", 350, 245);

      ctx.fillStyle = SUB;
      ctx.font = "400 24px system-ui, -apple-system, sans-serif";
      ctx.fillText("National Startup Readiness Platform  •  www.upforge.org", 350, 285);

      ctx.textAlign = "right";
      ctx.fillStyle = BLUE_DARK;
      ctx.font = "700 26px system-ui, -apple-system, sans-serif";
      ctx.fillText("VERIFIED CREDENTIAL", 3150, 240);
      ctx.fillStyle = SUB;
      ctx.font = "400 22px system-ui, -apple-system, sans-serif";
      ctx.fillText(`Certificate ID: ${certId}`, 3150, 275);

      // ---- 4. Title block ----
      ctx.textAlign = "center";
      ctx.fillStyle = NAVY;
      ctx.font = "800 92px system-ui, -apple-system, sans-serif";
      ctx.fillText("Certificate of Completion", 1750, 500);

      ctx.strokeStyle = BLUE;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(1450, 545);
      ctx.lineTo(2050, 545);
      ctx.stroke();

      // ---- 5. Presentation line ----
      ctx.fillStyle = SUB;
      ctx.font = "italic 400 34px Georgia, serif";
      ctx.fillText("This is to certify that", 1750, 650);

      // ---- 6. Name ----
      ctx.fillStyle = NAVY;
      ctx.font = "800 86px system-ui, -apple-system, sans-serif";
      ctx.fillText(displayName, 1750, 765);

      ctx.strokeStyle = BLUE;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(1100, 800);
      ctx.lineTo(2400, 800);
      ctx.stroke();

      // ---- 7. Qualification paragraph (what the student demonstrated) ----
      ctx.fillStyle = INK;
      ctx.font = "400 34px system-ui, -apple-system, sans-serif";
      const paragraph =
        `has successfully completed the ${quizTitle}, a scenario-based assessment ` +
        `administered by UpForge, and has demonstrated verified applied knowledge, sound judgment ` +
        `and practical decision-making ability across real-world, industry-relevant scenarios.`;
      wrapCenteredText(ctx, paragraph, 1750, 890, 2500, 52);

      // ---- 8. Skill tags (competencies demonstrated) ----
      ctx.font = "700 28px system-ui, -apple-system, sans-serif";
      const tagPaddingX = 34;
      const tagHeight = 66;
      const tagGap = 24;
      const tagWidths = skills.map((s) => ctx.measureText(s).width + tagPaddingX * 2);
      const totalTagsWidth = tagWidths.reduce((a, b) => a + b, 0) + tagGap * (skills.length - 1);
      let tagX = 1750 - totalTagsWidth / 2;
      const tagY = 1080;
      skills.forEach((skill, i) => {
        const tw = tagWidths[i];
        ctx.fillStyle = BLUE_TINT;
        ctx.strokeStyle = BLUE;
        ctx.lineWidth = 1.5;
        const r = tagHeight / 2;
        ctx.beginPath();
        ctx.moveTo(tagX + r, tagY);
        ctx.arcTo(tagX + tw, tagY, tagX + tw, tagY + tagHeight, r);
        ctx.arcTo(tagX + tw, tagY + tagHeight, tagX, tagY + tagHeight, r);
        ctx.arcTo(tagX, tagY + tagHeight, tagX, tagY, r);
        ctx.arcTo(tagX, tagY, tagX + tw, tagY, r);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = BLUE_DARK;
        ctx.textAlign = "center";
        ctx.fillText(skill, tagX + tw / 2, tagY + tagHeight / 2 + 10);
        tagX += tw + tagGap;
      });

      // ---- 9. Assessment details strip (format & standard — no scores) ----
      ctx.textAlign = "center";
      ctx.fillStyle = SUB;
      ctx.font = "400 28px system-ui, -apple-system, sans-serif";
      ctx.fillText(
        `Assessment Format: ${activeQuiz.metrics.scenariosCount}   |   Duration: ${activeQuiz.duration}   |   Credential Tier: ${activeQuiz.metrics.credentialTier}`,
        1750,
        1230
      );

      // ---- 10. Verified badge (simple, professional — no score) ----
      const badgeX = 1750, badgeY = 1360, badgeR = 70;
      ctx.beginPath();
      ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
      ctx.fillStyle = BLUE;
      ctx.fill();
      ctx.fillStyle = WHITE;
      ctx.font = "800 60px system-ui, -apple-system, sans-serif";
      ctx.fillText("✓", badgeX, badgeY + 22);

      // ---- 11. Date + Signature ----
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      ctx.textAlign = "left";
      ctx.fillStyle = SUB;
      ctx.font = "700 24px system-ui, -apple-system, sans-serif";
      ctx.fillText("DATE OF ISSUE", 400, 1780);
      ctx.fillStyle = INK;
      ctx.font = "700 34px system-ui, -apple-system, sans-serif";
      ctx.fillText(formattedDate, 400, 1828);
      ctx.strokeStyle = LINE;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(400, 1850);
      ctx.lineTo(850, 1850);
      ctx.stroke();

      ctx.textAlign = "right";
      ctx.fillStyle = NAVY;
      ctx.font = "italic 700 40px Georgia, serif";
      ctx.fillText("UpForge Certification Board", 3100, 1828);
      ctx.strokeStyle = LINE;
      ctx.beginPath();
      ctx.moveTo(2650, 1850);
      ctx.lineTo(3100, 1850);
      ctx.stroke();
      ctx.fillStyle = SUB;
      ctx.font = "400 22px system-ui, -apple-system, sans-serif";
      ctx.fillText("Authorized Signatory", 3100, 1885);

      // ---- 12. Footer ----
      ctx.textAlign = "center";
      ctx.fillStyle = SUB;
      ctx.font = "400 25px system-ui, -apple-system, sans-serif";
      ctx.fillText("This credential can be verified at", 1750, 2020);
      ctx.fillStyle = BLUE;
      ctx.font = "700 30px system-ui, -apple-system, sans-serif";
      ctx.fillText("www.upforge.org", 1750, 2060);

      ctx.fillStyle = SUB;
      ctx.font = "400 22px system-ui, -apple-system, sans-serif";
      ctx.fillText("Issued by UpForge — the National Startup Readiness Platform", 1750, 2110);

      // ---- 13. Subtle diagonal watermark ----
      ctx.save();
      ctx.globalAlpha = 0.025;
      ctx.translate(1750, 1240);
      ctx.rotate(-Math.PI / 10);
      ctx.textAlign = "center";
      ctx.fillStyle = BLUE;
      ctx.font = "900 420px system-ui, -apple-system, sans-serif";
      ctx.fillText("UPFORGE", 0, 0);
      ctx.restore();

      onReady(canvas);
    }

    logoImg.onerror = () => {
      if (!fallbackTried) {
        fallbackTried = true;
        logoImg.crossOrigin = "anonymous";
        logoImg.src = "https://images.upforge.org/logo.jpg";
      } else {
        drawBody();
      }
    };
    logoImg.onload = drawBody;
    logoImg.src = "/logo.jpg";
  };

  const handleDownloadExecutiveCert = () => {
    renderCertificate((canvas) => {
      const link = document.createElement("a");
      link.download = `UpForge_Certificate_${fullName.replace(/\s+/g, "_") || "Achiever"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  // Native share (mobile): shares the actual certificate image via the OS share sheet
  // (WhatsApp, Instagram, LinkedIn app, etc). Falls back to a plain link+text share,
  // and finally to triggering a download if the browser can't share at all.
  const handleShareCertificate = () => {
    renderCertificate((canvas) => {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "UpForge_Certificate.png", { type: "image/png" });
        const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean };

        if (nav.canShare && nav.canShare({ files: [file] }) && navigator.share) {
          try {
            await navigator.share({
              title: "My UpForge Certificate",
              text: shareText,
              url: shareUrl,
              files: [file]
            });
            return;
          } catch {
            // user cancelled or share failed — fall through to link share
          }
        }

        if (navigator.share) {
          try {
            await navigator.share({ title: "My UpForge Certificate", text: shareText, url: shareUrl });
            return;
          } catch {
            // fall through
          }
        }

        // Desktop / unsupported fallback: just download the image
        const link = document.createElement("a");
        link.download = `UpForge_Certificate_${fullName.replace(/\s+/g, "_") || "Achiever"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }, "image/png");
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 selection:bg-amber-500/20 selection:text-amber-800 dark:selection:text-amber-200">
      {/* Canvas for Certificate PNG */}
      <canvas ref={certCanvasRef} className="hidden" />

      {/* VIEW 1: OVERVIEW DIRECTORY */}
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

      {/* VIEW 2: FULL-PAGE CHALLENGE BRIEFING & DISCUSSIONS */}
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
              {/* Left Column */}
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

                {/* Discussion Section */}
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
                      Instant scoring & downloadable LinkedIn-ready credential with official verification.
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
                      <span className="text-slate-500">Certificate</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Professional PNG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: ACTIVE TEST QUESTIONS */}
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

      {/* VIEW 4: ASSESSMENT COMPLETED & CERTIFICATE */}
      {view === "CREDENTIAL_READY" && (
        <div className="max-w-xl mx-auto px-4 py-12 text-center">
          <div className="bg-white dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-black mb-4">
              ✓
            </div>

            <h2 className="text-2xl font-black text-slate-950 dark:text-white mb-1">
              Assessment Completed
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
                  {isSubmitting ? "Generating Certificate..." : "Claim & Unlock Certificate →"}
                </button>
              </form>
            ) : (
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  ✓ Certificate ready — download or share it directly
                </div>

                <button
                  type="button"
                  onClick={handleDownloadExecutiveCert}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-950 dark:bg-white hover:opacity-90 text-white dark:text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Download LinkedIn-Ready Certificate (PNG)</span>
                  <span>↓</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareCertificate}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Share Certificate</span>
                  <span>📤</span>
                </button>

                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Or post directly to
                  </span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161D2E] hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 text-slate-600 dark:text-slate-300 text-[11px] font-bold transition-all"
                  >
                    <span className="text-base">in</span>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161D2E] hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 text-slate-600 dark:text-slate-300 text-[11px] font-bold transition-all"
                  >
                    <span className="text-base">𝕏</span>
                    <span>Twitter / X</span>
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161D2E] hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 text-slate-600 dark:text-slate-300 text-[11px] font-bold transition-all"
                  >
                    <span className="text-base">💬</span>
                    <span>WhatsApp</span>
                  </a>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed pt-1">
                  Sharing your certificate helps others discover UpForge's free Startup IQ benchmarks.
                </p>
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
