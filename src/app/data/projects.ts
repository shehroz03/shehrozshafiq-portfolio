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
    id: "socialvibing-ecosystem",
    title: "SocialVibing – Full-Stack Social Networking & Analytics Ecosystem",
    slug: "socialvibing-full-ecosystem",
    category: "Web App",
    tagline: "Full-stack networking ecosystem with Marketplace & Community Chat.",
    shortDescription:
      "A complete social networking ecosystem featuring a cross-platform mobile app, web frontend, and analytics dashboard. Now includes a built-in Marketplace for creators and a real-time Community Chat system for enhanced engagement.",
    tech: ["React", "React Native", "Firebase", "Firestore", "Cloud Storage"],
    image: "/images/projects/socialvibing.jpg.png",
    extraImages: ["/images/projects/socialvibing1.jpeg", "/images/projects/socialvibing2.jpeg"],
    videoUrl: "/videos/socialvibingvideo.mp4",
    liveUrl: "https://socialvibing.online",
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "A massive ecosystem project that bridges the gap between social engagement, e-commerce, and data analytics. It provides a unified experience for creators to build communities and sell products.",
    solutionFeatures: ["Integrated Marketplace & Store", "Real-time Community Chat", "Live Streaming & Engagement", "Advanced Analytics Dashboard"],
    role: "Lead Full-Stack Developer",
    timeline: "Jan 2023 – Present",
    impact: ["Unified social networking with e-commerce", "Reduced app load time by 35%", "Scalable architecture for 100k+ users"]
  },
  {
    id: "scholariq",
    title: "ScholarIQ – AI‑Driven Scholarship Assistant (FYP)",
    slug: "scholariq-scholarship-platform",
    category: "Web App",
    tagline: "AI-driven scholarship platform with Premium AI Consultant.",
    shortDescription:
      "ScholarIQ helps students discover global scholarships through intelligent data scraping and AI-powered recommendations. Features a new Premium AI Consultant for tailored application guidance and eligibility analysis.",
    tech: ["React", "Python", "SQLite"],
    image: "/images/projects/scholariq.png",
    extraImages: ["/images/projects/scholariq1.png"],
    videoUrl: "/videos/scholariqvideo.mp4",
    liveUrl: "",
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "An AI-powered platform for global scholarship discovery, featuring a sophisticated AI Consultant and a subscription-based Premium Version for advanced tracking and guidance.",
    solutionFeatures: ["Premium AI Consultant Assistant", "Subscription-based Feature Tiers", "Intelligent Search & Filtering", "Real-time Opportunity Alerts"],
    role: "Full-Stack Developer",
    timeline: "Oct 2025 – Feb 2026",
    impact: ["Enabled premium personalized guidance", "100% data accuracy in scraping", "Streamlined application workflows"]
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
    extraImages: ["/images/projects/tourease1.jpg", "/images/projects/tourease2.jpg"],
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
