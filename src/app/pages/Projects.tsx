import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Calendar, User, MapPin, Clock, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { projectsAPI } from '../lib/api';
import { toast } from 'sonner';
import { Footer } from '../components/Footer';
import { fadeInUp, fadeInUpSmall, staggerContainer, staggerItem, scaleIn, modalVariant } from '../utils/animations';
import { projects, type Project } from '../data/projects';

export function Projects() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Web App' | 'Scraping' | 'Mobile App'>('all');

  const allSelectedProjectImages = selectedProject 
    ? [selectedProject.image, ...(selectedProject.extraImages || [])] 
    : [];

  useEffect(() => {
    // Local data loading
    setProjectsList(projects);

    /* Commented out network calls
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectsAPI.getPublished();
        setProjects(data);
      } catch (error) {
        toast.error('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
    */
  }, []);

  const filteredProjects = selectedCategory === 'all'
    ? projectsList
    : projectsList.filter(p => 
        Array.isArray(p.category) 
          ? p.category.includes(selectedCategory as any) 
          : p.category === selectedCategory
      );

  const categories = [
    { id: 'all', label: t('projects.all'), count: projectsList.length },
    { 
      id: 'Web App', 
      label: t('projects.web'), 
      count: projectsList.filter(p => 
        Array.isArray(p.category) ? p.category.includes('Web App') : p.category === 'Web App'
      ).length 
    },
    { 
      id: 'Mobile App', 
      label: t('projects.mobile'), 
      count: projectsList.filter(p => 
        Array.isArray(p.category) ? p.category.includes('Mobile App') : p.category === 'Mobile App'
      ).length 
    },
    { 
      id: 'Scraping', 
      label: t('projects.scraping'), 
      count: projectsList.filter(p => 
        Array.isArray(p.category) ? p.category.includes('Scraping') : p.category === 'Scraping'
      ).length 
    },
  ];

  return (
    <>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50/50 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-[#2E2E2E] mb-6">
                {t('projects.title')}
              </h1>
              <p className="text-lg text-[#6B7280]">
                {t('projects.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-wrap gap-3 justify-center"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.4,
                        ease: 'easeOut'
                      }
                    }
                  }}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-[#6B7280] border border-gray-200/50 hover:border-blue-300 hover:shadow-md'
                    }`}
                >
                  {category.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${selectedCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-[#F7F7F7]'
                    }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="text-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-[#6B7280]">{t('projects.loading')}</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="text-center py-20"
                >
                  <p className="text-xl text-[#6B7280]">{t('projects.no_projects')}</p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedCategory}
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={staggerItem}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group flex flex-col h-full hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Image Preview - Smaller Height for 3 cols */}
                      <div className="relative h-44 overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                          className="w-full h-full"
                        >
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Status Badge */}
                        {project.projectStatus === 'ongoing' && (
                          <div className="absolute top-3 right-3 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                            <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                            Live
                          </div>
                        )}
                      </div>

                      {/* Content - More Compact */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="mb-3">
                          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                            {project.category}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {project.shortDescription || project.tagline}
                          </p>
                        </div>

                        {/* Tech Stack - Compact footer */}
                        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] border border-gray-100 rounded-md">
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-[10px] text-gray-400 font-medium">+{project.tech.length - 3}</span>
                          )}
                        </div>

                        <Button
                          size="sm"
                          className="w-full bg-gray-900 hover:bg-blue-600 text-white text-xs font-bold transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                        >
                          View Case Study
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
                              // On mobile, try to unmute once user interacts
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