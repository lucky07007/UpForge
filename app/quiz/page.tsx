import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Filter, Search, Trophy, X, ChevronDown, CalendarDays, Flame } from "lucide-react";
import { QUIZ_REGISTRY } from "@/lib/quizData";

const BASE_URL = "https://upforge.org";
export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; month?: string; popular?: string }>;
}

const categories = Array.from(new Set(QUIZ_REGISTRY.map((quiz) => quiz.category))).sort();

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const q = sp.q?.trim() || "";
  const category = sp.category?.trim() || "";
  const month = sp.month?.trim() || "";
  const title = q ? `"${q}" Quiz Results | UpForge` : category ? `${category} Quizzes | UpForge` : "UpForge Challenges | Startup, Marketing, Career & Fundraising IQ";
  const description = q
    ? `Find UpForge challenges matching ${q}. Take a practical assessment, earn a professional certificate and join the public leaderboard.`
    : category
      ? `Take practical ${category} assessments on UpForge. Earn a professional completion certificate and join the public leaderboard.`
      : "Take practical UpForge challenges, receive a professional completion certificate and appear automatically on the public leaderboard.";
  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/quiz` },
    openGraph: { title, description, url: `${BASE_URL}/quiz`, siteName: "UpForge", type: "website" },
    robots: { index: !q, follow: true },
  };
}

export default async function QuizIndexPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = sp.q?.trim().toLowerCase() || "";
  const category = sp.category?.trim() || "";
  const month = sp.month?.trim() || "";
  const sort = sp.sort === "date" ? "date" : "name";
  const popular = sp.popular === "1";
  const hasDateMetadata = QUIZ_REGISTRY.some((quiz) => Boolean((quiz as typeof quiz & { publishedAt?: string }).publishedAt));
  const months = Array.from(new Set(QUIZ_REGISTRY.map((quiz) => (quiz as typeof quiz & { publishedAt?: string }).publishedAt?.slice(0, 7)).filter(Boolean) as string[])).sort().reverse();

  const quizzes = QUIZ_REGISTRY
    .filter((quiz) => {
      const haystack = `${quiz.title} ${quiz.tagline} ${quiz.description || ""} ${quiz.category}`.toLowerCase();
      const publishedAt = (quiz as typeof quiz & { publishedAt?: string }).publishedAt || "";
      return (!q || haystack.includes(q)) && (!category || quiz.category === category) && (!month || publishedAt.startsWith(month));
    })
    .sort((a, b) => {
      if (popular) return b.baseParticipants - a.baseParticipants;
      if (sort === "date") {
        const ad = (a as typeof a & { publishedAt?: string }).publishedAt || "";
        const bd = (b as typeof b & { publishedAt?: string }).publishedAt || "";
        return bd.localeCompare(ad);
      }
      return a.title.localeCompare(b.title);
    });

  const filtered = Boolean(q || category || month || sort !== "name" || popular);
  const makeHref = (overrides: Record<string, string | undefined>) => {
    const values = { q: q || undefined, category: category || undefined, month: month || undefined, sort: sort !== "name" ? sort : undefined, popular: popular ? "1" : undefined, ...overrides };
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => { if (value) params.set(key, value); });
    const query = params.toString();
    return `/quiz${query ? `?${query}` : ""}`;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative border-b border-[var(--glass-border)] bg-card px-6 py-10 md:py-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-accent-primary/20 bg-accent-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-accent-gold">
              UpForge Assessments
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Practical challenges for builders
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Short, scenario-based assessments across startup intelligence, growth and professional skills. Earn a verifiable credential when you finish.
            </p>
          </div>
          <Link href="/quiz/leaderboard" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--glass-border)] bg-card px-4 py-2.5 text-xs font-black text-foreground transition hover:border-accent-primary/50 hover:bg-muted/40">
            <Trophy className="h-4 w-4 text-accent-gold" />
            View leaderboards
          </Link>
        </div>
      </section>

      <section className="sticky top-14 z-20 border-b border-[var(--glass-border)] bg-background/95 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-7xl">
          <form action="/quiz" method="GET" className="relative">
            {category && <input type="hidden" name="category" value={category} />}
            {sort !== "name" && <input type="hidden" name="sort" value={sort} />}
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              defaultValue={sp.q || ""}
              placeholder={`Search ${QUIZ_REGISTRY.length} challenges by topic, skill or title...`}
              className="w-full rounded-full border border-[var(--glass-border)] bg-muted/40 py-3.5 pl-12 pr-28 text-sm text-foreground outline-none transition focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/20"
              autoComplete="off"
              aria-label="Search UpForge challenges"
            />
            <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full bg-accent-primary px-5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:opacity-90">
              Search
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-card px-3.5 py-2.5 text-xs font-bold text-foreground shadow-sm">
                <Filter className="h-3.5 w-3.5 text-accent-gold" /> Filters
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-30 mt-2 w-[min(92vw,420px)] rounded-2xl border border-[var(--glass-border)] bg-card p-4 shadow-xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">Category</p>
                    <div className="flex flex-wrap gap-1.5">
                      <Link href={makeHref({ category: undefined })} className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${!category ? "bg-accent-gold text-slate-950" : "bg-muted text-muted-foreground"}`}>All</Link>
                      {categories.map((item) => <Link key={item} href={makeHref({ category: item })} className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${category === item ? "bg-accent-gold text-slate-950" : "bg-muted text-muted-foreground"}`}>{item}</Link>)}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">Month</p>
                    {hasDateMetadata ? (
                      <div className="flex flex-wrap gap-1.5">
                        <Link href={makeHref({ month: undefined })} className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${!month ? "bg-accent-gold text-slate-950" : "bg-muted text-muted-foreground"}`}>All months</Link>
                        {months.map((m) => <Link key={m} href={makeHref({ month: m })} className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${month === m ? "bg-accent-gold text-slate-950" : "bg-muted text-muted-foreground"}`}>{new Date(`${m}-01T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</Link>)}
                      </div>
                    ) : (
                      <div className="rounded-xl bg-muted/60 p-3 text-[11px] leading-5 text-muted-foreground">Month filtering will appear automatically when challenge publication dates are added to the quiz metadata.</div>
                    )}
                  </div>
                </div>
                <div className="mt-4 border-t border-[var(--glass-border)] pt-4">
                  <Link href={makeHref({ popular: popular ? undefined : "1" })} className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${popular ? "bg-accent-gold text-slate-950" : "bg-muted text-muted-foreground"}`}><Flame className="h-3.5 w-3.5" /> Popular challenges</Link>
                </div>
              </div>
            </details>
            <div className="flex items-center gap-1.5">
              <span className="hidden text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground sm:inline">Sort</span>
              <Link href={makeHref({ sort: "name" })} className={`rounded-xl px-3 py-2 text-[11px] font-bold ${sort === "name" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}`}>A–Z</Link>
              <Link href={makeHref({ sort: "date" })} className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-bold ${sort === "date" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}`}><CalendarDays className="h-3.5 w-3.5" /> Date</Link>
              {filtered && <Link href="/quiz" className="inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-[11px] font-bold text-accent-gold hover:bg-accent-gold/10"><X className="h-3 w-3" /> Clear</Link>}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="mb-6 flex items-end justify-between border-b border-[var(--glass-border)] pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-gold">Assessment library</p>
              <h2 className="mt-1 text-xl font-bold text-foreground">{q ? `Results for “${sp.q}”` : category || "All challenges"}</h2>
            </div>
            <span className="text-xs text-muted-foreground">{quizzes.length} available</span>
          </div>

          {quizzes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--glass-border)] bg-card p-12 text-center">
              <p className="font-bold text-foreground">No matching challenges</p>
              <p className="mt-1 text-sm text-muted-foreground">Try another keyword or clear the filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <article key={quiz.slug} className="group overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-card shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent-gold/50 hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row">
                    <Link href={`/quiz/${quiz.slug}`} className="relative block shrink-0 overflow-hidden bg-muted sm:w-[260px] md:w-[300px]">
                      <div className="aspect-[16/9] sm:aspect-auto sm:h-full sm:min-h-[205px]">
                        <img src={quiz.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" loading="lazy" />
                      </div>
                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white backdrop-blur">{quiz.category}</span>
                    </Link>
                    <div className="min-w-0 flex-1 p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-accent-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-gold">{quiz.badge}</span>
                      </div>
                      <Link href={`/quiz/${quiz.slug}`}>
                        <h3 className="mt-3 text-xl font-bold leading-tight text-foreground transition group-hover:text-accent-gold sm:text-2xl">{quiz.title.split("|")[0].trim()}</h3>
                      </Link>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{quiz.description || quiz.tagline}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-accent-gold" />{quiz.duration || quiz.time}</span>
                        <span>{quiz.questions.length} questions</span>
                        <span>{quiz.baseParticipants.toLocaleString()}+ completions</span>
                        <span className="font-bold text-accent-gold">Certificate included</span>
                      </div>
                    </div>
                    <Link href={`/quiz/${quiz.slug}`} className="mx-5 mb-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-accent-gold/40 bg-accent-gold px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-950 transition hover:bg-accent-gold/90 sm:m-6 sm:ml-0">
                      Start challenge <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-32 rounded-2xl border border-[var(--glass-border)] bg-card p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-gold">Why UpForge</p>
            <h3 className="mt-2 text-lg font-bold text-foreground">Built to be quick. Built to be useful.</h3>
            <div className="mt-5 space-y-4">
              {[
                ["01", "Short assessments", "Finish most challenges in minutes, not hours."],
                ["02", "Server-verified results", "Scoring is verified on the server before a result is recorded."],
                ["03", "Professional credential", "Download and share a clean completion certificate."],
              ].map(([n, title, text]) => (
                <div key={n} className="border-t border-[var(--glass-border)] pt-4 first:border-t-0 first:pt-0">
                  <span className="font-mono text-[10px] font-bold text-accent-gold">{n}</span>
                  <p className="mt-1 text-sm font-bold text-foreground">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
