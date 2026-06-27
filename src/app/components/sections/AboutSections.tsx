import { motion } from 'motion/react';
import { Code2, Database, Smartphone, Bot, Award, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInUpSmall, staggerContainer, staggerItem } from '../../utils/animations';
import { CountUp } from '../CountUp';

export function AboutSections() {
  const { t } = useTranslation();

  const skills = [
    { name: t('skills.react'), level: t('skills.advanced'), icon: Code2, color: 'from-blue-500 to-blue-600', accent: '#3B82F6', percent: 92 },
    { name: t('skills.node'), level: t('skills.intermediate_advanced'), icon: Database, color: 'from-green-500 to-green-600', accent: '#22C55E', percent: 80 },
    { name: t('skills.flutter'), level: t('skills.advanced'), icon: Smartphone, color: 'from-purple-500 to-purple-600', accent: '#A855F7', percent: 88 },
    { name: t('skills.python'), level: t('skills.advanced'), icon: Bot, color: 'from-orange-500 to-orange-600', accent: '#F97316', percent: 90 },
  ];

  const timeline = [
    {
      year: 'Jan 2026 - Present',
      title: t('timeline.voteoffside.title', 'Lead Full-Stack Engineer (VoteOffside)'),
      organization: 'VoteOffside (Live Match & Leaderboard Platform)',
      description: (
        <ul className="list-disc list-outside ml-4 space-y-1">
          <li>{t('timeline.voteoffside.item1', 'Architected real-time prediction and leaderboard platform for FIFA World Cup 2026 using React, Vite & Supabase.')}</li>
          <li>{t('timeline.voteoffside.item2', 'Engineered high-performance live match polling, dynamic scoring system, and seamless social authentication.')}</li>
          <li>{t('timeline.voteoffside.item3', 'Designed premium dark-mode UI with glassmorphism, fluid micro-animations, and ultra-low latency updates.')}</li>
        </ul>
      ),
    },
    {
      year: 'Jan 2024 - Present',
      title: t('timeline.ai_automation.title', 'Senior Automation & AI Engineer'),
      organization: 'Freelance Global Clients (Upwork & Fiverr)',
      description: (
        <ul className="list-disc list-outside ml-4 space-y-1">
          <li>{t('timeline.ai_automation.item1', 'Developed production-grade AI chatbots, LLM wrappers, and automated data processing pipelines for enterprise clients.')}</li>
          <li>{t('timeline.ai_automation.item2', 'Built secure, highly scalable REST APIs and full-stack web/mobile applications with React, React Native, Flutter, and Node.js.')}</li>
          <li>{t('timeline.ai_automation.item3', 'Orchestrated cloud deployments, optimized database query execution, and improved application load times by up to 45%.')}</li>
        </ul>
      ),
    },
    {
      year: 'Jun 2024 - Jan 2026',
      title: t('timeline.data_engineer.title', 'Data Systems & Scraping Architect'),
      organization: 'Corporate Website Solutions',
      description: (
        <ul className="list-disc list-outside ml-4 space-y-1">
          <li>{t('timeline.data_engineer_new.item1', 'Engineered fault-tolerant distributed web scrapers in Python processing over 50,000+ critical data records weekly.')}</li>
          <li>{t('timeline.data_engineer_new.item2', 'Automated enterprise data pipeline collection, eliminating 70% of manual data entry and ensuring 99.9% data accuracy.')}</li>
          <li>{t('timeline.data_engineer_new.item3', 'Designed robust ETL workflows, clean data aggregation architectures, and real-time executive dashboard reporting tools.')}</li>
        </ul>
      ),
    },
    {
      year: 'Oct 2025 - Feb 2026',
      title: t('timeline.scholar_iq.title', 'Full-Stack Engineer & AI Specialist (ScholarIQ FYP)'),
      organization: 'The University of Lahore',
      description: (
        <ul className="list-disc list-outside ml-4 space-y-1">
          <li>{t('timeline.scholar_iq_new.item1', 'Developed advanced scholarship matching platform integrating Python, SQLite, and React with an interactive AI consultant.')}</li>
          <li>{t('timeline.scholar_iq_new.item2', 'Implemented automated eligibility verification, direct application routing, and real-time student profiling system.')}</li>
          <li>{t('timeline.scholar_iq_new.item3', 'Awarded high praise for intuitive UX design, robust backend engineering, and seamless API integrations.')}</li>
        </ul>
      ),
    },
    {
      year: '2022 - 2026',
      title: 'BSCS (Bachelor of Science in Computer Science)',
      organization: 'The University of Lahore, Lahore, Pakistan',
      description: t('timeline.bscs_new.description', 'Specialized in Software Engineering, Advanced Algorithms, Artificial Intelligence, and Modern Web Architectures.'),
    },
  ];

  const expertise = [
    {
      title: t('expertise.frontend.title'),
      icon: Code2,
      skills: [
        { name: 'React', description: '' },
        { name: 'Next.js', description: '' },
        { name: 'TypeScript', description: '' },
        { name: 'Tailwind CSS', description: '' },
        { name: 'Motion', description: '' }
      ],
      color: 'from-blue-500 to-blue-600',
      accent: '#3B82F6',
    },
    {
      title: t('expertise.mobile.title'),
      icon: Smartphone,
      skills: [
        { name: 'Flutter', description: '' },
        { name: 'React Native', description: '' },
        { name: 'Dart', description: '' }
      ],
      color: 'from-purple-500 to-purple-600',
      accent: '#A855F7',
    },
    {
      title: t('expertise.backend.title'),
      icon: Database,
      skills: [
        { name: 'Node.js', description: '' },
        { name: 'Python', description: '' },
        { name: 'MongoDB', description: '' },
        { name: 'PostgreSQL', description: '' },
        { name: 'REST APIs', description: '' }
      ],
      color: 'from-green-500 to-green-600',
      accent: '#22C55E',
    },
    {
      title: t('expertise.tools.title'),
      icon: Bot,
      skills: [
        { name: 'Stripe', description: t('expertise.tools.stripe_desc') },
        { name: t('expertise.tools.scraping'), description: 'Python, Playwright, Puppeteer' },
        { name: t('expertise.tools.automation'), description: '' },
        { name: 'Git & GitHub Actions', description: '' },
        { name: 'Vercel & Firebase', description: '' }
      ],
      color: 'from-orange-500 to-orange-600',
      accent: '#F97316',
    },
  ];

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
            <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">{t('skills.title')}</h2>
            <p className="text-lg text-[#6B7280]">
              {t('skills.subtitle')}
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
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative bg-[#F7F7F7] rounded-2xl p-8 border border-gray-200/50 hover:border-transparent transition-colors duration-300 overflow-hidden"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* Hover glow wash */}
                  <div
                    className="absolute -top-16 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: skill.accent }}
                  />
                  {/* Accent border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${skill.accent}55` }}
                  />

                  <div className="relative flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                      style={{ boxShadow: `0 8px 20px ${skill.accent}55` }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-[#2E2E2E]">{skill.name}</h3>
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: skill.accent }}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Animated proficiency bar with count-up percent */}
                  <div className="relative">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wide">
                        {t('skills.proficiency', 'Proficiency')}
                      </span>
                      <span className="text-xs font-bold tabular-nums" style={{ color: skill.accent }}>
                        <CountUp to={skill.percent} duration={1.6} delay={index * 0.1 + 0.3} />%
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-200/70 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute h-full bg-gradient-to-r ${skill.color} rounded-full overflow-hidden`}
                        style={{ boxShadow: `0 0 10px ${skill.accent}80` }}
                      >
                        {/* Shimmer sweep */}
                        <motion.div
                          animate={{ x: ['-120%', '240%'] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
                        />
                      </motion.div>
                    </div>
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
            {t('skills.experience_note')}
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
            <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">{t('timeline.title')}</h2>
            <p className="text-lg text-[#6B7280]">
              {t('timeline.subtitle')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Animated vertical timeline line that draws down on scroll */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute left-[19px] top-2 bottom-2 w-[2px] origin-top rounded-full bg-gradient-to-b from-blue-500 via-blue-400 to-green-500"
            />

            <div className="space-y-8">
              {timeline.map((item, index) => {
                const accent = index === 0 ? '#3B82F6' : '#22C55E';
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-12"
                  >
                    {/* Glowing node on the line */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: index * 0.1 + 0.2 }}
                      className="absolute left-[12px] top-1.5 w-4 h-4 rounded-full bg-white z-10 flex items-center justify-center"
                      style={{ border: `3px solid ${accent}` }}
                    >
                      <motion.span
                        animate={{ boxShadow: [`0 0 0 0 ${accent}66`, `0 0 0 7px ${accent}00`] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: index * 0.3 }}
                        className="absolute inset-0 rounded-full"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="group relative bg-white rounded-2xl p-8 border border-gray-200/50 hover:border-transparent transition-colors duration-300 overflow-hidden"
                      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
                    >
                      {/* Hover glow + accent border */}
                      <div
                        className="absolute -top-16 -left-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                        style={{ backgroundColor: accent }}
                      />
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 0 1.5px ${accent}55` }}
                      />

                      <div className="relative flex items-start gap-4 mb-4">
                        <motion.div
                          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                          transition={{ duration: 0.5 }}
                          className={`w-12 h-12 bg-gradient-to-br ${index === 0 ? 'from-blue-500 to-blue-600' : 'from-green-500 to-green-600'} rounded-xl flex items-center justify-center text-white shadow-lg`}
                          style={{ boxShadow: `0 8px 20px ${accent}55` }}
                        >
                          {index === 0 ? <Award className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <h3 className="text-xl font-bold text-[#2E2E2E]">{item.title}</h3>
                            <span
                              className="px-3 py-1 rounded-full text-sm font-medium"
                              style={{ backgroundColor: `${accent}1A`, color: accent }}
                            >
                              {item.year}
                            </span>
                          </div>
                          <p className="font-semibold mb-2" style={{ color: accent }}>{item.organization}</p>
                          <div className="text-[#6B7280]">{item.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
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
            <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">{t('expertise.title')}</h2>
            <p className="text-lg text-[#6B7280]">
              {t('expertise.subtitle')}
            </p>
          </motion.div>

          <div
            className="grid md:grid-cols-3 gap-8"
            style={{ perspective: '1400px' }}
          >
            {expertise.map((area, cardIndex) => {
              const Icon = area.icon;
              const base = cardIndex * 0.12;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 70, rotateX: -22, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: base, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  style={{ transformStyle: 'preserve-3d', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
                  className="group relative bg-[#F7F7F7] rounded-2xl p-8 border border-gray-200/50 hover:border-transparent transition-colors duration-300 overflow-hidden"
                >
                  {/* Hover glow wash in accent color */}
                  <div
                    className="absolute -top-20 -right-10 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: area.accent }}
                  />
                  {/* Accent border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${area.accent}55` }}
                  />

                  {/* Icon: the "core" — rotating ring + pulse glow */}
                  <div className="relative w-16 h-16 mb-6">
                    {/* pulse glow */}
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: base }}
                      className="absolute inset-0 rounded-2xl blur-md"
                      style={{ background: area.accent }}
                    />
                    {/* rotating dashed ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-1.5 rounded-2xl border border-dashed"
                      style={{ borderColor: `${area.accent}55` }}
                    />
                    {/* orbiting dot */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-1.5"
                    >
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ background: area.accent, boxShadow: `0 0 8px 2px ${area.accent}` }}
                      />
                    </motion.div>
                    {/* core */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#2E2E2E] mb-5">{area.title}</h3>

                  {/* Circuit tree: a line draws down from the core and connects each tech name */}
                  <div className="relative pl-6">
                    {/* the spine line — draws downward on scroll */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.7, delay: base + 0.25, ease: 'easeOut' }}
                      className="absolute left-[5px] top-1 bottom-2 w-[2px] origin-top rounded-full"
                      style={{ background: `linear-gradient(to bottom, ${area.accent}, ${area.accent}22)` }}
                    />

                    <ul className="space-y-3.5">
                      {area.skills.map((skill, i) => {
                        const name = typeof skill === 'string' ? skill : skill.name;
                        const desc = typeof skill === 'string' ? '' : skill.description;
                        return (
                          <motion.li
                            key={name}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.4, delay: base + 0.45 + i * 0.12, ease: 'easeOut' }}
                            className="relative flex flex-col gap-0.5"
                          >
                            {/* horizontal connector tick */}
                            <span
                              className="absolute top-[7px] -left-[14px] w-3 h-[2px] rounded-full"
                              style={{ background: area.accent, opacity: 0.5 }}
                            />
                            {/* node dot sitting on the spine */}
                            <motion.span
                              animate={{ boxShadow: [`0 0 0 0 ${area.accent}66`, `0 0 0 5px ${area.accent}00`] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: i * 0.25 }}
                              className="absolute top-[5px] -left-[22px] w-2.5 h-2.5 rounded-full bg-white border-2"
                              style={{ borderColor: area.accent }}
                            />
                            <span className="font-medium text-sm text-[#2E2E2E] group-hover:translate-x-0.5 transition-transform">
                              {name}
                            </span>
                            {desc && (
                              <span className="text-[11px] text-[#9CA3AF] leading-tight">{desc}</span>
                            )}
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

