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
  category: ProjectCategory;
  tagline: string;
  shortDescription: string;
  tech: string[];
  image: string;      // /images/... path
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
    id: "socialvibing-ecosystem",
    title: "SocialVibing – Full-Stack Social Networking & Analytics Ecosystem",
    slug: "socialvibing-full-ecosystem",
    category: "Web App",
    tagline: "Comprehensive social platform with real-time analytics for creators.",
    shortDescription:
      "SocialVibing is a complete social networking ecosystem featuring a cross-platform mobile app (React Native), a web frontend, and a production-ready analytics dashboard. It powers creator communities with live streaming, real-time engagement tracking via Firestore, and automated post performance insights in a sleek, VIP-grade interface.",
    tech: ["React", "React Native", "Firebase", "Firestore", "Cloud Storage"],
    image: "/images/projects/socialvibing.jpg.png",
    liveUrl: "https://socialvibing.online",
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "A massive ecosystem project that bridges the gap between social engagement and data analytics, providing users with a unified experience across web and mobile.",
    solutionFeatures: ["Live Streaming & Communities", "Real-time Metrics Dashboard", "Cross-Platform (iOS/Android/Web)", "Automated Post Analytics"],
    role: "Lead Full-Stack Developer",
    timeline: "Jan 2023 – Present",
    impact: ["Unified 3 separate platforms into one ecosystem", "Reduced app load time by 35%", "Served 100+ brands with real-time data"]
  },
  {
    id: "scholariq",
    title: "ScholarIQ – AI‑Driven Scholarship Assistant (FYP)",
    slug: "scholariq-scholarship-platform",
    category: "Web App",
    tagline: "Platform that collects student data and recommends suitable scholarships.",
    shortDescription:
      "ScholarIQ is an AI‑driven scholarship assistant that helps students discover relevant scholarships based on their profile and eligibility. It combines a React frontend with a Python backend and database to power intelligent search, filters and recommendation‑style results for global opportunities.",
    tech: ["React", "Python", "SQLite"],
    image: "/images/projects/scholariq.png",
    liveUrl: "",
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "An AI-driven platform helping students find global funded opportunities through intelligent filtering and a dedicated consultant chatbot.",
    solutionFeatures: ["Advanced search filters", "AI Consultant Chatbot", "Direct form links", "Automated notifications"],
    role: "Full-Stack Developer",
    timeline: "Oct 2025 – Feb 2026",
    impact: ["Connected students with scholarships", "100% accuracy in data scraping"]
  },
  {
    id: "tourease",
    title: "TourEase – Trip & Travel Planner App (Flutter)",
    slug: "tourease-travel-platform",
    category: "Mobile App",
    tagline: "Travel app with three roles (admin, user, agency) for trips and bookings.",
    shortDescription:
      "TourEase is a Flutter‑based travel planner that helps users organize trips, stays and activities in one place. It lets users create trips, manage itineraries and track bookings with a smooth, cross‑platform mobile UI for Android and iOS.",
    tech: ["Flutter", "Dart", "Firebase"],
    image: "/images/projects/tourease.jpg",
    liveUrl: "",
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "A multi-role travel marketplace connecting travelers with verified agencies via a secure booking platform.",
    solutionFeatures: ["Role-based (Admin/User/Agency)", "Secure bookings", "Trip management", "Real-time tracking"],
    role: "Mobile Developer",
    timeline: "Nov 2025 – Dec 2025",
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
    timeline: "Mar 2024 – May 2024",
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
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "A MERN stack application providing a safe space for mental health support through anonymous chat and professional booking.",
    solutionFeatures: ["Anonymous chat", "Therapy booking", "Personal journal", "Mood tracker"],
    role: "Full-Stack Developer",
    timeline: "May 2024 – Dec 2024",
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
    timeline: "Jan 2024 – Feb 2024",
    impact: ["200% increase in international inquiries", "Perfect Lighthouse performance score"]
  },
];

// Helper functions
export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
};

export const getProjectBySlug = (slug: string) => {
  return projects.find(project => project.slug === slug);
};
