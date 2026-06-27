import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, Download, Mail, Quote, Star, ExternalLink, Award, Briefcase, Users, Target, Github, Calendar, User, MapPin, Clock, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Loader } from '../components/Loader';
import { Hero3DSkills } from '../components/Hero3DSkills';
import { CountUp } from '../components/CountUp';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Footer } from '../components/Footer';
import { AboutHero } from '../components/sections/AboutHero';
import { AboutSections } from '../components/sections/AboutSections';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { fadeInUp, fadeInUpSmall, staggerContainer, staggerItem, scaleIn, modalVariant } from '../utils/animations';
import { projectsAPI, configAPI } from '../lib/api';
import { projects, type Project } from '../data/projects';

// Tracks whether the intro loader has already played this session.
// Persists across in-app navigations (module scope), resets on full page reload.
let hasShownLoader = false;

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showLoader, setShowLoader] = useState(!hasShownLoader);
  const [currentSection, setCurrentSection] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const allSelectedProjectImages = selectedProject 
    ? [selectedProject.image, ...(selectedProject.extraImages || [])] 
    : [];

  useEffect(() => {
    // Local data loading
    setFeaturedProjects(projects.filter(p => p.featured));

    /* Network calls commented out as per user request
    const loadData = async () => {
      try {
        setIsLoadingProjects(true);
        const [projectsData, configData] = await Promise.all([
          projectsAPI.getFeatured(),
          configAPI.get()
        ]);
        setFeaturedProjects(projectsData);
        setConfig(configData);
      } catch (error) {
        console.error('Failed to load home data:', error);
      } finally {
        setIsLoadingProjects(false);
      }
    };
    loadData();
    */
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const highlights = [
    {
      quote:
        '“Designed and implemented a production‑ready social media analytics dashboard with real‑time charts, clean UI, and a responsive experience across web and mobile.”',
      title: 'SocialVibing.online',
      subtitle: 'Social Media Analytics Platform',
      rating: 5,
    },
    {
      quote:
        '“Delivered a multi‑role travel booking app that simplified tour management for admins, agencies, and travelers with secure bookings, live tour updates, and an in‑app assistant.”',
      title: 'TourEase',
      subtitle: 'Smart Travel Marketplace',
      rating: 5,
    },
    {
      quote:
        '“Built a robust scholarship discovery platform with powerful filtering, saved lists, and an admin dashboard ready for real‑world student traffic.”',
      title: 'ScholarIQ',
      subtitle: 'Scholarship Search Platform',
      rating: 5,
    },
  ];

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <Loader
            onComplete={() => {
              hasShownLoader = true;
              setShowLoader(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen">
        {/* PREMIUM HERO SECTION - CINEMATIC INTRO */}
        <section className="scroll-section min-h-screen pt-20 flex items-center relative overflow-hidden">
          {/* ANIMATION STAGE 1: Background Gradient (0-1.2s) */}
          {/* Soft diagonal gradient - top-left tinted, bottom-right brighter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.06) 0%, rgba(139, 92, 246, 0.04) 30%, rgba(247, 247, 247, 0) 70%)',
            }}
          />

          {/* Radial highlight behind name area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(74, 144, 226, 0.08) 0%, rgba(74, 144, 226, 0) 70%)',
            }}
          />

          {/* Subtle grid pattern for depth - very faint */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #2E2E2E 1px, transparent 1px),
                linear-gradient(to bottom, #2E2E2E 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Soft ambient orbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute top-20 right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="absolute bottom-20 left-20 w-64 h-64 bg-purple-400/4 rounded-full blur-3xl pointer-events-none"
          />

          <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Content Column */}
            <div className="space-y-8 max-w-xl">
              <div className="space-y-5">
                {/* ANIMATION: Availability badge (Delay: 0.6s) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-blue-200/60 shadow-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <p className="text-[#4A90E2] font-semibold text-sm">
                    {t('hero.availability')}
                  </p>
                </motion.div>

                {/* ANIMATION STAGE 1: Name scales from 0.96 to 1.0, fades in (0-1.2s) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="space-y-3"
                >
                  <h1
                    className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#111827] tracking-tight leading-[0.95]"
                    style={{ textShadow: '0 1px 2px rgba(15, 23, 42, 0.06)' }}
                  >
                    <span className="block">{t('hero.first_name')}</span>
                    <span className="block">{t('hero.last_name')}</span>
                  </h1>
                  <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                </motion.div>

                {/* ANIMATION STAGE 2: Subtitle fade-up (1.2s, stagger 80ms) */}
                <p className="text-xl lg:text-2xl font-medium text-[#4B5563] tracking-wide mt-2">
                  {t('hero.subtitle')}
                </p>
              </div>

              {/* ANIMATION STAGE 2: Paragraph fade-up (1.32s, stagger +120ms) */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.32,
                  duration: 0.6,
                }}
                className="text-base sm:text-lg text-[#6B7280] leading-relaxed"
              >
                {t('hero.description')}
              </motion.p>

              {/* ANIMATION STAGE 2: Buttons fade-up with shadow pop (1.44s, stagger +120ms) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.44,
                  duration: 0.6,
                }}
                className="flex flex-wrap gap-4"
              >
                {/* Primary button with micro-interaction */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.56,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white gap-2 shadow-md hover:shadow-xl transition-all duration-250"
                  >
                    <Link to="/contact">
                      {t('hero.get_in_touch')} <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>

                {/* Secondary button with outline → filled effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.68,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="gap-2 border-2 border-[#6B7280] text-[#2E2E2E] hover:bg-[#2E2E2E] hover:text-white hover:border-[#2E2E2E] transition-all duration-250"
                  >
                    <Link to="/projects">
                      <Briefcase className="w-5 h-5" /> {t('hero.view_my_work')}
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.8,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="gap-2 text-[#6B7280] hover:text-[#2E2E2E] hover:bg-white/80 transition-all duration-200"
                  >
                    <a href="/images/projects/Shehroz-Shafiq-Resume.pdf" download="Shehroz-Shafiq-Resume.pdf">
                      <Download className="w-5 h-5" /> {t('hero.resume')}
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Tech Stack Pills - Scroll reveal with stagger */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.2,
                    }
                  }
                }}
                className="flex flex-wrap gap-3"
              >
                {['React', 'Node.js', 'Flutter', 'Python', 'MongoDB', 'PostgreSQL'].map((tech) => (
                  <motion.div
                    key={tech}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }
                    }}
                    whileHover={{
                      y: -4,
                      backgroundColor: 'rgba(74, 144, 226, 0.12)',
                      borderColor: 'rgba(74, 144, 226, 0.4)',
                      transition: { duration: 0.2 }
                    }}
                    className="px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200/60 text-sm font-medium text-[#6B7280] cursor-default transition-all duration-200"
                    style={{
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ANIMATION STAGE 3: Right Visual - Floating Skill Stack (2-3.5s) */}
            {/* Slides in from right by 30px while fading in, then continuous float */}
            <div className="hidden lg:flex items-center justify-center h-[600px] relative">
              <Hero3DSkills />
            </div>
          </div>

          {/* Social Proof Strip - Improved styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-12 left-0 right-0 z-20"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-4"
                style={{
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                }}
              >
                <p className="text-sm text-[#6B7280] font-medium">
                  {t('hero.social_proof')}
                </p>
                <div className="flex gap-3">
                  {['Upwork', 'Fiverr', 'Remote Clients'].map((platform) => (
                    <div
                      key={platform}
                      className="px-4 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full text-xs font-semibold text-[#4A90E2] border border-blue-200/40 shadow-sm"
                    >
                      {platform}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="scroll-section py-20 bg-white relative overflow-hidden">
          {/* Soft ambient glow behind cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
            >
              {[
                {
                  number: 3,
                  text: null,
                  label: t('stats.years_experience'),
                  icon: Briefcase,
                  iconBg: 'from-blue-500 to-blue-600',
                  glow: 'rgba(59, 130, 246, 0.35)',
                  accent: 'bg-blue-500',
                },
                {
                  number: 10,
                  text: null,
                  label: t('stats.projects_completed'),
                  icon: Award,
                  iconBg: 'from-purple-500 to-purple-600',
                  glow: 'rgba(168, 85, 247, 0.35)',
                  accent: 'bg-purple-500',
                },
                {
                  number: 10,
                  text: null,
                  label: t('stats.happy_clients'),
                  icon: Users,
                  iconBg: 'from-indigo-500 to-indigo-600',
                  glow: 'rgba(99, 102, 241, 0.35)',
                  accent: 'bg-indigo-500',
                },
                {
                  number: null,
                  text: 'High',
                  label: t('stats.client_satisfaction'),
                  icon: Target,
                  iconBg: 'from-teal-500 to-teal-600',
                  glow: 'rgba(20, 184, 166, 0.35)',
                  accent: 'bg-teal-500',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.92 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group h-full"
                >
                  <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-100 hover:border-blue-200/70 transition-colors duration-300 flex flex-col items-center text-center space-y-4 overflow-hidden"
                    style={{
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    {/* Hover glow wash */}
                    <div
                      className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: stat.glow }}
                    />

                    {/* Icon Container with gradient + glow */}
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.iconBg} flex items-center justify-center text-white shadow-lg`}
                      style={{ boxShadow: `0 8px 24px ${stat.glow}` }}
                    >
                      <stat.icon className="w-7 h-7" />
                    </motion.div>

                    <div className="space-y-1 relative z-10">
                      <div className="text-4xl lg:text-5xl font-extrabold text-[#2E2E2E] tracking-tight tabular-nums">
                        {stat.number !== null ? (
                          <>
                            <CountUp to={stat.number} duration={1.8} delay={index * 0.12} />
                            <span className="text-[#4A90E2] ml-0.5">+</span>
                          </>
                        ) : (
                          stat.text
                        )}
                      </div>
                      <div className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>

                    {/* Decorative accent bar */}
                    <div className={`h-1 w-8 ${stat.accent} rounded-full opacity-30 group-hover:w-16 group-hover:opacity-60 transition-all duration-300`} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About hero + skills/experience (from About page) */}
        <AboutHero />
        <AboutSections />

        {/* Featured Work Preview */}
        <section className="scroll-section py-20 bg-[#F7F7F7]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUpSmall}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">{t('projects.featured_projects')}</h2>
              <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                {t('projects.tagline')}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {featuredProjects
                .map((project) => (
                  <motion.div
                    key={project.id}
                    variants={staggerItem}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="bg-white rounded-2xl p-8 border border-gray-200/50 cursor-pointer group relative overflow-hidden"
                    style={{
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.projectStatus === 'ongoing' && (
                      <div className="absolute top-4 right-4 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                        Live
                      </div>
                    )}
                    <div className="mb-4 -mx-8 -mt-8">
                      <div className="h-40 w-full overflow-hidden">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2E2E2E] mb-1">{project.title}</h3>
                    <p className="text-xs text-[#6B7280] mb-2">{project.category}</p>
                    <p className="text-sm text-[#4A90E2] font-medium">{project.tagline}</p>
                  </motion.div>
                ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/projects">
                  {t('projects.view_all_projects')} <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Project Highlights Section */}
        <section className="scroll-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUpSmall}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">Project Highlights</h2>
              <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                A quick snapshot of what I built and delivered
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="bg-[#F7F7F7] rounded-2xl p-8 border border-gray-200/50 relative"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full flex items-center justify-center">
                    <Quote className="w-5 h-5 text-[#4A90E2]" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#4A90E2] text-[#4A90E2]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-6 italic">
                    {item.quote}
                  </p>

                  {/* Project */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {item.title
                        .split(/[\s.]+/)
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-[#2E2E2E] text-sm">
                        {item.title}
                      </div>
                      <div className="text-xs text-[#6B7280]">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="scroll-section py-20 bg-[#F7F7F7]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={scaleIn}
              className="relative overflow-hidden rounded-3xl p-12 lg:p-16 text-center"
              style={{
                background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
                boxShadow: '0 20px 60px rgba(74, 144, 226, 0.3)',
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />
              </div>

              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-4xl lg:text-5xl font-bold text-white mb-4"
                >
                  {t('cta.ready_to_build')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                  className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
                >
                  {t('cta.project_in_mind')}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-[#4A90E2] hover:bg-white/90 gap-2 shadow-lg"
                  >
                    <Link to="/contact">
                      <Mail className="w-5 h-5" />
                      {t('cta.contact_me')}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 gap-2"
                  >
                    <a href="/images/projects/Shehroz-Shafiq-Resume.pdf" download="Shehroz-Shafiq-Resume.pdf">
                      <Download className="w-5 h-5" />
                      {t('cta.download_cv')}
                    </a>
                  </Button>
                </motion.div>

                {/* Availability Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
                  className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">{t('cta.available_for_work')}</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Detail Modal - Case Study Style */}
        <AnimatePresence>
          {selectedProject && (
            <Dialog open={!!selectedProject} onOpenChange={(open) => {
              if (!open) {
                setSelectedProject(null);
                setActiveImageIndex(0);
              }
            }}>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={modalVariant}
                  className="space-y-8"
                >
                  {/* Hero Block */}
                  <DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <DialogTitle className="text-4xl font-bold text-[#2E2E2E] mb-2">
                          {selectedProject.title}
                        </DialogTitle>
                        <p className="text-xl text-[#4A90E2] font-medium mb-4">
                          {selectedProject.subtitle || selectedProject.tagline}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-[#6B7280]">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{selectedProject.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{selectedProject.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedProject.location || 'Remote'}</span>
                        </div>
                        {selectedProject.projectStatus === 'ongoing' && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full font-semibold">
                            <Clock className="w-4 h-4" />
                            <span>{t('projects.ongoing')}</span>
                          </div>
                        )}
                      </div>

                      {/* Overview */}
                      <p className="text-lg text-[#6B7280] leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-3 rounded-r-lg">
                        {selectedProject.overview}
                      </p>
                    </div>
                  </DialogHeader>

                  {/* Hero Image & Gallery */}
                  <div className="space-y-4">
                    <div className="relative h-96 rounded-2xl overflow-hidden group bg-gray-50 border border-gray-100 shadow-inner">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={allSelectedProjectImages[activeImageIndex]}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full flex items-center justify-center p-2"
                        >
                          <ImageWithFallback
                            src={allSelectedProjectImages[activeImageIndex]}
                            alt={`${selectedProject.title} - Image ${activeImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </motion.div>
                      </AnimatePresence>
                      <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color || 'from-blue-500 to-blue-600'} opacity-[0.03] mix-blend-multiply pointer-events-none`} />
                      
                      {/* Navigation Arrows */}
                      {allSelectedProjectImages.length > 1 && (
                        <>
                          <button
                            onClick={() => setActiveImageIndex((prev) => (prev === 0 ? allSelectedProjectImages.length - 1 : prev - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => setActiveImageIndex((prev) => (prev === allSelectedProjectImages.length - 1 ? 0 : prev + 1))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {allSelectedProjectImages.length > 1 && (
                      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {allSelectedProjectImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              activeImageIndex === idx ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            <ImageWithFallback src={img} alt="thumbnail" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                    {/* Video Demo (If exists) */}
                    {selectedProject.videoUrl && (
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center gap-3">
                          <div className={`w-8 h-1 bg-gradient-to-r ${selectedProject.color || 'from-blue-500 to-blue-600'} rounded-full`} />
                          <Play className="w-5 h-5" /> Video Demo
                        </h3>
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-800">
                          <video 
                            ref={videoRef}
                            key={selectedProject.videoUrl}
                            controls
                            playsInline
                            muted
                            preload="metadata"
                            className="w-full h-full object-contain"
                            poster={selectedProject.image}
                            onLoadedMetadata={(e) => {
                              const vid = e.currentTarget;
                              vid.muted = true;
                            }}
                          >
                            <source src={selectedProject.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          {/* Unmute hint for mobile */}
                          <div className="absolute bottom-14 right-3 pointer-events-none">
                            <span className="text-[10px] bg-black/60 text-white/70 px-2 py-1 rounded-full backdrop-blur-sm">
                              🔇 Tap 🔊 to unmute
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Case Study Sections */}
                  <div className="space-y-8">
                    {/* Context / Problem */}
                    <div>
                      <h3 className="text-2xl font-bold text-[#2E2E2E] mb-3 flex items-center gap-3">
                        <div className={`w-8 h-1 bg-gradient-to-r ${selectedProject.color || 'from-blue-500 to-blue-600'} rounded-full`} />
                        Context & Problem
                      </h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        {selectedProject.context || selectedProject.problem}
                      </p>
                    </div>

                    {/* Solution & Features */}
                    <div>
                      <h3 className="text-2xl font-bold text-[#2E2E2E] mb-3 flex items-center gap-3">
                        <div className={`w-8 h-1 bg-gradient-to-r ${selectedProject.color || 'from-blue-500 to-blue-600'} rounded-full`} />
                        Solution & Features
                      </h3>
                      <ul className="space-y-3">
                        {(selectedProject.solution || selectedProject.solutionFeatures || []).map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${selectedProject.color || 'from-blue-500 to-blue-600'} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                              {index + 1}
                            </div>
                            <span className="text-[#6B7280] leading-relaxed pt-0.5">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h3 className="text-2xl font-bold text-[#2E2E2E] mb-3 flex items-center gap-3">
                        <div className={`w-8 h-1 bg-gradient-to-r ${selectedProject.color || 'from-blue-500 to-blue-600'} rounded-full`} />
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech) => (
                          <Badge
                            key={tech}
                            className={`bg-gradient-to-r ${selectedProject.color || 'from-blue-500 to-blue-600'} text-white px-4 py-2 text-sm`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Impact / Outcome */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                      <h3 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center gap-3">
                        <div className={`w-8 h-1 bg-gradient-to-r ${selectedProject.color || 'from-blue-500 to-blue-600'} rounded-full`} />
                        Impact & Outcomes
                      </h3>
                      <ul className="space-y-3">
                        {(selectedProject.impact || []).map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedProject.color || 'from-blue-500 to-blue-600'} mt-2 flex-shrink-0`} />
                            <span className="text-[#2E2E2E] font-medium leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      {selectedProject.liveUrl && (
                        <Button
                          size="lg"
                          className={`bg-gradient-to-r ${selectedProject.color} text-white hover:opacity-90 gap-2 flex-1`}
                          onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                        >
                          <ExternalLink className="w-5 h-5" />
                          Visit Live Site
                        </Button>
                      )}
                      {selectedProject.githubUrl && (
                        <Button
                          size="lg"
                          variant="outline"
                          className="gap-2 flex-1"
                          onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                        >
                          <Github className="w-5 h-5" />
                          View Source Code
                        </Button>
                      )}
                      {!selectedProject.liveUrl && !selectedProject.githubUrl && (
                        <p className="text-sm text-[#6B7280] italic flex-1 text-center py-4">
                          Private project - code and demo available upon request
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}