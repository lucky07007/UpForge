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
  image: string;
  baseParticipants: number;
  description: {
    hero: string;
    sub: string;
    format: string[];
    rewards: string[];
    rules: string[];
    footerNotice: string;
  };
  questions: Question[];
  seedComments: CommentItem[];
}

export const QUIZ_REGISTRY: QuizItem[] = [
  {
    id: "startup-iq-2026",
    slug: "startup-iq-challenge-2026",
    title: "How Startup-Smart Are You? | UpForge Startup IQ Challenge 2026",
    tagline: "Think like a founder. Decide like a builder. Test your Startup IQ.",
    badge: "Founder Level",
    image: "https://images.upforge.org/quiz/UpForge Startup IQ Challenge 2026.webp",
    baseParticipants: 14820,
    description: {
      hero: "🚀 Startup IQ Challenge 2026",
      sub: "How well do you understand startups, business, marketing, technology and growth? Take this quick 10-question challenge and find out.",
      format: [
        "10 Scenario-Based MCQs",
        "Online verified evaluation",
        "3–5 minutes recommended pace",
        "One correct answer per question",
        "Open to students, professionals, founders & startup enthusiasts"
      ],
      rewards: [
        "Instant Startup IQ Score & Accuracy Analysis",
        "Personalized performance level (Founder Mindset / Builder)",
        "Verified UpForge Certificate of Completion"
      ],
      rules: [
        "Participate individually without multiple tabs",
        "Select exactly one answer per scenario",
        "Complete the assessment honestly",
        "No prior startup exit or venture experience required"
      ],
      footerNotice: "Explore UpForge ecosystem tools at upforge.org"
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
    ],
    seedComments: [
      {
        id: "c1",
        name: "Rohan Malhotra",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        location: "Bengaluru, IN",
        timeAgo: "2 hours ago",
        text: "The questions on retention and CAC are brutally accurate for early stage PMF. Took 4 minutes."
      },
      {
        id: "c2",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
        location: "Singapore",
        timeAgo: "5 hours ago",
        text: "Solid scenario-based questions instead of book definitions. Certificate rendered cleanly."
      },
      {
        id: "c3",
        name: "David Miller",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        location: "San Francisco, US",
        timeAgo: "1 day ago",
        text: "Runway calculation and feedback loops are foundational. Every pre-seed founder should take this."
      },
      {
        id: "c4",
        name: "Ananya Iyer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
        location: "Delhi, IN",
        timeAgo: "1 day ago",
        text: "Scored 9/10! Q8 on customer complaints is something most founders overlook."
      }
    ]
  },
  {
    id: "marketing-iq-2026",
    slug: "marketing-iq-challenge-2026",
    title: "UpForge Marketing IQ Challenge 2026",
    tagline: "Think like a marketer. Understand what makes people act.",
    badge: "Growth Sprint",
    image: "https://images.upforge.org/quiz/UpForge Marketing IQ Challenge 2026.webp",
    baseParticipants: 11450,
    description: {
      hero: "🚀 Marketing IQ Challenge 2026",
      sub: "How well do you understand customers, digital marketing, conversion, content and growth? Take this quick 10-question challenge and find out.",
      format: [
        "10 Strategic Marketing MCQs",
        "Interactive scenario assessment",
        "3–5 minutes duration",
        "Single correct answer per question",
        "Open to founders, marketers, creators & students"
      ],
      rewards: [
        "Instant Marketing IQ Score & Metric Breakdown",
        "Personalized growth performance level",
        "Official UpForge Certificate of Completion"
      ],
      rules: [
        "Participate individually",
        "Evaluate real customer and channel behaviors",
        "Complete the quiz honestly",
        "No prior professional agency experience required"
      ],
      footerNotice: "Explore UpForge ecosystem tools at upforge.org"
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
    ],
    seedComments: [
      {
        id: "m1",
        name: "Vikram Singhania",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
        location: "Mumbai, IN",
        timeAgo: "3 hours ago",
        text: "The distinction between engagement and customer journey funnels was crisp. Loved the UX."
      },
      {
        id: "m2",
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
        location: "London, UK",
        timeAgo: "6 hours ago",
        text: "Super clean interface. No bloat, instantly gives you the score and clean breakdown."
      },
      {
        id: "m3",
        name: "Rahul Verma",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=faces",
        location: "Hyderabad, IN",
        timeAgo: "1 day ago",
        text: "Question 10 on micro-budget testing is how every real growth team operates."
      }
    ]
  }
];
