import { motion } from 'motion/react';
import { Code2, Database, Smartphone, Bot, Globe, Server } from 'lucide-react';

export function DeveloperRadar() {
  const skills = [
    {
      label: 'Frontend',
      icon: Code2,
      position: { x: -120, y: -80 },
      delay: 0,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Backend',
      icon: Server,
      position: { x: 120, y: -60 },
      delay: 0.1,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Mobile',
      icon: Smartphone,
      position: { x: -100, y: 60 },
      delay: 0.2,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Automation',
      icon: Bot,
      position: { x: 130, y: 80 },
      delay: 0.3,
      color: 'from-orange-500 to-orange-600',
    },
    {
      label: 'APIs',
      icon: Globe,
      position: { x: 0, y: -130 },
      delay: 0.15,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      label: 'Databases',
      icon: Database,
      position: { x: 0, y: 130 },
      delay: 0.25,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central blurred circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
      />

      {/* Central core */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="absolute w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl z-10"
        style={{
          boxShadow: '0 10px 40px rgba(74, 144, 226, 0.4)',
        }}
      >
        MS
      </motion.div>

      {/* Floating skill chips in orbit */}
      {skills.map((skill, index) => {
        const Icon = skill.icon;
        return (
          <motion.div
            key={skill.label}
            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: skill.position.x,
              y: skill.position.y,
            }}
            transition={{
              duration: 0.8,
              delay: 0.5 + skill.delay,
              ease: 'easeOut',
            }}
            className="absolute"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`bg-white rounded-2xl px-5 py-3 border border-gray-200/50 flex items-center gap-3 backdrop-blur-sm`}
              style={{
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(74, 144, 226, 0.15)',
              }}
            >
              <div className={`w-8 h-8 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-[#2E2E2E] text-sm whitespace-nowrap">
                {skill.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Orbiting rings for depth */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute w-96 h-96 border-2 border-dashed border-blue-300 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute w-[28rem] h-[28rem] border border-dashed border-blue-200 rounded-full"
      />
    </div>
  );
}
