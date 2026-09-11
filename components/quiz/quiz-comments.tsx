 "use client";

import React, { useCallback, useEffect, useState } from "react";
import { MessageSquare, Send, ShieldCheck, UserRound } from "lucide-react";

interface CommentItem {
  id?: string;
  quizSlug: string;
  author: string;
  comment: string;
  userRole: "Founder" | "Student";
  company?: string;
  createdAt?: string;
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

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/quiz/comments?quizSlug=${encodeURIComponent(quizSlug)}`,
        { headers: { "x-upforge-domain": "quiz" } }
      );
      const data = await res.json();
      if (res.ok && Array.isArray(data.comments)) setComments(data.comments);
    } catch {
      setErrorMsg("Could not load community notes right now.");
    } finally {
      setLoading(false);
    }
  }, [quizSlug]);

  useEffect(() => {
    void fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!author.trim() || !commentText.trim()) {
      setErrorMsg("Please enter your name and comment.");
      return;
    }

    if (userRole === "Founder" && !company.trim()) {
      setErrorMsg("Founders must add their company name.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/quiz/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-upforge-domain": "quiz",
        },
        body: JSON.stringify({
          quizSlug,
          author: author.trim(),
          comment: commentText.trim(),
          userRole,
          company: userRole === "Founder" ? company.trim() : "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Could not post your comment.");
      }

      if (data.comment) {
        setComments((current) => [data.comment, ...current].slice(0, 50));
      }

      setCommentText("");
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Could not post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-amber-700">
            Community
          </p>
          <h2 className="mt-1 text-xl font-black">
            Founder & Student Discussion
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Share a useful insight, strategy or lesson from this challenge.
          </p>
        </div>
        <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {comments.length} notes
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-3">
        {errorMsg && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-800">
            {errorMsg}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value.slice(0, 60))}
            placeholder="Your name"
            maxLength={60}
            required
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />

          <select
            value={userRole}
            onChange={(e) =>
              setUserRole(e.target.value === "Founder" ? "Founder" : "Student")
            }
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            <option value="Student">Student</option>
            <option value="Founder">Founder</option>
          </select>

          {userRole === "Founder" ? (
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value.slice(0, 80))}
              placeholder="Company name (required)"
              maxLength={80}
              required
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          ) : (
            <div className="flex items-center rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-500">
              Students can post with their name only.
            </div>
          )}
        </div>

        <textarea
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value.slice(0, 600))}
          placeholder="Share something useful for the next builder…"
          maxLength={600}
          required
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />

        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500">
            Community safety filter is active. Abusive posts are rejected automatically.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Posting…" : "Post insight"}
          </button>
        </div>
      </form>

      <div className="mt-7 space-y-3">
        {loading ? (
          <div className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
            Loading community notes…
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
            Be the first to add a useful note.
          </div>
        ) : (
          comments.map((item, index) => (
            <article
              key={item.id || `${item.author}-${index}`}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                  <UserRound className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-slate-900">{item.author}</span>
                    {item.userRole === "Founder" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900">
                        <ShieldCheck className="h-3 w-3" />
                        Founder @ UpForge
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-black text-slate-700">
                        Student
                      </span>
                    )}
                    {item.company && (
                      <span className="text-[11px] font-semibold text-slate-500">
                        {item.company}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {item.comment}
                  </p>

                  {item.createdAt && (
                    <p className="mt-2 text-[10px] font-semibold text-slate-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
