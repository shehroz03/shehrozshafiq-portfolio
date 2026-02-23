import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Calendar, User, MapPin, Clock } from 'lucide-react';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Web App' | 'Scraping' | 'Mobile App'>('all');

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
    : projectsList.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Projects', count: projectsList.length },
    { id: 'Web App', label: 'Web Applications', count: projectsList.filter(p => p.category === 'Web App').length },
    { id: 'Mobile App', label: 'Mobile Apps', count: projectsList.filter(p => p.category === 'Mobile App').length },
    { id: 'Scraping', label: 'Automation & Scraping', count: projectsList.filter(p => p.category === 'Scraping').length },
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
                Featured Projects
              </h1>
              <p className="text-lg text-[#6B7280]">
                A curated collection of full-stack applications, mobile platforms, and automation solutions
                showcasing expertise in modern web technologies and data engineering.
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
                  <p className="text-[#6B7280]">Loading projects...</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="text-center py-20"
                >
                  <p className="text-xl text-[#6B7280]">No projects in this category yet.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedCategory}
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={staggerItem}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-200/50 cursor-pointer group flex flex-col h-full"
                      style={{
                        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
                      }}
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Image Header */}
                      <div className="relative h-56 overflow-hidden">
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
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color || 'from-blue-500 to-blue-600'} opacity-20 mix-blend-multiply`} />

                        {/* Status Badge */}
                        {project.projectStatus === 'ongoing' && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            Ongoing
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-4">
                          <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${project.color || 'from-blue-500 to-blue-600'} text-white text-xs font-semibold mb-3 capitalize`}>
                            {project.category.replace('-', ' ')}
                          </div>
                          <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
                            {project.title}
                          </h3>
                          <p className="text-sm text-[#6B7280] mb-2 line-clamp-1">
                            {project.subtitle || project.tagline}
                          </p>
                          <p className="text-[#4A90E2] font-medium mb-3">
                            {project.tagline}
                          </p>
                        </div>

                        {/* Overview (Short) */}
                        <p className="text-sm text-[#6B7280] line-clamp-2 mb-4">
                          {project.overview}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                          {project.tech.slice(0, 4).map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-[#F7F7F7] text-[#6B7280] hover:bg-[#E5E7EB] border border-gray-200/50 text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.tech.length > 4 && (
                            <Badge
                              variant="secondary"
                              className="bg-[#F7F7F7] text-[#6B7280] border border-gray-200/50 text-xs"
                            >
                              +{project.tech.length - 4} more
                            </Badge>
                          )}
                        </div>

                        {/* CTA */}
                        <Button
                          className={`w-full bg-gradient-to-r ${project.color || 'from-blue-500 to-blue-600'} text-white hover:opacity-90 mt-auto`}
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
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
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
                            <span>Ongoing Project</span>
                          </div>
                        )}
                      </div>

                      {/* Overview */}
                      <p className="text-lg text-[#6B7280] leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-3 rounded-r-lg">
                        {selectedProject.overview}
                      </p>
                    </div>
                  </DialogHeader>

                  {/* Hero Image */}
                  <div className="relative h-80 rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color || 'from-blue-500 to-blue-600'} opacity-20 mix-blend-multiply`} />
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