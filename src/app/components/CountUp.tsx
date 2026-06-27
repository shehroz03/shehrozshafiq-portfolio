import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Counts up from `from` to `to` once it scrolls into view.
 * Pure opacity/text update — no layout thrash.
 */
export function CountUp({ to, from = 0, duration = 1.8, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to, from, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
