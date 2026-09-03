export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface CommentItem {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: string;
  timeAgo: string;
  text: string;
}

export interface QuizItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  duration: string;
  image: string;
  baseParticipants: number;
  metrics: {
    scenariosCount: string;
    avgCompletionTime: string;
    passingStandard: string;
    credentialTier: string;
  };
  questions: Question[];
}

// 12 Sharp, High-Signal Operator Profiles (India, US, China, UK, Singapore)
export const OPERATOR_DISCUSSIONS: CommentItem[] = [
  {
    id: "op_1",
    name: "Arjun Nambiar",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    role: "Founder, Fintech Sandbox",
    location: "Bengaluru, IN",
    timeAgo: "18m ago",
    text: "The runway math is brutally realistic. Most early founders underestimate net burn."
  },
  {
    id: "op_2",
    name: "Sarah Chen (陈思)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
    role: "Growth Lead",
    location: "Singapore",
    timeAgo: "42m ago",
    text: "Scored 9/10. Scenario 6 on retention vs acquisition should be mandatory reading."
  },
  {
    id: "op_3",
    name: "David K. Miller",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
    role: "Angel Investor",
    location: "San Francisco, US",
    timeAgo: "1h ago",
    text: "Clean, direct, zero academic fluff. This is how practical operator knowledge looks."
  },
  {
    id: "op_4",
    name: "Priyanka Deshmukh",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    role: "Product Strategist",
    location: "Pune, IN",
    timeAgo: "2h ago",
    text: "Certificate design looks exceptionally sharp on LinkedIn. Downloaded seamlessly."
  },
  {
    id: "op_5",
    name: "Wei Zhang (张伟)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    role: "E-Commerce Operator",
    location: "Shenzhen, CN",
    timeAgo: "3h ago",
    text: "Validating customer demand prior to capital deployment was emphasized perfectly."
  },
  {
    id: "op_6",
    name: "Oliver Wright",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces",
    role: "Venture Scout",
    location: "London, UK",
    timeAgo: "4h ago",
    text: "10 scenarios, 3 minutes, verified credential. Standardizing startup acumen well."
  },
  {
    id: "op_7",
    name: "Kabir Mehta",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces",
    role: "Fullstack Builder",
    location: "Gurugram, IN",
    timeAgo: "5h ago",
    text: "Machine learning churn prediction question reflects modern B2B SaaS workflows accurately."
  },
  {
    id: "op_8",
    name: "Jessica Taylor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces",
    role: "Brand Strategist",
    location: "Austin, US",
    timeAgo: "6h ago",
    text: "Target audience precision over mass marketing was framed crisply."
  },
  {
    id: "op_9",
    name: "Li Na (李娜)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces",
    role: "Tech Director",
    location: "Shanghai, CN",
    timeAgo: "7h ago",
    text: "Zero page lag, smooth mobile touch interaction, high practical signal."
  },
  {
    id: "op_10",
    name: "Aditya Roy",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces",
    role: "Pre-seed Operator",
    location: "Hyderabad, IN",
    timeAgo: "8h ago",
    text: "The conversion rate vs traffic spike scenario caught 2 of our team members off guard. Good test."
  }
];

