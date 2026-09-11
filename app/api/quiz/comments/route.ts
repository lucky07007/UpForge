import { NextRequest, NextResponse } from "next/server";
import {
  QUIZ_REGISTRY,
} from "@/lib/quizData";
import {
  adminAddDocument,
  adminListDocuments,
} from "@/lib/firebase-admin";
import {
  allowRateLimitedRequest,
  getClientIp,
} from "@/lib/quiz-rate-limit";

type CommentItem = {
  id?: string;
  author: string;
  comment: string;
  userRole?: "Founder" | "Student" | string;
  company?: string;
  displayRole?: string;
  createdAt?: string;
  source?: "firebase" | "seed";
};

type CachedComments = {
  expiresAt: number;
  comments: CommentItem[];
};

const commentCache =
  new Map<string, CachedComments>();

const CACHE_MS = 60_000;

/*
 * Important:
 * Firebase is intentionally read only in a tiny slice.
 * The rest of the discussion is deterministic starter content.
 */
const FIREBASE_READ_LIMIT = 4;
const SEEDED_COMMENT_COUNT = 40;

const ABUSE_TERMS = [
  "fuck",
  "fucking",
  "motherfucker",
  "shit",
  "bitch",
  "bastard",
  "asshole",
  "dumbass",
  "stfu",
  "chutiya",
  "chutia",
  "madarchod",
  "madharchod",
  "bhenchod",
  "behenchod",
  "bc",
  "mc",
  "gandu",
  "gaand",
  "harami",
  "kamina",
  "kamine",
];

const STUDENT_NAMES = [
  "Aarav S.",
  "Meera K.",
  "Rohan M.",
  "Ananya P.",
  "Ishaan R.",
  "Kavya N.",
  "Dev A.",
  "Nisha V.",
  "Yash T.",
  "Riya S.",
  "Aditya K.",
  "Sana M.",
  "Vihaan P.",
  "Priya R.",
  "Karan D.",
  "Simran J.",
  "Arjun B.",
  "Neha G.",
  "Rahul P.",
  "Tanya S.",
];

const STUDENT_LOCATIONS = [
  "Bengaluru",
  "Delhi NCR",
  "Mumbai",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Jaipur",
  "Ahmedabad",
  "Indore",
];

const FOUNDER_NOTES = [
  {
    author: "Sumit",
    company: "Arjuna AI",
  },
  {
    author: "Lucky Tiwari",
    company: "UpForge",
  },
];

const CATEGORY_ANGLES: Record<
  string,
  string[]
> = {
  "Startup Intelligence": [
    "conversion rate",
    "customer retention",
    "unit economics",
    "runway",
    "customer validation",
    "product feedback",
    "market size",
    "subscription thinking",
  ],

  "Marketing & Growth": [
    "conversion rate",
    "customer interviews",
    "target audience",
    "engagement",
    "CAC",
    "customer journey",
    "content",
    "landing-page experience",
  ],

  "Career & Leadership": [
    "building a useful portfolio",
    "answering interview questions clearly",
    "learning and mentorship",
    "professional networking",
    "showing real work",
    "salary negotiation",
    "continuous upskilling",
    "taking ownership",
  ],

  Fundraising: [
    "dilution",
    "post-money valuation",
    "early-stage instruments",
    "pitch decks",
    "cap tables",
    "ownership",
    "due diligence",
    "investor fit",
  ],

  "AI & Technology": [
    "giving AI better context",
    "bias and fairness",
    "verifying AI output",
    "human-in-the-loop workflows",
    "machine learning",
    "data privacy",
    "AI hallucinations",
    "critical thinking",
  ],
};

const GENERIC_ANGLES = [
  "making the decision practical",
  "understanding the trade-off",
  "looking at the problem before the solution",
  "using evidence instead of assumptions",
  "turning the idea into an actual next step",
  "keeping the fundamentals clear",
  "thinking about the user outcome",
  "measuring what happens after the decision",
];

