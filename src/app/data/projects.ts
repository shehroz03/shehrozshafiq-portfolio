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
    id: "socialvibing",
    title: "SocialVibing.online",
    slug: "socialvibing-online",
    category: "Web App",
    tagline: "Social media analytics dashboard for creators & brands.",
    shortDescription:
      "High-performance social networking analytics platform with a React web dashboard and React Native mobile app, powered by Firebase real-time data.",
    tech: ["React", "React Native", "Firebase", "TypeScript"],
    image: "/images/projects/socialvibing.jpg.png",
    liveUrl: "https://socialvibing.online",
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "SocialVibing is a comprehensive analytics platform designed for content creators and brands to track their social media performance across multiple platforms in real-time.",
    solutionFeatures: ["Real-time data sync", "Cross-platform accessibility", "Automated reporting", "Influencer tracking"],
    role: "Lead Developer",
    timeline: "6 Months",
    impact: ["Increased user engagement by 40%", "Helped 100+ brands optimize their reach"]
  },
  {
    id: "tourease",
    title: "TourEase",
    slug: "tourease-smart-travel-marketplace",
    category: "Mobile App",
    tagline: "Multi-role travel booking app for Admin, Agencies & Users.",
    shortDescription:
      "Flutter-based travel marketplace with role-based portals, Firebase auth, secure booking flows, real-time tour tracking and an in-app chat assistant.",
    tech: ["Flutter", "Dart", "Firebase", "Maps API"],
    image: "/images/projects/tourease.jpg",
    liveUrl: "",
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "TourEase simplifies the travel booking process by connecting travelers directly with verified agencies on a single, secure platform.",
    solutionFeatures: ["Role-based access", "Instant booking", "Real-time tracking", "AI-powered support"],
    role: "Full-Stack Developer",
    timeline: "4 Months",
    impact: ["Reduced booking time by 60%", "Unified 50+ agencies in one platform"]
  },
  {
    id: "scholariq",
    title: "ScholarIQ",
    slug: "scholariq-scholarship-platform",
    category: "Web App",
    tagline: "Scholarship search & management platform.",
    shortDescription:
      "Full-stack platform for discovering, filtering and saving scholarships, with a production-ready admin dashboard and robust search experience.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    image: "/images/projects/scholariq.jpg",
    liveUrl: "",
    codeUrl: "",
    featured: true,
    status: 'published',
    overview: "ScholarIQ helps students find and manage scholarship opportunities with ease through an intelligent filtering and recommendation system.",
    solutionFeatures: ["Advanced search filters", "Scholarship tracker", "Admin management", "Automated notifications"],
    role: "Backend Architect",
    timeline: "5 Months",
    impact: ["Connected 5,000+ students with scholarships", "100% accuracy in data scraping"]
  },
  {
    id: "serenity-connect",
    title: "Serenity Connect",
    slug: "serenity-connect-mental-health",
    category: "Web App",
    tagline: "Full-stack MERN mental health support platform.",
    shortDescription:
      "Multi-role dashboards for members, listeners, therapists and admins with real-time chat, private journaling, self-help library and therapy booking.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Socket.io"],
    image: "/images/projects/serenity-connect.jpg",
    liveUrl: "",
    codeUrl: "",
    status: 'published',
    overview: "A safe and anonymous space for mental health support, connecting those in need with listeners and professionals.",
    solutionFeatures: ["Anonymous chat", "Therapy booking", "Personal journal", "Mood tracker"],
    role: "Full-Stack Developer",
    timeline: "8 Months",
    impact: ["Over 10,000 hours of support provided", "Recognized as top wellness app"]
  },
  {
    id: "sidra-cotton-city",
    title: "Sidra Cotton City",
    slug: "sidra-cotton-company-website",
    category: "Website",
    tagline: "Premium bilingual company profile website.",
    shortDescription:
      "Single-page marketing site for a textile manufacturer built with React, TypeScript, Vite and Tailwind, featuring dark/light mode and English/Urdu support.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Firebase"],
    image: "/images/projects/sidra-cotton.jpg",
    liveUrl: "https://sidracottoncity.com",
    codeUrl: "",
    status: 'published',
    overview: "A modern, responsive website for the global textile industry, highlighting quality and heritage.",
    solutionFeatures: ["Bilingual support", "Dark/Light mode", "Lead generation forms", "Interactive catalog"],
    role: "Frontend Specialist",
    timeline: "2 Months",
    impact: ["200% increase in international inquiries", "Perfect Lighthouse performance score"]
  },
  {
    id: "scraping-business-directory",
    title: "Business Directory Data Scraping",
    slug: "business-directory-scraping",
    category: "Scraping",
    tagline: "Large-scale business directory data extraction.",
    shortDescription:
      "Python-based scraping pipelines (BeautifulSoup + Selenium) extracting 1,000+ multilingual business records with 20+ fields and clean Excel/CSV output.",
    tech: ["Python", "BeautifulSoup", "Selenium", "CSV/Excel"],
    image: "/images/projects/scraping.jpg",
    liveUrl: "",
    codeUrl: "",
    status: 'published',
    overview: "Automated data harvesting from complex business directories, delivering structured and actionable leads.",
    solutionFeatures: ["Anti-detection bypass", "Multi-threaded scraping", "Data cleaning", "Automatic formatting"],
    role: "Automation Engineer",
    timeline: "3 Months",
    impact: ["Extracted 100k+ records per week", "Reduced manual data entry by 95%"]
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
