// lib/quizData.ts

export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  id: string;
  name: string;
  badge: string;
  description: string;
  questions: Question[];
}

export const QUIZ_REGISTRY: Quiz[] = [
  {
    id: "startup_readiness",
    name: "Startup & MVP Readiness Test",
    badge: "Founder Level",
    description: "Jaaniye kya aapka idea market launch aur scaling ke liye ready hai.",
    questions: [
      {
        question: "Product-Market Fit (PMF) achieve karne ka sabse reliable indicator kya hai?",
        options: ["High ad spends", "High organic retention & word of mouth", "Big social media following", "Fancy landing page"],
        correctIndex: 1
      },
      {
        question: "Early stage startup me customer acquisition cost (CAC) kam rakhne ke liye primary focus kya hona chahiye?",
        options: ["Organic SEO & Content Engine", "Only Paid TV Ads", "Cold calling randomly", "Offering 100% discount forever"],
        correctIndex: 0
      },
      {
        question: "MVP (Minimum Viable Product) ka mukhya maksad kya hota hai?",
        options: ["Poora enterprise product banana", "Kam se kam features ke sath core value validate karna", "Seedhi funding uthana", "100 employees hire karna"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "tech_stack_architecture",
    name: "Full Stack & Web Architecture",
    badge: "Tech Sprint",
    description: "Next.js, database design aur scaling fundamentals par quick test.",
    questions: [
      {
        question: "Next.js me Server-Side Rendering (SSR) ka main advantage kya hota hai?",
        options: ["No JavaScript execution", "Better SEO & initial page load performance", "Slow database query", "Static images only"],
        correctIndex: 1
      },
      {
        question: "Relational databases (jaise PostgreSQL) me structured data query karne ke liye primary standard kya hai?",
        options: ["HTML", "SQL", "CSS", "JSON"],
        correctIndex: 1
      },
      {
        question: "Search engines ke liye fast indexing aur sitemaps kyu important hote hain?",
        options: ["Better crawlability aur page ranking", "Server band karne ke liye", "Website slow karne ke liye", "Ad cost badhane ke liye"],
        correctIndex: 0
      }
    ]
  }
];
