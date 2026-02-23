import { motion } from 'motion/react';
import { Code2, Database, Smartphone, Globe, Zap, Cpu } from 'lucide-react';

const techIcons = [
  { Icon: Code2, color: '#4A90E2', delay: 0 },
  { Icon: Database, color: '#10B981', delay: 0.5 },
  { Icon: Smartphone, color: '#8B5CF6', delay: 1 },
  { Icon: Globe, color: '#F59E0B', delay: 1.5 },
  { Icon: Zap, color: '#EF4444', delay: 2 },
  { Icon: Cpu, color: '#06B6D4', delay: 2.5 },
];

export function SkillsOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 backdrop-blur-lg border border-blue-300/30"
        style={{
          boxShadow: '0 8px 32px rgba(74, 144, 226, 0.2)',
        }}
      />

      {/* Orbiting icons */}
      {techIcons.map(({ Icon, color, delay }, index) => {
        const angle = (index * 360) / techIcons.length;
        const radius = 120;

        return (
          <motion.div
            key={index}
            className="absolute"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
              delay,
            }}
            style={{
              width: radius * 2,
              height: radius * 2,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay * 0.5,
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 flex items-center justify-center"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transform: `translate(-50%, 0) rotate(${-angle}deg)`,
              }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
