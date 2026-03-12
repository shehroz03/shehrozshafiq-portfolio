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

    // Auto hide after 8 seconds whenever it becomes visible
    let hideTimer: NodeJS.Timeout;
    if (isVisible) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
    }

    // Interval to show every 20 seconds (8s visible + 12s hidden)
    const repeatInterval = setInterval(() => {
      if (!hasBeenDismissed) {
        setIsVisible(true);
      }
    }, 20000);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(repeatInterval);
    };
  }, [isVisible, hasBeenDismissed]);

  return (
    <AnimatePresence>
      {isVisible && !hasBeenDismissed && (
        <motion.div
          initial={{ x: 200, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 200, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-[100] bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 border border-white/20 max-w-[320px] group"
        >
          {/* Close Button */}
          <button 
            onClick={() => {
              setIsVisible(false);
              setHasBeenDismissed(true);
            }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>

          <h4 className="text-[17px] font-bold text-gray-900 mb-5 pl-1">Connect on Social</h4>
          
          <div className="flex gap-4">
            {socialLinks.slice(0, 4).map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[52px] h-[52px] rounded-2xl bg-gray-50/50 flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-500 active:scale-90"
              >
                <link.icon className="w-[22px] h-[22px]" />
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100/50 flex items-center gap-2 pl-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available for Hire</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
