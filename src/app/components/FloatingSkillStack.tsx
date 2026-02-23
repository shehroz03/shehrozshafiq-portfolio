import { motion } from 'motion/react';
import { Code2, Smartphone, Bot, Workflow, Cloud, LayoutDashboard } from 'lucide-react';

export function FloatingSkillStack() {
  const skills = [
    {
      label: 'Web Apps',
      icon: Code2,
      position: { x: -140, y: -60 },
      delay: 0,
      depth: 'near',
    },
    {
      label: 'Mobile Apps',
      icon: Smartphone,
      position: { x: 140, y: -40 },
      delay: 0.15,
      depth: 'far',
    },
    {
      label: 'Automation',
      icon: Bot,
      position: { x: -120, y: 80 },
      delay: 0.3,
      depth: 'far',
    },
    {
      label: 'APIs',
      icon: Cloud,
      position: { x: 150, y: 90 },
      delay: 0.1,
      depth: 'near',
    },
    {
      label: 'Scraping',
      icon: Workflow,
      position: { x: 0, y: -140 },
      delay: 0.2,
      depth: 'mid',
    },
    {
      label: 'Dashboards',
      icon: LayoutDashboard,
      position: { x: 0, y: 140 },
      delay: 0.25,
      depth: 'mid',
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 2.0, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute w-80 h-80 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/10 rounded-full blur-3xl"
      />

      {/* Central glassmorphism card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 2.0,
          ease: [0.34, 1.56, 0.64, 1] // Smooth ease-out-back
        }}
        className="absolute z-10"
      >
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          {/* Glassmorphism card */}
          <div 
            className="w-32 h-32 rounded-3xl backdrop-blur-xl bg-white/80 border border-white/50 flex flex-col items-center justify-center gap-2 p-4"
            style={{
              boxShadow: '0 8px 32px rgba(74, 144, 226, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Avatar/Icon area */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              MS
            </div>
            <div className="text-[#2E2E2E] font-semibold text-xs text-center leading-tight">
              Full-Stack<br/>Developer
            </div>
          </div>

          {/* Inner glow effect */}
          <div 
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl -z-10"
          />
        </motion.div>
      </motion.div>

      {/* Floating skill pills with depth */}
      {skills.map((skill, index) => {
        const Icon = skill.icon;
        const depthScale = skill.depth === 'near' ? 1 : skill.depth === 'far' ? 0.88 : 0.94;
        const depthOpacity = skill.depth === 'near' ? 1 : skill.depth === 'far' ? 0.85 : 0.92;
        
        return (
          <motion.div
            key={skill.label}
            initial={{ opacity: 0, scale: 0.5, x: 30, y: 0 }}
            animate={{
              opacity: depthOpacity,
              scale: depthScale,
              x: skill.position.x,
              y: skill.position.y,
            }}
            transition={{
              duration: 0.7,
              delay: 2.0 + skill.delay,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="absolute"
            style={{
              filter: skill.depth === 'far' ? 'blur(0.3px)' : 'none',
            }}
          >
            <motion.div
              animate={{
                y: [0, skill.depth === 'near' ? -4 : -2, 0],
              }}
              transition={{
                duration: 3.5 + index * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: 1.08,
                y: -6,
                transition: { duration: 0.2 }
              }}
              className="relative group cursor-default"
            >
              {/* Pill chip */}
              <div
                className="bg-white/90 backdrop-blur-md rounded-full px-5 py-3 border border-white/60 flex items-center gap-3 transition-all duration-200"
                style={{
                  boxShadow: `
                    0 4px 24px rgba(0, 0, 0, 0.08),
                    0 0 0 1px rgba(74, 144, 226, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-[#2E2E2E] text-sm whitespace-nowrap">
                  {skill.label}
                </span>
              </div>

              {/* Soft glow behind pill */}
              <div 
                className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Subtle orbiting rings for depth */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, delay: 2.2 }}
        className="absolute w-[400px] h-[400px] border border-dashed border-blue-300/40 rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2.4 }}
        className="absolute w-[480px] h-[480px] border border-dashed border-purple-300/30 rounded-full pointer-events-none"
      />
    </div>
  );
}
