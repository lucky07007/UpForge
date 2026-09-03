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
  level: string;
  duration: string;
  image: string;
  baseParticipants: number;
  overview: {
    heading: string;
    subheading: string;
    highlights: string[];
    whatYouLearn: string[];
    criteria: string[];
  };
  questions: Question[];
}

// 20+ Realistic Global User Profiles (India, US, China, UK, Singapore)
export const GLOBAL_SEED_USERS: Array<{
  name: string;
  avatar: string;
  role: string;
  location: string;
  poolComments: string[];
}> = [
  {
    name: "Arjun Nambiar",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    role: "Founder, Fintech Sandbox",
    location: "Bengaluru, IN",
    poolComments: [
      "The runway and CAC calculations hit hard. Real world numbers instead of college theory.",
      "Finished in 4 mins. Clean, no fluff, straight to the point.",
      "Shared this with my incubator cohort. Essential check for any early stage founder."
    ]
  },
  {
    name: "Sarah Chen (陈思)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
    role: "Growth Lead @ ScaleX",
    location: "Singapore",
    poolComments: [
      "Scored 9/10! The distinction between vanity metrics and organic retention was spot on.",
      "The certificate looks so premium on LinkedIn. Great initiative by UpForge.",
      "Customer journey question was tricky but very well articulated."
    ]
  },
  {
    name: "David K. Miller",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
    role: "Angel Investor & Ex-PM",
    location: "San Francisco, US",
    poolComments: [
      "I evaluate pitch decks weekly. If founders can't answer these 10 questions, they shouldn't raise.",
      "Extremely realistic scenarios. Loved how PMF was framed.",
      "Solid benchmark test. Fast and insightful."
    ]
  },
  {
    name: "Priyanka Deshmukh",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    role: "Product Marketer",
    location: "Pune, IN",
    poolComments: [
      "The conversion funnel scenario is literally what our marketing team debated yesterday.",
      "Crisp user experience. Took less than 4 minutes.",
      "Happy with my 'Founder Mindset' score! Keep bringing more niche quizzes."
    ]
  },
  {
    name: "Wei Zhang (张伟)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    role: "E-Commerce Tech Lead",
    location: "Shenzhen, CN",
    poolComments: [
      "Fast loading and responsive UI. CAC questions were very practical.",
      "Validation before heavy engineering is rule #1. Glad to see it emphasized.",
      "Clean evaluation. Downloaded the certificate smoothly."
    ]
  },
  {
    name: "Oliver Wright",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces",
    role: "Venture Scout",
    location: "London, UK",
    poolComments: [
      "Scenario-based testing beats traditional academic quizzes every day of the week.",
      "Every accelerator program should use this as a preliminary baseline test.",
      "Minimalist design, fast execution. 10/10 UX."
    ]
  },
  {
    name: "Kabir Mehta",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces",
    role: "Fullstack Builder",
    location: "Gurugram, IN",
    poolComments: [
      "Machine learning vs traditional data question was crisp. Good scenarios.",
      "Scored 8/10. Realized I need to tighten our product analytics.",
      "Certificate looks very credible with the official seal and logo."
    ]
  },
  {
    name: "Jessica Taylor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces",
    role: "Brand Strategist",
    location: "Austin, US",
    poolComments: [
      "Target audience definition question was so refreshing. Most people still get that wrong.",
      "Clean certification download. Added it directly to my professional credentials.",
      "Simple, modern, and trustworthy."
    ]
  },
  {
    name: "Li Na (李娜)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces",
    role: "Operations Director",
    location: "Shanghai, CN",
    poolComments: [
      "The emphasis on customer demand over office expansion made me smile. Realistic!",
      "Fast response time, zero page lag.",
      "Comprehensive scenarios for new venture teams."
    ]
  },
  {
    name: "Aditya Roy",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces",
    role: "Pre-seed Founder",
    location: "Hyderabad, IN",
    poolComments: [
      "Calculating runway correctly is the difference between life and death for startups.",
      "Took the quiz on mobile. Touch targets and layout are effortless.",
      "UpForge has built something really neat here."
    ]
  },
  {
    name: "Michael Chang",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&crop=faces",
    role: "Performance Marketer",
    location: "Seattle, US",
    poolComments: [
      "A/B testing and small budget experimentation is the holy grail of modern growth.",
      "Loved the instant feedback without requiring 15 form fields upfront.",
      "Well-structured questions."
    ]
  },
  {
    name: "Meera Sen",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces",
    role: "EdTech Researcher",
    location: "Kolkata, IN",
    poolComments: [
      "The pedagogy here is high quality. Real decision-making frameworks tested.",
      "Flawless score of 10/10. Proud of my certificate.",
      "Will recommend to our student community."
    ]
  },
  {
    name: "Lucas Vance",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&h=120&fit=crop&crop=faces",
    role: "SaaS Consultant",
    location: "Toronto, CA",
    poolComments: [
      "The question on recurring subscription mechanics is essential reading.",
      "Very neat typography and certificate design.",
      "Took only 3 minutes."
    ]
  },
  {
    name: "Ananya Pillai",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&h=120&fit=crop&crop=faces",
    role: "Content Marketing Lead",
    location: "Chennai, IN",
    poolComments: [
      "Content marketing as a compounding asset was explained wonderfully in the scenario.",
      "Good blend of strategic mindset questions.",
      "Easy and seamless flow."
    ]
  },
  {
    name: "Hao Huang (黄浩)",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=faces",
    role: "Angel Syndicator",
    location: "Beijing, CN",
    poolComments: [
      "Good evaluation of unit economics. Many founders miss CAC vs LTV parity.",
      "Professional certificate design, worthy of being shared publicly.",
      "Very high signal-to-noise ratio."
    ]
  },
  {
    name: "Rachel Greenburg",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces",
    role: "Product Designer & Co-founder",
    location: "New York, US",
    poolComments: [
      "Solving recurring customer complaints rather than adding features is true PM thinking.",
      "The UI looks just like Coursera / Reforge. Super clean.",
      "Great experience overall."
    ]
  },
  {
    name: "Tanvi Kulkarni",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=faces",
    role: "Startup Community Manager",
    location: "Mumbai, IN",
    poolComments: [
      "Our entire founder group took this quiz today. Generated great discussions on runway!",
      "Super smooth on mobile browser.",
      "Certificate verification ID adds high trust."
    ]
  },
  {
    name: "Marcus Aurelius Vance",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=120&h=120&fit=crop&crop=faces",
    role: "GTM Consultant",
    location: "Boston, US",
    poolComments: [
      "Conversion rate before burn rate when analyzing traffic drops is so fundamental.",
      "Well-crafted questions with zero fluff.",
      "High standard of questions."
    ]
  },
  {
    name: "Xin Yi (心怡)",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=120&h=120&fit=crop&crop=faces",
    role: "Data Analyst",
    location: "Guangzhou, CN",
    poolComments: [
      "Machine learning churn modeling question is aligned with real industry applications.",
      "Quick assessment, verified score.",
      "Certificate looks elegant with the gold seal."
    ]
  },
  {
    name: "Siddharth Jha",
    avatar: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=120&h=120&fit=crop&crop=faces",
    role: "Venture Associate",
    location: "Delhi NCR, IN",
    poolComments: [
      "A 3-minute quiz that actually teaches you how to think like an operator. Respect to UpForge.",
      "Saved my certificate PNG. Crisp typography.",
      "10/10 challenge."
    ]
  }
];

