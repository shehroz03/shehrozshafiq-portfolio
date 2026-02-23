import { motion } from 'motion/react';
import { Code2, Database, Smartphone, Bot, Award, Briefcase } from 'lucide-react';
import { fadeInUpSmall, staggerContainer, staggerItem } from '../../utils/animations';

const skills = [
  { name: 'React & Next.js', level: 95, icon: Code2, color: 'from-blue-500 to-blue-600' },
  { name: 'Node.js & Express', level: 90, icon: Database, color: 'from-green-500 to-green-600' },
  { name: 'Flutter & Dart', level: 85, icon: Smartphone, color: 'from-purple-500 to-purple-600' },
  { name: 'Python & Automation', level: 80, icon: Bot, color: 'from-orange-500 to-orange-600' },
];

const timeline = [
  {
    year: '2022 - 2026',
    title: 'BSc Computer Science',
    organization: 'The University of Lahore (UOL)',
    description: 'Focusing on software engineering, algorithms, and modern web technologies.',
  },
  {
    year: '2022 - Present',
    title: 'Freelance Full-Stack Developer',
    organization: 'Upwork & Fiverr',
    description: (
      <ul className="list-disc list-outside ml-4 space-y-1">
        <li>Delivered 10+ production projects focusing on dashboards, admin panels, and business tools for international clients.</li>
        <li>Implemented secure authentication, role-based access, and analytics so clients can track their key metrics in real time.</li>
        <li>Built automation workflows and scrapers that processed 10k+ records for client datasets.</li>
      </ul>
    ),
  },
  {
    year: '2024 - Present',
    title: 'Data Scraping & Automation Specialist',
    organization: 'Corporate Website Solutions + Freelance',
    description: (
      <ul className="list-disc list-outside ml-4 space-y-1">
        <li>Developed Python-based scraping pipelines with scheduling, error handling, and data cleaning.</li>
        <li>Reduced manual data collection time for clients from hours to a few minutes by automating data workflows.</li>
        <li>Created dashboards and reports so non-technical users can explore large datasets easily.</li>
      </ul>
    ),
  },
];

const expertise = [
  {
    title: 'Frontend Development',
    icon: Code2,
    skills: [
      { name: 'React', description: '' },
      { name: 'Next.js', description: '' },
      { name: 'TypeScript', description: '' },
      { name: 'Tailwind CSS', description: '' },
      { name: 'Motion', description: '' }
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Backend Development',
    icon: Database,
    skills: [
      { name: 'Node.js', description: '' },
      { name: 'Python', description: '' },
      { name: 'MongoDB', description: '' },
      { name: 'PostgreSQL', description: '' },
      { name: 'REST APIs', description: '' }
    ],
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Automation & Tools',
    icon: Bot,
    skills: [
      { name: 'Web Scraping', description: 'Python, Playwright, Puppeteer, BeautifulSoup' },
      { name: 'Bots', description: 'task automation and chat bots (Telegram/WhatsApp)' },
      { name: 'Integrations', description: 'Stripe, Firebase, Supabase, REST APIs' },
      { name: 'CI/CD', description: 'GitHub Actions' },
      { name: 'Cloud', description: 'Vercel, Render, Railway' }
    ],
    color: 'from-purple-500 to-purple-600',
  },
];

export function AboutSections() {
  return (
    <>
      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUpSmall}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">Technical Skills</h2>
            <p className="text-lg text-[#6B7280]">
              Proficiency across the full development stack
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  variants={staggerItem}
                  className="bg-[#F7F7F7] rounded-2xl p-8 border border-gray-200/50"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-[#2E2E2E]">{skill.name}</h3>
                        <span className="text-sm font-bold text-[#4A90E2]">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-3 bg-white rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                      className={`absolute h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-xs text-[#6B7280] italic"
          >
            Self-assessed skill levels based on 3+ years of hands-on project work.
          </motion.p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUpSmall}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">Experience & Education</h2>
            <p className="text-lg text-[#6B7280]">
              My professional journey
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: 'easeOut',
                    },
                  },
                }}
                className="relative pl-8 border-l-2 border-[#4A90E2]"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-[#4A90E2] rounded-full" />
                <div
                  className="bg-white rounded-2xl p-8 border border-gray-200/50"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${index === 0 ? 'from-blue-500 to-blue-600' : 'from-green-500 to-green-600'} rounded-xl flex items-center justify-center text-white`}>
                      {index === 0 ? <Award className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-bold text-[#2E2E2E]">{item.title}</h3>
                        <span className="px-3 py-1 bg-[#4A90E2]/10 text-[#4A90E2] rounded-full text-sm font-medium">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-[#4A90E2] font-semibold mb-2">{item.organization}</p>
                      <p className="text-[#6B7280]">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUpSmall}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">Areas of Expertise</h2>
            <p className="text-lg text-[#6B7280]">
              Technologies and tools I work with daily
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {expertise.map((area) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  variants={staggerItem}
                  className="bg-[#F7F7F7] rounded-2xl p-8 border border-gray-200/50"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E] mb-4">{area.title}</h3>
                  <ul className="space-y-3">
                    {area.skills.map((skill) => (
                      <li key={typeof skill === 'string' ? skill : skill.name} className="flex flex-col gap-0.5 text-[#6B7280]">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${area.color}`} />
                          <span className="font-medium text-sm text-[#2E2E2E]">{typeof skill === 'string' ? skill : skill.name}</span>
                        </div>
                        {typeof skill !== 'string' && skill.description && (
                          <span className="text-[11px] text-[#9CA3AF] ml-3.5 leading-tight">{skill.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}