const STARTERS = [
  "The {angle} part was a good reminder that the obvious answer is not always the useful one.",

  "I liked that the challenge tested {angle} instead of just definitions. It made me slow down before picking an option.",

  "The section around {angle} felt especially practical. This is the kind of thing that shows up outside a textbook.",

  "One takeaway for me was to treat {angle} as a decision, not just a metric or buzzword.",

  "The {angle} question was simple on the surface, but the trade-off is easy to miss when you're moving fast.",

  "I would actually use the {angle} idea in a real project. Short challenge, but there is a useful takeaway here.",

  "Good reminder on {angle}. It is easy to optimise the visible number and miss what is causing it.",

  "The best part was how {angle} was connected to an actual situation rather than a memorisation question.",

  "I got this one wrong on my first instinct. The explanation around {angle} made the reasoning much clearer.",

  "This challenge made me think about {angle} a little differently. The practical framing worked well.",

  "For me, the useful lesson was that {angle} needs context. The number alone does not tell the whole story.",

  "I liked the operator-style framing around {angle}. It feels closer to a real decision than a typical quiz question.",

  "The {angle} scenario is something I can imagine discussing with a team. Nice balance between speed and depth.",

  "A small point, but {angle} is exactly where people tend to jump to conclusions. Good test of judgment.",

  "Finished this in a few minutes and still wrote down a note about {angle}. That is probably the best sign that the questions worked.",

  "The challenge is short, but {angle} gave it enough depth to make the result feel useful.",

  "I would revisit the {angle} question after a month. It is one of those decisions that changes with more experience.",

  "The practical angle on {angle} was stronger than the usual theory-heavy questions I see.",

  "The wording around {angle} was clear. I did not need to guess what the question was really asking.",

  "My main takeaway: slow down for thirty seconds when {angle} is involved. The first answer can be misleading.",
];

const FOUNDER_TEMPLATES = [
  "Useful framing on {angle}. In practice, the hard part is usually getting the team to agree on what evidence matters before acting.",

  "I liked the emphasis on {angle}. Early teams often move quickly, but the decision quality still depends on asking the right question first.",

  "Good operator-level question on {angle}. The important part is not the terminology; it is what decision you make with the information.",

  "The {angle} scenario is close to the kind of trade-off founders actually face. Short challenge, solid reminder.",

  "For {angle}, I would always look at the context behind the number before making the call. Good inclusion in the assessment.",

  "The challenge keeps coming back to first principles, especially around {angle}. That is a useful habit for any builder.",
];

function publicJson(
  data: unknown,
  status = 200,
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control":
        "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",

      "CDN-Cache-Control":
        "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",
    },
  });
}

function noStoreJson(
  data: unknown,
  status = 200,
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control":
        "no-store, max-age=0",
    },
  });
}

function normalizeForModeration(
  value: string,
) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .replace(/[@4]/g, "a")
    .replace(/[3]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/[0]/g, "o")
    .replace(/[5$]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAbuse(
  value: string,
) {
  const normalized =
    normalizeForModeration(value);

  return ABUSE_TERMS.some(
    (term) => {
      const escaped =
        term.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );

      return new RegExp(
        `(?:^|\\s)${escaped}(?:$|\\s)`,
        "i",
      ).test(normalized);
    },
  );
}

function cleanText(
  value: unknown,
  max: number,
) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function hashString(
  value: string,
) {
  let hash = 2166136261;

  for (
    let index = 0;
    index < value.length;
    index += 1
  ) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(
      hash,
      16777619,
    );
  }

  return hash >>> 0;
}

function seededPick<T>(
  items: T[],
  seed: number,
) {
  if (!items.length) {
    return undefined;
  }

  return items[
    Math.abs(seed) % items.length
  ];
}

function extractQuestionAngles(
  quiz: (typeof QUIZ_REGISTRY)[number],
) {
  const source =
    `${quiz.category} ${quiz.title} ${
      quiz.tagline
    } ${
      quiz.description || ""
    } ${quiz.questions
      .map(
        (question) =>
          question.question,
      )
      .join(" ")}`
      .toLowerCase();

  const known = [
    "conversion rate",
    "customer retention",
    "unit economics",
    "runway",
    "customer validation",
    "product feedback",
    "market size",
    "subscription thinking",
    "target audience",
    "engagement",
    "CAC",
    "customer journey",
    "content",
    "landing-page experience",
    "dilution",
    "post-money valuation",
    "early-stage instruments",
    "pitch decks",
    "cap tables",
    "ownership",
    "due diligence",
    "investor fit",
    "giving AI better context",
    "bias and fairness",
    "verifying AI output",
    "human-in-the-loop workflows",
    "machine learning",
    "data privacy",
    "AI hallucinations",
    "critical thinking",
    "building a useful portfolio",
    "answering interview questions clearly",
    "learning and mentorship",
    "professional networking",
    "showing real work",
    "salary negotiation",
    "continuous upskilling",
    "taking ownership",
  ];

  const detected =
    known.filter(
      (angle) =>
        source.includes(
          angle.toLowerCase(),
        ),
    );

  return detected.length
    ? detected
    : CATEGORY_ANGLES[
        quiz.category
      ] || GENERIC_ANGLES;
}

