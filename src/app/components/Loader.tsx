import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8"
      >
        {/* Logo orb with soft 3D glow */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.04, 1] }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative w-20 h-20"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-[0_20px_60px_rgba(37,99,235,0.55)] flex items-center justify-center">
            <Code2 className="w-10 h-10 text-white" />
          </div>
          <div className="pointer-events-none absolute inset-[3px] rounded-full border border-white/40" />
          <div className="pointer-events-none absolute -bottom-2 left-1/2 h-3 w-14 -translate-x-1/2 bg-blue-500/30 blur-xl opacity-80" />
        </motion.div>

        <div className="text-center space-y-2">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-[#2E2E2E]"
          >
            Shehroz Shafiq
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#6B7280]"
          >
            Full-Stack Developer
          </motion.p>
        </div>

        <div className="w-64 space-y-2">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-medium tracking-wide text-[#6B7280]"
          >
            {progress < 100 ? `${progress}% preparing your portfolio` : 'Ready'}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