// Helper to generate dynamic authentic comments per quiz
export function getSeededQuizComments(quizId: string, count: number = 8): CommentItem[] {
  // Deterministic seed based on quiz ID so it stays consistent yet varied
  const timeLabels = ["10 mins ago", "45 mins ago", "2 hours ago", "5 hours ago", "Yesterday", "2 days ago"];
  
  return GLOBAL_SEED_USERS.slice(0, count).map((user, idx) => {
    const commentText = user.poolComments[(idx + (quizId.length % 3)) % user.poolComments.length];
    return {
      id: `comm_${quizId}_${idx}`,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      location: user.location,
      timeAgo: timeLabels[idx % timeLabels.length],
      text: commentText
    };
  });
}

export const QUIZ_REGISTRY: QuizItem[] = [
  {
    id: "startup-iq-2026",
    slug: "startup-iq-challenge-2026",
    title: "How Startup-Smart Are You? | UpForge Startup IQ Challenge 2026",
    tagline: "Think like a founder. Decide like a builder. Test your Startup IQ.",
    badge: "Executive Assessment",
    level: "All Founder Levels",
    duration: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/UpForge Startup IQ Challenge 2026.webp",
    baseParticipants: 16840,
    overview: {
      heading: "🚀 Startup IQ Challenge 2026",
      subheading: "Scenario-based problem solving for modern operators, tech builders and entrepreneurs.",
      highlights: [
        "10 Real-world founder dilemmas & calculations",
        "Deterministic metric scoring (CAC, Runway, PMF)",
        "Zero generic book definitions; 100% decision logic",
        "Official UpForge Executive Certificate with gold verification seal"
      ],
      whatYouLearn: [
        "How to accurately gauge runway and net burn rate without spreadsheet confusion",
        "Diagnosing visitor drop-offs and prioritising PMF over superficial growth",
        "Managing early customer feedback loops to accelerate iterations",
        "Balancing unit economics before scaling paid customer acquisition"
      ],
      criteria: [
        "Open to students, professionals, founders & startup builders",
        "10 Single-choice scenario questions",
        "No prior venture funding experience required"
      ]
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
    badge: "Growth Sprint",
    level: "Growth & Marketers",
    duration: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/UpForge Marketing IQ Challenge 2026.webp",
    baseParticipants: 12930,
    overview: {
      heading: "🚀 Marketing IQ Challenge 2026",
      subheading: "Tactical and strategic evaluation of acquisition channels, conversion design, and audience psychology.",
      highlights: [
        "10 Customer behavioral scenarios & channel audits",
        "Practical engagement vs conversion distinctions",
        "Actionable CAC and customer journey frameworks",
        "Official UpForge Executive Certificate with gold verification seal"
      ],
      whatYouLearn: [
        "Diagnosing click-heavy yet low-conversion paid traffic campaigns",
        "Conducting meaningful qualitative customer discovery interviews",
        "Formulating sharp target personas that cut through ad noise",
        "Executing micro-budget audience testing before full-scale launches"
      ],
      criteria: [
        "Ideal for creators, marketers, founders and product teams",
        "10 Real-world growth scenarios",
        "No agency background or technical marketing stack needed"
      ]
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
