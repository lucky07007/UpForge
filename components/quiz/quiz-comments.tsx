"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, Send } from "lucide-react";

interface CommentItem {
  id?: string;
  author: string;
  comment: string;
  userRole?: "Founder" | "Student" | string;
  company?: string;
  displayRole?: string;
  createdAt?: string;
}

async function readJson(res: Response) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Community service returned an invalid response.");
  }
  return res.json();
}

export default function QuizComments({ quizSlug }: { quizSlug: string }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [userRole, setUserRole] = useState<"Founder" | "Student">("Student");
  const [company, setCompany] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasLoaded) return;

    let active = true;
    const load = () => {
      if (!active || hasLoaded) return;
      setHasLoaded(true);
      setLoading(true);

      fetch(`/api/quiz/comments?quizSlug=${encodeURIComponent(quizSlug)}`, {
        headers: { "x-upforge-domain": "quiz" },
      })
      .then(readJson)
      .then((data) => {
        if (active) {
          setComments(Array.isArray(data?.comments) ? data.comments : []);
          if (!data?.success && data?.error) setErrorMsg(data.error);
        }
      })
      .catch((error) => {
        if (active) {
          setErrorMsg(error?.message || "Community is temporarily unavailable.");
        }
      })
        .finally(() => {
          if (active) setLoading(false);
        });
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            load();
            observer.disconnect();
          }
        },
        { rootMargin: "500px 0px" },
      );
      observer.observe(node);
      return () => {
        active = false;
        observer.disconnect();
      };
    }

    load();
    return () => { active = false; };
  }, [quizSlug, hasLoaded]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg("");

    if (!author.trim() || !commentText.trim()) {
      setErrorMsg("Please provide your name and a comment.");
      return;
    }

    if (userRole === "Founder" && !company.trim()) {
      setErrorMsg("Company name is required for founders.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/quiz/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizSlug,
          author: author.trim(),
          userRole,
          company: company.trim(),
          comment: commentText.trim(),
          website: "",
        }),
      });

      const data = await readJson(res);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Could not post your insight.");
      }

      if (data.comment) {
        setComments((prev) => [data.comment, ...prev].slice(0, 30));
      }

      setCommentText("");
      setCompany("");
    } catch (error: any) {
      setErrorMsg(error?.message || "Could not post your insight.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <MessageSquare className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            Community
          </p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">
            Founder & Student Discussion
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Share a useful insight, strategy or lesson from this challenge.
          </p>
        </div>

        <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
          {comments.length} notes
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-3">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden opacity-0"
          defaultValue=""
        />
        {errorMsg && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            maxLength={50}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-950 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />

          <select
            value={userRole}
            onChange={(event) =>
              setUserRole(event.target.value as "Founder" | "Student")
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            <option value="Student">Student</option>
            <option value="Founder">Founder</option>
          </select>

          {userRole === "Founder" && (
            <input
              type="text"
              placeholder="Company name *"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              maxLength={80}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-950 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          )}
        </div>

        <textarea
          rows={4}
          placeholder="Share an insight from this challenge..."
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          maxLength={500}
          required
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-950 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Safety filter is active. Abusive posts are rejected automatically.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            {submitting ? "Posting…" : "Post insight"}
          </button>
        </div>
      </form>

      <div className="mt-7 space-y-3">
        {loading ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
            Loading community…
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
            Be the first to add a useful note.
          </div>
        ) : (
          comments.map((item, index) => (
            <article
              key={item.id || `${item.author}-${item.createdAt}-${index}`}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-black text-slate-950">
                  {item.author}
                </span>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-black text-amber-900">
                  {item.displayRole ||
                    (item.userRole === "Founder"
                      ? `Founder @ ${item.company || "Company"}`
                      : "Student")}
                </span>
                {item.createdAt && (
                  <span className="ml-auto text-[11px] font-semibold text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {item.comment}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
