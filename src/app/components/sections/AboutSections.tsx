import { motion } from 'motion/react';
import { Code2, Database, Smartphone, Bot, Award, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInUpSmall, staggerContainer, staggerItem } from '../../utils/animations';

export function AboutSections() {
  const { t } = useTranslation();

  const skills = [
    { name: t('skills.react'), level: t('skills.advanced'), icon: Code2, color: 'from-blue-500 to-blue-600' },
    { name: t('skills.node'), level: t('skills.intermediate_advanced'), icon: Database, color: 'from-green-500 to-green-600' },
    { name: t('skills.flutter'), level: t('skills.advanced'), icon: Smartphone, color: 'from-purple-500 to-purple-600' },
    { name: t('skills.python'), level: t('skills.advanced'), icon: Bot, color: 'from-orange-500 to-orange-600' },
  ];

  const timeline = [
    {
      year: 'Jan 2023 - Present',
      title: t('timeline.freelance.title'),
      organization: 'Upwork & Fiverr',
      description: (
        <ul className="list-disc list-outside ml-4 space-y-1">
          <li>{t('timeline.freelance.item1')}</li>
          <li>{t('timeline.freelance.item2')}</li>
          <li>{t('timeline.freelance.item3')}</li>
          <li>{t('timeline.freelance.item4')}</li>
        </ul>
      ),
    },
    {
      year: 'Jun 2024 - Jan 2026',
      title: t('timeline.data_engineer.title'),
      organization: 'Corporate Website Solutions',
      description: (
        <ul className="list-disc list-outside ml-4 space-y-1">
          <li>{t('timeline.data_engineer.item1')}</li>
          <li>{t('timeline.data_engineer.item2')}</li>
          <li>{t('timeline.data_engineer.item3')}</li>
          <li>{t('timeline.data_engineer.item4')}</li>
        </ul>
      ),
    },
    {
      year: 'Oct 2025 - Feb 2026',
      title: t('timeline.scholar_iq.title'),
      organization: 'The University of Lahore',
      description: (
        <ul className="list-disc list-outside ml-4 space-y-1">
          <li>{t('timeline.scholar_iq.item1')}</li>
          <li>{t('timeline.scholar_iq.item2')}</li>
          <li>{t('timeline.scholar_iq.item3')}</li>
        </ul>
      ),
    },
    {
      year: '2022 - 2026',
      title: 'BSCS',
      organization: 'The University of Lahore, Lahore, Pakistan',
      description: t('timeline.bscs.description'),
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
                        <span className="text-xs font-bold text-[#4A90E2] uppercase tracking-wider">{skill.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                      className={`absolute h-full bg-gradient-to-r ${skill.color} rounded-full opacity-20`}
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
                      <div className="text-[#6B7280]">{item.description}</div>
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
            <h2 className="text-4xl font-bold text-[#2E2E2E] mb-4">{t('expertise.title')}</h2>
            <p className="text-lg text-[#6B7280]">
              {t('expertise.subtitle')}
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

