import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Download, Mail, Quote, Star, ExternalLink, Award, Briefcase, Users, Target } from 'lucide-react';
import { Loader } from '../components/Loader';
import { Hero3DSkills } from '../components/Hero3DSkills';
import { Button } from '../components/ui/button';
import { Footer } from '../components/Footer';
import { AboutHero } from '../components/sections/AboutHero';
import { AboutSections } from '../components/sections/AboutSections';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { fadeInUp, fadeInUpSmall, staggerContainer, staggerItem, scaleIn } from '../utils/animations';
import { projectsAPI, configAPI } from '../lib/api';
import { projects, type Project } from '../data/projects';

export function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [config, setConfig] = useState<any>(null);

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
        {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
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
                    Available for new projects
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
                    <span className="block">Shehroz</span>
                    <span className="block">Shafiq</span>
                  </h1>
                  <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                </motion.div>

                {/* ANIMATION STAGE 2: Subtitle fade-up (1.2s, stagger 80ms) */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  style={{
                    letterSpacing: '-0.02em',
                  }}
                  className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                >
                  Full-Stack Developer & Automation Specialist
                </motion.p>
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
                I help startups and businesses launch production‑ready web and mobile apps.
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
                      Get in Touch <ArrowRight className="w-5 h-5" />
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
                      <Briefcase className="w-5 h-5" /> View My Work
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
                      <Download className="w-5 h-5" /> Resume
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
                  Trusted by clients on freelance platforms
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
        <section className="scroll-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                {
                  number: /* config?.stats?.experience || */ '3',
                  label: 'Years Experience',
                  icon: Briefcase,
                  color: 'blue'
                },
                {
                  number: /* config?.stats?.projects || */ '10',
                  label: 'Projects Completed',
                  icon: Award,
                  color: 'purple'
                },
                {
                  number: /* config?.stats?.clients || */ '10',
                  label: 'Happy Clients',
                  icon: Users,
                  color: 'indigo'
                },
                {
                  number: /* config?.stats?.success || */ '100%',
                  label: 'Success Rate',
                  icon: Target,
                  color: 'teal'
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group h-full"
                >
                  <div className="h-full bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center space-y-4"
                    style={{
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {/* Icon Container with dynamic colored glow */}
                    <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-500 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-7 h-7" />
                    </div>

                    <div className="space-y-1">
                      <div className="text-4xl lg:text-5xl font-extrabold text-[#2E2E2E] tracking-tight">
                        {stat.number}
                        {stat.number.match(/^\d+$/) && <span className="text-[#4A90E2] ml-0.5">+</span>}
                      </div>
                      <div className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>

                    {/* Decorative accent bar */}
                    <div className={`w-8 h-1 bg-${stat.color}-500/20 rounded-full group-hover:w-16 transition-all duration-300`} />
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
              <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">Featured Projects</h2>
              <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                Real-world applications and automation solutions built with modern technologies
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {['socialvibing', 'sidra-cotton-city', 'scholariq']
                .map(id => projects.find(p => p.id === id))
                .filter((p): p is Project => Boolean(p))
                .map((project) => (
                  <motion.div
                    key={project.id}
                    variants={staggerItem}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="bg-white rounded-2xl p-8 border border-gray-200/50 cursor-pointer group relative overflow-hidden"
                    style={{
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    }}
                    onClick={() => window.location.href = '/projects'}
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
                  View All Projects <ArrowRight className="w-5 h-5" />
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
                  Ready to build your next project?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                  className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
                >
                  Let's collaborate and create something amazing together.
                  I'm available for freelance projects and full-time opportunities.
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
                      Contact Me
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
                      Download CV
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
                  <span className="text-white text-sm font-medium">Available for work</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}