function makeSeededComments(
  quiz: (typeof QUIZ_REGISTRY)[number],
): CommentItem[] {
  const angles =
    extractQuestionAngles(quiz);

  const seed = hashString(
    quiz.slug,
  );

  const comments: CommentItem[] =
    [];

  for (
    let index = 0;
    index < SEEDED_COMMENT_COUNT;
    index += 1
  ) {
    const localSeed =
      seed + index * 7919;

    const angle =
      seededPick(
        angles,
        localSeed,
      ) ||
      "making the decision practical";

    const isFounder =
      index === 7 ||
      index === 29;

    const templatePool =
      isFounder
        ? FOUNDER_TEMPLATES
        : STARTERS;

    const template =
      seededPick(
        templatePool,
        localSeed + 17,
      ) ||
      STARTERS[
        index %
          STARTERS.length
      ];

    const text =
      template.replace(
        "{angle}",
        angle,
      );

    if (isFounder) {
      const founder =
        FOUNDER_NOTES[
          index === 7 ? 0 : 1
        ];

      comments.push({
        id: `seed_${quiz.slug}_founder_${index}`,

        author:
          founder.author,

        company:
          founder.company,

        userRole:
          "Founder",

        displayRole:
          `Founder @ ${founder.company}`,

        comment: text,

        source: "seed",
      });

      continue;
    }

    const studentName =
      seededPick(
        STUDENT_NAMES,
        localSeed + 31,
      ) ||
      STUDENT_NAMES[
        index %
          STUDENT_NAMES.length
      ];

    const location =
      seededPick(
        STUDENT_LOCATIONS,
        localSeed + 53,
      ) ||
      STUDENT_LOCATIONS[
        index %
          STUDENT_LOCATIONS.length
      ];

    comments.push({
      id: `seed_${quiz.slug}_student_${index}`,

      author: studentName,

      userRole:
        "Student",

      displayRole:
        `Student · ${location}`,

      comment: text,

      source: "seed",
    });
  }

  return comments;
}

