"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MessageSquare, Send } from "lucide-react";

interface CommentItem {
  id?: string;
  quizSlug: string;
  author: string;
  comment: string;
  userRole?: string;
  createdAt?: string;
}

export default function QuizComments({ quizSlug }: { quizSlug: string }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [userRole, setUserRole] = useState("Founder");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/quiz/comments?quizSlug=${encodeURIComponent(quizSlug)}`);
      const data = await res.json();
      if (data.comments) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setLoading(false);
    }
  }, [quizSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !commentText.trim()) {
      setErrorMsg("Please provide your name and a comment.");
      return;
    }
    setErrorMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/quiz/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizSlug,
          author: author.trim(),
          comment: commentText.trim(),
          userRole,
        }),
      });

      if (!res.ok) throw new Error("Failed to post");

      setCommentText("");
      await fetchComments();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Founder Community Discussion
        </h3>
        <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
          {comments.length} responses
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        {errorMsg && (
          <div className="p-3 text-xs text-red-600 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-900">
            {errorMsg}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Your Name (e.g. Lucky T.)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            maxLength={40}
            required
          />
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Founder">Founder / Co-Founder</option>
            <option value="CTO / Tech Lead">CTO / Tech Lead</option>
            <option value="Growth & Marketing">Growth & Marketing</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Investor / VC">Investor / VC</option>
          </select>
        </div>

        <div>
          <textarea
            rows={3}
            placeholder="Share your score or strategy..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-3.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            maxLength={500}
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 px-4 py-2 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {submitting ? "Posting..." : "Post Insight"}
          </button>
        </div>
      </form>

      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
        {loading ? (
          <p className="text-sm text-zinc-500 py-4 text-center">Loading discussions...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-zinc-500 py-4 text-center">
            No community notes yet. Share your thoughts!
          </p>
        ) : (
          comments.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">{item.author}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {item.userRole || "Founder"}
                  </span>
                </div>
                {item.createdAt && (
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                )}
              </div>
              <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                {item.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
