import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { socialLinks } from '../data/contact';
import { X } from 'lucide-react';

export function SocialPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  useEffect(() => {
    if (hasBeenDismissed) return;

    // Show IMMEDIATELY on first load
    setIsVisible(true);

    // Auto hide after 5 seconds whenever it becomes visible
    let hideTimer: NodeJS.Timeout;
    if (isVisible) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }

    // Interval to show: 5s visible + 30s hidden = 35s total interval
    const repeatInterval = setInterval(() => {
      if (!hasBeenDismissed) {
        setIsVisible(true);
      }
    }, 35000);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(repeatInterval);
    };
  }, [isVisible, hasBeenDismissed]);

  return (
    <AnimatePresence>
      {isVisible && !hasBeenDismissed && (
        <motion.div
          initial={{ x: 250, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 250, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 30, stiffness: 250 }}
          className="fixed bottom-8 right-8 z-[100] bg-white/95 backdrop-blur-2xl rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.12)] p-4 border border-white/40 group w-[220px]"
        >
          {/* Close Button - Minimal */}
          <button 
            onClick={() => {
              setIsVisible(false);
              setHasBeenDismissed(true);
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 scale-90"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-1 h-1 rounded-full bg-blue-600" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Connect With Me</span>
          </div>
          
          <div className="flex justify-between items-center gap-2">
            {socialLinks.slice(0, 4).map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-black hover:-translate-y-1 transition-all duration-300"
              >
                <link.icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1.5 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Available for projects</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