function mergeComments(
  quiz: (typeof QUIZ_REGISTRY)[number],
  firebaseComments: CommentItem[],
) {
  const seeded =
    makeSeededComments(quiz);

  const seen = new Set<string>();
  const merged: CommentItem[] =
    [];

  /*
   * Real member comments first.
   * Only a tiny Firebase slice is ever read.
   * Starter notes then fill the conversation.
   */
  for (
    const item of [
      ...firebaseComments,
      ...seeded,
    ]
  ) {
    const key =
      item.id ||
      `${item.author}:${item.comment}:${item.createdAt || ""}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    merged.push(item);
  }

  return merged.slice(0, 50);
}

export async function GET(
  req: NextRequest,
) {
  const quizSlug =
    new URL(req.url).searchParams.get(
      "quizSlug",
    ) ||
    "startup-iq-challenge-2026";

  const quiz =
    QUIZ_REGISTRY.find(
      (item) =>
        item.slug === quizSlug,
    );

  if (!quiz) {
    return publicJson(
      {
        success: false,
        comments: [],
        error: "Quiz not found.",
      },
      404,
    );
  }

  const cached =
    commentCache.get(
      quizSlug,
    );

  if (
    cached &&
    cached.expiresAt >
      Date.now()
  ) {
    return publicJson({
      success: true,
      comments:
        cached.comments,

      firebaseReadCount: 0,
    });
  }

  try {
    /*
     * Only four real Firebase documents.
     *
     * This is intentionally NOT 30/50.
     * Starter content is generated locally from the quiz data.
     */
    const docs =
      await adminListDocuments(
        `comments/${quizSlug}/userComments`,
        FIREBASE_READ_LIMIT,
      );

    const firebaseComments: CommentItem[] =
      docs
        .map((doc: any) => ({
          ...(doc || {}),
          source:
            "firebase" as const,
        }))
        .sort(
          (
            a: CommentItem,
            b: CommentItem,
          ) =>
            new Date(
              b?.createdAt || 0,
            ).getTime() -
            new Date(
              a?.createdAt || 0,
            ).getTime(),
        )
        .slice(
          0,
          FIREBASE_READ_LIMIT,
        );

    const comments =
      mergeComments(
        quiz,
        firebaseComments,
      );

    commentCache.set(
      quizSlug,
      {
        expiresAt:
          Date.now() +
          CACHE_MS,

        comments,
      },
    );

    return publicJson({
      success: true,
      comments,
      firebaseReadCount:
        firebaseComments.length,
    });
  } catch (error) {
    console.error(
      "Comments fetch error:",
      error,
    );

    /*
     * Never make community disappear just because
     * Firebase is temporarily unavailable.
     */
    const comments =
      mergeComments(
        quiz,
        [],
      );

    const stale =
      commentCache.get(
        quizSlug,
      );

    return publicJson({
      success: true,

      comments:
        stale?.comments?.length
          ? stale.comments
          : comments,

      firebaseReadCount: 0,

      stale: true,
    });
  }
}

export async function POST(
  req: NextRequest,
) {
  try {
    const contentLength =
      Number(
        req.headers.get(
          "content-length",
        ) || 0,
      );

    if (
      contentLength >
      16 * 1024
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Request is too large.",
        },
        413,
      );
    }

    const rate =
      allowRateLimitedRequest(
        `comment:${getClientIp(req)}`,
        10,
      );

    if (!rate.allowed) {
      const response =
        noStoreJson(
          {
            success: false,
            error:
              "Too many posts. Please try again shortly.",
          },
          429,
        );

      response.headers.set(
        "Retry-After",
        String(
          rate.retryAfterSeconds,
        ),
      );

      return response;
    }

    const body =
      await req.json();

    if (
      String(
        body?.website || "",
      ).trim()
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Invalid submission.",
        },
        400,
      );
    }

    const quizSlug =
      cleanText(
        body?.quizSlug,
        100,
      );

    const author =
      cleanText(
        body?.author,
        50,
      );

    const userRole =
      cleanText(
        body?.userRole,
        20,
      );

    const company =
      cleanText(
        body?.company,
        80,
      );

    const comment =
      cleanText(
        body?.comment,
        500,
      );

    if (
      !QUIZ_REGISTRY.some(
        (quiz) =>
          quiz.slug ===
          quizSlug,
      )
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Quiz not found.",
        },
        404,
      );
    }

    if (
      !author ||
      !comment
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Name and comment are required.",
        },
        400,
      );
    }

    if (
      ![
        "Founder",
        "Student",
      ].includes(userRole)
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Please select Founder or Student.",
        },
        400,
      );
    }

    if (
      userRole === "Founder" &&
      !company
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Company name is required for founders.",
        },
        400,
      );
    }

    if (
      containsAbuse(author) ||
      containsAbuse(company) ||
      containsAbuse(comment)
    ) {
      return noStoreJson(
        {
          success: false,
          error:
            "Please remove abusive language and try again.",
        },
        400,
      );
    }

    const payload = {
      author,

      comment,

      userRole,

      company:
        userRole === "Founder"
          ? company
          : "",

      displayRole:
        userRole === "Founder"
          ? `Founder @ ${company}`
          : "Student",

      createdAt:
        new Date().toISOString(),

      likesCount: 0,
    };

    /*
     * Reverse timestamp keeps newest real member
     * comments near the front of Firestore ordering.
     */
    const reverseTimestamp =
      String(
        9_999_999_999_999 -
          Date.now(),
      ).padStart(
        13,
        "0",
      );

    const entropy =
      typeof crypto !==
        "undefined" &&
      "randomUUID" in crypto
        ? crypto
            .randomUUID()
            .replace(
              /-/g,
              "",
            )
            .slice(
              0,
              12,
            )
        : Math.random()
            .toString(36)
            .slice(
              2,
              14,
            );

    const commentId =
      `c_${reverseTimestamp}_${entropy}`;

    const doc =
      await adminAddDocument(
        `comments/${quizSlug}/userComments`,
        payload,
        commentId,
      );

    /*
     * Next GET can refresh the tiny real-user slice.
     */
    commentCache.delete(
      quizSlug,
    );

    return noStoreJson(
      {
        success: true,

        comment: {
          ...(doc || {}),
          ...payload,
          source:
            "firebase",
        },
      },
      201,
    );
  } catch (error) {
    console.error(
      "Post comment error:",
      error,
    );

    return noStoreJson(
      {
        success: false,
        error:
          "Could not post your insight right now. Please try again.",
      },
      500,
    );
  }
}
