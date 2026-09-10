"use client";

import { useState, useEffect, useRef } from "react";
import { auth, db } from "@/lib/firebase";
import { getIdToken } from "firebase/auth";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  displayName: string;
  text: string;
  likesCount: number;
  replyCount: number;
  createdAt: number;
  isLiked?: boolean;
}

interface Reply {
  id: string;
  displayName: string;
  text: string;
  createdAt: number;
}

export function QuizComments({
  quizId,
  quizSlug,
  isAuthenticated,
}: {
  quizId: string;
  quizSlug?: string;
  isAuthenticated: boolean;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});

  const actualQuizId = quizId || quizSlug || "";

  // ============ Fetch Comments ============
  const fetchComments = async () => {
    if (!actualQuizId) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/quiz/comments?quizId=${actualQuizId}&limit=20`);
      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
      setComments(data.comments || []);
    } catch (err: any) {
      console.error("Error fetching comments:", err);
      setError("Could not load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (actualQuizId) {
      fetchComments();
    }
  }, [actualQuizId]);

  // ============ Fetch Replies ============
  const fetchReplies = async (commentId: string) => {
    try {
      const response = await fetch(
        `/api/quiz/comments?quizId=${actualQuizId}&parentId=${commentId}&limit=10`
      );
      if (!response.ok) throw new Error("Failed to fetch replies");

      const data = await response.json();
      setReplies((prev) => ({
        ...prev,
        [commentId]: data.replies || [],
      }));
    } catch (err) {
      console.error("Error fetching replies:", err);
      toast.error("Could not load replies");
    }
  };

  // ============ Toggle Replies ============
  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
      if (!replies[commentId]) {
        fetchReplies(commentId);
      }
    }
    setExpandedReplies(newExpanded);
  };

  // ============ Submit Comment ============
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) {
      toast.error("Please sign in to comment");
      return;
    }

    if (newComment.length > 1000) {
      toast.error("Comment too long (max 1000 characters)");
      return;
    }

    setSubmitting(true);
    try {
      const token = await getIdToken(auth.currentUser!);

      const response = await fetch("/api/quiz/comments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: actualQuizId,
          text: newComment,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to post comment");
      }

      toast.success("Comment posted!");
      setNewComment("");
      await fetchComments();
    } catch (err: any) {
      console.error("Error posting comment:", err);
      toast.error(err.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  // ============ Toggle Like ============
  const handleToggleLike = async (commentId: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to like comments");
      return;
    }

    try {
      const token = await getIdToken(auth.currentUser!);

      const response = await fetch("/api/quiz/comments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: actualQuizId,
          commentId,
          action: "toggleLike",
        }),
      });

      if (!response.ok) throw new Error("Failed to toggle like");

      const data = await response.json();

      // Update local state
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                likesCount: data.liked ? c.likesCount + 1 : c.likesCount - 1,
                isLiked: data.liked,
              }
            : c
        )
      );
    } catch (err: any) {
      console.error("Error toggling like:", err);
      toast.error("Failed to like comment");
    }
  };

  // ============ Submit Reply ============
  const handleSubmitReply = async (commentId: string, replyText: string) => {
    if (!replyText.trim() || !isAuthenticated) {
      toast.error("Please sign in to reply");
      return;
    }

    if (replyText.length > 1000) {
      toast.error("Reply too long (max 1000 characters)");
      return;
    }

    try {
      const token = await getIdToken(auth.currentUser!);

      const response = await fetch("/api/quiz/comments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: actualQuizId,
          parentId: commentId,
          text: replyText,
        }),
      });

      if (!response.ok) throw new Error("Failed to post reply");

      toast.success("Reply posted!");
      await fetchReplies(commentId);
    } catch (err: any) {
      console.error("Error posting reply:", err);
      toast.error(err.message || "Failed to post reply");
    }
  };

  // ============ Format Date ============
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <Card className="border border-border/60">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> Community Comments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ============ Comment Form ============ */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmitComment} className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value.slice(0, 1000))}
              placeholder="Share your thoughts on this quiz..."
              className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {newComment.length}/1000
              </span>
              <Button
                type="submit"
                disabled={submitting || !newComment.trim()}
                size="sm"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Comment"
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">Sign in to comment and engage with the community</p>
          </div>
        )}

        {/* ============ Error Display ============ */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-red-700">{error}</p>
              <Button
                onClick={() => fetchComments()}
                size="sm"
                variant="outline"
                className="mt-2 text-xs"
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* ============ Loading State ============ */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* ============ Comments List ============ */}
        {!loading && comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          <div className="space-y-4 divide-y">
            {comments.map((comment) => (
              <div key={comment.id} className="pt-4 first:pt-0">
                {/* Comment */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">{comment.displayName}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground">{comment.text}</p>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => handleToggleLike(comment.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${
                        comment.isLiked
                          ? "text-red-500"
                          : "text-muted-foreground hover:text-red-500"
                      }`}
                      disabled={!isAuthenticated}
                    >
                      <Heart className={`w-4 h-4 ${comment.isLiked ? "fill-current" : ""}`} />
                      {comment.likesCount}
                    </button>

                    {comment.replyCount > 0 && (
                      <button
                        onClick={() => toggleReplies(comment.id)}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {expandedReplies.has(comment.id) ? "Hide" : "Show"} {comment.replyCount}{" "}
                        {comment.replyCount === 1 ? "reply" : "replies"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Replies */}
                {expandedReplies.has(comment.id) && (
                  <div className="mt-4 space-y-3 pl-4 border-l-2 border-muted">
                    {replies[comment.id]?.map((reply) => (
                      <div key={reply.id} className="space-y-1">
                        <div>
                          <p className="font-semibold text-xs">{reply.displayName}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(reply.createdAt)}</p>
                        </div>
                        <p className="text-xs text-foreground">{reply.text}</p>
                      </div>
                    ))}

                    {isAuthenticated && (
                      <ReplyForm
                        onSubmit={(text) => handleSubmitReply(comment.id, text)}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============ Reply Form Component ============
function ReplyForm({ onSubmit }: { onSubmit: (text: string) => Promise<void> }) {
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit(replyText);
      setReplyText("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-3">
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value.slice(0, 1000))}
        placeholder="Write a reply..."
        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{replyText.length}/1000</span>
        <Button
          type="submit"
          disabled={submitting || !replyText.trim()}
          size="sm"
          variant="secondary"
        >
          {submitting ? "Replying..." : "Reply"}
        </Button>
      </div>
    </form>
  );
}
