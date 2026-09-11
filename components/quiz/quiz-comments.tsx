"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, MessageSquare, RefreshCw, Send } from "lucide-react";

interface CommentItem {
  id?: string;
  author: string;
  comment: string;
  userRole?: "Founder" | "Student" | string;
  company?: string;
  displayRole?: string;
  createdAt?: string;
  source?: "firebase" | "seed" | "local";
}

interface PendingComment {
  clientId: string;
  quizSlug: string;
  author: string;
  userRole: "Founder" | "Student";
  company: string;
  comment: string;
}

async function readJson(res: Response) {
  const contentType = res.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("Community service returned an invalid response.");
  }

  return res.json();
}

function makeClientId() {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch {}

  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function formatMemberDate(value?: string) {
  if (!value) return "";

  const time = new Date(value).getTime();

  if (!Number.isFinite(time)) return "";

  const diff = Math.max(0, Date.now() - time);
  const minutes = Math.floor(diff / 60_000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);

  if (days < 7) return `${days}d ago`;

  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

export default function QuizComments({ quizSlug }: { quizSlug: string }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const [author, setAuthor] = useState("");
  const [userRole, setUserRole] = useState<"Founder" | "Student">("Student");
  const [company, setCompany] = useState("");
  const [commentText, setCommentText] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const storageKey = `upforge:quiz-comments:${quizSlug}`;
  const outboxKey = `upforge:quiz-comment-outbox:${quizSlug}`;

  const saveVisibleCache = useCallback(
    (next: CommentItem[]) => {
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            savedAt: Date.now(),
            comments: next.slice(0, 50),
          }),
        );
      } catch {}
    },
    [storageKey],
  );

  const readOutbox = useCallback((): PendingComment[] => {
    try {
      const raw = localStorage.getItem(outboxKey);

      if (!raw) return [];

      const parsed = JSON.parse(raw);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [outboxKey]);

  const writeOutbox = useCallback(
    (items: PendingComment[]) => {
      try {
        if (!items.length) {
          localStorage.removeItem(outboxKey);
        } else {
          localStorage.setItem(
            outboxKey,
            JSON.stringify(items.slice(0, 5)),
          );
        }
      } catch {}
    },
    [outboxKey],
  );

  const postToServer = useCallback(async (payload: PendingComment) => {
    const res = await fetch("/api/quiz/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-upforge-domain": "quiz",
      },
      body: JSON.stringify({
        quizSlug: payload.quizSlug,
        author: payload.author,
        userRole: payload.userRole,
        company: payload.company,
        comment: payload.comment,
        clientId: payload.clientId,
        website: "",
      }),
      keepalive: true,
    });

    const data = await readJson(res);

    if (!res.ok || !data?.success) {
      throw new Error(
        data?.error || "Could not sync the community note.",
      );
    }

    return data.comment as CommentItem | undefined;
  }, []);

  const syncOutbox = useCallback(async () => {
    const pending = readOutbox();

    if (!pending.length) return;

    setSyncing(true);

    const remaining: PendingComment[] = [];

    for (const item of pending) {
      try {
        const saved = await postToServer(item);

        if (saved) {
          setComments((prev) => {
            const withoutLocal = prev.filter(
              (entry) => entry.id !== `local_${item.clientId}`,
            );

            const next = [saved, ...withoutLocal].slice(0, 50);

            saveVisibleCache(next);

            return next;
          });
        }
      } catch {
        remaining.push(item);
      }
    }

    writeOutbox(remaining);
    setSyncing(false);
  }, [
    postToServer,
    readOutbox,
    saveVisibleCache,
    writeOutbox,
  ]);

  const loadComments = useCallback(async () => {
    let active = true;

    setLoading(true);

    try {
      const cached = sessionStorage.getItem(storageKey);

      if (cached) {
        const parsed = JSON.parse(cached);

        if (
          parsed?.savedAt &&
          Date.now() - parsed.savedAt < 5 * 60 * 1000 &&
          Array.isArray(parsed.comments)
        ) {
          if (active) {
            setComments(parsed.comments);
            setLoading(false);
          }
        }
      }
    } catch {}

    try {
      const res = await fetch(
        `/api/quiz/comments?quizSlug=${encodeURIComponent(quizSlug)}`,
        {
          headers: {
            "x-upforge-domain": "quiz",
          },
          cache: "force-cache",
        },
      );

      const data = await readJson(res);

      if (!active) return;

      const remote = Array.isArray(data?.comments)
        ? data.comments
        : [];

      const localPending = readOutbox();

      const localItems: CommentItem[] = localPending.map(
        (item) => ({
          id: `local_${item.clientId}`,
          author: item.author,
          comment: item.comment,
          userRole: item.userRole,
          company: item.company,
          displayRole:
            item.userRole === "Founder"
              ? `Founder @ ${item.company}`
              : "Student",
          createdAt: new Date().toISOString(),
          source: "local",
        }),
      );

      const merged = [...localItems, ...remote].filter(
        (item, index, all) =>
          item.id
            ? all.findIndex(
                (other) => other.id === item.id,
              ) === index
            : true,
      );

      setComments(merged.slice(0, 50));
      saveVisibleCache(merged);
    } catch {
      /*
       * Community is enhancement-only.
       * A temporary network/Firebase problem should never interrupt
       * the quiz experience.
       */
    } finally {
      if (active) {
        setLoading(false);
      }
    }

    return () => {
      active = false;
    };
  }, [
    quizSlug,
    readOutbox,
    saveVisibleCache,
    storageKey,
  ]);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node || hasLoaded) return;

    setHasLoaded(true);

    let cancelled = false;

    const load = async () => {
      if (cancelled) return;

      await loadComments();

      if (!cancelled) {
        window.setTimeout(() => {
          if (!cancelled) {
            void syncOutbox();
          }
        }, 800);
      }
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries.some(
              (entry) => entry.isIntersecting,
            )
          ) {
            void load();
            observer.disconnect();
          }
        },
        {
          rootMargin: "900px 0px",
        },
      );

      observer.observe(node);

      return () => {
        cancelled = true;
        observer.disconnect();
      };
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [
    hasLoaded,
    loadComments,
    syncOutbox,
  ]);

  useEffect(() => {
    const retry = () => {
      void syncOutbox();
    };

    window.addEventListener("online", retry);

    const interval = window.setInterval(
      retry,
      20_000,
    );

    return () => {
      window.removeEventListener("online", retry);
      window.clearInterval(interval);
    };
  }, [syncOutbox]);

  const visibleComments = useMemo(
    () => comments.slice(0, visibleCount),
    [comments, visibleCount],
  );

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!author.trim() || !commentText.trim()) {
      return;
    }

    if (
      userRole === "Founder" &&
      !company.trim()
    ) {
      return;
    }

    setSubmitting(true);

    const payload: PendingComment = {
      clientId: makeClientId(),
      quizSlug,
      author: author
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 50),
      userRole,
      company: company
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 80),
      comment: commentText
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 500),
    };

    const optimistic: CommentItem = {
      id: `local_${payload.clientId}`,
      author: payload.author,
      comment: payload.comment,
      userRole: payload.userRole,
      company: payload.company,
      displayRole:
        payload.userRole === "Founder"
          ? `Founder @ ${payload.company}`
          : "Student",
      createdAt: new Date().toISOString(),
      source: "local",
    };

    const next = [
      optimistic,
      ...comments.filter(
        (item) =>
          item.id !== optimistic.id,
      ),
    ].slice(0, 50);

    setComments(next);
    setVisibleCount((count) =>
      Math.max(count, 8),
    );

    saveVisibleCache(next);

    /*
     * Local outbox is written BEFORE Firebase.
     * This gives the user an instant experience and
     * provides a retry path if the network/Firebase fails.
     */
    const existingOutbox = readOutbox();

    if (
      !existingOutbox.some(
        (item) =>
          item.clientId === payload.clientId,
      )
    ) {
      writeOutbox([
        ...existingOutbox,
        payload,
      ]);
    }

    setCommentText("");
    setCompany("");

    try {
      const saved = await postToServer(
        payload,
      );

      if (saved) {
        setComments((prev) => {
          const updated = [
            saved,
            ...prev.filter(
              (item) =>
                item.id !==
                optimistic.id,
            ),
          ].slice(0, 50);

          saveVisibleCache(updated);

          return updated;
        });
      }

      const remaining = readOutbox().filter(
        (item) =>
          item.clientId !==
          payload.clientId,
      );

      writeOutbox(remaining);
    } catch {
      /*
       * Deliberately silent.
       * The optimistic note remains visible and is
       * retried automatically from localStorage.
       */
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="rounded-2xl border border-[var(--glass-border)] bg-card p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
          <MessageSquare className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent-gold">
            Community
          </p>

          <h3 className="mt-1 text-xl font-bold text-foreground">
            Founder & Student Discussion
          </h3>

          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Practical takes, questions and lessons around this challenge.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {syncing && (
            <span className="hidden items-center gap-1.5 text-[11px] font-medium text-muted-foreground sm:inline-flex">
              <RefreshCw className="h-3 w-3 animate-spin" />
              Syncing
            </span>
          )}

          <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
            {comments.length} notes
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 space-y-3"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden opacity-0"
          defaultValue=""
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_190px]">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(event) =>
              setAuthor(event.target.value)
            }
            maxLength={50}
            required
            className="w-full rounded-xl border border-[var(--glass-border)] bg-background px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/10"
          />

          <select
            value={userRole}
            onChange={(event) =>
              setUserRole(
                event.target.value as
                  | "Founder"
                  | "Student",
              )
            }
            className="w-full rounded-xl border border-[var(--glass-border)] bg-background px-3.5 py-3 text-sm font-semibold text-foreground outline-none transition focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/10"
          >
            <option value="Student">
              Student
            </option>

            <option value="Founder">
              Founder
            </option>
          </select>
        </div>

        {userRole === "Founder" && (
          <input
            type="text"
            placeholder="Company name"
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
            maxLength={80}
            required
            className="w-full rounded-xl border border-[var(--glass-border)] bg-background px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/10"
          />
        )}

        <textarea
          rows={4}
          placeholder="Share an insight from this challenge..."
          value={commentText}
          onChange={(event) =>
            setCommentText(
              event.target.value,
            )
          }
          maxLength={500}
          required
          className="w-full resize-none rounded-xl border border-[var(--glass-border)] bg-background p-3.5 text-sm text-foreground outline-none transition focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/10"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Your note appears instantly and syncs in the background.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-gold px-5 py-3 text-xs font-black text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />

            {submitting
              ? "Saving…"
              : "Post insight"}
          </button>
        </div>
      </form>

      <div className="mt-5 rounded-xl border border-accent-gold/20 bg-accent-gold/[0.04] px-4 py-3 text-xs leading-5 text-muted-foreground">
        <span className="font-semibold text-foreground">
          Community starter notes:
        </span>{" "}
        UpForge adds a small set of editorial starter notes so every new challenge has a useful conversation from day one. Member posts are added separately.
      </div>

      <div className="mt-4 space-y-3">
        {loading && comments.length === 0 ? (
          <div
            className="space-y-3"
            aria-label="Loading community"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-[var(--glass-border)] bg-muted/30 p-4"
              >
                <div className="h-4 w-36 rounded bg-muted" />

                <div className="mt-3 h-3 w-11/12 rounded bg-muted" />

                <div className="mt-2 h-3 w-8/12 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {visibleComments.map(
              (item, index) => {
                const isStarter =
                  item.source === "seed";

                const isLocal =
                  item.source === "local";

                return (
                  <article
                    key={
                      item.id ||
                      `${item.author}-${item.createdAt}-${index}`
                    }
                    className={`rounded-2xl border p-4 transition ${
                      isLocal
                        ? "border-accent-gold/30 bg-accent-gold/[0.05]"
                        : "border-[var(--glass-border)] bg-muted/30"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {item.author}
                      </span>

                      <span className="rounded-full bg-accent-gold/10 px-2.5 py-1 text-[11px] font-bold text-accent-gold">
                        {item.displayRole ||
                          (item.userRole ===
                          "Founder"
                            ? `Founder @ ${
                                item.company ||
                                "Company"
                              }`
                            : "Student")}
                      </span>

                      {isStarter && (
                        <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                          Starter note
                        </span>
                      )}

                      {isLocal && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold/10 px-2.5 py-1 text-[10px] font-semibold text-accent-gold">
                          <CheckCircle2 className="h-3 w-3" />
                          Saved
                        </span>
                      )}

                      {!isStarter &&
                        !isLocal &&
                        item.createdAt && (
                          <span className="ml-auto text-[11px] font-medium text-muted-foreground">
                            {formatMemberDate(
                              item.createdAt,
                            )}
                          </span>
                        )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.comment}
                    </p>
                  </article>
                );
              },
            )}

            {visibleCount <
              comments.length && (
              <button
                type="button"
                onClick={() =>
                  setVisibleCount(
                    (count) =>
                      count + 8,
                  )
                }
                className="w-full rounded-xl border border-[var(--glass-border)] bg-background px-4 py-3 text-xs font-bold text-foreground transition hover:border-accent-gold/40 hover:bg-muted"
              >
                Show more discussion
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
