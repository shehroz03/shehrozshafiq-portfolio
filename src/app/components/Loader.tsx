import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';
import { Code2 } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

const MESSAGES = [
  'Initializing workspace...',
  'Loading components...',
  'Preparing assets...',
  'Optimizing performance...',
  'Almost ready...',
  'Ready!',
];

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: [3, 5, 2, 4, 3, 6, 2, 4, 3, 5, 2, 4, 3, 5, 2, 4][i],
  left: [8, 18, 30, 45, 60, 72, 85, 92, 78, 55, 38, 22, 65, 14, 50, 88][i],
  top: [15, 78, 25, 90, 10, 65, 30, 82, 50, 20, 70, 45, 88, 55, 8, 95][i],
  delay: [0, 0.8, 1.5, 0.3, 1.2, 0.6, 1.8, 0.1, 1.0, 0.5, 1.4, 0.9, 0.2, 1.6, 0.7, 1.3][i],
  duration: [3, 4, 2.5, 3.5, 4.5, 3, 2.8, 4, 3.2, 3.8, 2.6, 4.2, 3.4, 2.9, 3.6, 4.1][i],
}));

// Circular progress geometry
const RING_RADIUS = 52;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  const messageIndex = useMemo(
    () => Math.min(Math.floor((progress / 100) * (MESSAGES.length - 1)), MESSAGES.length - 1),
    [progress]
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 70% at 50% 38%, #F5F9FF 0%, #DBEAFE 55%, #BFDBFE 100%)',
      }}
    >
      {/* Soft moving aurora blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-10 w-96 h-96 rounded-full bg-blue-300/40 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -right-10 w-[26rem] h-[26rem] rounded-full bg-indigo-300/35 blur-3xl"
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 80%)',
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-500 blur-[0.5px]"
          style={{ width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -28, 0], opacity: [0.06, 0.35, 0.06], scale: [1, 1.6, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Glass card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative flex flex-col items-center gap-8 px-14 py-12 rounded-[28px]"
        style={{
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow:
            '0 30px 80px rgba(37,99,235,0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
        }}
      >
        {/* Logo with circular progress */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Pulsing background glow */}
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-2 rounded-full bg-blue-400 blur-2xl"
          />

          {/* Conic gradient rotating sweep */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(96,165,250,0.7) 320deg, rgba(37,99,235,0.9) 360deg)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
            }}
          />

          {/* SVG circular progress */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(37,99,235,0.12)"
              strokeWidth="4"
            />
            <motion.circle
              cx="64"
              cy="64"
              r={RING_RADIUS}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={RING_CIRC}
              animate={{ strokeDashoffset: RING_CIRC - (progress / 100) * RING_CIRC }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Orbiting dot riding the progress ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[10px] w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_3px_rgba(59,130,246,0.7)]" />
          </motion.div>

          {/* Core orb */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-[78px] h-[78px] rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 50%, #1D4ED8 100%)',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.2) inset, 0 18px 50px rgba(37,99,235,0.6)',
            }}
          >
            {/* Glossy highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            <div className="absolute top-2 left-3 w-6 h-3 rounded-full bg-white/40 blur-[3px]" />
            <Code2 className="w-9 h-9 text-white drop-shadow-lg relative z-10" />
          </motion.div>
        </div>

        {/* Name + title */}
        <div className="text-center space-y-2.5">
          <motion.h1
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
            className="text-[28px] font-bold tracking-tight text-[#1E293B]"
          >
            Shehroz Shafiq
          </motion.h1>
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-xs font-mono text-blue-500/70">{'<'}</span>
            <span className="text-[#64748B] font-medium tracking-wide text-[15px]">
              Full-Stack Developer
            </span>
            <span className="text-xs font-mono text-blue-500/70">{'/>'}</span>
          </motion.div>
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="w-72 space-y-2.5"
        >
          {/* Bar track */}
          <div className="relative h-1.5 bg-blue-100/80 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #60A5FA, #2563EB, #1D4ED8)',
                boxShadow: '0 0 12px rgba(37,99,235,0.5)',
                transition: 'width 0.15s ease-out',
              }}
            >
              {/* Shimmer sweep */}
              <motion.div
                animate={{ x: ['-120%', '220%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
              />
            </motion.div>
          </div>

          {/* Status text */}
          <div className="flex items-center justify-between px-0.5">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="text-[11px] font-medium text-[#64748B] tracking-wide"
              >
                {MESSAGES[messageIndex]}
              </motion.p>
            </AnimatePresence>
            <span className="text-[11px] font-bold text-blue-600 tabular-nums">{progress}%</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
