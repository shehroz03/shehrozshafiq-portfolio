import { motion } from 'motion/react';

export function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-[#2E2E2E]">
              About Me
            </h1>
            <h2 className="text-2xl lg:text-3xl text-[#4A90E2] font-semibold">
              Shehroz Shafiq
            </h2>
            <p className="text-xl text-[#6B7280]">
              Full-Stack Developer & Automation Specialist
            </p>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              I’m a full-stack developer focused on building scalable web and mobile applications. I specialize in the MERN stack, Flutter, and automation solutions that solve real-world problems. With a strong foundation in both frontend and backend development, I create seamless user experiences backed by robust architecture. Currently, I’m focusing on automation-heavy dashboards, admin panels, and data-driven platforms for SMEs and startups.
            </p>
          </motion.div>

          {/* Avatar/Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="w-80 h-80 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white relative overflow-hidden cursor-pointer"
              style={{
                boxShadow: '0 20px 60px rgba(74, 144, 226, 0.3)',
              }}
            >
              <img
                src="/images/projects/shehroz.jpeg"
                alt="Shehroz Shafiq"
                className="w-full h-full object-cover object-[50%_15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

