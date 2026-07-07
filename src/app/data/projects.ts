export type ProjectCategory =
  | "Web App"
  | "Mobile App"
  | "Dashboard"
  | "Scraping"
  | "Website"
  | "Corporate Website"
  | "Mobile";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory | ProjectCategory[];
  tagline: string;
  shortDescription: string;
  tech: string[];
  image: string;      // /images/... path
  extraImages?: string[]; // Additional gallery images
  videoUrl?: string;    // Optional video demo URL
  liveUrl?: string;
  codeUrl?: string;
  githubUrl?: string; // mapping to codeUrl
  featured?: boolean;
  status?: 'published' | 'draft';

  // Detail page fields (optional now to stay compatible with simplified data)
  overview?: string;
  context?: string;
  problem?: string;
  solutionFeatures?: string[];
  solution?: string[];
  impact?: string[];
  role?: string;
  timeline?: string;
  location?: string;
  projectStatus?: 'completed' | 'ongoing';
  color?: string;
  subtitle?: string;
}

export const projects: Project[] = [
  {
    id: "arrow-puzzle-game",
    title: "Arrow Puzzle: Tap Away Game",
    slug: "arrow-puzzle-tap-away",
    category: "Mobile App",
    tagline: "A 3D logic puzzle game where players tap away blocks in the correct direction.",
    shortDescription:
      "An addictive 3D puzzle game developed in Flutter, designed to challenge the player's spatial reasoning and logic. Players must carefully observe the direction of arrows on each block and tap them in the correct sequence to clear the board across challenging levels.",
    tech: ["Flutter", "Dart", "Provider", "State Management"],
    image: "/images/projects/arrow-puzzle.png", 
    extraImages: [
      "/images/projects/arrow-puzzle-1.png",
      "/images/projects/arrow-puzzle-2.png"
    ],
    liveUrl: "https://play.google.com/store/apps/details?id=com.shehroz.arrowpuzzlegame",
    codeUrl: "https://github.com/shehroz03/arrowx-flutter-puzzle", 
    githubUrl: "https://github.com/shehroz03/arrowx-flutter-puzzle",
    featured: true,
    status: 'published',
    color: "from-blue-500 to-cyan-600",
    overview: "A highly engaging 3D block puzzle game built with Flutter. It challenges users to think critically and plan their moves to clear intricate formations of blocks by tapping them away in the correct direction.",
    context: "Mobile gamers are constantly looking for engaging, offline-capable brain teasers that offer quick sessions but increasing complexity. Many traditional puzzle games lack satisfying 3D interaction, smooth animations, and progressive difficulty.",
    solutionFeatures: [
      "Intuitive tap-to-clear 3D block mechanics",
      "Hundreds of progressively challenging levels",
      "Fully playable offline without internet dependency",
      "In-game shop and coin reward system",
      "Smooth animations and visually appealing UI"
    ],
    role: "Lead Mobile Game Developer",
    timeline: "June 2026 - July 2026",
    impact: [
      "Successfully developed and published a fully functional 3D logic game on the Google Play Store",
      "Engineered complex level generation and state management using Flutter's Provider",
      "Optimized game performance for 60fps smooth animations across low to mid-range mobile devices"
    ]
  },
  {
    id: "fitcore-pro",
    title: "FitCore Pro - AI-Powered Full-Stack Fitness & Nutrition Ecosystem",
    slug: "fitcore-pro-fitness-ecosystem",
    category: "Mobile App",
    tagline: "AI-driven fitness app with personalized diet planning, workout videos & smart health tracking.",
    shortDescription:
      "A complete AI-powered fitness ecosystem that combines personalized diet planning, guided workout & yoga video libraries, and smart health tracking in one app. Features gender-specialized AI diet doctors that build weekly meal and exercise plans tailored to each user's goals and health conditions.",
    tech: ["React Native", "Expo", "Supabase", "PostgreSQL", "OpenAI GPT-4", "Deno", "Zustand", "React Query"],
    image: "/images/projects/fitcore (1).jpeg",
    extraImages: [
      "/images/projects/fitcore (2).jpeg",
      "/images/projects/fitcore (3).jpeg",
      "/images/projects/fitcore (4).jpeg"
    ],
    // videoUrl: "/videos/fitcorevideo.mp4", // Uncomment and update path when you record the demo video
    liveUrl: "",
    codeUrl: "https://github.com/shehroz03/fitpro-app",
    githubUrl: "https://github.com/shehroz03/fitpro-app",
    featured: true,
    status: 'published',
    color: "from-emerald-500 to-teal-700",
    overview: "A complete AI-powered fitness ecosystem that combines personalized diet planning, guided workout & yoga video libraries, and smart health tracking in one app. Features gender-specialized AI diet doctors that build weekly meal and exercise plans tailored to each user's goals and health conditions.",
    context: "Most fitness apps offer generic diet charts and ignore individual health conditions - especially women's health needs like PCOS, pregnancy, and hormonal issues. Users juggle separate apps for diet, workouts, yoga, and tracking, with no intelligent guidance connecting them. FitCore solves this with AI doctors that understand each user's body, goals, and medical context before prescribing anything.",
    solutionFeatures: [
      "AI Diet Doctors (Dr. Ayesha & Dr. Ahmed) - gender-specialized GPT-powered consultations with medical-style intake (PCOS, pregnancy, allergies) that generate 7-day diet plans + weekly exercise schedules",
      "AI Food Scanner - snap a plate photo and instantly detect all food items with calories & macros via GPT-4 Vision",
      "Guided Video Library - 31 workout plans, 31 yoga pose videos & 6 meditation sessions with a voice AI coach (OpenAI TTS)",
      "Smart Health Tracking - workouts, meals, water, sleep, body measurements & goals with streaks and a female-focused fitness dashboard"
    ],
    role: "Lead Full-Stack Developer",
    timeline: "Mar 2026 - Present",
    impact: [
      "Unified 5 separate app experiences (diet, workouts, yoga, meditation, tracking) into one AI-driven platform",
      "Built 4 serverless AI edge functions (diet doctor, AI coach, food analyzer, TTS coach) with rate limiting & safety guardrails",
      "Multilingual AI support - English, Urdu, Roman Urdu & Hindi with automatic language detection",
      "Secured user data with PostgreSQL Row-Level Security across 7+ data tables",
      "60+ professionally curated exercise & yoga videos served via cloud storage CDN"
    ]
  },
  {
    id: "voteoffside",
    title: "VoteOffside - Real-Time Match Prediction & Voting Platform",
    slug: "voteoffside-match-prediction",
    category: "Web App",
    tagline: "Real-time match prediction and global leaderboard platform for FIFA World Cup 2026.",
    shortDescription:
      "VoteOffside is a live football match prediction and voting web application designed for the FIFA World Cup 2026. Built with React, Vite, Tailwind CSS, and Supabase, it allows sports enthusiasts to predict match outcomes, track live voting trends, and compete on global leaderboards.",
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "TypeScript"],
    image: "/images/projects/voteoffside (1).png",
    extraImages: ["/images/projects/voteoffside (2).png", "/images/projects/voteoffside (3).png"],
    liveUrl: "https://voteoffside.com",
    codeUrl: "https://github.com/shehroz03/voteoffside",
    githubUrl: "https://github.com/shehroz03/voteoffside",
    featured: true,
    status: 'published',
    color: "from-blue-600 to-indigo-800",
    overview: "A high-performance interactive web application built to engage football fans worldwide during the FIFA World Cup 2026. It combines live voting mechanics with real-time leaderboard rankings and community insights.",
    solutionFeatures: [
      "Real-time match outcome voting & statistics",
      "Live global prediction leaderboard",
      "Secure authentication & live data sync via Supabase",
      "Sleek, responsive Dark Mode sports UI"
    ],
    role: "Lead Full-Stack Developer",
    timeline: "2026",
    impact: [
      "Engineered real-time voting synchronization via Supabase",
      "Designed a premium Dark Mode sports UI with Tailwind CSS",
      "Sub-second live leaderboard calculations and rank updates"
    ]
  },
  {
    id: "socialvibing-ecosystem",
    title: "SocialVibing - Full-Stack Social Networking & Analytics Ecosystem",
    slug: "socialvibing-full-ecosystem",
    category: ["Web App", "Mobile App"],
    tagline: "Full-stack networking ecosystem with Marketplace & Community Chat.",
    shortDescription:
      "A complete social networking ecosystem featuring a cross-platform mobile app, web frontend, and analytics dashboard. Now includes a built-in Marketplace for creators and a real-time Community Chat system for enhanced engagement.",
    tech: ["React", "React Native", "Firebase", "Firestore", "Cloud Storage"],
    image: "/images/projects/socialvibing.jpg.png",
    extraImages: ["/images/projects/socialvibing1.jpeg", "/images/projects/socialvibing2.jpeg"],
    videoUrl: "/videos/socialvibingvideo.mp4",
    liveUrl: "https://socialvibing.online",
    codeUrl: "https://github.com/shehroz03/social-vibing",
    featured: true,
    status: 'published',
    overview: "A massive ecosystem project that bridges the gap between social engagement, e-commerce, and data analytics. It provides a unified experience for creators to build communities and sell products.",
    solutionFeatures: ["Integrated Marketplace & Store", "Real-time Community Chat", "Live Streaming & Engagement", "Advanced Analytics Dashboard"],
    role: "Lead Full-Stack Developer",
    timeline: "Jan 2023 - Present",
    impact: ["Unified social networking with e-commerce", "Reduced app load time by 35%", "Scalable architecture for 100k+ users"]
  },
  {
    id: "scholariq",
    title: "ScholarIQ - AI-Powered Scholarship & Study-Abroad Intelligence Platform",
    slug: "scholariq-scholarship-platform",
    category: "Web App",
    tagline: "Full-stack AI platform that matches students to verified scholarships, detects fraud, and guides visa applications.",
    shortDescription:
      "A comprehensive AI ecosystem that solves the biggest problem international students face: finding legitimate, best-fit scholarships. It combines machine-learning recommendations, fraud detection, retrieval-augmented AI chat, and autonomous data bots into one unified platform for students, teachers, and admins.",
    tech: ["React", "TypeScript", "Vite", "Python", "FastAPI", "SQLAlchemy", "scikit-learn", "OpenAI GPT-4o", "Sentence-Transformers", "Tailwind CSS", "AWS EC2", "Vercel"],
    image: "/images/projects/scholariq (1).png",
    extraImages: ["/images/projects/scholariq (2).png", "/images/projects/scholariq (3).png"],
    // videoUrl: "/videos/scholariqvideo.mp4",
    liveUrl: "https://scholarship.broadsolutiontech.com/",
    codeUrl: "https://github.com/shehroz03/scholarshipIQ",
    featured: true,
    status: 'published',
    color: "from-blue-600 to-indigo-800",
    overview: "A comprehensive AI ecosystem that solves the biggest problem international students face: finding legitimate, best-fit scholarships. It combines machine-learning recommendations, fraud detection, retrieval-augmented AI chat, and autonomous data bots into one unified platform for students, teachers, and admins.",
    context: "International students waste months manually searching scattered scholarship listings - many of which are outdated or outright scams. There was no single trustworthy platform that could personalize recommendations, verify legitimacy, and guide the full journey from application to visa. ScholarIQ was built to close that gap end-to-end.",
    solutionFeatures: [
      "AI Scholarship Matching - Hybrid ML engine (RandomForest + rule-based) ranks scholarships by each student's profile fit",
      "Fraud Detection System - ML + rule-based engine flags scam/fake listings before they reach students",
      "RAG-Powered AI Assistant - GPT-4o chatbot grounded on verified data (student / teacher / admin modes)",
      "Autonomous Data Bots - Self-updating scholarship data via Google Search + GPT-4o with confidence gating",
      "AI Visa Guidance - Personalized readiness score + document checklist per country",
      "Teacher Marketplace - Courses, reviews, and AI mentoring tools for education consultants"
    ],
    role: "Lead Full-Stack & AI/ML Developer",
    timeline: "2025 - 2026 (Final Year Project)",
    impact: [
      "Unified scholarship discovery, fraud-checking, and visa guidance into one platform",
      "5 integrated AI/ML models (recommendation, fraud, embeddings, 2× GPT)",
      "Automated data freshness via bots - near-zero manual maintenance",
      "Role-based system serving students, teachers, and admins with JWT-secured access",
      "Deployed to production: React frontend on Vercel, FastAPI backend on AWS EC2"
    ]
  },
  {
    id: "tourease",
    title: "TourEase - Trip & Travel Planner App (Flutter)",
    slug: "tourease-travel-platform",
    category: "Mobile App",
    tagline: "Travel app with three roles (admin, user, agency) for trips and bookings.",
    shortDescription:
      "TourEase is a Flutter‑based travel planner that helps users organize trips, stays and activities in one place. It lets users create trips, manage itineraries and track bookings with a smooth, cross‑platform mobile UI for Android and iOS.",
    tech: ["Flutter", "Dart", "Firebase"],
    image: "/images/projects/tourease.jpg",
    extraImages: ["/images/projects/tourease1.jpg", "/images/projects/tourease2.jpg"],
    liveUrl: "",
    codeUrl: "https://github.com/shehroz03/Tourease",
    featured: true,
    status: 'published',
    overview: "A multi-role travel marketplace connecting travelers with verified agencies via a secure booking platform.",
    solutionFeatures: ["Role-based (Admin/User/Agency)", "Secure bookings", "Trip management", "Real-time tracking"],
    role: "Mobile Developer",
    timeline: "Nov 2025 - Dec 2025",
    impact: ["Reduced booking time by 60%", "Unified 50+ agencies in one platform"]
  },
  {
    id: "scraping-business-directory",
    title: "Business Directory Scraping (Python + Selenium)",
    slug: "business-directory-scraping",
    category: "Scraping",
    tagline: "Large-scale business directory data extraction.",
    shortDescription:
      "Built with Python, BeautifulSoup, and Selenium. Extracted 1,000+ business records with automated cleanup and formatting.",
    tech: ["Python", "BeautifulSoup", "Selenium", "CSV/Excel"],
    image: "/images/projects/scraping.jpg",
    liveUrl: "",
    codeUrl: "",
    status: 'published',
    overview: "Automated data harvesting pipeline designed to extract and structure actionable business leads from complex directories.",
    solutionFeatures: ["Anti-detection bypass", "Multi-threaded scraping", "Data cleaning", "Automatic formatting"],
    role: "Automation Engineer",
    timeline: "Mar 2024 - May 2024",
    impact: ["Extracted 100k+ records per week", "Reduced manual data entry by 95%"]
  },
  {
    id: "serenity-connect",
    title: "Serenity Connect",
    slug: "serenity-connect-mental-health",
    category: "Web App",
    tagline: "Full-stack MERN mental health support platform.",
    shortDescription:
      "Built with React, Node.js, and MongoDB. Features real-time chat, therapy booking, and private journaling.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    image: "/images/projects/serenity-connect.jpg",
    liveUrl: "",
    codeUrl: "https://github.com/shehroz03/serenity_connect",
    featured: true,
    status: 'published',
    overview: "A MERN stack application providing a safe space for mental health support through anonymous chat and professional booking.",
    solutionFeatures: ["Anonymous chat", "Therapy booking", "Personal journal", "Mood tracker"],
    role: "Full-Stack Developer",
    timeline: "May 2024 - Dec 2024",
    impact: ["Over 10,000 hours of support provided", "Recognized as top wellness app"]
  },
  {
    id: "sidra-cotton-city",
    title: "Sidra Cotton City",
    slug: "sidra-cotton-company-website",
    category: "Web App",
    tagline: "Premium bilingual company profile website.",
    shortDescription:
      "Built with React, TypeScript, and Vite. Features bilingual support (English/Urdu) and a high-performance layout.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Firebase"],
    image: "/images/projects/sidra-cotton.jpg",
    liveUrl: "https://sidracottoncity.com",
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "A modern company profile website built with React and Vite, showcasing textile heritage for global clients.",
    solutionFeatures: ["Bilingual support", "Dark/Light mode", "Lead generation forms", "Interactive catalog"],
    role: "Frontend Specialist",
    timeline: "Jan 2024 - Feb 2024",
    impact: ["200% increase in international inquiries", "Perfect Lighthouse performance score"]
  },
  {
    id: "art-gallery",
    title: "ArtGallery.pk - Luxury 3D Art Marketplace",
    slug: "art-gallery-luxury-marketplace",
    category: "Web App",
    tagline: "Premium art marketplace with AR preview and 3D UI.",
    shortDescription: "A premium art buying and selling platform with AR wall preview, Glassmorphism UI, and role-based dashboards.",
    tech: ["React", "TypeScript", "Node.js", "SQLite", "Cloudinary", "Framer Motion", "JWT"],
    image: "/images/projects/artgallery.png",
    extraImages: ["/images/projects/artgallery1.png", "/images/projects/artgallery2.png"],
    videoUrl: "/videos/artgalleryvideo.mp4",
    liveUrl: "https://artgallery.pk",
    codeUrl: "https://github.com/shehroz03/artgallery-pk",
    featured: true,
    status: 'published',
    color: "from-purple-500 to-indigo-600",
    overview: "Production-ready luxury marketplace built from scratch to provide a high-end experience for art collectors and sellers.",
    context: "Buying luxury art online often lacks the 'physical' feel. ArtGallery.pk solves this by allowing users to preview art in their own space using AR and a high-end 3D interface.",
    solutionFeatures: [
      "AR Try-On Studio - upload room photo and preview painting on your wall",
      "Role-Based Panels - separate dashboards for Admin, Buyer, and Seller",
      "3D Floating Cards - mouse-responsive tilt and glow animations",
      "Artwork Marketplace - advanced filters by category, price, and artist",
      "Secure Auth - JWT authentication with encrypted passwords"
    ],
    role: "Full-Stack Developer",
    timeline: "2026",
    impact: [
      "Production-ready luxury marketplace from scratch",
      "Three fully independent role-based control panels",
      "Advanced 3D UI with particle system and Glassmorphism design",
      "Cloud-based image storage via Cloudinary"
    ]
  },
  {
    id: "arrow-puzzle-game",
    title: "Arrow Puzzle: Tap Away Game",
    slug: "arrow-puzzle-tap-away",
    category: "Mobile App",
    tagline: "A 3D logic puzzle game where players tap away blocks in the correct direction.",
    shortDescription:
      "An addictive 3D puzzle game developed in Flutter, designed to challenge the player's spatial reasoning and logic. Players must carefully observe the direction of arrows on each block and tap them in the correct sequence to clear the board across challenging levels.",
    tech: ["Flutter", "Dart", "Provider", "State Management"],
    image: "/images/projects/arrow-puzzle-1.jpeg", 
    extraImages: [
      "/images/projects/arrow-puzzle-2.jpeg",
      "/images/projects/arrow-puzzle-3.jpeg",
      "/images/projects/arrow-puzzle-4.jpeg"
    ],
    liveUrl: "https://play.google.com/store/apps/details?id=com.shehroz.arrowpuzzlegame",
    codeUrl: "https://github.com/shehroz03/arrowx-flutter-puzzle", 
    githubUrl: "https://github.com/shehroz03/arrowx-flutter-puzzle",
    featured: true,
    status: 'published',
    color: "from-blue-500 to-cyan-600",
    overview: "A highly engaging 3D block puzzle game built with Flutter. It challenges users to think critically and plan their moves to clear intricate formations of blocks by tapping them away in the correct direction.",
    context: "Mobile gamers are constantly looking for engaging, offline-capable brain teasers that offer quick sessions but increasing complexity. Many traditional puzzle games lack satisfying 3D interaction, smooth animations, and progressive difficulty.",
    solutionFeatures: [
      "Intuitive tap-to-clear 3D block mechanics",
      "Hundreds of progressively challenging levels",
      "Fully playable offline without internet dependency",
      "In-game shop and coin reward system",
      "Smooth animations and visually appealing UI"
    ],
    role: "Lead Mobile Game Developer",
    timeline: "June 2026 - July 2026",
    impact: [
      "Successfully developed and published a fully functional 3D logic game on the Google Play Store",
      "Engineered complex level generation and state management using Flutter's Provider",
      "Optimized game performance for 60fps smooth animations across low to mid-range mobile devices"
    ]
  },
];

// Helper functions
export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return projects;
  return projects.filter(project => {
    if (Array.isArray(project.category)) {
      return project.category.some(cat => cat.toLowerCase() === category.toLowerCase());
    }
    return project.category.toLowerCase() === category.toLowerCase();
  });
};

export const getProjectBySlug = (slug: string) => {
  return projects.find(project => project.slug === slug);
};