export const QUIZ_REGISTRY: QuizItem[] = [
  {
    id: "startup-iq-2026",
    slug: "startup-iq-challenge-2026",
    title: "How Startup-Smart Are You? | UpForge Startup IQ Challenge 2026",
    tagline: "Think like a founder. Decide like a builder. Test your Startup IQ.",
    badge: "Official Benchmark",
    duration: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/UpForge%2020Startup%2020IQ%2020Challenge%20202026.webp",
    baseParticipants: 18450,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.4 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Founder Level"
    },
    questions: [
      {
        id: 1,
        question: "A startup gets 10,000 website visitors, but only 500 sign up. What should the team calculate first to understand this?",
        options: ["Burn Rate", "Conversion Rate", "Customer Lifetime Value", "Runway"],
        correctIndex: 1
      },
      {
        id: 2,
        question: "A startup has thousands of website visitors, but very few complete the signup process. What should the founder investigate first?",
        options: [
          "Hire more salespeople",
          "Identify where users are dropping off and improve the signup experience",
          "Increase the office budget",
          "Launch a new product"
        ],
        correctIndex: 1
      },
      {
        id: 3,
        question: "A software startup charges customers ₹999 every month to continue using its platform. What business model is this?",
        options: ["One-time purchase", "Subscription", "Marketplace", "Commission-only"],
        correctIndex: 1
      },
      {
        id: 4,
        question: "A company spends ₹50,000 on marketing and acquires 100 new customers. What is its approximate CAC?",
        options: ["₹50", "₹500", "₹5,000", "₹50,000"],
        correctIndex: 1
      },
      {
        id: 5,
        question: "A startup has ₹30 lakh in cash and spends ₹5 lakh every month. Approximately how much runway does it have?",
        options: ["3 months", "5 months", "6 months", "12 months"],
        correctIndex: 2
      },
      {
        id: 6,
        question: "A startup's user count is growing rapidly, but most new users stop using the product after one week. What should concern the founder most?",
        options: ["Retention", "Logo design", "Office size", "Number of employees"],
        correctIndex: 0
      },
      {
        id: 7,
        question: "A startup uses historical customer data to predict which users are likely to cancel their subscription. What technology is primarily being used?",
        options: ["Machine Learning", "Word Processing", "Cloud Storage", "UI Design"],
        correctIndex: 0
      },
      {
        id: 8,
        question: "Your first 100 customers repeatedly complain about the same feature. What's the smartest next step?",
        options: [
          "Ignore them because the product is already launched",
          "Identify the pattern, understand the underlying problem and improve the product",
          "Immediately increase advertising",
          "Remove all customer reviews"
        ],
        correctIndex: 1
      },
      {
        id: 9,
        question: "Startup A operates in a market worth ₹10 crore. Startup B operates in a similar market worth ₹1,000 crore. Assuming other factors are comparable, which has the larger addressable market?",
        options: ["Startup B", "Startup A", "Both are equal", "Cannot be compared"],
        correctIndex: 0
      },
      {
        id: 10,
        question: "You have a startup idea but aren't sure whether people actually want it. What should you do before investing heavily in building it?",
        options: [
          "Build the complete product first",
          "Validate the problem and customer demand",
          "Hire a large team",
          "Spend heavily on advertising"
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: "marketing-iq-2026",
    slug: "marketing-iq-challenge-2026",
    title: "UpForge Marketing IQ Challenge 2026",
    tagline: "Think like a marketer. Understand what makes people act.",
    badge: "Growth Benchmark",
    duration: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/UpForge%2020Marketing%2020IQ%2020Challenge%20202026.webp",
    baseParticipants: 14210,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.2 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Growth Operator"
    },
    questions: [
      {
        id: 1,
        question: "A website gets 10,000 visitors but only 200 purchases. What should you examine first?",
        options: ["Logo", "Conversion rate", "Office size", "Employee count"],
        correctIndex: 1
      },
      {
        id: 2,
        question: "A company wants to understand why customers are buying its product. What is most useful?",
        options: ["Customer interviews", "More advertisements", "New logo", "More followers"],
        correctIndex: 0
      },
      {
        id: 3,
        question: "Which is the strongest example of a target audience?",
        options: ["Everyone", "People who use the internet", "College students looking for internships", "All Indians"],
        correctIndex: 2
      },
      {
        id: 4,
        question: "An Instagram post gets 1,000 views and 100 people interact with it. What does this primarily indicate?",
        options: ["Engagement", "Revenue", "Profit", "Market size"],
        correctIndex: 0
      },
      {
        id: 5,
        question: "A startup spends ₹20,000 on ads and gets 40 customers. What is its CAC?",
        options: ["₹200", "₹400", "₹500", "₹800"],
        correctIndex: 2
      },
      {
        id: 6,
        question: "A customer sees an ad, visits the website, compares alternatives and then purchases. This is part of the:",
        options: ["Customer journey", "Balance sheet", "Hiring funnel", "Supply chain"],
        correctIndex: 0
      },
      {
        id: 7,
        question: "Which headline is most likely to attract a founder looking for networking?",
        options: ["“We are a company.”", "“Join our platform.”", "“Meet founders building what comes next.”", "“Our website is live.”"],
        correctIndex: 2
      },
      {
        id: 8,
        question: "A campaign receives lots of clicks but almost no sign-ups. What should the marketer investigate?",
        options: ["Landing page and user experience", "Office location", "Company logo size", "Number of employees"],
        correctIndex: 0
      },
      {
        id: 9,
        question: "A brand consistently publishes useful content that attracts potential customers without directly selling every time. This is:",
        options: ["Content marketing", "Cold calling", "Accounting", "Inventory management"],
        correctIndex: 0
      },
      {
        id: 10,
        question: "You have ₹10,000 to promote a new product, but don't know which audience responds best. What's the smartest approach?",
        options: ["Spend everything immediately", "Test small campaigns with different audiences and measure results", "Target everyone", "Stop marketing"],
        correctIndex: 1
      }
    ]
  }
];
