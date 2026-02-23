import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type LogoTextProps = {
  className?: string;
  shortText?: string;
  fullText?: string;
  shortDurationMs?: number; // time to wait before expanding
  fullDurationMs?: number;  // time to keep full text visible
};

export function LogoText({
  className,
  shortText = 'SS',
  fullText = 'Shehroz Shafiq',
  shortDurationMs = 4000,
  fullDurationMs = 3000,
}: LogoTextProps) {
  const [showFullName, setShowFullName] = useState(false);
  const shortTimeoutRef = useRef<number | null>(null);
  const fullTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (shortTimeoutRef.current) window.clearTimeout(shortTimeoutRef.current);
      if (fullTimeoutRef.current) window.clearTimeout(fullTimeoutRef.current);
      shortTimeoutRef.current = null;
      fullTimeoutRef.current = null;
    };

    const scheduleCycle = () => {
      shortTimeoutRef.current = window.setTimeout(() => {
        setShowFullName(true);
        fullTimeoutRef.current = window.setTimeout(() => {
          setShowFullName(false);
          scheduleCycle();
        }, fullDurationMs);
      }, shortDurationMs);
    };

    scheduleCycle();
    return clearTimers;
  }, [fullDurationMs, shortDurationMs]);

  const isFull = showFullName;
  const enter = isFull ? { opacity: 0, x: -10 } : { opacity: 0, x: 10 };
  const exit = isFull ? { opacity: 0, x: 10 } : { opacity: 0, x: -10 };

  return (
    <span
      className={className}
      aria-label={fullText}
      title={fullText}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isFull ? 'full' : 'short'}
          initial={enter}
          animate={{ opacity: 1, x: 0 }}
          exit={exit}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ display: 'inline-block' }}
        >
          {isFull ? fullText : shortText}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

